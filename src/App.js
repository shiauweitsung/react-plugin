import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Invoices from './pages/Invoices';
import Onboards from './pages/Onboard';
import Dick from './pages/Dick';
import StyleComponent from './pages/StyleComponent';
import ScanQrCode from './pages/ScanQrcode';
import Redux from './pages/Redux';
import TypeScriptCom from './pages/Typescripts';

function App() {
  return (
    <div className="App">
      <Header content="我是header props" />
      <main className="container">
        <Routes>
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
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
          <Route path="/onboard" element={<Onboards />} />
          <Route path="/dick" element={<Dick />} />
          <Route path="/style_component" element={<StyleComponent />} />
          <Route path="/scan-qrcode" element={<ScanQrCode />} />
          <Route path="/redux" element={<Redux />} />
          <Route path="/typescript" element={<TypeScriptCom />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
