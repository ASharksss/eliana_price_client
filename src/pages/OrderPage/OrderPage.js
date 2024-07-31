import React, {useState, useEffect} from 'react';
import styles from './order.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import HomeService from "../../services/HomeService";
import {useAuth} from "../../context/AuthProvider";

const OrderPage = () => {
  const {isAuth} = useAuth()
  const location = useLocation();
  const navigate = useNavigate();
  const [formOrg, setFormOrg] = useState('OOO')
  const [nameOrg, setNameOrg] = useState(null)

  useEffect(() => {
    if (!isAuth || location.state === null) return navigate('/')
  }, [])

  if (location.state === null) return navigate('/')
  const {data, generalCount} = location.state;

  /* const handleSubmit = (e) => {
     e.preventDefault();
     HomeService.takeOrder(data, formOrg, nameOrg, generalCount)
       .then(() => navigate('/correctOrder'))
   }*/

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/transportCompany', {state: {data, generalCount, formOrg, nameOrg}})
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.input_block}>
        <h1 className={styles.title}>Кто плательщик</h1>
        <label htmlFor="">Выберите форму организации</label>
        <select name="" id="" className={styles.input} onChange={(e) => setFormOrg(e.target.value)}>
          <option value="OOO">ООО</option>
          <option value="IP">ИП</option>
        </select>
      </div>

      <div className={styles.input_block}>
        <label htmlFor="">Введите название организации</label>
        <input type="text" placeholder='Название организации' className={styles.input}
               onChange={e => setNameOrg(e.target.value)} required={true}/>
      </div>


      <button className={styles.submit}>Отправить заказ</button>
    </form>
  );
};

export default OrderPage;