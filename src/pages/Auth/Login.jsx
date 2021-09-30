import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Space, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { signIn } from '../../redux/user/actions';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentState, setState] = useState({ isFetching: false, err: null });
  const [user] = useSelector((state) => state.user);

  if (user) return <Redirect to="/models" />;

  return (
    <Row style={{ minHeight: 'calc(100vh - 64px)' }} justify="center" align="stretch">
      <Col
        sm={24}
        md={12}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Title style={{ textAlign: 'center' }}>Se connecter</Title>
        <Form
          layout="vertical"
          name="login"
          onFinish={(values) => {
            setState({ isFetching: true, err: null });
            dispatch(signIn(values, history)).catch((err) => setState({ isFetching: false, err }));
          }}
        >
          <Form.Item
            name="email"
            rules={[{ type: 'email' }, { required: true, message: "L'email est obligatoire." }]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Le mot de passe est obligatoire.' }]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={currentState.isFetching} block>
            Se connecter
          </Button>
        </Form>
        <Divider style={{ margin: '16px 0' }}>Pas encore inscrit ?</Divider>

        <Button type="primary" block onClick={() => history.push('/register')}>
          S&apos;inscrire
        </Button>
      </Col>
    </Row>
  );
}

export default Login;
