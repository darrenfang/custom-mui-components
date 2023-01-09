import { Box, Divider, Paper, SxProps, Theme, Tooltip, useTheme } from '@mui/material'
import { useContext } from 'react'
import { DataID, DataListContext, IDataListContext, IDataListItem } from '../DataListContext'
import { DataItemSecondaryContent } from './DataItemSecondaryContent'
import { DataListAction } from './DataListAction'

interface Props<T extends DataID> {
  item: IDataListItem<T>
  sx?: SxProps<Theme>
}

export function DataItem<T extends DataID>({item, sx}: Props<T>) {

  const theme = useTheme()
  const {onItemClick} = useContext<IDataListContext<T>>(DataListContext)

  const clickHandler = () => {
    if (!!onItemClick && !!item && !!item.value) {
      onItemClick(item.value)
    }
  }

  return (
    <Tooltip
      arrow
      title={item.tooltip || ''}
      placement='top'
    >
      <Paper
        sx={{
          p: 2,
          boxShadow: theme.shadows[8],
          cursor: 'pointer',
          '&:hover': {
            boxShadow: theme.shadows[16],
            '.MuiDivider-root': {
              borderColor: 'rgb(228, 228, 228)'
            }
          },
          ...sx
        }}
      >
        <Box onClick={clickHandler}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap'
              }}
            >
              {item.primary}
            </Box>
            <DataListAction value={item.value} />
          </Box>

          {
            !!item.secondary && item.secondary.length > 0 &&
            <Divider
              sx={{
                my: 2,
                borderWidth: '1px'
              }}
            />
          }

          <DataItemSecondaryContent items={item.secondary} />
        </Box>
      </Paper>
    </Tooltip>
  )
}
