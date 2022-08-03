import { ChainId } from "@thirdweb-dev/sdk";
import fs from "fs";
// This function hits the Covalent API `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?nft=true`
// For each of the supported Chain ID's we have in the ChainId Enum imported above.

// It records the time it takes to get the data from the API.
// It then returns the time it took to get the data from the API.

// It should then output each time it took to get the data from the API into a csv file in the following format:
// ChainId, Time 1, Time 2, Time 3, Time 4, Time 5, Time 6, Time 7, Time 8, Time 9, Time 10
// 1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0

const chainIds = {
  Mainnet: 1,
  Rinkeby: 4,
  Goerli: 5,
  Polygon: 137,
  Mumbai: 80001,
  Harmony: 1666600000,
  Localhost: 1337,
  Hardhat: 31337,
  Fantom: 250,
  FantomTestnet: 4002,
  Avalanche: 43114,
  AvalancheFujiTestnet: 43113,
  Optimism: 10,
  OptimismTestnet: 69,
  Arbitrum: 42161,
  ArbitrumTestnet: 421611,
};

(async () => {
  const chains = {
    Mainnet: [],
    Rinkeby: [],
    Goerli: [],
    Polygon: [],
    Mumbai: [],
    Harmony: [],
    Fantom: [],
    FantomTestnet: [],
    Avalanche: [],
    AvalancheFujiTestnet: [],
    Optimism: [],
    OptimismTestnet: [],
    Arbitrum: [],
    ArbitrumTestnet: [],
  };
  const iteratez = Object.keys(chains);

  for (const chainId of iteratez) {
    console.log("Starting" + chainId);

    // API config
    const address = "0x470FAF7c48203276eCD3fF1f3C43894f66288574";
    const apikey = "xxx";
    let headers = new Headers();
    let authString = `${apikey}:`;
    headers.set("Authorization", "Basic " + btoa(authString));

    for (let i = 0; i < 25; i++) {
      try {
        // Start  timer
        const start = Date.now();
        // Get data from API
        const URL = `https://api.covalenthq.com/v1/${chainIds[chainId]}/address/${address}/balances_v2/?nft=true`;
        const req = await fetch(URL, { method: "GET", headers: headers });

        const res = await req.json();

        if (res.error) {
          console.log(res.error_message);
          const time = "FAILED";
          chains[chainId].push(time);
          continue;
        }

        // Stop timer
        const end = Date.now();
        const time = end - start;

        // Add time to array
        chains[chainId].push(time);
      } catch (err) {
        console.log("Failed to fetch data from API for Chain ID: " + chainId);
        console.log(err);
      }
    }
  }
  const csv = Object.entries(chains)
    .map(([key, value]) => {
      return `${key}, ${value.join(", ")}`;
    })
    .join("\n");

  fs.writeFileSync("benchmark.csv", csv);
})();
