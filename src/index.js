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

server.on('request', (req, res) => {
  router.handleRequest(req.url, {req, res});
});

// adding route
router.addRoute('/', ({req, res}) => {
  let indexPath = join(__dirname, './index.html');
  ServeFile(req, res, indexPath);
});

router.addRoute('/submit-json', ({req, res}) => {
  // TODO: check request body
  let result;
  req.on('data', (chnk) => {
    result += chnk;
  });

  req.on('end', () => {
    console.log(JSON.parse(result));
    res.end();
  });
  // jsonData = req.body;
});

//FIXME: fix this join path
// router.addRoute('/file/:fileName', ({req, res}, fileName) => {
//   if (Array.isArray(fileName)) {
//     fileName = fileName.join('');
//   }
//   let filePath = join(__dirname, '../uploads/', fileName);
//   ServeFile(req, res, filePath);
// });

server.listen(8000);

console.log('server start at 8000');
