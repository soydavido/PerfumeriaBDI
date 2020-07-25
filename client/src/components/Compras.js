import React from 'react';
import styles from '../style.css';
import Dropdown from './Dropdown.js'
import InputFuncional from './InputFuncional';

class Compras extends React.Component{
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
               lista: [{
                id: 0,
                nombre: "",
                cantidad: 0,
                total: 0
               }],
            proveedor_activo: "",
            productor_activo: "",
            tipo_activo: "",
            cantidad: 0
        }
    }

    //Funcion para cambiar datos desde el hijo, name es el nombre del atributo a cambiar, y dataFromChild es la informacion a cambiar
    myCallback = (name,dataFromChild) => {
        this.setState({[name]: dataFromChild});
    }
    myChangeHandler = (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render(){
        console.log(this.state);
        var variables=this.state.lista;
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
            <div class="body">
                <h1 className="mt-3 ml-3">Compra</h1>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4>
                    <th><Dropdown data={this.state.productores} nombre={"productor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del proveedor</h4>
                    <th><Dropdown data={this.state.proveedores} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Numero de contrato</h4>
                    <th><label>#xxxxxxxxxx</label></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de envio</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de pago</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Ingredientes contratados</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                    <th><input class="input-cantidad" type="number" name="cantidad" onChange={this.myChangeHandler}></input></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
                <table className="table-pers ml-3 mt-3">
                <thead>
                  <tr class="table-borders">
                    <th >Ingrediente</th>
                    <th></th>
                    <th >Cantidad</th>
                    <th >Total</th>
                  </tr>
                </thead>
                <tbody>
                  {variables.map(objeto=>{ 
                    this.state.i=this.state.i+1;
                    return(
                    <tr key={objeto.id} class="table-borders">
                      <td>{objeto.nombre}</td>
                      <td></td>
                      <td>{objeto.cantidad}</td>
                      <td >{objeto.total}</td>
                    </tr>
                    )
                  })}
                  </tbody>
                </table>
            </div>
        )
    }
}

export default Compras;