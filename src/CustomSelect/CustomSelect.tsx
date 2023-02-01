import {
  Box,
  FormHelperText,
  Select,
  SelectChangeEvent,
  Skeleton,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import { SelectProps } from '@mui/material/Select/Select'
import { ReactNode, useEffect, useState } from 'react'
import { Constants } from '../Constants'

const DEFAULT_INPUT_BACKGROUND_COLOR = '#F4F5F7'
const DEFAULT_LABEL_FONT_SIZE = '0.9rem'
const DEFAULT_INPUT_LOADING_COLOR = '#DFE1E6'
const DEFAULT_INPUT_HOVER_COLOR = '#9D9D9D'
const DEFAULT_INPUT_FOCUS_BACKGROUND_COLOR = '#FCFCFC'

interface Props extends SelectProps<string> {
  loading?: boolean
  tooltip?: string
  helperText?: string
  onValueChange: (value: string) => void
  inputBackgroundColor?: string
  labelFontSize?: string
  inputLoadingColor?: string
  inputHoverColor?: string
  inputFocusBackgroundColor?: string
  hoverColor?: string
}

export function CustomSelect(props: Props) {
  const {
    loading,
    disabled,
    size,
    sx,
    label,
    value,
    tooltip,
    error,
    helperText,
    children,
    onChange,
    onValueChange,
    inputBackgroundColor,
    labelFontSize,
    inputLoadingColor,
    inputHoverColor,
    inputFocusBackgroundColor,
    hoverColor,
    fullWidth,
    ...remainProps
  } = props

  const theme = useTheme()
  const [showError, setShowError] = useState(false)
  const [borderColor, setBorderColor] = useState(inputBackgroundColor || DEFAULT_INPUT_BACKGROUND_COLOR)
  const [input, setInput] = useState<string>('')
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    if (edited) {
      setBorderColor(theme.palette.secondary.main)
      setShowError(false)
      return
    }

    if (loading || !error) {
      setShowError(false)
      return
    }

    if (remainProps.required && !input) {
      setShowError(true)
      setBorderColor(theme.palette.error.main)
      return
    }

    setShowError(false)
    setBorderColor(inputBackgroundColor || DEFAULT_INPUT_BACKGROUND_COLOR)
  }, [loading, remainProps.required, input, error, edited])

  useEffect(() => {
    setEdited(false)
  }, [loading])

  useEffect(() => {
    setInput(value || '')
  }, [value])

  const changeHandler = (e: SelectChangeEvent<string>, child: ReactNode) => {
    const newValue = e.target.value as string
    setInput(newValue)
    setEdited(newValue !== value)
    onValueChange(newValue)

    if (onChange) {
      onChange(e, child)
    }
  }

  return (
    <Tooltip arrow title={tooltip || ''}>
      <Box sx={sx}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            mb: 0.5,
            justifyContent: 'space-between'
          }}
        >
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: labelFontSize || DEFAULT_LABEL_FONT_SIZE
            }}
          >
            {label}
          </Typography>
          <FormHelperText
            error={showError}
            sx={{
              m: 0
            }}
          >
            {showError ? helperText : ''}
          </FormHelperText>
        </Box>

        {
          loading
            ?
            <Skeleton
              component='div'
              variant='rectangular'
              animation='wave'
              sx={{
                border: `${inputLoadingColor || DEFAULT_INPUT_LOADING_COLOR} 2px solid`,
                borderRadius: `${theme.shape.borderRadius}px`,
                backgroundColor: inputBackgroundColor || DEFAULT_INPUT_BACKGROUND_COLOR,
                px: 1,
                py: 0.5,
                color: '#000',
                cursor: 'text',
                flex: '1',
                maxWidth: '100%',
                opacity: 0.6
              }}
            >
              {input || Constants.SPACE}
            </Skeleton>
            :
            <Select
              {...remainProps}
              fullWidth={fullWidth === undefined ? true : fullWidth}
              variant='standard'
              value={input || ''}
              size={size || 'small'}
              disabled={loading || disabled}
              onChange={changeHandler}
              sx={{
                flex: '1',
                border: `${borderColor} 2px solid`,
                borderRadius: `${theme.shape.borderRadius}px`,
                p: 0,
                '&:hover': {
                  border: `${hoverColor || inputHoverColor || DEFAULT_INPUT_HOVER_COLOR} 2px solid`
                },
                '&:before, &:after': {
                  border: 'none !important'
                },
                '& .MuiInputBase-input': {
                  backgroundColor: inputBackgroundColor || DEFAULT_INPUT_BACKGROUND_COLOR,
                  height: '1.5rem',
                  lineHeight: '1.5rem',
                  py: 0.5,
                  px: 1,
                  color: '#000',
                  cursor: 'text',
                  borderRadius: `${theme.shape.borderRadius - 3}px`
                },
                '& .MuiInputBase-input:focus': {
                  backgroundColor: inputFocusBackgroundColor || DEFAULT_INPUT_FOCUS_BACKGROUND_COLOR,
                  borderRadius: `${theme.shape.borderRadius}px`
                }
              }}
            >
              {
                children
              }
            </Select>
        }
      </Box>
    </Tooltip>
  )
}
