import './App.css';
import {Col, Grid, Row} from "antd";
import Home from "./pages/HomePage/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BasketPage from "./pages/BasketPage/BasketPage";
import Layout from "./Layout";
import {useState} from "react";
import PreviewPage from "./pages/PreviewPage/PreviewPage";

function App() {

  const [generalCount, setGeneralCount] = useState(0)
  const [generalVolume, setGeneralVolume] = useState(0)
  const [generalWeight, setGeneralWeight] = useState(0)
  const [generalPrice, setGeneralPrice] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/basket'} element={<BasketPage generalCount={generalCount} generalVolume={generalVolume}
                                                         generalWeight={generalWeight} generalPrice={generalPrice}
                                                         setGeneralPrice={setGeneralPrice}
                                                         setGeneralVolume={setGeneralVolume}
                                                         setGeneralCount={setGeneralCount}
                                                         setGeneralWeight={setGeneralWeight}/>}/>
            <Route path={'/preview'} element={<PreviewPage/>}/>
          </Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
