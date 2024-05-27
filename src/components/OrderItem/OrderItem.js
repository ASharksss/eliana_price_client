import React from 'react';
import styles from './order_item.module.css'
import {pluralRusVariant} from "../../utils";

const OrderItem = ({count, count_box, sum, createdAt}) => {
  const date = new Date(createdAt)
  const formatDate = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeZone: 'Europe/Moscow',
  }).format(date)
  return (
    <div className={styles.block}>
      <span>{count} шт</span>
      <span>{count_box} {['коробка', 'коробки', 'коробок'][pluralRusVariant(parseInt(count_box))]}</span>
      <span>{sum} рублей</span>
      <span>{formatDate}</span>
    </div>
  );
};

export default OrderItem;