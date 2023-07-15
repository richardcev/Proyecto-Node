import React, { useState } from 'react';

function ServiciosForm({ onSubmit }) {
  const [servicios, setServicios] = useState({
    cambioAceite: false,
    cambioFrenos: false,
    alineacionBalanceo: false,
    diagnosticoGeneral: false,
    revisionElectrica: false,
    revisionSuspension: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setServicios((prevServicios) => ({ ...prevServicios, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(servicios);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Selección de servicios</h2>
      <label>
        <input
          type="checkbox"
          name="cambioAceite"
          checked={servicios.cambioAceite}
          onChange={handleCheckboxChange}
        />
        Cambio de aceite
      </label>
      <label>
        <input
          type="checkbox"
          name="cambioFrenos"
          checked={servicios.cambioFrenos}
          onChange={handleCheckboxChange}
        />
        Cambio de frenos
      </label>
      <label>
        <input
          type="checkbox"
          name="alineacionBalanceo"
          checked={servicios.alineacionBalanceo}
          onChange={handleCheckboxChange}
        />
        Alineación y balanceo
      </label>
      <label>
        <input
          type="checkbox"
          name="diagnosticoGeneral"
          checked={servicios.diagnosticoGeneral}
          onChange={handleCheckboxChange}
        />
        Diagnóstico general
      </label>
      <label>
        <input
          type="checkbox"
          name="revisionElectrica"
          checked={servicios.revisionElectrica}
          onChange={handleCheckboxChange}
        />
        Revisión del sistema eléctrico
      </label>
      <label>
        <input
          type="checkbox"
          name="revisionSuspension"
          checked={servicios.revisionSuspension}
          onChange={handleCheckboxChange}
        />
        Revisión de la suspensión
      </label>
      <button type="submit">Siguiente</button>
    </form>
  );
}

export default ServiciosForm;
