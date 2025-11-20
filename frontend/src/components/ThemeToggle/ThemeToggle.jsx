import './ThemeToggle.css';

const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <span className="theme-toggle-icon">{darkMode ? '☀️' : '🌙'}</span>
      <span className="theme-toggle-text">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle;

