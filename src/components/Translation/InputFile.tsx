import React from 'react'
import { FunctionOnChangeFile } from '.'
import { UploadOutlined } from '@ant-design/icons'
import { ContainerInputFile } from './styles'
import { Button } from 'antd'

type Props = {
  onChange: FunctionOnChangeFile
  title: 'pt' | 'en' | 'es'
}

export const InputFile: React.FC<Props> = ({ onChange, title }) => {
  return (
    <ContainerInputFile>
      <Button style={{ padding: '0' }}>
        <label htmlFor={`${title}`}>
          <UploadOutlined />
          Upload {title.toUpperCase()}{' '}
        </label>
      </Button>
      <input id={`${title}`} type="file" accept=".application/JSON" onChange={e => onChange(e, title)} />
    </ContainerInputFile>
  )
}
