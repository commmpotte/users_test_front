import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// import axios from '../axios'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[\w.@+-]+$/, 'Неверный формат')
    .max(150, 'Максимальная длина 150 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, 'Неверный формат')
    .max(128, 'Максимальная длина 128 символов')
    .required('Обязательное поле'),
  firstName: Yup.string()
    .max(150, 'Максимальная длина 150 символов')
    .required('Обязательное поле'),
  lastName: Yup.string()
    .max(150, 'Максимальная длина 150 символов')
    .required('Обязательное поле'),
})

const Register = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        values
      )

      console.log('Успешная регистрация:', response.data)
      navigate('/auth/login')
      setSubmitting(false)
    } catch (error) {
      console.error('Ошибка при регистрации:', error)
      setSubmitting(false)
    }
  }

  return (
    <main className="form-signin text-center">
      <h2 className="h3 mb-3 fw-normal">Регистрация</h2>
      <Formik
        initialValues={{
          username: '',
          password: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-floating my-2">
              <label className="py-1" htmlFor="floatingInput">
                Username
              </label>
              <Field
                className={`form-control ${
                  errors.username && touched.username ? 'is-invalid' : ''
                }`}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="form-floating my-2">
              <label className="py-1" htmlFor="floatingPassword">
                Password
              </label>
              <Field
                className={`form-control ${
                  errors.password && touched.password ? 'is-invalid' : ''
                }`}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-floating my-2">
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className={`form-control ${
                  errors.firstName && touched.firstName ? 'is-invalid' : ''
                }`}
                placeholder="First Name"
              />
              <label className="py-1" htmlFor="floatingFirstName">
                First Name
              </label>
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>

            <div className="form-floating my-2">
              <Field
                className={`form-control ${
                  errors.firstName && touched.firstName ? 'is-invalid' : ''
                }`}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
              />
              <label htmlFor="floatingLastName">Last Name</label>
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <button className="btn btn-primary w-100 py-2 my-2" type="submit">
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Уже зарегестрирован? <Link to="/auth/login">Сюда</Link>
      </p>
    </main>
  )
}

export default Register
