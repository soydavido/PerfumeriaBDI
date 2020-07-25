import React from 'react';
import styles from '../style.css';
import Dropdown from './Dropdown.js'

class Contrato extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            tipo:[
                {
                  id: 1,
                  value: "Inicial"
                },
                {
                  id: 2,
                  value: "Renovacion"
                }
              ],
              productores: [{
                  id: 0,
                  value: ""
              }],
              proveedores: [{
                id: 0,
                value: ""
            }],
            proveedor_activo: "",
            productor_activo: "",
            tipo_activo: ""
        }
    }

    //Funcion para cambiar datos desde el hijo, name es el nombre del atributo a cambiar, y dataFromChild es la informacion a cambiar
    myCallback = (name,dataFromChild) => {
        this.setState({[name]: dataFromChild});
      }

    render(){
        console.log(this.state);
        return(
            <div class="body">
                <h1 className="mt-3 ml-3">Contrato</h1>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4>
                    <th><Dropdown data={this.state.productores} nombre={"productor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del proveedor</h4>
                    <th><Dropdown data={this.state.proveedores} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Tipo de contrato</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Ingredientes disponibles</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de envio</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de envio</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
            </div>
        )
    }
}

export default Contrato;