import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download, Share2, Star, Smartphone, Building, Wallet } from 'lucide-react';
import './PaymentReceiptScreen.css';
import confetti from 'canvas-confetti';

const PaymentReceiptScreen = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Trigger confetti on load
  React.useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2ECC71', '#3498DB', '#F39C12']
    });
  }, []);

  const handleHome = () => {
    navigate('/customer/home');
  };

  return (
    <div className="receipt-screen">
      <div className="eco-header">
        <button className="icon-btn-ghost" onClick={handleHome}>
          <ArrowLeft size={24} color="#1B4332" />
        </button>
        <h2 className="header-title">Receipt</h2>
        <div style={{width: 40}}></div>
      </div>

      <div className="px-5 pt-8 pb-32">
        {/* Success Header */}
        <div className="text-center mb-8 slideUp">
          <CheckCircle size={64} className="text-primary mx-auto mb-4" />
          <h2 className="font-bold text-2xl text-deep-forest">Pickup Completed!</h2>
          <p className="text-gray-500 mt-1">₹126 has been deposited to your account</p>
        </div>

        {/* Receipt Card */}
        <div className="receipt-card bg-white p-6 rounded-3xl shadow-lg border border-gray-100 relative mb-8 slideUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center mb-6">
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" 
              alt="Collector" 
              className="w-12 h-12 rounded-full border-2 border-primary mr-3"
            />
            <div>
              <p className="text-sm text-gray-500">Collector</p>
              <p className="font-bold text-deep-forest">Ravi Kumar</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-500 mb-1">Mar 15, 2026</p>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Paid ✅</span>
            </div>
          </div>
          
          <div className="border-t border-dashed border-gray-300 my-4"></div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Paper (3 kg × ₹12)</span>
              <span className="mono">₹36</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Plastic (5 kg × ₹18)</span>
              <span className="mono">₹90</span>
            </div>
          </div>
          
          <div className="border-t border-dashed border-gray-300 my-4"></div>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-deep-forest">Total Payout</span>
            <span className="text-3xl font-bold mono text-gold">₹126</span>
          </div>

          <div className="receipt-cutout left"></div>
          <div className="receipt-cutout right"></div>
        </div>

        {/* Payment Methods */}
        <h3 className="section-title mb-4 slideUp" style={{animationDelay: '0.2s'}}>Paid Via</h3>
        <div className="grid grid-cols-3 gap-3 mb-8 slideUp" style={{animationDelay: '0.2s'}}>
          <div className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-primary bg-green-50' : 'border-gray-200'}`} onClick={() => setPaymentMethod('upi')}>
            <Smartphone size={24} className={paymentMethod === 'upi' ? 'text-primary' : 'text-gray-400'} />
            <span className="text-xs font-bold text-center">UPI</span>
          </div>
          <div className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-primary bg-green-50' : 'border-gray-200'}`} onClick={() => setPaymentMethod('bank')}>
            <Building size={24} className={paymentMethod === 'bank' ? 'text-primary' : 'text-gray-400'} />
            <span className="text-xs font-bold text-center">Transfer</span>
          </div>
          <div className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-primary bg-green-50' : 'border-gray-200'}`} onClick={() => setPaymentMethod('wallet')}>
            <Wallet size={24} className={paymentMethod === 'wallet' ? 'text-primary' : 'text-gray-400'} />
            <span className="text-xs font-bold text-center">Wallet</span>
          </div>
        </div>

        {/* Collector Rating */}
        <h3 className="section-title mb-4 text-center slideUp" style={{animationDelay: '0.3s'}}>Rate your collector</h3>
        <div className="flex justify-center gap-2 mb-8 slideUp" style={{animationDelay: '0.3s'}}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              size={36} 
              onClick={() => setRating(star)}
              fill={star <= rating ? "#F39C12" : "transparent"} 
              color={star <= rating ? "#F39C12" : "#D1D5DB"}
              className="cursor-pointer transition-all"
              style={{transform: star <= rating ? 'scale(1.1)' : 'scale(1)'}}
            />
          ))}
        </div>

      </div>

      {/* Bottom Sticky Action */}
      <div className="bottom-action-bar flex gap-4">
        <button className="btn-outline flex-1 py-4 text-primary border-primary">
          <Download size={20} className="mr-2" /> PDF
        </button>
        <button className="btn flex-2 py-4 shadow-lg shadow-green-200" onClick={handleHome}>
          Done
        </button>
      </div>

    </div>
  );
};

export default PaymentReceiptScreen;
