import React, {useEffect, useState} from 'react';
import styles from './auth.module.css'
import userService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";

const Registration = () => {
  const {user, isAuth} = useAuth();
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    inn: null,
    short_name: null,
    email: null,
    phone: null,
    address: null,
    password: null,
    typeUser: 1
  })

  useEffect(() => {
    console.log(user)
    if (user?.typeUserId !== 3 || !isAuth) return navigate('/')
  }, [])

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userService.createNewUser(newUser)
      .then(() => {
        alert('Пользователь создан')
        navigate('/')
      })
      .catch((e) => {
        console.log(e)
        alert('Ошибка при создании пользователя')
      })
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" className={styles.input} placeholder={'ИНН'} name={'inn'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Название организации'} name={'short_name'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Электронная почта'} name={'email'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Телефон'} name={'phone'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Адрес'} name={'address'} onChange={handleChange}/>
        <input type="password" className={styles.input} placeholder={'Пароль'} name={'password'} onChange={handleChange}/>
        <select className={styles.select} name={'typeUser'} onChange={handleChange}>
          <option value={1}>Оптовый покупатель</option>
          <option value={2}>Розничный магазин</option>
        </select>
        <button className={styles.button}>Создать</button>
      </form>
    </div>
  );
};

export default Registration;