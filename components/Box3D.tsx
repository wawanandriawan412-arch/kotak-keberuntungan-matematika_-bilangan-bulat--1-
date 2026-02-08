
import React from 'react';

interface Box3DProps {
  id: number;
  isOpen: boolean;
  onClick: () => void;
  isCompleted: boolean;
}

const Box3D: React.FC<Box3DProps> = ({ id, isOpen, onClick, isCompleted }) => {
  return (
    <div 
      className={`relative w-32 h-32 md:w-40 md:h-40 cursor-pointer perspective-1000 group transition-all duration-500 ${isCompleted ? 'opacity-40 scale-90 pointer-events-none grayscale-[0.5]' : 'hover:scale-110 active:scale-95'}`}
      onClick={onClick}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isOpen ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-orange-700 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-yellow-200 overflow-hidden">
           {/* Shimmer Effect */}
           {!isCompleted && (
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
           )}
           
           <div className="text-white text-5xl md:text-6xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] select-none z-10">
             {id}
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-200/30 rounded-full blur-sm"></div>
           <div className="absolute bottom-2 right-2 w-8 h-8 bg-black/10 rounded-full"></div>
        </div>

        {/* Back Side (Inside) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-slate-800 rounded-2xl shadow-inner border-4 border-slate-600 overflow-hidden">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full mb-2 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="text-white font-bold text-xl">?</span>
              </div>
              <span className="text-blue-300 font-bold text-[10px] tracking-widest uppercase">MEMPROSES</span>
            </div>
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-45deg); }
          100% { transform: translateX(150%) skewX(-45deg); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Box3D;
