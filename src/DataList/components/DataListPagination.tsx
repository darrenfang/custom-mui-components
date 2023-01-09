import { Paper, TablePagination, useTheme } from '@mui/material'
import { useContext } from 'react'
import { Constants } from '../../Constants'
import { DataListPaginationActions } from '../../CustomTablePagination/components'
import { DataID, DataListContext, IDataListContext } from '../DataListContext'

export function DataListPagination<T extends DataID>() {

  const {
    loading,
    pagination,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions
  } = useContext<IDataListContext<T>>(DataListContext)

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
            mt: 2,
            backgroundColor: theme.palette.secondary.main
          }}
        >
          <TablePagination
            component='div'
            count={pagination.total_elements}
            page={pagination.number || 0}
            onPageChange={pageChangeHandler}
            rowsPerPage={pagination.size}
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
