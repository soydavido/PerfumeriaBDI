import React,{ Fragment, useState, useEffect } from "react";
import styles from '../style.css';
import Dropdown from './Dropdown.js'
import DropdownCompra from './DropdownParaCompra';
import InputFuncional from './InputFuncional';

class Compras extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            proveedor_activo: 0,
            productor_activo: 0,
            contrato: 0,
            cantidad: 0,
            condicion_envio: 0,
            condicion_pago: 0,
            informacion: [],
            ingredientes: [
                {
                id:0,
                nombre: "",
                costo: 0
                }
            ],
            envios:[
              {
                id:1,
                value: 'Inicial'
              }
            ],
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
                  id: 1,
                  value: 1
              }],
              proveedores: [{
                id: 1,
                value: 0
               }],
               lista: [{
                id: 0,
                nombre: "",
                cantidad: 0,
                total: 0
               }]
            
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

    async componentDidMount(){
        var lista=[];
          if (this.state.productores.length){
            const res= await fetch('http://localhost:5000/productores/');
            const lista = await res.json();
           await this.setStateAsync({productores: lista});
          } 
        
      }

      
    async componentDidUpdate(){
      if((this.state.proveedor_activo==0)&&(this.state.productor_activo!==0)&&(this.state.productores.length>1)){
        const res= await fetch(`http://localhost:5000/contratado/${this.state.productor_activo}`);
            const lista = await res.json();
            await this.setStateAsync({proveedores: lista});
      }
      else{
        if((this.state.contrato!==0)&&(this.state.condicion_envio==0)){
          const res= await fetch(`http://localhost:5000/condicionesEnvio/${this.state.productor_activo}`);
          const con_env = await res.json();
          await this.setStateAsync({envios: con_env});
          console.log(this.state);
        }
      }
    }

      setStateAsync(state){
        return new Promise(resolve =>{
          this.setState(state,resolve);
        });
      }

    render(){
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
                    <th><DropdownCompra data={this.state.proveedores} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Numero de contrato</h4>
                    <th><label className="ml-3">#{this.state.contrato}</label></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de envio</h4>
                    <th><Dropdown data={this.state.envios} nombre={"condicion_envio"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de pago</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"condicion_pago"} callbackFromParent={this.myCallback}/></th>
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
                  <tr>
                      <label>Total</label>
                  </tr>
                  </tbody>
                </table>
                <button class="boton-seleccion-contrato mt-3">Ordenar</button>
            </div>
        )
    }
}

export default Compras;