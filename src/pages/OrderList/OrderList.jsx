import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from './order_list.module.css'
import HomeService from "../../services/HomeService";
import {Table} from "antd";

const OrderList = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [list, setList] = useState([])
  const [message, setMessage] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    HomeService.getOrderList(id).then(data => setList(data))
  }, [])

  console.log(list)

  const columns = [
    {
      title: 'Аромат',
      dataIndex: ['product', 'name'],
      key: 'name'
    },
    {
      title: 'Количество штук',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price'
    },
  ]


  const copyOrder = () => {
    HomeService.copyOrder(list).then(data => {

      let result
      if (!data) {
        result = window.confirm("В корзине уже что-то есть, очистить корзину?")
      } else {
        HomeService.copyOrder(list).then(() => navigate('/basket'))
      }
      if (result) {
        HomeService.deleteAllInBasket().then(() => {
          HomeService.copyOrder(list).then(() => navigate('/basket'))
        })
      }
    })
  }

  console.log(typeof message)
  return (
    <div>
      <button onClick={copyOrder} className={styles.button}>Создать на основе</button>
      <Table columns={columns} dataSource={list}/>

    </div>
  );
};

export default OrderList;