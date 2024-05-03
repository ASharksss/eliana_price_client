import './App.css';
import {Col, Grid, Row} from "antd";
import Home from "./pages/HomePage/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BasketPage from "./pages/BasketPage/BasketPage";
import Layout from "./Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/basket'} element={<BasketPage/>}/>
          </Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
