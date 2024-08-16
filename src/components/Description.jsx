import React,{useState} from 'react';
import peace from '../images/landingpage/peace.png';


export default function Description({listingid}) {

    const[selectedopt,setSelectedOpt]=useState([]);
    const optons = ['Peaceful', 'Central', 'Unique','Family-friendly', 'Spacious', 'Stylish',];

  const handlecolor = (option) => {
    if (selectedopt.includes(option)) {
      setSelectedOpt(selectedopt.filter((item) => item !== option));
    } else if (selectedopt.length < 2) {
      setSelectedOpt([...selectedopt, option]);
    }
  };


    console.log("99999",selectedopt)
        fetch('http://localhost:3001/describeproperty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedopt,id:listingid }),
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
    <div>
      <div className="w-[1166px]">
          <div className="w-[672px] h-[336px] relative top-[150px] left-[470px]">
            <div className="w-[672px] h-[306px]">
              <div className="w-[637px] h-[67px]">
                <p className="w-[637px] h-[34px] custo-font text-[35px] font-[500] leading-[24px] text-[#000000]">
                  Next, Let’s describe your property
                </p>
                <p className="w-[637px] h-[23px] custo-font text-[16px] font-[300] leading-[24px] text-[#000000]">
                  Choose up to 2 highlights. We’ll use this to get your description ready.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-5 w-[449px] h-[81px] relative top-[30px] left-[0px]">
                {optons.map((option, index) => (
                  <div key={index} className="w-[104px] h-[36px]">
                    <button
                      onClick={() => handlecolor(option)}
                      className={`w-[105px] h-[36px] py-[6.12px] px-[12.24px] rounded-[26.31px] border-[0.61px] ${
                        selectedopt.includes(option)
                          ? 'border-pink-700 border-4'
                          : 'border-[#8E98A8]'
                      }`}
                    >
                      <div className="flex h-[22.02px]">
                        <img src={peace} className="w-[22.02px] h-[22.02px]" alt="peace icon" />
                        <p className="w-[123px] h-[15px] custo-font pt-1 text-[9.79px] font-[400] leading-[14.68px] text-[#000000]">
                          {option}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
