const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://waseem:${[password]}@cluster0.uue67g0.mongodb.net/recordsDB?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const name = process.argv[3];
const phone = process.argv[4];

const generateId = () => {
    let id = Math.round(Math.random() * 1000);
    console.log(id)
    return id;
}

const recoreSchema = mongoose.Schema({
    id: String,
    name: String,
    phone: Number
});


const Record = new mongoose.model("Record", recoreSchema);

if (process.argv.length === 3) {
    Record.find({}).then(result => {
        // console.log(result);
        console.log("phonebook:")
        result.map(e=>{
            console.log(`${e.name} ${e.phone}`);
        })
        mongoose.connection.close();
    })
} else {

    const record = new Record({
        id: generateId(),
        name: name,
        phone: phone
    });

    record.save().then(result => {
        console.log(`added ${name} number ${phone} to phonebook`);
        mongoose.connection.close();
    });
}



