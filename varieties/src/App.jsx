import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Shoedetails from './shoedetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shoedetails/:id" element={<Shoedetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
