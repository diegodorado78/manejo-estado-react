import React from "react";
import { useState, useEffect } from "react";
const SECURITY_CODE = "paradigma";
function UseState({ nombre }) {
  const [value, setValue] = useState("");

  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    console.log("empezando efecto");
    if (loading) {
      setError(false);
      setTimeout(() => {
        //emula la validación en el backend
        console.log("empezando validacion");
        if (value !== SECURITY_CODE) {
          setError(true);
        }
        // } else {
        //   setError(false);
        // }
        setloading(false);

        console.log("terminando validacion");
      }, 1000);
    }
    console.log("terminando efecto");
  }, [loading, value]);

  return (
    <div>
      <h2> Eliminar {nombre}</h2>
      <p>Por favor,escribe el código de seguridad</p>
      {/* valiacion dentro de la interfaz para comprobar el estado y renderizar */}
      {error && !loading && <p>Error: el codigo es incorrecto</p>}
      {loading && <p>Cargando...</p>}

      <input
        placeholder="codigo de seguridad"
        type="text"
        onChange={(e) => {
          // setError(false);
          setValue(e.target.value);
        }}
      />
      <p>{value}</p>
      <button
        onClick={() => {
          setloading(true);
          setError(false);
        }}
      >
        Comprobar
      </button>
      {/* <button onClick={() => setError(prevState=>!prevState)}>Comprobar</button> */}
    </div>
  );
}

export { UseState };
