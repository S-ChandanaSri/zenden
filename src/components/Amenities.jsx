import React,{useState} from 'react';
import wifi from '../images/landingpage/wifi.png';
import washer from '../images/landingpage/washer.png';
import park from '../images/landingpage/park.png';
import free from '../images/landingpage/free.png';
import kitchen from '../images/landingpage/kitchen.png';
import workplace from '../images/landingpage/workplace.png';
import tv from '../images/landingpage/tv.png';
import ac from '../images/landingpage/ac.png';
import pool from '../images/landingpage/pool.png';
import patio from '../images/landingpage/patio.png';
import tub from '../images/landingpage/tub.png';
import piano from '../images/landingpage/piano.png';
import table from '../images/landingpage/table.png';
import exercise from '../images/landingpage/exercise.png';
import beach from '../images/landingpage/beach.png';
import indoor from '../images/landingpage/indoor.png';
import outdoor from '../images/landingpage/outdoor.png';
import { useLocation, useNavigate } from 'react-router-dom';



export default function Amenities({listingid}) {


    const [selectedoption,setSelectedOption]=useState([]);
   

    const options = [
        { label: "WiFi", img: wifi },
        { label: "TV", img: tv },
        { label: "Kitchen", img: kitchen },
        { label: "Washer", img: washer },
        { label: "Free Parking", img: free },
        { label: "Paid parking", img: park },
        { label: "Air Conditioning", img: ac },
        { label: "Workplace", img: workplace }
      ];

      const options1 = [
        { label: "Pool", img: pool },
        { label: "Patio", img: patio },
        { label: "Hot tub", img: tub },
        { label: "Piano", img: piano },
        { label: "Pool table", img: table },
        { label: "Exercise equipment", img: exercise },
        { label: "Beach access", img: beach },
        { label: "Indoor fireplace", img: indoor },
        { label: "Outdoor dining area", img: outdoor },
      ];
      
      const options3 = [
        { label: "Fire kit", img: wifi },
        { label: "Smoke alarm", img: tv },
        { label: "Fire extinguisher", img: kitchen },
        { label: "Carbon monoxide alarm", img: washer }
      ];



    const handleClick = (option) => {
        if (selectedoption.includes(option.label)) {
            setSelectedOption(selectedoption.filter((item) => item !== option.label));
        } else {
            setSelectedOption([...selectedoption, option.label]);
        }
    };
    
      const handleClick1=(option1)=>{
        if (selectedoption.includes(option1.label)) {
            setSelectedOption(selectedoption.filter((item) => item !== option1.label));
        } else {
            setSelectedOption([...selectedoption, option1.label]);
        }
      }
      const handleClick3=(option3)=>{
        if (selectedoption.includes(option3.label)) {
            setSelectedOption(selectedoption.filter((item) => item !== option3.label));
        } else {
            setSelectedOption([...selectedoption, option3.label]);
        }
      }

    fetch('http://localhost:3001/amenities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedoption,id:listingid }),
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
         
          console.log("success",data.id);

        })
        .catch((err) => console.error("Error:", err));
  return (
    <>
            <div className=' h-[1770px]'>
            <div className='flex flex-col relative left-[412px] top-[140px] rounded-[15px]'>
  <div className='w-[688px] relative top-[-70px]'>
    <p className='w-[896px] text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'>
    Tell the guest what your place has to offer
    </p>
    <p className='w-[688px] text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] pt-3'>
    You can add more amenities after you publish your listings     </p>
  </div>
  
  <div className='grid grid-cols-3 gap-5'>
  {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className={`h-[133px] w-[226px] rounded-[7px] border-[1px] py-[29px] px-[15px] flex flex-col items-center ${selectedoption.includes(option.label)  ? 'border-blue-500 border-[7px]' : 'border-[#8E98A8]'}`}
        >
          <div className='w-[90px] h-[88px] flex flex-col items-center'>
            <img src={option.img} alt={option.label} className='w-[48px] h-[48px] relative bottom-2' />
            <p className='w-[180px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
              {option.label}
            </p>
          </div>
        </button>
      ))}
      </div>
        </div>



        <div className='flex flex-col relative left-[412px] top-[140px] rounded-[15px]'>
  <div className='w-[688px] relative top-[70px]'>
    
    <p className='w-[417px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
    Do you have any standout amenities ?   </p>
  </div>
  
  <div className='grid grid-cols-3 gap-5'>
    {
  options1.map((option1, index) => (
        <button key={index} onClick={() => handleClick1(option1)} className={`h-[133px] w-[226px] relative top-[140px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${selectedoption.includes(option1.label) ? 'border-blue-500 border-[7px]' : 'border-[#8E98A8]'}`}>
          <div className=' w-[90px] h-[88px] flex flex-col items-center '>
            <img src={option1.img} className='w-[48px] h-[48px] relative bottom-2  '  />
            <p className=' w-[180px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
              {option1.label}
            </p>
          </div>
        </button>
      ))}
  </div>
</div>


<div className='flex flex-col relative left-[412px] top-[140px] rounded-[15px]'>
<div className='w-[688px] relative top-[220px]'>
    
    <p className='w-[417px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
    Do you have any standout amenities ?   </p>
  </div>
  
  <div className='grid grid-cols-3 gap-5'>
    {
  options3.map((option3, index) => (
        <button key={index} onClick={() => handleClick3(option3)} className={`h-[133px] w-[226px] relative top-[270px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${selectedoption.includes(option3.label)? 'border-blue-500 border-[7px]' : 'border-[#8E98A8]'}`}>
          <div className=' w-[90px] h-[88px] flex flex-col items-center '>
            <img src={option3.img} className='w-[48px] h-[48px] relative bottom-2  '  />
            <p className=' w-[180px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
              {option3.label}
            </p>
          </div>
        </button>
      ))}
  </div>
</div>

            </div>
            </>
  )
}
