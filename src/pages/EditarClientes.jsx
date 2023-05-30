import { Form , useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../api/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"


export async function loader({params}){

    const idClienteDinamico = await obtenerCliente(params.clienteId)
    
    if( Object.values(idClienteDinamico).length === 0 ){
        throw new Response( '', {
            status : 404,
            statusText : 'Cliente No Valido o Inexistente'
        })
    }
    return idClienteDinamico
}

//Enviando informacion modificada del formulario 
export async function action({request, params}){
  
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

      //Atualizando Formulario..
      await actualizarCliente(params.clienteId, datos)
      return redirect('/')

}


const EditarClientes = () => {

  const navigate = useNavigate()
  const cliente = useLoaderData()
  const erroresDesdeComponente = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Puedes Modificar Los Datos de Un Cliente</p>
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
          <Formulario
            cliente={cliente}
          />
          <input 
            type="submit"
            value="Guardar Cambios"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarClientes