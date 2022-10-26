import React from "react";
import { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ nombre }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  const onConfirm = () => {
    //metodo que abstrae la logica y queda util para cada vez que se necesite
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };
  const onError = () => {
    //metodo que abstrae la logica y queda util para cada vez que se necesite
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };
  const onWrite = (newvalue) => {
    setState({
      ...state,
      value: newvalue,
    });
  };
  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };
  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };
  const onReset = () => {
    setState({
      value: "",
      error: false,
      loading: false,
      confirmed: false,
    });
  };
  useEffect(() => {
    console.log("empezando efecto");
    if (!!state.loading) {
      setTimeout(() => {
        //emula la validación en el backend
        console.log("empezando validacion");
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
        console.log("terminando validacion");
      }, 1000);
    }

    console.log("terminando efecto");
  });

  //returns condicionales de acuerdo a los estados
  if (!state.deleted && !state.confirmed) {
    //render inicial donde no se ha confirmado ni eliminado el codigo
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
            onWrite(e.target.value);
          }}
        />
        <p>{state.value}</p>
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Comprobar
        </button>
        {/* <button onClick={() => setError(prevState=>!prevState)}>Comprobar</button> */}
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>¿Estas seguro de eliminar el código? </p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Si
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No
        </button>
      </>
    );
  } else {
    //confirmed y deleted true
    return (
      <>
        <p>Eliminado con Exito</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Volver atras
        </button>
      </>
    );
  }
}

export { UseState };
