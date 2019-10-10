FROM node:10.16.3

USER node
RUN mkdir /home/node/dev
WORKDIR /home/node/dev

CMD ["npm", "run", "start"]