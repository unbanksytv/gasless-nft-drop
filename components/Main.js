import { useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import tw from "tailwind-styled-components";

import { activeChainId } from "../pages/_app";
import { Button } from "./Button";
import Minting from "./Minting";

const Main = () => {
  const isMismatched = useNetworkMismatch()
  const [, switchNetwork] = useNetwork()

  const mismatched = (
    <ModalContainer>
      <Modal>
        <H2>Wrong network</H2>
        <Content>You are connected to the wrong network.</Content>
        <Button onclick={() => switchNetwork(activeChainId)}>Switch Network</Button>
      </Modal>
    </ModalContainer>
  )

  return (
    <>
      <Container>
        <VideoContainer>
         <video src="./H2F.mp4" muted={true} autoPlay={true} loop={true} />
        </VideoContainer>
        <Minting />
      </Container>
      {isMismatched && mismatched}
    </> 
  )
}

export default Main

const H2 = tw.h2`
  bold
  text-4xl
`

const Content = tw.p`
  my-5
`

const ModalContainer = tw.div`
  flex
  backdrop-blur-sm
  absolute
  w-full
  h-full
  top-0
  left-0
  z-50
  align-middle
  justify-center
`

const Modal = tw.div`
  p-5
  bg-black
  rounded-lg
  h-full
  md:h-64
  lg:h-52
  md:w-1/3
  flex
  flex-col
  mt-10
  justify-start
  lg:justify-between
`

const VideoContainer = tw.div`
 max-w-screen-lg
`

const Container = tw.div`
 flex
 flex-col
 items-center
 bg-gradient-color
`