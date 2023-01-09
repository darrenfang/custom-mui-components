import { TablePropsSizeOverrides } from '@mui/material/Table/Table'
import { OverridableStringUnion } from '@mui/types'
import React from 'react'
import { IPagination } from '../../IPagination'
import { IColumn } from './IColumn'
import { ID } from './ID'
import { IData } from './IData'

export interface IDataTableContext<T extends ID> {
  loading: boolean
  hasCollapse?: boolean
  size?: OverridableStringUnion<'small' | 'medium', TablePropsSizeOverrides>
  collapseAll: boolean
  columns: IColumn<T>[]
  onCollapseAll: (collapse: boolean) => void
  data: IData<T>[]
  onRowClick?: (item: T) => void
  pagination?: IPagination
  rowsPerPageOptions?: Array<number | { value: number; label: string }>
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
  onRowsPerPageChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  onCellClick?: (item: T, column: IColumn<T>) => void
  borderColor?: string
}

export const DataTableContext =
  React.createContext<IDataTableContext<any>>({} as IDataTableContext<any>)
