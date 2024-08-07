import React, { useEffect, useState } from 'react';
import outline from '../images/landingpage/outline.png';
import arrowd from '../images/landingpage/arrowd.png';
import Vector from '../images/landingpage/Vector.png';
import plus from '../images/landingpage/plus.png';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Listing() {


    const[listt,setListt]=useState([]);
    const [query,setQuery]=useState("");

    useEffect(()=>{
        fetch('http://localhost:3001/listings')
    .then(response=>response.json())
    .then(data=>{
        console.log("l",data);
        setListt(data);
        
    })
    .catch(error => console.error('Error fetching data:', error));
    },[])

    let lastId = null;

  for (const item of listt) {
    if (lastId === null || item.id > lastId) {
      lastId = item.id;
    }
  }

  const filteredList = listt.filter((dat) => dat.listing.toLowerCase().includes(query.toLowerCase()));
  const remainingRows = 5 - filteredList.length;

  return (
    <div className='h-[1124px] top-[1162px] left-[230px] bg-[#FFFFFF] '>

      <Navbar/>



    <p className='w-[122px] h-[38px] relative top-[30px] left-[83px] custo-font font-[400] text-[25px] leading-[37.5px] tracking-[0.46px] text-[#000000]'>{lastId }listings</p>
    <div className='flex'>
        <div className='w-[356px] h-[30px] relative top-[35px] left-[73px] rounded-[14px] border-[1px] px-[10px] py-[4px] gap-[10px] border-[#8E98A8]  '>
            <div className='flex w-[139px] h-[18px] gap-[3px] '>
            <img src={outline} className='w-[13px] h-[13px] ' />
            <input placeholder='search listings' value={query} onChange={(e) => setQuery(e.target.value)}  className='custo-font font-[300] text-[16px] leading-[24px] tracking-[0.46px] w-[123px] h-[18px] text-[#002855] border-0 focus:border-0 focus:outline-none '/>
            </div> 
        </div>
        <div className='w-[166px] h-[30px] relative top-[35px]  left-[91px] rounded-[14px] border-[1px] px-[8px] gap-[10px] border-[#8E98A8] '>
            <div className='flex w-[149px] h-[18px] gap-[5px] '>
                <p className='w-[128px] h-[18px] custo-font font-[300] text-[14px] leading-[21px] tracking-[0.46px] text-[#002855CC] '>Rooms and beds</p>
                <img src={arrowd} className=' w-[16px] h-[16px]'  />
            </div>
        </div>
        <div className='w-[122px] h-[30px]  relative top-[35px] left-[121px] rounded-[14px] border-[1px] px-[8px] gap-[10px] border-[#8E98A8] '>
            <div className='flex w-[106px] h-[18px] gap-[5px] '>
                <p className='w-[87px] h-[18px] custo-font font-[300] text-[14px] leading-[21px] tracking-[0.46px] text-[#002855CC] '>Ammenities</p>
                <img src={arrowd} className=' w-[16px] h-[16px]'  />
            </div>
        </div>
        <div className='w-[164px] h-[30px]  relative top-[35px] left-[153px] rounded-[14px] border-[1px] px-[8px] gap-[10px] border-[#8E98A8] '>
            <div className='flex w-[144px] h-[18px] gap-[5px] '>
                <p className='w-[137px] h-[18px] custo-font font-[300] text-[14px] leading-[21px] tracking-[0.46px] text-[#002855CC] '>Listing status</p>
                <img src={arrowd} className=' w-[16px] h-[16px]'  />
            </div>
        </div>

        <Link to="/listing">
        <button className='flex w-[149px] h-[38px] relative top-[28px] left-[477px] rounded-[8px] py-[10px] px-[16px] bg-[#002855] '>
          <img src={plus}  className='w-[24px] h-[24px] '   />
          <p className='w-[87px] h-[20px] inter-font font-[500] text-[14px] leading-[20px] text-[white]  '>create listing</p>

        </button>
       </Link>
        
    </div>



    <div className="w-[1355px] h-[942px] bg-[#FFFFFF] relative top-[57px] left-[83px] rounded-[4px] px-[40px] gap-[32px]">
  <div className="w-[1315px] h-[878px] rounded-[4px]">
    <div className="w-[244px] h-[878px]">
      <table className="w-[1315px] h-[878px] border-collapse">
        <thead>
          <tr>
            <th className="w-[244px] h-[59.33px] p-[8px] border-b border-[#E7EAEE]">Listings</th>
            <th className="w-[244px] h-[59.33px] p-[8px] border-b border-[#E7EAEE]">Status</th>
            <th className="w-[116px] h-[59.33px] p-[8px] border-b border-[#E7EAEE]">Todo</th>
            <th className="w-[116px] h-[59.33px] p-[8px] border-b border-[#E7EAEE]">Bedrooms</th>
            <th className="w-[116px] h-[59.33px] p-[8px] border-b border-[#E7EAEE]">Baths</th>
            <th className="w-[116px] h-[59.33px] p-[8px] border-b border-[#E7EAEE]">Location</th>
            <th className="w-[128px] h-[59.33px] p-[8px] border-b border-[#E7EAEE] ">Edit</th>
          </tr>
        </thead>
        <tbody>
                {filteredList.map((dat) => (
                  <tr key={dat.id}>
                    <td className="flex items-center justify-around w-[244px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]">
                      <img src={dat.image} alt={dat.listing} className="w-[100px] h-auto" />
                      <p>{dat.listing}</p>
                    </td>
                    <td className="w-[244px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]">{dat.status}</td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]">{dat.todo}</td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]">{dat.bedrooms}</td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]">{dat.baths}</td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]">{dat.location}</td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE] relative left-[55px]">
                      <img src={Vector} alt="edit icon" />
                    </td>
                  </tr>
                ))}
                {remainingRows > 0 && Array.from({ length: remainingRows }).map((_, idx) => (
                  <tr key={`placeholder-${idx}`}>
                    <td className="flex items-center justify-around w-[244px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]"></td>
                    <td className="w-[244px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]"></td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]"></td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]"></td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]"></td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE]"></td>
                    <td className="w-[116px] h-[136.33px] p-[8px] border-b border-[#E7EAEE] relative left-[55px]"></td>
                  </tr>
                ))}
              </tbody>
      </table>
    </div>
  </div>
</div>



    </div>

  )
}
