import React, { useEffect, useState } from 'react';
import house from '../images/landingpage/house.png';
import room from '../images/landingpage/room.png';
import cilroom from '../images/landingpage/cilroom.png';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Placetype({ listingid }) { 
    const [placetype, setPlacetype] = useState(null);

    const handletype = (firstoption) => () => {
        setPlacetype(firstoption);
    };

    useEffect(() => {
        if (placetype && listingid) {
            fetch('http://localhost:3001/placetype', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ placetype, id: listingid }),
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
        }
    }, [placetype, listingid]);

    return (
        <>
            <div className='flex flex-col items-center h-[670px] relative left-[450px]'>
                <div className='w-[640px] h-[106px] relative top-[55px] gap-[46px] '>
                    <p className='w-[640px] h-[53px] custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000] text-center'>
                        What type of place will guest have?
                    </p>
                </div>
                <div className='flex flex-col items-center'>
                    <button
                        onClick={handletype('an entire place')}
                        className={`w-[666px] h-[135px] py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[44px] left-[7px] ${placetype === "an entire place" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'}`}
                    >
                        <div className='flex items-center pt-5 w-[620px] h-[74px] gap-[161px]'>
                            <div className='w-[401px] h-[74px] gap-[9px]'>
                                <p className='text-left w-[401px] h-[38px] custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>
                                    An entire place
                                </p>
                                <p className='w-[401px] h-[27px] custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] text-center'>
                                    Guest will have whole place to live or enjoy
                                </p>
                            </div>
                            <img src={house} className='w-[58px] h-[58px]' />
                        </div>
                    </button>
                    <button
                        onClick={handletype('a room')}
                        className={`w-[666px] h-[135px] py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[68px] left-[7px] ${placetype === "a room" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'}`}
                    >
                        <div className='flex items-center pt-2 w-[620px] h-[74px] gap-[161px]'>
                            <div className='w-[401px] h-[74px] gap-[9px]'>
                                <p className='text-left w-[401px] h-[38px] custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>
                                    A room
                                </p>
                                <p className='w-[401px] h-[27px] custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-left'>
                                    Guest will have only a small part of the house to live or enjoy
                                </p>
                            </div>
                            <img src={cilroom} className='w-[58px] h-[58px]' />
                        </div>
                    </button>
                    <button
                        onClick={handletype('a shared room')}
                        className={`w-[666px] h-[135px] py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[90px] left-[7px] ${placetype === "a shared room" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'}`}
                    >
                        <div className='flex items-center pt-5 w-[620px] h-[74px] gap-[161px]'>
                            <div className='w-[401px] h-[74px] gap-[9px]'>
                                <p className='text-left w-[401px] h-[38px] custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>
                                    A shared room
                                </p>
                                <p className='text-left w-[601px] h-[27px] custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'>
                                    Guest will have a shared place to live or enjoy
                                </p>
                            </div>
                            <img src={room} className='w-[58px] h-[58px]' />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
