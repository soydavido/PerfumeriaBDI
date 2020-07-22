import "./../style.css";
import Inicio from "./Inicio";
import React,{ Fragment, useState } from "react";
import Dropdown from "./Dropdown";
import styles from "../style.css"
import InputFuncional from "./InputFuncional";



class Evaluacion extends React.Component{

    constructor(props){
        super(props);
        this.state={
            proveedor_activo: "",
            productor_activo: "",
            evaluacion_activa: "",
            calificacion_total: "",
            variable_1:"", variable_2:"", variable_3:"", variable_4:"", variable_5:"",
            variable_6:"", variable_7:"", variable_8:"", variable_9:"", variable_10:"",
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
            items : [
                {
                  id: 1,
                  value: 'Pulp Fiction',
                },
                {
                  id: 2,
                  value: 'The Prestige',
                },
                {
                  id: 3,
                  value: 'Blade Runner 2049',
                },
              ],
              items2 : [
                {
                  id: 1,
                  value: 'Fiction',
                },
                {
                  id: 2,
                  value: 'Testige',
                },
                {
                  id: 3,
                  value: 'Blade 2049',
                },
              ],
              variables: [
                { 
                  id: "1",
                  nombre: "Flexibilidad",
                  obtenido: "",
                  peso_total: "20"
                },
                {
                  id: "2",
                  nombre: "Envios",
                  obtenido: "",
                  peso_total: "40"
                },
                {
                  id: "3",
                  nombre: "Puntualidad",
                  obtenido: "",
                  peso_total: "30"
                },
                {
                  id: "4",
                  nombre: "Capacidad",
                  obtenido: "",
                  peso_total: "10"
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
    myInputScoreCallback = (nombre,valor) => {
      this.setState({[nombre]: valor});
    }
    validarPuntuajes = () => {
      
    }

    render(){

      //  console.log("Soy el activo ahora"+this.state.productor_activo);
      console.log(this.state);
      var variables=this.state.variables;
      var extension=(this.state.variables).length;
      console.log(extension);
      var variableList= variables.map(objeto=>{
        return(
          <tr key={objeto.id}>
              <td>{objeto.nombre}</td>
              <td><input></input></td>
              <td>{objeto.peso_total}</td>
            </tr>
        )
      })

        return(
          <form>
            <div className="body">
                <h1 className="mt-3 ml-3">Evaluacion de proveedores</h1>
            <div>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4>
                    <th><Dropdown data={this.state.items} nombre={"productor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del proveedor</h4>
                    <th><Dropdown data={this.state.items2} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Tipo de evaluacion</h4>
                    <th><Dropdown data={this.state.tipo_eva} nombre={"evaluacion_activa"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <h4 class="ml-3 mt-3">Formula</h4>
                <table className="table-pers ml-3 mt-3">
                <thead>
                  <tr class="table-borders">
                    <th >Variable</th>
                    <th >Obtenido</th>
                    <th >Peso total</th>
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
                <button class="mt-3 ml-3">Enviar Evaluacion</button>
            </div>
            </div>
          </form>
        )
        console.log(this.state.productor_activo);
    }
}

export default Evaluacion;