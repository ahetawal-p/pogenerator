/* eslint-disable comma-dangle */
import App from './app';

const config = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/citybogo'
};
const app = new App(config);
app.start();
