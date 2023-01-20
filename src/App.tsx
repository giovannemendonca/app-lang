import { ConfigProvider } from 'antd'
import { Translation } from './components/Translation'
import GlobalStyle from './styles/global'
import 'antd/dist/reset.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { ThemeProvider } from 'styled-components'
import { colors } from './styles/constants'

function App() {
  return (
    <ThemeProvider theme={colors}>
      <ConfigProvider theme={{}}>
        <GlobalStyle />
        <Translation />
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default App
