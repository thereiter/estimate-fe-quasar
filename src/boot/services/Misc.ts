const truncateString = (string = '', maxLength = 25) =>
    string.length > maxLength
        ? `${string.substring(0, maxLength)}…`
        : string

export { truncateString }