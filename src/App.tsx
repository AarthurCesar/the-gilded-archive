import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import MenuPage from './components/Menu/MenuPage';
import CartPage from './components/Cart/CartPage';
import KitchenPage from './components/Kitchen/KitchenPage';
import TablesPage from './components/Tables/TablesPage';
import StaffPage from './components/Staff/StaffPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/staff" element={<ProtectedRoute><StaffPage /></ProtectedRoute>} />
            <Route path="/cozinha" element={<ProtectedRoute><KitchenPage /></ProtectedRoute>} />
            <Route path="/mesas" element={<ProtectedRoute><TablesPage /></ProtectedRoute>} />
          </Routes>
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
