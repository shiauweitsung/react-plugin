// import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
// use more path with id
import { getInvoices } from '../../data';
import { useSelector } from 'react-redux';
import { getHederShow } from '../../store/status';
import { ReactComponent as Pumpkin } from '../../assets/images/pumpkin.svg';

const headerData = [
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'About',
    to: '/about'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Home',
    to: '/home'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Onboard',
    to: '/onboard'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Dick',
    to: '/dick'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Style Com',
    to: '/style_component'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Scan QR',
    to: '/scan-qrcode'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Redux',
    to: '/redux'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Typescript',
    to: '/typescript'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'Translate',
    to: '/translate'
  },
  {
    icon: <Pumpkin className="sidebar-list-icon" />,
    name: 'formik',
    to: '/formik'
  }
];

export default function Header(props) {
  const invoices = getInvoices();
  const headerActive = {
    color: 'white'
  };
  const headerShow = useSelector(getHederShow);
  // console.log(headerShow, 'headerShow');

  return (
    <header className="App-header">
      {/* 此時的invoices /之後的變數 都是帶入params的參數 */}
      <NavLink className={({ isActive }) => isActive
        ? 'App-header-active'
        : 'App-header-item'} to="/invoices/invoicesIn">go invoices/:invoiceId</NavLink>
      {/* 只要to 的path 符合route path 前面路徑，且route的path有帶:id， 下面nav link 都會連到route指定的element */}
      <div className="App-header-invoices">
        invoices list
        <ul className="App-header-invoices-wrap">
          {invoices.map((invoice, i) => (
            <li className={`App-header-invoices-wrap-li-${i + 1}`} key={invoice.number}>
              <NavLink
                to={`/invoices/${invoice.number}`}
                key={invoice.number}
                className={
                  `App-header-item App-header-invoices-item App-header-invoices-item-${i + 1}`
                }
                style={({ isActive }) => isActive
                  ? headerActive
                  : undefined}
              >
                {invoice.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar">
        <ul className="sidebar-list">
          {headerData.map((item, index) => {
            return (
              <li key={index}>
                {item.icon}
                <NavLink className={({ isActive }) => isActive
                  ? 'App-header-active'
                  : 'App-header-item'} to={item.to}>{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
