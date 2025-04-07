FROM ubuntu:latest  

ENV DEBIAN_FRONTEND=noninteractive  

RUN apt update && apt install -y curl  

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt install -y nodejs  

WORKDIR /app  

COPY package.json package-lock.json ./  

RUN npm install  

COPY . .  

EXPOSE 3000  

CMD ["node", "index.js"]
