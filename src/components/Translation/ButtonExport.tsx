import React from 'react'
import type { TranslationData } from './View'
import { exportJSONFile } from '../../helper/object'
import { DownloadOutlined } from '@ant-design/icons'
import { compareValues } from '../../helper/array'
import { ButtonDownload } from './styles'
import { Button } from 'antd'

type Props = {
  data: TranslationData[]
}

const formatDownload = (data: TranslationData[]): Record<string, string> => {
  return data?.sort(compareValues('label', 'asc')).reduce((acc, { label, value }) => {
    acc[label] = value

    return acc
  }, {} as Record<string, string>)
}

export const ButtonExport: React.FC<Props> = ({ data }) => {
  const lang: TranslationData['lang'] = data?.[0]?.lang

  const langFormatted: Record<string, string> = {
    en: 'english',
    es: 'spanish',
    pt: 'portuguese'
  }

  const getDate = () => {
    const d = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date())

    return `${langFormatted[lang as string]}-${d}`
  }

  const onClickButton = () => {
    const dataFormatted = formatDownload(data)
    exportJSONFile(dataFormatted, getDate())
  }

  return (
    <Button icon={<DownloadOutlined />} onClick={onClickButton} style={ButtonDownload}>
      Download
    </Button>
  )
}
