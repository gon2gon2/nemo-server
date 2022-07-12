FROM node:lts
COPY . /nemo
WORKDIR /nemo
RUN ["npm", "i"]
CMD ["npm", "run", "start"]