// @flow
import {extname} from 'path';

type Routes = Map<string, Function>;
type RequestResponseObject = {
  rq: *,
  rs: *,
};

class Router {
  routesy: Routes = new Map();

  addRoute(pattern: string, handler: Function) {
    this.routesy.set(pattern, handler);
  }

  handleRequest(patternName: string, context: RequestResponseObject) {
    let fileName = patternName.split('/').pop();
    let extension = extname(fileName);
    let {url} = context.rq;
    console.log('file name :', fileName);
    console.log('extension :', extension);
    console.log('url', url);

    if (extension) {
      // this is where file
      let keys = Array.from(this.routesy.keys());
      console.log('url', url);
      console.log(keys);
      console.log('file');
      let handler = this.routesy.get('/file/:fileName');
      if (handler) {
        handler(context, fileName);
      }

      // context.rs.end(`<p>not found</p> ${fileName}`);
    }
    let handler = this.routesy.get(patternName);
    if (handler) {
      handler(context);
    } else {
      handler = this.routesy.get('/404');
      if (handler) {
        handler(context);
      } else {
        context.rs.end('<p>404 not found</p>');
      }
    }
  }
}

export default Router;
