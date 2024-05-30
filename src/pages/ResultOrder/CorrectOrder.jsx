import React from 'react';
import gif from '../../assets/1gif.mp4'
import styles from './resultOrder.module.css'
import {useNavigate} from "react-router-dom";

const CorrectOrder = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.center}>
      <div className={styles.wrapper}>
        <p className={styles.paragraph}>Заказ успешно создан! <br/>Скоро возьмем его в работу.</p>
        <video className={styles.video} width={260} autoPlay={true} loop={true} playsInline={true}
               disablePictureInPicture={true} muted>
          <source src={gif} type="video/webm"/>
        </video>
        <div className='flex'>
          <button className={styles.button} onClick={() => navigate('/')}>На главную</button>
        </div>
      </div>
    </div>

  );
};

export default CorrectOrder;