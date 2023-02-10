FROM nginx:alpine

# 외부에서 하는 작업
# npm i
# npm run build

COPY dist/ /usr/share/nginx/html/
COPY nginx-conf/default.conf /etc/nginx/conf.d/default.conf
