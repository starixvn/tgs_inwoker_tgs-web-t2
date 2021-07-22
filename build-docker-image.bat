docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build --build-arg BuildEnv=staging -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t2:staging .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-gpi-t2:dev
pause