import * as React from 'react'

export const getRupeeSymbol = () => {
  return '₹'
}

export const getCurrencySymbol = (currencyType?: string | null) => {
  if (currencyType) {
    return '₹'
  }
  return '₹'
}

// Create our number formatter.
export const currencyFormatter = ({
  currency,
  minimumFractionDigits,
  maximumFractionDigits
}: {
  currency?: string | null
  minimumFractionDigits?: number | null
  maximumFractionDigits?: number | null
}) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency && currency !== '' ? currency : 'INR',
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits:
      minimumFractionDigits !== undefined && minimumFractionDigits !== null ? minimumFractionDigits : 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits:
      maximumFractionDigits !== undefined && maximumFractionDigits !== null ? maximumFractionDigits : 2 // (causes 2500.99 to be printed as $2,501)
  })

export const getFormattedCurrency = ({
  amount,
  currency,
  minimumFractionDigits,
  maximumFractionDigits
}: {
  amount: number
  currency?: string | null
  minimumFractionDigits?: number | null
  maximumFractionDigits?: number | null
}) => {
  if (amount !== undefined && amount !== null) {
    return currencyFormatter({ currency, minimumFractionDigits, maximumFractionDigits }).format(amount)
  }
  return ''
}

export const getFormattedCurrencyWithSymbol = ({
  amount,
  currency = 'INR',
  minimumFractionDigits,
  maximumFractionDigits
}: {
  amount: number
  currency?: string | null
  minimumFractionDigits?: number | null
  maximumFractionDigits?: number | null
}) => {
  return getFormattedCurrency({ amount, currency, minimumFractionDigits, maximumFractionDigits })
}
