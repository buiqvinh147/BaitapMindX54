const fs = require("fs");

const student = {
  ID: 1,
  name: "nghia",
  age: 19,
  gender: "male",
  department: "History",
};

const student2 = {
  ID: 2,
  name: "hanh",
  age: 19,
  gender: "female",
  department: "History",
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
    write([student]);
    console.log(" created successful");
  } else {
    console.log(" existed successful");
  }
};

const check = async (studentId) => {
  const read = await fs.promises.read("./fs_CRUD.json", "utf8");

  let student = JSON.parse(read);

  for (let i = 0; i < student.length; i++) {
    if (student[i].ID === studentId) {
      return true;
    }
  }
};

const addStudent = async (data) => {
  try {
    const read = await fs.promises.read("./fs_CRUD.json", "utf8");

    let student = JSON.parse(read);

    let idList = student.map((e) => e.ID);

    if (idList.indexOf(data.ID) < 0) {
      student.push(data);
      write(student);
    } else {
      console.log("ID existed, try again!");
    }
  } catch (err) {
    throw err;
  }
};

const deleteStudent = async (studentId) => {
  const read = await fs.promises.read("./fs_CRUD.json", "utf8");

  if (await check(studentId)) {
    let student = JSON.parse(read);

    for (let i = 0; i < student.length; i++) {
      if (student[i].ID === studentId) {
        student.splice(student.indexOf(student[i]), 1);
      }
    }

    write(student);
  } else {
    console.log("In studentId! Try another one");
  }
};

const updateStudent = async (studentId, updateData) => {
  const read = await fs.promises.read("./fs_CRUD.json", "utf8");

  if (await check(studentId)) {
    let student = JSON.parse(read);

    for (let i = 0; i < student.length; i++) {
      if (student[i].ID === studentId) {
        student[i] = updateData;
      }
    }

    write(student);
  } else {
    console.log("In studentId! Try another one");
  }
};

const main = async () => {
  await create();

  await addStudent(student2);
  //   await updateStudent(2, student);

  await read();
};

main();