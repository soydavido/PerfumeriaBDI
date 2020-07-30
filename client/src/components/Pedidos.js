import "./../style.css";
import Inicio from "./Inicio";
import React,{ Fragment, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import styles from "../style.css"
import InputFuncional from "./InputFuncional";



class Pedidos extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            proveedor_activo: 0,
            proveedores: [{
                id: 0,
                value: ""
            }],
            pedidos: [],
            i:0
        }
    }

    setStateAsync(state){
        return new Promise(resolve =>{
          this.setState(state,resolve);
        });
      }

      //Funcion para cambiar datos desde el hijo, name es el nombre del atributo a cambiar, y dataFromChild es la informacion a cambiar
    myCallback = (name,dataFromChild) => {
        this.setState({[name]: dataFromChild});
      }
    
    async componentDidMount(){
        var lista=[]
          if (this.state.proveedores.length){
            const res= await fetch('http://localhost:5000/proveedores/')
             const lista = await res.json();
            await this.setStateAsync({proveedores: lista});
            
          }
        }  
    async componentDidUpdate(){
        if((this.state.pedidos.length<1)&&(this.state.i<100)){
            console.log('Pedidos');
            const res= await fetch(`http://localhost:5000/pedidosPendientes/${this.state.proveedor_activo}`);
            const lista = await res.json();
           await this.setStateAsync({pedidos: lista});
           await this.setStateAsync({i: this.state.i + 1});
        }
    }
        

    render(){   
        console.log(this.state);
        var variableList= this.state.pedidos.map(objeto=>{
            return(
              <tr key={objeto.id}>
                  <td>{objeto.nombre}</td>
                  <td>{objeto.codigopedido}</td>
                  <td>{objeto.total}</td>
                </tr>
            )
          });
        return(
            <div class="body">
                <h1 className="mt-3 ml-3">Pedidos de un proveedor</h1>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del proveedor</h4>
                    <th><Dropdown data={this.state.proveedores} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <table className="table-pers ml-3 mt-3">
                <thead>
                  <tr class="table-borders">
                    <th >Nombre Productor</th>
                    <th >Codigo Pedido</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pedidos.map(objeto=>{ 
                    return(
                    <tr key={objeto.id} class="table-borders">
                      <td>{objeto.nombre}</td>
                      <td >{objeto.codigopedido}</td>
                      <td> {objeto.total}</td>
                    </tr>
                    )
                  })}
                  </tbody>
                </table>
                
            </div>
        )
    }
}

export default Pedidos;