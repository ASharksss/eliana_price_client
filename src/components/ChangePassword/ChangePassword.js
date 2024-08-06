import React, {useState} from 'react';
import {Button, Form, Input, Card, Alert} from 'antd';
import {axiosWithAuth} from "../../services/interceptors";

const ChangePassword = ({form}) => {
  const [error, setError] = useState('')

  const onFinish = async (values) => {
    const {oldPassword, newPassword, repeatNewPassword} = values;
    if (newPassword !== repeatNewPassword) {
      setError('Пароли не совпадают')
      return false;
    }
    await axiosWithAuth.post('/user/change-password', {oldPassword, newPassword}).then(res => {
      alert(res.data.message)
      form.resetFields();
    }).catch(e => {
      setError(e.response.data.message)
    })
    console.log('Success:', values);
  };

  return (
    <Card
      title={"Смена пароля"}
      bordered={false}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Старый пароль"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: 'Введите старый пароль!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="Новый пароль"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Введите новый пароль!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="Повторите новый пароль"
          name="repeatNewPassword"
          rules={[
            {
              required: true,
              message: 'Повторите новый пароль!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        {error !== '' ?
          <Alert
            message="Ошибка"
            description={error}
            type="error"
            closable
            onClose={() => setError('')}
          />
          :
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Изменить
            </Button>
          </Form.Item>
        }
      </Form>
    </Card>
  );
};

export default ChangePassword;