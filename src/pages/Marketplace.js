import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contracts/anchor_marketplace.json';
import '../index.css';
import logo from '../assets/anchor_logo.png';
import defaultNFTImage from '../assets/default-nft-image.png';

const exampleNFTs = [
  { image: require('../assets/example-nft-1.png'), name: 'Mock NFT 1' },
  { image: require('../assets/example-nft-2.png'), name: 'Mock NFT 2' },
  { image: require('../assets/example-nft-3.png'), name: 'Mock NFT 3' },
  { image: require('../assets/example-nft-4.png'), name: 'Mock NFT 4' },
  { image: require('../assets/example-nft-5.png'), name: 'Mock NFT 5' },
  { image: require('../assets/example-nft-6.png'), name: 'Mock NFT 6' },
  { image: require('../assets/example-nft-7.png'), name: 'Mock NFT 7' },
  { image: require('../assets/example-nft-8.png'), name: 'Mock NFT 8' },
  { image: require('../assets/example-nft-9.png'), name: 'Mock NFT 9' },
  { image: require('../assets/example-nft-10.png'), name: 'Mock NFT 10' },
];

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [account, setAccount] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [walletProvider, setWalletProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marketplaces, setMarketplaces] = useState([]);
  const [walletPopupVisible, setWalletPopupVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const contractAddress = 'mktYdagPAAnuHigRD62zLpHshZqx7vpKHjN3fN6MPjy';

  useEffect(() => {
    fetchItems();
  }, []);

  const connectWallet = async (providerName) => {
    if (providerName === 'phantom' && window.solana && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        setAccount(resp.publicKey.toString());
        setWalletProvider(window.solana);
      } catch (error) {
        console.error("Error connecting to Phantom wallet:", error);
      }
    } else if (providerName === 'solflare' && window.solflare && window.solflare.isSolflare) {
      try {
        await window.solflare.connect();
        if (window.solflare.isConnected) {
          setAccount(window.solflare.publicKey.toString());
          setWalletProvider(window.solflare);
        }
      } catch (error) {
        console.error("Error connecting to Solflare wallet:", error);
      }
    } else {
      alert("Wallet not detected. Please install Phantom or Solflare wallet.");
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const mockItems = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `NFT ${index + 1}`,
        price: ethers.parseUnits('0.1', 'ether'),
        floor: Math.random().toFixed(2),
        sellNow: Math.random().toFixed(2),
        volume24h: (Math.random() * 10000).toFixed(0),
        change24h: (Math.random() * 10 - 5).toFixed(2),
        sales: (Math.random() * 1000).toFixed(0),
        marketCap: (Math.random() * 100000).toFixed(0),
        totalVolume: (Math.random() * 100000).toFixed(0),
        listed: (Math.random() * 100).toFixed(0),
        makerMint: `mockMakerMint${index + 1}`,
        bump: `mockBump${index + 1}`,
        image: exampleNFTs[index % exampleNFTs.length].image,
      }));
      setItems(mockItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const listNewItem = async () => {
    if (!itemName || !itemPrice) {
      alert("Please provide item name and price.");
      return;
    }
    setLoading(true);
    try {
      const newItem = {
        id: items.length + 1,
        name: itemName,
        price: ethers.parseUnits(itemPrice, 'ether'),
        floor: Math.random().toFixed(2),
        sellNow: Math.random().toFixed(2),
        volume24h: (Math.random() * 10000).toFixed(0),
        change24h: (Math.random() * 10 - 5).toFixed(2),
        sales: (Math.random() * 1000).toFixed(0),
        marketCap: (Math.random() * 100000).toFixed(0),
        totalVolume: (Math.random() * 100000).toFixed(0),
        listed: (Math.random() * 100).toFixed(0),
        makerMint: 'mockMakerMint',
        bump: 'mockBump',
        image: defaultNFTImage, // Use default image for new listings
      };
      setItems([...items, newItem]);
      setPopupMessage({ title: "Success", content: "NFT listed successfully!" });
      setItemName('');
      setItemPrice('');
    } catch (error) {
      console.error("Error listing NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const delistItem = async (itemId) => {
    setLoading(true);
    try {
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
      setPopupMessage({ title: "Success", content: "NFT delisted successfully!" });
    } catch (error) {
      console.error("Error delisting NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const purchaseItem = async (itemId) => {
    setLoading(true);
    try {
      const item = items.find(item => item.id === itemId);
      if (item) {
        setPopupMessage({ 
          title: "Purchase Successful", 
          content: `Purchased ${item.name} for ${ethers.formatUnits(item.price, 'ether')} SOL`
        });
      }
    } catch (error) {
      console.error("Error purchasing NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeMarketplace = async (e) => {
    e.preventDefault();
    const marketplaceName = e.target.marketplaceName.value;
    const fee = e.target.fee.value;
    setLoading(true);
    try {
      const newMarketplace = {
        name: marketplaceName,
        fee: `${fee}%`,
        admin: 'mockPublicKey1234567890',
        bump: 'mockBumpSeed',
        treasuryBump: 'mockTreasuryBump',
        rewardsBump: 'mockRewardsBump',
      };
      setMarketplaces([...marketplaces, newMarketplace]);
      setPopupMessage({ title: "Success", content: "Marketplace initialized successfully!" });
    } catch (error) {
      console.error("Error initializing marketplace:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWalletClick = () => {
    setWalletPopupVisible(true);
  };

  const handleClosePopup = () => {
    setWalletPopupVisible(false);
  };

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-menu') && !event.target.closest('.three-dot-menu')) {
      setDropdownVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closePopupMessage = () => {
    setPopupMessage(null);
  };

  const deleteMarketplace = (index) => {
    const updatedMarketplaces = marketplaces.filter((_, i) => i !== index);
    setMarketplaces(updatedMarketplaces);
  };

  return (
    <div className="marketplace">
      <header className="marketplace-header">
        <img src={logo} alt="Anchor Protocol Logo" className="logo" />
        <h1>MARKETPLACE</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search collections" />
        </div>
        <button className="connect-wallet-btn" onClick={handleConnectWalletClick}>
          Connect Wallet
        </button>
        <div className="account-info">{account ? `Connected: ${account}` : null}</div>
        <div className="header-options">
          <div className="dropdown">
            <span className="dropdown-label">Admin Controls</span>
            <div className="dropdown-content">
              <form onSubmit={initializeMarketplace}>
                <div className="control-group">
                  <label>Marketplace Name</label>
                  <input
                    type="text"
                    name="marketplaceName"
                    placeholder="Marketplace Name"
                    required
                  />
                </div>
                <div className="control-group">
                  <label>Marketplace Status</label>
                  <select>
                    <option>Open</option>
                    <option>Closed</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>Fee (%)</label>
                  <input
                    type="number"
                    name="fee"
                    placeholder="2.5"
                    step="0.01"  // Allow decimal inputs
                    required
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? "Initializing..." : "Initialize Marketplace"}
                </button>
              </form>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropdown-label">List New Item</span>
            <div className="dropdown-content">
              <form onSubmit={(e) => { e.preventDefault(); listNewItem(); }}>
                <div className="control-group">
                  <label>NFT Name</label>
                  <input
                    type="text"
                    placeholder="NFT Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>
                <div className="control-group">
                  <label>NFT Price (SOL)</label>
                  <input
                    type="number"
                    placeholder="NFT Price (SOL)"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    step="0.01"  // Allow decimal inputs
                    required
                  />
                </div>
                <button type="submit">List NFT</button>
              </form>
            </div>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="marketplace-items">
          <div className="nft-metrics">
            <span>Floor</span>
            <span>Sell Now</span>
            <span>24h Volume</span>
            <span>24h Change</span>
            <span>Sales</span>
            <span>Market Cap</span>
            <span>Total Volume</span>
            <span>Listed</span>
            <span>Maker Mint</span>
            <span>Bump</span>
          </div>
          <ul>
            {items.map((item, index) => (
              <li key={item.id} className="marketplace-item">
                <div className="details">
                  <section id='section-numer-star'>
                    <span className="star-icon">⭐</span>
                    <span>{index + 1}</span>
                  </section>
                  <section id='section-nft-image-name'>
                    <img src={item.image || defaultNFTImage} alt={item.name} />
                    <span>{item.name}</span>
                  </section>
                  <span>{item.floor}</span>
                  <span>{item.sellNow}</span>
                  <span>{item.volume24h}</span>
                  <span>{item.change24h}%</span>
                  <span>{item.sales}</span>
                  <span>{item.marketCap}</span>
                  <span>{item.totalVolume}</span>
                  <span>{item.listed}%</span>
                  <span>{ethers.formatUnits(item.price, 'ether')} SOL</span> {/* Display price */}
                  <div className="three-dot-menu" onClick={() => toggleDropdown(index)}>
                    &#x22EE; {/* Unicode for vertical ellipsis */}
                  </div>
                  {dropdownVisible === index && (
                    <div className="dropdown-menu show">
                      <div className="dropdown-item" data-tooltip="mockMakerMintValue">
                        Maker Mint
                      </div>
                      <div className="dropdown-item" data-tooltip="mockBumpValue">
                        Bump
                      </div>
                    </div>
                  )}
                </div>
                <div className="actions">
                  <button onClick={() => purchaseItem(item.id)} className="purchase-btn">Purchase</button>
                  <button onClick={() => delistItem(item.id)} className="delist-btn">Delist</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Display created marketplaces */}
        <div className="marketplaces">
          <h2>Created Marketplaces</h2>
          <ul>
            {marketplaces.map((marketplace, index) => (
              <li key={index}>
                <div className="marketplace-details">
                  <p><strong>Name:</strong> {marketplace.name}</p>
                  <p><strong>Fee:</strong> {marketplace.fee}</p>
                  <p><strong>Admin:</strong> {marketplace.admin}</p>
                  <p><strong>Bump:</strong> {marketplace.bump}</p>
                  <p><strong>Treasury Bump:</strong> {marketplace.treasuryBump}</p>
                  <p><strong>Rewards Bump:</strong> {marketplace.rewardsBump}</p>
                  <button className="delete-btn" onClick={() => deleteMarketplace(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {walletPopupVisible && (
        <div className="wallet-popup">
          <div className="wallet-popup-content">
            <div className="close-button" onClick={handleClosePopup}>
              <span>X</span>
            </div>
            <h2>Connect Wallet</h2>
            <button onClick={() => connectWallet('phantom')}>Connect Phantom Wallet</button>
            <button onClick={() => connectWallet('solflare')}>Connect Solflare Wallet</button>
          </div>
        </div>
      )}

      {popupMessage && (
        <div className="popup-message">
          <h2>{popupMessage.title}</h2>
          <p>{popupMessage.content}</p>
          <button onClick={closePopupMessage}>Close</button>
        </div>
      )}

      {dropdownVisible !== null && <div className="overlay show" />}
    </div>
  );
};

export default Marketplace;
