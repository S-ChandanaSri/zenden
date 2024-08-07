import React,{useState} from 'react';
import rectangle from '../images/landingpage/rectangle.png';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { ThreeDots } from 'react-loader-spinner'; 


export default function Listings() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlebutton=()=>{
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
            navigate('/steps');
        },3000)
    }

  return (
    <div className='h-[1124px]  bg-[#FFFFFF] '>

        <Navbar/>


    <div className='flex justify-evenly items-center'>
        <div className=' w-[461px] h-[373px] relative top-[110px] left-[84px] gap-[8px] '>
            <div className='flex flex-col items-center w-[420px] h-[190px] '>
            <p className=' w-[420px] h-[107px] relative left-[10px] top-[-1px] custom-font text-[75px] font-[400] leading-[107.3px] tracking-[0.46px]  text-[#002855] '>ZENDEN</p>
            <p className=' w-[420px] h-[83px] relative right-[45px] top-[-1px] custo-font text-[55px] font-[400] leading-[82.5px] tracking-[0.46px] text-[#000000]'>You could earn</p>
            </div>
            <div className='flex flex-col items-center w-[335px] h-[110px] '>
            <p className='w-[335px] h-[83px] top-[-1px] relative left-[60px] custo-font text-[55px] font-[400] leading-[82.5px]   text-[#002855] '>50,000</p>
            <p className='w-[335px] h-[27px] top-[-1px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000] '>7nights at an estimated 5000/night</p>
            </div>
            <div className='w-[461px] h-[107px] gap-[10px] '>
            <p className='w-[465px] h-[27px] top-[-1px] custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-left text-[#000000] '>Learn how we estimate your earnings</p>
            </div>
            
            <button onClick={handlebutton} className='w-[174px] h-[60px] relative top-[-20px] left-[65px]  rounded-[8px] border-[1px] border-[#6941C6] bg-[#002855] gap-[8px]  '>
                {isLoading ? (
                    <ThreeDots  height="40" width="40" radius="9" color="white" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="flex justify-center items-center"  visible={true}/>
                )  : (    
                <p className='w-[218px] h-[28px] relative top-[4px] right-4 inter-font text-[18px] font-[400] leading-[18px] tracking-[0.46px]  text-[white] '>ZENDEN SETUP</p>
                )}
            </button>
       
            
        </div>
        <div className='w-[804px] h-[827px] relative top-[149px] left-[45px] rounded-[15px] border-[#D9D9D9] '>
            <img src={rectangle}  />
        </div>
    </div>









    </div>

  )
}
