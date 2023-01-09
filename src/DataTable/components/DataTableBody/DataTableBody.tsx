import { TableBody } from '@mui/material'
import React, { useContext } from 'react'
import { DataTableContext, ID, IDataTableContext } from '../../model'
import { DataTableRow } from '../DataTableRow'

export function DataTableBody<T extends ID>() {

  const {
    data
  } = useContext<IDataTableContext<T>>(DataTableContext)

  return (
    <TableBody>
      {
        data.map((item, index) => (
          <DataTableRow
            key={item.data.id}
            item={item}
            last={index === data.length - 1}
          />
        ))
      }
    </TableBody>
  )
}
