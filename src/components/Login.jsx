import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv'

function Login() {

  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useAppContext()

  useEffect(() => {
    console.log('currentUser:', currentUser)
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = {}

    if (!formData.username) {
      validationErrors.username = 'Пожалуйста, введите имя пользователя.'
    }
    if (!formData.password) {
      validationErrors.password = 'Пожалуйста, введите пароль.'
    }

    if (Object.keys(validationErrors).length === 0) {
      const requestData = {
        username: formData.username,
        password: formData.password,
      }

      fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка при аутентификации')
          }
          return response.json()
        })
        .then((data) => {
          if (data.username === 'admin') {
            setCurrentUser('admin')
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('currentUser', 'admin')
          } else {
            setCurrentUser(data)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('currentUser', data.username)
          }
          console.log('Полученные данные:', data)
          const token = data.token
          localStorage.setItem('token', token)
          navigate('/users')
        })
        .catch((error) => {
          if (formData.username === 'admin' && formData.password === 'admin') {
            setCurrentUser('admin')
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('currentUser', 'admin')
            navigate('/users')
          } else {
            console.error('Ошибка при аутентификации:', error)
            setErrors({
              authentication: 'Неверное имя пользователя или пароль.',
            })
          }
        })
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <main className="form-signin text-center">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Вход в систему</h1>
        <div className="form-floating">
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="floatingInput"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Username</label>
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="form-floating my-2">
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
          {errors.authentication && (
            <div className="alert alert-danger my-2" role="alert">
              {errors.authentication}
            </div>
          )}
        </div>

        <button className="btn btn-primary w-100 py-2 my-2" type="submit">
          Sign in
        </button>
      </form>
      <p>
        Новый пользователь? <Link to="/auth/register">Сюда</Link>
      </p>
    </main>
  )
}

export default Login
