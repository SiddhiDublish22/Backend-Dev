import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, default: false }
});


schema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});


schema.pre("findOneAndDelete", async function (next) {
  await this.model.updateOne(this.getQuery(), {
    isDeleted: true
  });
  next(new Error("Document soft-deleted"));
});

const Model = mongoose.model("Model", schema);