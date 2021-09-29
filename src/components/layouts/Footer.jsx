import { Menu } from 'antd';
import { Footer as ANTDFooter } from 'antd/lib/layout/layout';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();

  return (
    <ANTDFooter style={{ textAlign: 'center' }} className="footer">
      Freezebee ©2021 Crée par <Link to="https://www.instagram.com/milinkek/">MILINKEK</Link> avec
      ❤️
    </ANTDFooter>
  );
}

export default Footer;
