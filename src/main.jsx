import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoClientes, { action as nuevoClienteAction } from './pages/NuevoClientes'
import Index, { loader as clientesLoader } from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditarClientes, {loader as clientesEditarLoader, action as clientesEditarAccion } from './pages/EditarClientes'
import { action as eliminarClienteAction } from './components/Cliente'

const customRoutes = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children : [
      {
        index : true,
        element : <Index/>,
        loader : clientesLoader,
        errorElement : <ErrorPage/>
      },
      {
        path : '/clientes/nuevo',
        element : <NuevoClientes/>,
        action : nuevoClienteAction,
        errorElement : <ErrorPage/>
      },
      {
        /* Editar Registro => Routing Dinamico para los ID */
        path : '/clientes/:clienteId/editar',
        element : <EditarClientes/>,
        loader : clientesEditarLoader,
        action : clientesEditarAccion,
        errorElement : <ErrorPage/>
      },
      {
        path : '/clientes/:clienteId/eliminar',
        action : eliminarClienteAction
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
        router={customRoutes}
    />
  </React.StrictMode>
)
