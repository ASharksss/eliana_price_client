import React from 'react';
import {Table} from "antd";

const BasketPage = () => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'suname',
      dataIndex: 'suname',
      key: 'suname',
      render: (text) => <p>{text}</p>
    }
  ]

  const data = [
    {
      key: 1,
      name: 'Алсу',
      suname: 'Курбаналиева'
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={data}/>
    </div>
  );
};

export default BasketPage;