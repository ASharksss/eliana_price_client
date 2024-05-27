import React, {useState} from 'react';
import styles from './order.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import HomeService from "../../services/HomeService";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location)
  const {data, generalCount} = location.state;
  const [formOrg, setFormOrg] = useState('OOO')
  const [nameOrg, setNameOrg] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    HomeService.takeOrder(data, formOrg, nameOrg, generalCount)
      .then(() => navigate('/correctOrder'))
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.input_block}>
        <h1 className={styles.title}>Информация о плательщике</h1>
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

      <button className={styles.submit}
      >Отправить заказ
      </button>
    </form>
  );
};

export default OrderPage;