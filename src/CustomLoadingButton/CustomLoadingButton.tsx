import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
  useTheme
} from '@mui/material'
import { ButtonPropsSizeOverrides } from '@mui/material/Button/Button'
import { OverridableStringUnion } from '@mui/types'


interface Props extends ButtonProps {
  loading: boolean
  iconSize: number | string
  text?: string
  sx?: SxProps<Theme>
}

export function CustomLoadingButton(props: Props) {

  const theme = useTheme()

  const {
    loading,
    disabled,
    text,
    iconSize,
    children,
    startIcon,
    size,
    ...remainProps
  } = props

  const fontSize = getFontSize(size)

  return (
    <Button
      sx={{
        opacity: loading ? '0.6' : 1,
        '& .MuiButton-startIcon': {
          mr: 0
        }
      }}
      {...remainProps}
      size={size}
      disabled={loading || disabled}
      startIcon={loading ?
        <CircularProgress size={iconSize} color='error' /> : startIcon}
    >
      {
        text &&
        <Typography
          className='btn-text'
          sx={{
            ml: `${theme.spacing(1)} !important`,
            display: {
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'block'
            },
            fontSize
          }}
        >
          {text}
        </Typography>
      }
      {
        children &&
        <Box
          sx={{
            ml: `${theme.spacing(1)} !important`
          }}
        >
          {children}
        </Box>
      }
    </Button>
  )
}

const getFontSize = (value?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>) => {
  switch (value) {
    case 'small':
      return '0.85rem'
    case 'medium':
      return '1rem'
    case 'large':
      return '1.25rem'
    default:
      return '1rem'
  }
}
