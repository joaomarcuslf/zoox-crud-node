const request = require('supertest');
const app = require('../../app/server');

describe('Test Routes', () => {
  describe('ApplicationController', () => {
    describe('GET /', () => {
      test('should have status 200', () => {
        return request(app)
          .get('/api/v1')
          .expect(200)
          .then(response => {
            expect(response.body.message).toBeDefined();
            expect(typeof response.body.message).toBe('string');
          });
      });
    });
  });
});
