import React, { useEffect, useState } from 'react'
import { useAppContext } from '../store/store'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchCriteria, setSearchCriteria] = useState('username')
  const [searchValue, setSearchValue] = useState('')
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  })
  const { currentUser, setCurrentUser } = useAppContext()
  const navigate = useNavigate()
  useEffect(() => {
    console.log('currentUser:', currentUser)
  }, [currentUser])
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)

      const query = {
        criteria: searchCriteria,
        value: searchValue.toString(),
        sortKey: sortConfig.key,
        sortOrder: sortConfig.direction,
      }

      //  {
      //           method: 'GET',
      //           headers: {
      //             'Content-Type': 'application/json',
      //           },
      //           body: JSON.stringify(requestData),
      //         }

      fetch(
        `${window.REACT_APP_API_URL}users?criteria=${searchCriteria}&value=${searchValue}&sortKey=${query.sortKey}&sortOrder=${query.sortOrder}`
      )
        .then((response) => response.json())
        .then((data) => {
          const sortedUsers = [...data].sort((a, b) => {
            if (a[query.sortKey] < b[query.sortKey]) {
              return query.sortOrder === 'asc' ? -1 : 1
            }
            if (a[query.sortKey] > b[query.sortKey]) {
              return query.sortOrder === 'asc' ? 1 : -1
            }
            return 0
          })

          setUsers(sortedUsers)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Ошибка при получении пользователей:', error)
          setLoading(false)
        })
    }

    fetchUsers('users')
  }, [searchCriteria, searchValue, sortConfig])

  const handleSort = (key) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    setUsers(sortedUsers)
    setSortConfig({ key, direction: newDirection })
  }

  function formatDate(dateString) {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', options)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
    navigate('/auth/login')
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {currentUser === 'admin' ? (
            <>
              <h5 className="m-0 mt-1">Вы вошли как {currentUser}</h5>
            </>
          ) : (
            <>
              <h5 className="m-0 mt-1">Вы вошли как {currentUser.username}</h5>
            </>
          )}
        </div>
        <div>
          {currentUser && (
            <>
              <button className="btn btn-danger me-2" onClick={handleLogout}>
                Выйти
              </button>
            </>
          )}
          {currentUser.username && currentUser.is_superuser === true && (
            <button className="btn btn-light ">
              <Link to={`/users/pp/${currentUser.id}`}>Личный кабинет</Link>
            </button>
          )}
        </div>
      </div>
      <h3>Список пользователей</h3>

      <div className="d-flex align-items-center justify-content">
        <div>
          <label className="">Поиск по:</label>
          <button
            className={`btn btn-light ms-2 ${
              searchCriteria === 'username' ? 'active' : ''
            }`}
            onClick={() => setSearchCriteria('username')}
          >
            username
          </button>
          <button
            className={`btn btn-light ms-2 ${
              searchCriteria === 'id' ? 'active' : ''
            }`}
            onClick={() => setSearchCriteria('id')}
          >
            id
          </button>
        </div>

        <input
          className="form-control form-control-dark ms-3 w-50"
          type="search"
          placeholder="Введите значение для поиска"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              id
              {sortConfig.key === 'id' && (
                <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
            <th>username</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Активен</th>
            <th>Последний вход</th>
            <th>Суперюзер</th>
          </tr>
        </thead>
        {users.length > 0 ? (
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {currentUser === 'admin' ? (
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  ) : (
                    user.username
                  )}
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.is_active ? 'Да' : 'Нет'}</td>
                <td>{formatDate(user.last_login)}</td>
                <td>{user.is_superuser ? 'Да' : 'Нет'}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="7">Данные загружаются...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}

export default UserList
