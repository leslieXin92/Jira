import { Select } from 'antd'
import React from 'react'
import { Raw } from 'types'

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: Raw
  onChange?: (value?: number) => void
  options?: { name: string; id: number }[]
  defaultOptionName?: string
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={value => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map(option => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
