import React from 'react';
import jhome from '../images/landingpage/jhome.png';


export default function Display() {

    
  return (
    <>
          <div className='flex h-[555px]'>
            <div className='w-[509px] h-[114px] relative top-[-10px] left-[98px] gap-[46px] '>
              <div className='flex flex-col items-center text-left pl-11 pb-3 w-[448px] h-[114px]'>
                <p className='w-[573px] h-[120px] relative top-[224px] left-[163px] custo-font text-[40px] font-[400] leading-[60px] tracking-[0.46px] text-[#000000]'>
                2.Make your place place stand out
                </p>
                <p className='w-[509px] h-[54px] relative top-[224px] left-[133px] custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'>
                Add images ,photos  and cutomize them to make them stand out                    </p>
              </div>
              <img src={jhome} className='h-[571.17px] w-[1000px] relative top-[-106px] left-[692px]' />
            </div>
          </div>
        </>
  )
}
