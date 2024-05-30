import React, {useEffect, useState} from 'react';
import styles from './card.module.css'
import HomeService from "../../services/HomeService";
import {useAuth} from "../../context/AuthProvider";

const Card = ({product, items, setItems, basket}) => {
  const {user} = useAuth();
  const [added, setAdded] = useState(false)

  const iterating = () => {
    const check = basket.filter(item => item.product.vendor_code === product.vendor_code)
    if (check.length > 0) {
      setAdded(true)
    } else {
      setAdded(false)
    }
  }
  const addInBasket = () => {
    HomeService.addInBasket(product.vendor_code, 0).then(data => setAdded(true))
  }


  useEffect(() => {
    iterating()
  }, [basket])

  return (
    <div className={styles.card}>
      <p className={styles.name}>{product.name}</p>
      <span className={styles.price}>{user?.typeUserId === 1 ? product.price_opt : product.price_roz} р.</span>
      {
        added ?  <button className={styles.button_added} onClick={addInBasket}>{added ? 'Добавлено' : 'В коризну'}</button> :
          <button className={styles.button} onClick={addInBasket}>{added ? 'Добавлено' : 'В коризну'}</button>
      }

    </div>
  );
};

export default Card;