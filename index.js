// @flow
import http from 'http';
import fs from 'fs';
import path from 'path';

let picturespromise = new Promise((resolve, reject) => {
  fs.readFile('./uploads/cat.jpg', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

let products = [
  {id: 1, name: 'apple', price: 2000},
  {id: 2, name: 'banana', price: 102000},
  {id: 3, name: 'manggo', price: 9300}
];

let server = http.createServer();

server.on('error', err => {
  console.log('error', err);
});

server.on('request', (req, res) => {
  const {method, url} = req;
  if (method === 'GET') {
    switch (url) {
      case '/': {
        res.writeHead(200, 'Content-Type', 'text/html');
        res.write('<p>Hello, World</p>');
      }
      case '/products': {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let json = JSON.stringify(products);
        res.end(json);
        break;
      }
      case '/image/cat.jpg': {
        picturespromise
          .then(data => {
            if (!data) throw new Error('error');
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(data);
          })
          .catch(err => {
            res.writeHead(400, {'Content-Type': 'text/html'});
            res.end('no such thing');
          });
        break;
      }
      default: {
        res.statusCode = 404;
        res.end();
        break;
      }
    }
  } else if (method === 'POST') {
    console.log('not yet invented');
  }
});

server.listen(8000);
