import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Check, ArrowRight } from 'lucide-react';
import './PickupCompletionScreen.css';

const PickupCompletionScreen = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([{ type: 'Paper', weight: 3, rate: 12 }]);
  const [swipeProgress, setSwipeProgress] = useState(0);

  const scrapTypes = [
    { name: 'Paper', rate: 12 },
    { name: 'Plastic', rate: 18 },
    { name: 'Metal', rate: 25 },
    { name: 'E-Waste', rate: 40 }
  ];

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    if (field === 'type') {
      const typeDef = scrapTypes.find(t => t.name === value);
      newItems[index].type = value;
      newItems[index].rate = typeDef.rate;
    } else {
      newItems[index][field] = Number(value);
    }
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { type: 'Plastic', weight: 1, rate: 18 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const totalPayout = items.reduce((sum, item) => sum + (item.weight * item.rate), 0);

  // Swipe logic
  let startX = 0;
  const handleTouchStart = (e) => { startX = e.touches[0].clientX; };
  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientX - startX;
    if (delta > 0 && delta < 250) setSwipeProgress(delta); // Assuming 250px track width
  };
  const handleTouchEnd = () => {
    if (swipeProgress > 200) {
      setSwipeProgress(250); // Lock it
      // Trigger Completion
      setTimeout(() => {
        navigate('/collector/home');
      }, 1000);
    } else {
      setSwipeProgress(0); // Snap back
    }
  };

  return (
    <div className="completion-screen">
      <div className="eco-header">
        <button className="icon-btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="#1B4332" />
        </button>
        <h2 className="header-title">Complete Pickup</h2>
        <div style={{width: 40}}></div>
      </div>

      <div className="px-5 pt-6 pb-32">
        <h3 className="section-title mb-4">Weigh Items</h3>
        
        {items.map((item, idx) => (
          <div key={idx} className="weigh-row bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3 flex gap-3 slideUp" style={{animationDelay: `${idx * 0.1}s`}}>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Scrap Type</label>
              <select className="weigh-select" value={item.type} onChange={(e) => updateItem(idx, 'type', e.target.value)}>
                {scrapTypes.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            
            <div className="w-24">
              <label className="text-xs text-gray-500 mb-1 block">Weight (kg)</label>
              <input type="number" min="0.1" step="0.1" className="weigh-input mono" value={item.weight} onChange={(e) => updateItem(idx, 'weight', e.target.value)} />
            </div>

            <button className="text-gray-400 mt-6" onClick={() => removeItem(idx)}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button className="btn-outline w-full py-3 mb-8 border-dashed" onClick={addItem}>
          <Plus size={18} className="mr-2" /> Add another type
        </button>

        {/* Summary Card */}
        <div className="summary-card bg-deep-forest text-white p-6 rounded-2xl shadow-lg relative overflow-hidden slideUp" style={{animationDelay: '0.3s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
          
          <h3 className="text-lg font-bold mb-4 opacity-90">Payout Summary</h3>
          
          <div className="space-y-3 mb-6">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="opacity-80">{item.type} ({item.weight}kg × ₹{item.rate})</span>
                <span className="mono font-bold">₹{Math.round(item.weight * item.rate)}</span>
              </div>
            ))}
          </div>
          
          <hr className="border-green-800 mb-4" />
          
          <div className="flex justify-between items-center">
            <span className="text-lg opacity-90">Total Payout</span>
            <span className="text-3xl font-bold mono text-gold">₹{Math.round(totalPayout)}</span>
          </div>
        </div>

      </div>

      {/* Swipe to Complete */}
      <div className="swipe-container-wrapper bottom-action-bar">
        <div className="swipe-track">
          <div className="swipe-bg" style={{width: `${swipeProgress + 56}px`}}></div>
          <div className="swipe-text">{swipeProgress > 200 ? 'Completed!' : 'Swipe to Complete ➔'}</div>
          
          <div 
            className={`swipe-thumb ${swipeProgress > 200 ? 'success' : ''}`}
            style={{transform: `translateX(${swipeProgress}px)`}}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {swipeProgress > 200 ? <Check color="white" /> : <ArrowRight color="var(--primary-green)" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupCompletionScreen;
