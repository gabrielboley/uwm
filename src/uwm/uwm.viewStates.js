import store from 'store';

export function needsToLogin() {
    const currentUser = store.get('user');
    return !currentUser;
}
