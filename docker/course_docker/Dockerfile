FROM ubuntu:latest

# RUN é executado enquanto a imagem está sendo buildada (docker build -t user/nomedaimg .)
# RUN apt-get update && apt-get install vim -y

# ENTRYPOINT é executado quando o container é rodado (docker run), ele pode ser substituido com:
# docker run --entrypoint=echo danielvinicius/ubuntu-hello 22 Batatas
# Nessa caso acima ele vai imprimir 22 Batatas mesmo o ENTRYPOINT no Dockerfile sendo diferente
# Só pode ter um ENTRYPOINT por Dockerfile
ENTRYPOINT ["echo", "Hello"]

# CMD é executado quando o container é rodado (docker run), ele pode ser substituido no final com:
# docker run ubuntu bash, esse bash é um comando que substitui o CMD padrão do ubuntu, caso eu não o colocasse ele ia rodar o CMD padrão da img do Ubuntu
# Só pode ter um CMD por Dockerfile
CMD ["World"]

# CMD pode ser usado como parâmetro pro ENTRYPOINT
# docker run danielvinicius/ubuntu-hello Daniel
# Imprime Hello Daniel
