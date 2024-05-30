import React, {useEffect, useState} from 'react';
import styles from './preview.module.css'
import {Table} from "antd";
import HomeService from "../../services/HomeService";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {redirect} from "react-router-dom";


const PreviewPage = ({generalPrice}) => {
  const userTypeId = 1

  const navigate = useNavigate()
  const location = useLocation();
  const generalCount = location.state;

  const [data, setData] = useState([])

  useEffect(() => {
    HomeService.getBasket().then(data => setData(data))
  }, [])

  let priceForOne = userTypeId === 1 ?
    {
      title: 'цена за шт',
      dataIndex: ['product', 'price_opt'],
      key: 'price',
    } : {
      title: 'цена за шт',
      dataIndex: ['product', 'price_roz'],
      key: 'price'
    }

  const columns = [
    {
      title: 'Аромат',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
    },
    priceForOne,
    {
      title: 'Сумма',
      dataIndex: 'price',
      key: 'price',
    }
  ]
  const takeOrder = () => {
    let check = []
    for (let key in data) {
      if (data[key].count === 0) {
        check.push(data[key])
      }
    }
    if (check.length > 0) {
      alert('Вы не можете заказать товары, количество которых равно 0')
    } else {
      navigate('/order', {state: {data, generalCount}})
      /* HomeService.takeOrder(data).then(data => {
        console.log('все')
      })*/
    }
  }
  return (
    <div>
      <h1 className={styles.title}>Предпросмотр</h1>
      <h2 className={styles.subtitle}>Проверьте корректность Вашего заказа</h2>
      <p className={styles.general_count}>Сумма заказа: {generalPrice} рублей</p>
      <Table columns={columns} dataSource={data} scroll={{
        x: 400,
      }}/>
      <div className="flex">
        <NavLink to='/basket'>
          <button className={styles.button}>Назад</button>
        </NavLink>
        <button className={styles.button} onClick={takeOrder}>Оформить</button>
      </div>
    </div>
  );
};

export default PreviewPage;