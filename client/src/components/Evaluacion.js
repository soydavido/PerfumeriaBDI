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


    render(){

        console.log("Soy el activo ahora"+this.state.productor_activo);

        return(
            <div className="body">
                <h1 className="mt-3 ml-3">Evaluacion de proveedores</h1>
            <div>
                <tr>
                    <th><h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4></th>
                    <th><Dropdown items={this.state.items} title={"Productor"} activo={this.state.productor_activo}/></th>
                </tr>
                <ul>
                    <h3>Jejeje</h3>
                <ul><Dropdown items={this.state.items2}/></ul>
                </ul>
            </div>
            </div>
        )
        console.log(this.state.productor_activo);
        window.location("/");
    }
}

export default Evaluacion;