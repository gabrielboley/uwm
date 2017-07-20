export function passwordIsMaxed(password, action) {
    return password.length === 4 && !action;
}
