import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Home from "./HomePage/Home";
import HomeService from "../services/HomeService";
import {Table} from "antd";

const OrderList = () => {
  const {id} = useParams()

  const [list, setList] = useState([])

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

  return (
    <div>
      <button>Создать на основе</button>
      <Table columns={columns} dataSource={list}/>
    </div>
  );
};

export default OrderList;