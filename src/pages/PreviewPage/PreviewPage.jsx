import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import HomeService from "../../services/HomeService";

const PreviewPage = () => {
  const userTypeId = 1
  const [data, setData] = useState([])

  useEffect(() => {
    HomeService.getBasket().then(data => setData(data))
  }, [])

  console.log(data)

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
    {
      title: 'цена за шт',
      dataIndex: ['product', 'price_roz'],
      key: 'price',
    },
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
      dataIndex: 'sum',
      key: 'sum',
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={data}/>
    </div>
  );
};

export default PreviewPage;