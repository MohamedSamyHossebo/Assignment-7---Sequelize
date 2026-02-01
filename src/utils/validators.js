// checkPasswordLength

const checkPasswordLength = (value) => {
    if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
}
const checkNameLength = (value) => {
    if (value.length < 2) {
        throw new Error("Name must be at least 2 characters long");
    }
}
export { checkPasswordLength, checkNameLength }