import { Schema } from "mongoose";

export const LibrarySchema = new Schema(
  {
    storyId: { type: Schema.Types.ObjectId, ref: "Story", required: true },
  },
  { timestamps: true }
);

// Prevent duplicate libraries for the same story
LibrarySchema.index({ storyId: 1 }, { unique: true });




