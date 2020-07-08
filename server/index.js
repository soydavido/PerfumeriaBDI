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

//get

//update

//delete


app.listen(5000, () => {
    console.log("server has started on port 5000")
});
