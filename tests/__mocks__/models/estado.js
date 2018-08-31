const moment = require('../../../app/helpers/time-helper');

let mockedObj = [
  {
    _id: '1',
    nome: 'São Paulo',
    abreviacao: 'SP',
    dataDeCriacao: '2018-08-31T01:03:43.405Z',
    dataDeAtualizacao: '2018-08-31T01:03:43.405Z',
    __v: 0,
  },
  {
    _id: '2',
    nome: 'Minas Gerais',
    abreviacao: 'MG',
    dataDeCriacao: '2018-08-31T01:21:23.537Z',
    dataDeAtualizacao: '2018-08-31T01:21:23.537Z',
    __v: 0,
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
        const ob = mockedObj.find(estado => estado._id === id);
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
        const ob = mockedObj.find(estado => estado.nome === newState.nome || estado.abreviacao === newState.abreviacao);
        const isInvalid = !newState.nome || !newState.abreviacao;

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
        const ob = mockedObj.find(estado => estado._id === id);

        if (!ob) throw 'Error';

        const newState = Object.assign(ob, rawState, {
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
        const filteredOb = mockedObj.filter(estado => estado._id !== id);

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

jest.mock('../../../app/models/estado.js', () => Mock);
