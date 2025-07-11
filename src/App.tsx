import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { Navigate } from "react-router-dom"
import { CitiesProvider } from "./contexts/CitiesContext"

function App() {
  return (
  <div>
   <CitiesProvider>
    <BrowserRouter>
     <Routes>
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />
      <Route index element={<Homepage />} />
      <Route path="app" element={<AppLayout />} >

       <Route index element={<Navigate replace to="cities/10"/>} />
       {/* <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} /> */}
        <Route path="cities" element={<CityList />} />

       <Route path="cities/:id" element={<City />}/>

       <Route path="countries" element={<CountryList />} />
       <Route path="form" element={<Form />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
   </BrowserRouter>
 </CitiesProvider>
  </div>
  )
}

export default App
