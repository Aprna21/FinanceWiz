import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Handle video end event
      const handleVideoEnd = () => {
        navigate('/login');
      };

      // Handle video load event
      const handleVideoLoad = () => {
        setIsVideoLoaded(true);
      };

      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('loadeddata', handleVideoLoad);

      // Start playing the video
      video.play().catch(error => {
        console.error('Error playing video:', error);
        // If video fails to play, redirect to login after a delay
        setTimeout(() => navigate('/login'), 2000);
      });

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        video.removeEventListener('loadeddata', handleVideoLoad);
      };
    }
  }, [navigate]);

  return (
    <div className="welcome-video-container">
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Welcome to FinanceWiz</p>
            <p className="text-gray-300 text-sm">Loading your financial journey...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="welcome-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/Finwiz.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Welcome overlay */}
      <div className="welcome-overlay">
        <div className="welcome-content">
          <h1 className="welcome-title animated-gradient-text italic beautiful-italic">FinanceWiz</h1>
          <p className="welcome-subtitle">Your journey to financial freedom starts here</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 