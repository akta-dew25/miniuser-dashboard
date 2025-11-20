import './CoinTable.css';

const CoinTable = ({ coins }) => {
  if (!coins || coins.length === 0) {
    return <div className="coin-table-empty">No coins to display</div>;
  }

  const formatPrice = (price) => {
    if (price === null || price === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap === null || marketCap === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(marketCap);
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return 'N/A';
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="coin-table-container">
      <table className="coin-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={`${coin.symbol}-${index}`}>
              <td>
                <img
                  src={coin.image || '/placeholder-coin.png'}
                  alt={coin.name}
                  className="coin-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="coin-logo-placeholder" style={{ display: 'none' }}>
                  {coin.symbol?.charAt(0).toUpperCase() || '?'}
                </span>
              </td>
              <td className="coin-name">{coin.name || 'N/A'}</td>
              <td className="coin-symbol">{coin.symbol?.toUpperCase() || 'N/A'}</td>
              <td className="coin-price">{formatPrice(coin.current_price)}</td>
              <td
                className={`coin-change ${
                  coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
                }`}
              >
                {formatPercentage(coin.price_change_percentage_24h)}
              </td>
              <td className="coin-market-cap">{formatMarketCap(coin.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;

