import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import "./style.css";
import logo from "./images/LogoBlanco.png"
import "./App.css"
import Inicio from "./components/Inicio"
import Evaluacion from "./components/Evaluacion"
import Consulta from "./components/Consulta"
import Recomendador from "./components/Recomendador"
import Contrato from "./components/Contrato"
import Compras from "./components/Compras"
import CrearFormula from "./components/CrearFormula"

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inicio: "",
      consulta: "",
      evaluacion: "",
      recomendador: "",
      contrato: "",
      compra: "1",
      crearformula: ""
    }
  }
  
  myChangeHandler = (event) =>{
    let nam = event.target.name;
    let val = event.target.value;
    console.log(event.target.name);
    this.setState({[nam]: val});
    console.log(this.state);
    if(event.target.name=="inicio"){
      this.setState({inicio:"1",consulta:"",evaluacion:"",recomendador:"",compra:"",contrato:"",crearFormula:""});
    }
    else{
      if(event.target.name=="consulta"){
        this.setState({inicio:"",consulta:"1",evaluacion:"",recomendador:"",compra:"",contrato:"",crearFormula:""});
      }
      else{
        if(event.target.name=="evaluacion"){
          this.setState({inicio:"",consulta:"",evaluacion:"1",recomendador:"",compra:"",contrato:"",crearFormula:""});
        }
        else{
          if(event.target.name=="recomendador"){
            this.setState({inicio:"",consulta:"",evaluacion:"",recomendador:"1",compra:"",contrato:"",crearFormula:""});
          }
          else{
            if(event.target.name=="compra"){
              this.setState({inicio:"",consulta:"",evaluacion:"",recomendador:"",compra:"1",contrato:"",crearFormula:""});
            }
            else{
              if(event.target.name=="contrato"){
                this.setState({inicio:"",consulta:"",evaluacion:"",recomendador:"",compra:"",contrato:"1",crearFormula:""});
              }
              else{
                if(event.target.name=="crearformula"){
                  this.setState({inicio:"",consulta:"",evaluacion:"",recomendador:"",compra:"",contrato:"",crearformula:"1"});
                }
              }
            }
          }
        }
      }
    }
}

  render(){
    let activo="";

    if (this.state.inicio){
      ReactDOM.render(<Inicio/>,document.getElementById("contenido"))
    }
    else{
      if (this.state.consulta){
        ReactDOM.render(<Consulta/>,document.getElementById("contenido"))
      }
      else{
        if (this.state.evaluacion){
          ReactDOM.render(<Evaluacion/>,document.getElementById("contenido"))
        }
        else{
          if (this.state.recomendador){
            ReactDOM.render(<Recomendador/>,document.getElementById("contenido"))
          }
          else{
            if(this.state.contrato){
              ReactDOM.render(<Contrato/>,document.getElementById("contenido"));
            }
            else{
              if(this.state.compra){
                ReactDOM.render(<Compras/>,document.getElementById("contenido"));
              }
              else{
                console.log(this.state.crearformula);
                if(this.state.crearformula){
                  console.log("creame");
                  ReactDOM.render(<CrearFormula/>,document.getElementById("contenido"));
                }
              }
            }
          }
        }
      }
    }
    return(
      <div>
        <nav class="sidebar">
            <div class="sidebar-header">
              <tr>
                <th><img src={logo} width="40" height="40"/></th>
                <th><h3 className="text mt-3 ml-5">Adomatics</h3></th>
              </tr>
                <ul>
                    <button className="boton-barra-menu-inicio" name="inicio" onClick={this.myChangeHandler}>Inicio</button>
                    <button className="boton-barra-menu-consulta" name="crearformula" onClick={this.myChangeHandler}>Crear Formula</button>
                    <button className="boton-barra-menu-evaluacion" name="evaluacion" onClick={this.myChangeHandler}>Evaluacion</button>  
                    <button className="boton-barra-menu-contrato" name="contrato" onClick={this.myChangeHandler}>Contrato</button>
                    <button className="boton-barra-menu-compras" name="compra" onClick={this.myChangeHandler}>Compras</button>
                    <button className="boton-barra-menu-recomendador" name="recomendador" onClick={this.myChangeHandler}>Recomendador</button>
                </ul>
            </div>  
        </nav>
      </div>  
    )
  }


}

export default App;