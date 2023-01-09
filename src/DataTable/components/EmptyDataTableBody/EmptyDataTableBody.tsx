import { Alert, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useContext } from 'react'
import { DataTableContext, ID, IDataTableContext } from '../../model'

export function EmptyDataTableBody<T extends ID>() {

  const {
    columns
  } = useContext<IDataTableContext<T>>(DataTableContext)

  return (
    <TableBody
      sx={{
        'td': {
          borderBottom: 'none'
        }
      }}
    >
      <TableRow>
        <TableCell colSpan={columns.length + 1}>
          <Alert severity='warning'>
            暂无数据
          </Alert>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
