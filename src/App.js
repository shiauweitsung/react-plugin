import './App.scss';
import React, { Route, Routes, Navigate } from 'react-router-dom';
import './i18n';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Invoices from './pages/Invoices';
import Onboards from './pages/Onboard';
import AutoConnectWallet from './pages/Onboard/pages';
import Dick from './pages/Dick';
import StyleComponent from './pages/StyleComponent';
import ScanQrCode from './pages/ScanQrcode';
import Redux from './pages/Redux';
import TypeScriptCom from './pages/Typescripts';
import Translate from './pages/Translate';
import FormikForm from './pages/Formik';
import { TestContextProvider } from './pages/UseContext';

function App() {
  return (
    <div className="App">
      <TestContextProvider>
        <Header content="我是header props" />
        <main className="container">
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home a="錯誤網址傳進來的值" />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home a="1" />} />
            <Route path="/invoices/:invoicesOut" element={<Invoices />} />
            {/* 網址錯誤的跳轉方式 */}
            {/* <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          /> */}
            <Route path="/onboard" element={<Onboards />} />
            <Route path="/autoConnected" element={<AutoConnectWallet />} />
            <Route path="/dick" element={<Dick />} />
            <Route path="/style_component" element={<StyleComponent />} />
            <Route path="/scan-qrcode" element={<ScanQrCode />} />
            <Route path="/redux" element={<Redux />} />
            <Route path="/typescript" element={<TypeScriptCom />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/formik" element={<FormikForm />} />
          </Routes>
        </main>
      </TestContextProvider>
    </div>
  );
}

export default App;
