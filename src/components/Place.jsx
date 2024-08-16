import React, { useEffect, useState } from 'react';
import phhouse from '../images/landingpage/phhouse.png';
import phbuild from '../images/landingpage/phbuild.png';

export default function Place({ selectedOption, setSelectedOption, setIsLoading, setListingid }) {
    const [color, setColor] = useState("blue");
    const options = ['House', 'Apartment', 'Villa', 'Duplex', 'Penthouse', 'Farmhouse', 'Bungalow', 'Flats', 'Studiohouse'];

    const handleColor = (option) => {
        setColor(option);
        setSelectedOption(option);
    };

    useEffect(() => {
        if (selectedOption) {
            setIsLoading(true);

            fetch('http://localhost:3001/sendplace', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedOption }),
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
                    setListingid(data.id);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error:", err);
                    setIsLoading(false);
                });
        }
    }, [selectedOption, setIsLoading, setListingid]);

    return (
        <>
            <div className='flex flex-col items-center h-[670px] relative left-[450px]'>
                <div className='w-[573px] h-[106px] relative top-[28px] gap-[46px]'>
                    <p className='w-[573px] h-[106px] custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000] text-center'>
                        Which of these best describes your place?
                    </p>
                </div>
                <div className='grid grid-cols-3 gap-8 w-[590px] pt-12'>
                    {options.map((option, index) => (
                        <div key={index} className='h-[133px] gap-[10px]'>
                            <button
                                onClick={() => handleColor(option)}
                                className={`h-[133px] w-[186px] rounded-[7px] border-[1px] py-[29px] px-[15px] gap-[10px] ${color === option ? 'border-blue-700 border-[5px]' : 'border-[#8E98A8]'}`}
                            >
                                <div className='w-[90px] h-[96px] gap-[10px]'>
                                    <img src={option === 'House' ? phhouse : phbuild} className='w-[48px] h-[48px]' />
                                    <p className='w-[80px] h-[38px] custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>{option}</p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
              
            </div>
        </>
    );
}
