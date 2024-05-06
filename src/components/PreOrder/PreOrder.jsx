import React from 'react';
import styles from './pre_order.module.css'

const PreOrder = () => {
  return (
    <div className={styles.block}>
      <p>Общее число коробок:</p>
      <p>Общий вес:</p>
      <p>Общий объем:</p>
      <p>Общая сумма заказа:</p>
    </div>
  );
};

export default PreOrder;