const { Schema, model } = require("mongoose");

//model definition
const tokenSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: { type: String, required: true },
    expireAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
});
tokenSchema.index(
    { expireAt: 1 },
    {
        expireAfterSeconds: parseInt(
            process.env.EMAIL_VERIFICATION_TOKEN_EXPIRATION
        ),
    }
);

const TokenEmailVerification = model("TokenEmailVerification", tokenSchema);

//sync index on startup to ensure token expirations happen
const syncIndexes = async () => {
    await TokenEmailVerification.syncIndexes();
};
syncIndexes();

module.exports = TokenEmailVerification;
