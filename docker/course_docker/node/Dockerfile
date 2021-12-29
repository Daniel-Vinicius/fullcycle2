FROM node:15

WORKDIR /usr/src/app

COPY . .

# EXPOSE Funciona como uma documentação pra quem vai rodar a img, não tem efeito
# Deve-se colocar -p do mesmo jeito ou usar network
EXPOSE 3000

CMD ["node", "index.js"]
