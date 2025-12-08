# set up jenkins

## Start Jenkins container

```
docker run -d `
  --name jenkins `
  -p 8080:8080 -p 50000:50000 `
  -v jenkins_home:/var/jenkins_home `
  jenkins/jenkins:lts-jdk17
```

### Check if Jenkins is running

```
docker ps
```

2, Get initial admin password

```
docker logs jenkins | Select-String "Initial admin password"
# Or access container logs in Docker Desktop
```

admin password: or jane
9357316d886e452da4545f18e36a7939

## Access Jenkins

http://localhost:8080

## Install plugins

1. Install suggested plugins
2. Create first admin user
3. Instance configuration
4. Start using Jenkins

## Create a Pipeline job for your project
