import { config } from 'dotenv';
import { types, Functions } from 'opperai';

config();

const functions = new Functions(process.env.OPPER_API_KEY);

// Get all functions
functions.getFunctions()
    .then(response => console.log(response))
    .catch(error => console.error(error));


// const newfunc: types.FunctionDescription = {
//     path: "joch/newtest",
//     description: "An example function",
//     instructions: "This function is for testing purposes only.",
// };

// let savedResponseId: number | undefined;

// Create a new function
// functions.createFunction(newfunc)
//     .then(response => {
//         console.log(response.id);
//         savedResponseId = response.id;
//     })
//     .catch(error => console.error(error));

// Get a function by path
// functions.getFunctionByPath(newfunc.path)
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => console.error(error));

// // Update function
// const updatefunc: types.FunctionDescription = {
//     path: "joch/newtest",
//     description: "An updated example function",
//     instructions: "This function is for testing purposes only.",
// };
// functions.updateFunction(savedResponseId, updatefunc)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));


// // Create or update a function
// functions.createOrUpdateFunction(updatefunc)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));

// Delete a function
// functions.deleteFunction(newfunc.path)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
