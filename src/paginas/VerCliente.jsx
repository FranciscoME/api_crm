import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
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
      {cargando ? <Spinner /> :

        Object.keys(cliente).length === 0
          ? <p>No hay resultados</p> :
          (
            <>
              <h1 className="font-black text-4xl text-blue-900">Cliente</h1>
              <p className="mt-3">Informacion del cliente</p>

              <p className="text-2xl mt-10 text-gray-600">
                <span className="text-gray-700 uppercase font-bold">Cliente: </span>
                {cliente.nombre}
              </p>
              <p className="text-2xl mt-2 text-gray-600">
                <span className="text-gray-700 uppercase font-bold">Email: </span>
                {cliente.email}
              </p>
              <p className="text-2xl mt-2 text-gray-600">
                <span className="text-gray-700 uppercase font-bold">Telefono: </span>
                {cliente.telefono}
              </p>
              <p className="text-2xl mt-2 text-gray-600">
                <span className="text-gray-700 uppercase font-bold">Nombre empreza:</span>
                {cliente.empresa}
              </p>
              {cliente.notas && (
                <p className="text-2xl mt-2 text-gray-600">
                  <span className="text-gray-700 uppercase font-bold">Notas:</span>
                  {cliente.notas}
                </p>
              )}

            </>
          )
      }
    </>





    // <>
    //   {Object.keys(cliente).length === 0
    //     ? <p>No hay resultados</p> : (

    //       <div>

    //         {cargando ? 'Cargando...' : (
    //           <>
    //             <h1 className="font-black text-4xl text-blue-900">Cliente</h1>
    //             <p className="mt-3">Informacion del cliente</p>

    //             <p className="text-2xl mt-10 text-gray-600">
    //               <span className="text-gray-700 uppercase font-bold">Cliente: </span>
    //               {cliente.nombre}
    //             </p>
    //             <p className="text-2xl mt-2 text-gray-600">
    //               <span className="text-gray-700 uppercase font-bold">Email: </span>
    //               {cliente.email}
    //             </p>
    //             <p className="text-2xl mt-2 text-gray-600">
    //               <span className="text-gray-700 uppercase font-bold">Telefono: </span>
    //               {cliente.telefono}
    //             </p>
    //             <p className="text-2xl mt-2 text-gray-600">
    //               <span className="text-gray-700 uppercase font-bold">Nombre empreza:</span>
    //               {cliente.empresa}
    //             </p>
    //             {cliente.notas && (
    //               <p className="text-2xl mt-2 text-gray-600">
    //                 <span className="text-gray-700 uppercase font-bold">Notas:</span>
    //                 {cliente.notas}
    //               </p>
    //             )}
    //           </>
    //         )}

    //       </div>

    //     )}
    // </>

  )
}

export default VerCliente