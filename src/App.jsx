import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/products/Category";
import AddProduct from "./pages/products/AddProduct";
import OrderLists from "./pages/orders/OrderLists";
import ReportPage from "./pages/report/ReportPage";
import CustomerPage from "./pages/customer/Customer";
import AuthPage from "./pages/login/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/products/category" element={<Category />} />
      <Route path="/products/add-product" element={<AddProduct />} />
      <Route path='/orders' element={<OrderLists />}/>
      <Route path='/customers' element={<CustomerPage />}/>
      <Route path='/reports' element={<ReportPage />}/>


    </Routes>
  );
}

export default App;

