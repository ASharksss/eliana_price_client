import React from 'react';
import styles from './pre_order.module.css'

const PreOrder = ({generalCount, generalWeight, generalVolume, generalPrice}) => {
  return (

    <div className={styles.block}>
      <div>
        <p>Общее число коробок: {generalCount}</p>
        <p>Общий вес: {generalWeight.toFixed(2)} кг</p>
        <p>Общий объем: {generalVolume.toFixed(3)} м<sup>3</sup></p>
        <p>Общая сумма заказа: {Intl.NumberFormat('ru-RU', {maximumSignificantDigits: 10, style: 'currency', currency: 'RUB'}).format(generalPrice)}</p>
      </div>

      <button className={styles.button}>Оформить заказ</button>
    </div>
  );
};

export default PreOrder;