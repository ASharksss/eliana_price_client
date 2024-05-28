import React, {useState} from 'react';
import styles from './auth.module.css'
import UserService from "../../services/UserService";

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.login(email, password)
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Вход</h1>
      <form action="" className={styles.form}>
        <input type="text" className={styles.input} placeholder={'Введите почту'} value={email}
               onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" className={styles.input} placeholder={'Введите пароль'} value={password}
               onChange={(e) => setPassword(e.target.value)}/>
        <button className={styles.button}>Вход</button>
      </form>
    </form>
  );
};

export default Login;