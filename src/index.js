// @flow
import http, {createServer} from 'http';
import path, {join} from 'path';
import uuidv1 from 'uuid/v1';
import Router from './Router';
import {ServeFile, ServeErrorPage} from './RequestHandlers';

const usersDummy = [
  {id: 1, name: 'Darcien', favoriteFood: 'pringles'},
  {id: 2, name: 'Yosua', favoriteFood: 'chicken'},
  {id: 3, name: 'Domi', favoriteFood: 'beef'},
];

let s = createServer();
let router = new Router();

s.on('error', (er) => {
  console.log('error', er);
});

s.on('request', (rq, rs) => {
  router.handleRequest(rq.url, {rq, rs});
});

// adding route
router.addRoute('/', ({rq, rs}) => {
  let indexPath = join(__dirname, './index.html');
  let r = ServeFile(rq, rs, indexPath);
});

router.addRoute('/404', ({rq, rs}) => {
  let filePath = join(__dirname, './404.html');
  let r = ServeFile(rq, rs, filePath);
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
