import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material'
import { IconButton, Typography, useTheme } from '@mui/material'
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions'
import React, { ForwardedRef } from 'react'

interface Props extends React.PropsWithChildren<TablePaginationActionsProps> {
}

export const DataListPaginationActions = React.forwardRef(function TablePaginationActions(props: Props, ref: ForwardedRef<HTMLDivElement>) {
    const {
      backIconButtonProps,
      count,
      getItemAriaLabel,
      nextIconButtonProps,
      onPageChange,
      page,
      rowsPerPage,
      showFirstButton,
      showLastButton,
      ...other
    } = props

    const theme = useTheme()

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
      onPageChange(event, 0)
    }

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
      onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
      onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
      <div ref={ref} {...other}>
        {showFirstButton && (
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label={getItemAriaLabel('first')}
            title={getItemAriaLabel('first')}
            sx={{
              '&.Mui-disabled': {
                color: '#757575'
              }
            }}
          >
            {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            <Typography component='span' variant='body2'>
              首页
            </Typography>
          </IconButton>
        )}
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          color='inherit'
          aria-label={getItemAriaLabel('previous')}
          title={getItemAriaLabel('previous')}
          {...backIconButtonProps}
          sx={{
            '&.Mui-disabled': {
              color: '#757575'
            }
          }}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          <Typography component='span' variant='body2'>上一页</Typography>
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false}
          color='inherit'
          aria-label={getItemAriaLabel('next')}
          title={getItemAriaLabel('next')}
          {...nextIconButtonProps}
          sx={{
            '&.Mui-disabled': {
              color: '#757575'
            }
          }}
        >
          <Typography component='span' variant='body2'>下一页</Typography>
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        {showLastButton && (
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label={getItemAriaLabel('last')}
            title={getItemAriaLabel('last')}
            sx={{
              '&.Mui-disabled': {
                color: '#757575'
              }
            }}
          >
            <Typography component='span' variant='body2'>末页</Typography>
            {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
          </IconButton>
        )}
      </div>
    )
  }
)
