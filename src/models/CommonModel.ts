export interface CommonReducerDataArrayModel<T = []> {
  message?: string | null
  succeeded: boolean
  isCompleted: boolean
  dataArray: T
}
