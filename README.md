# Anchor Marketplace UI

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
  - [Connect Wallet](#connect-wallet)
  - [Create a Marketplace](#create-a-marketplace)
  - [List a New Item](#list-a-new-item)
  - [Purchase or Delist an NFT](#purchase-or-delist-an-nft)
- [Technical Details](#technical-details)
  - [Connecting to Wallets](#connecting-to-wallets)
  - [Mock Data](#mock-data)
  - [Interacting with Smart Contracts](#interacting-with-smart-contracts)

## Introduction

Anchor Marketplace UI is a basic web-based interface for managing and interacting with NFT marketplaces and listings. It allows users to connect their wallets, create and manage marketplaces, and list, purchase, or delist NFTs.

## Project Structure

```
anchor-marketplace-ui/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── example-nft-1.png
│   │   ├── example-nft-2.png
│   │   ├── example-nft-3.png
│   │   ├── example-nft-4.png
│   │   ├── example-nft-5.png
│   │   ├── example-nft-6.png
│   │   ├── example-nft-7.png
│   │   ├── example-nft-8.png
│   │   ├── example-nft-9.png
│   │   ├── example-nft-10.png
│   │   └── default-nft-image.png
│   ├── contracts/
│   │   └── anchor_marketplace.json
│   ├── pages/
│   │   └── Marketplace.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
└── package.json
```

## Features

- Connect to Phantom and Solflare wallets
- Create and manage NFT marketplaces
- List, purchase, and delist NFTs
- View marketplace metrics such as floor price, 24h volume, market cap, etc.
- Custom pop-up messages for actions and notifications

## Installation

Before you begin, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

1. Clone the repository:

   ```sh
   git clone https://github.com/hhdgknsn/anchor-marketplace-basic-ui.git
   ```

2. Navigate to the project directory:

   ```sh
   cd anchor-marketplace-ui
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

## Running the Application

To start the application in development mode, run:

```sh
npm start
```

This will start the development server and open the application in your default web browser at `http://localhost:3000`.

## Usage

### Connect Wallet

1. Click on the `Connect Wallet` button.
2. Choose either `Phantom` or `Solflare` wallet.
3. Follow the prompts to connect your wallet.

### Create a Marketplace

1. Go to the `Admin Controls` dropdown.
2. Enter the marketplace name and fee percentage.
3. Click on `Initialize Marketplace`.

**Note:** The current implementation uses mock values for initializing a new marketplace.

### List a New Item

1. Go to the `List New Item` dropdown.
2. Enter the NFT name and price.
3. Click on `List NFT`.

### Purchase or Delist an NFT

1. Browse the listed NFTs.
2. Click on the `Purchase` or `Delist` button for the desired NFT.

## Technical Details

### Connecting to Wallets

The application allows users to connect to either Phantom or Solflare wallets. The `connectWallet` function handles the connection logic:

```javascript
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
```

### Mock Data

The application currently uses mock data for initializing marketplaces and listing NFTs. This can be seen in functions such as `fetchItems` and `initializeMarketplace`.

### Interacting with Smart Contracts

The application is designed to interact with Solana smart contracts using the Anchor framework. However, the current implementation for initializing a marketplace uses mock data:

```javascript
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
```

