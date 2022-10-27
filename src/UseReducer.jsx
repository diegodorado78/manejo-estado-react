const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};
// const reducer= (state,action)=>{

// }
const reducerIf = (state, action) => {
  if (action.type === "ERROR") {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === "CHECK") {
    return {
      ...state,
      loading: true,
    };
  } else {
    return {
      ...state,
    };
  }
};

const reducerSwitch = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "CHECK":
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

const reducerObject = (state) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: {
    ...state,
    loading: true,
  },
});
const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    //si en el objeto reducer object hay un objeto que se llame como el action.type lo devuelve
    return reducerObject(state)[action.type];
  } else {
    return state; //si no hay ninguno que se llame igual devuelve el estado que recibio
  }
};
