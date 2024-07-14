# Anchor Marketplace UI

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Anchor Marketplace UI is a web-based interface for managing and interacting with NFT marketplaces and listings. It allows users to connect their wallets, create and manage marketplaces, and list, purchase, or delist NFTs.

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
   git clone https://github.com/hhdgknsn/anchor-marketplace-ui.git
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

Note: The current implementation uses mock values for initializing a new marketplace.

### List a New Item

1. Go to the `List New Item` dropdown.
2. Enter the NFT name and price.
3. Click on `List NFT`.

### Purchase or Delist an NFT

1. Browse the listed NFTs.
2. Click on the `Purchase` or `Delist` button for the desired NFT.
```
