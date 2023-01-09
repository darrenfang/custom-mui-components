import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'
import { ReactNode } from 'react'
import { ID } from './ID'

export interface IColumn<T extends ID> {
  id: keyof T
  label: string
  minWidth?: number
  maxWidth?: number
  width?: number
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  sx?: SxProps<Theme>
  format?: (target: T, value: T[keyof T]) => string | ReactNode
  tooltip?: (target: T) => string
}
