"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
//import { title } from 'process';
import * as Yup from "yup";
import Image from "next/image";
import { registerUser } from "@/api/rorUserApi";
import Modal from "../Modal/Modal";

export const dataAvatares = [
  {
    title: "Avatar 1",
    url: "/avatar1.png",
  },
  {
    title: "Avatar 2",
    url: "/avatar2.png",
  },
  {
    title: "Avatar 3",
    url: "/avatar3.png",
  },
  {
    title: "Avatar 4",
    url: "/avatar4.png",
  },
];

const initialValues = {
  username: "",
  avatar: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const schema = Yup.object().shape({
  username: Yup.string().required("Required"),
  avatar: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .max(20, "Must be 20 characters or less")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const initDataModal = { title: "", message: "", type: "", verification: "" };

export default function SignUp() {
  //const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState(initDataModal);

  const handleSubmit = async (values: any) => {
    //console.log(values);
    const { confirmPassword, ...dataUser } = values;
    try {
      console.log("Inicia Registro:", dataUser);
      const response = await registerUser(dataUser);
      console.log("respuesta:", response);
      const { verification } = response;
      if (!verification) {
        setDataModal({
          title: response.error || "Error",
          message: response.message || "Registro fallido",
          type: "error",
          verification: "",
        });
      } else {
        setDataModal({
          title: "Finalizar Registro",
          verification: verification,
          message:
            "Porfavor captura el código de confirmación que te fue enviado via email",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      setDataModal({
        title: "Error",
        message: "Ocurrió un error al registrar el usuario",
        type: "error",
        verification: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Registro
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {(props) => {
            return (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {props.values.avatar ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Avatar seleccionado
                    </label>
                    <div className="flex items-center justify-center">
                      <Image
                        src={
                          dataAvatares.find(
                            (avatar) => avatar.title === props.values.avatar
                          )?.url || ""
                        }
                        alt={props.values.avatar}
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Selecciona tu avatar
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      {dataAvatares.map((avatar, index) => (
                        <div
                          style={{ cursor: "pointer" }}
                          key={avatar.title}
                          className="flex items-center justify-center"
                          onClick={() => {
                            //console.log("Avatar seleccionado:", avatar.title);
                            //values.avatar = avatar.url;
                            props.setFieldValue("avatar", avatar.title);
                          }}
                        >
                          {/* <img src={avatar.url} alt={avatar.title} className="w-12 h-12 rounded-full" /> */}
                          <Image
                            src={avatar.url}
                            alt={avatar.title}
                            width={48}
                            height={48}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ErrorMessage
                  name="avatar"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Registrarme
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {dataModal.title !== "" && (
        <Modal
          isOpen={dataModal.title !== ""}
          onClose={() => setDataModal(initDataModal)}
          title={dataModal.title}
          type={dataModal.type}
          verification={dataModal.verification}
        >
          <p
            className={
              dataModal.type === "error" ? "text-red-600" : "text-green-600"
            }
          >
            {dataModal.message}
          </p>
        </Modal>
      )}
    </div>
  );
}
