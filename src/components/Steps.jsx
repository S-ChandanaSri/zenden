import React, { useState, useEffect, useRef, useMemo } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import mattress2 from '../images/landingpage/mattress2.png';
import mattress1 from '../images/landingpage/mattress1.png';
import mattress3 from '../images/landingpage/mattress3.png';
import Footer from './Footer';
import d from '../images/landingpage/d.png';
import phhouse from '../images/landingpage/phhouse.png';
import phbuild from '../images/landingpage/phbuild.png';
import phmaterial from '../images/landingpage/phmaterial.png';
import house from '../images/landingpage/house.png';
import room from '../images/landingpage/room.png';
import cilroom from '../images/landingpage/cilroom.png';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import plus1 from '../images/landingpage/plus1.png';
import subt1 from '../images/landingpage/subt1.png';
import Amenities1 from './Amenities1';
import Amenities2 from './Amenities2';
import people from '../images/landingpage/people.png';
import peopleline from '../images/landingpage/peopleline.png';
import peoplesharp from '../images/landingpage/peoplesharp.png';


export default function Steps() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const [countguests,setCountguests]=useState(0);
  const [countBedrooms, setCountBedrooms] = useState(0);
  const [countBeds, setCountBeds] = useState(0);
  const [privateroom,setPrivate]=useState(0);
  const [privateroom1,setPrivate1]=useState(0);
  const [privateroom2,setPrivate2]=useState(0);
  const [color,setColor] = useState("blue");
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataa, setDataa] = useState([]);

  const[selecttype,setSelecttype] =useState(null);
  const[listingid,setListingid]=useState(null);

const handlecolor=(option)=>{
setColor(option);
setSelectedOption(option);
}





  const [address, setAddress] = useState({
    road: '',
    city: '',
    country: '',
    zipcode:'',
    street:'',
    state:'',
    country_code:'',
    village:'',
    mandal:'',
    district:'',
  });
  const [error, setError] = useState(null);
  const [loadingg, setLoadingg] = useState(true);


  const [valuee,setValue] = useState(null)
  const options=useMemo(()=>countryList().getData(),[]);



const[placetype,setPlacetype]=useState(null);
const[peopletype,setPeopletype]=useState(null);
  const [isClicked, setIsClicked] = useState(null);
 
const handletype=(firstoption)=>()=>{
  setPlacetype(firstoption);
}
const handlepeople=(secondoption)=>()=>{
  setPeopletype(secondoption);
}
  
  const handleClick = (button) => {
    setIsClicked(button); 
  };
  



  const handleBack = () => {
    setStep((prevStep) => (prevStep - 1)); 
  };

  const changeHandler = (selectedOption) => {
    setValue(selectedOption);
    setAddress((prevAddress) => ({
      ...prevAddress,
      country: selectedOption.label,
      country_code: selectedOption.value,
    }));
  };


  useEffect(() => {

    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const url = iframe.getAttribute('src');
      console.log("i got it", url);

      const params = new URLSearchParams(new URL(url).search);
      const embedParams = params.get('pb');


      const latitudeMatch = embedParams.match(/!3d(-?\d+\.\d+)/);
      const longitudeMatch = embedParams.match(/!2d(-?\d+\.\d+)/);

      // Extract latitude and longitude
      const latitude = latitudeMatch ? latitudeMatch[1] : 'Not found';
      const longitude = longitudeMatch ? longitudeMatch[1] : 'Not found';

      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log("yeeee",data);
            const country = data.address.country || '';
            const countryCode = data.address.country_code || '';

            console.log("Fetched country:", country);
            console.log("Fetched countryCode:", countryCode);

            const selectedOption = options.find(option => option.value.toUpperCase() === countryCode.toUpperCase());

            console.log("options:", options);
            console.log("Selected Option:", selectedOption);

            setAddress({
              road: data.address.road || data.address.street ||  '',
              city: data.address.city || data.address.town || data.address.city_district  || '',
              country: country,
              zipcode: data.address.zipcode || data.address.postcode || '',
              street: data.address.street || data.address.colony ||  '',
              state: data.address.state || '',
              country_code: countryCode,
              district:data.address.state_district || '',
              mandal:data.address.county || '',
              village:data.address.suburb || '',
            });

            setValue(selectedOption || null); 
            setLoadingg(false);
          })
          .catch((err) => {
            console.error('Error fetching address:', err);
            setError('Unable to fetch address.');
            setLoadingg(false);
          });
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to get location.');
        setLoadingg(false);
      }
    );
  }, [options]);

  if (loadingg) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;




  const handleNext = () => {
    if (step === 0) {
      setStep((prevStep) => prevStep + 1);
    } else if (step === 1) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 2) {
      if (selectedOption) {console.log("sssssssssssssss:", selectedOption);}


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
          console.log("success");
          setListingid(data.id);
          console.log("success",data.id);

        })
        .catch((err) => console.error("Error:", err));
      
  


      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 3) {


      if(placetype) {console.log("firstoption", placetype);}


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
          console.log("success")
        })
        .catch((err) => console.error("Error:", err));



      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
      }, 3000);
    }else if (step === 4) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
        }, 3000);
      }else if (step === 5) {


        if(placetype) {console.log("firstoption", placetype);}


      fetch('http://localhost:3001/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, id: listingid }),
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



        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
        }, 3000);
      }else if (step === 6) {
        if (listingid) {
          console.log("sssssssssssssss:", listingid);
        }
      
        fetch('http://localhost:3001/amenities1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ countguests, countBedrooms, countBeds, isClicked, idd: listingid }),
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
      
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
        }, 3000);
      }
      else if (step === 7) {

        console.log("Listing ID before fetch:", listingid);

      fetch('http://localhost:3001/amenities2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ privateroom,privateroom1,privateroom2, id: listingid  }),
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



        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
        }, 3000);
      }else if (step === 8) {



        if(peopletype) {console.log("firstoption", peopletype);}


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



        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/images", { state: { listingid : listingid } })
        }, 3000);
      }
  };

  const optons = ['House', 'Apartment', 'Villa','House', 'Apartment', 'Villa','House', 'Apartment', 'Villa',];

  return (
    <div className='flex flex-col min-h-screen bg-[#FFFFFF]'>
      <Navbar />
      <main className='flex-grow'>
        <div className='flex items-center min-h-screen'>
          {step === 0 && (
            <>
              <p className='w-[568px] relative left-[143px] custo-font text-[45px] font-[500] leading-[67.5px] tracking-[0.46px] text-[#000000]'>
                You’re just three steps to set up your ZenDen
              </p>
              <div className='flex flex-col items-center'>
                <div className='flex w-[623px] h-[115.07px] relative bottom-[40px] left-[131px] gap-[10px]'>
                  <div className='flex flex-col items-center w-[448px] h-[107px]'>
                    <p className='w-[448px] h-[53px] top-[-1px] custom-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'>
                      1. Tell us about your place
                    </p>
                    <p className='w-[394px] h-[54px] top-[-1px] custom-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] text-left'>
                      Share some basic info, like where it is and how many guests can stay
                    </p>
                  </div>
                  <img src={mattress1} className='w-[129px] h-[115.07px]' />
                </div>
                <div className='flex w-[648px] h-[110px] relative top-[39px] left-[131px] gap-[61px]'>
                  <div className='flex flex-col items-center w-[389px] h-[110px] gap-[3px]'>
                    <p className='w-[448px] h-[53px] top-[-1px] custom-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] pl-12 text-[#000000]'>
                      2. Make it stand out
                    </p>
                    <p className='w-[394px] h-[54px] top-[-1px] custom-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] pl-12 text-[#000000] text-left'>
                      Add 5 or more photos plus a title and a little description
                    </p>
                  </div>
                  <img src={mattress3} className='w-[168px] h-[101.14px]' />
                </div>
                <div className='flex w-[648px] h-[145px] relative top-[95px] left-[131px] gap-[10x]'>
                  <div className='flex flex-col items-center w-[458px] h-[137px] gap-[3px]'>
                    <p className='w-[448px] h-[53px] top-[-1px] custom-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] pl-4 text-[#000000]'>
                      3. Finish up and publish
                    </p>
                    <p className='w-[394px] h-[54px] top-[-1px] custom-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] pl-4 text-[#000000] text-left'>
                      Choose if you’d like to start with an experienced guest, set up a starting price, and publish your listing
                    </p>
                  </div>
                  <img src={mattress2} className='w-[168px] h-[145px]' />
                </div>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className='flex h-[555px]'>
                <div className='w-[509px] h-[114px] relative top-[1px] left-[148px] gap-[46px]'>
                  <div className='flex flex-col items-center text-left pl-11 pt-7 w-[448px] h-[114px]'>
                    <p className='w-[573px] h-[60px] relative top-[224px] left-[173px] custo-font text-[40px] font-[400] leading-[60px] tracking-[0.46px] text-[#000000]'>
                      1. Tell us about your place
                    </p>
                    <p className='w-[394px] h-[54px] relative top-[224px] left-[83px] custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'>
                      Share some basic info, like where it is and how many guests can stay
                    </p>
                  </div>
                  <img src={d} className='h-[571.17px] w-[700px] relative top-[-106px] left-[692px]' />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className='flex flex-col items-center h-[670px] relative left-[450px]'>
                <div className='w-[573px] h-[106px] relative top-[28px] gap-[46px]'>
                  <p className='w-[573px] h-[106px] custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000] text-center'>
                    Which of these best describes your place?
                  </p>
                </div>
                <div className='grid grid-cols-3 gap-8 w-[590px] pt-12'>
  {optons.map((option, index) => (
    <div key={index} className='h-[133px] gap-[10px]'>
      <button
        onClick={() => handlecolor(option)}
        className={`h-[133px] w-[186px] rounded-[7px] border-[1px] py-[29px] px-[15px] gap-[10px] ${color === option ? 'border-blue-500 border-4' : 'border-[#8E98A8]'}`}
      >
        <div className='w-[80px] h-[96px] gap-[10px]'>
          <img src={option === 'House' ? phhouse : option === 'Apartment' ? phbuild : phmaterial} className='w-[48px] h-[48px]' />
          <p className='w-[80px] h-[38px] custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>{option}</p>
        </div>
      </button>
    </div>
  ))}
</div>


              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className='flex flex-col items-center h-[670px] relative left-[450px]'>
        <div className='w-[640px] h-[106px] relative  top-[55px]  gap-[46px] '>
        <p className=' w-[640px] h-[53px]  custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000] text-center'> What type of place will guest have? </p>

        </div>
        <div className='flex flex-col items-center'>
          <button onClick={handletype('an entire place')}  className={`w-[666px] h-[135px]  py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[44px] left-[7px]  ${placetype === "an entire place" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `}>
            <div className='flex items-center pt-5 w-[620px] h-[74px] gap-[161px] '>
              <div className='w-[401px] h-[74px] gap-[9px] '>
              <p className='text-left w-[401px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> An entire place </p>
              <p className=' w-[401px] h-[27px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] text-center'> Guest will have whole place to live or enjoy </p>
              </div>
              <img src={house} className='w-[58px] h-[58px]  ' />
            </div>
          </button>
          <button onClick={handletype('a room')}  className={`w-[666px] h-[135px] py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[68px] left-[7px]  ${placetype === "a room" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `}>
            <div className='flex items-center pt-2 w-[620px] h-[74px] gap-[161px] '>
              <div className='w-[401px] h-[74px] gap-[9px] '>
              <p className='text-left w-[401px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>  A room  </p>
              <p className=' w-[401px] h-[27px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'> Guest will have only a small part of the house to live or enjoy</p>
              </div>
              <img src={cilroom} className='w-[58px] h-[58px]  ' />
            </div>
          </button>
          <button onClick={handletype('a shared room')} className={`w-[666px] h-[135px] py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[90px] left-[7px] ${placetype === "a shared room" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `}>
            <div className='flex items-center pt-5 w-[620px] h-[74px] gap-[161px] '>
              <div className='w-[401px] h-[74px] gap-[9px] '>
              <p className='text-left w-[401px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>A shared room </p>
              <p className='text-left w-[601px] h-[27px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] '> Guest will have a shared place to live or enjoy </p>
              </div>
              <img src={room} className='w-[58px] h-[58px]  ' />
            </div>
          </button>
        </div>

        </div>
            </>
          )}

          {
            step===4 && (
            <>
            <div className='flex flex-col items-center h-[670px] relative left-[350px]'>

            <p className=' mb-5 pl-12 w-[640px] h-[53px]  custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'>  Where is your place located ?  </p>
            <div className='w-[894px] h-[555px] rounded-[10px] border-[2px] border-[black] '>

            <iframe 
            id="myMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1963.497964989181!2d78.39467655490265!3d17.342111639967566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97e4568d0269%3A0xc04d946805b3f870!2sVILLAS!5e0!3m2!1sen!2sin!4v1723027917741!5m2!1sen!2sin" 
                width="894" 
                 height="550" 
                style={{ border: '0' }} 
                 allowFullScreen 
                 loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  >
            </iframe>

            </div>
            </div>
           


            </>
          )}

          {
            step===5 && (
                <>
                <div className='flex flex-col items-center h-[670px] relative top-[10px] left-[350px]'>
                <p className=' w-[597px] h-[68px]  custo-font text-[45px] font-[400] leading-[67.5px] tracking-[0.46px] text-[#000000]'>  Confirm your address </p>
                <p className=' w-[852px] h-[54px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'>  Your address will only be shared with your guest only after they have made rservations  </p>
                <div className='w-[709px] h-[76px] border-[1px] border-[#000000] py-[12px] px-[10px]  top-[364px] left-[251px] rounded-[5px]  '>
                <Select options={options} value={valuee} className="w-full h-full border-none outline-none" onChange={changeHandler} styles={{control: (base) => ({
            ...base,
            height: '100%',
            border: 'none',
            boxShadow: 'none'
          })
        }} >{valuee && <p><span>{valuee.value} </span> {valuee.label}</p>}</Select>
                </div>
                <div className='w-[709px] h-[402px] border-[1px] border-[#000000] py-[12px] px-[10px] relative top-[2px] rounded-[5px]  '>
                  <div className='pt-3 '>
                    <div className='w-[210px] h-[57x] gap-[3px]'>
                        <p className=' w-[210px] h-[34px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>Street address</p>
                        <p className=' w-[210px] h-[24px]   relative bottom-1.5  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.street}{address.village}</p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] gap-[3px]  '>
                        <p className=' w-[210px] h-[34px]  custo-font text-[16px] font-[300] relative top-1 leading-[24px] tracking-[0.46px] text-[#8E98A8]'>Mandal</p>
                        <p className=' w-[210px] h-[24px]  custo-font relative bottom-1.5 text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.mandal}</p>

                    </div> 
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] h-[57x] gap-[3px]  '>
                        <p className=' w-[210px] h-[34px]  custo-font text-[16px] font-[300] relative top-1 leading-[24px] tracking-[0.46px] text-[#8E98A8]'>City</p>
                        <p className=' w-[210px] h-[24px] relative bottom-1.5 custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.city}</p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] h-[57x] gap-[3px]'>
                        <p className=' w-[210px] h-[34px]  custo-font text-[16px] font-[300] relative top-1 leading-[24px] tracking-[0.46px] text-[#8E98A8]'>City</p>
                        <p className=' w-[210px] h-[24px]  relative bottom-1.5  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.district}</p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] h-[57x] gap-[3px]  '>
                        <p className=' w-[210px] h-[34px]  custo-font text-[16px] font-[300] leading-[24px] relative top-1 tracking-[0.46px] text-[#8E98A8]'>State</p>
                        <p className=' w-[210px] h-[24px] relative bottom-1.5 custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.state}</p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] h-[57x] gap-[3px]  '>
                        <p className=' w-[210px] h-[34px]  custo-font text-[16px] font-[300] leading-[24px] relative top-1 tracking-[0.46px] text-[#8E98A8]'>zipcode</p>
                        <p className=' w-[210px] h-[24px] relative bottom-2 custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.zipcode}</p>

                    </div>  
                    </div>
                </div>
                </div>

                </>

            )
          
          }



{
  step === 6 && (
    <>
      <div className='flex flex-col items-center h-[670px] relative left-[350px]'>
        <div className='border-[black] w-[1166px] h-[914px] rounded-[15px]'>
          <p className='w-[392px] h-[53px] relative top-[30px] custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'> Let’s start with basics </p> 
          <p className='w-[322px] h-[27px] relative top-[70px] custo-font text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]'> How many people can stay here? </p>            
          <div className='relative top-[30px]'>


          <div className='relative top-[-19px] '>
           <Amenities1  label="Guests" handleminus={()=>setCountguests(countguests-1)}  handleplus={()=>setCountguests(countguests+1)} count={countguests}  />
           </div>

            <div className='w-[667px] relative top-[127px] left-[2px] border-[1px] border-[#8E98A8]'></div>
            
           <div className='relative top-[30px] '>
           <Amenities1  label="Bedrooms" handleminus={()=>setCountBedrooms(countBedrooms-1)}  handleplus={()=>setCountBedrooms(countBedrooms+1)} count={countBedrooms}  />
           </div>
      




            <div className='w-[667px] relative top-[173px] left-[2px] border-[1px] border-[#8E98A8]'></div>
            


            <div className='relative top-[65px] '>
           <Amenities1  label="Beds" handleminus={()=>setCountBeds(countBeds-1)}  handleplus={()=>setCountBeds(countBeds+1)} count={countBeds}  />
           </div>


            <div className='w-[667px] relative top-[210px] left-[2px] border-[1px] border-[#8E98A8]'></div>
          </div>
        </div>

        <div className='w-[460px] h-[174px] relative top-[-40px] left-[-350px]'>
          <p className='w-[490px] h-[54px] custo-font text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]'> Do bedroom have separate locks or connected to each other? </p>            
          <div className='w-[432px] h-[87px]'>
            <div className='w-[432px] h-[27px] flex justify-between pt-4'>
              <p className='w-[147px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'> Separate Lock </p> 
              <button
          onClick={() => handleClick(0)}
          className={`w-[25px] h-[25px] border-[2px] border-[#002855] rounded-[50%] ${isClicked === 0 ? 'bg-blue-800' : ''}`} ></button>            </div>
            <div className='w-[432px] h-[27px] flex justify-between pt-8'>
              <p className='w-[147px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'>  Connected to eachother </p> 
              <button
          onClick={() => handleClick(1)}
          className={`w-[25px] h-[25px] border-[2px] border-[#002855] rounded-[50%] ${isClicked === 1 ? 'bg-blue-800' : ''}`}></button>            </div>
          </div>
        </div>
      </div>
    </>
  )
}



{
  step === 7 && (
    <>
      <div className='flex flex-col items-center h-[670px] relative left-[390px] top-[50px]'>
        <div className='border-[black] w-[1166px] h-[914px] rounded-[15px]'>
          <p className='w-[392px] h-[53px] relative top-[30px] custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'> Let’s start with basics </p> 
          <p className='w-[322px] h-[27px] relative top-[70px] custo-font text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]'> What kind of bathrooms do guest have ? </p>            
          <div className='relative top-[70px] '>
            <Amenities2 handleplus={()=>setPrivate(privateroom+1)} handleminus={()=>setPrivate(privateroom-1)}  label1="Private and attached"  label2="Its connected to the guest room and just for them" count={privateroom} />
            <div className='w-[667px] relative top-[127px] left-[2px] border-[1px] border-[#8E98A8]'></div>

            <div className='relative top-[45px]  '>
            <Amenities2 handleplus={()=>setPrivate1(privateroom1+1)} handleminus={()=>setPrivate1(privateroom1-1)}  label1="Dedicated"  label2="Its private but accessed via space like a halway" count={privateroom1} />

            </div >

            <div className='w-[667px] relative top-[173px] left-[2px] border-[1px] border-[#8E98A8]'></div>
            
            <div className='relative top-[85px]  '>
            <Amenities2 handleplus={()=>setPrivate2(privateroom2+1)} handleminus={()=>setPrivate2(privateroom2-1)}  label1="Shared"  label2="Its shared with other people" count={privateroom2} />

            </div>





            <div className='w-[667px] relative top-[210px] left-[2px] border-[1px] border-[#8E98A8]'></div>
          </div>
        </div>

        
      </div>
    </>
  )
}




{step===8 && (

  <>
  <div className='flex flex-col relative left-[252px] rounded-[15px]  '>
    <div className='w-[688px] h-[80px] relative top-[-80px] left-[0px] '>
    <p className='w-[573px] h-[53px] relative custo-font text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'> Who else might be there ? </p>            
    <p className='w-[688px] h-[27px] relative custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'> Guest need to know whether they will encounter with other people there </p>            
    </div>
    <div className=' grid grid-cols-3 gap-4'>

      <button onClick={handlepeople('me')} className={`h-[133px] w-[186px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${peopletype === "me" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `}>
        <div className='w-[90px] h-[94px] ga-[10px] relative left-6 '>
          <img src={people} className='w-[48px] h-[48px] '  />
          <p className='w-[80px] h-[36px] relative custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] text-[#000000] pr-10'> Me </p>            

        </div>
      </button>
      <button onClick={handlepeople('family')} className={`h-[133px] w-[206px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center  ${peopletype === "family" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `} >
        <div className='w-[90px] h-[94px] ga-[10px] '>
          <img src={peopleline} className='w-[48px] h-[48px] '  />
          <p className='w-[160px] h-[36px] relative custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] pr-10 text-[#000000]'> My family </p>            

        </div>
      </button>
      <button onClick={handlepeople('other')} className={`h-[133px] w-[210px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${peopletype === "other" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `} >
        <div className='w-[80px] h-[94px] ga-[10px] '>
          <img src={peoplesharp} className='w-[48px] h-[48px] '  />
          <p className='w-[200px] h-[36px] relative custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] text-[#000000] pr-5 '> Other guets </p>            

        </div>
      </button>
      <button onClick={handlepeople('roomates')} className={`h-[133px] w-[186px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${peopletype === "roomates" ? 'border-blue-500 border-4' : 'border-[#8E98A8]'} `} >
        <div className='w-[80px] h-[94px] ga-[10px] '>
          <img src={peoplesharp} className='w-[39px] h-[39px] '  />
          <p className='w-[80px] h-[36px] relative custo-font text-[24px] font-[400] leading-[36px] tracking-[0.46px] text-[#000000]'> Roomates </p>            

        </div>
      </button>
    </div>
  </div>
  </>
)}






        </div>
        <Footer isLoading={isLoading} buttonText="NEXT" onClick={handleNext} onBack={handleBack} step={step} setStep={setStep}/>
      </main>
    </div>
  );
}
