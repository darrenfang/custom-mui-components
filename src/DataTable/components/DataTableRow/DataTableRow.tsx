import { Down, Up } from '@icon-park/react'
import { Skeleton, TableCell, TableRow, Tooltip, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { DataTableContext, IColumn, ID, IData, IDataTableContext } from '../../model'

const tableHoverColor = 'rgba(111, 118, 126, 0.1)'
const DEFAULT_BORDER_COLOR = 'rgb(224, 224, 224)'
const iconFillColor = '#6F767E'

interface Props<T extends ID> {
  last?: boolean
  item: IData<T>
}

export function DataTableRow<T extends ID>(
  {
    last,
    item
  }: Props<T>) {

  const theme = useTheme()
  const {
    loading,
    collapseAll,
    columns,
    hasCollapse,
    size,
    onRowClick,
    onCellClick,
    borderColor
  } = useContext<IDataTableContext<T>>(DataTableContext)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(collapseAll)
  }, [collapseAll])

  const rowClickHandler = (item: T) => {
    if (loading) {
      return
    }

    if (onRowClick) {
      onRowClick(item)
    }

    if (hasCollapse && !onRowClick && !onCellClick) {
      setOpen(prevState => !prevState)
    }
  }

  const cellClickHandler = (item: T, column: IColumn<T>) => {
    if (loading) {
      return
    }

    if (onCellClick) {
      onCellClick(item, column)
    }
  }

  const collapseClickHandler = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <>
      <TableRow
        hover
        onClick={() => rowClickHandler(item.data)}
        sx={{
          backgroundColor: open ? `${tableHoverColor} !important` : '',
          ':hover': {
            backgroundColor: `${tableHoverColor} !important`
          }
        }}
      >
        {
          loading &&
          <TableCell
            colSpan={hasCollapse ? columns.length + 1 : columns.length}
            sx={{
              p: 0,
              cursor: 'wait',
              borderBottom: `1px solid ${borderColor || DEFAULT_BORDER_COLOR}`
            }}
          >
            <Skeleton
              variant='rectangular'
              animation='wave'
              sx={{
                height: size === 'small' ? 'calc(1.43rem * 0.875 + 12px)' : 'calc(1.2em + 32px)',
                cursor: 'wait',
                borderBottomLeftRadius: last ? `${theme.shape.borderRadius}px` : 0,
                borderBottomRightRadius: last ? `${theme.shape.borderRadius}px` : 0
              }}
            />
          </TableCell>
        }
        {
          !loading && hasCollapse &&
          <TableCell
            onClick={collapseClickHandler}
            sx={{
              width: '24px',
              textAlign: 'center',
              p: 1,
              borderBottom: `1px solid ${borderColor || DEFAULT_BORDER_COLOR}`
            }}
          >
            <Tooltip arrow title='展开此项的详细信息'>
              <Box>
                {
                  open &&
                  <Up
                    theme='outline'
                    size='24'
                    fill={iconFillColor}
                    style={{
                      display: 'block',
                      cursor: 'pointer'
                    }}
                  />
                }
                {
                  !open &&
                  <Down
                    theme='outline'
                    size='24'
                    fill={iconFillColor}
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
          !loading && columns.map((column) => {
            const value = item.data[column.id]

            return (
              <Tooltip
                arrow
                title={column.tooltip ? column.tooltip(item.data) : ''}
                key={column.id as string}
              >
                <TableCell
                  align={column.align}
                  width={column.width}
                  sx={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    width: column.width,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    borderBottom: `1px solid ${borderColor || DEFAULT_BORDER_COLOR}`,
                    ...column.sx
                  }}
                  onClick={() => cellClickHandler(item.data, column)}
                >
                  {
                    column.format ? column.format(item.data, value) : value
                  }
                </TableCell>
              </Tooltip>
            )
          })
        }
      </TableRow>
      {
        !loading && item.collapse && open &&
        <TableRow
          key={`collapse-${item.data.id}`}
        >
          <TableCell
            colSpan={columns.length + 1}
            sx={{
              pt: 1,
              backgroundColor: `${tableHoverColor} !important`,
              borderBottom: open ? `4px solid rgba(48, 48, 48, 0.500)` : ''
            }}
          >
            {item.collapse}
          </TableCell>
        </TableRow>
      }
    </>
  )
}
