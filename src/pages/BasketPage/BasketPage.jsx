import React from 'react';
import styles from './basket_page.module.css'
import {FloatButton} from 'antd';
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkbox from "../../ui/Checkbox";
import PreOrder from "../../components/PreOrder/PreOrder";

const BasketPage = () => {


  return (
    <div>
      <PreOrder/>
      <div className={styles.block}>
        <h1>Введите данные о количестве</h1>
        <Checkbox/>
        <BasketCard/>
        <BasketCard/>
        <BasketCard/>
        <BasketCard/>
        <BasketCard/>
        <BasketCard/>
        <BasketCard/>
        <BasketCard/>
        <BasketCard/>
        <FloatButton.BackTop/>
      </div>
    </div>
  );
};

export default BasketPage;