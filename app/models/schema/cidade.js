const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  nome: { type: String, required: true, unique: true },
  estadoId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Estado' },
  dataDeCriacao: { type: String, required: true },
  dataDeAtualizacao: { type: String, required: true },
});

module.exports = StateSchema;
