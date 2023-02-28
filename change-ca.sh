#! /bin/sh
set -e

ROOT_DIR="$(echo $(pwd))"
CA_PASSWORD=b309309

# get service name list
cd $ROOT_DIR/spring-framework
SERVICE_LIST="$(echo $(ls -d *-service))"
cd $ROOT_DIR

# generate pkcs & move the files into each service.
cd $ROOT_DIR/ca_archive

echo "generate pkcs for api-gateway"
openssl pkcs12 -export -in fullchain1.pem -inkey privkey1.pem -out keystore.p12 -CAfile chain1.pem -caname root  -password pass:b309309
cp keystore.p12 $ROOT_DIR/spring-framework/api-gateway/src/main/resources/
cp cert1.pem $ROOT_DIR/spring-framework/api-gateway/src/main/resources/


for service_name in $SERVICE_LIST
do
    echo "generate pkcs for $service_name"
    openssl pkcs12 -export -in fullchain1.pem -inkey privkey1.pem -out $service_name.p12 -CAfile chain1.pem -caname root  -password pass:b309309
    cp $service_name.p12 $ROOT_DIR/spring-framework/$service_name/src/main/resources/
done
cd $ROOT_DIR