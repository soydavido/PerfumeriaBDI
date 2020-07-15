import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import "./style.css";
import logo from "./images/LogoBlanco.png"
import "./App.css"
import Inicio from "./components/Inicio"
import Evaluacion from "./components/Evaluacion"
import Consulta from "./components/Consulta"
import Recomendador from "./components/Recomendador"
import TablaPruebaInicio from "./components/TablaPruebaInicio"

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inicio: "1",
      consulta: "",
      evaluacion: "",
      recomendador: ""
    }
  }
  
  myChangeHandler = (event) =>{
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
    console.log(this.state);
    if(event.target.value==1){
      this.setState({inicio:"1",consulta:"",evaluacion:"",recomendador:""});
    }
    else{
      if(event.target.value==2){
        this.setState({inicio:"",consulta:"1",evaluacion:"",recomendador:""});
      }
      else{
        if(event.target.value==3){
          this.setState({inicio:"",consulta:"",evaluacion:"1",recomendador:""});
        }
        if(event.target.value==4){
          this.setState({inicio:"",consulta:"",evaluacion:"",recomendador:"1"});
        }
      }
    }
}

  render(){
    let activo="";
    console.log(this.state);

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
        }
      }
    }



    return(
      <div>
        <nav class="sidebar">
            <div class="sidebar-header">
                <img src={logo} width="40" height="40"/>
                <h3 className="text mt-3 ml-5">Adomatics</h3>
                <ul>
                    <button className="boton-barra-menu-inicio">Inicio</button>
                    <button className="boton-barra-menu-consulta">Consulta</button>
                    <button className="boton-barra-menu-evaluacion">Evaluacion</button>
                    <button className="boton-barra-menu-recomendador">Recomendador</button>
                    
                </ul>
            </div>  
        </nav>
      </div>  
    )
  }


}

export default App;