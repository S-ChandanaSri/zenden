import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import imageimage from '../images/landingpage/imageimage.png';
import Group from '../images/landingpage/Group.png';

export default function Amount({ listingid, salary, setSalary }) {
  const [edit, setEdit] = useState(false);
  const decimalDigits = 0;

  const handleedit = () => {
    setEdit(true);
  };

  const onChangehandler = (e) => {
    setSalary(e.target.value);
  };

  const onBluehandler = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSalary(value.toFixed(decimalDigits));
    }
    setEdit(false);
  };

  return (
    <div className='w-[1166px]'>
      <div className='w-[672px] h-[257px] relative top-[140px] left-[470px]'>
        <div className='w-[672px] h-[306px]'>
          <div className='w-[637px] h-[67px]'>
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
            />
          ) : (
            <div className='relative top-[55px] flex items-center w-[672px] h-[160px] border-[2px] border-[black]'>
              <img src={imageimage} className='w-[40px] pb-6 pr-1 relative left-[220px] top-[10px]' alt="Currency Symbol" />
              <p className='w-[145px] h-[49px] custo-font text-[56px] font-[600] leading-[24px] text-[#000000] relative left-[220px] top-[10px]'>{salary}</p>
              <button onClick={handleedit} className='absolute right-[20px] top-[50%] transform -translate-y-1/2'>
                <img src={Group} className='w-[17px] h-[17px]' alt="Edit Icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
