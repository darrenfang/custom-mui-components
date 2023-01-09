import {
  Box,
  CircularProgress,
  Switch,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'


interface Props {
  loading?: boolean
  tooltip?: string
  disabled?: boolean
  label?: string
  value: boolean
  description?: string
  onChange: (value: boolean) => void
  sx?: SxProps<Theme>
}

export function CustomSwitch({
                               loading,
                               tooltip,
                               disabled,
                               label,
                               value,
                               description,
                               onChange,
                               sx,
                               ...remainProps
                             }: Props) {

  const theme = useTheme()

  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '35px'
        }}
      >
        {
          label &&
          <Typography
            className='label'
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.9rem',
              mr: 1
            }}
          >
            {label}
          </Typography>
        }
        <Tooltip
          arrow
          title={loading ? '加载中，请稍后' : tooltip || ''}
        >
          <Box
            sx={{
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {
              loading &&
              <Box
                sx={{
                  width: '54px',
                  textAlign: 'center',
                  mr: 1
                }}
              >
                <CircularProgress size={16} />
              </Box>
            }
            {
              !loading &&
              <Switch
                {...remainProps}
                sx={{
                  width: '62px',
                  height: '34px',
                  padding: '7px',
                  '& .MuiSwitch-switchBase': {
                    m: '1px',
                    p: 0,
                    transform: `translateX(${value ? 26 : 2}px) !important`,
                    color: '#fff',
                    '& .MuiSwitch-thumb': {
                      width: '32px',
                      height: '32px',
                      backgroundColor: value ? theme.palette.success.main : theme.palette.error.main
                    },
                    '& .MuiSwitch-thumb:before': {
                      content: '\'\'',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      left: '0',
                      top: '0',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundImage: 'none',
                      backgroundColor: value ? theme.palette.success.light : theme.palette.error.light,
                      borderRadius: '50%',
                      border: `${value ? theme.palette.success.main : theme.palette.error.main} 8px solid`
                    }
                  },
                  '& .MuiSwitch-track': {
                    borderRadius: `${theme.shape.borderRadius}px`,
                    backgroundColor: `${value ? theme.palette.success.light : theme.palette.error.light} !important`
                  }
                }}
                disabled={loading || disabled}
                checked={loading ? false : value}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
          </Box>
        </Tooltip>
        <Typography
          sx={{
            fontSize: '0.85rem',
            ml: 1,
            color: loading
              ? theme.palette.text.disabled
              : value ? theme.palette.success.main : theme.palette.error.main,
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? '加载中，请稍后...' : description}
        </Typography>
      </Box>
    </Box>
  )
}
