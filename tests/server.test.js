const request = require('supertest');
const app = require('../app/server');

describe('Test middlewares', () => {
  describe('General Application', () => {
    describe('GET /foo-bar', () => {
      test('should have status 404', () => {
        return request(app)
          .get('/foo-bar')
          .expect(404)
          .then(response => {
            expect(response.body.message).toBeDefined();
            expect(typeof response.body.message).toBe('string');

            expect(response.body.error).toBeDefined();
            expect(typeof response.body.error).toBe('string');
          });
      });
    });

    describe('GET /favicon.ico', () => {
      test('should have status 200', () => {
        return request(app)
          .get('/favicon.ico')
          .expect(200);
      });
    });
  });
});
