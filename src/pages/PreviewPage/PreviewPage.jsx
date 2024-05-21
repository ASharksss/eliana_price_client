import React, {useEffect, useState} from 'react';
import styles from './preview.module.css'
import {Table} from "antd";
import HomeService from "../../services/HomeService";
import {NavLink} from "react-router-dom";


const PreviewPage = () => {
  const userTypeId = 1
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState(false)

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
    const checkZeroCount = data.map(item => parseInt(item.count) === 0)
    if (checkZeroCount.length === 0) return alert("Нельзя заказать")
      HomeService.takeOrder(data).then(data => {
        console.log('все')
      })


  }
  return (
    <div>
      <h1 className={styles.title}>Предпросмотр</h1>
      <h2 className={styles.subtitle}>Проверьте корректность Вашего заказа</h2>
      <Table columns={columns} dataSource={data} scroll={{x: 400,
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