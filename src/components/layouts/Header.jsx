import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu, Layout, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';

import Logo from '../../assets/images/Logo.png';
import { signOut } from '../../redux/user/actions';
import Flex from '../Flex';

const { Header: ANTDHeader } = Layout;

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [user] = useSelector((state) => state.user);
  return (
    <ANTDHeader className="header">
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item className="header__logo__wrapper" onClick={() => history.push('/')}>
          <img className="header__logo" src={Logo} alt="Logo" />
        </Menu.Item>
        <Menu.Item key="/models" onClick={() => history.push('/models')}>
          Modèles
        </Menu.Item>
        <Menu.Item key="/ingredients" onClick={() => history.push('/ingredients')}>
          Ingrédients
        </Menu.Item>
        <Menu.Item key="/processes" onClick={() => history.push('/processes')}>
          Procédés
        </Menu.Item>
      </Menu>

      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        {user ? (
          <>
            <Menu.Item>
              <Flex>
                <Avatar>{`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}</Avatar>
                <div style={{ marginLeft: 10 }}>{`${user.firstname} ${user.lastname}`}</div>
              </Flex>
            </Menu.Item>
            <Menu.Item icon={<CloseCircleOutlined />} onClick={() => dispatch(signOut())} />
          </>
        ) : (
          <Menu.Item key="/login" onClick={() => history.push('/login')}>
            Se connecter
          </Menu.Item>
        )}
      </Menu>
    </ANTDHeader>
  );
}

export default Header;
