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
    }
  }
}

export default Router;
