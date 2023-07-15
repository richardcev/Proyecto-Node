
import { useState } from "react";
const Orden = ({infoCliente}) =>{
    const enviada = infoCliente.estado === "Enviada"
    const [campos, setCampos] = useState({
      cliente: { ...infoCliente.cliente },
      vehiculo: { ...infoCliente.vehiculo },
      servicios: { ...infoCliente.servicios },
    });
  


    const handleInputChange = (event, campo, subCampo) => {
      const { value, type, checked } = event.target;
    
      if (type === "checkbox") {
        setCampos(prevState => ({
          ...prevState,
          [campo]: {
            ...prevState[campo],
            [subCampo]: checked,
          },
        }));
      } else {
        setCampos(prevState => ({
          ...prevState,
          [campo]: {
            ...prevState[campo],
            [subCampo]: value,
          },
        }));
      }
    };
    

    const handleActualizar = () =>{
      fetch(`http://localhost:3001/orden/${infoCliente._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Orden actualizada:', data);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al actualizar la orden:', error);
          // Manejar el error de la solicitud
        });
    };
    return(
        <div className="orden">
          <h2 className="titulo-orden">Orden generada</h2>

          <h2>Cliente:</h2>
          <div className="columnas">
        {Object.keys(infoCliente.cliente).map((key) => {
          if (key === 'usuario') {
            return null; // No se renderiza el key "usuario"
          }
          return (
            <div className="columna">
              <label>{key}</label>
              {
                enviada ?
                <input
                  type="text" 
                  defaultValue={infoCliente.cliente[key]} 
                  onChange={event => handleInputChange(event, 'cliente', key)}
                  className="margin-input"
                 />
                :
                <input type="text" value={infoCliente.cliente[key]} className="margin-input"></input>
              }
            </div>
          );
        })}
        </div>
          <h2>Vehículo:</h2>
          <div className="columnas">
          {Object.keys(infoCliente.vehiculo).map((key) => (
            <div className="columna">
            <label>{key}</label>
            {
                enviada ?
                <input 
                type="text" 
                defaultValue={infoCliente.vehiculo[key]} 
                className="margin-input"
                onChange={event => handleInputChange(event, 'vehiculo', key)}
                />
                :
                <input type="text" value={infoCliente.vehiculo[key]} className="margin-input"></input>
            }
            </div>
          ))}
          </div>
          <h2>Servicios:</h2>
          <div>
            {Object.keys(infoCliente.servicios).length > 0 ? (
              <div>
                {Object.keys(infoCliente.servicios).map((key) => (
                  <div className="servicios">
                    <label className="checkbox-label">
                      {
                        enviada ? <input type="checkbox"
                        className="checkbox-input"
                        defaultChecked={infoCliente.servicios[key].toString() === "true"}
                        onChange={event => handleInputChange(event, 'servicios', key)}
                         />
                         :
                         <input type="checkbox"
                        className="checkbox-input"
                        checked={infoCliente.servicios[key].toString() === "true"}
                         /> 
                      }

                      <p className="servicio-texto">
                        {key}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No se ha seleccionado ningún servicio.</p>
            )}
          </div>
          <h2>Fecha estimada de entrega</h2>
          <div>{infoCliente.fechaEntrega}</div>
          {/* <div>
            {infoCliente.fechaEntrega && <p>{infoCliente.fechaEntrega.format('LLL')}</p>}
          </div> */}
          <h2>Estado</h2>
          <div>{infoCliente.estado}</div>

          {
            enviada ? <button className="btn-actualizar" onClick={handleActualizar}>Actualizar datos</button>
            : null
          }
      </div>


    )
}

export default Orden;