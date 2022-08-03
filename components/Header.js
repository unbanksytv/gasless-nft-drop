import tw from "tailwind-styled-components";
import Image from "next/image";
import logo from "../assets/logos/LTL_Logo_32.png";

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