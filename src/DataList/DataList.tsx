import { Box, SxProps, Theme } from '@mui/material'
import { GridSize, GridSpacing } from '@mui/material/Grid/Grid'
import { ResponsiveStyleValue } from '@mui/system'
import { ChangeEvent, ReactNode } from 'react'
import { CustomTablePagination } from '../CustomTablePagination'
import { IPagination } from '../IPagination'
import { DataListBody, DataListHeader, DataListSkeleton } from './components'
import { DataID, DataListContext, IDataListItem } from './DataListContext'

interface Props<T extends DataID> {
  loading: boolean
  list: IDataListItem<T>[]
  pagination?: IPagination
  actions?: (value: T) => ReactNode
  emptyText?: string
  sx?: SxProps<Theme>
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

export function DataList<T extends DataID>(props: Props<T>) {

  const {
    sx,
    pagination,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions,
    ...remainProps
  } = props

  return (
    <DataListContext.Provider value={remainProps}>
      <Box sx={sx}>
        <DataListHeader />
        <DataListSkeleton />
        <DataListBody />
        <CustomTablePagination
          loading={remainProps.loading}
          pagination={pagination}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
          sx={{
            mt: 2
          }}
        />
      </Box>
    </DataListContext.Provider>
  )
}
