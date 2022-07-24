import { useNFTs, ThirdwebNftMedia, useMarketplace, useBuyNow, useActiveListings } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default function Marketplace() {
    const marketplace = useMarketplace("0x3Fe6cfeb8530B3283c4d3E276BCC418FFdc0b748");
    const { data: listings } = useActiveListings(marketplace);
    const { mutate: buy } = useBuyNow(marketplace);
  
    return (
      <div>
        {listings?.map((listing) => (
          <div key={listing.id.toString()}>
            <ThirdwebNftMedia
              metadata={{ ...listing.asset }}
            />
            <h3>{listing.asset.name}</h3>
            <p>
              {listing.buyoutCurrencyValuePerToken.displayValue}
              {" "}
              {listing.buyoutCurrencyValuePerToken.symbol}
            </p>
              <button
                onClick={() =>
                  buy({
                    id: listing.id,
                    type: listing.type,
                    buyAmount: 1,
                  })
                }
              >
                Buy
              </button>
          </div>
        ))}
      </div>
    );
  }