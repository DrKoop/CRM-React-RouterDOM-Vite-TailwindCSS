import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoClientes, { action as nuevoClienteAction } from './pages/NuevoClientes'
import Index, { loader as clientesLoader } from './pages/Index'

const customRoutes = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children : [
      {
        index : true,
        element : <Index/>,
        loader : clientesLoader
      },
      {
        path : '/clientes/nuevo',
        element : <NuevoClientes/>,
        action : nuevoClienteAction
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
