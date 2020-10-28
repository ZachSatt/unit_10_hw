const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = [];

const manager = [
    {
        type: 'input',
        name: 'team',
        message: 'Welcome! Please enter a name for this team or project'
    },
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the Project Manager'
    },
    {
        type: 'input',
        name: 'managerId',
        message: `Enter the Manager's ID number`
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: `Enter the Manager's E-mail`
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: `Enter the manager's office number`
    },
]

function employees (){
    inquirer.prompt([
        {
            type:'list',
            name:'roles',
            message:`Select the role of the employee`,
            choices: ['Intern','Engineer']
        },
        {
            type:'input',
            name:'employeeName',
            message:'What is the employees name?'
        },
        {
            type:'input',
            name:'employeeId',
            message:'Please enter employees ID number'
        },
        {
            type:'input',
            name:'employeeEmail',
            message:'Enter employee E-mail'
        }
    ]).then((emprole) => {

        console.log(emprole)

        if(emprole.roles === 'Intern'){
            inquirer.prompt([
            {
            type:'input',
            name:'school',
            message:'Please enter the Interns school'
            },
            ]).then((empint) => {
                console.log(empint)
                const intern = new Intern(emprole.employeeName, emprole.employeeId, emprole.employeeEmail, empint.school);
                
                employees.push(intern);

                reprompt()
            })
        }else if(emprole.roles === 'Engineer'){
            inquirer.prompt([
            {
            type:'input',
            name:'github',
            message:'Please the Engineers github'
            },   
            ]).then((empeng) => {
                console.log(empeng)
                const engineer = new Engineer(emprole.employeeName, emprole.employeeId, emprole.employeeEmail, empeng.github)

                employees.push(engineer);

                reprompt()
            })
        }
        
    })
}

function reprompt() {
    inquirer.prompt([
        {
        type:'list',
        name:'add',
        message:'Would you like to add another employee?',
        choices:['yes', 'no']
        }   
    ]).then((addemp) => {
        if(addemp.add === 'yes'){
            employees()
        }else{
            console.log('all set!')

            console.log(employees)

            let renderTeam = render(employees)

            fs.writeFile(outputPath, renderTeam, (err)=>{
                if(err)throw error
            })
        }

    })
   
}

inquirer.prompt(manager).then((answers) => {

    console.log(answers)
    let boss = new Manager(answers.name, answers.managerId, answers.managerEmail, answers.managerOffice)

    
    
    employees.push(boss)

    console.log('Employee Info Only')
    employees()
    
})