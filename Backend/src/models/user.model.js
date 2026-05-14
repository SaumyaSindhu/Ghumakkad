import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    // follows international phone number format
    match: [
      /^\+[1-9]\d{1,14}$/,
      "Please enter a valid international phone number",
    ],
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    minlength: 6
  },
  role: {
    type: String,
    enum: ["traveler", "agency", "admin", "superadmin"],
    default: "traveler"
  },
  googleId: {
    type: String
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

const userModel = mongoose.model("user", userSchema);

export default userModel;

