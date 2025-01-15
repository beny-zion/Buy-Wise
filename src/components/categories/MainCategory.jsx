// MainCategory.jsx
import { useCategories } from '../../contexts/CategoryContext';
import { motion } from 'framer-motion';

const MainCategory = ({ category }) => {
  const { selectedMain, setSelectedMain } = useCategories();
  const isSelected = selectedMain?._id === category._id;
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setSelectedMain(category)}
      className={`flex items-center gap-2 px-4 py-1 rounded-xl
                 transition-colors whitespace-nowrap flex-shrink-0
                 ${isSelected 
                   ? 'bg-[#FFA066]/10 text-[#FFA066]' 
                   : 'hover:bg-gray-100 text-gray-600'}`}
    >
      <span className="text-xl">{category.icon}</span>
      <span className={`text-sm ${isSelected ? 'font-medium' : 'font-normal'}`}>
        {category.name}
      </span>
    </motion.button>
  );
};

export default MainCategory;