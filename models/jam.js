const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jamSchema = new Schema(
    {
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        jar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jar",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Jam", jamSchema);
