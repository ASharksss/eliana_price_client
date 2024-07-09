import React, {useEffect, useMemo, useState} from 'react';
import styles from './card.module.css'
import HomeService from "../../services/HomeService";
import {useAuth} from "../../context/AuthProvider";
import {useNavigate} from "react-router-dom";

const Card = ({product, basket}) => {
  const {user} = useAuth();
  const navigate = useNavigate()
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

  const loginButton = () => navigate('/login')

  const loadingImage = useMemo((image) => <img src={`https://backend.eliana.pro/static/upload/${product.image}.png`} alt="" className={styles.img} />)

  useEffect(() => {
    iterating()
  }, [basket])
  return (
    <div className={styles.card}>
      <p className={styles.name}>{product.name}</p>
      <div className={styles.imageContainer}>
        {/*<img src={`http://localhost:5000/static/upload/${product.image}.png`} alt={product.name} className={styles.img} loading={'lazy'}/>*/}
        {loadingImage}
      </div>
      {product?.price_opt ? <>
        <span className={styles.price}>{user?.typeUserId === 1 ? product.price_opt : product.price_roz} р.</span>
        {
          added ?
            <button className={styles.button_added} onClick={addInBasket}>{added ? 'Добавлено' : 'В коризну'}</button> :
            <button className={styles.button} onClick={addInBasket}>{added ? 'Добавлено' : 'В коризну'}</button>
        }
      </> : <button className={styles.button} onClick={loginButton}>Войти</button>}
    </div>
  );
};

export default Card;