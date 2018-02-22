// @flow
import {createServer} from 'http';
import {join} from 'path';
import Router from './Router';
import {ServeFile} from './ServeHandlers';

let server = createServer();
let router = new Router();

server.on('error', (er) => {
  console.log('error', er);
});

server.on('request', (rq, rs) => {
  router.handleRequest(rq.url, {rq, rs});
});

// adding route
router.addRoute('/', ({rq, rs}) => {
  let indexPath = join(__dirname, './index.html');
  ServeFile(rq, rs, indexPath);
});

router.addRoute('/submit-json', ({rq, rs}) => {
  // TODO: check request body
  let result;
  rq.on('data', (chnk) => {
    result += chnk;
  });

  rq.on('end', () => {
    console.log(JSON.parse(result));
    rs.end();
  });
  // jsonData = req.body;
});

//FIXME: fix this join path
router.addRoute('/file/:fileName', ({rq, rs}, fileName) => {
  if (Array.isArray(fileName)) {
    fileName = fileName.join('');
  }
  let filePath = join(__dirname, '../uploads/', fileName);
  ServeFile(rq, rs, filePath);
});

server.listen(8000);

console.log('server start at 8000');
