import React from "react";
import { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ nombre }) {
  const [state, dispatch] = useReducer(reducer, { initialState });
  const onWrite = (newValue) => {
    dispatch({ type: actionTypes.write, payload: newValue }); //newValue.target.value
  };
  const onConfirm = () => dispatch({ type: actionTypes.confirm }); //return implicito de una sola linea
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

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
          // onChange={onWrite}//Como en el metodo arriba dice que recibe un value seria el evento y lo llamo arriba como e.target.value
        />
        <p>{state.value}</p>
        <button
          onClick={onCheck} // es igual a tener el arrow function y dentro llamarla
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
        <button onClick={onDelete}>Si</button>
        <button onClick={onReset}>No</button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con Exito</p>
        <button onClick={onReset}>Volver atrás</button>
      </>
    );
  }
}
const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};
const actionTypes = {
  confirm: "CONFIRM",
  check: "CHECK",
  write: "WRITE",
  delete: "DELETE",
  reset: "RESET",
  error: "ERROR",
};

const reducerObject = (state, payload) => ({
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    //si en el objeto reducer object hay un objeto que se llame como el action.type lo devuelve
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state; //si no hay ninguno que se llame igual devuelve el estado que recibio
  }
};
// const reducer= (state,action)=>{

// }
// const reducerIf = (state, action) => {
//   if (action.type === "ERROR") {
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     };
//   } else if (action.type === "CHECK") {
//     return {
//       ...state,
//       loading: true,
//     };
//   } else {
//     return {
//       ...state,
//     };
//   }
// };

// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case "ERROR":
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };
//     case "CHECK":
//       return {
//         ...state,
//         loading: true,
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };

export { UseReducer };
