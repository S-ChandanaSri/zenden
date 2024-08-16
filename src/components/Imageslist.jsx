import React,{useState,useEffect,useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import photos from '../images/landingpage/photos.png';
import Resizer from 'react-image-file-resizer';
import pica from 'pica';
import frame from '../images/landingpage/frame.png';
import { useNavigate } from 'react-router-dom';

export default function Imageslist({listingid}) {

  const [isopenn, setIsopenn] = useState(null); 
  const dropdownref = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const optionss = ["Edit", "Cover photo", "Delete"];
  const navigate=useNavigate();
  
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


        
  return (
    <div>
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
      
    </div>
  )
}
