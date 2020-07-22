import "./../style.css";
import Inicio from "./Inicio";
import React,{ Fragment, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import styles from "../style.css"
import InputFuncional from "./InputFuncional";



class Evaluacion extends React.Component{

    constructor(props){
        super(props);
        this.state={
            proveedor_activo: "",
            productor_activo: "",
            evaluacion_activa: "",
            calificacion_total: "",
            variable_1:"", variable_2:"", variable_3:"", variable_4:"", variable_5:"",
            variable_6:"", variable_7:"", variable_8:"", variable_9:"", variable_10:"",
            tipo_eva:[
              {
                id: 1,
                value: "Inicial"
              },
              {
                id: 2,
                value: "Anual"
              }
            ],
            items : [
                {
                  id: 1,
                  value: 'Pulp Fiction',
                },
                {
                  id: 2,
                  value: 'The Prestige',
                },
                {
                  id: 3,
                  value: 'Blade Runner 2049',
                },
              ],
              items2 : [
                {
                  id: 1,
                  value: 'Fiction',
                },
                {
                  id: 2,
                  value: 'Testige',
                },
                {
                  id: 3,
                  value: 'Blade 2049',
                },
              ],
              variables: [
                { 
                  id: "1",
                  nombre: "Flexibilidad",
                  obtenido: "",
                  peso_total: "20"
                },
                {
                  id: "2",
                  nombre: "Envios",
                  obtenido: "",
                  peso_total: "40"
                },
                {
                  id: "3",
                  nombre: "Puntualidad",
                  obtenido: "",
                  peso_total: "30"
                },
                {
                  id: "4",
                  nombre: "Capacidad",
                  obtenido: "",
                  peso_total: "10"
                }
              ]
        
        }
    }


    handleProductorActivo = (ProdValue) => {
        console.log(ProdValue);
        this.setState({productor_activo: ProdValue});
    }

    //Funcion para cambiar datos desde el hijo, name es el nombre del atributo a cambiar, y dataFromChild es la informacion a cambiar
    myCallback = (name,dataFromChild) => {
      this.setState({[name]: dataFromChild});
    }
    //Funcion para setear lo obtenido en las variables
    myInputScoreCallback = (nombre,valor) => {
      this.setState({[nombre]: valor});
    }

    handleSubmit =(event) => {
      var variables=this.state.variables;
      var extension=(variables).length;
      var apto=true; 
      if(this.state.variable_1>0){
        if (this.state.variable_1<=this.state.variables[0].peso_total){
          if(this.state.variable_2>0){
            if (this.state.variable_2<=this.state.variables[1].peso_total){
              if(this.state.variable_3>0){
                if (this.state.variable_3<=this.state.variables[2].peso_total){
                  if(this.state.variable_4>0){
                    if (this.state.variable_4<=this.state.variables[3].peso_total){
                      if(this.state.variable_5>0){
                        if (this.state.variable_5<=this.state.variables[4].peso_total){
                          if(this.state.variable_6>0){
                            if (this.state.variable_6<=this.state.variables[5].peso_total){
                              if(this.state.variable_7>0){
                                if (this.state.variable_7<=this.state.variables[6].peso_total){
                                  if(this.state.variable_8>0){
                                    if (this.state.variable_8<=this.state.variables[7].peso_total){
                                      if(this.state.variable_9>0){
                                        if (this.state.variable_9<=this.state.variables[8].peso_total){
                                          if(this.state.variable_10>0){
                                            if (this.state.variable_10<=this.state.variables[9].peso_total){
                                                
                                            }
                                            else{
                                              apto=false;
                                            }
                                          }else{
                                    
                                          }
                                    
                                        }
                                        else{
                                          apto=false;
                                        }
                                      }else{
                                
                                      }
                                
                                    }
                                    else{
                                      apto=false;
                                    }
                                  }else{
                            
                                  }
                            
                                }
                                else{
                                  apto=false;
                                }
                              }else{
                        
                              }
                        
                            }
                            else{
                              apto=false;
                            }
                          }else{
                    
                          }
                     
                        }
                        else{
                          apto=false;
                        }
                      }else{
                
                      }
                
                    }
                    else{
                      apto=false;
                    }
                  }else{
            
                  }
            
                }
                else{
                  apto=false;
                }
              }else{
        
              }
        
            }
            else{
              apto=false;
            }
          }else{
    
          }
    
        }
        else{
          apto=false;
        }
      }else{

      }

      //SE CHEQUEA ANTES DEL FETCH

      if(apto){
        console.log("FELICIDADES");
        apto=true;
        //se registra
      }
      else{
        alert("Verifique los campos");
      }
    }
  

    render(){

      //  console.log("Soy el activo ahora"+this.state.productor_activo);
      var variables=this.state.variables;
      var extension=(this.state.variables).length;
      var variableList= variables.map(objeto=>{
        return(
          <tr key={objeto.id}>
              <td>{objeto.nombre}</td>
              <td><input></input></td>
              <td>{objeto.peso_total}</td>
            </tr>
        )
      })

        return(
            <div className="body">
                <h1 className="mt-3 ml-3">Evaluacion de proveedores</h1>
            <div>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4>
                    <th><Dropdown data={this.state.items} nombre={"productor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del proveedor</h4>
                    <th><Dropdown data={this.state.items2} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Tipo de evaluacion</h4>
                    <th><Dropdown data={this.state.tipo_eva} nombre={"evaluacion_activa"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <h4 class="ml-3 mt-3">Formula</h4>
                <table className="table-pers ml-3 mt-3">
                <thead>
                  <tr class="table-borders">
                    <th >Variable</th>
                    <th >Obtenido</th>
                    <th >Peso total</th>
                  </tr>
                </thead>
                <tbody>
                  {variables.map(objeto=>{ 
                    return(
                    <tr key={objeto.id} class="table-borders">
                      <td>{objeto.nombre}</td>
                      <td><InputFuncional papa="variable_" informacion={objeto} callbackInputParent={this.myInputScoreCallback}/></td>
                      <td >{objeto.peso_total}</td>
                    </tr>
                    )
                  })}
                  </tbody>
                </table>
                <button class="btn btn-warning mt-3 ml-3" onClick={this.handleSubmit}>Enviar Evaluacion</button>
            </div>
            </div>
        )
        console.log(this.state.productor_activo);
    }
}

export default Evaluacion;