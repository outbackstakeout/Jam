const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
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
        socket_id: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Jam", jamSchema);
