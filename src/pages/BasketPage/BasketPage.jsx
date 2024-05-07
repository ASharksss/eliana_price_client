import React, {useEffect, useState} from 'react';
import styles from './basket_page.module.css'
import {FloatButton} from 'antd';
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkbox from "../../ui/Checkbox";
import PreOrder from "../../components/PreOrder/PreOrder";
import HomeService from "../../services/HomeService";

const BasketPage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    HomeService.getBasket().then(data => setItems(data))
  }, [])



  console.log(items)
  return (
    <div className={styles.wrapper}>
      <PreOrder/>
      <div className={styles.block}>
        <h1>Введите данные о количестве</h1>
        <Checkbox/>
        {
          items.map(item => (
            <BasketCard item={item}/>
          ))
        }
        <FloatButton.BackTop/>
      </div>

    </div>
  );
};

export default BasketPage;