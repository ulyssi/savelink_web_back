

mkdir -p /tmp/savelink_back/
cp -r /media/ext_drive/01_shared/03_jenkins/current/workspace/018_deploy_savelink_back_dev/* /tmp/savelink_back/
cd /tmp/savelink_back/
npm i 
cd /media/ext_drive/01_shared/02_dev/006/03_src
docker-compose stop
sleep 5 
rm -rf *
cp -r /tmp/savelink_back/* .
cp -r /media/ext_drive/01_shared/03_jenkins/current/workspace/018_deploy_savelink_back_dev/*.env .
source /media/ext_drive/04_softwares/01_sources/alias/src/commons/commons_functions.sh
f_load_config_file /media/ext_drive/01_shared/03_jenkins/current/workspace/043_update_password/01_savelink_database/01_password_dev.txt docker-compose.yml
f_load_config_file /media/ext_drive/01_shared/03_jenkins/current/workspace/043_update_password/01_savelink_database/01_password_dev.txt conf/config.js
docker-compose up -d 
rm -rf  /tmp/savelink_back/
