import { Box } from '@mui/material'
import { LabelDisplayedRowsArgs } from '@mui/material/TablePagination/TablePagination'


export class Constants {
  public static readonly SPACE = '\u00A0'
  public static readonly ROWS_PER_PAGE_OPTIONS = [20, 50, 100]
  public static readonly LABEL_ROWS_PER_PAGE = '每页条数'

  public static readonly LABEL_DISPLAYED_ROWS = ({from, to, count}: LabelDisplayedRowsArgs) => {
    return (
      <Box component='span'>
        {
          count > 0
            ? `第 ${from} ~ ${to} 条（共 ${count} 条）`
            : Constants.SPACE
        }
      </Box>
    )
  }
}
