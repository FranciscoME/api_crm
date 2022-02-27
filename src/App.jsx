import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import NuevoCliente from './paginas/NuevoCliente';
import EditarCliente from './paginas/EditarCliente';
import Inicio2 from './paginas/Inicio2';
import VerCliente from './paginas/VerCliente';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio2 />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>

        {/* 
        <Route path="/" element={<IniciarSesion />}>
          <Route index element={<LoginForm/>}/>
        </Route> */}

      </Routes>
    </BrowserRouter >
  )
}

export default App
