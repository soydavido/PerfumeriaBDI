import "./../style.css";
import Inicio from "./Inicio";
import React,{ Fragment, useState } from "react";
import Dropdown from "./Dropdown";



class Evaluacion extends React.Component{

    constructor(props){
        super(props);
        this.state={
            proveedor_activo: "",
            productor_activo: "",
            evaluacion_activa: "",
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
      console.log(name);
    }
    
    render(){

      //  console.log("Soy el activo ahora"+this.state.productor_activo);
      console.log(this.state.items);
      console.log("Ahora");
      console.log(this.state);

        return(
            <div className="body">
                <h1 className="mt-3 ml-3">Evaluacion de proveedores</h1>
            <div>
                <tr>
                    <th><h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4></th>
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
            </div>
            </div>
        )
        console.log(this.state.productor_activo);
    }
}

export default Evaluacion;