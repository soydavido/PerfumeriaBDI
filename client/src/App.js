import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import "./App.css"
import Inicio from "./components/Inicio"
import Evaluacion from "./components/Evaluacion"
import Consulta from "./components/Consulta"
import Recomendador from "./components/Recomendador"

//Components
import BarraMenu from "./components/BarraMenu"
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inicio: "",
      consulta: "1",
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
    }



    return(
      <div>
        <BarraMenu/>
        {activo}
      </div>  
    )
  }


}

export default App;