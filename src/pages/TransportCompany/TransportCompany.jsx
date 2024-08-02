import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import HomeService from "../../services/HomeService";
import styles from "./transportCompany.module.css"

const TransportCompany = () => {
  const {isAuth} = useAuth()
  const navigate = useNavigate()
  const location = useLocation();

  const [transportCompanies, setTransportCompanies] = useState([])
  const [fieldNames, setFieldNames] = useState([])
  const [typeUser, setTypeUser] = useState(1)
  const [formData, setFormData] = useState({
    "Получатель": "Физическое лицо",
    "Получение": "До терминала",
    "Транспортная компания": ""
  }); // Состояние для хранения значений полей

  const [currentTrCompanyId, setCurrentTrCompanyId] = useState(1)

  const handleChange = (e, item) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData); // Выводим JSON в консоль
    takeOrder()
    // HomeService.createWaybills(formData, orderId).then(data => console.log('вроде ок'))
  };

  useEffect(() => {
    if (!isAuth || location.state === null) return navigate('/')
    HomeService.getTransportCompanies().then(data => setTransportCompanies(data))
  }, [])

  if (location.state === null) return navigate('/')
  const {data, generalCount, formOrg, nameOrg, paymentType} = location.state;

  const filteredFields = fieldNames.filter(item => {
    if (typeUser === 1) {
      return item.name !== 'ИНН' && item.name !== 'Контактное лицо'; // Исключаем поле "ИНН" для физического лица
    } else if (typeUser === 2) {
      return item.name !== 'ФИО'; // Исключаем поле "ФИО" для юридического лица
    }
    return true;
  });

  const takeOrder = () => {
    let check = []
    for (let key in data) {
      if (data[key].count === 0) {
        check.push(data[key])
      }
    }
    if (check.length > 0) {
      return alert('Вы не можете заказать товары, количество которых равно 0')
    } else {
      HomeService.takeOrder(data, formOrg, nameOrg, generalCount, formData, paymentType).then(data => {
        navigate('/correctOrder')
        // setOrderId(data.id)
      })
    }
  }
  console.log(`data: ${data}`)
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Данные о доставке</h1>
      <div className={styles.input_block}>
        <label className={styles.label} htmlFor="">Тип получателя</label>
        <select className={styles.input} name="Получатель"
                onChange={e => {
                  setTypeUser(parseInt(e.target.value))
                  setFormData(prevState => ({
                    ...prevState,
                    "Получатель": parseInt(e.target.value) === 1 ? "Физическое лицо" : "Юридическое лицо",
                  }));
                }}>
          <option value={1}>Физическое лицо</option>
          <option value={2}>Юридическое лицо</option>
        </select>
      </div>

      <div className={styles.input_block}>
        <label className={styles.label} htmlFor="">Транспортная компания</label>
        <select className={styles.input} onChange={(e) => {
          setCurrentTrCompanyId(e.target.value)
          setFormData(prevState => ({
            ...prevState,
            "Транспортная компания": e.target.item(e.target.value).text,
          }));
          HomeService.getFieldNames(currentTrCompanyId).then(data => setFieldNames(data))
        }}>
          <option value="">Выберите транспортную компанию</option>
          {
            transportCompanies.map(item => (
              <option name={item.name} value={item.id}>{item.name}</option>
            ))
          }
        </select>
      </div>

      {
        filteredFields.map(item => (
          <div className={styles.input_block}>
            <label className={styles.label} htmlFor="">{item.name}</label>
            {
              item.type === 'input' &&
              <input className={styles.input} name={item.name} type="text" required
                     onChange={(e) => handleChange(e, item)}/>
            }
            {
              item.type === 'select' &&
              <select className={styles.input} name={item.name} id="" required onChange={(e) => handleChange(e, item)}>
                {item.field_options.map(option => (
                  <option value={option.name}>{option.name}</option>
                ))}
              </select>
            }
          </div>
        ))
      }

      <button type='submit' className={styles.button}>Отправить</button>
    </form>
  );
};

export default TransportCompany;