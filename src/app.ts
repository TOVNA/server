import initApp from "./server";
import https from 'https';
import http from 'http';
import fs from 'fs';

console.log("app starting...");
initApp().then((app) => {
  if (process.env.NODE_ENV === 'production'){
    const options = {
      key: fs.readFileSync('./client-key.pem'),
      cert: fs.readFileSync('./client-cert.pem')
    };
    https.createServer(options, app).listen(process.env.HTTPS_PORT);
    console.log('Production Environment');
  }
  else {
    console.log('development environment');
    http.createServer(app).listen(process.env.PORT);
  }
});
