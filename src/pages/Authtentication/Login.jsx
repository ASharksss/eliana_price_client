import React, {useState} from 'react';
import styles from './auth.module.css'
import {useAuth} from "../../context/AuthProvider";

const Login = () => {
	const auth = useAuth();

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e) => {
		setError('')
		e.preventDefault();
		if (email.trim() !== '' && password.trim() !== '') {
			auth.loginAction(email, password).catch(err => {
				setError(err)
			});
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
				{error !== '' ? <p style={{
					color: "red",
					marginTop: 10,
					padding: "10px 20px",
					border: "1px solid red",
					borderRadius: 15
				}}>{error}</p> : null}
			</form>
		</div>
	);
};

export default Login;