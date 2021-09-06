import Image from 'next/image'
import styles from './wallet.module.css'
import Button from '../../components/Button'

export default function WalletOption({ id, icon, name, link = null, onClick = null }) {
  const content = (
    <div onClick={onClick} className={styles.WalletOption}>
      <Button>
        <div>{name}</div>
        <div className="flex flex-row">
          <Image src={icon} alt={`${name}-icon`} width="40px" height="32px" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-10 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Button>
    </div>
  )

  if (link) {
    return (
      <a href={link} className="grid w-full">
        {content}
      </a>
    )
  }
  return content
}
