import styles from './swap.module.css'
import Image from 'next/image'

export default function SwapRatePanel({ showSettings, setShowSettings, currentTheme }) {
  const imageSrc =
    currentTheme === 'dark' ? '/images/global/icon-setting-white.svg' : '/images/global/icon-setting-dark-light.svg'

  return (
    <div className="flex justify-between items-center h-full p-4 mobile:px-6">
      <div className="flex space-x-2 text-xs items-center">
        <div style={{ backgroundColor: '#627EEA', height: '10px', width: '10px' }} className="rounded-full" />
        <div>{'1 ETH'}</div>
        <div>{'='}</div>
        <div style={{ backgroundColor: '#2775C9', height: '10px', width: '10px' }} className="rounded-full" />
        <div>{'3,243.35 USDC'}</div>
      </div>
      <div>
        <div
          className={showSettings ? styles.SwapSettingsButtonActive : styles.SwapSettingsButton}
          onClick={() => {
            setShowSettings(!showSettings)
          }}
        >
          <Image src={imageSrc} alt={'icon-setting'} width={'21px'} height={'21px'} />
        </div>
      </div>
    </div>
  )
}
