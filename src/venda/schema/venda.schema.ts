import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UsuarioSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

UsuarioSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj._v;
  return obj;
};
