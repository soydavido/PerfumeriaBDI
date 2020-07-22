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

//todos

app.get("/productores/", async(req,res) =>{
    try {
        console.log(req.params);
        const todo = await pool.query("SELECT prod_id as id, prod_nombre as value FROM add_productores");
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
