import React from 'react';
import { useSwipeable } from 'react-swipeable';

type HotelImageScrollProps = {
  images: {
    imagesLink: string[];
  };
};

const HotelImageScroll = ({images}: HotelImageScrollProps) => {

    const {imagesLink} = images;
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse:true,
    trackTouch:true,
  });

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleSwipe = (direction: string) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesLink.length);
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesLink.length) % imagesLink.length);
    }
  };

  return (
    <div {...handlers}style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
      <img   src={imagesLink[currentIndex]} alt={`Hotel Image ${currentIndex}`} style={{ width: '100%' }} />
    </div>
  );
};

export default HotelImageScroll;