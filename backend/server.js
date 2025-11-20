import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// GET /api/coins endpoint
app.get('/api/coins', async (req, res) => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MiniUserDashboard/1.0'
      }
    });
    
    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'CoinGecko API endpoint not found' });
      }
      if (response.status >= 500) {
        return res.status(502).json({ error: 'CoinGecko API server error' });
      }
      return res.status(response.status).json({ error: `API error: ${response.statusText}` });
    }
    
    const data = await response.json();
    
    // Handle empty responses
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(200).json([]);
    }
    
    // Map response to return only required fields
    const filteredData = data.map(coin => ({
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      image: coin.image // Include image for logo display
    }));
    
    res.json(filteredData);
  } catch (error) {
    // Handle network errors and other exceptions
    console.error('Error fetching coins:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch currency data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

