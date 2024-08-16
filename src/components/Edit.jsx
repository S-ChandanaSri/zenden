import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';
import Footer from './Footer';
import mdi from '../images/landingpage/mdi.png';
import Slider from './Slider';

export default function Edit() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const { image, index } = location.state || {};

    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [hueRotate, setHueRotate] = useState(0);
    const [blur, setBlur] = useState(0);

    const [details, setDetails] = useState(false);
    const [edit, setEdit] = useState(true);  

    const getImageStyle = useMemo(() => {
        return {
            filter: `
                brightness(${brightness}%)
                contrast(${contrast}%)
                hue-rotate(${hueRotate}deg)
                blur(${blur}px)
            `
        };
    }, [brightness, contrast, hueRotate, blur]);

    const handleBrightnessChange = ({ target }) => setBrightness(target.value);
    const handleContrastChange = ({ target }) => setContrast(target.value);
    const handleHueRotateChange = ({ target }) => setHueRotate(target.value);
    const handleBlurChange = ({ target }) => setBlur(target.value);

    const handleDetails = () => {
        setEdit(false);
        setDetails(!details);
    };

    const handleEdit = () => {
        setDetails(false);
        setEdit(!edit);
    };

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <>
            <div className='flex flex-col h-[555px]'>
                <Navbar />
                <div className='h-[555px]'>
                    
                        <div className='w-[744px] h-[49.5px] relative top-[29px] flex justify-between'>
                            <img src={mdi} className='w-[45px] h-[35px] pl-3' />
                            <p className='w-[136px] h-[36px] custo-font text-[24px] font-[500] leading-[36px] tracking-[0.46px] text-[#000000]'>
                                Edit photo
                            </p>
                        </div>
                        <div className='w-[1359px] relative top-[50px] border-[1px] border-[#8E98A8]'></div>
                        <div>
                            {image && (
                                <img
                                    src={image}
                                    alt={`Image ${index}`}
                                    className='relative top-[160px] left-[130px] w-[682px] h-[549px] rounded-[10px]'
                                    style={getImageStyle} 
                                />
                            )}
                        </div>
                        <div>
                            <div className='w-[159px] h-[36px] relative left-[1100px] bottom-[390px]'>
                                <div className='w-[150px] h-[30px]'>
                                    <button
                                        className='w-[71px] h-[30px] custo-font text-[20px] font-[400] relative right-[90px] leading-[30px] tracking-[0.46px] text-[#000000]'
                                        onClick={handleDetails}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className='w-[38px] h-[30px] custo-font text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            {details && (
                                <>
                                    <div className='w-[397px] h-[73px] relative left-[970px] bottom-[350px]'>
                                        <p className='w-[397px] h-[30px] custo-font text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
                                            Caption
                                        </p>
                                        <p className='w-[397px] h-[36px] custo-font text-[12px] font-[300] pt-2 leading-[18px] tracking-[0.46px] text-[#000000]'>
                                            Mention what is special about the space like special furniture and couch etc
                                        </p>
                                    </div>
                                    <textarea className='relative left-[970px] bottom-[330px] w-[393px] h-[150px] rounded-[4px] border-[0.5px] border-[#000000] py-[11px] px-[10px]'></textarea>
                                </>
                            )}
                            {edit && (
                                <>
                                    <div className='w-[500px] h-[300px] relative left-[980px] bottom-[290px] '>
                                        <div className='flex flex-col justify-evenly w-[332px] h-[63.43px]  mb-6 '>
                                            <p className='w-[332px] h-[27px] custo-font text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]' >Brightness</p>
                                            <Slider className='w-[332px] relative bottom-8'
                                                min={0}
                                                max={200}
                                                value={brightness}
                                                handleChange={handleBrightnessChange}
                                            />
                                        </div>
                                        <div className='flex flex-col justify-evenly w-[332px] h-[63.43px]  mb-6 '>
                                            <p className='w-[397px] h-[30px] custo-font text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>Contrast</p>
                                            <Slider
                                                min={0}
                                                max={200}
                                                value={contrast}
                                                handleChange={handleContrastChange}
                                            />
                                        </div>
                                        <div className='flex flex-col justify-evenly w-[332px] h-[63.43px]  mb-6'>
                                            <p className='w-[397px] h-[30px] custo-font text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>Hue Rotate</p>
                                            <Slider
                                                min={0}
                                                max={360}
                                                value={hueRotate}
                                                handleChange={handleHueRotateChange}
                                            />
                                        </div>
                                        <div className='flex flex-col justify-evenly w-[332px] h-[63.43px]  mb-6'>
                                            <p className='w-[397px] h-[30px] custo-font text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>Blur</p>
                                            <Slider
                                                min={0}
                                                max={20}
                                                value={blur}
                                                handleChange={handleBlurChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <Footer/>
                 
                </div>
               
            </div>
        </>
    );
}
