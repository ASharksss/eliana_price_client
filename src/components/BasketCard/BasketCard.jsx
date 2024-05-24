import React, {useState, useEffect} from 'react';
import {GoTrash} from "react-icons/go";
import styles from './basket_card.module.css'
import HomeService from "../../services/HomeService";

const BasketCard = ({
                      item, checked, typeUserId, setGeneralCount,
                      setGeneralWeight, setGeneralVolume, setGeneralPrice, handleDeleteItem
                    }) => {
  const [count, setCount] = useState(item.count)
  const [boxes, setBoxes] = useState(Math.ceil(item.count / item.product.count_in_box))
  const [volume, setVolume] = useState(Math.ceil(item.count / item.product.count_in_box) * item.product.volume_in_box)
  const [weight, setWeight] = useState(Math.ceil(item.count / item.product.count_in_box) * item.product.weight_in_box)
  const [price, setPrice] = useState(typeUserId === 1 ? item.product.price_opt * item.count : item.product.price_roz * item.count)

  useEffect(() => {
    if (!checked) return;
    if (typeUserId === 1 && item.product?.categoryId === 1) return setCount(item.count)
    setGeneralCount(prev => prev - boxes)
    setGeneralWeight(prev => prev - weight)
    setGeneralVolume(prev => prev - volume)
    setGeneralPrice(prev => prev - price)
    setCount(0)
    setBoxes(0)
    setVolume(0)
    setWeight(0)
    setPrice(0)
  }, [checked])

  const handleChange = async (e, type, vendor_code) => {
    if (!checked) {
      let enterValue = e.target.value !== '' ? parseInt(e.target.value) : 0
      setGeneralCount(prev => prev - boxes)
      setGeneralWeight(prev => prev - weight)
      setGeneralVolume(prev => prev - volume)
      setGeneralPrice(prev => prev - price)
      setCount(enterValue)
      let enterValueBoxes = e.target.value !== '' ? Math.ceil(enterValue / item.product.count_in_box) : 0
      let enterValueVolume = e.target.value !== '' ? Math.ceil(enterValue / item.product.count_in_box) * item.product.volume_in_box : 0
      let enterValueWeight = e.target.value !== '' ? Math.ceil(enterValue / item.product.count_in_box) * item.product.weight_in_box : 0
      let enterValuePrice = e.target.value !== '' ? typeUserId === 1 ? item.product.price_opt * enterValue : item.product.price_roz * enterValue : 0
      setBoxes(enterValueBoxes)
      setVolume(enterValueVolume)
      setWeight(enterValueWeight)
      setPrice(enterValuePrice)
      setGeneralCount(prev => prev + enterValueBoxes)
      setGeneralVolume(prev => prev + enterValueVolume)
      setGeneralWeight(prev => prev + enterValueWeight)
      setGeneralPrice(prev => prev + enterValuePrice)
    }
    if (checked) {
      let localPrice = typeUserId === 1 ? item.product.price_opt * item.product.count_in_box : item.product.price_roz * item.product.count_in_box
      if (type === 'decrement' && count >= item.product.count_in_box) {
        setGeneralPrice(prev => prev - localPrice)
        setGeneralWeight(prev => prev - item.product.weight_in_box)
        setGeneralVolume(prev => prev - item.product.volume_in_box)
        setGeneralCount(prev => prev - 1)
        setPrice(prev => prev - localPrice)
        setCount(prevState => {
          const mainCount = prevState - item.product.count_in_box
          HomeService.updateCount(vendor_code, mainCount)
          return mainCount
        })
      }
      if (type === 'increment') {
        setGeneralPrice(prev => prev + localPrice)
        setGeneralWeight(prev => prev + item.product.weight_in_box)
        setGeneralVolume(prev => prev + item.product.volume_in_box)
        setGeneralCount(prev => prev + 1)
        setPrice(prev => prev + localPrice)
        setCount(prevState => {
          const mainCount = prevState + item.product.count_in_box
          HomeService.updateCount(vendor_code, mainCount)
          return mainCount
        })
      }
    }
  }

  useEffect(() => {
    HomeService.updatePrice(item.product.vendor_code, price).then(data => console.log(data))
  }, [price])

  return (
    <div className={styles.card}>
      <div className='flex'>
        <div className='flex'>
          <span className={styles.title}>Аромат: </span><p className={styles.value}><b>{item.product.name}</b>
        </p>
        </div>

        <div className='flex'>
          <span className={styles.title}>Цена за шт: </span><p className={styles.value}>
          {Intl.NumberFormat('ru-RU', {maximumSignificantDigits: 3, style: 'currency', currency: 'RUB'}).format(
            typeUserId === 1 ? item.product.price_opt : item.product.price_roz
          )}
        </p>
        </div>
      </div>
      <div className=''>
        <div className={styles.bot_block}>
          <span className={styles.title}>Кол-во, шт: </span>
          {
            checked ?
              <button className={styles.count_btn}
                      onClick={(e) => handleChange(e, 'decrement', item.product.vendor_code)}>-</button> : null
          }
          {
            checked ? <input type='text' className={styles.input} value={count}
                             onBlur={() => console.log(item.product.count)}
                             onChange={(e) => handleChange(e)} disabled/> :
              <input type='text' className={styles.input} value={count}
                     onChange={(e) => handleChange(e)}
                     onBlur={() => HomeService.updateCount(item.product.vendor_code, count)}/>
          }

          {
            checked ? <button className={styles.count_btn}
                              onClick={(e) => handleChange(e, 'increment', item.product.vendor_code)}>+</button> : null
          }
        </div>

        <div className={`${styles.bot_block}`}>
          <span className={styles.title}>Общая стоимость: </span>
          <p className={styles.value}>
            {Intl.NumberFormat('ru-RU', {
              maximumSignificantDigits: 10,
              style: 'currency',
              currency: 'RUB'
            }).format(price)}
          </p>
          <GoTrash className={styles.trash} onClick={() => handleDeleteItem(item.product.vendor_code)}/>
        </div>
      </div>

    </div>
  );
};

export default BasketCard;