const moment = require('../../../app/helpers/time-helper');

const mockedObj = [
  {
    _id: '1',
    nome: 'Rio de Janeiro',
    estadoId: '2',
    dataDeCriacao: '2018-08-31T15:52:58.342Z',
    dataDeAtualizacao: '2018-08-31T15:52:58.342Z',
  },
  {
    _id: '2',
    nome: 'Niterói',
    estadoId: '2',
    dataDeCriacao: '2018-08-31T15:53:12.852Z',
    dataDeAtualizacao: '2018-08-31T15:53:12.853Z',
  },
  {
    _id: '3',
    nome: 'Sorocaba',
    estadoId: '1',
    dataDeCriacao: '2018-08-31T15:57:36.944Z',
    dataDeAtualizacao: '2018-08-31T15:57:36.944Z',
  },
];

const Mock = jest.fn().mockImplementation(() => ({
  get: () => {
    return new Promise(resolve => {
      resolve(
        mockedObj.map(obj => {
          return Object.assign({}, obj, {
            toJSON: () => obj,
          });
        })
      );
    });
  },
  getById: id => {
    return new Promise((resolve, reject) => {
      try {
        const ob = mockedObj.find(cidade => cidade._id === id);
        if (!ob) throw 'Could not find document';

        resolve(ob);
      } catch (err) {
        reject({
          err,
        });
      }
    });
  },
  create: rawState => {
    const newState = Object.assign({}, rawState, {
      dataDeCriacao: rawState.dataDeCriacao ? rawState.dataDeCriacao : moment().toISOString(),
      dataDeAtualizacao: moment().toISOString(),
    });

    return new Promise((resolve, reject) => {
      try {
        const ob = mockedObj.find(cidade => cidade.nome === newState.nome);
        const isInvalid = !newState.nome || !newState.estadoId;

        if (ob || isInvalid) throw 'Error';

        resolve(newState);
      } catch (err) {
        reject({
          err,
        });
      }
    });
  },
  update: (id, rawState) => {
    return new Promise((resolve, reject) => {
      try {
        const ob = mockedObj.find(cidade => cidade._id === id);

        if (!ob) throw 'Error';

        const newState = Object.assign({}, ob, rawState, {
          dataDeAtualizacao: moment().toISOString(),
        });

        resolve(newState);
      } catch (err) {
        reject({
          err,
        });
      }
    });
  },
  delete: id => {
    return new Promise((resolve, reject) => {
      try {
        const filteredOb = mockedObj.filter(cidade => cidade._id !== id);

        if (filteredOb.length === mockedObj.length) throw 'Error';

        resolve(filteredOb);
      } catch (err) {
        reject({
          err,
        });
      }
    });
  },
}));

jest.mock('../../../app/models/cidade.js', () => Mock);
