import "./../style.css";
import React,{ Fragment, useState } from "react";


class Recomendador extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            descripcion: "",
            estado: ""
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
            <div class="body">
            <h1>Soy el recomendador</h1>
            <input name='descripcion' className="ml-5" onChange={this.myChangeHandler}></input>
            <input name='estado' className="ml-5" onChange={this.myChangeHandler}></input>
        </div>
        )
    }

}


export default Recomendador;