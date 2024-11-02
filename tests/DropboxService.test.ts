import validEnv from "../env";
import { DropboxService } from "../src/DropboxService";
import { users } from "dropbox";

describe("DropboxService", () => {
  test("::verifyConnection should return true for a valid accesss token", async () => {
    const accessToken = validEnv.DROPBOX_ACCESS_TOKEN;
    const dropboxService = new DropboxService(accessToken);

    const isConnected = await dropboxService.verifyConnection();
    expect(isConnected).toBe(true);
  });

  test("::verifyConnection should return false for an invalid accesss token", async () => {
    const accessToken = "invalid token";
    const dropboxService = new DropboxService(accessToken);

    const isConnected = await dropboxService.verifyConnection();
    expect(isConnected).toBe(false);
  });
});
