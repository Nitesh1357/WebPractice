import React, { useState } from 'react';
import { Mail, RefreshCw, X } from 'lucide-react';

const greetings = [
  "Best wishes for your day! 🌟",
  "May your day be filled with joy! 🌈",
  "Sending you positive vibes! ✨",
  "Hope your day is as wonderful as you are! 🌺",
  "Wishing you a day full of smiles! 😊",
  "Here's to making today amazing! 🎉",
  "May happiness find you today! 🍀",
  "Sending sunshine your way! ☀️",
];

function App() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState('');

  const handleRefresh = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 2000);
  };

  const handleOpenMailbox = () => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setCurrentGreeting(randomGreeting);
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            Daily Well Wishes
          </h1>
          <p className="text-lg text-gray-600">
            Open the mailbox to receive your daily dose of positivity!
          </p>
        </header>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <button
              onClick={handleRefresh}
              className="mb-8 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>

            <div className="relative inline-block">
              <Mail 
                className={`w-24 h-24 text-indigo-500 mx-auto mb-6 transition-transform ${
                  isBlinking ? 'animate-bounce' : ''
                }`}
              />
              <button
                onClick={handleOpenMailbox}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Open Mailbox
              </button>
            </div>
          </div>
        </div>

        {/* Popup Message */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-fadeIn">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <div className="text-2xl font-semibold text-indigo-600 mb-4">
                  Your Special Message
                </div>
                <p className="text-xl text-gray-700">
                  {currentGreeting}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;