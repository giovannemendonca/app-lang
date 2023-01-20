import { theme } from 'antd'
import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
`

export const StylesButtonRemove = {
  backgroundColor: '#F5365C',
  color: '#fff'
}

export const ContainerInputFile = styled.div`
  input {
    display: none;
  }
  label {
    display: flex;
    width: 100%;
    padding: 4px 15px;
    background-color: ${({ theme }) => theme.backgroundUpload};
    color: ${({ theme }) => theme.colorPrimary};
    border-radius: 4px;
    gap: 8px;
    cursor: pointer;
  }
`

export const ButtonDownload = {
  backgroundColor: '#2E8AB5',
  color: '#ffffff'
}
