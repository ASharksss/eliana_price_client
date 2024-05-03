import React from 'react';
import styles from './card.module.css'

const Card = ({product}) => {
  return (
    <div className={styles.card}>
      <p className={styles.name}>{product.name}</p>
      <span className={styles.price}>{product.price_opt}</span>
      <button className={styles.button}>В корзину</button>
    </div>
  );
};

export default Card;