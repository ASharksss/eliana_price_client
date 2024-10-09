import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeService from "../../services/HomeService";
import {IMAGE_URL} from "../../utils";
import styles from './cardpage.module.css'

const CardPage = () => {
  const {vendor_code} = useParams()
  const [product, setProduct] = useState()
  const [photoIndex, setPhotoIndex] = useState(0);


  useEffect(() => {
    HomeService.getProduct(vendor_code).then(data => {
      setProduct(data)
    })
  }, [])

  const handleClick = (index) => {
    setPhotoIndex(index)
  }

  return (
    <div className={styles.flex}>
      <div className={styles.flex}>
        <div>
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
        />
      </div>
      <div className={styles.flex}>
        <div>
          <h1>{product?.name}</h1>
          <p>{product?.description}</p>
        </div>

       {/* <div className={styles.preview}>
          <h2>{product.price_opt}р</h2>
          <h2>{product.price_roz}р</h2>
          <button>В корзину</button>
        </div>*/}

      </div>
    </div>
  );
};

export default CardPage;