import { Box } from '@mui/material'

import { useContext } from 'react'
import { DataID, DataListContext, IDataListContext } from '../DataListContext'

interface Props<T extends DataID> {
  value: T
}

export function DataListAction<T extends DataID>({value}: Props<T>) {

  const {actions} = useContext<IDataListContext<T>>(DataListContext)

  return (
    <>
      {
        actions &&
        <Box
          sx={{
            pl: 1
          }}
        >
          {
            actions && actions(value)
          }
        </Box>
      }
    </>
  )
}
