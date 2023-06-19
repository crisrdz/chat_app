# ChatApp
Bienvenido/a a la documentación de la aplicación ChatApp.

## Descripción

Esta aplicación de Node.js es una aplicación completa (contiene tanto Frontend como Backend) que permite el chat entre los usuarios registrados con amigos o usuarios públicos utilizando React como librería de Frontend y Express.js para la construcción de la API en el Backend, sumado a la librería Socket.io para lograr un chat en tiempo real, además de la persistencia de los datos de los usuarios, chats y mensajes en una base de datos MongoDB.

## Requisitos
- Node.js (versión 18.15.0)
- NPM (versión 9.5.0)

No está garantizado su funcionamiento con versiones anteriores.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```shell
   git clone https://github.com/crisrdz/chat_app.git
   ```

2. Navega al directorio del proyecto:

   ```shell
   cd chat_app
   ```

3. Instala las dependencias del servidor:

   ```shell
   npm install
   ```

4. Navega al directorio del cliente:

   ```shell
   cd client

5. Instala las dependencias del cliente:

   ```shell
   npm install

6. Vuelve al directorio raíz del proyecto:

   ```shell
   cd ..

## Configuración

1. Crea un archivo `.env` en el directorio raíz del proyecto y proporciona los siguientes valores:
   
   ```plaintext
   PORT = 3000
   DB_NAME = tu-url-de-mongodb
   SECRET_KEY = tu-llave-secreta

Asegúrate de reemplazar tu-url-de-mongodb con la URL de tu base de datos MongoDB.

## Uso

### Si deseas ejecutar el proyecto en modo desarrollo

1. Inicia el servidor:

   ```shell
   npm run dev

Esto iniciará el servidor de Node.js utilizando Express.js en el puerto especificado en el archivo .env.

2. Inicia la aplicación cliente en una nueva terminal:

   ```shell
   cd client
   npm run dev
Esto iniciará la aplicación cliente de React en el navegador.

Abre tu navegador y visita http://localhost:5173 para ver y utilizar la aplicación de listas de TODO en modo desarrollo.

### Si deseas ejecutar el proyecto en modo producción

1. Inicia el proyecto:

   ```shell
   npm start

Esto iniciará el servidor de Node.js utilizando Express.js en el puerto especificado en el archivo .env y, para ver y utilizar la aplicación visita en tu navegador la url http://localhost:3000.

## Autor
Este proyecto fue desarrollado por **Cristofer Rodríguez Elgueta**. Contacto: cristofer.rodriguez.elgueta@gmail.com.

**¡Gracias por leer!**