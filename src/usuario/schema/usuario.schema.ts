import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  roles: {
    type: Array,
    required: true,
  },
});

UsuarioSchema.pre('save', function(next) {
  let usuario = this;
  if (!usuario.isModified('senha')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(usuario.senha, salt, (err, hash) => {
      if (err) return next(err);
      usuario.senha = hash;
      next();
    });
  });
});

UsuarioSchema.methods.checkPassword = function(attempt, callback) {
  let usuario = this;
  bcrypt.compare(attempt, usuario.senha, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

UsuarioSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.senha;
  delete obj._v;
  return obj;
};
