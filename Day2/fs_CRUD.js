const fs = require("fs");

const user = {
  ID: 1,
  name: "duc",
  age: 19,
  gender: "male",
  
};

const user2 = {
  ID: 2,
  name: "hanh",
  age: 19,
  gender: "female",
  
};

const write = async (content) => {
  await fs.promises
    .write("info.json", JSON.stringify(content))
    .catch((error) => {
      if (error) throw error;
    });
};

const read = async () => {
  try {
    const data = await fs.promises.read("./fs_CRUD.json", "utf8");
    console.log("read data: ", JSON.parse(data));
  } catch (err) {
    throw err;
  }
};

const create = async () => {
  const exists = await fs.existsSync("./fs_CRUD.json");

  if (!exists) {
    write([user]);
    console.log(" created successful");
  } else {
    console.log(" existed successful");
  }
};

const check = async (userId) => {
  const read = await fs.promises.read("./fs_CRUD.json", "utf8");

  let user = JSON.parse(read);

  for (let i = 0; i < user.length; i++) {
    if (user[i].ID === userId) {
      return true;
    }
  }
};

const addUser = async (data) => {
  try {
    const read = await fs.promises.read("./fs_CRUD.json", "utf8");

    let user = JSON.parse(read);

    let idList = user.map((e) => e.ID);

    if (idList.indexOf(data.ID) < 0) {
      user.push(data);
      write(user);
    } else {
      console.log("ID existed, try again!");
    }
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (userId) => {
  const read = await fs.promises.read("./fs_CRUD.json", "utf8");

  if (await check(userId)) {
    let user = JSON.parse(read);

    for (let i = 0; i < user.length; i++) {
      if (user[i].ID === userId) {
        user.splice(user.indexOf(user[i]), 1);
      }
    }

    write(user);
  } else {
    console.log("In userId! Try another one");
  }
};

const updateUser = async (userId, updateData) => {
  const read = await fs.promises.read("./fs_CRUD.json", "utf8");

  if (await check(userId)) {
    let user = JSON.parse(read);

    for (let i = 0; i < user.length; i++) {
      if (user[i].ID === userId) {
        user[i] = updateData;
      }
    }

    write(user);
  } else {
    console.log("In userId! Try another one");
  }
};

const main = async () => {
  await create();

  await addUser(user2);
  

  await read();
};

main();
