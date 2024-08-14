import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import imageimage from '../images/landingpage/imageimage.png';
import Group from '../images/landingpage/Group.png';
import Footerpayment from './Footerpayment';
import jhome from '../images/landingpage/jhome.png';
import { useLocation, useNavigate } from 'react-router-dom';




export default function Payment() {

    const [currentstep,setCurrentstep]=useState(0)
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [num, setNum] = useState('');
    const navigate=useNavigate();
    const location = useLocation();
    console.log("location",location.state)
    const { listingid } = location.state || {}; 


    const handleNum=(e)=>{
      setNum(parseInt(e.target.value, 10) || 0);
        }

        
    const handleBack = () => {
        setStep((prevStep) => (prevStep - 1)); 
        if (currentstep > 0) {
          setCurrentstep(prevStep => prevStep - 1);
        }
      };

    const handleNext=()=>{
        if (step === 0) {
            setStep((prevStep) => prevStep + 1);
            setCurrentstep((prevStep) => prevStep + 1);
          }else if(step===1){
            setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);
          }else if(step===2){


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

            setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentstep((prevStep) => prevStep + 1);
          navigate("/propertylisting")
          
        }, 3000);
          }


    }

    const [salary,setSalary]=useState(1000);
  const [addition, setAddition] = useState(0);
    useEffect(() => {
      const calculatedAddition = parseInt(salary, 10) + parseInt(num, 10);
      setAddition(calculatedAddition);
    }, [salary, num]);
  
    const handleSalaryChange = (e) => {
      setSalary(e.target.value);
    };
  
    const handleNumChange = (e) => {
      setNum(e.target.value);
    };

    const [edit,setEdit] = useState(false);

    const handleedit=()=>{
      setEdit(true);
    }

    const decimalDigits=0;

    const onChangehandler=(e)=>{
        setSalary(e.target.value);
    }
    const onBluehandler = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
          setSalary(value.toFixed(decimalDigits));
        }
        setEdit(false);
      };

    

  return (
    <div className='flex flex-col min-h-screen bg-[#FFFFFF]'>
      <Navbar/>
      <div className='flex-grow'>
      <div className='flex items-center '>
        {step === 0 && (
          <>
          <div className='flex h-[555px]'>
            <div className='w-[509px] h-[114px] relative top-[-10px] left-[98px] gap-[46px] '>
              <div className='flex flex-col items-center text-left pl-11 pb-3 w-[448px] h-[114px]'>
                <p className='w-[573px] h-[120px] relative top-[224px] left-[163px] custo-font text-[40px] font-[400] leading-[60px] tracking-[0.46px] text-[#000000]'>
                2.Make your place place stand out
                </p>
                <p className='w-[509px] h-[54px] relative top-[224px] left-[133px] custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'>
                Add images ,photos  and cutomize them to make them stand out                    </p>
              </div>
              <img src={jhome} className='h-[571.17px] w-[1000px] relative top-[-106px] left-[692px]' />
            </div>
          </div>
        </>

        )}
      {step === 1 && (
  <>
    <div className='w-[1166px] '>
      <div className='w-[672px] h-[257px] relative top-[140px] left-[470px] '>
        <div className='w-[672px] h-[306px] '>
          <div className='w-[637px] h-[67px] '>
            <p className='w-[637px] h-[34px] custo-font text-[35px] font-[500] leading-[24px] text-[#000000]'>
              Now set your price
            </p>
            <p className='w-[637px] h-[23px] pt-4 custo-font text-[16px] font-[300] leading-[24px] text-[#000000]'>
              Don’t worry you can change this later
            </p>
          </div>
          {edit ? (
            <TextField
              id="outlined-adornment-amount"
              label="Amount"
              fullWidth
              sx={{ m: 1 }}
              type='number'
              value={salary}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              onChange={onChangehandler}
              onBlur={onBluehandler}
            >
              {salary}
            </TextField>
           
          ) : (
            <div className='relative top-[55px]  flex items-center w-[672px] h-[160px] border-[2px] border-[black]'>
              <img src={imageimage} className='w-[40px] pb-6 pr-1 relative left-[220px] top-[10px]' />
              <p className='w-[145px] h-[49px] custo-font text-[56px] font-[600] leading-[24px] text-[#000000] relative left-[220px] top-[10px]'>{salary}</p>
              <button onClick={handleedit} className='absolute right-[20px] top-[50%] transform -translate-y-1/2'>
                <img src={Group} className='w-[17px] h-[17px]' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
)}

{step === 2 && (
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
      )}

      </div>
      </div>
      <Footerpayment isLoading={isLoading} buttonText="NEXT" onClick={handleNext} onBack={handleBack} step={step} setStep={setStep} currentstep={currentstep}/>

    </div>
  )
}
