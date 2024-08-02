import React from 'react';
import styles from './header.module.css'
import basket from '../../assets/basket.png'
import profile from '../../assets/profile.png'
import plus from '../../assets/plus.png'
import price from '../../assets/price.png'
import logout from '../../assets/logout.png'
import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";


const Header = () => {
  const {user, logOut} = useAuth();
  const logoutButton = async () => await logOut();
  return (
    <div className={styles.header}>
      <NavLink to={'/'} className='noLink'>
        <span className={styles.logo_name}> Eliana</span>
      </NavLink>
      {user ?
        <div>
          <a className={styles.link} onClick={logoutButton}>
            <img className={styles.log} src={logout} alt=""/>
          </a>
          {user?.typeUserId === 3 ?
            <>
              <NavLink to={'/changePrice'} className={styles.link}>
                <img className={styles.basket} src={price} alt=""/>
              </NavLink>
              <NavLink to={'/create/user'} className={styles.link}>
                <img className={styles.basket} src={plus} alt=""/>
              </NavLink>
            </>

            : null}
          <NavLink to={'/profile'} className={styles.link}>
            <img className={styles.basket} src={profile} alt=""/>
          </NavLink>
          <NavLink to={'/basket'}>
            <img className={styles.basket} src={basket} alt=""/>
          </NavLink>
        </div>
        : null
      }
    </div>
  );
};

export default Header;