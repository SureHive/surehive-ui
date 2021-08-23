import React, { FC } from 'react'

import { MeowshiState } from '../../pages/tools/meowshi'
import { RadioGroup } from '@headlessui/react'
import Typography from '../../components/Typography'
import { classNames } from '../../functions'

interface HeaderToggleProps {
  meowshiState: MeowshiState
}

const HeaderToggle: FC<HeaderToggleProps> = ({ meowshiState }) => {
  const { meow, switchCurrencies } = meowshiState

  return (
    <div className="flex justify-between">
      <RadioGroup
        value={meow}
        onChange={switchCurrencies}
        className="flex flex-row bg-gray-100 rounded p-3px cursor-pointer"
      >
        <RadioGroup.Option
          value={true}
          className={({ checked }) =>
            classNames('px-8 py-2 rounded', `${checked ? 'bg-gradient-to-r from-blue to-pink' : ''}`)
          }
        >
          {({ checked }) => (
            <Typography weight={checked ? 700 : 400} className={`${checked ? 'text-high-emphesis' : 'text-secondary'}`}>
              Meow
            </Typography>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option
          value={false}
          className={({ checked }) =>
            classNames('px-8 py-2 rounded', `${checked ? 'bg-gradient-to-r from-blue to-pink' : ''}`)
          }
        >
          {({ checked }) => (
            <Typography weight={checked ? 700 : 400} className={`${checked ? 'text-high-emphesis' : 'text-secondary'}`}>
              Un-Meow
            </Typography>
          )}
        </RadioGroup.Option>
      </RadioGroup>
      <div className="my-1.5 items-center flex border-gradient-r-blue-light-blue border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-base md:font-normal">
        1 nSURE ≈ 100k MEOW
      </div>
    </div>
  )
}

export default HeaderToggle
