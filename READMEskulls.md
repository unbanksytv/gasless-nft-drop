# [Next.js](https://nextjs.org/) NFT Mint dApp

A simple, fast and modern dApp for minting NFTs.

This dApp is actually used by [Skulls In Love](https://www.skullsin.love/).

## Required

- [MetaMask](https://metamask.io/) is installed in your browser
- The networks used in your project are registered in your MetaMask

## Usage

1 . Clone this repo:

```sh
git clone https://github.com/kjmczk/nextjs-nft-mint-dapp.git
```

2 . Change into the directory:

```sh
cd nextjs-nft-mint-dapp
```

3 . Install the dependencies:

```sh
npm install
```

4 . Set up the config file(s):

Replace the values in the `config/projectConfig.ts` file with yours as needed.

> This dApp is by default using **Mumbai Testnet** for development and **Polygon Mainnet** for production.

> If you want to use other networks (eg **Ethereum Mainnet** and **Rinkeby Testnet**), edit the `config/rpcConfig.ts` file as well. Then follow the steps below to set your [Infura](https://infura.io/) key.
> 
> 1 . Get Infura API key: https://infura.io/
> 
> 2 . Copy the `.env.local.example` file to `.env.local`:
> 
> ```sh
> cp .env.local.example .env.local
> ```
> 
> 3 . Set your Infura KEY (PROJECT ID) to `NEXT_PUBLIC_INFURA_KEY` in `.env.local`
> 
> NOTE: I highly recommend setting some allowlists on the Infura dashboard to keep your Infura key secure. See the Infura doc "[Use an allowlist](https://docs.infura.io/infura/networks/ethereum/how-to/secure-a-project/use-an-allowlist)"

> **Mumbai Testnet** and **Polygon Mainnet** can use their public RPCs, but if necessary, you can also use the dedicated RPC URLs by getting your Infura key as above.

5 . Add your **ABI**:

Include your contract **ABI** in `config/abi.json`.

> If you deployed your contract using [Remix](https://remix.ethereum.org/), see the [Remix documentation](https://remix-ide.readthedocs.io/en/latest/run.html) for how to generate an ABI.

6 . Run the server:

```sh
npm run dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> If you deploy to a hosting provider other than Vercel, I cannot guarantee that this dApp will work properly.

## Connect MetaMask Mobile

To connect to MetaMask on mobile, install [MetaMask Mobile](https://metamask.io/download/) on your smartphone. You can choose to use it when you want to connect your wallet in your mobile browser. If it is not installed, you will be taken to the installation page for each store.
