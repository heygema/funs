// @flow
import fs from 'fs';

type Routes = Map<string, Function>;

class Router {
  routes: Routes = new Map();

  addRoute(pattern: string, handler: Function) {
    this.routes.set(pattern, handler);
  }

  handleRequest(patternName: string, context: Object) {
    let handler = this.routes.get(patternName);
    if (handler) {
      handler(context);
    } else {
      handler = this.routes.get('/404');
      if (handler) {
        handler(context);
      } else {
        context.rs.end('<p>404 not found</p>');
      }
    }
  }
}

export default Router;
