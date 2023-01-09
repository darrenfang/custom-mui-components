import {
  Box,
  FormHelperText,
  Skeleton,
  SxProps,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import { StandardTextFieldProps } from '@mui/material/TextField/TextField'
import { ChangeEvent, useEffect, useState } from 'react'
import { Constants } from '../Constants'

const DEFAULT_INPUT_BACKGROUND_COLOR = '#F4F5F7'
const DEFAULT_LABEL_FONT_SIZE = '0.9rem'
const DEFAULT_INPUT_LOADING_COLOR = '#DFE1E6'
const DEFAULT_INPUT_HOVER_COLOR = '#9D9D9D'
const DEFAULT_INPUT_FOCUS_BACKGROUND_COLOR = '#FCFCFC'

interface Props extends StandardTextFieldProps {
  loading?: boolean
  tooltip?: string
  onValueChange?: (value: string) => void
  sx?: SxProps<Theme>
  inputBackgroundColor?: string
  labelFontSize?: string
  inputLoadingColor?: string
  inputHoverColor?: string
  inputFocusBackgroundColor?: string
  hoverColor?: string
}

export function CustomTextField(props: Props) {

  const {
    loading,
    tooltip,
    label,
    value,
    error,
    helperText,
    disabled,
    onChange,
    rows,
    onValueChange,
    sx,
    inputBackgroundColor,
    labelFontSize,
    inputLoadingColor,
    inputHoverColor,
    inputFocusBackgroundColor,
    hoverColor,
    ...remainProps
  } = props

  const theme = useTheme()

  const [showError, setShowError] = useState(false)
  const [borderColor, setBorderColor] = useState(inputBackgroundColor || DEFAULT_INPUT_BACKGROUND_COLOR)
  const [input, setInput] = useState('')
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    if (edited) {
      if (remainProps.required && !input) {
        setShowError(true)
        setBorderColor(theme.palette.error.main)
      } else {
        setShowError(false)
        setBorderColor(theme.palette.secondary.main)
      }

      return
    }

    if (!loading && error) {
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
    setInput(value ? value as string : '')
  }, [value])

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value
    setInput(newValue)
    setEdited(newValue !== value)

    if (onValueChange) {
      onValueChange(newValue)
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <Tooltip arrow title={tooltip || ''}>
      <Box sx={sx}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: 0.5,
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
                height: `calc(${rows || 1} * 1.5rem + 8px + 4px)`,
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
            <TextField
              {...remainProps}
              variant='standard'
              rows={rows}
              sx={{
                flex: '1',
                border: `${borderColor} 2px solid`,
                borderRadius: `${theme.shape.borderRadius}px`,
                '&:hover': {
                  border: `${hoverColor || inputHoverColor || DEFAULT_INPUT_HOVER_COLOR} 2px solid`
                },
                '& .MuiInput-root': {
                  p: 0
                },
                '& .MuiInput-root:before, & .MuiInput-root:after': {
                  border: 'none !important'
                },
                '& .MuiInput-input': {
                  backgroundColor: inputBackgroundColor || DEFAULT_INPUT_BACKGROUND_COLOR,
                  height: '1.5rem',
                  lineHeight: '1.5rem',
                  py: 0.5,
                  px: 1,
                  color: '#000',
                  cursor: 'text',
                  borderRadius: `${theme.shape.borderRadius - 3}px`
                },
                '& .MuiInput-input:focus': {
                  backgroundColor: inputFocusBackgroundColor || DEFAULT_INPUT_FOCUS_BACKGROUND_COLOR
                }
              }}
              disabled={loading || disabled}
              error={error}
              value={input}
              onChange={changeHandler}
            />
        }
      </Box>
    </Tooltip>
  )
}
