// @flow
import http from 'http';
import fs from 'fs';
import path from 'path';
import uuidv1 from 'uuid/v1';

const formPage = new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, 'index.html'), (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

const mimes = {
  '.jpg': 'image/jpg',
  '.video': 'video/mp4',
  '.txt': 'text/plain',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.html': 'text/html'
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

function ServeFormPage(req, res) {
  formPage
    .then(data => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    })
    .catch(err => {
      ServerErrorPage(req, res);
    });
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
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(path.extname(fileName));
    return;
  }
  if (url.startsWith('/file')) {
    res.end('file');
    return;
  }

  switch (url) {
    case '/': {
      ServeFormPage(req, res);
      break;
    }
    case '/products': {
      res.writeHead(200, {'Content-Type': 'application/json'});
      let json = JSON.stringify(products);
      res.end(json);
      break;
    }
    case '/upload': {
      // FIXME:
      // let writeStream = fs.createWriteStream(uuidv1().toString() + '.txt');
      let uploadPath = path.join(__dirname, '../uploads/');
      req.on('data', data => {
        console.log(data);
        res.write(data);
        fs.writeFile(uploadPath + uuidv1().toString() + '.txt', data, err => {
          if (err) console.log(err);
          console.log('write finish');
        });
      });
      req.on('end', () => {
        res.end();
      });
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
