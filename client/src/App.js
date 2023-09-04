import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Upload />} path="/upload" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
