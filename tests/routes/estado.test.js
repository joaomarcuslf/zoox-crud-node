const request = require('supertest');
const app = require('../../app/server');

const TokenManager = require('../../app/helpers/token-manager');

const configs = require('../../configs');

describe('Test Routes', () => {
  describe('EstadoController', () => {
    const Manager = new TokenManager(configs);
    const token = Manager.createToken();

    describe('GET /estado', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/api/v1/estado')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/api/v1/estado')
          .set('x-api-key', token)
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/api/v1/estado')
          .set('x-api-key', token)
          .then(response => {
            expect(typeof response.body).toBe('object');
          });
      });
    });

    describe('POST /estado', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .post('/api/v1/estado')
          .expect(401);
      });

      test('should have status 400 without body', () => {
        return request(app)
          .post('/api/v1/estado')
          .set('x-api-key', token)
          .expect(400);
      });

      test('should have status 200 with body', () => {
        return request(app)
          .post('/api/v1/estado')
          .set('x-api-key', token)
          .send({ nome: 'Rio de Janeiro', abreviacao: 'RJ' })
          .expect(200)
          .then(response => {
            expect(typeof response.body).toBe('object');
            expect(response.body.nome).toBe('Rio de Janeiro');
          });
      });
    });

    describe('GET /estado/:estadoId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/api/v1/estado/1')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/api/v1/estado/1')
          .set('x-api-key', token)
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/api/v1/estado/1')
          .set('x-api-key', token)
          .then(response => {
            expect(typeof response.body).toBe('object');
          });
      });
    });

    describe('PUT /estado/:estadoId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .put('/api/v1/estado/1')
          .expect(401);
      });

      test('should update entity', () => {
        return request(app)
          .put('/api/v1/estado/1')
          .set('x-api-key', token)
          .send({ nome: 'Rio de Janeiro', abreviacao: 'RJ' })
          .expect(200)
          .then(response => {
            expect(typeof response.body).toBe('object');
            expect(response.body.nome).toBe('Rio de Janeiro');
          });
      });
    });

    describe('DELETE /estado/:estadoId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .delete('/api/v1/estado/1')
          .expect(401);
      });

      test('should update entity', () => {
        return request(app)
          .delete('/api/v1/estado/1')
          .set('x-api-key', token)
          .expect(200)
          .then(response => {
            expect(response.body.length).toBe(1);
          });
      });
    });
  });
});
