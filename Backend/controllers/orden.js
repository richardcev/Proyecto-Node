var express = require('express');
var router = express.Router();
const Orden = require('../models/orden');
const Users = require('../models/users');

/* GET Cliente listing. */
router.get('/', (req, res) => {
  console.log('hola')  
  return Orden.getOrden((error, elems)=> {
      if (error) {
          return res.status(500).json({ code: 'UE', message: 'Unknown error'})
      }
      res.json(elems);
  });
});


// router.get('/:email', (req, res) => {
//     const email = req.params.email;
//     console.log(email)
//     Cliente.getClienteByEmail(email, (error, elems) => {
//       if (error) {
//         return res.status(500).json({ code: 'UE', message: 'Unknown error' });
//       }
//       res.json(elems);
//     });
// });



router.post('/', function (req, res) {
    console.log('Data:', req.body);
  
    const emailUsuario = req.session.user.email;
  

    Users.getUserByEmail(emailUsuario, (error, usuarioEncontrado) => {
      if (error) {
        return res.status(500).json({ code: 'UE', message: 'Unknown error' });
      }
      
      // Verifica si se encontró el usuario
      if (!usuarioEncontrado) {
        return res.status(404).json({ code: 'NF', message: 'User not found' });
      }
  
      Orden.createOrden(req.body, usuarioEncontrado, (error, ordenCreada) => {
        if (error) {
          return res.status(500).json({ code: 'UE', message: 'Unknown error' });
        }
        
        res.json({ code: 'OK', message: 'Saved successfully!', data: ordenCreada.toJSON() });
      });
    });
  });

  router.post('/relacion', function (req, res) {
  
    const emailUsuario = req.session.user.email;
    console.log("este es el email:", emailUsuario) 
  
    Users.getUserByEmail(emailUsuario, (error, usuarioEncontrado) => {
      if (error) {
        return res.status(500).json({ code: 'UE', message: 'Unknown error' });
      }
  
      // Verifica si se encontró el usuario
      if (!usuarioEncontrado) {
        return res.status(404).json({ code: 'NF', message: 'User not found' });
      }
  
      Orden.buscarOrdenPorUsuarioId(usuarioEncontrado, (error, ordenEncontrada) => {
        if (error) {
          return res.status(500).json({ code: 'UE', message: 'Unknown error' });
        }
  
        if (ordenEncontrada) {
          res.json({ cliente: ordenEncontrada });
        } else {
          // El cliente no fue encontrado
          res.status(404).json({ code: 'NF', message: 'No se encontró una orden relacionado para este usuario' });
        }
      });
    });
  });

  router.put('/:id', (req, res) => {
    const ordenId = req.params.id;
    console.log("este es el id de actualizar:", ordenId)
    console.log("estos son los nuevos campos: ")
    const nuevosCampos = req.body;
    console.log(nuevosCampos)
  
    Orden.actualizarOrden(ordenId, nuevosCampos, (error, ordenActualizada) => {
      if (error) {
        console.error('Error al actualizar la orden:', error);
        res.status(500).json({ error: 'Error al actualizar la orden' });
      } else {
        console.log('Orden actualizada:', ordenActualizada);
        res.json({ success: true, orden: ordenActualizada });
      }
    });
  });


  router.put('/actualizarestado/:id', (req, res) => {
    console.log('entré!')
    console.log(req.body)
    const id = req.params.id;
    const estado = req.params.estado
    console.log(id)
    Orden.getOrdenById(id, (error, orden) => {
      if (error) {
        return res.status(500).json({ code: 'UE', message: 'Unknown error' });
      }
      console.log(orden)
      orden.estado = estado;
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

// Middleware de autenticación básica
const basicAuth = (req, res, next) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [name, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Verificar las credenciales de autenticación
  if (name && password) {
    // Buscar el usuario en la base de datos por nombre
    Users.getUserByName(name, (error, user) => {
      if (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).send('Error al buscar el usuario.');
      }
      if (user && (user.name === 'admin' || user.name === 'operario') && user.password === password) {
        // Acceso concedido
        return next();
      }
      // Acceso denegado
      return res.status(401).send('Autenticación requerida.');
    });
  } else {
    // Acceso denegado
    return res.status(401).send('Autenticación requerida.');
  }
};



router.put('/estado/:id', basicAuth, (req, res) => {
  const ordenId = req.params.id;
  const nuevoEstado = req.body.estado;
  console.log("el estado es:")
  console.log(req.body)

  // Validar que el estado sea uno de los valores permitidos
  if (nuevoEstado !== 'Servicio en Proceso' && nuevoEstado !== 'Servicio Terminado') {
    return res.status(400).json({ error: 'El estado proporcionado no es válido' });
  }

  // Llamar a la función para actualizar el estado de la orden
  Orden.actualizarOrdenEstado(ordenId, nuevoEstado, (error, ordenActualizada) => {
    if (error) {
      console.error('Error al actualizar el estado de la orden:', error);
      return res.status(500).json({ error: 'Error al actualizar el estado de la orden' });
    }

    console.log('Orden actualizada:', ordenActualizada);
    res.json({ success: true, orden: ordenActualizada });
  });
});


module.exports = router;