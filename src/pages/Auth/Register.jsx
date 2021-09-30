import { Button, Form, Input, Row, Col, Space, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../redux/user/actions';
import request from '../../services/request';

const styles = {
  divider: { margin: '16px 0' },
};

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({ isFetching: false, err: null });

  const create = async (values) => {
    setState({ isFetching: true, err: null });
    return request('/register', 'POST', values)
      .then(() => dispatch(signIn({ email: values.email, password: values.password }, history)))
      .catch((err) => setState({ isFetching: false, err }));
  };

  return (
    <Row
      style={{ minHeight: 'calc(100vh - 64px)', marginBottom: 20 }}
      justify="center"
      align="stretch"
    >
      <Col
        sm={24}
        md={12}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Title style={{ textAlign: 'center' }}>S&apos;inscrire</Title>
        <Form style={styles.form} layout="vertical" name="register" onFinish={create}>
          <Form.Item
            name="firstname"
            label="Prénom"
            rules={[{ required: true, message: 'Le prénom est obligatoire.' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Nom"
            rules={[{ required: true, message: 'Le nom est obligatoire.' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email' }, { required: true, message: "L'email est obligatoire." }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mot de passe"
            rules={[
              {
                required: true,
                message: 'Le mot de passe est obligatoire.',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label="Confirmation du mot de passe"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Le confirmation du mot de passe est obligatoire.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Les mots de passe ne correspondent pas.'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={state.isFetching} block>
            S&apos;inscrire
          </Button>

          <Divider style={styles.divider}>Déjà inscrit ?</Divider>

          <Button type="primary" block onClick={() => history.push('/login')}>
            Se connecter
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
