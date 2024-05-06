import React from 'react';
import styles from './header.module.css'
import basket from '../../assets/basket.png'
import {NavLink} from "react-router-dom";


const Header = () => {

  return (
    <div className={styles.header}>
      <NavLink to={'/'} className='noLink'>

        <span className={styles.logo_name}> Eliana</span>
      </NavLink>
      <NavLink to={'/basket'}>
        <img className={styles.basket} src={basket} alt=""/>
      </NavLink>
    </div>
  );
};

export default Header;