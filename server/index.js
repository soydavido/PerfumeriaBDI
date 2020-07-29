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
app.post("/registroFormula/", async(req,res) => {
    const {descripcion} = req.body;
    console.log(req.body);
        try {
            const nuevaEvaluacion = await pool.query(
            `insert into add_formulas_eval (for_eva_fecha,for_eva_fk_prod,for_eva_tipo,for_eva_criterio_exito,for_eva_limite_superior,for_eva_limite_inferior) values (current_date,$1,'i',$2,$3,$4) returning for_eva_fecha, for_eva_fk_prod`,
            [req.body.fk_prod,req.body.criterio_exito,req.body.limite_s,req.body.limite_i]);
            res.json(nuevaEvaluacion.rows[0]);
        } catch (err) {
            console.error(err.message);
            res=err;
        }
});
//Ventana de evaluacion
app.get("/productores/", async(req,res) =>{
    try {
        console.log(req.params);
        const todo = await pool.query("SELECT prod_id as id, prod_nombre as value FROM add_productores");
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/proveedores/", async(req,res) =>{
    try {
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
            `select P.prov_id as id, P.prov_nombre as value from add_proveedores P,  add_prod_pais R, add_condiciones_envio C where P.prov_id = C.con_env_id_prov and C.con_env_id_pai = R.prod_pais_id_pai and R.prod_pais_id_prod = $1;`
            ,[id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//CONTRATOS

app.get("/contratado/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log({id});
        const nuevaEvaluacion = await pool.query(
            `select C.con_numero as numero, C.con_id_prov as id, P.prov_nombre as value from add_contratos C, add_proveedores P where C.con_id_prod = $1 and C.con_id_prov = P.prov_id;`,
         [id]);
        res.json(nuevaEvaluacion.rows);
    } catch (err) {
        console.log(err.message);
    }
});
app.get("/proveedoresContratados/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log(id);
        const todo = await pool.query(
            `select C.con_numero as numero, C.con_id_prov as id, P.prov_nombre as value from add_contratos  C, add_proveedores P where C.con_id_prod=1 and P.prov_id=1;`,
            [id]);
        res.json(todo.rows);
        console.log(res);
    } catch (err) {
        console.log(err.message);
    }
});

//COMPRAS
app.get("/proveedoresContratados/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        console.log(id);
        const todo = await pool.query(
            `select C.con_numero as numero, C.con_id_prov as id, P.prov_nombre as value from add_contratos  C, add_proveedores P where C.con_id_prod=1 and P.prov_id=1;`,
            [id]);
        res.json(todo.rows);
        console.log(res);
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
        const todo = await pool.query(
            `
            select I.ing_ese_ipc as id, I.ing_ese_tscacas as value from add_ingredientes_esencias I, add_ingredientes_contratados C where C.ing_con_id_con=$1 and C.ing_con_id_ing_ese = I.ing_ese_ipc;`,
            [id]);
        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
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

app.get("/formula/:id", async(req,res) =>{
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
