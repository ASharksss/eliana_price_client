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
  const [formData, setFormData] = useState({}); // Состояние для хранения значений полей

  const [currentTrCompanyId, setCurrentTrCompanyId] = useState(1)

  const handleChange = (e, item) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Выводим JSON в консоль
    HomeService.createWaybills(formData).then(data => console.log('вроде ок'))
  };

  useEffect(() => {
    if (!isAuth || location.state === null) return navigate('/')
    HomeService.getTransportCompanies().then(data => setTransportCompanies(data))
  }, [])

  if (location.state === null) return navigate('/')
  const {data, generalCount, formOrg, nameOrg} = location.state;
  console.log(data, generalCount, formOrg, nameOrg)

  const filteredFields = fieldNames.filter(item => {
    if (typeUser === 1) {
      return item.name !== 'ИНН' && item.name !== 'Контактное лицо'; // Исключаем поле "ИНН" для физического лица
    } else if (typeUser === 2) {
      return item.name !== 'ФИО'; // Исключаем поле "ФИО" для юридического лица
    }
    return true;
  });

  console.log(fieldNames)
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h1>Данные о доставке</h1>
      <div className={styles.input_block}>
        <label className={styles.label} htmlFor="">Тип получателя</label>
        <select className={styles.input} onChange={e => setTypeUser(parseInt(e.target.value))}>
          <option value={1}>Физическое лицо</option>
          <option value={2}>Юридическое лицо</option>
        </select>
      </div>


      <div className={styles.input_block}>
        <label className={styles.label} htmlFor="">Выберите транспортную компанию</label>
        <select className={styles.input} onChange={(e) => {
          setCurrentTrCompanyId(e.target.value)
          HomeService.getFieldNames(currentTrCompanyId).then(data => setFieldNames(data))
        }}>
          <option value="">Выберите транспортную компанию</option>
          {
            transportCompanies.map(item => (
              <option value={item.id}>{item.name}</option>
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
              <input className={styles.input} name={item.name} type="text" required onChange={(e) => handleChange(e, item)} />
            }
            {
              item.type === 'select' &&
              <select className={styles.input} name={item.name} id="" required onChange={(e) => handleChange(e, item)} >
                {item.field_options.map(option => (
                  <option value={option.name}>{option.name}</option>
                ))}
              </select>
            }
          </div>
        ))
      }

      <button type='submit'>Отправить</button>
    </form>
  );
};

export default TransportCompany;