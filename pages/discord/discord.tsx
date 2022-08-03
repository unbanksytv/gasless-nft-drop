import { useAddress, useSDK } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import SignIn from "../components/SignIn";
import styles from "../styles/Nft.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Discord: NextPage = () => {
  const address = useAddress();
  const { data: session } = useSession();
  const sdk = useSDK();

  async function requestGrantRole() {
    // First, login and sign a message
    const domain = "thirdweb.com";
    const loginPayload = await sdk?.auth.login(domain);
    console.log(loginPayload);

    // Then make a request to our API endpoint.
    try {
      const response = await fetch("/api/grant-role", {
        method: "POST",
        body: JSON.stringify({
          loginPayload,
        }),
      });
      const data = await response.json();
      console.log(data);
      alert("Check the console for the response!");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Head>
        <title>Discord Life</title>
        <meta name="description" content="Made with love by LiveTheLifeTV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container} style={{ marginTop: 0 }}>
        <SignIn />

        {address && session && (
          <div className={styles.collectionContainer}>
            <button className={styles.mainButton} onClick={requestGrantRole}>
              Give me the role!
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Discord;