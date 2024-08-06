import './App.css';
import Home from "./pages/HomePage/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BasketPage from "./pages/BasketPage/BasketPage";
import Layout from "./Layout";
import {useState} from "react";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import CorrectOrder from "./pages/ResultOrder/CorrectOrder";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrderList from "./pages/OrderList/OrderList";
import Registration from "./pages/Authtentication/Registration";
import Login from "./pages/Authtentication/Login";
import AuthProvider from "./context/AuthProvider";
import TransportCompany from "./pages/TransportCompany/TransportCompany";
import ChangePrice from "./pages/ChangePrice/ChangePrice";

function App() {

  const [generalCount, setGeneralCount] = useState(0)
  const [generalVolume, setGeneralVolume] = useState(0)
  const [generalWeight, setGeneralWeight] = useState(0)
  const [generalPrice, setGeneralPrice] = useState(0)

  return (
    <div className="App montserrat">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route path={'/'} element={<Home/>}/>
              <Route path={'/basket'} element={<BasketPage generalCount={generalCount} generalVolume={generalVolume}
                                                           generalWeight={generalWeight} generalPrice={generalPrice}
                                                           setGeneralPrice={setGeneralPrice}
                                                           setGeneralVolume={setGeneralVolume}
                                                           setGeneralCount={setGeneralCount}
                                                           setGeneralWeight={setGeneralWeight}/>}/>
              <Route path={'/profile'} element={<ProfilePage/>}/>
              <Route path={'/orderList/:id'} element={<OrderList/>}/>
              <Route path={'/preview'} element={<PreviewPage generalPrice={generalPrice}/>}/>
              <Route path={'/order'} element={<OrderPage/>}/>
              <Route path={'/transportCompany'} element={<TransportCompany/>}/>
              <Route path={'/correctOrder'} element={<CorrectOrder/>}/>
              <Route path={'/changePrice'} element={<ChangePrice/>}/>

            </Route>
            <Route path={'/create/user'} element={<Registration/>}/>
            <Route path={'/login'} element={<Login/>}/>

            <Route path={'*'} element={<Home/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
