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
        console.log(req.params);
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
})
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
