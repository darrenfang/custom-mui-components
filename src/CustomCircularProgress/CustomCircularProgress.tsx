import { CircularProgress, SxProps, Theme } from '@mui/material'
import { CircularProgressProps } from '@mui/material/CircularProgress/CircularProgress'
import { useEffect, useState } from 'react'

interface Props extends CircularProgressProps {
  speed: number
  step: number
  sx?: SxProps<Theme>
}

export function CustomCircularProgress(props: Props) {

  const [value, setValue] = useState(0)

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      setValue(prevState => {
        const newValue = prevState + props.step
        return newValue > 100000 ? 0 : newValue
      })
    }, props.speed)

    return () => {
      clearInterval(intervalHandler)
    }
  }, [props])

  return (
    <CircularProgress
      {...props}
      variant='determinate'
      value={value}
    />
  )
}
