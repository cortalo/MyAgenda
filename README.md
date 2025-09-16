```
docker container run --name mymysql \
-e MYSQL_ROOT_PASSWORD=mypassword \
-v mysql_data:/var/lib/mysql \
-p 3306:3306 \
-d mysql:8.0

docker container exec -it mymysql mysql -u root -p

create database community;
use community;
source init_shema.sql
source init_data.sql
```