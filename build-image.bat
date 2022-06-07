docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build -f Dockerfile-New -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t2:dev .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t2:dev
pause