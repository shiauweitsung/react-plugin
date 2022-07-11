import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Invoices from './pages/Invoices';
import Onboard from './pages/Onboard';


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
        </Routes>
      </main>
      fuck u yang
    </div>
  );
}

export default App;
