import React, {useEffect, useState} from 'react';
import avatar from '../../assets/ava.jpg'
import styles from './profile.module.css'
import HomeService from "../../services/HomeService";
import OrderItem from "../../components/OrderItem/OrderItem";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import {Form, Modal} from "antd";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

const ProfilePage = () => {
  const {isAuth} = useAuth()
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isAuth) {
      HomeService.getOrders().then(data => setOrders(data))
      HomeService.getUser().then(data => setUser(data))
    } else {
      return navigate('/')
    }
  }, [])

  return (
    <div>
      <div className={styles.info_block}>
        <img src={avatar} alt="" className={styles.avatar}/>
        <input type="text" className={styles.input} disabled value={user.short_name}/>
        <input type="text" className={styles.input} disabled value={user.email}/>
        <button type={'button'} className={styles.button} onClick={() => setShowModal(true)}>Настройки</button>
      </div>
      <Modal
        open={showModal}
        title={"Настройки"}
        onCancel={handleCancel}
        footer={[
          <button key="back" type={'button'} className={styles.button} onClick={handleCancel}>Закрыть</button>
        ]}
      >
        <ChangePassword form={form} />
      </Modal>
      <div className={styles.order_history}>
        <h1 className={styles.title}> История заказов</h1>
        {
          orders.length === 0 ? 'Пока нет заказов' : null
        }
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