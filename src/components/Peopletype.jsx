import React,{useState} from 'react';
import people from '../images/landingpage/people.png';
import peopleline from '../images/landingpage/peopleline.png';
import peoplesharp from '../images/landingpage/peoplesharp.png';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Peopletype({listingid}) {
    const[peopletype,setPeopletype]=useState(null);
    

    const handlepeople=(secondoption)=>()=>{
        setPeopletype(secondoption);
      }
      fetch('http://localhost:3001/peopletype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ peopletype, id: listingid }),
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
          console.log("success")
        })
        .catch((err) => console.error("Error:", err));

  return (
    <>
  <div className='flex flex-col relative left-[252px] rounded-[15px] '>
    <div className='w-[668px] h-[80px] relative top-[-80px] left-[0px] '>
    <p className='w-[523px] h-[53px] relative custo-font text-[35px] font-[400]  leading-[52.5px] tracking-[0.46px] text-[#000000]'> Who else might be there ? </p>            
    <p className='w-[548px] h-[27px] relative custo-font text-[18px] font-[300] pt-2 leading-[27px] tracking-[0.46px] text-[#000000]'> Guest need to know whether they will encounter with other people there </p>            
    </div>
    <div className=' grid grid-cols-3 gap-4'>

      <button onClick={handlepeople('me')} className={`h-[133px] w-[186px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${peopletype === "me" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `}>
        <div className='w-[90px] h-[94px] ga-[10px] relative left-6 '>
          <img src={people} className='w-[48px] h-[48px] '  />
          <p className='w-[80px] h-[36px] relative custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] text-[#000000] pr-10'> Me </p>            

        </div>
      </button>
      <button onClick={handlepeople('family')} className={`h-[133px] w-[206px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center  ${peopletype === "family" ? 'border-blue-700 border-[5px]' : 'border-[#8E98A8]'} `} >
        <div className='w-[90px] h-[94px] ga-[10px] '>
          <img src={peopleline} className='w-[48px] h-[48px] relative left-[10px] '  />
          <p className='w-[160px] h-[36px] relative right-[25px]  custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] pr-10 text-[#000000]'> My family </p>            

        </div>
      </button>
      <button onClick={handlepeople('other')} className={`h-[133px] w-[210px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${peopletype === "other" ? 'border-blue-700 border-[5px]' : 'border-[#8E98A8]'} `} >
        <div className='w-[80px] h-[94px] ga-[10px] '>
          <img src={peoplesharp} className='w-[48px] h-[48px] relative left-[10px] '  />
          <p className='w-[200px] h-[36px] relative right-[45px]  custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] text-[#000000] pr-5 '> Other guests </p>            

        </div>
      </button>
      <button onClick={handlepeople('roomates')} className={`h-[133px] w-[186px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${peopletype === "roomates" ? 'border-blue-700 border-[5px]' : 'border-[#8E98A8]'} `} >
        <div className='w-[80px] h-[94px] ga-[10px] '>
          <img src={peoplesharp} className='w-[39px] h-[39px] relative left-[10px] '  />
          <p className='w-[80px] h-[36px] relative right-[20px] custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] text-[#000000]'> Roomates </p>            

        </div>
      </button>
    </div>
  </div>
  </>
  )
}
