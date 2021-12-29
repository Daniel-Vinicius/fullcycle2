FROM node:15

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY . .

# EXPOSE Funciona como uma documentação pra quem vai rodar a img
# Deve-se colocar -p do mesmo jeito ou usar network
# Ele expõe a porta não para seu computador e sim para a rede que ele esta, pra outros containers
EXPOSE 3000

# CMD ["node", "index.js"]
