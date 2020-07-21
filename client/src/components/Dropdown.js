import React, { useState, Component } from 'react';
import "../styles.scss"

////LA ESTRUCTURA QUE RECIBE ES SENCILLA, SOLO LEERA LAS COLUMNAS ID Y VALUE

class Dropdown extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:"",
      activo: this.props.data[0].value
    }
  }

  myChangeHandler = (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        this.props.callbackFromParent(this.props.nombre,event.target.value);
    }

  render(){
    const data=this.props.data;
    console.log(this.state.activo);
    var dataList= data.map(objeto=>{
      return(
       <option key={objeto.id} >{objeto.value}</option>
      )
    })
    
    return(
      <div>
        <select name="activo"  onClick={this.myChangeHandler}>
          {dataList}
        </select>
      </div>
    )
  }

}

export default Dropdown;