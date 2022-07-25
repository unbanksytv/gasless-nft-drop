import { useMetamask, useAddress, useEditionDrop } from "@thirdweb-dev/react";
import styles from "../styles/Nft.module.css";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const editionDrop = useEditionDrop(
    "0x4E953584EaaeB49a91D0456C7d6d4B4B180B92A5"
  );
  
  const tokenId = 0;
  const quantity = 1;

  const claimNFT = async () => {
    try {
      await editionDrop?.claimTo(address, tokenId, quantity);
      console.log("🎉 NFT claimed successfully!");
    } catch (err) {
      console.log("💩 Error claiming NFT: ", err);
    }
  };

  return (
    <div className={styles.container}>
      {address ? (
        <button onClick={claimNFT}>Claim NFT</button>
      ) : (
        <button onClick={connectWithMetamask}>Sign in with metamask</button>
      )}
    </div>
  );
}
