// TokenList.jsx (güncellenmiş)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiTwitterXFill, RiStarLine, RiStarFill } from "react-icons/ri";
import "./home.css";
import { MiniChart } from "./components/mini-chart";
import { useNavigate } from "react-router-dom";

export const TokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=fartcoin,pnut,moodeng,daku,goat,alch,griffain,hotmom,chillguy,fwog,arc,ava,ban,act,zerebro,vine,house,titcoin,ufd,stonks,ainti,swarms,pippin,gork,lmt,daddy,pepe,cycle,shiba,wojak,wojak2&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en&price_change_percentage=1h%2C24h%2C7d"
      );
      const data = await res.json();
      console.log(data);

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.name,
        symbol: item.symbol.toUpperCase(),
        price: item.current_price,
        change1h: item.price_change_percentage_1h_in_currency || 0,
        priceChange24h: item.price_change_percentage_24h_in_currency || 0,
        change7d: item.price_change_percentage_7d_in_currency || 0,
        volume: item.total_volume,
        liquidity: item.total_volume / 2,
        mcap: item.market_cap,
        fdv: item.fully_diluted_valuation || item.market_cap,
        holders: Math.floor(Math.random() * 20000 + 1000),
        txns: Math.floor(Math.random() * 70000 + 5000),
        launched: "~",
        audited: Math.random() > 0.5,
        logo: item.image,
        sparkline: item.sparkline_in_7d?.price || [],
      }));
      setTokens(formatted);
    };

    fetchTokens();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filtered = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search) ||
      t.symbol.toLowerCase().includes(search)
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) =>
        sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
      )
    : filtered;

  const seedetails = (data) => {
    navigate(`/token/${data.id}`, { state: { token: data } });
  };

  return (
    <div className="dashboard">
      <aside className="df fdc sidebar">
        <h3 className="main-title">Sales <br /> Tracker</h3>
        <ul className="chain-list">
          {[
            "Solana",
            "Ethereum",
            "Base",
            "Arbitrum",
            "Polygon",
            "Sui",
            "BNB Chain",
            "Optimism",
            "Avalanche",
            "Tron",
            "Sei",
            "Mantle",
          ].map((chain) => (
            <li key={chain}>{chain}</li>
          ))}
        </ul>

        <div className="w100 df fdc gap-10 sidebar-highlight">
          <p>
            <strong>📊 24h Volume:</strong> $4.82B
          </p>
          <p>
            <strong>🔥 Active Traders:</strong> 142,389
          </p>
          <p>
            <strong>🧠 AI Insights Enabled</strong> ✔
          </p>
        </div>
        <div className="df fdc aic gap-10 links">
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w100 df aic jcc gap-20"
          >
            Follow Us on <RiTwitterXFill />
          </a>
          <button className="w100 df aic jcc gap-20">Login</button>
        </div>
      </aside>

      <main className="main">
        <div className="main-navbar">
          <div className="logo">
            <h1>Token Dashboard</h1>
          </div>
          <div className="df aic gap-10">
            <button className="btn">Connect Wallet</button>
            <button className="btn">Trade</button>
          </div>
        </div>
        <div className="df aic p-v-10 live-banners">
          <marquee behavior="scroll" direction="left">
            <span className="coin-info">
              Coins: <b>16,968</b> Exchanges: <b>1,273</b> Market Cap:{" "}
              <b>$3.418T</b> 4.0% 24h Vol: <b>$115.813B</b> Dominance: BTC{" "}
              <b>59.7%</b> ETH <b>9.04%</b> Gas: <b>5.424 GWEI</b>
            </span>
          </marquee>
        </div>
        <div className="stats-grid">
          <div className="stats-box cap">
            <p className="title">Market Cap</p>
            <h3>$3,395,113,224,095</h3>
            <span className="green">▼ 3.8%</span>
            <div className="mini-graph">
              <MiniChart data={[5, 10, 8, 12, 7, 14, 20, 15]} type="gain" />
            </div>
          </div>

          <div className="stats-box volume">
            <p className="title">24h Trading Volume</p>
            <h3>$115,139,658,255</h3>
            <span className="red">▼ 4.01%</span>
            <div className="mini-graph">
              <MiniChart data={[20, 18, 15, 14, 10, 8, 5]} type="loss" />
            </div>
          </div>

          <div className="stats-box trending">
            <p className="title">🔥 Trending</p>
            <ul>
              <li>
                <strong>AI Companions</strong> <span>$0.1343</span>{" "}
                <span className="red">-6.2%</span>
              </li>
              <li>
                <strong>Launch Coin on Believe</strong> <span>$0.2527</span>{" "}
                <span className="green">+25.1%</span>
              </li>
              <li>
                <strong>Sui</strong> <span>$3.71</span>{" "}
                <span className="red">-4.5%</span>
              </li>
            </ul>
          </div>

          <div className="stats-box gainers">
            <p className="title">🚀 Top Gainers</p>
            <ul>
              <li>
                <strong>Litentry</strong> <span>$1.48</span>{" "}
                <span className="green">+317.5%</span>
              </li>
              <li>
                <strong>Maple</strong> <span>$17.16</span>{" "}
                <span className="green">+150.8%</span>
              </li>
              <li>
                <strong>BabyBoomToken</strong> <span>$0.335</span>{" "}
                <span className="green">+38.3%</span>
              </li>
            </ul>
          </div>
        </div>

        <nav className="navbar df aic jcsb">
          <div className="filters df gap-10">
            <button className="active">Trending</button>
            <button>Top Gainers</button>
            <button>New</button>
            <button>24H</button>
          </div>
          <input
            type="text"
            placeholder="Search tokens..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </nav>

        <table className="token-table">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>Volume</th>
              <th>MCAP</th>
              <th>FDV</th>
              <th>Holders</th>
              <th>Chart</th>
              <th>Fav</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((token, index) => (
              <tr
                key={token.id}
                className="hover-grow cp"
                onClick={() => seedetails(token)}
              >
                <td>{index + 1}</td>
                <td className="h100 logo-name">
                  <img src={token.logo} className="logo" alt={token.name} />
                  <p>{token.name}</p>
                </td>
                <td>${token.price.toFixed(4)}</td>
                <td className={token.change1h >= 0 ? "positive" : "negative"}>
                  {token.change1h.toFixed(2)}%
                </td>
                <td
                  className={
                    token.priceChange24h >= 0 ? "positive" : "negative"
                  }
                >
                  {token.priceChange24h.toFixed(2)}%
                </td>
                <td className={token.change7d >= 0 ? "positive" : "negative"}>
                  {token.change7d.toFixed(2)}%
                </td>
                <td>${(token.volume / 1_000_000).toFixed(2)}M</td>
                <td>${(token.mcap / 1_000_000).toFixed(2)}M</td>
                <td>${(token.fdv / 1_000_000).toFixed(2)}M</td>
                <td>{token.holders.toLocaleString()}</td>
                <td>
                  <div className="spark-tooltip">
                    <svg width="60" height="24" viewBox="0 0 60 24">
                      <polyline
                        fill="none"
                        stroke={token.change7d >= 0 ? "#00e887" : "#ff5c5c"}
                        strokeWidth="2"
                        points={token.sparkline
                          .slice(0, 30)
                          .map((v, i) => `${i * 2},${24 - (v % 1) * 20}`)
                          .join(" ")}
                      />
                    </svg>
                    <div className="tooltip-text">
                      7d Change: {token.change7d.toFixed(2)}%
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="fav-btn"
                    onClick={() => toggleFavorite(token.id)}
                  >
                    {favorites.includes(token.id) ? (
                      <RiStarFill />
                    ) : (
                      <RiStarLine />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};
