import { useAddress, useEdition, useMetamask } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Image from 'next/image';
import { useState } from "react";
import { nft } from "../nft";

const Mint: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const [tokenName, setTokenName] = useState("MATIC");
  const edition = useEdition("0x4E953584EaaeB49a91D0456C7d6d4B4B180B92A5");

  const mintWithSignature = async (tokenId: string) => {
    const signedPayloadReq = await fetch(`/api/generate-mint-sig`, {
      method: "POST",
      body: JSON.stringify({ tokenName, tokenId, address }),
    });

    const signedPayload = (await signedPayloadReq.json()).signedPayload;

    try {
      const nft = await edition?.signature.mint(signedPayload);
      return nft;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <div>
      {address ? (
        <div>
          <Image
            src={nft.image.replace(
              "ipfs://",
              "https://livethelife.tv/"
            )}
            alt={nft.name}
            width="200px"
            height="100%"
          />
          <div>
            <p>Name: {nft.name}</p>
            <p>Description: {nft.description}</p>
            <select onChange={(e) => setTokenName(e.target.value)}>
              {nft.tokens.map((token) => (
                <option key={token.name} value={token.name}>
                  {token.name}
                </option>
              ))}
            </select>
            <button onClick={() => mintWithSignature(nft.id)}>Mint</button>
          </div>
        </div>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Mint;