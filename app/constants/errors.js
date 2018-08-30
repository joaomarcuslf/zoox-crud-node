const { UNAUTHORIZED, NOT_FOUND, BAD_REQUEST } = require('./status');

module.exports = {
  GENERIC_ERROR: {
    error: 'ERRO: TRANSAÇÃO INVÁLIDA',
    message: 'Houve algum erro durante a transação, cheque os dados e tente novamente',
  },

  NOT_FOUND: {
    status: NOT_FOUND,
    error: 'ERRO: NÃO ENCONTRADO',
    message: 'O recurso requisitado não pode ser encontrado',
  },

  EXPIRED_TOKEN: {
    status: UNAUTHORIZED,
    error: 'ERRO: TOKEN EXPIRADA',
    message: 'A token utilizada se encontra expirada, por favor renove',
  },

  NO_TOKEN: {
    status: UNAUTHORIZED,
    error: 'ERRO: NÃO FOI ENCONTRADA TOKEN',
    message: 'A token não foi encontrada, verifique se está autenticado',
  },

  INVALID_TOKEN: {
    status: UNAUTHORIZED,
    error: 'ERRO: TOKEN INVÁLIDA',
    message: 'A token não é válida, verifique se está autenticado',
  },

  INVALID_FIELDS: {
    status: BAD_REQUEST,
    error: 'ERRO: CAMPOS INVÁLIDOS',
    message: 'A transação não pôde ser concluída pois alguns campos estão inválidos',
  },
};
