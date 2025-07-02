const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName:   { type: String, require: true },
    lastName:   { type: String, require: true },
    email: { type: String, unique: true, require: true },
    identificationNumber: { type: String, require: true },
    phoneNumber:{ type: Number, require: true },
    creationDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    id_owner: { type: String, require: true },
    client_location: { type: Schema.ObjectId, ref:"ClientLocation" },
    region: { type: String, require: true },
    identificationImage: { type: String,require: true },

});

module.exports = mongoose.model("Delivery", userSchema);
