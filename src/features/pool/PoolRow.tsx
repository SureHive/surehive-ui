import DoubleCurrencyLogo from '../../components/DoubleLogo'

const PoolRow = ({ rowData, columns, columnConfigs }) => {
  return (
    <div
      className="flex flex-row items-center w-full border-white-200 dark:border-dark-500"
      style={{
        borderBottom: '1px solid',
        height: '70px',
      }}
    ></div>
  )
}

export default PoolRow
