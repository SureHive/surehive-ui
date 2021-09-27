import styled from 'styled-components'
import { classNames } from '../functions'
import Image from 'next/image'

export const SidePanelContainer = styled.table.attrs(({ className, ...rest }) => ({
  className: classNames('grid md:bg-draw-menu-light dark:md:bg-draw-menu-dark', className),
  ...rest,
}))`
  width: ${({ width = '500px' }) => width};
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
  height: ${({ height = '850px' }) => height};
  max-width: ${({ maxWidth = '440px' }) => maxWidth};
  font-size: 14px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 61px 61px -47px #1f2f46;
  border-radius: 10px;
  ${(props) => props.addCSS}
`

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
