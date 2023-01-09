import { SxProps, Theme } from '@mui/material'
import { GridSize, GridSpacing } from '@mui/material/Grid/Grid'
import { ResponsiveStyleValue } from '@mui/system'
import React, { ChangeEvent, ReactNode } from 'react'

export interface DataID {
  id: string
}

export interface IDataListSecondary<T extends DataID> {
  id: keyof T | string
  label: ReactNode
  content: ReactNode
  sx?: SxProps<Theme>
}

export interface IDataListItem<T extends DataID> {
  id: string
  value: T
  primary: ReactNode
  secondary?: IDataListSecondary<T>[]
  sx?: SxProps<Theme>
  tooltip?: string
}

export interface IDataListPagination {
  number: number
  number_of_elements: number
  size: number
  total_elements: number
  total_pages: number
}

export interface IDataListContext<T extends DataID> {
  loading: boolean
  emptyText?: string
  list: IDataListItem<T>[]
  pagination?: IDataListPagination
  actions?: (value: T) => ReactNode
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  rowsPerPageOptions?: Array<number | { value: number; label: string }>
  onItemClick?: (value: T) => void
  spacing?: ResponsiveStyleValue<GridSpacing>
  xs?: boolean | GridSize
  sm?: boolean | GridSize
  md?: boolean | GridSize
  lg?: boolean | GridSize
  xl?: boolean | GridSize
}

export const DataListContext =
  React.createContext<IDataListContext<any>>({} as IDataListContext<any>)
