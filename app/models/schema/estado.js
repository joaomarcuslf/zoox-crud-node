const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  nome: { type: String, required: true, unique: true },
  abreviacao: { type: String, required: true, unique: true },
  dataDeCriacao: { type: String, required: true },
  dataDeAtualizacao: { type: String, required: true },
});

module.exports = StateSchema;
