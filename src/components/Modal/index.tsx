import React, { useEffect, useState } from 'react'
import { Input, Modal as ModalAntd, Typography } from 'antd'
import type { TranslationData } from '../Translation/View'
import { langImages } from '../../assets'
import { FlexContainer } from './styles'

type Props = {
  open: boolean
  onClose?: () => void
  data: TranslationData
  onOk: (data: TranslationData) => void
}

export const Modal: React.FC<Props> = ({ data, open, onClose, onOk }) => {
  const [input, setInput] = useState(data?.value || '')

  const renderTitle = (
    <FlexContainer>
      <div>
        <img src={langImages[data?.lang]} alt="lang" />
      </div>
      <div style={{ marginTop: 4 }}>
        <span>{data?.label}</span>
      </div>
    </FlexContainer>
  )

  useEffect(() => {
    setInput(data?.value)
  }, [setInput, data])

  return (
    <ModalAntd
      open={!!open}
      onOk={() => {
        setInput('')
        onOk({ ...data, exists: !!input, value: input })
      }}
      onCancel={onClose}
      title={renderTitle}
    >
      <div>
        <label htmlFor="#value">Valor</label>
        <Input id="#value" value={input} onChange={e => setInput(e?.target?.value)} type="text" />
      </div>

      <br />
      <Typography.Paragraph>
        <img src={langImages['pt']} alt="Brazil" />
        <strong> Português/Brasileiro:</strong>
        <br />
        {data?.valuePt}
      </Typography.Paragraph>
    </ModalAntd>
  )
}
