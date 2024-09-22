import { ReactNode } from 'react'

export interface CustomisedAccordionsObjectProps {
  id: string
  accordionSummary?: string | null
  accordionDetails?: string | null
  accordionSummaryChildren?: () => ReactNode | null
  accordionDetailsChildren?: () => ReactNode | null
  accordionName?: string | null
}
