import { config } from 'dotenv';
import { types, Indexes } from 'opperai';

config();

const indexes = new Indexes(process.env.OPPER_API_KEY);

// List all indexes
indexes.listIndexes()
    .then(response => console.log(response))
    .catch(error => console.error(error));

// Create index
// const myindex: types.IndexDescription = {
//     name: "my-index",
//     description: "An example index",
// };
// indexes.createIndex(myindex)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => console.error(error));

// Upload file to index
// indexes.uploadFileToIndex(667, "test.txt")
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
