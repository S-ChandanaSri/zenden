import React from 'react';
import plus1 from '../images/landingpage/plus1.png';
import subt1 from '../images/landingpage/subt1.png';

export default function Amenities2({label1,label2,handleminus,handleplus,count}) {
  return (
    <div>
      <div className='flex justify-between w-[667px] h-[38px] relative top-[106px]'>
              <div>
              <p className='w-[210px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> {label1} </p>    
              <p className='w-[329px] h-[38px] custo-font text-[12px] font-[300] leading-[18px] tracking-[0.46px] pt-1 text-[#000000]'>{label2}</p>                    
              </div>
              <div className='flex w-[94px] h-[30px] gap-[12px]'>
              <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]'onClick={handleminus}>
                  <img src={subt1} className='w-[14.24px] h-[14.24px] relative left-[7px] top-[1.63px]' />
                </button>
                <p className='w-[11px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> {count} </p>            
                <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]'onClick={handleplus}>
                  <img src={plus1} className='w-[14.24px] h-[14.24px] relative left-[7px] top-[1.63px]' />
                </button>
              </div>
            </div>
    </div>
  )
}
