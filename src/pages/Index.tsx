import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Bust {
  id: number;
  name: string;
  title: string;
  image: string;
}

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const busts: Bust[] = [
    {
      id: 1,
      name: 'Сократ',
      title: 'Философ',
      image: 'https://cdn.poehali.dev/projects/894d5996-dcb8-4c13-9e86-ed96496ed986/files/8f6369a5-25d6-4539-a10c-151e81bc1473.jpg'
    },
    {
      id: 2,
      name: 'Юлий Цезарь',
      title: 'Император',
      image: 'https://cdn.poehali.dev/projects/894d5996-dcb8-4c13-9e86-ed96496ed986/files/e649e5a8-c918-424f-b142-ed6586789021.jpg'
    },
    {
      id: 3,
      name: 'Марк Аврелий',
      title: 'Философ-император',
      image: 'https://cdn.poehali.dev/projects/894d5996-dcb8-4c13-9e86-ed96496ed986/files/30a77a2c-3c52-45df-ac1f-d137e12d0b74.jpg'
    }
  ];

  const nextBust = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % busts.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const prevBust = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + busts.length) % busts.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevBust();
      if (e.key === 'ArrowRight') nextBust();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating]);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 0) {
        nextBust();
      } else if (e.deltaX < 0) {
        prevBust();
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#FAFAFA' }}
      onWheel={handleWheel}
    >
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-10">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
          style={{ color: '#444444' }}
        >
          <Icon name="Instagram" size={22} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
          style={{ color: '#444444' }}
        >
          <Icon name="Twitter" size={22} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
          style={{ color: '#444444' }}
        >
          <Icon name="Facebook" size={22} />
        </a>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <h1 
          className="text-5xl font-bold tracking-widest"
          style={{ color: '#444444', fontFamily: 'Montserrat, sans-serif' }}
        >
          RODSHIRE
        </h1>
      </div>

      <div className="flex items-center justify-center w-full max-w-6xl mx-auto px-4">
        <button
          onClick={prevBust}
          disabled={isAnimating}
          className="p-4 hover:scale-110 transition-transform duration-300 disabled:opacity-50"
          style={{ color: '#444444' }}
        >
          <Icon name="ChevronLeft" size={48} />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {busts.map((bust, index) => (
              <div
                key={bust.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ${
                  index === currentIndex
                    ? 'opacity-100 scale-100 z-10'
                    : index === (currentIndex - 1 + busts.length) % busts.length
                    ? 'opacity-0 -translate-x-full scale-90'
                    : 'opacity-0 translate-x-full scale-90'
                }`}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <img
                  src={bust.image}
                  alt={bust.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 
              className="text-4xl font-bold mb-2 transition-opacity duration-600"
              style={{ color: '#444444', fontFamily: 'Montserrat, sans-serif' }}
            >
              {busts[currentIndex].name}
            </h2>
            <p 
              className="text-xl tracking-wide transition-opacity duration-600"
              style={{ color: '#888888', fontFamily: 'Open Sans, sans-serif' }}
            >
              {busts[currentIndex].title}
            </p>
          </div>

          <div className="flex gap-3 mt-8">
            {busts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== currentIndex) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 600);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-12 opacity-100' : 'w-2 opacity-40'
                }`}
                style={{ backgroundColor: '#444444' }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextBust}
          disabled={isAnimating}
          className="p-4 hover:scale-110 transition-transform duration-300 disabled:opacity-50"
          style={{ color: '#444444' }}
        >
          <Icon name="ChevronRight" size={48} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="text-sm tracking-widest opacity-60"
          style={{ color: '#444444' }}
        >
          Пролистайте влево или вправо
        </p>
      </div>
    </div>
  );
};

export default Index;
