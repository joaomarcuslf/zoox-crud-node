const request = require('supertest');
const app = require('../../app/server');

describe('Test Routes', () => {
  describe('AuthController', () => {
    describe('GET /auth', () => {
      test('should have status 200', () => {
        return request(app)
          .get('/v1/auth')
          .expect(200)
          .then(response => {
            expect(response.body.token).toBeDefined();
            expect(typeof response.body.token).toBe('string');
          });
      });
    });
  });
});
