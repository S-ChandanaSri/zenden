import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Location() {
    const location = useLocation();
    console.log("llllllllllll",location.state)
    const { listingid } = location.state || {}; 
  return (
    <>
            <div className='flex flex-col items-center h-[670px] relative left-[350px]'>

            <p className=' mb-5 pl-12 w-[640px] h-[53px]  custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'>  Where is your place located ?  </p>
            <div className='w-[894px] h-[555px] rounded-[10px] border-[2px] border-[black] '>

            <iframe 
            id="myMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1963.497964989181!2d78.39467655490265!3d17.342111639967566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97e4568d0269%3A0xc04d946805b3f870!2sVILLAS!5e0!3m2!1sen!2sin!4v1723027917741!5m2!1sen!2sin" 
                width="894" 
                 height="550" 
                style={{ border: '0' }} 
                 allowFullScreen 
                 loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  >
            </iframe>

            </div>
            </div>
          

            </>
  )
}
