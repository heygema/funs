// @flow
type RouteHandler<Context> = (
  context: Context,
  pathData: string | Array<string>,
) => void;

type Routes<Context> = Map<string, RouteHandler<Context>>;

function patterMatch(pattern: string, path: string) {}

class Router<Context> {
  routes: Routes<Context> = new Map();

  addRoute(pattern: string, handler: RouteHandler<Context>) {
    this.routes.set(pattern, handler);
  }

  handleRequest(patternName: string, context: Context) {
    // TODO: match pattern and path received -> execute handler
    let routesKeys = Array.from(this.routes.keys());
  }
}

export default Router;
