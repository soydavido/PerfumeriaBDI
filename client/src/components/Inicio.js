import "./../style.css";
import React,{ Fragment, useState, useEffect } from "react";
import TablaPruebaInicio from "./TablaPruebaInicio";

const Inicio = () =>{

    const [descripcion,setDescripcion]=useState("");
    console.log("Inicio "+descripcion);

    const onSubmitForm = async(e) => {
        e.preventDefault();
        console.log("submit");
        try {
            const body = {descripcion};
            const response = await fetch("http://localhost:5000/prueba", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/"
            console.log(response);
        } catch (err) {
            console.error(err.message)
        }
        console.log(descripcion);
    }

    return (
       <Fragment>

        <body className="body">
            <h1 className="text mt-5 ml-5">Elementos de prueba</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
            <TablaPruebaInicio/>
        </body>
        
       </Fragment>

    )
};

export default Inicio;