import React,{useState} from 'react'

export default function Title({listingid}) {

    const [textt, setTextt] = useState('');


  const handleTextChangee = (event) => {
    if (event.target.value.length <= 36) {
      setTextt(event.target.value); 
    }
  };

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
  return (
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
  )
}
