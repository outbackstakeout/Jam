const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        jams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Jam",
            },
        ],
        jars: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Jar",
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    }
);

userSchema.pre("save", async function (next) {
    // 'this' is the user document
    if (!this.isModified("password")) return next();
    // Replace the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model("User", userSchema);
