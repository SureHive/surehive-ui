import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { OutlinedButton } from '../../components/Button'
import { FilledButton } from '../../components/Button'

const PoolHeader = ({ label, showSearch = false }) => {
  const { i18n } = useLingui()

  const SearchBar = () => {
    return (
      <div className="flex flex-row flex-grow">
        <div
          className="flex flex-row flex-grow items-center px-5 space-x-2 text-xs"
          style={{
            border: '1px solid #23262F',
            borderRadius: '25px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <div className="w-full">
            <input
              className="placeholder-dark-1000 dark:placeholder-white w-full bg-white-130 dark:bg-dark-900"
              placeholder={i18n._(t`Search here`)}
            />
          </div>
        </div>
        <OutlinedButton className="ml-10 text-xs" label={i18n._(t`Import Pool`)} width={'137px'} height={'36px'} />
        <FilledButton width={'137px'} height={'36px'} className="flex justify-center items-center text-xs ml-5">
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <div>{i18n._(t`Create Pool`)}</div>
          </div>
        </FilledButton>
      </div>
    )
  }

  return (
    <div className="flex flex-row w-full items-center space-x-2" style={{ height: '40px' }}>
      <div className="hidden sm:block" style={{ width: '300px', fontSize: '28px' }}>
        {i18n._(t`${label}`)}
      </div>
      {showSearch && <SearchBar />}
    </div>
  )
}

export default PoolHeader
