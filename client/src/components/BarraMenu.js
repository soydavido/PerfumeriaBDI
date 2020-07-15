import "./../style.css";
import React,{ Fragment, useState } from "react";
import logo from "../images/LogoBlanco.png"

const BarraMenu = () => {
    return  (
        
        <nav class="sidebar">
            <div class="sidebar-header">
                <img src={logo} width="40" height="40"/>
                <h3 className="text mt-3 ml-5">Adomatics</h3>
                <ul>
                    <button className="boton-barra-menu-inicio">Inicio</button>
                    <button className="boton-barra-menu-consulta">Consulta</button>
                    <button className="boton-barra-menu-evaluacion">Evaluacion</button>
                    <button className="boton-barra-menu-recomendador">Recomendador</button>
                    
                </ul>
            </div>
            
            
        </nav>
    )
};

export default BarraMenu;