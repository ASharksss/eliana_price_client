import React from 'react';
import styles from './header.module.css'
import basket from '../../assets/basket.png'
import profile from '../../assets/profile.png'
import plus from '../../assets/plus.png'
import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";


const Header = () => {
  const {user} = useAuth();
  return (
    <div className={styles.header}>
      <NavLink to={'/'} className='noLink'>

        <span className={styles.logo_name}> Eliana</span>
      </NavLink>
      <div>
        {user?.typeUserId === 3 ?
          <NavLink to={'/create/user'} className={styles.link}>
            <img className={styles.basket} src={plus} alt=""/>
          </NavLink>
        : null}
        <NavLink to={'/profile'} className={styles.link}>
          <img className={styles.basket} src={profile} alt=""/>
        </NavLink>
        <NavLink to={'/basket'}>
          <img className={styles.basket} src={basket} alt=""/>
        </NavLink>
      </div>

    </div>
  );
};

export default Header;