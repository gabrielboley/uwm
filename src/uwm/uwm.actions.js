export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = (user) => ({
    type: UPDATE_USER,
    user
});

export const UPDATE_PAGE_IN_VIEW = 'UPDATE_PAGE_IN_VIEW';
export const updatePageInView = (page) => ({
    type: UPDATE_PAGE_IN_VIEW,
    page
});

export const UPDATE_STORE = 'UPDATE_STORE';
export const updateStore = state => ({
    type: UPDATE_STORE,
    state
});
