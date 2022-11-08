export const getUserInfo = (users, id) => {
    const user = users.find(user => user.id === id);
    return user;
}

export const searchUsers = (users, search) => {
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
    return filteredUsers;
}