const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

// fs.readFile("./files/hello.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   // console.log(data.toString());  // .toString() is not needed, if "utf8" is used
//
//   console.log(data);
// });

fs.readFile(path.join(__dirname, "files", "hello.txt"), "utf8", (err, data) => {
  if (err) throw err;
  // console.log(data.toString());
  console.log(data);
});

// const infoWrite = "writeFile";
// fs.writeFile(
//   path.join(__dirname, "files", "writeFile.txt"),
//   infoWrite,
//   (err) => {
//     if (err) throw err;
//     console.log("writeFile completed.");

//     const infoAppend = "infoAppend";
//     fs.appendFile(
//       path.join(__dirname, "files", "appendFile.txt"),
//       infoAppend,
//       (err) => {
//         if (err) throw err;
//         console.log("appendFile completed.");
//       }
//     );
//   }
// );

// const infoWrite = "writeFile";
// fs.writeFile(path.join(__dirname, "files", "reply.txt"), infoWrite, (err) => {
//   if (err) throw err;
//   console.log("writeFile completed.");

//   const infoAppend = "\n\ninfoAppend";
//   fs.appendFile(
//     path.join(__dirname, "files", "reply.txt"),
//     infoAppend,
//     (err) => {
//       if (err) throw err;
//       console.log("appendFile completed.");

//       fs.rename(
//         path.join(__dirname, "files", "reply.txt"),
//         path.join(__dirname, "files", "newReply.txt"),
//         (err) => {
//           if (err) throw err;
//           console.log("rename completed.");
//         }
//       );
//     }
//   );
// });

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "hello.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseAppend.txt"),
      "\n\nappendFile"
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "promiseAppend.txt"),
      path.join(__dirname, "files", "promiseAppendRenamed.txt")
    );
  } catch (error) {
    console.error(error);
  }
};
fileOps();
