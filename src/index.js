// @flow
import http from 'http';
import fs from 'fs';
import path from 'path';

let products = [
  {id: 1, name: 'apple', price: 2000},
  {id: 2, name: 'banana', price: 102000},
  {id: 3, name: 'manggo', price: 9300}
];

let server = http.createServer();

function ServerErrorPage(req, res) {
  res.writeHead(404, 'Content-Type', 'text/plain');
  res.end('<p>404. Page Not Found</p>');
}

function ServeFile(req, res, filePath) {
  let readStream = fs.createReadStream(filePath);
}

server.on('error', err => {
  console.log('error', err);
});

server.on('request', (req, res) => {
  const {method, url} = req;
  // if (method === 'GET') {
  switch (url) {
    case '/': {
      res.writeHead(200, 'Content-Type', 'text/plain');
      res.write('<p>Hello, World</p>');
      res.end();
      break;
    }
    case '/products': {
      res.writeHead(200, {'Content-Type': 'application/json'});
      let json = JSON.stringify(products);
      res.end(json);
      break;
    }
    case 'cat': {
      let filePath = path.join(__dirname, '../uploads/cat.jpg');
      fs.readFile(filePath, (err, image) => {
        if (err) ServerErrorPage(req, res);
      });
    }
    default: {
      ServerErrorPage(req, res);
      break;
    }
  }
});

server.listen(8000);
