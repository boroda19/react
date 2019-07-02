import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments:', () => {
    test('test sum function type', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('test sum with no-number data second argument', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('test sum with no-number data first argument', () => {
        expect(() => sum('hello', 5)).toThrow();
    });

    test('test sum result', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 7)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('test getUniqueID function type', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('test getUniqueID with no-number data second argument', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('test getUniqueID result', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(10)).toHaveLength(10);
        expect(getUniqueID(7)).toHaveLength(7);
    });

    test('test getFullApiUrl function type', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('test getFullApiUrl with no-string data first argument', () => {
        expect(() => getFullApiUrl(1, 'hello')).toThrow();
    });

    test('test getFullApiUrl with no-string data second argument', () => {
        expect(() => getFullApiUrl('hello', 5)).toThrow();
    });

    test('test getFullApiUrl result', () => {
        expect(typeof getFullApiUrl('https://test.com', '12345')).toBe('string');
        expect(getFullApiUrl('https://test.com', '12345')).toBe('https://test.com/12345');
    });
});
