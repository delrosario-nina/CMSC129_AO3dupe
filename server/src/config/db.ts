import mongoose, { Connection, Model } from "mongoose";
import { StorySchema } from "../models/story";
import { LibrarySchema } from "../models/library";

export let primaryDB: Connection;
export let backupDB: Connection;

// Models - initialized after connections are established
export let Story: Model<any>;
export let Library: Model<any>;

// Backup connection models (may be undefined if you never use them)
export let BackupStory: Model<any>;
export let BackupLibrary: Model<any>;

/**
 * Utility for callers that want to operate against the backup database.
 * `connectDB` will initialise these when the connection succeeds.
 */
export const getBackupModels = () => ({
  Story: BackupStory,
  Library: BackupLibrary,
});
const connectionOptions = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  maxPoolSize: 10,
  minPoolSize: 2,
};

export const connectDB = async () => {
  const primaryURI = process.env.MONGODB_URI;
  const backupURI  = process.env.MONGODB_BACKUP_URI;

  if (!primaryURI) throw new Error("MONGODB_URI is not set");
  if (!backupURI)  throw new Error("MONGODB_BACKUP_URI is not set");

  try {
    // Primary connection
    const primaryConn = await mongoose.createConnection(primaryURI, connectionOptions).asPromise();
    primaryDB = primaryConn;
    console.log("✓ Primary DB connected");

    // Backup connection
    const backupConn = await mongoose.createConnection(backupURI, connectionOptions).asPromise();
    backupDB = backupConn;
    console.log("✓ Backup DB connected");

    // Initialize models on primary connection
    Story = primaryDB.model("Story", StorySchema);
    Library = primaryDB.model("Library", LibrarySchema);

    // Also register schemas on the backup connection so they can be used if needed
    // (backupDB can be undefined until this point, but we're inside try after connection)
    BackupStory = backupDB.model("Story", StorySchema);
    BackupLibrary = backupDB.model("Library", LibrarySchema);
  } catch (error) {
    console.error("✗ Database connection failed:", error instanceof Error ? error.message : error);
    throw error;
  }
};