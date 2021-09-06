import styles from './wallet.module.css'
import Back from '../../components/Back'
import { SUPPORTED_WALLETS } from '../../constants'
import WalletOption from './WalletOption'
import { injected } from '../../connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'
import ReactGA from 'react-ga'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

const ConnectWallet = ({}) => {
  const { activate } = useWeb3React()
  const router = useRouter()

  const tryActivation = async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
    let name = ''
    let conn = typeof connector === 'function' ? await connector() : connector

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name,
    })

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.wc?.uri) {
      conn.walletConnectProvider = undefined
    }

    conn &&
      activate(conn, undefined, true)
        .then(() => {
          router.push('/wallet')
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(conn) // a little janky...can't use setError because the connector isn't set
          } else {
            ///TODO: show error
          }
        })
  }

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
              <WalletOption
                id={`connect-${key}`}
                key={key}
                name={'Metamask'}
                icon={'/images/wallets/metamask.png'}
                link={'https://metamask.io/'}
              />
            )
          } else {
            return null
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
      }

      return (
        <WalletOption
          id={`connect-${key}`}
          key={key}
          name={option.name}
          icon={'/images/wallets/' + option.iconName}
          link={option.href}
          onClick={() => {
            !option.href && tryActivation(option.connector)
          }}
        />
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
