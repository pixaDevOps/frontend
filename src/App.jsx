import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import CategoryListPage from "./pages/products/CategoryListPage";
import ProductListPage from "./pages/products/ProductListPage";
import OrderLists from "./pages/orders/OrderListsPage";
import ReportPage from "./pages/report/ReportPage";
import CustomerPage from "./pages/customer/CustomerPage";
import AuthPage from "./pages/login/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/products/category" element={<CategoryListPage />} />
      <Route path="/products/add-product" element={<ProductListPage />} />
      <Route path='/orders' element={<OrderLists />}/>
      <Route path='/customers' element={<CustomerPage />}/>
      <Route path='/reports' element={<ReportPage />}/>


    </Routes>
  );
}

export default App;

