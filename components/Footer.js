import tw from "tailwind-styled-components";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Container>
      <FooterContainer>
       <SocialLinkFooter href={"https://twitter.com/livethelifetv"} target={"_blank"} rel="noreferrer"> <FaTwitter /> </SocialLinkFooter>
       <SocialLinkFooter href={"https://discord.gg/gvo"} target={"_blank"} rel="noreferrer"> <FaDiscord /> </SocialLinkFooter>
      </FooterContainer>
    </Container>
  )
}

export default Footer

const SocialLinkFooter = tw.a`
 flex
 justify-center
`

const FooterContainer = tw.div`
 mt-[30px]
 flex
 justify-center
`

const Container = tw.div`
 flex
 my-5
 text-center
 w-full
 mt-1
`
