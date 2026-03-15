import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, X, CheckCircle, Navigation } from 'lucide-react';
import './PickupTrackingScreen.css';

const PickupTrackingScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock tracking state
  const [status, setStatus] = useState(1); // 1 = Confirmed, 2 = Assigned, 3 = En Route, 4 = Arrived, 5 = Completed
  
  // Auto-progress mock logic
  useEffect(() => {
    if (status >= 5) return;
    const timer = setTimeout(() => {
      setStatus(prev => prev + 1);
    }, 4000); 
    return () => clearTimeout(timer);
  }, [status]);

  // Transition to receipt when completed
  useEffect(() => {
    if (status === 5) {
      setTimeout(() => {
        navigate(`/customer/payment/${id}`);
      }, 2000);
    }
  }, [status, navigate, id]);

  const progressSteps = [
    { id: 1, label: 'Pickup Confirmed' },
    { id: 2, label: 'Collector Assigned' },
    { id: 3, label: 'En Route' },
    { id: 4, label: 'Arrived' },
    { id: 5, label: 'Pickup Completed' }
  ];

  return (
    <div className="tracking-screen">
      {/* Top Map Area */}
      <div className="tracking-map">
        <div className="tracking-header">
          <button className="icon-btn-ghost shadow-sm bg-white" onClick={() => navigate('/customer/home')}>
            <ArrowLeft size={24} color="#1B4332" />
          </button>
          <div className="tracking-id shadow-sm">Pickup #{id}</div>
        </div>
        
        {/* Mock Map Image */}
        <div className="map-view-dark">
          {/* Animated Route Line Mock */}
          <div className="mock-route-line"></div>
          {/* Customer Pin */}
          <div className="map-pin customer-pin"><div className="dot"></div></div>
          {/* Collector Pin */}
          {status > 1 && status < 4 && (
            <div className={`map-pin collector-pin moving-to-${status}`}>
              <Navigation size={20} fill="#E74C3C" color="#E74C3C" className="scooter-icon" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Drawer */}
      <div className="tracking-drawer slideUp bottom-drawer-shadow">
        <div className="drawer-handle"></div>
        
        {status > 1 ? (
          <div className="collector-profile mb-6">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" 
                alt="Collector" 
                className="collector-avatar"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-bold text-lg text-deep-forest">Ravi Kumar <span className="text-sm font-normal text-gold ml-1">⭐ 4.8</span></h3>
                <p className="text-gray-500 text-sm">Vehicle: Hero Splendor</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">ETA</p>
                <p className="font-bold text-lg mono text-primary">12 mins</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button className="btn-outline flex-1 flex justify-center py-3"><Phone size={18} className="mr-2" /> Call</button>
              <button className="btn-outline flex-1 flex justify-center py-3"><MessageCircle size={18} className="mr-2" /> Chat</button>
            </div>
          </div>
        ) : (
          <div className="finding-collector mb-6 text-center py-4">
            <div className="pulse-ring mx-auto mb-4"></div>
            <h3 className="font-bold text-lg text-deep-forest">Finding nearby collector...</h3>
            <p className="text-gray-500 text-sm mt-1">Please wait while we assign the best match</p>
          </div>
        )}

        <hr className="border-gray-200 my-4" />

        {/* Progress Timeline */}
        <div className="progress-timeline">
          <h4 className="font-bold text-sm text-gray-700 mb-4">Progress Timeline</h4>
          <div className="timeline-steps">
            {progressSteps.map(step => (
              <div key={step.id} className={`timeline-item ${status >= step.id ? 'active' : ''} ${status === step.id ? 'current' : ''}`}>
                <div className="timeline-icon">
                  {status > step.id ? <CheckCircle size={18} /> : (status === step.id && step.id === 3 ? <div className="pulse-dot"></div> : <div className="empty-dot"></div>)}
                </div>
                <div className="timeline-content">
                  <p className="timeline-label">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Action */}
        {status < 4 && (
          <div className="mt-8 text-center pb-8 border-t border-gray-100 pt-4">
            <button className="text-danger flex items-center justify-center font-bold text-sm mx-auto" onClick={() => navigate('/customer/home')}>
              <X size={16} className="mr-1" /> Cancel Pickup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupTrackingScreen;
