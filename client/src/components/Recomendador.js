import "./../style.css";
import React,{ Fragment, useState } from "react";
import Fondo from "../images/FondoRecomendador.jpg";
import DropdownRecomendador from "./DropdownRecomendador";


class Recomendador extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            descripcion: "",
            estado: "",
            caracter: [
                {
                id:0,
                value: "CARACTER",
                costo: 0
                }
            ],
            aspecto: [
                {
                id:0,
                value: "ASPECTO DE PERSONALIDAD",
                costo: 0
                }
            ],
            intensidad: [
                {
                id:0,
                value: "INTENSIDAD",
                costo: 0
                }
            ],
            preferencia: [
                {
                id:0,
                value: "PREFERENCIA DE USO",
                costo: 0
                }
            ],
            edad: [
                {
                id:0,
                value: "EDAD",
                costo: 0
                }
            ],
            familia: [
                {
                id:0,
                value: "FAMILIA OLFATIVA",
                costo: 0
                }
            ],
            genero: [
                {
                id:0,
                value: "GENERO",
                costo: 0
                }
            ],
            aroma: [
                {
                id:0,
                value: "AROMA",
                costo: 0
                }
            ],
        }
    }

    //Funcion para cambiar datos desde el hijo, name es el nombre del atributo a cambiar, y dataFromChild es la informacion a cambiar
    myCallback = (name,dataFromChild) => {
        this.setState({[name]: dataFromChild});
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
                </body> 
                <div>
                <h1 className="ml-3" class="titulo-pagina">Recomendador de perfumes</h1>
                    <h4 className="ml-3" class="subtitulo-pagina"> A continuacion, inserte sus gustos en las categorias indicadas...</h4>
                    <div className="dropdown1-recomendador">
                        <DropdownRecomendador data={this.state.caracter} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                    <div className="dropdown2-recomendador">
                        <DropdownRecomendador data={this.state.aspecto} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                    <div className="dropdown3-recomendador">
                        <DropdownRecomendador data={this.state.intensidad} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                    <div className="dropdown4-recomendador">
                        <DropdownRecomendador data={this.state.preferencia} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                    <div className="dropdown5-recomendador">
                        <DropdownRecomendador data={this.state.edad} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                    <div className="dropdown6-recomendador">
                        <DropdownRecomendador data={this.state.familia} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div> 
                    <div className="dropdown7-recomendador">
                        <DropdownRecomendador data={this.state.genero} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                    <div className="dropdown8-recomendador">
                        <DropdownRecomendador data={this.state.aroma} nombre={"productor_activo"} callbackFromParent={this.myCallback} />
                    </div>
                    <table className="fondo-lista">
                        <h5>Hello</h5>
                    </table>
                </div>
                
            </div>
        )
    }

}


export default Recomendador;