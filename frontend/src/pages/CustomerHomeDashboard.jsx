import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bell, User, FileText, FlaskConical, Wrench, Monitor, ChevronRight, Leaf } from 'lucide-react';
import './CustomerHomeDashboard.css';

const CustomerHomeDashboard = () => {
  const navigate = useNavigate();
  const [calcType, setCalcType] = useState('Plastic');
  const [calcWeight, setCalcWeight] = useState(5);

  const rates = {
    'Paper': 12,
    'Plastic': 18,
    'Metal': 25,
    'E-Waste': 40
  };

  return (
    <div className="home-dashboard pb-24">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="location-pill">
          <MapPin size={16} className="text-primary" />
          <span className="location-text">Koramangala, Bangalore</span>
        </div>
        <div className="top-actions">
          <div className="icon-btn relative">
            <Bell size={20} />
            <span className="badge">2</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Hero Card */}
        <div className="hero-card slideUp">
          <div className="hero-content">
            <h2 className="hero-title">Ready to recycle?</h2>
            <p className="hero-subtitle">Schedule your scrap pickup now</p>
            <button className="btn btn-hero mt-4" onClick={() => navigate('/customer/book')}>
              + Schedule Pickup
            </button>
          </div>
          <div className="hero-bg-shapes" />
        </div>

        {/* Eco Impact Mini Banner */}
        <div className="eco-mini-banner slideUp" style={{animationDelay: '0.1s'}} onClick={() => navigate('/customer/eco-impact')}>
          <div className="eco-banner-content flex items-center">
            <Leaf className="text-primary mr-3" size={24} />
            <div className="ml-3">
              <p className="eco-text font-bold">You've saved 12.4 kg of CO₂ this month 🌿</p>
              <p className="eco-subtext text-sm">Tap to view your impact</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray" />
        </div>

        {/* Category Grid */}
        <h3 className="section-title slideUp mt-6" style={{animationDelay: '0.2s'}}>Scrap Categories</h3>
        <div className="category-grid slideUp" style={{animationDelay: '0.2s'}}>
          <div className="category-card">
            <div className="cat-icon-wrapper paper"><FileText size={28} /></div>
            <div className="cat-details">
              <h4>Paper</h4>
              <p className="mono">₹12/kg</p>
            </div>
          </div>
          <div className="category-card">
            <div className="cat-icon-wrapper plastic"><FlaskConical size={28} /></div>
            <div className="cat-details">
              <h4>Plastic</h4>
              <p className="mono">₹18/kg</p>
            </div>
          </div>
          <div className="category-card">
            <div className="cat-icon-wrapper metal"><Wrench size={28} /></div>
            <div className="cat-details">
              <h4>Metal</h4>
              <p className="mono">₹25/kg</p>
            </div>
          </div>
          <div className="category-card">
            <div className="cat-icon-wrapper ewaste"><Monitor size={28} /></div>
            <div className="cat-details">
              <h4>E-Waste</h4>
              <p className="mono">₹40/kg</p>
            </div>
          </div>
        </div>

        {/* Value Calculator */}
        <div className="card calculator-card slideUp mt-6" style={{animationDelay: '0.3s'}}>
          <h3 className="card-title mb-4">Live Scrap Value Calculator</h3>
          <div className="calc-row flex gap-4 mb-4">
            <div className="flex-1">
              <label>Category</label>
              <select value={calcType} onChange={(e) => setCalcType(e.target.value)}>
                {Object.keys(rates).map(key => <option key={key} value={key}>{key}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label>Weight (kg): {calcWeight}</label>
              <input 
                type="range" 
                min="1" max="50" 
                value={calcWeight} 
                onChange={(e) => setCalcWeight(e.target.value)} 
                className="weight-slider mt-2"
              />
            </div>
          </div>
          <div className="calc-result font-bold text-lg flex justify-between">
            <span>Estimated Value:</span>
            <span className="calc-amount mono text-primary">₹{rates[calcType] * calcWeight}</span>
          </div>
        </div>

        {/* Recent Pickups */}
        <h3 className="section-title slideUp mt-6" style={{animationDelay: '0.4s'}}>Recent Pickups</h3>
        <div className="recent-scroll slideUp flex gap-4 overflow-x-auto pb-4" style={{animationDelay: '0.4s'}}>
          <div className="recent-card completed shrink-0 w-64 p-4 border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="date-text text-sm text-gray-500">Mar 12, 2026</span>
              <span className="status-badge success text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
            </div>
            <div className="recent-details">
              <p><strong>Plastic & Paper</strong> (12kg)</p>
              <p className="payout text-primary mono font-bold text-xl mt-1">₹192</p>
            </div>
          </div>
          <div className="recent-card pending shrink-0 w-64 p-4 border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="date-text text-sm text-gray-500">Mar 15, 2026</span>
              <span className="status-badge warning text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
            </div>
            <div className="recent-details">
              <p><strong>E-Waste</strong> (~5kg)</p>
              <p className="payout mono font-bold text-xl mt-1">Est. ₹200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHomeDashboard;
