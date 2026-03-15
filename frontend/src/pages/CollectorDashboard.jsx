import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Power, MapPin, Package, CheckCircle2, XCircle, Navigation, Clock, Banknote } from 'lucide-react';
import './CollectorDashboard.css';

const CollectorDashboard = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [requestVisible, setRequestVisible] = useState(true);

  // Mock Request Countdown
  useEffect(() => {
    let timer;
    if (isOnline && requestVisible && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setRequestVisible(false); // Auto-reject
    }
    return () => clearInterval(timer);
  }, [isOnline, requestVisible, timeLeft]);

  const handleAccept = () => {
    setRequestVisible(false);
    // Mock navigating to completion screen after accepting
    const mockId = Math.floor(Math.random() * 10000);
    navigate(`/collector/complete/${mockId}`);
  };

  const handleReject = () => {
    setRequestVisible(false);
  };

  return (
    <div className="collector-dashboard pb-24">
      {/* Top Bar with Online Toggle */}
      <div className="collector-header">
        <div className="earnings-summary">
          <p className="text-sm text-gray-500">Today's Earnings</p>
          <div className="flex items-center">
            <span className="font-bold text-2xl mono text-deep-forest">₹840</span>
            <span className="ml-2 text-xs text-primary bg-green-100 px-2 py-1 rounded-full">+12% vs yst</span>
          </div>
        </div>
        
        <div className="status-toggle" onClick={() => setIsOnline(!isOnline)}>
          <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            <Power size={18} color="white" />
          </div>
        </div>
      </div>

      <div className="dashboard-content px-5 pt-4">
        
        {/* Status Alert */}
        {!isOnline && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center mb-6 slideUp">
            <Clock size={20} className="text-yellow-600 mr-3" />
            <p className="text-yellow-800 text-sm font-bold">You are currently offline. Go online to receive pickup requests.</p>
          </div>
        )}

        {/* Incoming Request Card */}
        {isOnline && requestVisible && (
          <div className="request-card slideUp">
            <div className="request-card-header flex justify-between items-center mb-4">
              <div className="flex items-center text-primary font-bold">
                <span className="ping-dot"></span> New Request
              </div>
              <div className="timer mono text-danger bg-red-50 px-2 py-1 rounded-full text-sm font-bold">
                00:{timeLeft.toString().padStart(2, '0')}
              </div>
            </div>

            <div className="map-snapshot mb-4">
              {/* Mock map via MapQuest static */}
              <div className="route-snapshot"></div>
            </div>

            <h3 className="font-bold text-lg mb-1 flex items-center"><MapPin size={16} className="mr-2 text-gray" /> 2.1 km away — Koramangala</h3>
            <p className="text-sm text-gray-600 ml-6 mb-4">Customer: Priya S.</p>

            <div className="request-details flex gap-4 mb-6">
              <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Scrap Type</p>
                <p className="font-bold flex items-center"><Package size={14} className="mr-1" /> Plastic + Paper</p>
              </div>
              <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Estimated</p>
                <div className="flex justify-between">
                  <span className="font-bold mono">~10 kg</span>
                  <span className="font-bold mono text-primary">₹180</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="btn-reject flex-1" onClick={handleReject}>
                <XCircle size={18} className="mr-2" /> Reject
              </button>
              <button className="btn flex-1" onClick={handleAccept}>
                <CheckCircle2 size={18} className="mr-2" /> Accept
              </button>
            </div>
            
            <button className="btn-outline w-full mt-3 flex justify-center py-3">
              <Navigation size={18} className="mr-2 text-sky-blue" /> Open in Google Maps
            </button>
          </div>
        )}

        {isOnline && !requestVisible && (
          <div className="waiting-card text-center py-10 slideUp">
            <div className="radar-animation mx-auto mb-6"></div>
            <h3 className="font-bold text-lg text-deep-forest mb-2">Looking for pickups...</h3>
            <p className="text-gray-500 text-sm">Stay in Koramangala area for high demand.</p>
          </div>
        )}

        {/* Action Dashboard Tabs */}
        <h3 className="font-bold text-lg mt-8 mb-4">Earnings Overview</h3>
        <div className="earnings-tabs flex gap-2 overflow-x-auto pb-4">
          <div className="earning-tab active">
            <p className="text-xs text-gray-500">Today</p>
            <p className="font-bold mono text-lg">₹840</p>
          </div>
          <div className="earning-tab">
            <p className="text-xs text-gray-500">This Week</p>
            <p className="font-bold mono text-lg">₹4,200</p>
          </div>
          <div className="earning-tab">
            <p className="text-xs text-gray-500">This Month</p>
            <p className="font-bold mono text-lg">₹16,800</p>
          </div>
        </div>

        {/* Mock Bar Graph */}
        <div className="graph-container p-4 bg-white border border-gray-100 rounded-xl shadow-sm mb-6 slideUp">
          <div className="flex justify-between items-end h-32 mb-2">
            <div className="bar-wrapper"><div className="bar" style={{height: '40%'}}></div><span className="text-xs">Mon</span></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '60%'}}></div><span className="text-xs">Tue</span></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '30%'}}></div><span className="text-xs">Wed</span></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '80%'}}></div><span className="text-xs">Thu</span></div>
            <div className="bar-wrapper"><div className="bar" style={{height: '100%', background: 'var(--primary-green)'}}></div><span className="text-xs font-bold">Fri</span></div>
          </div>
        </div>
      </div>

      {/* Collector Bottom Nav */}
      <div className="collector-nav bottom-action-bar flex justify-around p-4 shadow-lg border-t border-gray-100 bg-white">
        <div className="nav-item active">
          <Banknote size={24} />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <Package size={24} />
          <span>Pickups</span>
        </div>
      </div>
    </div>
  );
};

export default CollectorDashboard;
