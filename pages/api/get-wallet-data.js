export default async function getWalletData(req, res) {
  // get address out of request body
  const address = req.body.address;
  const chainId = req.body.chainId;

  const apikey = process.env.COVALENT_API_KEY;

  let headers = new Headers();
  let authString = `${apikey}:`;
  headers.set("Authorization", "Basic " + btoa(authString));
  const URL = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?nft=true&no-nft-fetch=false`;

  try {
    const covalentRequest = await fetch(URL, {
      method: "GET",
      headers: headers,
    });
    const covalentResponse = await covalentRequest.json();

    const tokens = covalentResponse.data.items;

    return res.status(200).json({
      tokens: tokens,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error,
    });
  }
}
