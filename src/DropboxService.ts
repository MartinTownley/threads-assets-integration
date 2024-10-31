import { Dropbox, users, files } from "dropbox";

export class DropboxService {
  private dbx: Dropbox;

  constructor(accessToken: string) {
    this.dbx = new Dropbox({ accessToken });
  }

  async getAccountInfo(): Promise<users.FullAccount> {
    const response = await this.dbx.usersGetCurrentAccount();
    return response.result;
  }

  async createFolder(path: string): Promise<files.FolderMetadata> {
    const response = await this.dbx.filesCreateFolderV2({ path });
    return response.result.metadata;
  }
}
