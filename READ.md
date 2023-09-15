<!-- install docker on ububtu -->
https://docs.docker.com/engine/install/ubuntu/
<!-- install nginx on ubuntu 20.04 -->
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04
<!-- install certbot on nginx,ubuntu -->
https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04



<!-- check ว่า ในเครื่องมี port อะไรบ้างที่ run อยู่ -->
ss -ltup 

<!-- check status nginx -->
systemctl status nginx

<!-- set up proxy nginx => etc/nginx/sites-available -->
cd etc/nginx/sites-available
    <!-- 1) ลบ /sites-available/default ออก แล้ว set up ใหม่ (ลบที่ sites-enabled ด้วย) -->
    rm etc/nginx/sites-available/default
    rm etc/nginx/sites-enabled/default
    <!-- 2)  เข้าไปที่ sites-available สร้าง web.conf (สำหรับ client) -->
    cd etc/ninx/sites-available/
    nano web.conf
        <!-- 2.1) เพิ่ม proxy_pass -->
        server {
            server_name app.mumpatomporn.xyz www.app.mumpatomporn.xyz;
            
            location / {
                proxy_pass http://127.0.0.1:3001;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_set_header Host $http_host;
            }
        }

    <!-- 3)  เข้าไปที่ sites-available สร้าง server.conf (สำหรับ api) -->
    cd etc/ninx/sites-available/
    nano server.conf
        <!-- 3.1) เพิ่ม proxy_pass -->
        server {
            server_name server.mumpatomporn.xyz www.server.mumpatomporn.xyz;
            
            location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_set_header Host $http_host;
            }
        }
    
    <!-- 4.) link sites-available => sites-enabled -->
    sudo ln -s /etc/nginx/sites-available/web.conf /etc/nginx/sites-enabled/
    sudo ln -s /etc/nginx/sites-available/server.conf /etc/nginx/sites-enabled/

<!-- relaod nginx -->
systemctl reload nginx

<!-- check status nginx -->
systemctl status nginx