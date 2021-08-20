import { isMobile } from 'react-device-detect'

const DoubleGlowShadow = ({ children }) => {
  if (isMobile) {
    return <div className="shadow-swap">{children}</div>
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative filter drop-shadow">{children}</div>
    </div>
  )
}

export default DoubleGlowShadow
