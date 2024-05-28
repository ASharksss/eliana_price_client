import React, {useState} from 'react';
import styles from './auth.module.css'

const Registration = () => {
  const [user, setUser] = useState({
    inn: null,
    short_name: null,
    email: null,
    phone: null,
    address: null,
    password: null,
    typeUser: 1
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  console.log(user)
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>
      <form action="" className={styles.form}>
        <input type="text" className={styles.input} placeholder={'ИНН'} name={'inn'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Название организации'} name={'short_name'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Электронная почта'} name={'email'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Телефон'} name={'phone'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Адрес'} name={'address'} onChange={handleChange}/>
        <input type="text" className={styles.input} placeholder={'Пароль'} name={'password'} onChange={handleChange}/>
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