import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Package, Recycle, Coins } from 'lucide-react';
import './LandingScreen.css';

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-screen">
      <div className="landing-content">
        <div className="brand-header fadeIn">
          <div className="logo-container">
            <Leaf className="logo-icon" size={48} />
          </div>
          <h1 className="brand-name">ScrapUp</h1>
          <p className="tagline">Turn Your Trash Into Cash</p>
        </div>

        <div className="animation-container">
          <div className="loop-animation">
            <Package className="anim-item scrap-icon" size={32} />
            <span className="anim-arrow">→</span>
            <Recycle className="anim-item recycle-icon" size={40} />
            <span className="anim-arrow">→</span>
            <Coins className="anim-item coin-icon" size={32} />
          </div>
        </div>

        <div className="action-buttons slideUp">
          <button className="btn btn-primary-pulse" onClick={() => navigate('/customer/home')}>
            📦 Book a Pickup
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/collector/home')}>
            🛵 Join as Collector
          </button>
        </div>
      </div>
      
      <div className="social-proof slideUp">
        <p>Join 50,000+ households already recycling smarter</p>
      </div>
    </div>
  );
};

export default LandingScreen;
