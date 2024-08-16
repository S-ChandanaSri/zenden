import React,{useState,useEffect} from 'react';
import imageimage from '../images/landingpage/imageimage.png';


export default function Pay({listingid}) {

    const [num, setNum] = useState('');
    const [salary,setSalary]=useState(1000);
    const [addition, setAddition] = useState(0);
    useEffect(() => {
      const calculatedAddition = parseInt(salary, 10) + parseInt(num, 10);
      setAddition(calculatedAddition);
    }, [salary, num]);

    const handleNumChange = (e) => {
        setNum(e.target.value);
      };
    console.log("add",addition)

            fetch('http://localhost:3001/pay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ addition,id:listingid }),
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
    <div className='w-[1166px] '>
      <div className='w-[672px] h-[508px] relative top-[80px] left-[470px]  '>
        <div className='w-[637px] h-[67px]  '>
          <p className='w-[637px] h-[34px] custo-font text-[35px] font-[500] leading-[24px] text-[#000000]'>
            Now set your price
          </p>
          <p className='w-[637px] h-[23px] custo-font text-[16px] font-[300] leading-[24px] text-[#000000]'>
            Don’t worry you can change this later
          </p>
        </div>
        <div className='w-[672px] h-[481px] flex flex-col items-center  '>
          <div className='relative top-[50px] flex items-center w-[185px] h-[49px]'>
            <img src={imageimage} className='w-[40px] pb-6 pr-1  ' />
            <p className='w-[145px] h-[49px] custo-font text-[56px] font-[600] leading-[24px] text-[#000000]'>
              {salary}
            </p>
          </div>
          <div className='w-[672px] h-[191px] border-[2px] border-[#000000B2] relative top-[80px] '>
            <div className='w-[647px] h-[61px] flex justify-between items-center  pl-3 '>
              <p className='w-[84px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] text-[#000000]'>
                Base price
              </p>
              <p className='w-[85px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] text-[#000000]'>
                {salary}
              </p>
            </div>
            <div className='w-[671px] border-[1px] border-[#8E98A8] '></div>
            <div className='w-[647px] h-[61px] flex justify-between items-center  pr-3  '>
              <p className='w-[89px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] pl-2 text-[#000000]'>
                Guest fee
              </p>
              <input
                value={num}
                onChange={handleNumChange}
                className='w-[85px] pl-3 focus:outline-none h-[24px] custo-font text-[16px] font-[400] leading-[24px] text-[#000000]'
              />
            </div>
            <div className='w-[671px] border-[1px] border-[#8E98A8] '></div>
            <div className='w-[647px] h-[24px] flex justify-between pt-5 pl-3  '>
              <p className='w-[145px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] text-[#000000]'>
                Total before taxes
              </p>
              <p className='w-[85px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] text-[#000000]'>
                {addition}
              </p>
            </div>
          </div>
          <div className='w-[672px] h-[64px] border-[2px] border-[black] relative top-[90px] ' >
            <div className='w-[672px] h-[64px]'>
              <div className='w-[647px] h-[24px] flex justify-between pt-5 pl-3 '>
                <p className='w-[145px] pl-3 h-[24px] custo-font text-[16px] font-[400] leading-[24px] text-[#000000]'>
                  You Earn
                </p>
                <p className='w-[85px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] text-[#000000]'>
                  {addition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
