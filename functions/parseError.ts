const parseError = (error: object) => {
    const string = `${error}`
    return string.split(':')[2].trim()
}

export default parseError