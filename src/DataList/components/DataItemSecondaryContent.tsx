import { Box, Stack, Typography } from '@mui/material'

import { DataID, IDataListSecondary } from '../DataListContext'

interface Props<T extends DataID> {
  items?: IDataListSecondary<T>[]
}

export function DataItemSecondaryContent<T extends DataID>({items}: Props<T>) {
  return (
    <>
      {
        !!items && items.length > 0 &&
        <Stack
          direction='row'
          flexWrap='wrap'
          sx={{
            mt: 1
          }}
        >
          {
            items.map(item => (
              <Box
                key={item.id as string}
                sx={{
                  minWidth: '100px',
                  mb: 2,
                  mr: 6
                }}
              >
                <Box>
                  <Typography
                    variant='body2'
                    fontSize='0.6rem'
                    color='text.disabled'
                  >
                    <>
                      {item.label}
                    </>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    minHeight: '1.5rem',
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap',
                    mt: '2px',
                    ...item.sx
                  }}
                >
                  <>
                    {
                      item.content || <Typography color='text.disabled'>(没有数据)</Typography>
                    }
                  </>
                </Box>
              </Box>
            ))
          }
        </Stack>
      }
    </>
  )
}
