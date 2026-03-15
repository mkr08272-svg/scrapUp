import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LandingScreen from './pages/LandingScreen';
import CustomerHomeDashboard from './pages/CustomerHomeDashboard';
import EcoImpactDashboard from './pages/EcoImpactDashboard';
import PickupBookingScreen from './pages/PickupBookingScreen';
import PickupTrackingScreen from './pages/PickupTrackingScreen';
import CollectorDashboard from './pages/CollectorDashboard';
import PickupCompletionScreen from './pages/PickupCompletionScreen';
import PaymentReceiptScreen from './pages/PaymentReceiptScreen';

function AppLayout({ children }) {
  // Mobile app container logic
  return (
    <div className="app-container">
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/customer/home" element={<CustomerHomeDashboard />} />
          <Route path="/customer/eco-impact" element={<EcoImpactDashboard />} />
          <Route path="/customer/book" element={<PickupBookingScreen />} />
          <Route path="/customer/track/:id" element={<PickupTrackingScreen />} />
          <Route path="/customer/payment/:id" element={<PaymentReceiptScreen />} />
          
          <Route path="/collector/home" element={<CollectorDashboard />} />
          <Route path="/collector/complete/:id" element={<PickupCompletionScreen />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
