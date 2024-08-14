import React,{useState} from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function Footerpayment({ isLoading, buttonText, onClick, onBack, currentstep }) {

    const navigate = useNavigate();
  const handleBackButton = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); 
    }
  };
  

  const totalSteps = 3;
 

  const progressPercentage = (currentstep / totalSteps) * 100;
  return (
    <>
  <div className='w-full h-[5px] bg-[#E0E0E0] relative'>
    <div style={{ width: `${progressPercentage}%` ,
     transition: 'width 0.5s ease-in-out', 
     backgroundColor: "", 
     borderTop: '2px solid #8E98A8',}} 
      className='absolute top-0 left-0 h-full bg-[#002855] border-t-2 border-[#8E98A8]' 
    ></div>
  </div>
  <div className='w-full bg-[#FFFFFF]'>
    <div className='flex justify-between items-center px-4 py-2'>
      <button 
        onClick={handleBackButton} 
        className='w-[153px] h-[60px] bg-[#CCCCCC] py-[16px] px-[28px] rounded-[8px]'>
        <p className='text-[#000000] text-[18px] font-[400] leading-[27px]'>Back</p>
      </button>
      <button 
        onClick={onClick} 
        className='w-[153px] h-[60px] bg-[#002855] py-[16px] px-[28px] rounded-[8px] flex items-center justify-center'>
        {
          isLoading ? (
            <ThreeDots height="40" width="40" radius="9" color="white" ariaLabel="three-dots-loading" visible={true}/>
          ) : (
            <p className='text-[#FFFFFF] text-[18px] font-[400] leading-[27px]'>{buttonText}</p>
          )
        }
      </button>
    </div>
  </div>
</>
  )
}
