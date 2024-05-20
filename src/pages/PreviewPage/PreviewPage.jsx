import React, {useEffect, useState} from 'react';
import styles from './preview.module.css'
import {Table} from "antd";
import HomeService from "../../services/HomeService";
import {NavLink} from "react-router-dom";


const PreviewPage = () => {
  const userTypeId = 1
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
      title: 'Артикул',
      dataIndex: 'productVendorCode',
      key: 'vendor_code',
    },
    {
      title: 'Штрихкод',
      dataIndex: ['product', 'barcode'],
      key: 'barcode',
    },
    priceForOne,
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
    {
      title: 'Сумма',
      dataIndex: 'price',
      key: 'price',
    }
  ]
  const takeOrder = () => {
    HomeService.takeOrder(data).then(data => {
      console.log('все')
    })
  }
  return (
    <div>
      <h1 className={styles.title}>Предпросмотр</h1>
      <h2 className={styles.subtitle}>Проверьте корректность Вашего заказа</h2>
      <Table columns={columns} dataSource={data} scroll={{
        x: 1400,
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