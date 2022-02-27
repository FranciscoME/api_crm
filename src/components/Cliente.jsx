import React from 'react'
import { useNavigate } from 'react-router-dom';

const Cliente = ({ cliente,handleEliminar }) => {
  const { nombre, empresa, email, notas, telefono, id } = cliente;

  const navegate = useNavigate();



  return (
    <tr className="border-b-8 hover:bg-gray-100">
      <td className="p-3"> {nombre}</td>
      <td className="p-3">
        <p><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
        <p><span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono}</p>

      </td>
      <td className="p-3"> {empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className=" bg-yellow-500 block w-full text-white hover:bg-yellow-700 p-2 uppercase font-bold text-xs"
          onClick={()=>{ navegate(`/clientes/${id}`)} }
        >Ver</button>

        <button
          type="button"
          className=" bg-blue-600 block w-full text-white hover:bg-blue-700 p-2 uppercase font-bold text-xs mt-3"
          onClick={()=> navegate(`/clientes/editar/${id}`)}
        >Editar</button>
  
        <button
          type="button"
          className=" bg-red-600 block w-full text-white hover:bg-red-700 p-2 uppercase font-bold text-xs mt-3"
          onClick={()=> handleEliminar(id)}
        >Eliminar</button>

      </td>

    </tr>
  )
}

export default Cliente