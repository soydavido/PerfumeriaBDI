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
            productores: [],
            proveedores: [],
            escala: [{
              limite_i: 0,
              limite_s: 0,
              criterio: 0
            }],
            formula: [],
            variable_auxiliar:0,
            variable_1:0, variable_2:0, variable_3:0, variable_4:0, variable_5:0,
            variable_6:0, variable_7:0, variable_8:0, variable_9:0, variable_10:0,
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
              variables: [
                { 
                  id: "1",
                  nombre: " ",
                  obtenido: " ",
                  peso_total: " "
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
    myInputScoreCallback = (name,valor) => {
      this.setState({[name]: parseInt(valor,10)});
    }

    handleSubmit = async(event) => {
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
      var total_obtenido=this.state.variable_1+this.state.variable_2+this.state.variable_3+this.state.variable_4+this.state.variable_5+this.state.variable_6+this.state.variable_7+this.state.variable_8;
      this.setState({calificacion_total:total_obtenido});
      //SE CHEQUEA ANTES DEL FETCH

      if(apto){
        console.log("FELICIDADES");
        let estructura = {
          his_eva_id_prod: parseInt(this.state.productor_activo),
          his_eva_id_prov: parseInt(this.state.proveedor_activo),
          his_eva_calificacion: total_obtenido,
          his_eva_tipo: 'i'
        };
        const res= await fetch(`http://localhost:5000/registroEvaluacion/`,{
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(estructura)
        });
         console.log(res);
         var calificacionExito= ((parseInt(total_obtenido)*parseInt(this.state.escala[0].limite_s))/100);
         console.log(calificacionExito);
         if(total_obtenido<this.state.escala[0].criterio){
           alert("El proveedor no aprobo la evaluacion, ya que el minimo es de "+this.state.escala[0].criterio+" y su calificacion fue de "+total_obtenido);
         }
         else{
           alert("El proveedor aprobo la evaluacion con una nota de "+calificacionExito+" / "+this.state.escala[0].limite_s+" u "+total_obtenido+" / 100");
         }
      }
      else{
        alert("Verifique los campos");
      }
    }

    setStateAsync(state){
      return new Promise(resolve =>{
        this.setState(state,resolve);
      });
    }

    async componentDidMount(){
      var lista=[]
      for( var i=1;i<4;i++){
        if (this.state.productores.length){
          if(this.state.proveedores.length){
  
          }else{
            const res= await fetch(`http://localhost:5000/proveedores/${this.state.productor_activo}`);
            const lista = await res.json();
            await this.setStateAsync({proveedores: lista});
            console.log("ENTRE");
          } 
        }
        else{
          const res= await fetch('http://localhost:5000/productores/')
           const lista = await res.json();
          await this.setStateAsync({productores: lista});
        }
      }  
      
    }

    async componentDidUpdate(){
      if((this.state.proveedor_activo=="")&&(this.state.productor_activo!=="")){
        const res= await fetch(`http://localhost:5000/proveedores/${this.state.productor_activo}`);
        const lista = await res.json();
        await this.setStateAsync({proveedores: lista});

      }
      if((this.state.proveedor_activo!=="")&&(this.state.productor_activo!=="")&&(this.state.formula.length===0)){
        if(this.state.evaluacion_activa>1){
          const res2= await fetch(`http://localhost:5000/escala/${this.state.productor_activo}`);
        const listaEscala = await res2.json();
        await this.setStateAsync({escala: listaEscala});

          const res= await fetch(`http://localhost:5000/formulaa/${this.state.productor_activo}`);
        const lista = await res.json();
        console.log(this.state.variables);
        var i=lista.length;
        var cont=0;
        if(cont<i){
          cont++;
          lista[0].id=cont;
          if(cont<i){
            cont++;
            lista[1].id=cont;
          }
          if(cont<i){
            cont++;
            lista[2].id=cont;
          }
          if(cont<i){
            cont++;
            lista[3].id=cont;
          }
          if(cont<i){
            cont++;
            lista[4].id=cont;
          }
          if(cont<i){
            cont++;
            lista[5].id=cont;
          }
        }
        await this.setStateAsync({variables: lista});
        await this.setStateAsync({formula: lista});
        }
        else{
          const res2= await fetch(`http://localhost:5000/escala/${this.state.productor_activo}`);
        const listaEscala = await res2.json();
        await this.setStateAsync({escala: listaEscala});

          const res= await fetch(`http://localhost:5000/formulai/${this.state.productor_activo}`);
        const lista = await res.json();
        console.log(this.state.variables);
        var i=lista.length;
        var cont=0;
        if(cont<i){
          cont++;
          lista[0].id=cont;
          if(cont<i){
            cont++;
            lista[1].id=cont;
          }
          if(cont<i){
            cont++;
            lista[2].id=cont;
          }
          if(cont<i){
            cont++;
            lista[3].id=cont;
          }
          if(cont<i){
            cont++;
            lista[4].id=cont;
          }
          if(cont<i){
            cont++;
            lista[5].id=cont;
          }
        }
        await this.setStateAsync({variables: lista});
        await this.setStateAsync({formula: lista});
        }
        
      }
    }

    async asignarFiltro(){
      if(this.state.proveedores.length){
  
      }else{
        console.log(this.state.productor_activo);
        const res= await fetch(`http://localhost:5000/proveedores/${this.state.productor_activo}`);
        const lista = await res.json();
        await this.setStateAsync({proveedores: lista});
      }
    }

    render(){
      console.log(this.state);
      this.asignarFiltro();
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
      });
        return(
            <div className="body">
                <h1 className="mt-3 ml-3">Evaluacion de proveedores</h1>
            <div>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4>
                    <th><Dropdown data={this.state.productores} nombre={"productor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Tipo de evaluacion</h4>
                    <th><Dropdown data={this.state.tipo_eva} nombre={"evaluacion_activa"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del proveedor</h4>
                    <th><Dropdown data={this.state.proveedores} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
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
                    this.state.i=this.state.i+1;
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
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Criterio de exito</h4>
                    <th><label className="ml-3">{this.state.escala[0].criterio}/100</label></th>
                </tr>
                <button class="btn btn-warning mt-3 ml-3" onClick={this.handleSubmit}>Enviar Evaluacion</button>
                <button class="btn btn-delete mt-3 ml-3">Cancelar</button>
            </div>
            </div>
        )
        console.log(this.state.productor_activo);
    }
}

export default Evaluacion;