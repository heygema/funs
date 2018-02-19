// @flow
import {createServer} from 'http';
import {join} from 'path';
import Router from './Router';
import {ServeFile} from './RequestHandlers';

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
  ServeFile(rq, rs, indexPath);
});

router.addRoute('/404', ({rq, rs}) => {
  let filePath = join(__dirname, './404.html');
  ServeFile(rq, rs, filePath);
});

router.addRoute('/file/:fileName', ({rq, rs}, fileName) => {
  let filePath = join(__dirname, '../uploads/', fileName);
  console.log(filePath);
  ServeFile(rq, rs, filePath);
});

s.listen(8000);

console.log('server start at 8000');
