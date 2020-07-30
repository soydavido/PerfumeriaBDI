import React from 'react';
import styles from '../style.css';
import Dropdown from './Dropdown.js'

class Contrato extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            exclusividad_activo: 1,
            condicion_pago_activo: "",
            condicion_envio_activo: "",
            ingrediente_activo: "",
            proveedor_activo: "",
            productor_activo: "",
            tipo_activo: "",
            tipo:[
                {
                  id: 1,
                  value: "Inicial"
                },
                {
                  id: 2,
                  value: "Renovacion"
                }
              ],
              exclusividad:[
                {
                  id: 1,
                  value: "No"
                },
                {
                  id: 2,
                  value: "Si"
                }
              ],
              productores: [{
                  id: 0,
                  value: ""
              }],
              proveedores: [{
                id: 0,
                value: ""
            }],
            ingredientes:[{
                id:0,
                value: 0
            }],
            condiciones_pago: [
                {
                    id: 0,
                    value: 0
                }
            ],
            condiciones_envio: [
                {
                    id: 0,
                    value: 0
                }
            ]
        }
    }

    async componentDidMount(){
        var lista=[]
        for( var i=1;i<4;i++){
          if (this.state.productores.length){
            const res= await fetch('http://localhost:5000/productores/')
             const lista = await res.json();
            await this.setStateAsync({productores: lista});
          }
          else{
            
          }
        }  
        
      }

      async componentDidUpdate(){
        if((this.state.proveedor_activo=="")&&(this.state.productor_activo!=="")){
          const res= await fetch(`http://localhost:5000/posibles/${this.state.productor_activo}`);
          const lista = await res.json();
          await this.setStateAsync({proveedores: lista});
        }
        if((this.state.proveedor_activo!=="")&&(this.state.ingrediente_activo=="")){
            const res= await fetch(`http://localhost:5000/ingredientesProveedor/${this.state.proveedor_activo}`);
            const listai = await res.json();
          await this.setStateAsync({ingredientes: listai});
          this.setStateAsync({ingrediente_activo: listai[0]});
        }
        else{
            if((this.state.ingrediente_activo!=="")&&(this.state.condicion_pago_activo=="")){
                const res= await fetch(`http://localhost:5000/condicionesPagoProveedor/${this.state.proveedor_activo}`);
                const listacp = await res.json();
              await this.setStateAsync({condiciones_pago: listacp});
              this.setStateAsync({condicion_pago_activo: listacp[0]});
            }
            else{
                if((this.state.condicion_pago_activo!=="")&&((this.state.condicion_envio_activo==""))){
                    const res= await fetch(`http://localhost:5000/condicionesEnvioProveedor/${this.state.proveedor_activo}`);
                    const listace = await res.json();
                    await this.setStateAsync({condiciones_envio: listace});
                    this.setStateAsync({condicion_envio_activo: listace[0]});
                }
            }
        }
      }

      setStateAsync(state){
        return new Promise(resolve =>{
          this.setState(state,resolve);
        });
      }

    //Funcion para cambiar datos desde el hijo, name es el nombre del atributo a cambiar, y dataFromChild es la informacion a cambiar
    myCallback = (name,dataFromChild) => {
        this.setState({[name]: dataFromChild});
      }

       handleSubmit = async(event) => {
        console.log(this.state);

        //CONTRATO
      let estructura = {
          id_prod: this.state.productor_activo,
          id_prov: this.state.proveedor_activo,
          exclusividad: this.state.exclusividad_activo
        };
        const res= await fetch(`http://localhost:5000/registroContrato/`,{
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(estructura)
        });

        //ENVIO
      for(var i=0;i<this.state.condiciones_envio.length;i++){
          if(this.state.condiciones_envio[i].id==this.state.condicion_envio_activo){
              console.log(this.state.condiciones_envio[i]);
              var paraenvios = {
                id_prod: this.state.productor_activo,
                id_prov: this.state.proveedor_activo,
                id_pais: this.state.condiciones_envio[i].con_env_id_pai,
                id_cond_env: this.state.condiciones_envio[i].con_env_id
              };
              const res= await fetch(`http://localhost:5000/registroCondicionesEnvios/`,{
                 method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paraenvios)
                });
          }
      }

      //PAGO
      for(var i=0;i<this.state.condiciones_pago.length;i++){
        if(this.state.condiciones_pago[i].id==this.state.condicion_pago_activo){
            var parapagos = {
                id_prod: this.state.productor_activo,
                id_prov: this.state.proveedor_activo,
                id_cond_pago: this.state.condiciones_envio[i].id
              };
              const alo= await fetch(`http://localhost:5000/registroCondicionesPagos/`,{
                         method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(parapagos)
                        });
        }
      }

      //INGREDIENTES
      for(var i=0;i<this.state.ingredientes.length;i++){
        if(this.state.ingredientes[i].id==this.state.ingrediente_activo){
            var paraingredientes = {
                id_prod: this.state.productor_activo,
                id_prov: this.state.proveedor_activo,
                ipc: this.state.ingredientes[i].id
              };
              const res= await fetch(`http://localhost:5000/registroIngredientesContrato/`,{
                 method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paraingredientes)
                });
        }
    }
      
    }

    render(){
        console.log(this.state);
        return(
            <div class="body">
                <h1 className="mt-3 ml-3">Contrato</h1>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del productor</h4>
                    <th><Dropdown data={this.state.productores} nombre={"productor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Nombre del proveedor</h4>
                    <th><Dropdown data={this.state.proveedores} nombre={"proveedor_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Tipo de contrato</h4>
                    <th><Dropdown data={this.state.tipo} nombre={"tipo_activo"} callbackFromParent={this.myCallback}/></th>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Ingredientes disponibles</h4>
                    <th><Dropdown data={this.state.ingredientes} nombre={"ingrediente_activo"} callbackFromParent={this.myCallback}/></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Exclusividad</h4>
                    <th><Dropdown data={this.state.exclusividad} nombre={"exclusividad_activo"} callbackFromParent={this.myCallback}/></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de envio</h4>
                    <th><Dropdown data={this.state.condiciones_envio} nombre={"condicion_envio_activo"} callbackFromParent={this.myCallback}/></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
                <tr>
                    <h4 className="mt-3 ml-3 mr-3">Condiciones de pago</h4>
                    <th><Dropdown data={this.state.condiciones_pago} nombre={"condicion_pago_activo"} callbackFromParent={this.myCallback}/></th>
                    <button class="boton-seleccion-contrato">Agregar</button>
                </tr>
                <tr>
                    <button class="btn btn-warning mt-3 ml-3" onClick={this.handleSubmit}>Registrar Contrato</button>
                </tr>
            </div>
        )
    }
}

export default Contrato;