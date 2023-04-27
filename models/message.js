const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        jam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jam",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        text: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);
