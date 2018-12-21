import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div>
      <footer className="footer__wrapper">
        <div className="footer__footer">
          <div className="footer__footer-item">
            <span>О нас</span>
            <Link to="/founderror">Реквизиты</Link>
            <Link to="/founderror">О компании</Link>
          </div>
          <div className="footer__footer-item">
            <span>Помощь</span>
            <Link to="/founderror">Как сделать заказ</Link>
            <Link to="/founderror">Доставка</Link>
            <Link to="/founderror">Оплата</Link>
          </div>
          <div className="footer__footer-item">
            <span>+9 999 999-99-99 - круглосуточно</span>
            <Link to="/founderror">&copy;2018 by "Telecom"</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
