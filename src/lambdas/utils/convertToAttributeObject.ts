export const convertToAttributeObject = (input: Record<string, any>) => {
    return {
        names: Object.keys(input).reduce<any>((acc, param) => {
            acc[`#${param}`] = param
            return acc
        }, {}),
        values: Object.keys(input).reduce<any>((acc, param) => {
            acc[`:${param}`] = input[param as keyof typeof input]
            return acc
        }, {})
    }
}