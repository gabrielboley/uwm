export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const LOG_USER_IN = 'LOG_USER_IN';
export const logUserIn = (user) => {
    return {
        type: LOG_USER_IN,
        user
    };
};

export const HAS_LOGIN_ERRORS = 'HAS_LOGIN_ERRORS';
export const hasLoginError = () => {
    return {
        type: HAS_LOGIN_ERRORS
    };
};

export const LOG_USER_OUT = 'LOG_USER_OUT';
export const logUserOut = () => ({
    type: LOG_USER_OUT
})

