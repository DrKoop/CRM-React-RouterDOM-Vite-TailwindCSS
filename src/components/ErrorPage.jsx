//Obtener el error que se este presentando
import { useRouteError } from 'react-router-dom'

export default function ErrorPage(){
    const errorOcurrido =  useRouteError()

    return(
        <div className='space-y-8'>
            <h1 className='text-center text-6xl font-extrabold text-blue-900'>CRM - Clientes</h1>
            <p className='text-center font-bold text-2xl text-red-900'>Ocurrio Un Error</p>
            <p className='text-center font-bold'>{errorOcurrido.message || errorOcurrido.statusText }</p>
        </div>
    )
}