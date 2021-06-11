docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build --build-arg BuildEnv=prod_bin -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby2-bin:prod .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby2-bin:prod
pause