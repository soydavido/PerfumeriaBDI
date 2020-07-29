import "./../style.css";
import Inicio from "./Inicio";
import React,{ Fragment, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import styles from "../style.css"
import InputFuncional from "./InputFuncional";



class CrearFormula extends React.Component{

    constructor(props){
        super(props);
        this.state={
            productor_activo: "",
            evaluacion_activa: "",
            calificacion_total: "",
            productores: [],
            formula: [],
            variable_auxiliar:0,
            criterio_exito:0,
            limite_superior: 0, limite_inferior:0,
            variable_1:0, variable_2:0, variable_3:0,
            tipo_eva:[
              {
                id: 1,
                value: "Inicial"
              },
              {
                id: 2,
                value: "Anual"
              }
            ],
              variables: [
                { 
                  id: "1",
                  nombre: "Ubicacion Geografica",
                  peso: " "
                },
                {
                    id: "2",
                    nombre: "Costos y alternativas de envíos",
                    peso: " " 
                },
                {
                    id: "3",
                    nombre: "Alternativas y condiciones de pago",
                    peso: " "  
                }
              ]
        
        }
    }


    handleProductorActivo = (ProdValue) => {
        console.log(ProdValue);
        this.setState({productor_activo: ProdValue});
    }

    //Funcion para cambiar datos desde el hijo, name es el nombre del atributo a cambiar, y dataFromChild es la informacion a cambiar
    myCallback = (name,dataFromChild) => {
      this.setState({[name]: dataFromChild});
    }
    //Funcion para setear lo obtenido en las variables
    myInputScoreCallback = (name,valor) => {
      this.setState({[name]: parseInt(valor,10)});
    }

    handleSubmit = async(event) => {
      var sumatotal=this.state.variable_1+this.state.variable_2+this.state.variable_3;
      var valido=1;
      if((this.state.criterio_exito<=sumatotal)&&(sumatotal=100)&&(this.state.evaluacion_activa!=="")&&(this.state.productor_activo)){
          console.log("EU");
          let estructura = {
            fk_prod: this.state.productor_activo,
            criterio_exito: parseInt(this.state.criterio_exito),
            limite_i: parseInt(this.state.limite_inferior),
            limite_s: parseInt(this.state.limite_superior)
          };
          const res= await fetch(`http://localhost:5000/registroFormula/`,{
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(estructura)
        });
      }
    }

    setStateAsync(state){
      return new Promise(resolve =>{
        this.setState(state,resolve);
      });
    }

    async componentDidMount(){
        
            const res= await fetch('http://localhost:5000/productores/')
             const lista = await res.json();
            await this.setStateAsync({productores: lista});
   
      }

    myChangeHandler = (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render(){
      console.log(this.state);
      var variables=this.state.variables;
      var extension=(this.state.variables).length;
      var variableList= variables.map(objeto=>{
        return(
          <tr key={objeto.id}>
              <td>{objeto.nombre}</td>
              <td><input></input></td>
              <td>{objeto.peso_total}</td>
            </tr>
        )
      });
        return(
            <div className="body">
                <h1 className="mt-3 ml-3">Crear Formulas</h1>
            <div>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4>
                    <th><Dropdown data={this.state.productores} nombre={"productor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Tipo de evaluacion</h4>
                    <th><Dropdown data={this.state.tipo_eva} nombre={"evaluacion_activa"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Escala de evaluacion</h4>
                    <th><input name="limite_inferior" class="input-cantidad" type="number" onChange={this.myChangeHandler}></input></th>
                    <h5></h5>
                    <th><input name="limite_superior" class="input-cantidad" type="number" onChange={this.myChangeHandler}></input></th>
                </tr>
                <h4 class="ml-3 mt-3">Formula</h4>
                <table className="table-pers ml-3 mt-3">
                <thead>
                  <tr class="table-borders">
                    <th >Variable</th>
                    <th >Peso</th>
                  </tr>
                </thead>
                <tbody>
                  {variables.map(objeto=>{ 
                    return(
                    <tr key={objeto.id} class="table-borders">
                      <td>{objeto.nombre}</td>
                      <td><InputFuncional papa="variable_" informacion={objeto} callbackInputParent={this.myInputScoreCallback}/></td>
                      <td >{objeto.peso_total}</td>
                    </tr>
                    )
                  })}
                  </tbody>
                </table>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Criterio de Exito</h4>
                    <th><input name="limite_inferior" class="input-cantidad" type="number" onChange={this.myChangeHandler}></input></th>
                </tr>
                <button class="btn btn-warning mt-3 ml-3" onClick={this.handleSubmit}>Enviar Evaluacion</button>
                <button class="btn btn-delete mt-3 ml-3">Cancelar</button>
            </div>
            </div>
        )
        console.log(this.state.productor_activo);
    }
}

export default CrearFormula;