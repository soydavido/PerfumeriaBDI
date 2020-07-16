import React, {Fragment, useEffect, useState} from "react"

const EditPrueba = ({todo}) => {
     const [descripcion, setDescripcion] = useState(todo.descripcion);
    console.log(todo);

    const updateDescripcion = async e => {
        e.preventDefault();
        try {
            const body = {descripcion};
            const response = await fetch (`http://localhost:5000/prueba/${todo.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
        console.log(todo.description);
    }
    
    return<Fragment>
    
<button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.id}`}>
  Edit
</button>

<div class="modal" id={`id${todo.id}`}>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title text-center">Edit</h4>
        <button type="button" class="close" data-dismiss="modal" onClick={()=> setDescripcion=(todo.descripcion)} >&times;</button>
      </div>

      <div class="modal-body">
        <input type='text' className="form-control" value={descripcion} onChange={ e => setDescripcion(e.target.value)} />
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick= {e => updateDescripcion(e)}>Edit</button>
        <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescripcion(todo.descripcion)}
              >
                Close
              </button>
      </div>

    </div>
  </div>
</div>
    </Fragment>
}
export default EditPrueba