## Docker commands for Ubuntu 

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
sudo docker build -t ahmedtariq08/reactivities .
```

#### 5. Run the application inside container
For windows/mac
```
sudo docker run --rm -it -p 8080:80 ahmedtariq08/reactivities
```
For Linux distributions
```
sudo docker run --rm -it --add-host=host.docker.internal:host-gateway -p 8080:80 ahmedtariq08/reactivities 
```

