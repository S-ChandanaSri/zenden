import React from 'react';
import img1 from '../images/landingpage/Logo1.png';
import materialblack from '../images/landingpage/materialblack.png';
import userblack from '../images/landingpage/userblack.png';
import quillblack from '../images/landingpage/quillblack.png';

export default function Navbar() {
  return (
    <div className='flex justify-between items-center  h-[72px]  pt-[15px] pr-[45px] pb-[15px] pl-[55px] shadow-[0px_-1px_1px_0px_#0000001A_inset] bg-[#3D52A0]'>
        <div className='w-[134px] h-[34px] flex'>
          <img src={img1} alt='' className='w-[44px] h-[44px] relative bottom-2.5 ' />
          <p className=' text-white w-[99px] h-[29px] top-[2px] left-[39px] custom-font text-[24px] font-normal leading-[34.34px] text-left '  >ZENDEN</p>
        </div>
        <div className='w-[239px] h-[18px] gap-[30px] flex'>
            <div className='w-[58px] h-[18px] '>
                <p className='text-[#FFFFFF] w-[60.15px] h-[21px] top-[-1px] custo-font text-[14px] font-medium leading-[21px] tracking-[0.2px] text-left '>Services</p>
            </div>
            <div className='w-[63px] h-[18px]'>
                <p className='text-[#FFFFFF] w-[91.26px] h-[21px] top-[-2px] custo-font text-[14px] font-medium leading-[21px] tracking-[0.2px] text-left'>Features</p>
            </div>
            <div className='w-[58px] h-[18px]'>
                <p className='text-[#FFFFFF] w-[65px] h-[21px] top-[-1px] custo-font text-[14px] font-medium leading-[21px] tracking-[0.2px] text-left'>
                About Us
                </p>
            </div>
        </div>
        <div className='flex w-[215px] h-[42px] gap-[20px]'>
            <button className='flex bg-[#FFFFFF] w-[123px]  h-[40px] gap-[10px] pt-[7px] pr-[22px] pb-[8px] pl-[14px] border-[1px] rounded-[5px] border-[#FFFFFF] '>
                <img src={materialblack} alt=''className='w-[24px] h-[24px] ' />
                <p className='text-black '>Login</p>
            </button>
            <button className='flex bg-[#FFFFFF] w-[106px]  h-[42px] gap-[10px] pt-[8px] pr-[22px] pb-[8px] pl-[16px] border-[1px] rounded-[5px] border-[#FFFFFF] '>
                <img src={userblack} alt='' className='w-[28px] h-[26px]' />
                <img src={quillblack} alt='' className='w-[24px] h-[24px]' />

            </button>
        </div>
    </div>
  )
}
