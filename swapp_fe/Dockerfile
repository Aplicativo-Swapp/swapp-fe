# Use a imagem oficial do Node.js como base
FROM node:16-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo de dependências do projeto
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Compile a aplicação para produção
RUN npm run build

# Use uma imagem leve do servidor Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos compilados para a pasta de conteúdo do Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponha a porta padrão do Nginx
EXPOSE 80

# Comando de execução do Nginx
CMD ["nginx", "-g", "daemon off;"]
