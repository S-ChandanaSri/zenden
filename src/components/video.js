import React, { useState, useRef } from 'react';
import buttonplay1 from '../images/landingpage/buttonplay1.png';
import icon2 from '../images/landingpage/Icon2.png';

function VideoPlayer({ src, title, subtitle }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='w-[338px] h-[568px] border-white mb-4'>
      <div className="grid-btn">
        <div className="relative pt-24 w-[338px] h-[568px]">
          <video className='rounded-[20px] w-[316px] h-[568px]' ref={videoRef}>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button 
            className="transform -translate-x-1/2 -translate-y-1/2 btn" 
            onClick={handlePlay}
          >
            <p className='h-[24px] relative bottom-[15px] text-white custo-font font-[600] text-[18px] leading-[24px] tracking-[-0.5px]'>{title}</p>
            <p className='h-[22px] relative bottom-[14px] text-white custo-font font-[400] text-[14px] leading-[22px]'>{subtitle}</p>
            <div className='w-[58px] h-[58px] rounded-[19px] relative left-[190px] bottom-[66px] bg-[#FFFFFF17] border-[2px] border-[white]'>
              <img src={isPlaying ? icon2 : buttonplay1} className='rounded-[19px] relative left-[20px] top-[20px] bg-[#FFFFFF17]' />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
