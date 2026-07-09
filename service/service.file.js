import fs from "fs/promises";

//A function that read the data from the json file:
export async function readFromJson(path) {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error(err.message)
        throw err
    };
};

//A function that writes the data to a json file:

export async function writeToJson(path, data) {
    try {
        await fs.writeFile(path, JSON.stringify(data), "utf-8");
    } catch (err) {
        console.error(err.message);
        throw err;
    };
}