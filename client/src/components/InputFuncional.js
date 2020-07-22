import React, { useState, Component } from 'react';
import styles from "../style.css"

class InputFuncional extends React.Component{
    constructor(props){
        super(props);
        this.state={
            texto: "",
            variable: ""
        }
    }

    myChangeHandler = (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
        if(val>this.props.informacion.peso_total){
            alert("Verifica los numeros ingresados, el limite es "+this.props.informacion.peso_total);
        }
        this.props.callbackInputParent(nam,val);
    }

    render(){
        const nom=this.props.papa;
        var nombreVariable= nom.concat(this.props.informacion.id);
        console.log(this.props.informacion.peso_total);
        return(
            <input type="number" name={nombreVariable} onChange={this.myChangeHandler} max={this.props.informacion.peso_total}></input>
        )
    }
}

export default InputFuncional;