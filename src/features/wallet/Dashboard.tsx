import styles from './wallet.module.css'
import Button from '../../components/Button'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { SUPPORTED_WALLETS } from '../../constants'
import ReactGA from 'react-ga'
import { useRouter } from 'next/router'

const WalletDashboard = ({ account, chainId, connector }) => {
  const { i18n } = useLingui()
  const { deactivate } = useWeb3React()
  const router = useRouter()

  const tryDeactivation = async (connector) => {
    let name = ''

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Deactivate Wallet',
      label: name,
    })

    deactivate()
    router.push('/wallet').catch()
  }

  const addressBar = () => (
    <div className={styles.AddressBar}>
      <div className={styles.ActiveLight} />
      <p>ETH</p>
      <div className={styles.Address}>{account}</div>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-12 dark:bg-dark-900 bg-white-130">
        <div className={styles.dashboard}>
          <div className="grid gap-y-14 flex flex-col px-20 pt-10">
            <div className={styles.AddressPanel}>
              <h1>Wallet</h1>
              {addressBar()}
            </div>
            <div className={styles.BalancePanel}>
              <div></div>
              <div className="grid">
                <div className={styles.BalancePanelButtons}>
                  <div className={styles.BalancePanelButtonsDisconnect}>
                    <Button
                      onClick={() => {
                        tryDeactivation(connector)
                      }}
                    >
                      {i18n._(t`Disconnect`)}
                    </Button>
                  </div>
                  <Button className={styles.BalancePanelButtonsView}>{i18n._(t`View`)}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-dark-900"></div>
      </div>
    </>
  )
}

export default WalletDashboard
