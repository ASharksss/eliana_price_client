import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
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
  const {user} = useAuth();

  useEffect(() => {
    HomeService.getProduct(vendor_code).then(data => {
      setProduct(data)
    })
  }, [])

  const handleClick = (index) => {
    setPhotoIndex(index)
  }

  React.useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => {
      Fancybox.destroy(); // очищаем после размонтирования компонента
    };
  }, []);

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
            <button className={styles.in_basket}>В корзину</button>
          </div>
          <p className={styles.text}>{product?.description}</p>
        </div>
      </div>
    </>
  );
};

export default CardPage;