//håller koll på users! -lägger till tar bort osv

const users = [];
console.log(users);

//new user(socket instans)
const addUser = (id, name, room) => {
  //save usernames in lowercase+trimed
  //Samuel Karlström ->samuelkarlström

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //nyi- check if user already exist ( same username)

  const user = { id, name, room };
  users.push(user);
  console.log(users);
  return user;
};

const removeUser = (id) => {
  const index = users.findIndex(function (user) {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = () => {};

const getUsersInRoom = () => {};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
