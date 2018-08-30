const { UNAUTHORIZED, NOT_FOUND } = require('./status');

module.exports = {
  // Not Found Resource
  NOT_FOUND: {
    status: NOT_FOUND,
    error: 'ERRO: NÃO ENCONTRADO',
    message: 'O recurso requisitado não pode ser encontrado',
  },

  // Expired Token
  EXPIRED_TOKEN: {
    status: UNAUTHORIZED,
    error: 'ERRO: TOKEN EXPIRADA',
    message: 'A token utilizada se encontra expirada, por favor renove',
  },

  // No token
  NO_TOKEN: {
    status: UNAUTHORIZED,
    error: 'ERRO: NÃO FOI ENCONTRADA TOKEN',
    message: 'A token não foi encontrada, verifique se está autenticado',
  },

  // Invalid token
  INVALID_TOKEN: {
    status: UNAUTHORIZED,
    error: 'ERRO: TOKEN INVÁLIDA',
    message: 'A token não é válida, verifique se está autenticado',
  },
};
