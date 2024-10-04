import { Dropbox } from "dropbox";
import fetch from "node-fetch";
import validEnv from "../env";

describe("Dropbox Integration test", () => {
  let dbx: Dropbox;

  beforeAll(() => {
    dbx = new Dropbox({ accessToken: validEnv.DROPBOX_ACCESS_TOKEN, fetch });
  });

  it("should create a folder in Dropbox", async () => {
    const folderName = "/TestFolder";
    try {
      const response = await dbx.filesCreateFolderV2({ path: folderName });

      expect(response.result).toHaveProperty("metadata");
      expect(response.result.metadata).toHaveProperty("name", "TestFolder");
    } catch (error) {
      console.error("Error creating folder in Dropbox:", error);
      throw error; // Re-throw the error to fail the test
    }
  });
});
