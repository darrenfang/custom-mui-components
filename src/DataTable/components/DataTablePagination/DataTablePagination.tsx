import { Skeleton, TablePagination, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { Constants } from '../../../Constants'
import { DataTableContext, ID, IDataTableContext } from '../../model'

export function DataTablePagination<T extends ID>() {

  const theme = useTheme()
  const {
    loading,
    pagination,
    rowsPerPageOptions,
    onPageChange,
    onRowsPerPageChange
  } = useContext<IDataTableContext<T>>(DataTableContext)

  const pageChangeHandler = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    if (onPageChange) {
      onPageChange(event, page)
    }
  }

  return (
    <Box
      sx={{
        borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
        borderBottomRightRadius: `${theme.shape.borderRadius}px`,
        '.MuiToolbar-root': {
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }
      }}
    >
      {
        loading && pagination &&
        <Skeleton
          component='div'
          variant='rectangular'
          animation='wave'
          sx={{
            width: '100%',
            maxWidth: '100%',
            borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
            borderBottomRightRadius: `${theme.shape.borderRadius}px`
          }}
        >
          <TablePagination
            component='div'
            count={pagination?.total_elements || 0}
            rowsPerPage={pagination?.size || 0}
            page={pagination?.number || 0}
            onPageChange={pageChangeHandler}
            rowsPerPageOptions={[10]}
          />
        </Skeleton>
      }
      {
        !loading && pagination &&
        <TablePagination
          component='div'
          count={pagination?.total_elements || 0}
          rowsPerPage={pagination?.size || 0}
          page={pagination?.number || 0}
          onPageChange={pageChangeHandler}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage={Constants.LABEL_ROWS_PER_PAGE}
          rowsPerPageOptions={rowsPerPageOptions || Constants.ROWS_PER_PAGE_OPTIONS}
          labelDisplayedRows={Constants.LABEL_DISPLAYED_ROWS}
        />
      }
    </Box>
  )
}
