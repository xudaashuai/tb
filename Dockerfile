FROM node:12 as build-stage

COPY package*.json /app/

COPY yarn.lock /app/

WORKDIR /app

RUN ls

RUN rm /usr/local/bin/yarn

RUN rm /usr/local/bin/yarnpkg

RUN npm install -g yarn

RUN yarn install --frozen-lockfile --registry=https://registry.npm.taobao.org

COPY . /app

RUN yarn build

FROM nginx

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
