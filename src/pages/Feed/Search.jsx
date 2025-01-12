import React, { useState }from 'react'
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';


export default function SearchQuery({ categories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

const duplicatedCategories = [...categories, ...categories, ...categories];

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 20) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const newIndex = (currentIndex + direction + categories.length) % categories.length;
      setCurrentIndex(newIndex);
    }
    setIsDragging(false);
  };

  const getScale = (index) => {
    const distance = Math.abs(index - (currentIndex + categories.length));
    if (distance === 0) return 1;
    return 0.85 - (distance * 0.05);
  };

  const getOpacity = (index) => {
    const distance = Math.abs(index - (currentIndex + categories.length));
    return 1 - (distance * 0.2);
  };


  return (
        <div >
          <input
            type="text"
            className="w-full bg-black/30 backdrop-blur-sm text-white rounded-full px-4 py-2 pr-10"
            placeholder="חיפוש..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-white/70" size={20} />
        </div>
  )
}
