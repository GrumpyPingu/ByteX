// const fs = require('fs')

// fs.readFile('./format.bx', 'utf8', (err, data) => {
//   if (err) throw err
//   console.log(data)
// }   )

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('format.bx');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // check if line contains '!BYTEX' or '<bx>' or '</bx>' or '<conf>' or '</conf>' or '<code>' or '</code>' or <execute>' or '</execute>'
    if (!(line.includes('!BYTEX') || line.includes('<bx>') || line.includes('</bx>') || line.includes('<code>') || line.includes('</code>') || line.includes('<execute>') || line.includes('</execute>'))) {
        //check if line includes '.print', if so, log the string in the parenthesis and remove the qoutation marks
        if (line.includes('.print')) {
            let string = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
            string = string.replace(/['"]+/g, '');
            console.log(string);
        }
        // check if line includes '.calc', if so, split the string at the spaces and store each argument as different integers
        if (line.includes('.calc')) {
            let string = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
            let stringArray = string.split(' ');
            let num1 = parseInt(stringArray[0]);
            let operator = stringArray[1];
            let num2 = parseInt(stringArray[2]);
            // check if operator is '+', '-', '*', '/', '%', '^', '&', '|', '<<', '>>', '>>>'
            if (operator === '+') {
                console.log(num1 + num2);
            } else if (operator === '-') {
                console.log(num1 - num2);
            } else if (operator === '*') {
                console.log(num1 * num2);
            } else if (operator === '/') {
                console.log(num1 / num2);
            } else if (operator === '%') {
                console.log(num1 % num2);
            } else if (operator === '^') {
                console.log(num1 ** num2);
            } else if (operator === '&') {
                console.log(num1 & num2);
            } else if (operator === '|') {
                console.log(num1 | num2);
            } else if (operator === '<<') {
                console.log(num1 << num2);
            } else if (operator === '>>') {
                console.log(num1 >> num2);
            } else if (operator === '>>>') {
                console.log(num1 >>> num2);
            }
        }
        // check if line includes '.find', if so, find the refrence to the string in the parenthesis and log the result to console
        // if (line.includes('.find')) {
        //     let string = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
        //     string = string.replace(/['"]+/g, '');
        //     console.log(string.indexOf(' '));
        // }
        
        
    }


    
    // if (!(line.includes('<bx>')))
    //     if (!(line.includes('!BYTEX'))) {
    //         console.log(line)

    //     }
    // console.log(`Line from file: ${line}`);
  }
}

processLineByLine();