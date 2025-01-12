// components/search/SelectedCategories.jsx
const SelectedCategories = ({ categories = [] }) => {
    if (!categories?.length) return null;
  
    return (
      <div className="flex flex-wrap gap-2" dir="rtl">
        {categories.map(category => (
          <div
            key={category._id}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
          >
            <span>{category.name}</span>
            {category.subCategories?.length > 0 && (
              <span className="text-xs text-blue-500">
                ({category.subCategories.length})
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default SelectedCategories;