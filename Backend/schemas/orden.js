const mongoose = require('mongoose');
const { Schema } = mongoose;
const Users = require('./users');

const ordenes = new mongoose.Schema({  
  cliente:{
    nombre: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
      },
      numeroContacto: {
        type: String,
        required: true
      },
      identificacionFiscal: {
        type: String,
        required: true
      },
      tipoIdentificacion: {
        type: String,
        required: true
      },
      usuario: {
        type: Schema.Types.ObjectId,
        ref: 'user' // Nombre del modelo de Usuario
      }
  },
  vehiculo: {
    marca: {
      type: String,
      required: true
    },
    modelo: {
      type: String,
      required: true
    },
    placa: {
      type: String,
      required: true,
    },
    nivelGasolina: {
      type: Number,
      required: true
    },
    detallesExteriores: {
      type: String
    }
  },
  servicios: {
    cambioAceite:{
        type: Boolean,
        required: true
    },
    cambioFrenos:{
        type: Boolean,
        required: true
    },
    alineacionBalanceo:{
        type: Boolean,
        required: true
    },
    diagnosticoGeneral:{
        type: Boolean,
        required: true
    },
    revisionElectrica:{
        type: Boolean,
        required: true
    },
    revisionSuspension:{
        type: Boolean,
        required: true
    }
  },
  fechaEntrega: {
    type: Date,
    required: true
  },
  estado: {
    type: String
  },
  motivoCancelacion: {
    type: String
  }
});

const Ordenes = mongoose.model('ordenes', ordenes);

module.exports = Ordenes;
