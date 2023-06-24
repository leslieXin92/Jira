import React from 'react'
import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'

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

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const FullPageLoading = () => (
  <FullPage>
    <Spin size='large'></Spin>
  </FullPage>
)

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <Typography.Text type='danger'>{error?.message}</Typography.Text>
    <DevTools />
  </FullPage>
)

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`
