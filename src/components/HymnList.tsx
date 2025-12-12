import React from 'react';
import { Heart } from 'lucide-react';

// ✅ Agora recebe props (dados e funções do pai)
interface HymnListProps {
  hymns: Array<{id: number, number: number, titlePt: string, versePt: string}>;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  onHymnClick: (hymn: any) => void;
  searchTerm: string;
}

const HymnList = ({ hymns, favorites, toggleFavorite, onHymnClick, searchTerm }: HymnListProps) => {
  // Filtra hinos pela busca
  const filteredHymns = hymns.filter(hymn =>
    hymn.titlePt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hymn.versePt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hinário IUBM ({filteredHymns.length} hinos)</h2>
      
      {filteredHymns.map(hymn => (
        <div 
          key={hymn.id} 
          className="p-4 mb-3 bg-white rounded-lg shadow border hover:shadow-md cursor-pointer"
          onClick={() => onHymnClick(hymn)}
        >
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-blue-600 mr-3">#{hymn.number}</span>
              <h3 className="text-lg font-semibold inline">{hymn.titlePt}</h3>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(hymn.id);
              }}
              className="p-2"
            >
              <Heart 
                size={20} 
                className={favorites.includes(hymn.id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
              />
            </button>
          </div>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">{hymn.versePt}</p>
        </div>
      ))}
    </div>
  );
};

export default HymnList;