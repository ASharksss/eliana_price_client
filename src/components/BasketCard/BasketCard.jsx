import React from 'react';
import styles from './basket_card.module.css'

const BasketCard = () => {
  return (
    <div className={styles.card}>
      <div className='flex'>
        <div className='flex'>
          <span className={styles.title}>Аромат: </span><p className={styles.value}>Фитиль Boss</p>
        </div>

        <div className='flex'>
          <span className={styles.title}>Цена за шт: </span><p className={styles.value}>150р</p>
        </div>
      </div>
      <div className=''>

        <div className={styles.bot_block}>
          <span className={styles.title}>Кол-во, шт: </span>
          <button className={styles.count_btn}>-</button>
          <input type='text' className={styles.input}/>
          <button className={styles.count_btn}>+</button>
        </div>
        {/*<div className={styles.bot_block}>
          <span className={styles.title}>Кол-во, коробок: </span>
          <button className={styles.count_btn}>-</button>
          <input type='text' className={styles.input}/>
          <button className={styles.count_btn}>+</button>
        </div>*/}
        <div className={`${styles.bot_block}`}>
          <span className={styles.title}>Общая стоимость: </span><p className={styles.value}>2500р</p>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;