import React from "react";
import { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ nombre }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
  });
  // const [value, setValue] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setloading] = useState(false);

  useEffect(() => {
    console.log("empezando efecto");
    if (!!state.loading) {
      // setState({
      //   error: false,
      // });
      setTimeout(() => {
        //emula la validación en el backend
        console.log("empezando validacion");
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
          });
        } else {
          setState({
            ...state,
            error: true,
            loading: false,
          });
        }
        console.log("terminando validacion");
      }, 1000);
    }

    console.log("terminando efecto");
  }, [state]);

  return (
    <div>
      <h2> Eliminar {nombre}</h2>
      <p>Por favor,escribe el código de seguridad</p>
      {/* valiacion dentro de la interfaz para comprobar el estado y renderizar */}
      {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
      {state.loading && <p>Cargando...</p>}

      <input
        placeholder="codigo de seguridad"
        type="text"
        onChange={(e) => {
          // setError(false);
          // setValue(e.target.value);
          setState({
            ...state,
            value: e.target.value,
          });
        }}
      />
      <p>{state.value}</p>
      <button
        onClick={() => {
          setState({
            ...state,
            error: false,
            loading: true,
          });
        }}
        // setloading(true);
        // setError(false);
      >
        Comprobar
      </button>
      {/* <button onClick={() => setError(prevState=>!prevState)}>Comprobar</button> */}
    </div>
  );
}

export { UseState };
