import React,{useState,useEffect, useRef} from 'react';
import Navbar from './Navbar';
import jhome from '../images/landingpage/jhome.png';
import { useLocation, useNavigate } from 'react-router-dom';

import Footerimages from './Footerimages';
import Amenities from './Amenities';
import { ImageList } from '@mui/material';
import Title from './Title';
import Description from './Description';
import Describe from './Describe';
import Imageslist from './Imageslist';
import Display from './Display';



 


export default function Imagesstep() {

  const navigate=useNavigate();
  const [currentstep,setCurrentstep]=useState(0);
  

 

  const handleBack = () => {
    setStep((prevStep) => (prevStep - 1)); 
    if (currentstep > 0) {
      setCurrentstep(prevStep => prevStep - 1);
    }
  };

  
  const [dragId, setDragId] = useState();
    const location = useLocation();
    console.log("llllllllllll",location.state)
    const { listingid } = location.state || {}; 
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [click,setClick]=useState("");
    
      
  const handleNext = () => {
    if (step === 0) {
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }else if(step===1){
        console.log("ll",listingid)
        
          
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);
      }
      else if(step===2){
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);

      }else if(step===3){  
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);
      }else if(step===4){
        
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);
      }else if(step===5){
        
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigate('/payment',{ state: { listingid : listingid } })
        }, 3000);
      }
  }


  
  return (
    <div className='flex flex-col min-h-screen bg-[#FFFFFF]'>
      <Navbar/>
      <div className='flex-grow'>
      <div className='flex items-center '>
      {step === 0 && (
            <Display/>
          )}
          {step === 1 && (
            <Amenities listingid={listingid} />
          )}


          {step===2 && (
            <Imageslist listingid={listingid} />
          )}



          {step===3 && (
            <Title listingid={listingid} />

          )}
          {step === 4 && (
        <Description listingid={listingid} />
      )}
      { step===5 && (
        <Describe listingid={listingid} />
      )}
      
      </div>

      </div>
      <Footerimages isLoading={isLoading} buttonText="NEXT" onClick={handleNext} onBack={handleBack} step={step} setStep={setStep} currentstep={currentstep}/>

    </div>
  )
}
