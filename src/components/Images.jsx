import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const Images = ({ images, currentImage, onClose }) => {
  const [currImg, setCurrImg] = useState(currentImage);

  const handlePrevClick = () => {
    const currentIndex = images.indexOf(currImg);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrImg(images[newIndex >= 0 ? newIndex : images.length - 1]);
  };

  const handleNextClick = () => {
    const currentIndex = images.indexOf(currImg);
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrImg(images[newIndex]);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevClick();
      } else if (e.key === 'ArrowRight') {
        handleNextClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currImg, images]);

  return (
    <div className='overflow-hidden prevent-select'>
      <div className='z-[40] inset-0 h-[100%] w-full overflow-y-hidden flex overflow-hidden items-center justify-center fixed bg-black bg-opacity-60 top-0 right-0 bottom-0 left-0'>
        <div>
          <FiX className='absolute top-5 right-5 text-xl md:text-3xl cursor-pointer' onClick={onClose} />
        </div>





        <div className='p-2 relative md:p-10 flex items-center justify-center'>
          <div className='flex flex-col gap-4 w-full md:w-[60%]'>
            <div className='w-full'>
            <TransformWrapper>
      <TransformComponent>
              <img
                loading='lazy'
                src={currImg.replace('/upload', '/upload/c_scale,h_900')}
                alt=''
                width={'100%'}
                className='w-full'
              />
              </TransformComponent>
            </TransformWrapper>
            </div>
            <div className='text-base md:text-xl'>
          {images.indexOf(currImg) + 1} / {images.length}
        </div>
          </div>

        <div>
          <FiArrowLeft className='absolute -top-4 md:top-1/2 left-0 md:-translate-y-1/2 text-xl md:text-3xl cursor-pointer' onClick={handlePrevClick} />
        </div>

        <div>
          <FiArrowRight className='absolute -top-4 md:top-1/2 right-0 md:-translate-y-1/2  text-xl md:text-3xl cursor-pointer' onClick={handleNextClick} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
