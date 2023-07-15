import ClienteForm from "./ClienteForm";
import ServiciosForm from "./ServiciosForm";
import VehiculoForm from "./VehiculoForm";
import Orden from "./Orden";
import React, { useState, useEffect } from 'react';
import moment from 'moment';


const Principal = () =>{
    const [step, setStep] = useState(1);
    const [clienteData, setClienteData] = useState(null);
    const [vehiculoData, setVehiculoData] = useState(null);
    const [servicios, setServicios] = useState({})
    const [fechaEntrega, setFechaEntrega] = useState(null);
    const [showOrden, setShowOrden] = useState(false);
    const [infoCliente , setInfoCliente] = useState({})
    

    useEffect(() => {
      const currentDate = moment();
      const fechaEntrega = currentDate.add(5, 'days');
      setFechaEntrega(fechaEntrega);
      fetch('http://localhost:3001/orden/relacion', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        body: JSON.stringify({
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("API");
          console.log(data.cliente);
          if (data.cliente) {
            console.log("si tiene orden!")
            setShowOrden(true);
            setInfoCliente(data.cliente)
          }
        })
        .catch(error => {
          console.error(error);
        });
      
    }, []);
  
    const handleClienteFormSubmit = (data) => {
      setClienteData(data);
      setStep(2);
    };
  
    const handleVehiculoFormSubmit = (data) => {
      setVehiculoData(data);
      setStep(3);
    };
  
    const handleServiciosSubmit = (data) => {
      setServicios(data);
      setStep(4);
    };
  
    const handleFinalSubmit = (e) => {
      e.preventDefault();
      console.log({
        cliente: clienteData,
        vehiculo: vehiculoData,
        servicios,
        fechaEntrega
      })
      const clienteDataFetch= {
        cliente: clienteData,
        vehiculo: vehiculoData,
        servicios,
        fechaEntrega,
        estado : "Enviada"
      }
      fetch("http://localhost:3001/orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteDataFetch),
        credentials: 'include',
        withCredentials: true
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
      setStep(5);
    };
  
    const selectedServicios = Object.entries(servicios)
    .filter(([_, value]) => value)
    .map(([key, _]) => key);
  
    const renderStepContent = () => {
      if (showOrden) {
        return (
          <Orden infoCliente={infoCliente}
          />
        );
      }
      switch (step) {
        case 1:
          return <ClienteForm datos={handleClienteFormSubmit} />;
        case 2:
          return <VehiculoForm onSubmit={handleVehiculoFormSubmit} />;
        case 3:
          return <ServiciosForm onSubmit={handleServiciosSubmit} />;
        case 4:
          return (
            <>
              <form onSubmit={handleFinalSubmit} className="formulario">
                <h2>Revise los datos</h2>
                <h2>Cliente:</h2>
                {Object.keys(clienteData).map((key) => (
                  <p key={key}>
                    {key}: {clienteData[key]}
                  </p>
                ))}
                <h2>Vehículo:</h2>
                {Object.keys(vehiculoData).map((key) => (
                  <p key={key}>
                    {key}: {vehiculoData[key]}
                  </p>
                ))}
                <h2>Servicios:</h2>
                <div>
                  {selectedServicios.length > 0 ? (
                    <ul>
                      {selectedServicios.map((servicio) => (
                        <li key={servicio}>{servicio}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No se ha seleccionado ningún servicio.</p>
                  )}
                </div>
                <h2>Fecha estimada de entrega</h2>
                <div>
                  {fechaEntrega && <p>{fechaEntrega.format('LLL')}</p>}
                </div>
                <button type="submit">Generar orden de trabajo</button>
              </form>
            </>
          );
        case 5:
            return (
              <p>Orden generada correctamente!</p>
            );
        default:
          return null;
      }
    };
  
    return (

          <div>
            {renderStepContent()}
          </div>

    );
}

export default Principal;