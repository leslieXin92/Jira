import styled from '@emotion/styled'

export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  justify-content: ${props => (props.between ? 'space-between' : undefined)};
  align-items: center;
  margin-bottom: ${props => `${props.marginBottom}rem`};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => {
      if (typeof props.gap === 'number') return `${props.gap}rem`
      else if (props.gap) return '2rem'
      else return '0'
    }};
  }
`
