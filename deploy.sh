#!/bin/bash

# 실행 중인 도커 컴포즈 확인
EXIST_A=$(sudo docker-compose -p kukemeet-a -f docker-compose.a.yml ps | grep Up)

if [ -z "${EXIST_A}" ]
then
        # B가 실행 중인 경우
        START_CONTAINER=a
        TERMINATE_CONTAINER=b
        START_PORT=3000
        TERMINATE_PORT=3001
else
        # A가 실행 중인 경우
        START_CONTAINER=b
        TERMINATE_CONTAINER=a
        START_PORT=3001
        TERMINATE_PORT=3000
fi

echo "kukemeet-${START_CONTAINER} up"

sudo docker-compose -p kukemeet-${START_CONTAINER} -f docker-compose.${START_CONTAINER}.yml up -d --build

echo "next start!"
echo "change nginx server port"

sudo sed -i "s/${TERMINATE_PORT}/${START_PORT}/" /etc/nginx/conf.d/service-url.inc

echo "nginx reload.."
sudo service nginx reload

echo "kukemeet-${TERMINATE_CONTAINER} down"
sudo docker-compose -p kukemeet-${TERMINATE_CONTAINER} -f docker-compose.${TERMINATE_CONTAINER}.yml down
echo "success deployment"

