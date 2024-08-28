import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Route/Private";
import SignupPage from "./pages/AuthPage/SignupPage";
import SigninPage from "./pages/AuthPage/SigninPage";
import ForgotPassword from "./pages/AuthPage/ForgotPassword";
import AdminRoute from "./components/Route/Admin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import AllProduct from "./pages/Admin/AllProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import CartPage from "./pages/CartPage";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/product-detail/:slug" element={<ProductDetail />} />
      <Route path="/search" element={<SearchPage />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/order" element={<Order   />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route
          path="admin/products/update-product/:slug"
          element={<UpdateProduct />}
        />
        <Route path="admin/products" element={<AllProduct />} />
      </Route>

      <Route path="/contact" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/sign-in" element={<SigninPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
