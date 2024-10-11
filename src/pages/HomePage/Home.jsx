import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import styles from './home.module.css'
import HomeService from "../../services/HomeService";
import {useAuth} from "../../context/AuthProvider";

const Home = ({added, setAdded}) => {
  const {user} = useAuth();
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(1)
  const [basket, setBasket] = useState([])

  useEffect(() => {
    if (user) {
      HomeService.getAllProducts(category).then(data => setProducts(data))
      HomeService.getBasket().then(data => setBasket(data))
    } else {
      HomeService.getAllProductsAnon(category).then(data => setProducts(data))
    }
  }, [category])

  return (
    <div>
      <div className={styles.navigate}>
        <button className={styles.nav_button} onClick={() => setCategory(1)}>Фитиль</button>
        <button className={styles.nav_button} onClick={() => setCategory(2)}>Диффузор</button>
        <button className={styles.nav_button} onClick={() => setCategory(3)}>Спрей</button>
        <button className={styles.nav_button} onClick={() => setCategory(4)}>Саше</button>
      </div>
      <h1 className={styles.title}>{
        category === 1 ? 'Фитиля' :
          category === 2 ? 'Диффузоры' :
            category === 3 ? 'Спреи' :
              category === 4 ? 'Саше' : ''
      }</h1>
      <div className="grid">
        {
          products.map(product => (
            <React.Fragment key={product.vendor_code}>
              <Card setAdded={setAdded} added={added} product={product} basket={basket}/>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  );
};

export default Home;