import Image from 'next/image'
import styles from './wallet.module.css'
import Button from '../../components/Button'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

const NoWallet = ({}) => {
  const { i18n } = useLingui()
  const router = useRouter()
  const { systemTheme, theme, setTheme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme
  const logo =
    currentTheme === 'dark'
      ? '/images/wallets/icon-wallet-connect.svg'
      : '/images/wallets/icon-wallet-connect-light.svg'

  return (
    <>
      <div className="grid grid-cols-6 mt-20">
        <div className="col-start-3 col-span-2">
          <div className="flex flex-col space-y-6">
            <Image src={logo} width={122} height={115} />
            <div className={styles.TextGroup1}>No Wallet, no problem.</div>
            <div className={styles.TextGroup2}>
              <p>Connect your current wallet through the secure</p>
              <p>blockchain network to start swapping tokens,</p>
              <p>or alternatively create a Surehive wallet today.</p>
            </div>
            <div className="grid justify-items-center space-y-6">
              <Button className={styles.ConnectWalletButton} onClick={() => router.push('/wallet/connect')}>
                {i18n._(t`Connect Wallet`)}
              </Button>
              <div className={styles.CreateWalletButton}>
                <Button>{i18n._(t`Connect Surehive Wallet`)}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoWallet
