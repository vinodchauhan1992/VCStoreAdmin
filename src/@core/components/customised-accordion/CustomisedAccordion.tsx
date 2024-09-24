import React, { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { common, grey } from '@mui/material/colors'
import themeConfig from 'src/configs/themeConfig'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { handleOnAccordionChange, isSelected } from './utils/customisedAccordionUtils'
import Chip from '@mui/material/Chip'
import { Stack } from '@mui/material'
import CustomisedMenu from 'src/@core/components/customised-menu/CustomisedMenu'
import { CustomisedAccordionsObjectProps } from 'src/models/CustomisedAccordionModel'
import Paper from '@mui/material/Paper'

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&::before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? grey[900] : grey[600],
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

export interface CustomisedAccordionProps {
  customisedAccordionsArray: CustomisedAccordionsObjectProps[]
  defaultSelected?: CustomisedAccordionsObjectProps | null
  isExpandAllBtnVisible?: boolean
  defaultControlled?: boolean
  showControlledOption?: boolean
}

const CustomisedAccordion = (props: CustomisedAccordionProps) => {
  const {
    customisedAccordionsArray,
    defaultSelected,
    isExpandAllBtnVisible,
    defaultControlled = false,
    showControlledOption = false
  } = props

  const [expandedPanels, setExpandedPanels] = useState<CustomisedAccordionsObjectProps[] | []>([])
  const [controlled, setControlled] = useState<boolean>(defaultControlled)

  useEffect(() => {
    if (defaultSelected && expandedPanels.length <= 0) {
      setExpandedPanels(defaultSelected ? [defaultSelected] : [])
    }
  }, [defaultSelected])

  const renderAccordionSummaryChildren = (customisedAccordionData: CustomisedAccordionsObjectProps) => {
    if (
      customisedAccordionData?.accordionSummary &&
      typeof customisedAccordionData.accordionSummary === 'string' &&
      customisedAccordionData.accordionSummary !== ''
    ) {
      return (
        <Typography style={{ color: themeConfig.mode === 'dark' ? common.black : common.white }} variant='overline'>
          {customisedAccordionData.accordionSummary}
        </Typography>
      )
    }
    if (
      customisedAccordionData?.accordionDetailsChildren &&
      typeof customisedAccordionData.accordionDetailsChildren === 'function'
    ) {
      return customisedAccordionData.accordionDetailsChildren()
    }
    return null
  }

  const renderAccordionDetailsChildren = (customisedAccordionData: CustomisedAccordionsObjectProps) => {
    if (
      customisedAccordionData?.accordionDetails &&
      typeof customisedAccordionData.accordionDetails === 'string' &&
      customisedAccordionData.accordionDetails !== ''
    ) {
      return <Typography>{customisedAccordionData.accordionDetails}</Typography>
    }
    if (
      customisedAccordionData?.accordionDetailsChildren &&
      typeof customisedAccordionData.accordionDetailsChildren === 'function'
    ) {
      return customisedAccordionData.accordionDetailsChildren()
    }
    return null
  }

  const renderAccordions = () => {
    return customisedAccordionsArray.map(customisedAccordionData => {
      return (
        <Accordion
          expanded={isSelected({ panels: expandedPanels, newPanel: customisedAccordionData })}
          onChange={() =>
            handleOnAccordionChange({
              panels: expandedPanels,
              newPanel: customisedAccordionData,
              setExpandedPanels,
              controlled
            })
          }
        >
          <AccordionSummary
            expandIcon={
              <ArrowDownwardIcon style={{ color: themeConfig.mode === 'dark' ? common.black : common.white }} />
            }
            aria-controls={`panel${customisedAccordionData.id}d-content`}
            id={`panel${customisedAccordionData.id}d-header`}
          >
            {renderAccordionSummaryChildren(customisedAccordionData)}
          </AccordionSummary>
          <AccordionDetails>{renderAccordionDetailsChildren(customisedAccordionData)}</AccordionDetails>
        </Accordion>
      )
    })
  }

  const isExpandAllClicked = () => {
    return expandedPanels && expandedPanels.length === customisedAccordionsArray.length ? true : false
  }

  const renderControlledChipBtn = () => {
    if (!showControlledOption) {
      return null
    }
    return (
      <Chip
        label={controlled ? 'Controlled' : 'Uncontrolled'}
        size='medium'
        clickable
        style={{ marginBottom: 20, marginLeft: controlled ? 0 : 15 }}
        color={controlled ? 'info' : 'warning'}
        variant='filled'
        onClick={() => {
          setControlled(!controlled)
          setExpandedPanels([customisedAccordionsArray[0]])
        }}
      />
    )
  }

  const renderExpandCollapseBtn = () => {
    if (controlled) {
      return null
    }
    if (!isExpandAllBtnVisible) {
      return null
    }
    return (
      <Chip
        label={!isExpandAllClicked() ? 'Expand all' : 'Collapse all'}
        size='medium'
        clickable
        style={{ marginBottom: 20 }}
        color={isExpandAllClicked() ? 'warning' : 'info'}
        variant='filled'
        onClick={() => {
          console.log('expandedPanels', expandedPanels)
          if (!isExpandAllClicked()) {
            setExpandedPanels(customisedAccordionsArray)
          } else {
            setExpandedPanels([])
          }
        }}
      />
    )
  }

  return (
    <div>
      <Stack direction='row' flexWrap='nowrap' style={{ scrollBehavior: 'smooth' }}>
        {renderExpandCollapseBtn()}
        {renderControlledChipBtn()}
      </Stack>
      {renderAccordions()}
    </div>
  )
}

export default CustomisedAccordion
