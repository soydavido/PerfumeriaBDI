import "./../style.css";
import React,{ Fragment, useState } from "react";

const BarraMenu = () => {
    return  (
        
        <nav class="sidebar">
            <div class="sidebar-header">
                <i>
                    <img src="../images/LogoBlanco.png" width="40"/>
                </i>
                <h3 className="text mt-3 ml-5">Adomatics</h3>
                <ul>
                    <h3 href="#">Inicio</h3>
                    <h3 href="#">Consulta</h3>
                    <h3 href="#">Recomendador</h3>
                    <h3 href="#">Reportes</h3>
                </ul>
            </div>
            
            
        </nav>
    )
};

export default BarraMenu;