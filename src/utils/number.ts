export const isDecimalNumber = (value: string): boolean => {
    const decimalRegex = /^[0-9]+(\.[0-9]+)?$/
    return decimalRegex.test(value)
}
