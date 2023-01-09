import { Paper, SxProps, TablePagination, Theme, useTheme } from '@mui/material'
import React from 'react'

import { Constants } from '../Constants'
import { IPagination } from '../IPagination'
import { DataListPaginationActions } from './components'

interface Props {
  sx?: SxProps<Theme>
  loading: boolean
  pagination?: IPagination
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
  onRowsPerPageChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>
}

export function CustomTablePagination({
                                        sx,
                                        loading,
                                        pagination,
                                        onPageChange,
                                        onRowsPerPageChange,
                                        rowsPerPageOptions
                                      }: Props) {

  const theme = useTheme()

  const hasData = !loading && !!pagination && pagination.total_elements > 0

  const pageChangeHandler = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (onPageChange) {
      onPageChange(event, newPage)
    }
  }

  return (
    <>
      {
        hasData &&
        <Paper
          elevation={4}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            ...sx
          }}
        >
          <TablePagination
            component='div'
            count={pagination.total_elements}
            page={pagination.number || 0}
            rowsPerPage={pagination.size}
            onPageChange={pageChangeHandler}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={rowsPerPageOptions || Constants.ROWS_PER_PAGE_OPTIONS}
            labelRowsPerPage={Constants.LABEL_ROWS_PER_PAGE}
            labelDisplayedRows={Constants.LABEL_DISPLAYED_ROWS}
            ActionsComponent={(subProps) => (<DataListPaginationActions {...subProps} />)}
            sx={{
              '& .MuiToolbar-root': {
                minHeight: 'auto',
                flexWrap: 'wrap',
                justifyContent: 'flex-end'
              },
              '& p, div, .MuiTablePagination-selectIcon': {
                color: '#FFF'
              },
              '& .MuiButtonBase-root svg': {
                color: '#FFF'
              },
              '& .MuiButtonBase-root.Mui-disabled svg': {
                color: theme.palette.grey['600']
              }
            }}
          />
        </Paper>
      }
    </>
  )
}
