// @flow
import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeType = {
  jpg: 'image/jpg',
  video: 'video/mp4',
  txt: 'text/plain',
  jpeg: 'image/jpeg',
  png: 'image/png'
};

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

// FIXME: fix serve file;
function ServeFile(req, res, filePath) {
  let readStream = fs.createReadStream(filePath);
  // res.writeHead()
  res.end(filePath);
}

server.on('error', err => {
  console.log('error', err);
});

server.on('request', (req, res) => {
  const {method, url} = req;
  if (url.startsWith('/file/')) {
    let fileName = url.slice(6);
    res.end(fileName);
    return;
  }
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
    case '/cat': {
      let filePath = path.join(__dirname, '../uploads/cat.jpg');
      console.log(filePath);
      fs.readFile(filePath, (err, image) => {
        if (err) {
          ServerErrorPage(req, res);
        } else {
          res.writeHead(200, {'Content-Type': 'image/jpg'});
          res.end(image);
        }
      });
      break;
    }
    default: {
      ServerErrorPage(req, res);
      break;
    }
  }
});

server.listen(8000);
