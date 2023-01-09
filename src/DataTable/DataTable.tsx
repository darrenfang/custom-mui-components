import { Table, TableContainer, Theme, useTheme } from '@mui/material'
import { TablePropsSizeOverrides } from '@mui/material/Table/Table'
import { Box, SxProps } from '@mui/system'
import { OverridableStringUnion } from '@mui/types'
import React, { useState } from 'react'
import { IPagination } from '../IPagination'
import { DataTableBody, DataTableHead, DataTablePagination, EmptyDataTableBody } from './components'
import { DataTableContext, IColumn, ID, IData } from './model'

interface Props<T extends ID> {
  sx?: SxProps<Theme>
  loading: boolean
  hideHead?: boolean
  size?: OverridableStringUnion<'small' | 'medium', TablePropsSizeOverrides>
  columns: IColumn<T>[]
  data: IData<T>[]
  pagination?: IPagination
  hasCollapse?: boolean
  rowsPerPageOptions?: Array<number | { value: number; label: string }>
  onRowClick?: (item: T) => void
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
  onRowsPerPageChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  onCellClick?: (item: T, column: IColumn<T>) => void
  borderColor?: string
}

export function DataTable<T extends ID>({
                                          sx,
                                          loading,
                                          hideHead,
                                          size,
                                          columns,
                                          data,
                                          pagination,
                                          hasCollapse,
                                          rowsPerPageOptions,
                                          onRowClick,
                                          onPageChange,
                                          onRowsPerPageChange,
                                          onCellClick,
                                          borderColor
                                        }: Props<T>) {

  const theme = useTheme()
  const [collapseAll, setCollapseAll] = useState(false)
  const emptyData = !loading && (!data || data.length === 0)
  const hasData = !loading && !!data && data.length > 0

  const collapseAllHandler = (collapse: boolean) => {
    setCollapseAll(collapse)
  }

  return (
    <DataTableContext.Provider
      value={{
        loading,
        hasCollapse,
        size,
        collapseAll,
        columns,
        onCollapseAll: collapseAllHandler,
        data,
        onRowClick,
        pagination,
        rowsPerPageOptions,
        onPageChange,
        onRowsPerPageChange,
        onCellClick,
        borderColor
      }}
    >
      <Box
        sx={{
          '.MuiTableContainer-root': {
            borderTopLeftRadius: `${theme.shape.borderRadius}px`,
            borderTopRightRadius: `${theme.shape.borderRadius}px`
          },
          '.MuiTable-root': {
            borderCollapse: 'initial'
          }
        }}
      >
        <TableContainer
          sx={sx}
        >
          <Table size={size}>
            {
              !hideHead &&
              <DataTableHead />
            }
            <DataTableBody />
            {
              emptyData &&
              <EmptyDataTableBody />
            }
          </Table>
        </TableContainer>
        {
          hasData &&
          <DataTablePagination />
        }
      </Box>
    </DataTableContext.Provider>
  )
}
