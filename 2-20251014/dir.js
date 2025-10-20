// const fs = require("fs");

// if (!fs.existsSync("./new")) {
//   fs.mkdir("./new", (err) => {
//     if (err) throw err;
//     console.log("Directory created");
//   });
// }

// if (fs.existsSync("./new")) {
//   fs.rmdir("./new", (err) => {
//     if (err) throw err;
//     console.log("Directory removed");
//   });
// }

const fs = require("fs").promises;
async function manageDirectory() {
  const dirName = "./new";

  try {
    await fs.access(dirName);
    console.log(`Directory '${dirName}' already exists.`);
    await fs.rmdir(dirName);
    console.log(`Directory '${dirName}' removed.`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`Directory '${dirName}' does not exist, creating it.`);
    } else {
      throw error;
    }
  }

  try {
    await fs.mkdir(dirName);
    console.log(`Directory '${dirName}' created.`);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(
        `Directory '${dirName}' already exists (was created by another process or previous run).`
      );
    } else {
      console.error(
        "An error occurred during directory creation/removal:",
        error
      );
    }
  }
}

manageDirectory();
