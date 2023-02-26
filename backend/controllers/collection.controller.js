import Collection from "../models/collection.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";

/**************************************
 * @CREATE_COLLECTION
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/collection
 * @description Create Collection
 * @parameters name
 * @return collection Object
 ****************************************/
export const createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError("Collection name required", 401);
  }

  const collection = await Collection.create({ name });
  res.status(200).json({
    success: true,
    message: "Collection created",
    collection,
  });
});

export const updateCollection = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;
  const { name } = req.body;
  if (!name) {
    throw new CustomError("Collection name required", 401);
  }
  let updatedCollection = await Collection.findByIdAndUpdate(
    collectionId,
    { name },
    { new: true, runValidators: true }
  );

  if (!updateCollection) {
    throw new CustomError("Collection not found", 400);
  }

  res.status(200).json({
    success: true,
    message: "Collected Updated successfully",
    updateCollection,
  });
});

export const deleteCollection = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;
  const { name } = req.body;

  let deletedCollection = await Collection.findByIdAndDelete(collectionId);

  if (!deletedCollection) {
    throw new CustomError("Collection not found", 400);
  }

  deletedCollection.remove()
  res.status(200).json({
    success: true,
    message: "Collected deleted successfully",
  });
});
