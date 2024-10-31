import validEnv from "../env";
import { DropboxService } from "../src/DropboxService";
import { users } from "dropbox";

const accessToken = validEnv.DROPBOX_ACCESS_TOKEN;

describe("DropboxService", () => {
  let service: DropboxService;

  beforeAll(() => {
    service = new DropboxService(accessToken);
  });

  test("should get account info", async () => {
    const accountInfo: users.FullAccount = await service.getAccountInfo();
    expect(accountInfo).toHaveProperty("account_id");
    expect(accountInfo).toHaveProperty("name");
  });

  test("should create a folder", async () => {
    const folderPath = "/test-folder";
    const folderMetadata = await service.createFolder(folderPath);

    expect(folderMetadata).toHaveProperty("name", "test-folder");
    expect(folderMetadata).toHaveProperty(".tag", "folder");
  });
});
