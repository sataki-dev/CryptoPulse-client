export const shortText = (data: string, length: number) => {
    if (data.length > length) {
        return data.slice(0, length) + '...'
    }
    return data
}
