import DashboardIcon from "../assets/icons/Dashboard.svg";
import ProductIcon from "../assets/icons/Products.svg";
import OrderIcon from "../assets/icons/Orders.svg";
import CustomerIcon from "../assets/icons/Customer.svg";
import ReportIcon from "../assets/icons/Report.svg";

export const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { id: "category", label: "Add Category", icon: ProductIcon, path: "/category" },
  { id: "add-product", label: "Add Product", icon: ProductIcon, path: "/add-product" },
  { id: "orders", label: "Order Lists", icon: OrderIcon, path: "/orders" },
  { id: "customers", label: "Customer", icon: CustomerIcon, path: "/customers" },
  { id: "reports", label: "Report", icon: ReportIcon, path: "/reports" },
];
