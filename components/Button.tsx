import tw from "tailwind-styled-components";

export const Button = ({ style = 'solid', children, onclick, disabled = false }) => {
  return (
    <>
      {style === 'solid' && <SolidButton onClick={onclick} disabled={disabled}>{children}</SolidButton>}
      {style === 'ghost' && <GhostButton onClick={onclick} disabled={disabled}>{children}</GhostButton>}
    </>
  )
}

const SolidButton = tw.button`
 flex
 justify-center
 items-center
 bg-[#f9d500]
 hover:bg-white
 transition-all
 text-black
 font-bold
 py-2
 px-4
 rounded
 uppercase
 h-14
`

const GhostButton = tw(SolidButton)`
 bg-black
 text-[#f9d500]
 border-2
 border-[#f9d500]
 hover:bg-[#f9d500]
 hover:text-black
`
