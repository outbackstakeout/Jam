const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jarSchema = new Schema(
    {
        name: {
            type: String,
            default: "Fresh Jar",
            required: true,
        },
        jams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Jam",
            },
        ],
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Jar", jarSchema);
