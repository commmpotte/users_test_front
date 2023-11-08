import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Intro() {
  return (
    <div className="text-center mt-5">
      <h2 className="display-4">Добро пожаловать</h2>
      <div className="mt-3">
        <Link to="/auth/login">
          <button className="btn btn-primary me-2">Логин</button>
        </Link>
        <Link to="/auth/register">
          <button className="btn btn-secondary">Регистрация</button>
        </Link>
      </div>
    </div>
  )
}

export default Intro
