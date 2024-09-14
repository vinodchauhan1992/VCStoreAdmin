export interface CommonReducerDataArrayModel<T = []> {
  message?: string | null
  succeeded: boolean
  isCompleted: boolean
  dataArray: T | []
}

export interface DeleteDataCommonReducerModel<T = null> {
  message?: string | null
  succeeded: boolean
  isCompleted: boolean
  data?: T | null
}

export interface AddDataCommonReducerModel<T = null> {
  message?: string | null
  succeeded: boolean
  isCompleted: boolean
  data?: T | null
}

export interface UpdateDataCommonReducerModel<T = null> {
  message?: string | null
  succeeded: boolean
  isCompleted: boolean
  data?: T | null
}