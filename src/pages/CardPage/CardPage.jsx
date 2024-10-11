import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useParams} from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeService from "../../services/HomeService";
import {IMAGE_URL} from "../../utils";
import styles from './cardpage.module.css'
import {useAuth} from "../../context/AuthProvider";
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const CardPage = () => {
  const {vendor_code} = useParams()
  const [product, setProduct] = useState()
  const [photoIndex, setPhotoIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState();
  const [basket, setBasket] = useState()
  const [added, setAdded] = useState(false)
  const {user} = useAuth();

  useEffect(() => {
    HomeService.getProduct(vendor_code).then(data => {
      setProduct(data)
    })
    HomeService.getSimilarProduct(vendor_code).then((data) => {
      setSimilarProducts(data)
    })
    HomeService.getBasket().then(data => setBasket(data))
  }, [vendor_code])


  const iterating = () => {
   const check = basket?.filter(item => item.product.vendor_code === vendor_code)
    if (check?.length > 0) {
      setAdded(true)
    } else {
      setAdded(false)
    }
  }

  const handleClick = (index) => {
    setPhotoIndex(index)
  }

  const addInBasket = () => {
    HomeService.addInBasket(product.vendor_code, 0).then(data => setAdded(true))
  }

  useEffect(() => {
    iterating()
  }, [basket])

  React.useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => {
      Fancybox.destroy(); // очищаем после размонтирования компонента
    };
  }, []);

  console.log(added)
  return (
    <>
      <h1 className={styles.title}>{product?.name}</h1>
      <div className={styles.container}>
        <div className={styles.image_block}>
          <div className={styles.small_blocks}>
            {
              product?.product_photos.map((photo, index) => (
                <img
                  key={index}
                  src={`${IMAGE_URL}${photo.photo}`}
                  alt=""
                  className={styles.small_img}
                  onClick={() => handleClick(index)}
                />
              ))
            }
          </div>
          <img
            src={`${IMAGE_URL}${product?.product_photos[photoIndex]?.photo}`}
            alt=""
            className={styles.big_img}
            data-fancybox="gallery"
          />
          {/* Скрытые ссылки */}
          {product?.product_photos.map((photo, index) => (
            index !== photoIndex && (
              <a
                key={index}
                href={`${IMAGE_URL}${photo.photo}`}
                data-fancybox="gallery"
                style={{display: 'none'}} // скрытые ссылки, чтобы они не отображались на странице
              />
            )
          ))}
        </div>
        <div className={styles.description}>
          <div className={styles.preview}>
            {
              user.typeUserId === 1 ? <h2 className={styles.price}>{product?.price_opt} р</h2> :
                <h2 className={styles.price}>{product?.price_roz} р</h2>
            }
            <button
              className={added ? styles.in_basket_added : styles.in_basket}
              onClick={addInBasket}
            >
              {'В корзину'}
            </button>

          </div>
          <p className={styles.text}>{product?.description}</p>
        </div>
      </div>
      <div className={styles.similar_container}>
        <h1>Похожие товары</h1>
        <div className={styles.similar_products}>
          {
            similarProducts?.map((item, index) => (
              <div className={styles.similar_item}>
                <NavLink to={`/${item.vendor_code}`}>
                  <img
                    src={`${IMAGE_URL}static/upload/${item.image}.png`}
                    alt=""
                    className={styles.similar_item_img}
                  />
                </NavLink>

              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default CardPage;