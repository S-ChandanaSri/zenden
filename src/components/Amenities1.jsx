// Amenities1.jsx
import React from 'react';
import plus1 from '../images/landingpage/plus1.png';
import subt1 from '../images/landingpage/subt1.png';

export default function Amenities1({ label, count, handleplus, handleminus }) {
  return (
    <div>
         <div className='flex justify-between w-[667px] h-[38px] relative top-[136px]'>
      <p className='w-[88px] h-[38px] custo-font text-[25px] font-[300] leading-[37.5px] tracking-[0.46px] text-[#000000]'> {label} </p>            
      <div className='flex w-[94px] h-[30px] gap-[12px]'>
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={handleplus}>
          <img src={plus1} className='w-[17.8px] h-[17.8px] relative left-[6.1px]' alt="plus" />
        </button>
        <p className='w-[11px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> {count} </p>            
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={handleminus}>
          <img src={subt1} className='w-[14.24px] h-[14.24px] relative left-[7px] top-[1.63px]' alt="minus" />
        </button>
      </div>
      </div>
    </div>
  );
}
