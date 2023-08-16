## Deploying production app using docker 

#### 1. Run postgres in docker container
```
sudo docker run --name dev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest
```

#### 2. Add migrations to postgres inside docker
``` 
dotnet ef migrations add PostgresInitial -p Persistence -s API
```

#### 3. Run application to seed database
``` 
dotnet run 
```

#### 4. Build the image
```
sudo docker build -t {dockerhub_username}/reactivities .
```

#### 5. Run the application inside container
For windows/mac
```
sudo docker run --rm -it -p 8080:80 {dockerhub_username}/reactivities
```
For Linux distributions
```
sudo docker run --rm -it --add-host=host.docker.internal:host-gateway -p 8080:80 {dockerhub_username}/reactivities 
```

#### 6. Login to docker and push image
```
sudo docker login
sudo docker push {dockerhub_username}/reactivities:latest
```

#### 7. Deploying app to fly.io
```
fly launch --image {dockerhub_username}/reactivities:latest
```

Now add configurations in fly.toml
Add below in secrets list of fly.io
```
fly secrets set TokenKey={yourToken}
```
```
fly secrets set Cloudinary__ApiSecret={yourSecret}
```

Add the relevant configuration for flyio in ApplicationServiceExtensions.cs

Build the latest image and push to docker hub.

Run command
```
fly deploy
```
