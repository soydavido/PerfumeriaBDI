import "./../style.css";
import React,{ Fragment, useState } from "react";
import Fondo from "../images/FondoRecomendador.jpg";
import Dropdown from "./Dropdown";


class Recomendador extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            descripcion: "",
            estado: "",
            productores: [
                {
                id:0,
                nombre: "",
                costo: 0
                }
            ]
        }
    }

    getSnapshotBeforeUpdate(prevProps,prevState){
        // El estado anterior se monta aqui
    }

    componentDidUpdate(){
    //    document.getElementById("abc").innerHTML="Hola"; //Aqui iria algo que se mostraria despues del update
    }

    myChangeHandler = (event) =>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        console.log(this.state);
    }

    //Aqui pueden ir funciones propias

    render(){

        console.log(this.state);

        return(
            <div class="body" >
                <body  className="body-recomendador">
                    <h1>Soy el recomendador</h1>
                    <input name='descripcion' className="ml-5" onChange={this.myChangeHandler}></input>
                    <input name='estado' className="ml-5" onChange={this.myChangeHandler}></input>
                    <div className="dropdown1-recomendador">
                        <strong>Caracter</strong>
                        <Dropdown data={this.state.productores} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                </body> 
            </div>
        )
    }

}


export default Recomendador;