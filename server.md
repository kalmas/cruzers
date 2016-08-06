# nginx

sudo apt-get install nginx

sudo vim /etc/nginx/sites-available/default

```
server {
        listen 80 default_server;

        location / {
                proxy_pass http://127.0.0.1:8080;
        }
}
```

sudo service nginx restart


# elasticsearch

sudo apt-get install elasticsearch

sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
java -version

sudo update-rc.d elasticsearch defaults 95 10
