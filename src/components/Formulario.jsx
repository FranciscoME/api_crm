import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre del cliente es obligatorio').min(3, 'El nombre es muy corto').max(10, 'El nombre es muy largo'),
    empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
    email: Yup.string().required('El email es obligatorio').email('El email no es valido'),
    telefono: Yup.number().typeError('El numero no es valido').integer('Numero no es valido').positive('Numero no es valido'),
    notas: '',
  })


  const handleSubmit = async (valores) => {
    try {

      let respuesta;

      if (cliente.id) {
        // Editar cliente
        const url = `http://localhost:4000/clientes/${cliente.id}`

         respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'content-type': 'application/json'
          }
        })



      }
      else {
        // Nuevo cliente
        const url = 'http://localhost:4000/clientes'

        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'content-type': 'application/json'
            }
        })

        
      }
      await respuesta.json();
      navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    cargando ? <Spinner />
      : (
        <div className="bg-white mt-10 px-5 py-10 rounded shadow-md md:w-3/4 mx-auto">
          <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'} </h1>
          <Formik
            initialValues={{
              nombre: cliente?.nombre ?? "",
              empresa: cliente?.empresa ?? "",
              email: cliente?.email ?? "",
              telefono: cliente?.telefono ?? "",
              notas: cliente?.notas ?? "",
            }}

            enableReinitialize={true}

            onSubmit={async (values, { resetForm }) => {
              await handleSubmit(values);
              resetForm();
              navigate('/clientes');
            }}

            validationSchema={nuevoClienteSchema}

          >
            {
              (data) => {
                const { errors, touched } = data;

                return (
                  <Form className="mt-10">

                    <div className="mb-4">
                      <label className="text-gray-900 " htmlFor="nombre">Nombre:</label>
                      <Field
                        id="nombre"
                        type="text"
                        className="mt-2 block bg-gray-50 w-full p-3"
                        placeholder="Nombre del cliente"
                        name="nombre"
                      />
                      {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                      ) : null
                      }
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-900 " htmlFor="empresa">Empresa:</label>
                      <Field
                        id="empresa"
                        type="text"
                        className="mt-2 block bg-gray-50 w-full p-3"
                        placeholder="Empresa del cliente"
                        name="empresa"
                      />
                      {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-900 " htmlFor="email">Email:</label>
                      <Field
                        id="email"
                        type="email"
                        className="mt-2 block bg-gray-50 w-full p-3"
                        placeholder="email"
                        name="email"
                      />
                      {errors.email && touched.email ?
                        <Alerta>{errors.email}</Alerta>
                        : null}
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-900 " htmlFor="telefono">Telefono:</label>
                      <Field
                        id="telefono"
                        type="tel"
                        className="mt-2 block bg-gray-50 w-full p-3"
                        placeholder="443..."
                        name="telefono"
                      />
                      {errors.telefono && touched.telefono ?
                        <Alerta>{errors.telefono}</Alerta>
                        : null}
                    </div>

                    <div className="mb-4">
                      <label className="text-gray-900 " htmlFor="notas">Notas:</label>
                      <Field
                        as="textarea"
                        id="notas"
                        type="text"
                        className="mt-2 block bg-gray-50 w-full p-3 h-30"
                        placeholder="Notas del cliente"
                        name="notas"
                      />
                      {errors.notas && touched.notas ?
                        <Alerta>{errors.notas}</Alerta>
                        : null}
                    </div>

                    <input
                      type="submit"
                      value={cliente.nombre?'Actualizar usuario':'Agregar usuario'}
                      className="mt-5 w-full bg-blue-700 text-white uppercase font-bold text-lg"
                    />

                  </Form>

                )
              }
            }
          </Formik>
        </div>
      )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
}

export default Formulario