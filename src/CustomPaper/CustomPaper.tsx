import { Box, Paper, useTheme } from '@mui/material'
import { PaperProps } from '@mui/material/Paper/Paper'
import { ReactNode } from 'react'

interface Props extends PaperProps {
  head: ReactNode
  headBackgroundColor?: string
  action?: ReactNode
}

export function CustomPaper(props: Props) {

  const theme = useTheme()
  const {
    sx,
    head,
    headBackgroundColor,
    action,
    children,
    ...remainProps
  } = props

  return (
    <Paper
      {...remainProps}
      elevation={remainProps.elevation === undefined ? 8 : remainProps.elevation}
      sx={sx}
    >
      <Box
        className='paper-head'
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopLeftRadius: `${theme.shape.borderRadius}px`,
          borderTopRightRadius: `${theme.shape.borderRadius}px`,
          backgroundColor: headBackgroundColor || theme.palette.secondary.main,
          color: '#FFF'
        }}
      >
        <Box>
          {head}
        </Box>
        <Box>
          {action}
        </Box>
      </Box>
      <Box className='paper-content'>
        {children}
      </Box>
    </Paper>
  )
}
