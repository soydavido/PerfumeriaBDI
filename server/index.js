const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

//create 

app.post("/prueba", async(req,res) => {
    try {
        const {descripcion} = req.body;
        const nuevaPrueba = await pool.query(
            "INSERT INTO public.prueba (descripcion) VALUES ($1) RETURNING *",
        [descripcion]);
        console.log(req.body);
        res.json(nuevaPrueba.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})
//Ventana de Creacion de formula
app.post("/registroCompletoFormula/", async(req,res) => {
    const {descripcion} = req.body;
    console.log(req.body);
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_escalas (esc_fecha_ini,esc_id_prod,esc_rango_ini,esc_rango_fin,esc_criterio_exito) values (current_date,$1,$2,$3,$4);
            insert into add_formulas_eval (for_eva_fecha,for_eva_fk_prod,for_eva_tipo) values (current_date,$1,'i');
            insert into add_variables (var_id_for_eva, var_id_prod,var_nombre,var_peso) values ((select F.for_eva_fecha from add_formulas_eval F where F.for_eva_fk_prod=$1),$1,$5,$6),((select F.for_eva_fecha from add_formulas_eval F where F.for_eva_fk_prod=$1),$1,$7,$8),((select F.for_eva_fecha from add_formulas_eval F where F.for_eva_fk_prod=$1),$1,$9,$10);
            `,
            [req.body.fk_prod,req.body.limite_i,req.body.limite_s,req.body.criterio_exito,req.body.nombre1,req.body.peso1,req.body.nombre2,req.body.peso2,req.body.nombre3,req.body.peso3]);
            res.json(nuevaEvaluacion.rows);
            console.log(res.for_eva_fecha);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
});

app.post("/registroFormula/", async(req,res) => {
    const {descripcion} = req.body;
    console.log(req.body);
    if(req.body.tipo==1){
        console.log("Inicial");
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_formulas_eval (for_eva_fecha,for_eva_fk_prod,for_eva_tipo) values (current_date,$1,'i') returning for_eva_fecha,for_eva_fk_prod;`,
            [req.body.fk_prod]);
            res.json(nuevaEvaluacion.rows);
            console.log(res.for_eva_fecha);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
    }
    else{
        console.log("Anual");
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_formulas_eval (for_eva_fecha,for_eva_fk_prod,for_eva_tipo) values (current_date,$1,'a') returning for_eva_fecha,for_eva_fk_prod;`,
            [req.body.fk_prod]);
            res.json(nuevaEvaluacion.rows);
            console.log(res.for_eva_fecha);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
    }
});
app.post("/registroEscala/", async(req,res) => {
    const {descripcion} = req.body;
    console.log(req.body.fk_prod);
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_escalas (esc_fecha_ini,esc_id_prod,esc_rango_ini,esc_rango_fin,esc_criterio_exito) values (current_date,$1,$2,$3,$4)`,
            [req.body.fk_prod,req.body.limite_i,req.body.limite_s,req.body.criterio_exito]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
});
app.post("/registroVariables/", async(req,res) => {
    const {descripcion} = req.body;
    console.log(req.body.fk_prod);
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_variables (var_id_for_eva, var_id_prod,var_nombre,var_peso) values ((select F.for_eva_fecha from add_formulas_eval F where F.for_eva_fk_prod=$1),$1,$2,$3);`,
            [req.body.fk_prod,req.body.nombre,req.body.peso]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
});
app.get("/getFecha/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log(req.params.id);
        const todo = await pool.query(
            `select to_char(for_eva_fecha,'YYYY/MM/DD') from add_formulas_eval where for_eva_fk_prod=$1;`
            ,[id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
//Ventana de evaluacion
app.get("/productores/", async(req,res) =>{
    try {
        console.log("productores");
        const todo = await pool.query("SELECT prod_id as id, prod_nombre as value FROM add_productores");
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/escala/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log("escala");
        const todo = await pool.query(
            `select esc_rango_ini as limite_i, esc_rango_fin as limite_s, esc_criterio_exito as criterio from add_escalas where esc_id_prod=$1;`
            ,[id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/proveedores/", async(req,res) =>{
    try {
        console.log("proveedores");
        const todo = await pool.query(
            "SELECT prov_id as id, prov_nombre as value FROM add_proveedores");
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/proveedores/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log(req.params.id);
        const todo = await pool.query(
            `select DISTINCT P.prov_id as id, P.prov_nombre as value from add_proveedores P,  add_prod_pais R, add_condiciones_envio C where P.prov_id = C.con_env_id_prov and C.con_env_id_pai = R.prod_pais_id_pai and R.prod_pais_id_prod = $1;`
            ,[id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//CONTRATOS

app.get("/posibles/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log({id});
        const nuevaEvaluacion = await pool.query(
            `select H.his_eva_id_prov as id, P.prov_nombre as value, H.his_eva_calificacion from add_historicos_evluaciones H, add_escalas E, add_proveedores P where E.esc_id_prod = $1 and H.his_eva_calificacion >= E.esc_criterio_exito and H.his_eva_id_prod = E.esc_id_prod and P.prov_id = H.his_eva_id_prov order by H.his_eva_id_prov, H.his_eva_id_prod`,
         [id]);
        res.json(nuevaEvaluacion.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/proveedoresEvaluados/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            `select H.his_eva_id_prov, H.his_eva_id_prod, H.his_eva_calificacion from add_historicos_evluaciones H, add_escalas E where E.esc_id_prod = $1 and H.his_eva_calificacion >= E.esc_criterio_exito and H.his_eva_id_prod = E.esc_id_prod  order by H.his_eva_id_prov, H.his_eva_id_prod;`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/condicionesPagoProveedor/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            `select con_pag_id as id, con_pag_descripcion as value from add_condiciones_pago where con_pag_id_prov=$1`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/condicionesEnvioProveedor/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            `select C.con_env_id as id, concat(C.con_env_descripcion, ' hacia ',P.pai_nombre,' | $',C.con_env_costo) as value, con_env_id, con_env_id_pai,con_env_id_prov from add_condiciones_envio C, add_paises P where C.con_env_id_prov=$1 and C.con_env_id_pai = P.pai_id  `,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/ingredientesProveedor/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            `select ing_ese_ipc as id, ing_ese_nombre as value from add_ingredientes_esencias where ing_ese_id_prov = $1;`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.post("/registroContrato/", async(req,res) => {
    const {descripcion} = req.body;
    console.log("Contrato");
    if(req.body.exclusividad==1){
        console.log('No exclusivo');
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_contratos (con_fecha_ini, con_exclusividad,con_id_prod,con_id_prov) values (current_date,'n',$1,$2);`,
            [req.body.id_prod,req.body.id_prov]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
    }
    else{
        console.log('Exclusivo');
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_contratos (con_fecha_ini, con_exclusividad,con_id_prod,con_id_prov) values (current_date,'s',$1,$2);`,
            [req.body.id_prod,req.body.id_prov]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
    }
        
});
app.post("/registroCondicionesEnvios/", async(req,res) => {
    const {descripcion} = req.body;
    console.log("Envio");
    console.log(req.body);
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_con_cond_env (con_cond_env_id_con,con_cond_env_id_prod,con_cond_env_id_prov,con_cond_env_id_cond_env,con_cond_env_id_prov_cond_env,con_cond_env_id_pai) values ((select con_numero from add_contratos where con_id_prod=$1 and con_id_prov=$2),$1,$2,$3,$2,$4);`,
            [req.body.id_prod,req.body.id_prov,req.body.id_cond_env,req.body.id_pais]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
});
app.post("/registroCondicionesPagos/", async(req,res) => {
    const {descripcion} = req.body;
    console.log("Pago");
    console.log(req.body);
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_con_cond_pag (con_cond_pag_id_con,con_cond_pag_id_prod,con_cond_pag_id_prov,con_cond_pag_id_cond_pag,con_cond_pag_id_prov_cond_pag) values ((select con_numero from add_contratos where con_id_prod=$1 and con_id_prov=$2),$1,$2,$3,$2);`,
            [req.body.id_prod,req.body.id_prov,req.body.id_cond_pago]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
});
app.post("/registroIngredientesContrato/", async(req,res) => {
    const {descripcion} = req.body;
    console.log("Ingrediente");
    console.log(req.body);
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_ingredientes_contratados (ing_con_id_con,ing_con_id_con_prod,ing_con_id_con_prov,ing_con_id_ing_ese) values ((select con_numero from add_contratos where con_id_prod=$1 and con_id_prov=$2),$1,$2,$3);`,
            [req.body.id_prod,req.body.id_prov,req.body.ipc]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
});
//COMPRAS
app.get("/proveedoresContratados/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log(id);
        const todo = await pool.query(
            `select C.con_numero as numero, C.con_id_prov as id, P.prov_nombre as value from add_contratos  C, add_proveedores P where C.con_id_prod=$1 and P.prov_id=1;`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/condicionesPagoContratadas/:id", async(req,res) =>{
    try {
        console.log("Pago contratado");
        console.log(req.params);
        const {id} = req.params;
        const todo = await pool.query(
            `select C.con_pag_id as id, C.con_pag_descripcion as value from add_condiciones_pago C, add_con_cond_pag E where E.con_cond_pag_id_con=$1 and E.con_cond_pag_id_cond_pag = C.con_pag_id`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/condicionesEnvioContratadas/:id", async(req,res) =>{
    try {
        console.log("Envio contratado");
        console.log(req.params);
        const {id} = req.params;
        const todo = await pool.query(
            `select C.con_env_id as id, concat(C.con_env_descripcion, ' hacia ',P.pai_nombre,' | $',C.con_env_costo) as value, P.pai_id from add_condiciones_envio C, add_con_cond_env E, add_paises P where E.con_cond_env_id_con=$1 and E.con_cond_env_id_cond_env = C.con_env_id and C.con_env_id_pai = P.pai_id`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/condicionesEnvio/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            `select C.con_cond_env_id_con as idContrato, C.con_cond_env_id_cond_env as id, C.con_cond_env_id_prov as idProveedor, C.con_cond_env_id_pai as idPais, A.con_env_descripcion as value from add_con_cond_env C, add_condiciones_envio A where C.con_cond_env_id_prov=$1 and C.con_cond_env_id_cond_env= A.con_env_id`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/ingredientesContratados/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log("Ingredientes contratados");
        console.log({id});
        const todo = await pool.query(
            `select X.pre_ing_id as id, I.ing_ese_ipc as idIngrediente, concat(I.ing_ese_nombre,' | ',X.pre_ing_volumen,' ml') as value, X.pre_ing_precio as costo from add_ingredientes_esencias I, add_ingredientes_contratados C, add_presentaciones_ing X where X.pre_ing_id_ing_ese = I.ing_ese_ipc and C.ing_con_id_con=$1 and C.ing_con_id_ing_ese = I.ing_ese_ipc`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.post("/registroCompra/", async(req,res) => {
    const {descripcion} = req.body;
    console.log(req.body);
    /*try {
        const nuevaEvaluacion = await pool.query(
           `insert into add_pedidos (ped_fecha,ped_total,ped_status,ped_id_prod,ped_id_prov,ped_id_con_pag,ped_id_prod_con_pag,ped_id_prov_con_pag,ped_id_cond_pag,ped_id_prov_pag,ped_id_con_env,ped_id_prod_con_env,ped_id_prov_con_env,ped_id_cond_env,ped_id_prov_env,ped_id_pai_env) values (current_date,$3,'s',$1,$2,$4,$1,$2,$5,$2,$4,$1,$2,$6,$2,$7);`,
        [req.body.idprod,req.body.idprov,req.body.total,req.body.idcontrato,req,body.idcondicionpago,req.body.idcondicionenvio,req.body.idpais]);
        res.json(nuevaEvaluacion.rows[0]);
    } catch (err) {
        console.error(err.message);
        res=err;
    }*/
});

//EVALUACION
app.post("/registroEvaluacion/", async(req,res) => {
    const {descripcion} = req.body;
    console.log(req.body);
    try {
        const nuevaEvaluacion = await pool.query(
           `insert into add_historicos_evluaciones (his_eva_fecha,his_eva_id_prod,his_eva_id_prov,his_eva_calificacion,his_eva_tipo) values (current_date,$1,$2,$3,'i')`,
        [req.body.his_eva_id_prod,req.body.his_eva_id_prov,req.body.his_eva_calificacion]);
        res.json(nuevaEvaluacion.rows[0]);
    } catch (err) {
        console.error(err.message);
        res=err;
    }
});

app.get("/formulai/:id", async(req,res) =>{
    try {
        console.log(req.params);
        const {id} = req.params;
        const todo = await pool.query(
            `select V.var_nombre as nombre, V.var_peso as peso_total from add_variables V, add_formulas_eval F where V.var_id_prod=$1 and F.for_eva_fecha=V.var_id_for_eva and V.var_id_prod=F.for_eva_fk_prod and F.for_eva_tipo='i'`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/formulaa/:id", async(req,res) =>{
    try {
        console.log(req.params);
        const {id} = req.params;
        const todo = await pool.query(
            `select V.var_nombre as nombre, V.var_peso as peso_total from add_variables V, add_formulas_eval F where V.var_id_prod=$1 and F.for_eva_fecha=V.var_id_for_eva and V.var_id_prod=F.for_eva_fk_prod and F.for_eva_tipo='a'`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});
//uno
app.get("/productores/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM public.prueba WHERE id=$1",[id]);
        res.json(todo.rows[0]);
        console.log("individual");
    } catch (err) {
        console.log(err.message);
    }
});

//update

app.put("/prueba/:id",async(req,res)=>{
    try {
        const {id} =req.params;
        const {descripcion} = req.body;
        const updateTodo = await pool.query("UPDATE prueba SET descripcion=$1 WHERE id=$2",[descripcion,id]);
        res.json("Todo has been updated");
    } catch (err) {
        console.log(err);
    }
    console.log(req.body);
})

//delete

app.delete("/prueba/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM prueba WHERE id=$1",[id]);
        res.json("Todo was deleted");
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
});
