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
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex(function (user) {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find(function (user) {
    return user.id === id;
  });
};

const getUsersInRoom = (room) =>
  users.filter(function (user) {
    return user.room === room;
  });

const timeStamp = () => {
  let time = new Date();
  let timeStamp = time.toLocaleTimeString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
  });
  return timeStamp;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, timeStamp };
