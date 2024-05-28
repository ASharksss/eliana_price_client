import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import avatar from '../../assets/ava.jpg'
import styles from './profile.module.css'
import HomeService from "../../services/HomeService";
import OrderItem from "../../components/OrderItem/OrderItem";
import {NavLink} from "react-router-dom";

const ProfilePage = () => {
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    HomeService.getOrders().then(data => setOrders(data))
    HomeService.getUser().then(data => setUser(data))

  }, [])

  console.log(user)
  return (
    <div>
      <div className={styles.info_block}>
        <img src={avatar} alt="" className={styles.avatar}/>
        <input type="text" className={styles.input} disabled value={user.short_name}/>
        <input type="text" className={styles.input} disabled value={user.email}/>
      </div>
      <div className={styles.order_history}>
        <h1 className={styles.title}> История заказов</h1>
        {
          orders.map(item => (
            <NavLink to={`/orderList/${item.id}`} className={styles.link}>
              <OrderItem count={item.count} count_box={item.count_box} createdAt={item.createdAt} sum={item.sum}/>
            </NavLink>

          ))
        }
      </div>
    </div>
  );
};

export default ProfilePage;