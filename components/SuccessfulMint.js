import tw from "tailwind-styled-components";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useRouter } from "next/router";

import { CONFETTI_CONFIG } from "../common/constants";
import { Button } from "./Button";

const SuccessfulMint = () => {
  const router = useRouter()

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Container>
      <Heading>
        Mint Successful
      </Heading>
      <Button
        onclick={() => router.push('/view')}
      >
        View NFT
      </Button>
      <Particles id="tsparticles" options={CONFETTI_CONFIG} init={particlesInit} />
    </Container>
  )
}

export default SuccessfulMint

const Container = tw.div`
 flex
 flex-col
 items-center
 h-5/6
 justify-center
 content-center
`

const Heading = tw.h1`
  text-6xl
  font-bold
  italic
  mb-8
`
