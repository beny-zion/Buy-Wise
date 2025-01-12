import { useCategories } from '../../contexts/CategoryContext';

const MainCategory = ({ category }) => {
  const { selectedMain, setSelectedMain } = useCategories();
  const isSelected = selectedMain?._id === category._id;
  
  return (
    <button
      onClick={() => setSelectedMain(category)}
      className={`flex flex-col items-center p-4 rounded-lg transition-all flex-shrink-0 ${
        isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
      }`}
    >
      <span className="text-2xl mb-2">{category.icon}</span>
      <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
    </button>
  );
};

export default MainCategory;