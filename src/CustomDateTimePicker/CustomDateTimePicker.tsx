import { Box, SxProps, Theme, Tooltip, useTheme } from '@mui/material'
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField'
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {
  MobileDateTimePickerProps
} from '@mui/x-date-pickers/MobileDateTimePicker/MobileDateTimePicker'
import { format, parse } from 'date-fns'
import zhCNLocale from 'date-fns/locale/zh-CN'
import { useEffect, useState } from 'react'
import { CustomTextField } from '../CustomTextField'

type MobileDateTimePickerPropsWithoutOnChange<TDate extends string | Date> =
  Omit<MobileDateTimePickerProps<TDate>, 'onChange'>
  & {
  onChange?: (date: TDate | null, keyboardInputValue?: string) => void
}

type CustomMobileDateTimePickerProps<TDate extends string | Date> =
  Omit<MobileDateTimePickerPropsWithoutOnChange<TDate>, 'renderInput'>
  & {
  renderInput?: (props: MuiTextFieldPropsType) => React.ReactElement
}

interface Props<TDate extends string | Date> extends CustomMobileDateTimePickerProps<TDate> {
  required?: boolean
  fullWidth?: boolean
  size?: 'small' | 'medium'
  tooltip?: string
  dateTimeFormat: string
  error?: boolean
  helperText?: string
  onValueChange: (value: string | null) => void
  sx?: SxProps<Theme>
  hoverColor?: string
}

const formats = {
  normalDate: 'yyyy-MM-dd',
  keyboardDateTime24h: 'yyyy-MM-dd HH:mm:ss'
}

export function CustomDateTimePicker<TDate extends string | Date>({
                                                                    loading,
                                                                    required,
                                                                    fullWidth,
                                                                    size,
                                                                    disabled,
                                                                    tooltip,
                                                                    label,
                                                                    value,
                                                                    dateTimeFormat,
                                                                    error,
                                                                    helperText,
                                                                    onValueChange,
                                                                    onChange,
                                                                    renderInput,
                                                                    sx,
                                                                    hoverColor,
                                                                    ...remainProps
                                                                  }: Props<TDate>) {

  const theme = useTheme()
  const [showError, setShowError] = useState(true)
  const [input, setInput] = useState<Date | null>(null)
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    if (edited) {
      setShowError(false)
      return
    }

    if (loading || !error) {
      setShowError(false)
      return
    }

    if (required && !input) {
      setShowError(true)
      return
    }

    setShowError(false)
  }, [loading, required, input, error, edited])

  useEffect(() => {
    if (value) {
      setInput(parse(value as string, dateTimeFormat, new Date()))
    } else {
      setInput(null)
    }
  }, [value])

  useEffect(() => {
    setEdited(false)
  }, [loading])

  const acceptHandler = (value: string | Date | null) => {
    setEdited(true)
    if (value) {
      if (value instanceof Date) {
        onValueChange(format(value, dateTimeFormat))
      } else {
        onValueChange(value)
      }
    }
  }

  return (
    <Tooltip arrow title={tooltip || ''}>
      <Box sx={sx}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          locale={zhCNLocale}
          dateFormats={formats}
        >
          <MobileDateTimePicker
            {...remainProps}
            DialogProps={{
              sx: {
                '.MuiPaper-root': {
                  width: '320px'
                },
                '.MuiButton-root': {
                  padding: 0,

                  '.MuiTypography-root': {
                    ml: 0
                  }
                },
                // 头部样式
                '.PrivatePickersToolbar-root': {
                  backgroundColor: theme.palette.primary.main,
                  '.MuiTypography-root': {
                    color: 'rgba(255, 255, 255, 0.3) !important'
                  },

                  '.MuiTypography-root.Mui-selected': {
                    color: '#FFF !important'
                  },

                  '.PrivateDateTimePickerToolbar-penIcon': {
                    display: 'none'
                  },
                  // 时间样式
                  '.PrivatePickersToolbar-dateTitleContainer': {
                    '.MuiTypography-root': {
                      fontSize: '2.125rem',
                      ml: '2px',
                      mr: '2px'
                    }
                  }
                },
                // 时间选择样式
                '.MuiClockPicker-root': {
                  height: '358px',
                  justifyContent: 'center'
                },
                // 按钮样式
                '.MuiDialogActions-root': {
                  '.MuiButton-root': {
                    p: 1
                  },
                  '.MuiButton-root:nth-of-type(1)': {
                    color: theme.palette.info.main
                  }
                }
              }
            }}
            ampm={false}
            toolbarFormat='MM月dd日'
            showToolbar
            hideTabs
            toolbarTitle={(
              <Box
                sx={{
                  color: 'rgba(255, 255, 255, 0.8) !important'
                }}
              >
                选择日期和时间
              </Box>
            )}
            value={input || ''}
            disabled={loading || disabled}
            cancelText='取消'
            okText='确定'
            disableMaskedInput
            renderInput={({variant, ...params}) => (
              <CustomTextField
                {...params}
                label={label}
                helperText={helperText}
                fullWidth={fullWidth || true}
                variant='standard'
                size={size || 'small'}
                required={required}
                loading={loading}
                error={showError}
                value={input ? format(input, dateTimeFormat) : ''}
                onValueChange={(value) => {
                  const newInput = parse(value, dateTimeFormat, new Date())
                  setEdited(newInput !== input)
                  setInput(newInput)
                }}
                sx={{
                  '.MuiTextField-root': {
                    border: edited ? `${theme.palette.secondary.main} 2px solid` : ''
                  }
                }}
                hoverColor={hoverColor}
              />
            )}
            onChange={() => {
            }}
            onAccept={acceptHandler}
          />
        </LocalizationProvider>
      </Box>
    </Tooltip>
  )
}
