export interface VerticalCardPatchStatisticDataReturnProps {
  stats?: string
  icon?: any
  color?: any
  trendNumber?: string
  title?: string
  subtitle?: string
}

export interface VerticalCardStatisticDataReturnProps {
  patchData: VerticalCardPatchStatisticDataReturnProps[] | []
}
