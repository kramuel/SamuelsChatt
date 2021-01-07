//håller koll på users! -lägger till tar bort osv

const users = [];

//new user(socket instans)
const addUser = ({ id, name, room }) => {
  //save usernames in lowercase+trimed
  //Samuel Karlström ->samuelkarlström
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // check if user already exist ( same username)
  const existingUser = users.find(function (user) {
    return user.room === room && user.name === name;
  });

  if (existingUser) {
    return { error: "Upptaget användarnamn" };
  }

  const user = { id, name, room };
  users.push(user);
  console.log("--addUser--users array in user.js:", users);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex(function (user) {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  console.log("(--RemoveUser--users array in user.js:", users);
};

const getUser = (id) => {
  return users.find(function (user) {
    return user.id === id;
  });
};

const getUsersInRoom = (room) => {
  return users.filter(function (user) {
    user.room === room;
  });
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
