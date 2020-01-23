import * as mongoose from 'mongoose';

export const VendaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    unique: true,
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
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

VendaSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._v;
  return obj;
};
