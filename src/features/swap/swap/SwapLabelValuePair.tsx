import Image from 'next/image'

export default function SwapLabelValuePair({ className, label, value, logo = null }) {
  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        {logo && <Image src={logo} alt={logo} width={'20px'} height={'20px'} />}
        <span>{label}</span>
        <button>
          <Image
            src={'/images/global/icon-more-information-grey.svg'}
            width={'11px'}
            height={'11px'}
            alt={'icon-more-information-grey.svg'}
          />
        </button>
      </div>
      <div>
        <p>{value}</p>
      </div>
    </div>
  )
}
