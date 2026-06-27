import { describe, it, expect } from 'vitest'
import { isDecimalNumber } from './number'

describe('isDecimalNumber', () => {
    it('should return true for valid decimal numbers', () => {
        expect(isDecimalNumber('0')).toBe(true)
        expect(isDecimalNumber('123')).toBe(true)
        expect(isDecimalNumber('123.456')).toBe(true)
        expect(isDecimalNumber('0.123')).toBe(true)
        expect(isDecimalNumber('100.00')).toBe(true)
    })

    it('should return false for hexadecimal numbers', () => {
        expect(isDecimalNumber('0x10')).toBe(false)
        expect(isDecimalNumber('0xFF')).toBe(false)
        expect(isDecimalNumber('0x1a2b')).toBe(false)
    })

    it('should return false for scientific notation', () => {
        expect(isDecimalNumber('1e3')).toBe(false)
        expect(isDecimalNumber('1.5e2')).toBe(false)
        expect(isDecimalNumber('1E-5')).toBe(false)
    })

    it('should return false for negative numbers', () => {
        expect(isDecimalNumber('-123')).toBe(false)
        expect(isDecimalNumber('-123.456')).toBe(false)
    })

    it('should return false for empty string', () => {
        expect(isDecimalNumber('')).toBe(false)
    })

    it('should return false for strings with letters', () => {
        expect(isDecimalNumber('abc')).toBe(false)
        expect(isDecimalNumber('12a34')).toBe(false)
        expect(isDecimalNumber('12.34a')).toBe(false)
    })

    it('should return false for multiple decimal points', () => {
        expect(isDecimalNumber('12.34.56')).toBe(false)
        expect(isDecimalNumber('.123.')).toBe(false)
    })

    it('should return false for leading/trailing decimal point', () => {
        expect(isDecimalNumber('.123')).toBe(false)
        expect(isDecimalNumber('123.')).toBe(false)
    })

    it('should return false for special characters', () => {
        expect(isDecimalNumber('12,345')).toBe(false)
        expect(isDecimalNumber('12 345')).toBe(false)
        expect(isDecimalNumber('12+345')).toBe(false)
    })
})
