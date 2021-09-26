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
          className="flex-grow border-dark-900"
          style={{
            border: '1px solid',
            borderRadius: '25px',
          }}
        ></div>
        <OutlinedButton className="ml-10 text-xs" label={i18n._(t`Import Pool`)} width={'137px'} height={'36px'} />
        <FilledButton width={'137px'} height={'36px'} className="text-xs ml-5">
          {i18n._(t`Create Pool`)}
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
