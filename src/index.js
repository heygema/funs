// @flow
import http, {createServer} from 'http';
import fs from 'fs';
import path, {join} from 'path';
import uuidv1 from 'uuid/v1';
import Router from './Router';

const mimes = {
  jpg: 'image/jpg',
  video: 'video/mp4',
  txt: 'text/plain',
  jpeg: 'image/jpeg',
  png: 'image/png',
  html: 'text/html'
};

const usersDummy = [
  {id: 1, name: 'Darcien', favoriteFood: 'pringles'},
  {id: 2, name: 'Yosua', favoriteFood: 'chicken'},
  {id: 3, name: 'Domi', favoriteFood: 'beef'}
];

let s = createServer();
let router = new Router();

function ServerErrorPage(rq, rs) {
  rs.writeHead(404, 'Content-Type', 'text/plain');
  rs.end(`<p>404. Anything you looking for, Not Found.</p>`);
}

function ServeFile(rq, rs, filePath) {
  let readStream = fs.createReadStream(filePath);
  let fileExt = filePath.split('.').pop();
  readStream.on('error', () => {
    ServerErrorPage(rq, rs);
  });
  readStream.pipe(rs);
  readStream.on('end', () => {
    rs.writeHead(200, {'Content-Type': mimes[fileExt]});
    rs.end();
  });
}

function UploadFile(rq, rs) {}

s.on('error', er => {
  console.log('error', er);
});

s.on('request', (rq, rs) => {
  router.handleRequest(rq.url, {rq, rs});
});

// adding route
router.addRoute('/', ({rq, rs}) => {
  let indexPath = join(__dirname, './index.html');
  ServeFile(rq, rs, indexPath);
});

router.addRoute('/file/:fileName', ({rq, rs}, fileName) => {
  let indexPath = join(__dirname, './index.html');
  ServeFile(rq, rs, indexPath);
});

router.addRoute('/user/:id', ({rq, rs}, id) => {
  let indexPath = join(__dirname, './index.html');
  ServeFile(rq, rs, indexPath);
});

s.listen(8000);

console.log('server start at 8000');
