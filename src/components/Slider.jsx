import React from 'react';

export default function Slider({ min, max, value, handleChange }) {
  return (
    <div className='slider-container'>
      <input 
        type='range' 
        className='w-[100%] cursor-pointer' 
        min={min} 
        max={max} 
        value={value} 
        onChange={handleChange}
        style={{
          accentColor: '#002855', 
          '--tw-bg-opacity': '1', 
          background: 'linear-gradient(to right, #002855, #002855)', 
          height: '8px', 
        }}
      />
    </div>
  );
}