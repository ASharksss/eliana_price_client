import React from 'react';
import styles from './pre_order.module.css'

const PreOrder = () => {
  return (

    <div className={styles.block}>
      <div>
        <p>Общее число коробок:</p>
        <p>Общий вес:</p>
        <p>Общий объем:</p>
        <p>Общая сумма заказа:</p>
      </div>

      <button className={styles.button}>Оформить заказ</button>
    </div>
  );
};

export default PreOrder;