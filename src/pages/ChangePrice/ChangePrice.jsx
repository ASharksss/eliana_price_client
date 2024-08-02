import React, {useEffect, useMemo, useState} from 'react';
import {useAuth} from "../../context/AuthProvider";
import HomeService from "../../services/HomeService";
import {useNavigate} from "react-router-dom";
import styles from './style.module.css'

const ChangePrice = () => {
  const {user, isAuth} = useAuth();
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  const handlePriceChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', products);
    HomeService.updatePrices(products).then(() => navigate('/'))
  };

  useEffect(() => {
    if (user?.typeUserId !== 3 || !isAuth) return navigate('/')
    HomeService.getPrices().then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div className={styles.container}>
      {
        products.map((item, index) => (
          <div className={styles.block}>
            <img src={`https://backend.eliana.pro/static/upload/${item.image}.png`} alt="" className={styles.img} />
            <span className={styles.vendorCode}>{item.vendor_code}</span>
            <span className={styles.name}>{item.name}</span>
            <div className={styles.input_block}>
              <label htmlFor="">Розница</label>
              <input
                className={styles.input}
                type="text"
                value={item.price_roz}
                onChange={(e) => {
                  handlePriceChange(index, 'price_roz', e.target.value)
                }}
              />
            </div>
            <div className={styles.input_block}>
              <label htmlFor="">Опт</label>
              <input
                className={styles.input}
                type="text"
                value={item.price_opt}
                onChange={(e) => {
                  handlePriceChange(index, 'price_opt', e.target.value)
                }}
              />
            </div>
          </div>
        ))
      }
      <button onClick={handleSave} className={styles.button}>Сохранить</button>
    </div>
  );
};

export default ChangePrice;