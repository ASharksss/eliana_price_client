import React, {useState} from 'react';
import styles from './order.module.css'
import {useLocation} from "react-router-dom";
import HomeService from "../../services/HomeService";

const OrderPage = () => {
  const location = useLocation();
  const data = location.state;
  const [formOrg, setFormOrg] = useState('OOO')
  const [nameOrg, setNameOrg] = useState()

  console.log(formOrg)
  return (
    <div className={styles.wrapper}>
      <div className={styles.input_block}>
        <label htmlFor="">Выберите форму организации, на которую выставлять счёт</label>
        <select name="" id="" className={styles.input} onChange={(e) => setFormOrg(e.target.value)}>
          <option value="OOO">ООО</option>
          <option value="IP">ИП</option>
        </select>
      </div>

      <div className={styles.input_block}>
        <label htmlFor="">Введите название организации</label>
        <input type="text" placeholder='Название организации' className={styles.input}
               onChange={e => setNameOrg(e.target.value)}
        />
      </div>

      <button className={styles.submit} onClick={() => HomeService.takeOrder(data, formOrg, nameOrg)}>Отправить заказ
      </button>
    </div>
  );
};

export default OrderPage;