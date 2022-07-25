import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Invoices from './pages/Invoices';
import Onboard from './pages/Onboard';
import Dick from './pages/Dick';
import StyleComponent from './pages/StyleComponent';
import ScanQrCode from './pages/ScanQrcode';


function App() {
  return (
    <div className="App">
      <Header content="我是header props" />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home a="1" />} />
          <Route path="/invoices/:invoicesOut" element={<Invoices />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/dick" element={<Dick />} />
          <Route path="/style_component" element={<StyleComponent />} />
          <Route path="/scan-qrcode" element={<ScanQrCode />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
