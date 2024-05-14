import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import styles from './home.module.css'
import HomeService from "../../services/HomeService";

const Home = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(1)
  const [items, setItems] = useState([])
  const [basket, setBasket] = useState([])

  useEffect(() => {
    HomeService.getAllProducts(category).then(data => setProducts(data))
    HomeService.getBasket().then(data => setBasket(data))
  }, [category])


  return (
    <div>
      <div className={styles.navigate}>
        <button className={styles.nav_button} onClick={() => setCategory(1)}>Фитиль</button>
        <button className={styles.nav_button} onClick={() => setCategory(2)}>Спрей</button>
        <button className={styles.nav_button} onClick={() => setCategory(3)}>Диффузор</button>
        <button className={styles.nav_button} onClick={() => setCategory(4)}>Саше</button>
      </div>
      <h1 className={styles.title}>{
        category === 1 ? 'Фитиля' :
          category === 2 ? 'Спреи' :
            category === 3 ? 'Диффузоры' :
              category === 4 ? 'Саше' : ''
      }</h1>
      <div className="grid">
        {
          products.map(product => (
            <Card product={product} setItems={setItems} basket={basket}/>
          ))
        }
      </div>
    </div>
  );
};

export default Home;