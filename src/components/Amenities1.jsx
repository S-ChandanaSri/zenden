// Amenities1.jsx
import React,{useState} from 'react';
import plus1 from '../images/landingpage/plus1.png';
import subt1 from '../images/landingpage/subt1.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Amenities1({listingid}) {

  const [isClicked, setIsClicked] = useState(null);
  const [countguests, setCountGuests] = useState(0);
  const [countBedrooms, setCountBedrooms] = useState(0);
  const [countBeds, setCountBeds] = useState(0);

  const handleClick = (button) => {
    setIsClicked(button); 
  };


  if (listingid) {
    console.log("sssssssssssssss:", listingid);
  }

  fetch('http://localhost:3001/amenities1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ countguests, countBedrooms, countBeds, isClicked, idd: listingid }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.text().then(text => {
      throw new Error(text);
    });
  })
  .then((data) => {
    console.log("Response data:", data);
    console.log("success");
  })
  .catch((err) => console.error("Error:", err));





  return (
    <>

<div className='flex flex-col items-center h-[670px] relative left-[350px]'>
        <div className='border-[black] w-[1166px] h-[914px] rounded-[15px]'>
          <p className='w-[392px] h-[53px] relative top-[30px] custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'> Let’s start with basics </p> 
          <p className='w-[322px] h-[27px] relative top-[70px] custo-font text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]'> How many people can stay here? </p>            
          <div className='relative top-[30px]'>
            

          <div className='flex justify-between w-[667px] h-[38px] relative top-[106px]'>
      <p className='w-[88px] h-[38px] custo-font text-[25px] font-[300] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Guests </p>            
      <div className='flex w-[94px] h-[30px] gap-[12px]'>
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={() => setCountGuests(countguests + 1)}>
          <img src={plus1} className='w-[17.8px] h-[17.8px] relative left-[6.1px]' alt="plus" />
        </button>
        <p className='w-[11px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> {countguests} </p>            
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={()=>setCountGuests(countguests - 1)}>
          <img src={subt1} className='w-[14.24px] h-[14.24px] relative left-[7px] top-[1.63px]' alt="minus" />
        </button>
      </div>
      </div>

      <div className='w-[667px] relative top-[112px] left-[2px] border-[1px] border-[#8E98A8]'></div>

      <div className='flex justify-between w-[667px] h-[38px] relative top-[142px]'>
      <p className='w-[88px] h-[38px] custo-font text-[25px] font-[300] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Bedrooms </p>            
      <div className='flex w-[94px] h-[30px] gap-[12px]'>
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={() => setCountBedrooms(countBedrooms + 1)}>
          <img src={plus1} className='w-[17.8px] h-[17.8px] relative left-[6.1px]' alt="plus" />
        </button>
        <p className='w-[11px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> {countBedrooms} </p>            
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={() => setCountBedrooms(countBedrooms - 1)}>
          <img src={subt1} className='w-[14.24px] h-[14.24px] relative left-[7px] top-[1.63px]' alt="minus" />
        </button>
      </div>
      </div>
      <div className='w-[667px] relative top-[153px] left-[2px] border-[1px] border-[#8E98A8]'></div>

      <div className='flex justify-between w-[667px] h-[38px] relative top-[180px]'>
      <p className='w-[88px] h-[38px] custo-font text-[25px] font-[300] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Beds </p>            
      <div className='flex w-[94px] h-[30px] gap-[12px]'>
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={() => setCountBeds(countBeds + 1)}>
          <img src={plus1} className='w-[17.8px] h-[17.8px] relative left-[6.1px]' alt="plus" />
        </button>
        <p className='w-[11px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> {countBeds} </p>            
        <button className='w-[30px] h-[30px] border-[0.51px] border-[#000000] rounded-[50%]' onClick={() => setCountBeds(countBeds - 1)}>
          <img src={subt1} className='w-[14.24px] h-[14.24px] relative left-[7px] top-[1.63px]' alt="minus" />
        </button>
      </div>
      </div>
      
      <div className='w-[667px] relative top-[190px] left-[2px] border-[1px] border-[#8E98A8]'></div>

      

          </div>
          </div>

          <div className='w-[460px] h-[174px] relative top-[-40px] left-[-350px]'>
          <p className='w-[490px] h-[54px] custo-font text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]'> Do bedroom have separate locks or connected to each other? </p>            
          <div className='w-[432px] h-[87px]'>
            <div className='w-[432px] h-[27px] flex justify-between pt-4'>
              <p className='w-[147px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> Separate Lock </p> 
              <button
          onClick={() => handleClick(0)}
          className={`w-[25px] h-[25px] border-[2px] border-[#002855] rounded-[50%] ${isClicked === 0 ? 'bg-blue-800' : ''}`} ></button>            </div>
            <div className='w-[432px] h-[27px] flex justify-between pt-8'>
              <p className='w-[147px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'>  Connected to eachother </p> 
              <button
          onClick={() => handleClick(1)}
          className={`w-[25px] h-[25px] border-[2px] border-[#002855] rounded-[50%] ${isClicked === 1 ? 'bg-blue-800' : ''}`}></button>            </div>
          </div>
        </div>
       </div>



         
    </>
  );
}
