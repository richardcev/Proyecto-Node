const Ordenes = require('../schemas/orden');

function getOrden(cb) {
    Ordenes.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}


function getOrdenById(id, cb) {
  Ordenes.findOne({  _id : id})
  .then((elem) => {
      return cb(null, elem);
  })
  .catch((error) => {
      console.log('Error:', error);
      return cb(error);
  })
}

function buscarOrdenPorUsuarioId(usuario, cb) {
    Ordenes.findOne({ 'cliente.usuario': usuario._id })
      .then((ordenEncontrada) => {
        if (ordenEncontrada) {
          cb(null, ordenEncontrada);
        } else {
          cb(null, null); 
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        cb(error);
      });
  };
  


function createOrden(datos, usuario, cb) {
    const nuevaOrden = new Ordenes({
      cliente: {
        nombre: datos.cliente.nombre,
        email: datos.cliente.email,
        numeroContacto: datos.cliente.numeroContacto,
        identificacionFiscal: datos.cliente.identificacionFiscal,
        tipoIdentificacion: datos.cliente.tipoIdentificacion,
        usuario: usuario._id
      },
      vehiculo: {
        marca: datos.vehiculo.marca,
        modelo: datos.vehiculo.modelo,
        placa: datos.vehiculo.placa,
        nivelGasolina: datos.vehiculo.nivelGasolina,
        detallesExteriores: datos.vehiculo.detallesExteriores
      },
      servicios: {
        cambioAceite: datos.servicios.cambioAceite,
        cambioFrenos: datos.servicios.cambioFrenos,
        alineacionBalanceo: datos.servicios.alineacionBalanceo,
        diagnosticoGeneral: datos.servicios.diagnosticoGeneral,
        revisionElectrica: datos.servicios.revisionElectrica,
        revisionSuspension: datos.servicios.revisionSuspension
      },
      fechaEntrega: datos.fechaEntrega,
      estado: datos.estado
    });
  
    nuevaOrden.save()
      .then((ordenCreada) => {
        cb(null, ordenCreada);
      })
      .catch((error) => {
        console.log('Error:', error);
        cb(error);
      });
  }


  async function actualizarOrden(ordenId, nuevosCampos, cb) {
    try {
      const ordenActualizada = await Ordenes.findByIdAndUpdate(ordenId, nuevosCampos, { new: true });
      cb(null, ordenActualizada);
    } catch (error) {
      console.error(error);
      cb(error);
    }
  }
  
  
  async function actualizarOrdenEstado(ordenId, nuevoEstado, cb) {
    try {
      const ordenActualizada = await Ordenes.findByIdAndUpdate(ordenId, { estado: nuevoEstado }, { new: true });
      cb(null, ordenActualizada);
    } catch (error) {
      console.error(error);
      cb(error);
    }
  }
  

  

function deleteOrden(id, cb) {
    Ordenes.findOneAndRemove({ _id: id})
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

exports.getOrden = getOrden;
exports.createOrden = createOrden;
exports.deleteOrden = deleteOrden;
exports.buscarOrdenPorUsuarioId= buscarOrdenPorUsuarioId;
exports.getOrdenById = getOrdenById;
exports.actualizarOrden= actualizarOrden;
exports.actualizarOrdenEstado = actualizarOrdenEstado;