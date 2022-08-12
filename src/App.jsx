import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
