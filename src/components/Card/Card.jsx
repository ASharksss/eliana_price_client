import React from 'react';
import styles from './card.module.css'
import HomeService from "../../services/HomeService";

const Card = ({product, items, setItems}) => {
  const addInBasket = () => {
    HomeService.addInBasket(product.vendor_code, 0).then(data => console.log(data))
  }


  return (
    <div className={styles.card}>
      <p className={styles.name}>{product.name}</p>
      <span className={styles.price}>{product.price_opt}</span>
      <button className={styles.button} onClick={addInBasket}>В коризну</button>
    </div>
  );
};

export default Card;