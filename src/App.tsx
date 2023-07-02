import React from 'react';
import {Route, Routes} from "react-router-dom"
import MainPageComponent from "./components/main-page/main-page.component";
import ItemPageComponent from "./components/item-page/item-page.component";
// window.Telegram.WebApp

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/*" index element={<MainPageComponent/>}></Route>
            <Route path="auth" element={<ItemPageComponent />}></Route>
        </Routes>
    </div>
  );
}

export default App;
