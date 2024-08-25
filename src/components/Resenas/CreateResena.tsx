"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createResena } from "@/api/rorUserApi";
//importamos el icono de close de react-icons
import { FaTimes } from "react-icons/fa";

const initResultResena = {
  success: false,
  message: "",
};

const CreateResena = () => {
  const user = useSelector((state: any) => state.user);
  const [resultResena, setResultResena] = useState<any>(initResultResena);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    //values.name = user.username||'Guest';
    console.log(values);
    const dataResena = {
      resena: values.resena,
      calificacion: values.stars,
      siteResena: "esteticaPink"
    };
    setLoading(true);
    try {
      const result = await createResena(dataResena, user.access_token);
      console.log(result);
      const { success, message } = result;
      setResultResena({ success, message });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    name: Yup.string(),
    resena: Yup.string().required("La reseña es requerida"),
    stars: Yup.number()
      .min(1, "La calificación debe ser al menos 1")
      .max(5, "La calificación no puede ser mayor a 5")
      .required("La calificación es requerida"),
  });

  return (
    <Formik
      initialValues={{ name: "", resena: "", stars: 5 }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values);
        setSubmitting(false);
        //setResultResena(initResultResena);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Nombre
            </label>
            <Field
              type="text"
              name="name"
              value={user.username || "Guest"}
              disabled={true}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="resena"
              className="block text-gray-700 font-semibold mb-2"
            >
              Reseña
            </label>
            <Field
              as="textarea"
              name="resena"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              rows="4"
            />
            <ErrorMessage
              name="resena"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="stars"
              className="block text-gray-700 font-semibold mb-2"
            >
              Calificación
            </label>
            <Field
              as="select"
              name="stars"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="1">1 estrella</option>
              <option value="2">2 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="5">5 estrellas</option>
            </Field>
            <ErrorMessage
              name="stars"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white-500"></div>
                </div>
              ) : (
                "Enviar Reseña"
              )}
            </button>
          </div>
          <div>
            {resultResena.message && (
              <div
                className={`text-center mt-3 p-3 text-white ${
                  resultResena.success ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {resultResena.message}
                <FaTimes
                  className="float-right cursor-pointer"
                  onClick={() => setResultResena(initResultResena)}
                />
              </div>
              )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateResena;
