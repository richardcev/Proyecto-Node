var express = require('express');
var router = express.Router();
const Orden = require('../models/orden');


router.get('/', (req, res) => {
    console.log('hola')
    if (req.session.user) {
      if(req.session.user.role === 'admin'){
        return Orden.getOrden((error, ordenes)=> {
          if (error) {
              return res.status(500).json({ code: 'UE', message: 'Unknown error'})
          }
          res.render('admin', { ordenes });
      });
      }
    }
    return res.redirect('/');


  });


  router.put('/cancelar/:id', (req, res) => {
    console.log('entré!')
    console.log(req.body)
    const id = req.params.id;
    const motivo = req.body.motivo;
    console.log(id)
    Orden.getOrdenById(id, (error, orden) => {
      if (error) {
        return res.status(500).json({ code: 'UE', message: 'Unknown error' });
      }
      console.log(orden)
      orden.estado = 'Cancelada';
      orden.motivoCancelacion = motivo

      orden.save()
      .then((ordenActualizada) => {
        res.json(ordenActualizada);
      })
      .catch((error) => {
        console.log('Error:', error);
        res.status(500).json({ error: 'Error al agendar cita' });
      });
    });
});


  router.delete('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    console.log("estoy en eliminar")
    Orden.deleteOrden(id, (error, elem) => {
      if (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error al eliminar la orden' });
      }

      res.json(elem);
    });
    });




  module.exports = router;