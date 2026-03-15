import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, ArrowLeft, Recycle, Medal, ArrowRight } from 'lucide-react';
import './EcoImpactDashboard.css';

const EcoImpactDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ recycled: 0, plastic: 0, co2: 0, trees: 0 });

  useEffect(() => {
    // Animate stats counting up
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setStats({
        recycled: (28 / steps) * currentStep,
        plastic: (11 / steps) * currentStep,
        co2: (6.4 / steps) * currentStep,
        trees: Math.floor((2 / steps) * currentStep)
      });
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="eco-dashboard pb-24">
      {/* Header */}
      <div className="eco-header">
        <button className="icon-btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="#1B4332" />
        </button>
        <h2 className="header-title">Your Impact</h2>
        <button className="icon-btn-ghost text-primary">
          <Share2 size={24} />
        </button>
      </div>

      <div className="eco-content">
        {/* Animated Split Screen WOW Visual */}
        <div className="impact-visual slideUp">
          <div className="visual-before">
            <div className="visual-overlay dark"></div>
            <p className="visual-label">Without You</p>
          </div>
          <div className="visual-after">
            <div className="visual-overlay light"></div>
            <p className="visual-label">With You</p>
          </div>
          <div className="impact-badge bounce">
            Your 28 kg prevented this
          </div>
        </div>

        {/* Animated Stats Feed */}
        <div className="stats-grid mt-6 slideUp" style={{animationDelay: '0.2s'}}>
          <div className="stat-card">
            <div className="stat-icon-wrapper recycle-bg">
              <Recycle size={24} className="text-primary" />
            </div>
            <div className="stat-value mono">{stats.recycled.toFixed(1)} kg</div>
            <div className="stat-label">Total Recycled</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper plastic-bg">
              <span className="emoji">🧴</span>
            </div>
            <div className="stat-value mono">{stats.plastic.toFixed(1)} kg</div>
            <div className="stat-label">Plastic Diverted</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper co2-bg">
              <span className="emoji">🌍</span>
            </div>
            <div className="stat-value mono">{stats.co2.toFixed(1)} kg</div>
            <div className="stat-label">CO₂ Saved</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper tree-bg">
              <span className="emoji">🌳</span>
            </div>
            <div className="stat-value mono">{stats.trees}</div>
            <div className="stat-label">Trees Equivalent</div>
          </div>
        </div>

        {/* Gamification Badges */}
        <div className="badges-section slideUp mt-8" style={{animationDelay: '0.4s'}}>
          <h3 className="section-title">Recycling Badges</h3>
          <div className="badges-row">
            <div className="badge-item unlocked">
              <div className="badge-circle bronze"><Medal size={24} /></div>
              <p>First Pickup</p>
            </div>
            <div className="badge-item unlocked">
              <div className="badge-circle silver"><Medal size={32} /></div>
              <p>Eco Warrior</p>
            </div>
            <div className="badge-item locked">
              <div className="badge-circle gold blur"><Medal size={24} /></div>
              <p>Green Champ</p>
            </div>
          </div>
          <div className="progress-container mt-4">
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
              <span>Next Badge: Green Champ</span>
              <span>28kg / 50kg</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{width: '56%'}}></div>
            </div>
          </div>
        </div>

        {/* Share Action */}
        <div className="mt-8 slideUp" style={{animationDelay: '0.5s'}}>
          <button className="btn w-full">
            <Share2 size={20} className="mr-2" /> Share Your Impact
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcoImpactDashboard;
