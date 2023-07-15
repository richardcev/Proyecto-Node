import React, { useState } from 'react';
import './InfoCliente.css'

function VehiculoForm({ onSubmit }) {
  const [vehiculoData, setVehiculoData] = useState({
    marca: '',
    modelo: '',
    placa: '',
    nivelGasolina: '',
    detallesExteriores: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehiculoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vehiculoData);
  };

  return (
    <form onSubmit={handleSubmit} className='formulario'>
      <h2>Datos del vehículo</h2>
      <label>Marca:</label>
      <input
        type="text"
        name="marca"
        placeholder="Marca del vehículo"
        value={vehiculoData.marca}
        onChange={handleInputChange}
        required
      />
      <label>Modelo</label>
      <input
        type="text"
        name="modelo"
        placeholder="Modelo del vehículo"
        value={vehiculoData.modelo}
        onChange={handleInputChange}
        required
      />
      <label>Placa: </label>
      <input
        type="text"
        name="placa"
        placeholder="Placa del vehículo"
        value={vehiculoData.placa}
        onChange={handleInputChange}
        required
      />
      <label>Gasolina: </label>
      <input
        type="text"
        name="nivelGasolina"
        placeholder="Nivel de gasolina"
        value={vehiculoData.nivelGasolina}
        onChange={handleInputChange}
        required
      />
      <label>Estado</label>
      <textarea
        name="detallesExteriores"
        placeholder="Estado exterior del vehículo (abolladuras, rayones, etc.)"
        value={vehiculoData.detallesExteriores}
        onChange={handleInputChange}
      />
      <button type="submit">Siguiente</button>
    </form>
  );
}

export default VehiculoForm;
