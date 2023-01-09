import { Alert, useTheme } from '@mui/material'
import { useContext } from 'react'
import { DataID, DataListContext, IDataListContext } from '../DataListContext'

export function DataListHeader<T extends DataID>() {

  const theme = useTheme()

  const {loading, list, emptyText} = useContext<IDataListContext<T>>(DataListContext)
  const noData = !loading && (!list || list.length === 0)

  const text = emptyText || '暂无数据'

  return (
    <>
      {
        noData &&
        <Alert
          severity='warning'
          variant='filled'
          sx={{
            mt: 1,
            boxShadow: theme.shadows[8]
          }}
        >
          {text}
        </Alert>
      }
    </>
  )
}
