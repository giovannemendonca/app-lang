import { IAppTheme } from '../styles/constants'

declare global {
  interface Navigator {
    msSaveBlob?: (blob: Blob, filename: string) => boolean
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}
