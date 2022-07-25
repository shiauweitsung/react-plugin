// import { Link } from 'react-router-dom';
import { NavLink, useMatch } from 'react-router-dom';
// use more path with id
import { getInvoices } from '../../data';

export default function Header(props) {
    let invoices = getInvoices();
    let headerActive = {
        color: 'white'
    }
    return (
        <header className="App-header">
            <NavLink className={(navData) => navData.isActive ? 'App-header-active' : 'App-header-item'} to="/about">go about</NavLink>
            <NavLink className={(navData) => navData.isActive ? 'App-header-active' : 'App-header-item'} to="/home">go home</NavLink>
            {/* 此時的invoices /之後的變數 都是帶入params的參數 */}
            <NavLink className={({ isActive }) => isActive ? 'App-header-active' : 'App-header-item'} to="/invoices/invoicesIn">go invoices/:invoiceId</NavLink>
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
                                style={({ isActive }) => isActive ? headerActive : undefined}
                            >
                                {invoice.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>scan-qrcode
            <NavLink className={({ isActive }) => isActive ? 'App-header-active' : 'App-header-item'} to="/onboard">go onboard</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'App-header-active' : 'App-header-item'} to="/dick">Dick</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'App-header-active' : 'App-header-item'} to="/style_component">StyleComponent</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'App-header-active' : 'App-header-item'} to="/scan-qrcode">Scan QR code</NavLink>
        </header>
    )
}