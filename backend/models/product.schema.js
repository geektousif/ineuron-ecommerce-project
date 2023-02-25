import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxLength: [120, "Too big name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    description: {
      type: String,
      // TODO: use some form of editor
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },

    // TODO: Extra work : rating [{}], rating_avg
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
