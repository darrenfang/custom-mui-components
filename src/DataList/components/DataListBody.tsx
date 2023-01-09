import { Grid } from '@mui/material'
import { useContext } from 'react'
import { DataID, DataListContext, IDataListContext } from '../DataListContext'
import { DataItem } from './DataItem'

export function DataListBody<T extends DataID>() {

  const {
    loading,
    list,
    spacing,
    xs,
    md,
    sm,
    lg,
    xl
  } = useContext<IDataListContext<T>>(DataListContext)
  const hasList = !loading && !!list && list.length > 0

  return (
    <Grid container spacing={spacing}>
      {
        hasList && list.map(item => (
            <Grid
              key={item.id}
              item
              xs={xs}
              md={md}
              sm={sm}
              lg={lg}
              xl={xl}
            >
              <DataItem
                item={item}
                sx={item.sx}
              />
            </Grid>
          )
        )
      }
    </Grid>
  )
}
