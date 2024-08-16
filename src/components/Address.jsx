import React, { useState, useMemo, useEffect, useRef } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Address() {
    const iframeRef = useRef(null);
    const [loadingg, setLoadingg] = useState(true);
    const options = useMemo(() => countryList().getData(), []);
    const [error, setError] = useState(null);
    const [valuee, setValue] = useState(null);
    const location = useLocation();
    console.log("llllllllllll",location.state)
    const { listingid } = location.state || {}; 

    const [address, setAddress] = useState({
        road: '',
        city: '',
        country: '',
        zipcode: '',
        street: '',
        state: '',
        country_code: '',
        village: '',
        mandal: '',
        district: '',
    });

    const changeHandler = (selectedOption) => {
        setValue(selectedOption);
        setAddress((prevAddress) => ({
          ...prevAddress,
          country: selectedOption.label,
          country_code: selectedOption.value,
        }));
    };

    useEffect(() => {
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
    }, [address, listingid]);

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            const url = iframe.getAttribute('src');
            console.log("i got it", url);

            const params = new URLSearchParams(new URL(url).search);
            const embedParams = params.get('pb');

            const latitudeMatch = embedParams.match(/!3d(-?\d+\.\d+)/);
            const longitudeMatch = embedParams.match(/!2d(-?\d+\.\d+)/);

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
                        console.log("yeeee", data);
                        const country = data.address.country || '';
                        const countryCode = data.address.country_code || '';

                        console.log("Fetched country:", country);
                        console.log("Fetched countryCode:", countryCode);

                        const selectedOption = options.find(option => option.value.toUpperCase() === countryCode.toUpperCase());

                        console.log("options:", options);
                        console.log("Selected Option:", selectedOption);

                        setAddress({
                            road: data.address.road || data.address.street || '',
                            city: data.address.city || data.address.town || data.address.city_district || '',
                            country: country,
                            zipcode: data.address.zipcode || data.address.postcode || '',
                            street: data.address.street || data.address.colony || '',
                            state: data.address.state || '',
                            country_code: countryCode,
                            district: data.address.state_district || '',
                            mandal: data.address.county || '',
                            village: data.address.suburb || '',
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

    return (
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

    );
}
