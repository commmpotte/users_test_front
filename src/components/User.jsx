import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv'



function User() {
  dotenv.config()
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [isSuperuser, setIsSuperuser] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${id}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch user with ID: ${id}`)
        }

        const userData = await response.json()
        setUser(userData)
        setIsSuperuser(userData.is_superuser)
        setIsActive(userData.is_active)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [id])

  const handleSave = () => {
    const updatedUser = {
      ...user,
      is_superuser: isSuperuser,
      is_active: isActive,
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при обновлении данных пользователя')
        }
        navigate('/users')
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных пользователя:', error)
      })
  }

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при удалении пользователя')
        }
        setUser(null)
        navigate('/users')
      })
      .catch((error) => {
        console.error('Ошибка при удалении пользователя:', error)
      })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Данные пользователя</h2>
      <div>
        <p>
          <strong>id:</strong> {user.id}
        </p>
        <p>
          <strong>username:</strong> {user.username}
        </p>
        <p>
          <strong>Имя:</strong> {user.first_name}
        </p>
        <p>
          <strong>Фамилия:</strong> {user.last_name}
        </p>
        <div className="form-check form-switch">
          <input
            className="form-check-input ms-4"
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            id="isActiveSwitch"
          />
          <label className="form-check-label me-5" htmlFor="isActiveSwitch">
            Активен
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input ms-4"
            type="checkbox"
            checked={isSuperuser}
            onChange={() => setIsSuperuser(!isSuperuser)}
            id="isSuperuserSwitch"
          />
          <label className="form-check-label me-5" htmlFor="isSuperuserSwitch">
            Суперюзер
          </label>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleSave}>
          Сохранить
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default User
