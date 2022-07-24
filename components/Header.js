import tw from "tailwind-styled-components";
import Image from "next/image";
import logo from "../assets/LTL_V2-02.png";

const Header = () => {
  return (
    <Container>
      <HeaderContainer>
        <Image
          width={78}
          height={78}
          src={logo}
          alt="Logo"
        />
      </HeaderContainer>
    </Container>
  )
}

export default Header

const HeaderContainer = tw.div`
 mt-[30px]
`

const Container = tw.div`
 flex
 justify-center
 h-20
`