import React, { useState, useEffect, useRef } from 'react';
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

export default function Steps() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const [address, setAddress] = useState({
    road: '',
    city: '',
    country: ''
  });
  const [error, setError] = useState(null);
  const [loadingg, setLoadingg] = useState(true);

  useEffect(() => {
    // Extract latitude and longitude from iframe
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const url = iframe.getAttribute('src');
      console.log("i got it", url);

      const params = new URLSearchParams(new URL(url).search);
      const embedParams = params.get('pb');

      // Regular expressions to match latitude and longitude
      const latitudeMatch = embedParams.match(/!3d(-?\d+\.\d+)/);
      const longitudeMatch = embedParams.match(/!2d(-?\d+\.\d+)/);

      // Extract latitude and longitude
      const latitude = latitudeMatch ? latitudeMatch[1] : 'Not found';
      const longitude = longitudeMatch ? longitudeMatch[1] : 'Not found';

      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);
    }

    // Geolocation and address fetching
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setAddress({
              road: data.address.road || 'Not available',
              city: data.address.city || data.address.town || 'Not available',
              country: data.address.country || 'Not available'
            });
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
  }, []);

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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 3) {
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
      }
  };

  

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
                <div   className='grid grid-cols-3 gap-8  w-[590px] pt-12  '>
        <div className=' h-[133px]  gap-[10px] '>
          <button  className=' h-[133px] w-[186px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div  className=' w-[80px] h-[96px] gap-[10px] '>
              <img src={phhouse} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> House </p>
            </div>
          </button>
        </div>
        <div className=' h-[133px] gap-[10px] '>
        <button  type='button' className='w-[186px] h-[133px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className='w-[80px] h-[96px] gap-[10px] '>
              <img src={phbuild} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Apartment </p>
            </div>
          </button>
        </div>
        <div className='28h-[133px]  gap-[10px] '>
        <button  className='w-[186px] h-[133px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className='w-[80px] h-[96px] gap-[10px] '>
              <img src={phmaterial} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Villa </p>
            </div>
          </button>
        </div>
        <div className=' h-[133px]  gap-[10px] '>
          <button  className=' h-[133px] w-[186px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className=' w-[80px] h-[96px] gap-[10px] '>
              <img src={phhouse} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> House </p>
            </div>
          </button>
        </div>
        <div className=' h-[133px] gap-[10px] '>
        <button  className='w-[186px] h-[133px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className='w-[80px] h-[96px] gap-[10px] '>
              <img src={phbuild} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Apartment </p>
            </div>
          </button>
        </div>
        <div className='28h-[133px]  gap-[10px] '>
        <button  className='w-[186px] h-[133px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className='w-[80px] h-[96px] gap-[10px] '>
              <img src={phmaterial} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Villa </p>
            </div>
          </button>
        </div>
        <div className=' h-[133px]  gap-[10px] '>
          <button  className=' h-[133px] w-[186px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className=' w-[80px] h-[96px] gap-[10px] '>
              <img src={phhouse} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> House </p>
            </div>
          </button>
        </div>
        <div className=' h-[133px] gap-[10px] '>
        <button  className='w-[186px] h-[133px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className='w-[80px] h-[96px] gap-[10px] '>
              <img src={phbuild} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Apartment </p>
            </div>
          </button>
        </div>
        <div className='28h-[133px]  gap-[10px] '>
        <button  className='w-[186px] h-[133px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] gap-[10px] '>
            <div className='w-[80px] h-[96px] gap-[10px] '>
              <img src={phmaterial} className='w-[48px] h-[48px] ' />
              <p className=' w-[80px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> Villa </p>
            </div>
          </button>
        </div>

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
          <button onClick={handleNext}  className='w-[666px] h-[135px]  py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[44px] left-[7px] '>
            <div className='flex items-center pt-5 w-[620px] h-[74px] gap-[161px] '>
              <div className='w-[401px] h-[74px] gap-[9px] '>
              <p className='text-left w-[401px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'> An entire place </p>
              <p className=' w-[401px] h-[27px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] text-center'> Guest will have whole place to live or enjoy </p>
              </div>
              <img src={house} className='w-[58px] h-[58px]  ' />
            </div>
          </button>
          <div className='w-[666px] h-[135px] py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[68px] left-[7px] '>
            <div className='flex items-center pt-2 w-[620px] h-[74px] gap-[161px] '>
              <div className='w-[401px] h-[74px] gap-[9px] '>
              <p className='text-left w-[401px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>  A room  </p>
              <p className=' w-[401px] h-[27px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'> Guest will have only a small part of the house to live or enjoy</p>
              </div>
              <img src={cilroom} className='w-[58px] h-[58px]  ' />
            </div>
          </div>
          <div className='w-[666px] h-[135px] py-[20px] px-[22px] gap-[10px] border-[2px] border-[#000000] rounded-[15px] relative top-[90px] left-[7px] '>
            <div className='flex items-center pt-5 w-[620px] h-[74px] gap-[161px] '>
              <div className='w-[401px] h-[74px] gap-[9px] '>
              <p className='text-left w-[401px] h-[38px]  custo-font text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]'>A shared room </p>
              <p className='text-left w-[601px] h-[27px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] '> Guest will have a shared place to live or enjoy </p>
              </div>
              <img src={room} className='w-[58px] h-[58px]  ' />
            </div>
          </div>
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
                <div className='flex flex-col items-center h-[670px] relative left-[350px]'>
                <p className=' w-[497px] h-[68px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'>  Confirm your address </p>
                <p className=' w-[802px] h-[54px]  custo-font text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]'>  Your address will only be shared with your guest only after they have made rservations  </p>
                <div className='w-[709px] h-[76px] border-[1px] border-[#000000] py-[12px] px-[10px]  top-[364px] left-[251px] rounded-[5px]  '></div>
                <div className='w-[709px] h-[402px] border-[1px] border-[#000000] py-[12px] px-[10px]  top-[452px] left-[251px] rounded-[5px]  '>
                    <div className='w-[210px] h-[57x] gap-[3px] '>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>Street address</p>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.road}</p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] h-[57x] gap-[3px] '>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>City</p>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.city}</p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] h-[57x] gap-[3px] '>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>zipcode</p>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>{address.zipcode}</p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                    <div className='w-[210px] h-[57x] gap-[3px] '>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'>Street address</p>
                        <p className=' w-[210px] h-[24px]  custo-font text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]'></p>

                    </div>  
                    <div className='w-[710px] border-[1px] border-[#8E98A8] top-[533px] left-[250px] '></div>
                </div>
                </div>

                </>

            )
          }

        </div>
        <Footer isLoading={isLoading} buttonText="NEXT" onClick={handleNext} />
      </main>
    </div>
  );
}
