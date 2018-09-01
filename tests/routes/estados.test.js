const request = require('supertest');
const app = require('../../app/server');

const TokenManager = require('../../app/helpers/token-manager');

const configs = require('../../configs');

describe('Test Routes', () => {
  describe('EstadoController', () => {
    const Manager = new TokenManager(configs);
    const token = Manager.createToken();

    describe('GET /estados', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/v1/estados')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/v1/estados')
          .set('X-Api-Key', token)
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/v1/estados')
          .set('X-Api-Key', token)
          .then(response => {
            expect(typeof response.body).toBe('object');
          });
      });
    });

    describe('POST /estados', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .post('/v1/estados')
          .expect(401);
      });

      test('should have status 400 without body', () => {
        return request(app)
          .post('/v1/estados')
          .set('X-Api-Key', token)
          .expect(400);
      });

      test('should have status 200 with body', () => {
        return request(app)
          .post('/v1/estados')
          .set('X-Api-Key', token)
          .send({ nome: 'Rio de Janeiro', abreviacao: 'RJ' })
          .expect(200)
          .then(response => {
            expect(typeof response.body).toBe('object');
            expect(response.body.nome).toBe('Rio de Janeiro');
          });
      });
    });

    describe('GET /estados/:estadoId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/v1/estados/1')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/v1/estados/1')
          .set('X-Api-Key', token)
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/v1/estados/1')
          .set('X-Api-Key', token)
          .then(response => {
            expect(typeof response.body).toBe('object');
          });
      });
    });

    describe('PUT /estados/:estadoId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .put('/v1/estados/1')
          .expect(401);
      });

      test('should update entity', () => {
        return request(app)
          .put('/v1/estados/1')
          .set('X-Api-Key', token)
          .send({ nome: 'Rio de Janeiro', abreviacao: 'RJ' })
          .expect(200)
          .then(response => {
            expect(typeof response.body).toBe('object');
            expect(response.body.nome).toBe('Rio de Janeiro');
          });
      });
    });

    describe('DELETE /estados/:estadoId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .delete('/v1/estados/1')
          .expect(401);
      });

      test('should update entity', () => {
        return request(app)
          .delete('/v1/estados/1')
          .set('X-Api-Key', token)
          .expect(200)
          .then(response => {
            expect(response.body.length).toBe(1);
          });
      });
    });

    describe('GET /estados/search', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/v1/estados/search')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/v1/estados/search')
          .set('X-Api-Key', token)
          .query({ content: 'false' })
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/v1/estados/search')
          .set('X-Api-Key', token)
          .query({ content: 'false' })
          .then(response => {
            expect(typeof response.body).toBe('object');
            expect(response.body.total).toBeDefined();
            expect(response.body.selectedFilters).toBeDefined();
            expect(response.body.aggregations).toBeDefined();
          });
      });

      test('should have the selected aggregations', () => {
        return request(app)
          .get('/v1/estados/search')
          .set('X-Api-Key', token)
          .query({ content: 'false', filter: [JSON.stringify({ type: '_id', value: 1 })] })
          .then(response => {
            expect(response.body.selectedFilters).toEqual([{ type: '_id', value: 1 }]);
          });
      });
    });
  });
});
