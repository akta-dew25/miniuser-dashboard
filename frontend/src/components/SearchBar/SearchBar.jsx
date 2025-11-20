import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search coins by name...' }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

