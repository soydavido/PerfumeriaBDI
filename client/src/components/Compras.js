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
            ingrediente_activo: 0,
            informacion: [],
            total: 0,
            costo: 1,
            condiciones_pago: [
              {
                  id: 0,
                  value: 0
              }
            ],
            condiciones_envio: [
              {
                  id: 0,
                  value: 0
              }
          ],
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
        if(nam=='cantidad'){
          console.log('Hola');
          this.setState({total: parseInt(this.state.costo)*parseInt(this.state.cantidad)});
        }
    }

    async componentDidMount(){
            const res= await fetch('http://localhost:5000/productores/');
            const lista = await res.json();
           await this.setStateAsync({productores: lista}); 
        
      }

     
    async componentDidUpdate(){
      if((this.state.proveedor_activo==0)&&(this.state.productor_activo!==0)&&(this.state.productores.length>1)){
        const res= await fetch(`http://localhost:5000/proveedoresContratados/${this.state.productor_activo}`);
            const lista = await res.json();
            await this.setStateAsync({proveedores: lista});
      }
      else{
        if((this.state.contrato!==0)&&(this.state.condicion_envio==0)){
          const res= await fetch(`http://localhost:5000/condicionesEnvioContratadas/${this.state.contrato}`);
          const con_env = await res.json();
          await this.setStateAsync({condiciones_envio: con_env});
          await this.setStateAsync({condicion_envio: con_env[0].id});
        }
        else{
          if((this.state.contrato!==0)&&(this.state.condicion_pago==0)){
            const res= await fetch(`http://localhost:5000/condicionesPagoContratadas/${this.state.contrato}`);
            const con_pag = await res.json();
            await this.setStateAsync({condiciones_pago: con_pag});
            await this.setStateAsync({condicion_pago: con_pag[0].id});
          }
          else{
            if((this.state.contrato!==0)&&(this.state.ingrediente_activo==0)){
              const res= await fetch(`http://localhost:5000/ingredientesContratados/${this.state.contrato}`);
              const con = await res.json();
             await this.setStateAsync({ingredientes: con});
             await this.setStateAsync({ingrediente_activo: con[0].id});
          }
          else{
            
          }
          }
          }
    
      }
    }

    handleSubmit = async(event) => {
      for(var i=0;i<this.state.ingredientes.length;i++){
        if(this.state.ingredientes[i].id==this.state.ingrediente_activo){
          console.log("Soy el numero ",this.state.ingrediente_activo);
          console.log(this.state.ingredientes[i]);
          this.setState({total: this.state.cantidad * this.state.ingredientes[i].costo});
        }
      }
    }

      setStateAsync(state){
        return new Promise(resolve =>{
          this.setState(state,resolve);
        });
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
                    <th><DropdownCompra data={this.state.proveedores} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Numero de contrato</h4>
                    <th><label className="ml-3">#{this.state.contrato}</label></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de envio</h4>
                    <th><Dropdown data={this.state.condiciones_envio} nombre={"condicion_envio"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de pago</h4>
                    <th><Dropdown data={this.state.condiciones_pago} nombre={"condicion_pago"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Ingredientes contratados</h4>
                    <th><Dropdown data={this.state.ingredientes} nombre={"ingrediente_activo"} callbackFromParent={this.myCallback}/></th>
                    <th><input class="input-cantidad" type="number" name="cantidad" onChange={this.myChangeHandler}></input></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Total</h4>
                    <th><label className="ml-3">#{this.state.total}</label></th>
                </tr>

                <button class="boton-seleccion-contrato mt-3" onClick={this.handleSubmit}>Ordenar</button>
            </div>
        )
    }
}

export default Compras;