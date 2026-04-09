export function formatUsd(value: number): string {
  const maximumFractionDigits =
    value >= 1000 ? 2 : value >= 1 ? 4 : value >= 0.01 ? 6 : 8

  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: value >= 1000 ? 2 : 0,
    style: 'currency',
  }).format(value)
}

export function formatChange(value: number | null): string {
  if (value === null) {
    return 'N/A'
  }

  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function formatAssetAmount(value: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: value >= 1 ? 6 : 8,
  }).format(value)
}

export function formatTimestamp(value: string | null): string {
  if (!value) {
    return 'Syncing...'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
