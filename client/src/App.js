import React, { Fragment } from "react";
import "./App.css"

//Components
import BarraMenu from "./components/BarraMenu"
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

    console.log(this.state);

    return(
      <div>
        <BarraMenu/>
        <div class="body">
          <input type='text' name='recomendador' onChange={this.myChangeHandler}></input>
         </div>
      </div>  
    )
  }


}

export default App;