import Head from "next/head";
import tw from "tailwind-styled-components";

// Components
import Header from "../../components/Header";
import { default as Gallery } from "../../components/Gallery/Listings";
import Footer from "../../components/Footer";

export default function Listings() {
  return (
    <Container>
      <Head>
        <title>The Photo Labs - NFT Gallery - All Listings</title>
        <meta name="description" content="Made with love by LiveTheLifeTV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Gallery />
      <Footer />
    </Container>
  )
}

const Container = tw.div`
 w-screen
 h-screen
 px-7
 flex
 flex-col
 justify-between
`