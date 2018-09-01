const request = require('supertest');
const app = require('../../app/server');

const TokenManager = require('../../app/helpers/token-manager');

const configs = require('../../configs');

describe('Test Routes', () => {
  describe('CidadeController', () => {
    const Manager = new TokenManager(configs);
    const token = Manager.createToken();

    describe('GET /cidade', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/v1/cidade')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/v1/cidade')
          .set('x-api-key', token)
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/v1/cidade')
          .set('x-api-key', token)
          .then(response => {
            expect(typeof response.body).toBe('object');
          });
      });
    });

    describe('POST /cidade', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .post('/v1/cidade')
          .expect(401);
      });

      test('should have status 400 without body', () => {
        return request(app)
          .post('/v1/cidade')
          .set('x-api-key', token)
          .expect(400);
      });

      test('should have status 200 with body', () => {
        return request(app)
          .post('/v1/cidade')
          .set('x-api-key', token)
          .send({ nome: 'Lambari', estadoId: '1' })
          .expect(200)
          .then(response => {
            expect(typeof response.body).toBe('object');
            expect(response.body.nome).toBe('Lambari');
          });
      });
    });

    describe('GET /cidade/:cidadeId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/v1/cidade/1')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/v1/cidade/1')
          .set('x-api-key', token)
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/v1/cidade/1')
          .set('x-api-key', token)
          .then(response => {
            expect(typeof response.body).toBe('object');
          });
      });
    });

    describe('PUT /cidade/:cidadeId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .put('/v1/cidade/1')
          .expect(401);
      });

      test('should update entity', () => {
        return request(app)
          .put('/v1/cidade/1')
          .set('x-api-key', token)
          .send({ nome: 'Lambari' })
          .expect(200)
          .then(response => {
            expect(typeof response.body).toBe('object');
            expect(response.body.nome).toBe('Lambari');
          });
      });
    });

    describe('DELETE /cidade/:cidadeId', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .delete('/v1/cidade/1')
          .expect(401);
      });

      test('should update entity', () => {
        return request(app)
          .delete('/v1/cidade/1')
          .set('x-api-key', token)
          .expect(200)
          .then(response => {
            expect(response.body.length).toBe(2);
          });
      });
    });

    describe('GET /cidade/search', () => {
      test('should have status 401 without header', () => {
        return request(app)
          .get('/v1/cidade/search')
          .expect(401);
      });

      test('should have status 200 with header', () => {
        return request(app)
          .get('/v1/cidade/search')
          .set('x-api-key', token)
          .query({ content: 'false' })
          .expect(200);
      });

      test('should have body with array', () => {
        return request(app)
          .get('/v1/cidade/search')
          .set('x-api-key', token)
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
          .get('/v1/cidade/search')
          .set('x-api-key', token)
          .query({ content: 'false', filter: [JSON.stringify({ type: '_id', value: 1 })] })
          .then(response => {
            expect(response.body.selectedFilters).toEqual([{ type: '_id', value: 1 }]);
          });
      });
    });
  });
});
