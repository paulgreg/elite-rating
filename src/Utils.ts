export const generateUniqueId = () => {
    const timestamp = new Date().getTime().toString(36)
    const randomString = Math.random().toString(36).substring(2, 5)
    return timestamp + randomString
}
