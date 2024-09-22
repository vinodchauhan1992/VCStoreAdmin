import { CustomisedAccordionsObjectProps } from 'src/models/CustomisedAccordionModel'

export const isSelected = ({
  panels,
  newPanel
}: {
  panels?: CustomisedAccordionsObjectProps[] | []
  newPanel?: CustomisedAccordionsObjectProps | null
}) => {
  const foundPanel = panels?.find(thisPanel => thisPanel?.id === newPanel?.id)
  if (foundPanel) {
    return true
  }
  return false
}

export const handleOnAccordionChange = ({
  newPanel,
  setExpandedPanels,
  panels,
  controlled
}: {
  newPanel?: CustomisedAccordionsObjectProps | null
  setExpandedPanels: (expandedPanels: CustomisedAccordionsObjectProps[]) => void
  panels?: CustomisedAccordionsObjectProps[] | []
  controlled?: boolean
}) => {
  const isSelectedPanel = isSelected({ panels, newPanel })
  if (controlled) {
    if (newPanel) {
      setExpandedPanels?.(isSelectedPanel ? [] : [newPanel])
    }
  } else {
    const updatedPanelsArr: CustomisedAccordionsObjectProps[] | [] = panels ? [...panels] : []
    if (isSelectedPanel) {
      const foundIndex = panels?.findIndex(thisPanel => thisPanel?.id === newPanel?.id)
      if (foundIndex !== undefined && foundIndex !== null && foundIndex !== -1) {
        updatedPanelsArr.splice(foundIndex, 1)
      }
      setExpandedPanels(updatedPanelsArr)
    } else if (!isSelectedPanel && newPanel) {
      updatedPanelsArr?.push(newPanel)
      setExpandedPanels(updatedPanelsArr)
    }
  }
}
