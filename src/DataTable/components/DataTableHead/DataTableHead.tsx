import { Down, Up } from '@icon-park/react'
import { TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { DataTableContext, ID, IDataTableContext } from '../../model'

export function DataTableHead<T extends ID>() {

  const {
    hasCollapse,
    collapseAll,
    columns,
    onCollapseAll
  } = useContext<IDataTableContext<T>>(DataTableContext)

  return (
    <TableHead
      sx={{
        '.MuiTableCell-head': {
          color: '#FFF',
          fontWeight: 'bold'
        }
      }}
    >
      <TableRow
        sx={{
          backgroundColor: '#303030'
        }}
      >
        {
          hasCollapse &&
          <TableCell
            sx={{
              width: '24px',
              textAlign: 'center',
              p: 1
            }}
          >
            <Tooltip
              arrow
              title='展开所有项目的详细信息'
            >
              <Box>
                {
                  collapseAll &&
                  <Up
                    theme='outline'
                    size='24'
                    fill='#FFF'
                    onClick={() => onCollapseAll(false)}
                    style={{
                      display: 'block',
                      cursor: 'pointer'
                    }}
                  />
                }
                {
                  !collapseAll &&
                  <Down
                    theme='outline'
                    size='24'
                    fill='#FFF'
                    onClick={() => onCollapseAll(true)}
                    style={{
                      display: 'block',
                      cursor: 'pointer'
                    }}
                  />
                }
              </Box>
            </Tooltip>
          </TableCell>
        }
        {
          columns.map((column) => (
            <TableCell
              key={column.id as string}
              style={{
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                width: column.width
              }}
              align={column.align}
              sx={column.sx}
            >
              {column.label}
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}
