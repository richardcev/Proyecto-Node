var express = require('express');
var router = express.Router();
const Orden = require('../models/orden');


router.get('/', (req, res) => {
    console.log('hola')
    if (req.session.user) {
      if(req.session.user.role === 'operario'){
        return Orden.getOrden((error, ordenes)=> {
          if (error) {
              return res.status(500).json({ code: 'UE', message: 'Unknown error'})
          }
          res.render('operario', { ordenes });
      });
      }
    }
    return res.redirect('/');

  });

router.put('/agendar/:id', (req, res) => {
    console.log('entré!')
    console.log(req.body)
    const id = req.params.id;
    console.log(id)
    const { fechaHora } = req.body;
    const fechaEntrega = new Date(fechaHora);
    Orden.getOrdenById(id, (error, orden) => {
      if (error) {
        return res.status(500).json({ code: 'UE', message: 'Unknown error' });
      }
      orden.fechaEntrega = fechaEntrega;
      orden.estado = 'Cita agendada';

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


module.exports = router;