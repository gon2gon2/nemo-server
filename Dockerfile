FROM node:lts
COPY . /nemo
WORKDIR /nemo
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata
RUN ["npm", "i"]
CMD ["npm", "run", "start"]