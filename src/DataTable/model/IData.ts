import { ReactNode } from 'react'
import { ID } from './ID'

export interface IData<T extends ID> {
  data: T
  collapse?: ReactNode
}
