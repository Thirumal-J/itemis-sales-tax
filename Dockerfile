FROM node:16.15.1
WORKDIR /sales-tax-app
COPY package.json /sales-tax-app
RUN npm install
COPY . /sales-tax-app
CMD ["npm", "test"]