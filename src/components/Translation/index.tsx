import { useCallback, useState } from 'react'
import View, { TranslationData } from './View'
import { InputFile } from './InputFile'
import { Button, Col, Row } from 'antd'
import { ButtonExport } from './ButtonExport'
import { DeleteOutlined } from '@ant-design/icons'
import { HeaderWrapper } from './styles'
import { StylesButtonRemove } from './styles'

export type FunctionUpdate = (key: string, value: string, lang: TranslationData['lang']) => void
export type FunctionOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>, lang: TranslationData['lang']) => void

const fileDto = (dataPt: string[][], data: string[][], lang: TranslationData['lang']): TranslationData[] => {
  return dataPt?.map(([keyPt, valuePt]) => {
    const [label, valueEn] = data.find(([keyEn]) => keyEn === keyPt) || ['', '']

    return {
      exists: !!label,
      label: keyPt,
      lang,
      value: valueEn || '',
      valuePt
    }
  })
}

export const Translation = () => {
  const [filePt, setFilePt] = useState<string[][]>([])
  const [fileEn, setFileEn] = useState<TranslationData[]>([])
  const [fileEs, setFileEs] = useState<TranslationData[]>([])

  const filePtDto: Partial<TranslationData[]> = filePt?.map(([key, value]) => ({ label: key, exists: true, value, valuePt: value, lang: 'pt' }))

  const onUpdate = useCallback<FunctionUpdate>((key, value, lang) => {
    const setFileLang = lang === 'en' ? setFileEn : setFileEs

    setFileLang(old => {
      const data = old?.map(data => {
        if (data?.label === key) {
          console.log({ data })
          return { ...data, value }
        }
        return data
      })

      return data
    })
  }, [])

  const onChangeInput = useCallback<FunctionOnChangeFile>(
    async (e, lang) => {
      if (e.target.files) {
        const json = await e.target.files[0].text()
        const obj = JSON.parse(json)

        if (lang === 'pt') setFilePt(Object.entries(obj))
        else {
          const setFileLang = lang === 'en' ? setFileEn : setFileEs
          setFileLang(fileDto(filePt, Object.entries(obj), lang))
        }
      }
    },
    [filePt]
  )

  return (
    <Row wrap={true} style={{ margin: '0 8px' }}>
      <Col lg={8} md={12} sm={24}>
        <HeaderWrapper>
          <InputFile key={filePt.length} title="pt" onChange={onChangeInput} />
          {filePt.length ? (
            <Button icon={<DeleteOutlined />} onClick={() => setFilePt([])} style={StylesButtonRemove}>
              Remover
            </Button>
          ) : null}
        </HeaderWrapper>
        <View title="Português" data={filePtDto as TranslationData[]} />
      </Col>
      {!!filePt.length ? (
        <>
          <Col lg={8} md={12} sm={24}>
            <HeaderWrapper>
              <InputFile key={fileEn.length} title="en" onChange={onChangeInput} />
              {fileEn.length ? (
                <>
                  <ButtonExport data={fileEn} />
                  <Button icon={<DeleteOutlined />} onClick={() => setFileEn([])} style={StylesButtonRemove}>
                    Remover
                  </Button>
                </>
              ) : null}
            </HeaderWrapper>
            <View title="Inglês" onUpdate={onUpdate} data={fileEn} />
          </Col>
          <Col lg={8} md={12} sm={24}>
            <HeaderWrapper>
              <InputFile key={fileEs.length} title="es" onChange={onChangeInput} />
              {fileEs.length ? (
                <>
                  <ButtonExport data={fileEs} />
                  <Button icon={<DeleteOutlined />} onClick={() => setFileEs([])} style={StylesButtonRemove}>
                    Remover
                  </Button>
                </>
              ) : null}
            </HeaderWrapper>
            <View title="Espanhol" onUpdate={onUpdate} data={fileEs} />
          </Col>
        </>
      ) : null}
    </Row>
  )
}
