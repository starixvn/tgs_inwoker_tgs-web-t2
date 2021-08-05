def message = ""
pipeline {
	agent any
	
	environment {
	    TAG = sh(script: "echo `date +%Y%m%d%H%M`", returnStdout: true).trim()
		Registry = "registry.gitlab.com/rayprosoft/turnkey-gaming-system/"
		Component = "lobby-t2"
		gitlab_user_pwd = credentials('gitlab-user-pwd')
	}
	
	stages {   	
		stage('Clear') {
			steps {
				cleanWs()
			}
		}

		stage('Clone') {
			steps {
				git branch: "develop", url: "https://${gitlab_user_pwd_USR}:${gitlab_user_pwd_PSW}@gitlab.com/yifan1997/tgstemplate1.git"
			}
		}
		
		stage('Prepare Env') {
            steps {
			    sh "sudo docker login registry.gitlab.com -u ${gitlab_user_pwd_USR} -p ${gitlab_user_pwd_PSW}"
                sh "echo 'Branch: $GIT_BRANCH'";
                script {
                    switch('$GIT_BRANCH')
                    {
                        case 'origin/master':
                            env.kube_ns = "prod";
                            break;
                        case 'origin/release/current':
                            env.kube_ns = "staging";
                            break;
                        default:
                            env.kube_ns = "dev";
                            break;
                    }
					TAG = env.kube_ns + '-' + TAG
					message += "\nComponent:${Component}"
					message += "\nTag:${TAG}"
					message += "\nEnv:$env.kube_ns"
                }

				sh "echo 'env: $env.kube_ns'"
				sh "echo 'tag: ${TAG}'"
            }
        }
		
		stage('Docker Build') {   
			steps {	  
			    
				sh "sudo docker build -t ${Registry}${Component}:${TAG} ."
				sh "sudo docker build -t ${Registry}${Component}:$env.kube_ns ."
			}
		}	
		
		stage('Docker Push') {   
			steps {	  
				sh "sudo docker push ${Registry}${Component}:${TAG}"
				sh "sudo docker push ${Registry}${Component}:$env.kube_ns"
			}
		}	
		
		stage('Deployment') {   
			steps {	  			
				withKubeConfig([credentialsId: 'k8s-kube-config']) {
					sh "kubectl set image deployment/${Component} ${Component}=${Registry}${Component}:${TAG} --record -n $env.kube_ns"
				}
			}
		}		
	}
	 post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK! ${message} \n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
        failure {
            sendTelegram("<b>Failed Pipeline:</b> ${currentBuild.fullDisplayName} Something is wrong with ${env.BUILD_URL}/console\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
    }
}

def sendTelegram(message) {
    def encodedMessage = URLEncoder.encode(message, "UTF-8")

    withCredentials([string(credentialsId: "telegramToken", variable: "TOKEN"), string(credentialsId: "telegramChatId", variable: "CHAT_ID")]) {

        response = httpRequest (consoleLogResponseBody: true,
                contentType: 'APPLICATION_JSON',
                httpMode: 'GET',
                url: "https://api.telegram.org/bot${TOKEN}/sendMessage?text=${encodedMessage}&chat_id=${CHAT_ID}",
                validResponseCodes: '200')
        return response
    }
}
