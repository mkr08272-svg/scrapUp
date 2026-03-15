import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, MapPin, Calendar, Clock, Weight } from 'lucide-react';
import './PickupBookingScreen.css';

const PickupBookingScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [weight, setWeight] = useState(5);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('Morning 8-11am');
  const [instructions, setInstructions] = useState('');

  const scrapTypes = [
    { id: 'paper', name: 'Paper', rate: 12, icon: '📄' },
    { id: 'plastic', name: 'Plastic', rate: 18, icon: '🧴' },
    { id: 'metal', name: 'Metal', rate: 25, icon: '🔩' },
    { id: 'ewaste', name: 'E-Waste', rate: 40, icon: '💻' }
  ];

  const dates = ['Today', 'Tomorrow', 'Mar 17', 'Mar 18'];
  const times = ['Morning 8-11am', 'Afternoon 12-3pm', 'Evening 4-7pm'];

  const toggleType = (id) => {
    if (selectedTypes.includes(id)) {
      setSelectedTypes(selectedTypes.filter(t => t !== id));
    } else {
      setSelectedTypes([...selectedTypes, id]);
    }
  };

  const getEstimatedValue = () => {
    if (selectedTypes.length === 0) return 0;
    // For simplicity, we just average the rate of chosen items
    let totalRate = 0;
    selectedTypes.forEach(tId => {
      totalRate += scrapTypes.find(s => s.id === tId).rate;
    });
    const avgRate = totalRate / selectedTypes.length;
    return Math.round(avgRate * weight);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      // Confirm Booking
      // Generate mockup id
      const mockId = Math.floor(Math.random() * 10000);
      navigate(`/customer/track/${mockId}`);
    }
  };

  return (
    <div className="booking-screen">
      {/* Header */}
      <div className="booking-header">
        <button className="icon-btn-ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
          <ArrowLeft size={24} color="#1B4332" />
        </button>
        <h2 className="header-title">Schedule Pickup</h2>
        <div style={{width: 40}}></div> {/* Spacer for centering */}
      </div>

      {/* Progress Bar */}
      <div className="progress-container px-5 pt-2">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
          <span>Step {step} of 4</span>
          <span>
            {step === 1 && 'Scrap Type'}
            {step === 2 && 'Estimated Weight'}
            {step === 3 && 'Date & Time'}
            {step === 4 && 'Confirm Details'}
          </span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{width: `${(step / 4) * 100}%`}}></div>
        </div>
      </div>

      <div className="booking-content px-5 pt-6 pb-32">
        
        {step === 1 && (
          <div className="step-content slideUp">
            <h3 className="step-title">What are you recycling?</h3>
            <p className="step-subtitle">Select all that apply</p>
            
            <div className="scrap-type-grid mt-6">
              {scrapTypes.map(type => (
                <div 
                  key={type.id} 
                  className={`scrap-type-tile ${selectedTypes.includes(type.id) ? 'selected' : ''}`}
                  onClick={() => toggleType(type.id)}
                >
                  <div className="tile-icon">{type.icon}</div>
                  <div className="tile-name">{type.name}</div>
                  <div className="tile-rate">₹{type.rate}/kg</div>
                  {selectedTypes.includes(type.id) && (
                    <div className="check-icon"><Check size={16} /></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content slideUp">
            <h3 className="step-title">Estimated Weight</h3>
            <p className="step-subtitle">How much scrap do you have roughly?</p>
            
            <div className="weight-container mt-10">
              <div className="weight-display mono">
                <Weight size={32} className="mr-3 text-primary" />
                {weight} kg
              </div>
              
              <input 
                type="range" 
                min="1" max="50" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                className="weight-slider-lg mt-8"
              />
              <div className="flex justify-between text-gray-500 mt-2">
                <span>1 kg</span>
                <span>50+ kg</span>
              </div>
            </div>

            <div className="estimate-card mt-10 p-5 rounded-2xl bg-green-50 border border-green-200">
              <p className="text-gray-600 text-sm mb-1">Estimated Value</p>
              <h2 className="text-3xl font-bold mono text-primary">₹{getEstimatedValue()}</h2>
              <p className="text-xs text-gray-500 mt-2">Final value will be calculated by the collector upon accurate weighing.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content slideUp">
            <h3 className="step-title">When should we come?</h3>
            <p className="step-subtitle">Select a convenient time</p>
            
            <div className="mt-8">
              <h4 className="flex items-center text-sm font-bold text-gray-700 mb-3">
                <Calendar size={18} className="mr-2 text-primary" /> Date
              </h4>
              <div className="chips-container">
                {dates.map(d => (
                  <button 
                    key={d} 
                    className={`chip ${selectedDate === d ? 'active' : ''}`}
                    onClick={() => setSelectedDate(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="flex items-center text-sm font-bold text-gray-700 mb-3">
                <Clock size={18} className="mr-2 text-primary" /> Time Slot
              </h4>
              <div className="flex flex-col gap-3">
                {times.map(t => (
                  <button 
                    key={t} 
                    className={`time-slot-btn ${selectedTime === t ? 'active' : ''}`}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content slideUp">
            <h3 className="step-title">Confirm Address</h3>
            <p className="step-subtitle">Where should the collector go?</p>
            
            <div className="mt-6 mock-map-container">
              <div className="mock-map">
                {/* Visual placeholder for map */}
                <div className="map-pin-center"><MapPin size={32} color="#E74C3C" fill="#fff" /></div>
              </div>
              <button className="btn-auto-detect">
                <MapPin size={16} className="mr-2" /> Detect Location
              </button>
            </div>

            <div className="address-card mt-4 p-4 border rounded-xl bg-white">
              <h4 className="font-bold flex items-center mb-1"><MapPin size={16} className="mr-1 text-primary" /> Koramangala</h4>
              <p className="text-sm text-gray-600">12th Main Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034</p>
            </div>

            <div className="mt-6">
              <label className="text-sm font-bold text-gray-700 mb-2 block">Pickup Instructions (Optional)</label>
              <textarea 
                className="w-full p-4 border rounded-xl resize-none outline-none focus:border-green-500" 
                rows="3"
                placeholder="E.g., Ring the bell at Gate 2"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Sticky CTA */}
      <div className="bottom-action-bar">
        <button 
          className="btn" 
          onClick={handleNext}
          disabled={step === 1 && selectedTypes.length === 0}
          style={{ opacity: (step === 1 && selectedTypes.length === 0) ? 0.5 : 1 }}
        >
          {step === 4 ? 'Confirm Booking →' : 'Continue'}
        </button>
      </div>

    </div>
  );
};

export default PickupBookingScreen;
