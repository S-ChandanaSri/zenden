import React,{useState,useEffect, useRef} from 'react';
import Navbar from './Navbar';
import jhome from '../images/landingpage/jhome.png';
import Footer from './Footer';
import tv from '../images/landingpage/tv.png';
import wifi from '../images/landingpage/wifi.png';
import washer from '../images/landingpage/washer.png';
import park from '../images/landingpage/park.png';
import free from '../images/landingpage/free.png';
import kitchen from '../images/landingpage/kitchen.png';
import workplace from '../images/landingpage/workplace.png';
import pool from '../images/landingpage/pool.png';
import patio from '../images/landingpage/patio.png';
import tub from '../images/landingpage/tub.png';
import piano from '../images/landingpage/piano.png';
import table from '../images/landingpage/table.png';
import exercise from '../images/landingpage/exercise.png';
import beach from '../images/landingpage/beach.png';
import indoor from '../images/landingpage/indoor.png';
import outdoor from '../images/landingpage/outdoor.png';
import ac from '../images/landingpage/ac.png';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import photos from '../images/landingpage/photos.png';
import Resizer from 'react-image-file-resizer';
import pica from 'pica';
import frame from '../images/landingpage/frame.png';
import peace from '../images/landingpage/peace.png';
import Footerimages from './Footerimages';

 

export default function Imagesstep() {

  const navigate=useNavigate();
  const [currentstep,setCurrentstep]=useState(0);
  

  const [isopenn, setIsopenn] = useState(null); 
  const dropdownref = useRef(null);

  const optionss = ["Edit", "Cover photo", "Delete"];
  
  const handleDropdownClick = (index) => {
    console.log(`Dropdown clicked: ${index}, current isopenn: ${isopenn}`);
    setIsopenn(isopenn === index ? null : index); 
  };

  const handleOptionClick = (option, imageIndex) => {
    console.log(`Option clicked: ${option}, Image index: ${imageIndex}`);
    
    if (option === 'Edit') {
      console.log(`Navigating to /edit with image: ${files[imageIndex]?.preview}, index: ${imageIndex}`);
      navigate('/edit', { state: { image: files[imageIndex]?.preview, index: imageIndex } });
    }
    
    if (option === 'Cover photo') {
      const updatedFiles = [...files];
      const [coverPhoto] = updatedFiles.splice(imageIndex, 1);
      updatedFiles.unshift(coverPhoto);
  
      const reindexedFiles = updatedFiles.map((file, idx) => ({
        ...file,
        index: idx,
      }));
  
      setFiles(reindexedFiles);
  
      const coverPhotoId = coverPhoto.index;  
      console.log("Cover Photo ID:", coverPhotoId);
  
      fetch('http://localhost:3001/updatecoverphoto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageId: coverPhotoId,  
          listingId: listingid,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log("Cover photo updated successfully:", data);
      })
      .catch(error => console.error("Error updating cover photo:", error));
    }
  };
  
  

  const handleClickOutside = (event) => {
    if (dropdownref.current && !dropdownref.current.contains(event.target)) {
      setIsopenn(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBack = () => {
    setStep((prevStep) => (prevStep - 1)); 
    if (currentstep > 0) {
      setCurrentstep(prevStep => prevStep - 1);
    }
  };

  const handleClick = (option) => {
    if (selectedoption.includes(option.label)) {
        setSelectedOption(selectedoption.filter((item) => item !== option.label));
    } else {
        setSelectedOption([...selectedoption, option.label]);
    }
};

  const handleClick1=(option1)=>{
    if (selectedoption.includes(option1.label)) {
        setSelectedOption(selectedoption.filter((item) => item !== option1.label));
    } else {
        setSelectedOption([...selectedoption, option1.label]);
    }
  }
  const handleClick3=(option3)=>{
    if (selectedoption.includes(option3.label)) {
        setSelectedOption(selectedoption.filter((item) => item !== option3.label));
    } else {
        setSelectedOption([...selectedoption, option3.label]);
    }
  }
  const [dragId, setDragId] = useState();
  
  
  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };
  const handleDragStart = (ev) => {
    const id = ev.currentTarget.id;
    ev.dataTransfer.setData('text/plain', id);
    ev.dataTransfer.effectAllowed = 'move';
  
    console.log('Drag Start - ID:', id); 
    console.log('Data Transfer Data:', ev.dataTransfer.getData('text/plain')); 
  };
  
  
  
  
  const handleDragOver = (ev) => {
    ev.preventDefault(); 
  
    console.log('Drag Over - Target ID:', ev.currentTarget.id); 
  };
  
  
  
  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragId = ev.dataTransfer.getData('text/plain');
    const dropId = ev.currentTarget.id;

    console.log('Drop Event - Drag ID:', dragId, 'Drop ID:', dropId); 

    const dragIndex = files.findIndex((file) => file.index === parseInt(dragId, 10));
    const dropIndex = files.findIndex((file) => file.index === parseInt(dropId, 10));

    console.log('Files:', files);
    console.log('Drag Index:', dragIndex, 'Drop Index:', dropIndex); 

    if (dragIndex === -1 || dropIndex === -1) {
        console.log('Invalid indices'); 
        return;
    }

    const newFiles = [...files];
    const [movedFile] = newFiles.splice(dragIndex, 1);
    newFiles.splice(dropIndex, 0, movedFile);

    const updatedFiles = newFiles.map((file, index) => ({
        ...file,
        index,
    }));

    console.log('Reordering Files:', updatedFiles); 

    setFiles(updatedFiles);
};


const readBlobData = async (blobUrl) => {
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onload = (event) => {
            console.log('File data:', event.target.result); 
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error('Error reading Blob data:', error);
    }
};

  const picaInstance = pica();
  const [totalHeight, setTotalHeight] = useState(0);
  const maxDropzoneHeight =1600; 


  const imageSizes = [
    { width: 383, height: 325 },
    { width: 383, height: 245 },
    { width: 383, height: 245 },
    { width: 383, height: 245 },
    { width: 383, height: 245 }
  ];


  const resizeImage = (file, size) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        console.log('Creating Blob URL:', img.src); 
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size.width;
            canvas.height = size.height;
            picaInstance
                .resize(img, canvas)
                .then((result) => picaInstance.toBlob(result, 'image/jpeg'))
                .then((blob) => {
                    const blobUrl = URL.createObjectURL(blob);
                    console.log('Created Blob URL:', blobUrl); 
                    resolve(blobUrl);
                })
                .catch((error) => reject(error));
        };
    });
};



const displayImage = (blobUrl) => {
  const img = document.createElement('img');
  img.src = blobUrl;
  document.body.appendChild(img);
};

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  const onDrop = async (acceptedFiles) => {
    let newHeight = totalHeight;

    const newFiles = acceptedFiles.slice(0, 10 - files.length);
    const rowHeight = 325;
    const totalImages = files.length + newFiles.length;
    const imagesPerRow = 3; 
    const numRows = Math.ceil(totalImages / imagesPerRow);

   
    newHeight = numRows * rowHeight;
    const currentIndex = files.length;

    for (let i = 0; i < newFiles.length; i++) {
        const size = imageSizes[(files.length + i) % imageSizes.length];
        const preview = await resizeImage(newFiles[i], size);
        const updatedFile = { 
            ...newFiles[i], 
            preview, 
            height: size.height, 
            index: currentIndex + i 
        };

        console.log(`File ${i}:`, updatedFile);
        setFiles((prevFiles) => [...prevFiles, updatedFile]);
    }

    setTotalHeight(newHeight);
};



  

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    disabled: files.length >= 10 
  });

  const totalHeightt = files.reduce((sum, file, index) => {
    return sum + (index === 0 ? imageSizes[0].height : imageSizes[index % imageSizes.length].height);
  }, 0);

  const containerHeight = Math.max(totalHeightt, 0);

  const thumbs = files.map((file, index) => (
  <div
    key={file.index} 
    id={file.index} 
    draggable
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    className={`border border-gray-300 rounded-sm mb-2`}
    style={{
      width: index === 0 ? '100%' : `${imageSizes[index % imageSizes.length].width}px`,
      height: "325px",
      flexBasis: index === 0 ? '100%' : '33.33%',
      boxSizing: 'border-box',
    }}
  >
    <img
      src={file.preview}
      className="block object-cover w-full h-full"
      alt={`Preview ${index}`}
    />
  </div>
));
  
  

   useEffect(() => {
    if (files.length > 0) {
      setUploading(true);
      setUploadProgress(0);
      const uploadInterval = setInterval(() => {
        setUploadProgress(prevProgress => {
          if (prevProgress >= files.length) {
            clearInterval(uploadInterval);
            setUploading(false);
            return files.length;
          }
          return prevProgress + 1;
        });
      }, 1000); 
    }
  }, [files]);

    const location = useLocation();
    console.log("llllllllllll",location.state)
    const { listingid } = location.state || {}; 
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [click,setClick]=useState("");
    const [selectedoption,setSelectedOption]=useState([]);

    const options = [
        { label: "WiFi", img: wifi },
        { label: "TV", img: tv },
        { label: "Kitchen", img: kitchen },
        { label: "Washer", img: washer },
        { label: "Free Parking", img: free },
        { label: "Paid parking", img: park },
        { label: "Air Conditioning", img: ac },
        { label: "Workplace", img: workplace }
      ];

      const options1 = [
        { label: "Pool", img: pool },
        { label: "Patio", img: patio },
        { label: "Hot tub", img: tub },
        { label: "Piano", img: piano },
        { label: "Pool table", img: table },
        { label: "Exercise equipment", img: exercise },
        { label: "Beach access", img: beach },
        { label: "Indoor fireplace", img: indoor },
        { label: "Outdoor dining area", img: outdoor },
      ];
      
      const options3 = [
        { label: "Fire kit", img: wifi },
        { label: "Smoke alarm", img: tv },
        { label: "Fire extinguisher", img: kitchen },
        { label: "Carbon monoxide alarm", img: washer }
      ];

  const handleNext = () => {
    if (step === 0) {
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }else if(step===1){
        console.log("ll",listingid)
        fetch('http://localhost:3001/amenities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedoption,id:listingid }),
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
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);
      }
      else if(step===2){

        console.log("88888888888",files);

        fetch('http://localhost:3001/imageslist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({files, id: listingid}),
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
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);

      }else if(step===3){

        
        console.log("title",textt)
        
          fetch('http://localhost:3001/title', {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ textt,id:listingid }),
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
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);
      }else if(step===4){
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
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStep((prevStep) => prevStep + 1);
          setCurrentstep((prevStep) => prevStep + 1);
        }, 3000);
      }else if(step===5){
        console.log(";;;;;",text)
        
          fetch('http://localhost:3001/descriptionn', {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text,id:listingid }),
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
          navigate("/payment", { state: { listingid : listingid } })
        }, 3000);
      }
  }

  const[selectedopt,setSelectedOpt]=useState([]);

  const optons = ['Peaceful', 'Central', 'Unique','Family-friendly', 'Spacious', 'Stylish',];

  const handlecolor = (option) => {
    if (selectedopt.includes(option)) {
      setSelectedOpt(selectedopt.filter((item) => item !== option));
    } else if (selectedopt.length < 2) {
      setSelectedOpt([...selectedopt, option]);
    }
  };
    

  const [text, setText] = useState('');


  const handleTextChange = (event) => {
    if (event.target.value.length <= 36) {
      setText(event.target.value); 
    }
  };

  const [textt, setTextt] = useState('');


  const handleTextChangee = (event) => {
    if (event.target.value.length <= 36) {
      setTextt(event.target.value); 
    }
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
            <div className=' h-[1770px]'>
            <div className='flex flex-col relative left-[412px] top-[140px] rounded-[15px]'>
  <div className='w-[688px] relative top-[-70px]'>
    <p className='w-[896px] text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]'>
    Tell the guest what your place has to offer
    </p>
    <p className='w-[688px] text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000] pt-3'>
    You can add more amenities after you publish your listings     </p>
  </div>
  
  <div className='grid grid-cols-3 gap-5'>
  {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className={`h-[133px] w-[226px] rounded-[7px] border-[1px] py-[29px] px-[15px] flex flex-col items-center ${selectedoption.includes(option.label)  ? 'border-blue-500 border-[7px]' : 'border-[#8E98A8]'}`}
        >
          <div className='w-[90px] h-[88px] flex flex-col items-center'>
            <img src={option.img} alt={option.label} className='w-[48px] h-[48px] relative bottom-2' />
            <p className='w-[180px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
              {option.label}
            </p>
          </div>
        </button>
      ))}
      </div>
        </div>



        <div className='flex flex-col relative left-[412px] top-[140px] rounded-[15px]'>
  <div className='w-[688px] relative top-[70px]'>
    
    <p className='w-[417px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
    Do you have any standout amenities ?   </p>
  </div>
  
  <div className='grid grid-cols-3 gap-5'>
    {
  options1.map((option1, index) => (
        <button key={index} onClick={() => handleClick1(option1)} className={`h-[133px] w-[226px] relative top-[140px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${selectedoption.includes(option1.label) ? 'border-blue-500 border-[7px]' : 'border-[#8E98A8]'}`}>
          <div className=' w-[90px] h-[88px] flex flex-col items-center '>
            <img src={option1.img} className='w-[48px] h-[48px] relative bottom-2  '  />
            <p className=' w-[180px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
              {option1.label}
            </p>
          </div>
        </button>
      ))}
  </div>
</div>


<div className='flex flex-col relative left-[412px] top-[140px] rounded-[15px]'>
<div className='w-[688px] relative top-[220px]'>
    
    <p className='w-[417px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
    Do you have any standout amenities ?   </p>
  </div>
  
  <div className='grid grid-cols-3 gap-5'>
    {
  options3.map((option3, index) => (
        <button key={index} onClick={() => handleClick3(option3)} className={`h-[133px] w-[226px] relative top-[270px] rounded-[7px] border-[1px] border-[#8E98A8] py-[29px] px-[15px] flex flex-col items-center ${selectedoption.includes(option3.label)? 'border-blue-500 border-[7px]' : 'border-[#8E98A8]'}`}>
          <div className=' w-[90px] h-[88px] flex flex-col items-center '>
            <img src={option3.img} className='w-[48px] h-[48px] relative bottom-2  '  />
            <p className=' w-[180px] h-[30px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]'>
              {option3.label}
            </p>
          </div>
        </button>
      ))}
  </div>
</div>

            </div>
            </>
          )}


          {step===2 && (
            <div className='flex pb-[200px] h-[1155px] '  >
            <div className='flex flex-col relative left-[412px] top-[140px] rounded-[15px]'>
            <div className='w-[688px] relative top-[-80px]'>
              <p className='w-[640px]  h-[53px] text-[35px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]'>
              Add some of the photos of property
              </p>
              <p className='w-[461px] text-[18px]  font-[300] leading-[27px] tracking-[0.46px] text-[#000000] '>
              You need to add at least 5 images to get started    </p>
            </div>
            <section className="w-[1066px] relative top-[-71px] right-[150px] rounded-[15px]  border-[2px] border-[#8E98A8]" style={{ height: `${totalHeight}px` }} >
          <div className="col-span-2 sm:col-span-3 flex items-center justify-center p-4 border border-dashed cursor-pointer " {...getRootProps({ className: 'dropzone' })} >
            <input {...getInputProps()} />
            {files.length === 0 && (
              <div className="w-full h-full flex items-center justify-center cursor-pointer">
                <div className="text-center relative top-[150px] ">
                  <p className="text-lg font-medium leading-6 tracking-wider text-black">
                    Drag your images here
                  </p>
                  <p className="text-sm font-normal leading-6 tracking-wider text-black">
                    Choose at least 5 photos
                  </p>
                  <p className="text-sm font-normal leading-6 tracking-wider text-black">
                    Upload from your device
                  </p>
                </div>
              </div>
            )}
          </div>
          {files.length > 0 && (
  <>
   <aside className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {thumbs.map((thumb, index) => (
        <div key={index} className={`relative ${index === 0 ? 'col-span-3' : ''}`}
        
        id={index} 
        draggable={true}
  onDragStart={handleDragStart}
  onDragOver={handleDragOver}
  onDrop={handleDrop}
        >
          {thumb}
          <div
           
            className='absolute top-[15px] right-[10px] w-[54px] h-[38px] border-[1px] border-[black] rounded-[15px]'
          >
            <button onClick={() => handleDropdownClick(index)} className='w-[54px] h-[38px]'>
              <div className='w-[54px] h-[38px] rounded-[30px] py-[10px] px-[18px] bg-[white]'>
                <img src={frame} className='w-[22px] h-[5.59px] relative top-[5px]' alt="frame icon" />
              </div>
            </button>
            {isopenn === index && (
                            <div className='cursor-pointer absolute right-[0px] top-[40px] flex flex-col border-x border-t mt-5 bg-white w-[160px]'>
                                {optionss.map((option, optionIndex) => (
                                    <div
                                        key={optionIndex}
                                        className='border-b px-4 py-3'
                                        onClick={() => handleOptionClick(option, index)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
          </div>
        </div>
      ))}
    </aside>
    <div className="mt-4 flex justify-center">
  {files.length < 10 && (
    <button
      type="button"
      onClick={() => document.querySelector('input[type="file"]').click()}
      className="px-4 py-2 border border-gray-300 rounded bg-blue-500 text-white"
    >
      Upload More Images
    </button>
  )}

</div>
  </>
)}


        </section>

          </div>
          </div>
          )}



          {step===3 && (
            <>
            <div className='w-[1166px] '>
              <div className='w-[672px] h-[336px] relative top-[150px] left-[470px]  '>
                <div className='w-[672px] h-[306px]  '>
                <div className='w-[637px] h-[67px]  '>
                <p className='w-[637px] h-[34px] custo-font text-[35px] font-[500] leading-[24px] text-[#000000]'>Now,let’s give your property a title</p>
                <p className='w-[637px] h-[23px] custo-font text-[16px] font-[300] leading-[24px] text-[#000000]'>Short title works best Don’t woory you can cahnge it later</p>

                </div>
                <textarea className='w-[672px] h-[209px] rounded-[5px] border-[1px] border-[#000000] 'onChange={handleTextChangee} value={textt}></textarea>


                </div>

              </div>
              <p className='relative  top-[90px] left-[470px] w-[672px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] tracking-[0.46px] text-[#000000]'>{textt.length}/26</p>
            </div>
            </> 

          )}
          {step === 4 && (
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
      )}
      { step===5 && (
        <>
        <div className='w-[1166px] '>
              <div className='w-[672px] h-[336px] relative top-[150px] left-[470px]  '>
                <div className='w-[672px] h-[306px]  '>
                <div className='w-[637px] h-[67px]  '>
                <p className='w-[637px] h-[34px] custo-font text-[35px] font-[500] leading-[24px] text-[#000000]'>Create your description</p>
                <p className='w-[637px] h-[23px] custo-font text-[16px] font-[300] leading-[24px] text-[#000000]'>Share what makes your place special</p>

                </div>
                <textarea className='w-[672px] h-[209px] rounded-[5px] border-[1px] border-[#000000] 'onChange={handleTextChange} value={text}></textarea>

                </div>

              </div>
              <p className='relative  top-[90px] left-[470px] w-[672px] h-[24px] custo-font text-[16px] font-[400] leading-[24px] tracking-[0.46px] text-[#000000]'>{text.length}/26</p>
            
            </div>
        </>
      )}


      </div>

      </div>
      <Footerimages isLoading={isLoading} buttonText="NEXT" onClick={handleNext} onBack={handleBack} step={step} setStep={setStep} currentstep={currentstep}/>

    </div>
  )
}
