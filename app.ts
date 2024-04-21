import inquirer from "inquirer";

let condition = true;
let students: any[] = [];
let total = 0;

const schoolManagementSystem = async () => {
  while (condition) {
    const ques = await inquirer.prompt([
      {
        message: "Hello What would you like to do",
        type: "list",
        name: "allOptions",
        choices: ["Enroll", "Delete", "Display details", "Exit"],
        default: "false",
      },
    ]);

    if (ques.allOptions === "Enroll") {
      const enroll = await inquirer.prompt([
        { message: "Enter your Name", type: "name", name: "name" },
        { message: "Enter your age", type: "number", name: "age" },
      ]);
      let StuName = enroll.name;
      if (students.some((student) => student.name === StuName.toLowerCase()) && students.some( stu => stu.age === enroll.age)) {
        console.log("Student already exists");
      } else if (isNaN(enroll.age) || enroll.name === "") {
        console.log("Please enter a valid name and age");
        condition = false;
      } else {
        students.push({ name: StuName.toLowerCase(), age: enroll.age });
        total++;
      }
    } else if (ques.allOptions === "Display details") {
      if (students.length === 0) {
        console.log("No students enrolled yet.");
      } else {
        console.log(`Enrolled students:`);
        students.forEach((student, index) => {
          console.log(`Student ${index + 1}:`);
          console.log(`Name: ${student.name.toUpperCase()}`);
          console.log(`Age: ${student.age}`);
        });
      }
    } else if (ques.allOptions === "Delete") {
      const deleteStudent = await inquirer.prompt([
        {
          message: "Enter the name of the student you want to delete",
          type: "name",
          name: "delete",
        },
      ]);
      if (students.some((student) => student.name === deleteStudent.delete)) {
        const index = students.findIndex(
          (student) => student.name === deleteStudent.delete
        );
        students.splice(index, 1);
        total--;
      } else {
        console.log("Student not found.");
      }
    } else if (ques.allOptions === "Exit") {
      condition = false;
    }
  }
  console.log(`The total students in our school is ${total}`);
};

schoolManagementSystem();
