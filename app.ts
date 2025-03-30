import initApp from "./server";
import https from 'https';
import http from 'http';
import fs from 'fs';
const port = process.env.PORT;

console.log("app starting...");
initApp().then((app) => {
  if (process.env.NODE_ENV !== 'production'){
    console.log('development');
    http.createServer(app).listen(process.env.PORT);
  }
  const options = {
    key: fs.readFileSync('./client-key.pem'),
    cert: fs.readFileSync('./client-cert.pem')
  };
  https.createServer(options, app).listen(process.env.HTTPS_PORT);
});
