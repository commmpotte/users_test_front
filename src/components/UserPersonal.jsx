import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../store/store'
import 'bootstrap/dist/css/bootstrap.min.css'

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

const UserPersonal = () => {
  const { currentUser, setCurrentUser } = useAppContext()
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        username: currentUser.username,
        password: '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
      })
    }
  }, [currentUser])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}users/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      )
      if (response.ok) {
        const userData = response.data
        setCurrentUser(userData)
        // console.log(currentUser)
        console.log('Успешное обновление данных:', userData)
        navigate('/users')
        setSubmitting(false)
      } else {
        const errorText = await response.text()
        console.error('Ошибка при обновлении данных:', errorText)
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error)
      setSubmitting(false)
    }
  }

  return (
    <main className="form-signin text-center">
      <h1 className="h3 mb-3 fw-normal">Изменить свои данные</h1>
      <p>Вы вошли как {initialValues.username}</p>
      {/* {console.log('initialValues:', initialValues)}
      {console.log('currentUser', currentUser)} */}
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
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
              Сохранить
            </button>
            <button className="btn  w-100 py-2 my-2">
              <Link to="/users">Назад</Link>
            </button>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default UserPersonal
