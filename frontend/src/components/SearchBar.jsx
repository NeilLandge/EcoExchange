import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => {
  // call onChange on every keystroke for live search
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-2xl mx-auto mb-8 flex items-center gap-2"
    >
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search items by name or description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field pl-12 pr-4"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {/* Optionally keep button for accessibility, but not required for live search */}
    </form>
  );
};

export default SearchBar;
