import React, { useCallback, useState } from 'react'
import { compareValues } from '../../helper/array'
import { EditOutlined } from '@ant-design/icons'
import { Modal } from '../Modal'
import { FunctionUpdate } from '.'
import PerfectScrollbar from 'react-perfect-scrollbar'

export interface TranslationData {
  label: string
  value: string
  exists?: boolean
  valuePt: string
  lang: 'pt' | 'en' | 'es'
}

interface Props {
  data: TranslationData[]
  title: string
  onUpdate?: FunctionUpdate
}

const View: React.FC<Props> = ({ data, title, onUpdate }) => {
  const [translateData, setTranslateData] = useState<TranslationData | null>(null)
  const preparedData = data.sort(compareValues('exists', 'asc'))

  const onUpdateInner = useCallback((data: TranslationData) => {
    !!onUpdate && onUpdate(data.label, data.value, data.lang)
    setTranslateData(null)
  }, [])

  return (
    <div>
      <h2 style={{ fontSize: '24px' }}>{title}</h2>
      <PerfectScrollbar style={{ height: '80vh', overflow: 'visible', display: 'block' }}>
        {preparedData.map(({ label, exists, value, lang, valuePt }) => {
          const color = !exists && !value ? '#a32424' : 'black'

          return (
            <div key={label} style={{ color, display: 'flex', justifyContent: 'space-between', marginRight: '3rem' }}>
              {label}{' '}
              {lang !== 'pt' && (
                <EditOutlined
                  style={{ color: '#555', marginLeft: '8px' }}
                  onClick={() => setTranslateData({ label, exists, value, lang, valuePt })}
                />
              )}
            </div>
          )
        })}

        <Modal onOk={onUpdateInner} data={translateData as TranslationData} open={!!translateData?.label} onClose={() => setTranslateData(null)} />
      </PerfectScrollbar>
    </div>
  )
}

export default View
