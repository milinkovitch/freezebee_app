import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import Logo from '../../assets/images/Logo.png';

const { Header: ANTDHeader } = Layout;

function Header() {
  const history = useHistory();

  return (
    <ANTDHeader>
      <div className="header">
        <div className="header__logo">
          <img src={Logo} alt="Logo" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
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
      </div>
    </ANTDHeader>
  );
}

export default Header;
