import React, {useState} from 'react';
import styles from './auth.module.css'
import UserService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    console.log(123)
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      auth.loginAction(email, password);
      return;
    }
    alert('Не все поля заполнены')
    // await UserService.login(email, password, navigate).then((response) => {
    //   auth.myLoginAction(response.data)
    // })
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Вход</h1>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <input type="text" className={styles.input} placeholder={'Введите почту'} value={email}
               onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" className={styles.input} placeholder={'Введите пароль'} value={password}
               onChange={(e) => setPassword(e.target.value)}/>
        <button className={styles.button}>Вход</button>
      </form>
    </div>
  );
};

export default Login;