import inquirer from "inquirer";

let condition = true
let students: any[] = []
let total = 0

const schoolManagementSystem = async () => {
    while (condition) {
        const ques = await inquirer.prompt([
            { message: "Hello What would you like to do", type: "list", name: "allOptions", choices: ["Enroll", "Delete", "Display details", "Exit"], default: "false" },
        ])

        if (ques.allOptions === "Enroll") {
            const enroll = await inquirer.prompt([
                { message: "Enter your Name", type: "name", name: "name" },
                { message: "Enter your age", type: "number", name: "age" }
            ])
            if (students.some(student => student.name === enroll.name)) {
                console.log("Student already exists")
            } else if (enroll.age === undefined) {
                console.log("Age cannot be null")
                condition = false
            } else if (enroll.name === undefined) {
                console.log("Name cannot be null")
                condition = false
            } else {
                students.push({ name: enroll.name, age: enroll.age })
                total++
            }
        } else if (ques.allOptions === "Display details") {
            if (students.length === 0) {
                console.log("No students enrolled yet.")
            } else {
                console.log(students)
            }
        } else if (ques.allOptions === "Delete") {
            const deleteStudent = await inquirer.prompt([
                { message: "Enter the name of the student you want to delete", type: "name", name: "delete" }
            ])
            if (students.some(student => student.name === deleteStudent.delete)) {
                const index = students.findIndex(student => student.name === deleteStudent.delete);
                students.splice(index, 1);
                total--;
            } else {
                console.log("Student not found.");
            }

        }
        else if (ques.allOptions === "Exit") {
            condition = false
        }
    }
    console.log(`The total students in our school is ${total}`)
}

schoolManagementSystem()