import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HymnDetailProps {
  hymn: {number: number, titlePt: string, versePt: string};
  onBack: () => void;
}

const HymnDetail = ({ hymn, onBack }: HymnDetailProps) => {
  return (
    <div className="p-4">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 mb-4"
      >
        <ChevronRight className="rotate-180 mr-1" size={20} />
        Voltar
      </button>
      
      <h2 className="text-2xl font-bold mb-2">
        #{hymn.number} • {hymn.titlePt}
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
        {hymn.versePt}
      </div>
    </div>
  );
};

export default HymnDetail;