import Router from '../Router';

describe('testing index js route', () => {
  it('should return true', () => {
    expect(true).toBe(true);
    let router = new Router();
    let handler = jest.fn();
    router.addRoute('/', handler);
  });
});
