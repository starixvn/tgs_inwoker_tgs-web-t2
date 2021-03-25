docker login registry.gitlab.com -u jennhong@inwoker.com
docker build -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby:dev .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby:dev
pause