import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);

    const obetenerClienteAPI = async () => {
      const url = `http://localhost:4000/clientes/${id}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setCliente(resultado);
      setCargando(false);
    }
    obetenerClienteAPI();
  }, [])



  return (
    <>
      <h1 className="font-black text-4xl text-blue-900"> Editar cliente</h1>
      <p className="mt-3">Llena los siguientes campos para editar un cliente</p>

      {cliente?.nombre ?(<Formulario
        key={cliente.id}
        cliente={cliente}
        cargando={cargando}
      />)
      :<p>Cliente ID no valido</p>
      }
      
    </>
  )
}

export default EditarCliente