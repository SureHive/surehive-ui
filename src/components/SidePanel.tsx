import styled from 'styled-components'
import { classNames } from '../functions'
import Image from 'next/image'
import { Input as NumericalInput } from './NumericalInput'

export const SidePanelContainer = styled.table.attrs(({ className, ...rest }) => ({
  className: classNames('flex flex-col md:bg-draw-menu-light dark:md:bg-draw-menu-dark sm:w-500px', className),
  ...rest,
}))`
  width: ${({ width }) => width};
  height: ${({ height = '100%' }) => height};
  background-size: 800%;
  z-index: 2;
`

export const SidePanelBox = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames(
    'flex flex-col rounded bg-white border-white-150 dark:bg-dark-600 dark:border-dark-500',
    className
  ),
  ...rest,
}))`
  font-family: var(--font-sans);
  height: ${({ height = '100%' }) => height};
  max-width: ${({ maxWidth = '440px' }) => maxWidth};
  font-size: 14px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 61px 61px -47px #1f2f46;
  border-radius: 10px;
  ${(props) => props.addCSS}
`

export const SidePanelCurrencyBox = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('flex relative items-center px-3 border-white-200 dark:border-white-900', className),
  ...rest,
}))`
  border-style: solid;
  border-width: 1px;
  border-radius: 12px;
  height: 56px;
`

export const SidePanelSlippageOption = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames(
    'flex dark:bg-dark-500 bg-white-150 items-center justify-center mr-5 cursor-pointer',
    className
  ),
  ...rest,
}))`
  height: 56px;
  width: 56px;
  border-radius: 12px;
  min-width: 56px;
`

export const SidePanelSlippageInputOption = styled.div.attrs(({ className, ...rest }) => ({
  className: classNames('flex items-center bg-white w-full pl-3 dark:bg-dark-600 border-white-900', className),
  ...rest,
}))`
  border-style: solid;
  border-width: 1px;
  border-radius: 12px;
  opacity: 0.9;
  max-width: ${({ maxWidth = '172px' }) => maxWidth};
`

export const SidePanelSlippageToleranceOptions = ({ value1, value2, value3, value, onInput, placeholder }) => (
  <div className="flex flex-row">
    <SidePanelSlippageOption>{value1}</SidePanelSlippageOption>
    <SidePanelSlippageOption>{value2}</SidePanelSlippageOption>
    <SidePanelSlippageOption>{value3}</SidePanelSlippageOption>
    <SidePanelSlippageInputOption>
      <NumericalInput
        value={value}
        className="dark:bg-dark-600 bg-white dark:text-white-100 text-black items-center dark:placeholder-white-100 placeholder-text-black"
        onUserInput={onInput}
        placeholder={placeholder}
      />
    </SidePanelSlippageInputOption>
  </div>
)

export const SidePanelLabelValuePair = ({ className, label, value, logo = null }) => {
  return (
    <div className={classNames('items-center', className)}>
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
