import { Skeleton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { DataID, DataListContext, IDataListContext } from '../DataListContext'

export function DataListSkeleton<T extends DataID>() {

  const theme = useTheme()
  const {loading} = useContext<IDataListContext<T>>(DataListContext)

  return (
    <>
      {
        loading &&
        <Skeleton
          variant='rectangular'
          animation='wave'
          sx={{
            borderRadius: `${theme.shape.borderRadius}px`,
            minHeight: '132px'
          }}
        />
      }
    </>
  )
}
