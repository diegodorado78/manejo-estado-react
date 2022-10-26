import React, { Component } from "react";
import { Loading } from "./Loading";
const SECURITY_CODE = "paradigma";

class ClassState extends Component {
  constructor(props) {
    super(props); //habilitamos que super reciba props para modificar comportamiento
    this.state = {
      //al pasarle los props a super voy a poder modificar los datos de "this"
      value: "",
      error: false,
      loading: false,
    };
    //cuando queremos modificar this en una clase pero queremos que aparezcan las propiedas de la clase padre, debemos llamar a super(props) y enviarle las props
  }
  //metodos del ciclo de vida
  componentDidUpdate() {
    console.log("el componente se actualizó");

    if (this.state.loading) {
      setTimeout(() => {
        console.log("empezando validacion");
        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false }); //forma de cambiar dos states de una vez
        }
        console.log("terminando validacion");
      }, 1000);
    }
  }
  render() {
    return (
      <div>
        <h2> Eliminar {this.props.nombre}</h2>
        <p>Por favor,escribe el codigo de seguridad</p>
        {this.state.error && !this.state.loading && (
          <p>Error: el codigo es incorrecto</p>
        )}
        {this.state.loading && <Loading />}

        <input
          placeholder="Código de seguridad"
          type="text"
          value={this.state.value}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
        />
        <p>{this.state.value}</p>

        <button onClick={() => this.setState({ loading: !this.state.loading })}>
          {/* <button
          onClick={() =>
            this.setState((prevState) => ({ error: !prevState.error }))
          }
        > */}
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
