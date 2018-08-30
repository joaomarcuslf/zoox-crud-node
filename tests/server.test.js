const request = require('supertest');
const app = require('../app/server');

describe('Test ApplicationController', () => {
  test('It should response the GET /api', () => {
    return request(app)
      .get('/api/v1')
      .expect(200);
  });
});
