// imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './components/add';
import View from './components/view';
import Update from './components/update';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<View></View>}></Route>
          <Route path='/add' element={<Add></Add>}></Route>
          <Route path='/update/:id' element={<Update></Update>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// exporting the app component
export default App;