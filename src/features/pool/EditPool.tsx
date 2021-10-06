import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import {
  SidePanelContainer,
  SidePanelBox,
  SidePanelCurrencyBox,
  SidePanelSlippageToleranceOptions,
} from '../../components/SidePanel'
import { PanelHeader, CurrencyInfo, MyLiquidityBox } from './const'
import { FilledButton } from '../../components/Button'
import { useState } from 'react'
import CurrencySelectorPanel from '../../components/CurrencySelectorPanel'

enum EditType {
  ADD,
  WITHDRAW,
}

const EditPool = ({ currency, otherCurrency, currentTheme }) => {
  const { i18n } = useLingui()
  const router = useRouter()
  const [currentEditType, setEditType] = useState<EditType>(EditType.ADD)
  const [slippageTolerance, setSlippageTolerance] = useState<string>(null)

  const EditTypeButton = ({ editType, label }) => {
    if (editType === currentEditType) {
      return (
        <FilledButton width={'111px'} onClick={() => setEditType(editType)}>
          {i18n._(t`${label}`)}
        </FilledButton>
      )
    }
    return (
      <div
        className="flex items-center justify-center cursor-pointer"
        style={{ width: '111px' }}
        onClick={() => setEditType(editType)}
      >
        {i18n._(t`${label}`)}
      </div>
    )
  }

  const AddLiquidity = () => (
    <div className="flex flex-col gap-y-5 text-xs">
      <div className="space-y-2 w-full">
        <p className="font-normal tracking-normal">{i18n._(t`BASE TOKEN`)}</p>
        <SidePanelCurrencyBox>
          <CurrencySelectorPanel
            currency={currency}
            otherCurrency={otherCurrency}
            onCurrencySelect={() => {}}
            value={'1'}
            onUserInput={() => {}}
            onMax={() => {}}
            showMaxButton={true}
            showCommonBases={true}
            currentTheme={currentTheme}
          />
        </SidePanelCurrencyBox>
      </div>
      <div className="space-y-2">
        <p className="font-normal tracking-normal">{i18n._(t`QUOTE TOKEN`)}</p>
        <SidePanelCurrencyBox>
          <CurrencySelectorPanel
            currency={otherCurrency}
            otherCurrency={currency}
            onCurrencySelect={() => {}}
            value={'1'}
            onUserInput={() => {}}
            onMax={() => {}}
            showMaxButton={true}
            showCommonBases={true}
            currentTheme={currentTheme}
          />
        </SidePanelCurrencyBox>
      </div>
      <div className="space-y-2">
        <p className="font-normal tracking-normal">{i18n._(t`SLIPPAGE TOLERANCE`)}</p>
        <SidePanelSlippageToleranceOptions
          value1={'0.8%'}
          value2={'2.%'}
          value3={'3%'}
          value={slippageTolerance}
          placeholder={'Enter %'}
          onInput={() => {
            setSlippageTolerance('')
          }}
        />
      </div>
      <FilledButton width={'100%'} height={'48px'} className="text-xs mt-10">
        {i18n._(t`Add Liquidity`)}
      </FilledButton>
    </div>
  )

  const Withdraw = () => (
    <div className="flex flex-col gap-y-5 text-xs">
      <div className="space-y-2">
        <p className="font-normal tracking-normal">{i18n._(t`BASE TOKEN`)}</p>
        <SidePanelCurrencyBox>
          <CurrencySelectorPanel
            currency={currency}
            otherCurrency={otherCurrency}
            onCurrencySelect={() => {}}
            value={'1'}
            onUserInput={() => {}}
            onMax={() => {}}
            showMaxButton={true}
            showCommonBases={true}
            currentTheme={currentTheme}
          />
        </SidePanelCurrencyBox>
      </div>
      <div className="space-y-2">
        <p className="font-normal tracking-normal">{i18n._(t`SLIPPAGE TOLERANCE`)}</p>
        <SidePanelSlippageToleranceOptions
          value1={'0.8%'}
          value2={'2.%'}
          value3={'3%'}
          value={slippageTolerance}
          placeholder={'Enter %'}
          onInput={() => {
            setSlippageTolerance('')
          }}
        />
      </div>
      <FilledButton width={'100%'} height={'48px'} className="text-xs mt-10">
        {i18n._(t`Withdraw`)}
      </FilledButton>
    </div>
  )

  return (
    <SidePanelContainer className="sm:px-10 sm:pt-5 sm:pb-10 sm:space-y-5">
      <PanelHeader
        value={i18n._(t`Edit Liquidity`)}
        type={i18n._(t`Public`)}
        showBack={true}
        back={() => router.back()}
        currentTheme={currentTheme}
      />
      <CurrencyInfo currency={currency} otherCurrency={otherCurrency} />
      <SidePanelBox className="p-5 gap-y-4 sm:gap-y-8">
        <MyLiquidityBox currency={currency} otherCurrency={otherCurrency} />
        <div
          className="flex flex-row w-full justify-between bg-white-150 dark:bg-dark-870 h-42 shadow-pool-edit-type-switch-light dark:shadow-pool-edit-type-switch text-xs text-dark-600 dark:text-white px-10 py-1"
          style={{ borderRadius: '29px' }}
        >
          <EditTypeButton editType={EditType.ADD} label={'Add Liquidity'} />
          <EditTypeButton editType={EditType.WITHDRAW} label={'Withdraw'} />
        </div>
        {currentEditType === EditType.ADD && <AddLiquidity />}
        {currentEditType === EditType.WITHDRAW && <Withdraw />}
      </SidePanelBox>
    </SidePanelContainer>
  )
}

export default EditPool
