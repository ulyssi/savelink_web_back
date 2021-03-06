
source /home/pi/.profile
sudo mount -t cifs -o uid=1000,file_mode=0777,dir_mode=0777,gid=1000,credentials=/home/pi/.smbcredentials  //192.168.0.20/ext_drive  /media/ext_network


cd /media/ext_drive/01_shared/01_prod/006/03_src
docker-compose stop 

rm -rf /media/ext_drive/01_shared/01_prod/006/03_src/* 
cp -rv /media/ext_network/01_shared/02_dev/006/03_src/* .
chmod -R a+rw /media/ext_drive/01_shared/01_prod/006/03_src

cp  /media/ext_network/01_shared/03_jenkins/current/workspace/018_deploy_savelink_back_dev/docker-compose.yml .
cp  /media/ext_network/01_shared/03_jenkins/current/workspace/018_deploy_savelink_back_dev/scripts/03_config.js src/conf/config.js .
source /media/ext_network/04_softwares/01_sources/alias/src/commons/commons_functions.sh
f_load_config_file /media/ext_network/01_shared/03_jenkins/current/workspace/043_update_password/01_savelink_database/02_password_prod.txt docker-compose.yml
f_load_config_file /media/ext_network/01_shared/03_jenkins/current/workspace/043_update_password/01_savelink_database/02_password_prod.txt src/conf/config.js

 

docker-compose up -d 
[ $? -ne 0 ] && exit 1;
docker logs  savelink_back_node_1 