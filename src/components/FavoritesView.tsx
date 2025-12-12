import React from 'react';

interface FavoritesViewProps {
  hymns: Array<{id: number, number: number, titlePt: string}>;
  favorites: number[];
  onHymnClick: (hymn: any) => void;
}

const FavoritesView = ({ hymns, favorites, onHymnClick }: FavoritesViewProps) => {
  const favoriteHymns = hymns.filter(hymn => favorites.includes(hymn.id));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Hinos Favoritos ({favoriteHymns.length})
      </h2>
      
      {favoriteHymns.length === 0 ? (
        <p className="text-gray-500">Nenhum hino favoritado ainda.</p>
      ) : (
        <div className="space-y-3">
          {favoriteHymns.map(hymn => (
            <div 
              key={hymn.id}
              className="p-3 bg-yellow-50 border border-yellow-200 rounded cursor-pointer hover:bg-yellow-100"
              onClick={() => onHymnClick(hymn)}
            >
              <span className="font-bold text-amber-600 mr-3">#{hymn.number}</span>
              {hymn.titlePt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;