import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, RefreshCw } from 'lucide-react';

const proposalLines = [
  "Will you be the React to my JavaScript?",
  "Are you a WiFi signal? Because I'm feeling a strong connection!",
  "You must be a keyboard, because you're just my type!",
  "Is your name Google? Because you've got everything I've been searching for!",
  "Are you a CSS file? Because you've got great style!",
  "Let's merge our git repositories and commit to forever!",
  "You had me at 'Hello World'!",
  "Are you a loop? Because I want to do this forever with you!"
];

function App() {
  const [currentProposal, setCurrentProposal] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [timeUntilValentines, setTimeUntilValentines] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentYear = now.getMonth() > 1 ? now.getFullYear() + 1 : now.getFullYear();
      const valentines = new Date(currentYear, 1, 14);
      const diff = valentines.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilValentines(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateProposal = () => {
    const randomIndex = Math.floor(Math.random() * proposalLines.length);
    setCurrentProposal(proposalLines[randomIndex]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const generateLetter = () => {
    setGeneratedLetter(`
      Dear Love,

      ${customMessage}

      With all my heart and a bit of nerdy charm,
      Your Valentine 💝
    `);
  };

  const toggleAudio = () => setIsMuted(!isMuted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                backgroundColor: ['#FF69B4', '#FFB6C1', '#FFC0CB'][Math.floor(Math.random() * 3)],
                width: '8px',
                height: '8px',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            The Ultimate Proposal Page
            <Heart className="inline-block ml-2 text-red-500" fill="currentColor" />
          </h1>
          <div className="text-xl text-pink-600 font-semibold">
            Time until Valentine's Day: {timeUntilValentines}
          </div>
        </header>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 mb-8">
          <button
            onClick={generateProposal}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Proposal Line
          </button>
          
          {currentProposal && (
            <div className="text-center text-xl font-medium text-pink-600 my-4 p-4 border-2 border-pink-200 rounded-lg">
              {currentProposal}
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Create Your Love Letter</h2>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Write your heartfelt message here..."
            className="w-full h-32 p-4 border-2 border-pink-200 rounded-lg mb-4 focus:outline-none focus:border-pink-400"
          />
          <button
            onClick={generateLetter}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg mb-4 transition-colors"
          >
            Generate Love Letter
          </button>
          
          {generatedLetter && (
            <div className="whitespace-pre-line text-gray-700 p-4 border-2 border-pink-200 rounded-lg">
              {generatedLetter}
            </div>
          )}
        </div>

        <div className="fixed bottom-4 right-4">
          <button
            onClick={toggleAudio}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            {isMuted ? <VolumeX className="text-gray-600" /> : <Volume2 className="text-gray-600" />}
          </button>
        </div>

        <audio
          loop
          autoPlay
          muted={isMuted}
          className="hidden"
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
      </div>
    </div>
  );
}

export default App;