import { useState, useEffect } from 'react';
import CoinTable from './components/CoinTable/CoinTable';
import SearchBar from './components/SearchBar/SearchBar';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { fetchCoins } from './services/api';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Apply dark mode theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Fetch coins on mount
  useEffect(() => {
    loadCoins();
  }, []);

  // Filter coins based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCoins(coins);
    } else {
      const filtered = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCoins(filtered);
    }
  }, [searchQuery, coins]);

  const loadCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoins();
      setCoins(data);
      setFilteredCoins(data);
    } catch (err) {
      setError('Failed to load cryptocurrency data. Please try again later.');
      console.error('Error loading coins:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    loadCoins();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app">
      <header className="app-header">
        {/* <h1 className="app-title">Cryptocurrency Dashboard</h1> */}
        <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
      </header>

      <main className="app-main">
        <div className="app-controls">
          <SearchBar value={searchQuery} onChange={handleSearch} />
          <button className="refresh-button" onClick={handleRefresh} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading cryptocurrency data...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={loadCoins}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && <CoinTable coins={filteredCoins} />}
      </main>
    </div>
  );
}

export default App;

