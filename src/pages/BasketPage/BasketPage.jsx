import React, {useEffect, useState} from 'react';
import styles from './basket_page.module.css'
import {FloatButton} from 'antd';
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkbox from "../../ui/Checkbox";
import PreOrder from "../../components/PreOrder/PreOrder";
import HomeService from "../../services/HomeService";

const BasketPage = () => {
  const [items, setItems] = useState([])
  const [checked, setChecked] = useState({
    wicks: false, sprays: false, diffusers: false, bags: false
  })
  const [types, setTypes] = useState({
    wicks: [], sprays: [], diffusers: [], bags: []
  })
 /* const [generalCount, setGeneralCount] = useState({
    wicks: 0, sprays: 0, diffusers: 0, bags: 0
  })*/
  const [generalCount, setGeneralCount] = useState(0)
  const [generalVolume, setGeneralVolume] = useState(0)
  const [generalWeight, setGeneralWeight] = useState(0)
  const [generalPrice, setGeneralPrice] = useState(0)

  let typeUserId = 1

  const iterating = () => {
    const wicksArray = []
    const spraysArray = []
    const diffusersArray = []
    const bagsArray = []
    let allCount = 0, allVolume = 0, allWeight = 0, allPrice = 0
    items?.map(item => {
      if (item.product?.categoryId === 1) {
        wicksArray.push(item)
        allCount = allCount + Math.ceil(item.count / item.product.count_in_box)
        allVolume = allVolume + Math.ceil(item.count / item.product.count_in_box) * item.product.volume_in_box
        allWeight = allWeight + Math.ceil(item.count / item.product.count_in_box) * item.product.weight_in_box
        let price = typeUserId === 1 ? item.product.price_opt * item.count : item.product.price_roz * item.count
        allPrice = allPrice + price
      }
      if (item.product?.categoryId === 2) {
        spraysArray.push(item)
        allCount = allCount + Math.ceil(item.count / item.product.count_in_box)
        allVolume = allVolume + Math.ceil(item.count / item.product.count_in_box) * item.product.volume_in_box
        allWeight = allWeight + Math.ceil(item.count / item.product.count_in_box) * item.product.weight_in_box
        let price = typeUserId === 1 ? item.product.price_opt * item.count : item.product.price_roz * item.count
        allPrice = allPrice + price
      }
      if (item.product?.categoryId === 3) {
        diffusersArray.push(item)
        allCount = allCount + Math.ceil(item.count / item.product.count_in_box)
        allVolume = allVolume + Math.ceil(item.count / item.product.count_in_box) * item.product.volume_in_box
        allWeight = allWeight + Math.ceil(item.count / item.product.count_in_box) * item.product.weight_in_box
        let price = typeUserId === 1 ? item.product.price_opt * item.count : item.product.price_roz * item.count
        allPrice = allPrice + price
      }
      if (item.product?.categoryId === 4) {
        bagsArray.push(item)
        allCount = allCount + Math.ceil(item.count / item.product.count_in_box)
        allVolume = allVolume + Math.ceil(item.count / item.product.count_in_box) * item.product.volume_in_box
        allWeight = allWeight + Math.ceil(item.count / item.product.count_in_box) * item.product.weight_in_box
        let price = typeUserId === 1 ? item.product.price_opt * item.count : item.product.price_roz * item.count
        allPrice = allPrice + price
      }
    })
    setTypes({
      wicks: wicksArray, sprays: spraysArray, diffusers: diffusersArray, bags: bagsArray
    })
    setGeneralCount(allCount)
    setGeneralVolume(allVolume)
    setGeneralPrice(allPrice)
    setGeneralWeight(allWeight)
  }


  useEffect(() => {
    HomeService.getBasket().then(data => setItems(data))
  }, [])

  useEffect(() => {
    if (typeUserId === 1) {
      setChecked(prevState => ({...prevState, wicks: true}))
    }
  }, [typeUserId])

  useEffect(() => {
    if (items.length === 0) return;
    iterating()
  }, [items])

  return (
    <div className={styles.wrapper}>
      <PreOrder generalCount={generalCount} generalVolume={generalVolume} generalWeight={generalWeight} generalPrice={generalPrice}/>
      <div className={styles.block}>
        <h1>Введите данные о количестве</h1>

        {types.wicks.length > 0 ?
          <div className='category_block'>
            <div className="flex_usually">
              <h1>Фитиля</h1>
              <Checkbox type={'wicks'} typeUserId={typeUserId} checked={checked.wicks} setChecked={setChecked}/>
            </div>
            {
              types.wicks?.map(wick => (
                <BasketCard item={wick} checked={checked.wicks} typeUserId={typeUserId}
                            setGeneralCount={setGeneralCount} generalCount={generalCount}
                            setGeneralVolume={setGeneralVolume} setGeneralWeight={setGeneralWeight}
                            setGeneralPrice={setGeneralPrice}/>
              ))
            }
          </div> : null}

        {types.sprays.length > 0 ?
          <div className='category_block'>
            <div className="flex_usually"><h1>Спреи</h1><Checkbox type={'sprays'} checked={checked.sprays}
                                                                  setChecked={setChecked}/>
            </div>
            {
              types.sprays?.map(spray => (
                <BasketCard item={spray} checked={checked.sprays} typeUserId={typeUserId}
                            setGeneralCount={setGeneralCount} setGeneralPrice={setGeneralPrice}
                            setGeneralVolume={setGeneralVolume} setGeneralWeight={setGeneralWeight}/>
              ))
            }
          </div> : null
        }

        {types.diffusers.length > 0 ?
          <div className='category_block'>
            <div className="flex_usually"><h1>Диффузоры</h1><Checkbox type={'diffusers'} checked={checked.diffusers}
                                                                      setChecked={setChecked}/></div>
            {
              types.diffusers?.map(diffuser => (
                <BasketCard item={diffuser} checked={checked.diffusers} typeUserId={typeUserId}
                            setGeneralCount={setGeneralCount} setGeneralPrice={setGeneralPrice}
                            setGeneralVolume={setGeneralVolume} setGeneralWeight={setGeneralWeight}/>
              ))
            }
          </div> : null
        }

        {types.bags.length > 0 ?
          <div className='category_block'>
            <div className="flex_usually"><h1>Саше</h1><Checkbox type={'bags'} checked={checked.bags}
                                                                 setChecked={setChecked}/></div>

            {
              types.bags?.map(bag => (
                <BasketCard item={bag} checked={checked.bags} typeUserId={typeUserId}
                            setGeneralCount={setGeneralCount} setGeneralPrice={setGeneralPrice}
                            setGeneralVolume={setGeneralVolume} setGeneralWeight={setGeneralWeight}/>
              ))
            }
          </div> : null
        }

        <FloatButton.BackTop/>
      </div>

    </div>
  );
};

export default BasketPage;