import styles from './wallet.module.css'
import Back from '../../components/Back'
import { SUPPORTED_WALLETS } from '../../constants'
import WalletOption from './WalletOption'
import { injected } from '../../connectors'

const ConnectWallet = ({}) => {
  function getWalletOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <WalletOption id={`connect-${key}`} key={key} name={'Metamask'} icon={'/images/wallets/metamask.png'} />
            )
          } else {
            return null
          }
        }
      }
      // don't return metamask if injected provider isn't metamask
      else if (option.name === 'MetaMask' && !isMetamask) {
        return null
      }
      // likewise for generic
      else if (option.name === 'Injected' && isMetamask) {
        return null
      }

      return (
        <WalletOption id={`connect-${key}`} key={key} name={option.name} icon={'/images/wallets/' + option.iconName} />
      )
    })
  }

  return (
    <>
      <div className="grid grid-cols-6 mt-5">
        <div className="col-start-3 col-span-2 md:max-w-sm">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-row items-center">
              <Back showText={false} className="w-8 h-14 mt-1" />
              <div className="flex flex-col w-full">
                <p className={styles.TextGroup1}>Connect Wallet</p>
              </div>
            </div>
            <div className={styles.TextGroup3}>
              <p>Select the wallet you would like to connect</p>
              <p>to Surehive.</p>
            </div>
            <div className="grid justify-items-center space-y-6">{getWalletOptions()}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectWallet
