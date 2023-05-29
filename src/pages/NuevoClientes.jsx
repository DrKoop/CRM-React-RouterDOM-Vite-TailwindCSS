import { useNavigate, Form, useActionData } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function action({request}){
  
  const formData = await request.formData()
  
  const datos = Object.fromEntries(formData)

  const email = formData.get('email')
  
  //Validacion Formulario
  const errores = []
  if(Object.values(datos).includes('')){
    errores.push('Todos los campos son Obligatorios')
  }

  //Valida email en formato correcto
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
    errores.push('El Formato de email no es el Indicado')
  }

  //Retornando los errores, si estos existes => si hay campos vacios
  if(Object.keys(errores).length){
    return errores
  }
}


const NuevoClientes = () => {

  //Accediendo a los errores del => action en una funcion aislada , con el hook useActionData()
  const erroresDesdeComponente = useActionData()

  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">LLena Todos los campos para registar un nuevo cliente</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={ () => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {erroresDesdeComponente?.length && erroresDesdeComponente.map( (error, i) => 
        <Error key={i}>
          {error}
        </Error>
        )}

        <Form 
          method="post"
          noValidate
        >
          <Formulario/>
          <input 
            type="submit"
            value="Registrar Cliente"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoClientes