export const UPDATE_USER_SETTINGS = 'UPDATE_USER_SETTINGS';
export const updateUserSettings = (userIndex, user) => ({
    type: UPDATE_USER_SETTINGS,
    userIndex,
    user
})

export const DELETE_USER = 'DELETE_USER';
export const deleteUser = (userIndex, user) => ({
    type: DELETE_USER,
    userIndex,
    user
})
