import React, { useState, Component } from 'react';
import style from '../style.css';

////LA ESTRUCTURA QUE RECIBE ES SENCILLA, SOLO LEERA LAS COLUMNAS ID Y VALUE

class DropdownCompra extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:"",
      activo: ""
    }
  }

  myChangeHandler = (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
        var idV=0;
        var idC=0;
        var data= this.props.data;
        for(var i=0;i<data.length;i++){
          var nombre=data[i].value;
          if(nombre==val){
            idV=data[i].id;
            idC=data[i].numero;
          }
        }
        this.setState({[nam]: val});
        this.props.callbackFromParent(this.props.nombre,idV);
        this.props.callbackFromParent('contrato',idC);
    }

  render(){
    const data=this.props.data;
    var dataList= data.map(objeto=>{
      return(
       <option key={objeto.id} >{objeto.id,objeto.value}</option>
      )
    })
    
    return(
      <div>
        <select name="activo"  class="dropdown-general" onClick={this.myChangeHandler}>
          {dataList}
        </select>
      </div>
    )
  }

}

export default DropdownCompra;