const TokenManager = require('../../app/helpers/token-manager');

const configs = require('../../configs');

describe('Test Helpers', () => {
  describe('TokenManager', () => {
    const Manager = new TokenManager(configs);

    describe('#createToken', () => {
      test('should return a token', () => {
        const token = Manager.createToken();

        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
      });
    });

    describe('#validateToken', () => {
      test('should throw error for no token', done => {
        Manager.validateToken().catch(error => {
          expect(error).toBeDefined();
          expect(typeof error).toBe('object');
          expect(error.status).toBe(401);
          expect(error.error).toBe('ERRO: NÃO FOI ENCONTRADA TOKEN');
          done();
        });
      });

      test('should throw error for expired token', done => {
        const token =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzIjoiMjAxOC0wOC0zMFQxNTozNzo0Mi44NDdaIn0.XGyPEUP5qLy1S5JVD9vuqMEFc6AG8AePlxuHf0Qr3po';
        Manager.validateToken(token).catch(error => {
          expect(error).toBeDefined();
          expect(typeof error).toBe('object');
          expect(error.status).toBe(401);
          expect(error.error).toBe('ERRO: TOKEN EXPIRADA');
          done();
        });
      });

      test('should be valid', done => {
        const token = Manager.createToken();
        Manager.validateToken(token).then(done);
      });
    });
  });
});
