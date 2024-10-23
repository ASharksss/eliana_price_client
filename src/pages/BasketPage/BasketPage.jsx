import React, {useEffect, useState} from 'react';
import styles from './basket_page.module.css'
import {FloatButton, Modal} from 'antd';
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkbox from "../../ui/Checkbox";
import PreOrder from "../../components/PreOrder/PreOrder";
import HomeService from "../../services/HomeService";
import {useAuth} from "../../context/AuthProvider";
import {useNavigate} from "react-router-dom";

const BasketPage = ({
                      generalCount,
                      generalVolume,
                      generalWeight,
                      generalPrice,
                      setGeneralCount,
                      setGeneralVolume,
                      setGeneralWeight,
                      setGeneralPrice
                    }) => {
  const {isAuth} = useAuth()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [uploadItems, setUploadItems] = useState()
  const [file, setFile] = useState(null)
  const [checked, setChecked] = useState({
    wicks: false, sprays: false, diffusers: false, bags: false
  })
  const [types, setTypes] = useState({
    wicks: [], sprays: [], diffusers: [], bags: []
  })
  /* const [generalCount, setGeneralCount] = useState({
     wicks: 0, sprays: 0, diffusers: 0, bags: 0
   })*/

  const {user} = useAuth();
  let typeUserId = user?.typeUserId

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
    if (isAuth) {
      HomeService.getBasket().then(data => setItems(data))
    } else {
      return navigate('/')
    }
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

  const handleDeleteItem = async (productVendorCode) => {
    await HomeService.deleteInBasket(productVendorCode).then(async () => await HomeService.getBasket().then(data => setItems(data)))
  }

  const handleUploadFile = (e) => {
    Modal.confirm({
      title: 'Подтверждение загрузки',
      content: 'После загрузки, все товары удалятся из корзины',
      onOk: async () => {
        setItems([])
        const formData = new FormData()
        formData.append('file', file)
        await HomeService.checkExcel(formData).then(async (res) =>
          await HomeService.fillOutBasket(res.data).then(async (response) => setUploadItems(response)))
      }
    })
  }

  return (
    <>
      <button onClick={() => setShowModal(!showModal)}>Заказать через Excel</button>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title={"Загрузите эксель файл"}
        footer={[<button onClick={handleUploadFile}>Загрузить</button>,
          <button onClick={async () => {
            setShowModal(false)
            await HomeService.getBasket().then(data => {
              setItems(data)
              setUploadItems(null)
            })
          }}> Закрыть </button>]}
      >
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <div>
          {
            uploadItems?.notAddedItems.map(item => (
              <>
                <span>{item}</span><br/>
              </>

            ))
          }
        </div>

      </Modal>
      {items.length === 0 ?
        <p>Корзина пустая</p> :
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h1>Введите данные о количестве</h1>

            {types.wicks.length > 0 ? <div className='category_block'>
              <div className="flex_usually">
                <h1>Фитиля</h1>
                <Checkbox type={'wicks'} typeUserId={typeUserId} checked={checked.wicks} setChecked={setChecked}/>
              </div>
              {types.wicks?.map(wick => (<BasketCard item={wick} checked={checked.wicks} typeUserId={typeUserId}
                                                     setGeneralCount={setGeneralCount} generalCount={generalCount}
                                                     setGeneralVolume={setGeneralVolume}
                                                     setGeneralWeight={setGeneralWeight}
                                                     setGeneralPrice={setGeneralPrice}
                                                     handleDeleteItem={handleDeleteItem}/>))}
            </div> : null}

            {types.sprays.length > 0 ? <div className='category_block'>
              <div className="flex_usually"><h1>Диффузоры</h1>
                <Checkbox type={'sprays'} checked={checked.sprays} setChecked={setChecked}/>
              </div>
              {types.sprays?.map(spray => (<BasketCard item={spray} checked={checked.sprays} typeUserId={typeUserId}
                                                       setGeneralCount={setGeneralCount}
                                                       setGeneralPrice={setGeneralPrice}
                                                       setGeneralVolume={setGeneralVolume}
                                                       setGeneralWeight={setGeneralWeight}
                                                       handleDeleteItem={handleDeleteItem}/>))}
            </div> : null}

            {types.diffusers.length > 0 ? <div className='category_block'>
              <div className="flex_usually"><h1>Спреи</h1><Checkbox type={'diffusers'} checked={checked.diffusers}
                                                                    setChecked={setChecked}/></div>
              {types.diffusers?.map(diffuser => (
                <BasketCard item={diffuser} checked={checked.diffusers} typeUserId={typeUserId}
                            setGeneralCount={setGeneralCount} setGeneralPrice={setGeneralPrice}
                            setGeneralVolume={setGeneralVolume} setGeneralWeight={setGeneralWeight}
                            handleDeleteItem={handleDeleteItem}/>))}
            </div> : null}

            {types.bags.length > 0 ? <div className='category_block'>
              <div className="flex_usually"><h1>Саше</h1><Checkbox type={'bags'} checked={checked.bags}
                                                                   setChecked={setChecked}/></div>

              {types.bags?.map(bag => (<BasketCard item={bag} checked={checked.bags} typeUserId={typeUserId}
                                                   setGeneralCount={setGeneralCount} setGeneralPrice={setGeneralPrice}
                                                   setGeneralVolume={setGeneralVolume}
                                                   setGeneralWeight={setGeneralWeight}
                                                   handleDeleteItem={handleDeleteItem}/>))}
            </div> : null}

            <FloatButton.BackTop/>
          </div>
          <aside className={styles.preOrderWrapper}>
            <PreOrder generalCount={generalCount} generalVolume={generalVolume} generalWeight={generalWeight}
                      generalPrice={generalPrice}/>
          </aside>
        </div>
      }
    </>

  );
};

export default BasketPage;