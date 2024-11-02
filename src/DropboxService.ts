import { Dropbox, users, files } from "dropbox";

export class DropboxService {
  private dbx: Dropbox;

  constructor(accessToken: string) {
    this.dbx = new Dropbox({ accessToken });
  }

  async verifyConnection(): Promise<boolean> {
    try {
      const response = await this.dbx.usersGetCurrentAccount();
      const accountInfo: users.FullAccount = response.result;

      console.log("Connected to Dropbox as:", accountInfo.name.display_name);
      return true;
    } catch (error) {
      if (typeof error === "object" && error !== null && "error" in error) {
        const dropboxError = error as {
          status?: number;
          error: {
            error: { [".tag"]?: string };
            error_summary?: string;
          };
        };

        // Check for specific error cases, e.g., invalid access token
        if (dropboxError.error?.error[".tag"] === "invalid_access_token") {
          console.error("Invalid access token. Please verify your token.");
          return false; // Explicitly return false for invalid token
        }
      } else {
        console.error("Error verifying Dropbox connection:", error);
      }

      // Return false for all other errors
      return false;
    }
  }

  async createFolder(folderPath: string): Promise<boolean> {
    try {
      if (!folderPath.startsWith("/")) {
        folderPath = `/${folderPath}`;
      }
      const res = await this.dbx.filesCreateFolderV2({ path: folderPath });
      console.log("Folder created:", res.result.metadata.path_display);
      return true;
    } catch (error) {
      console.error("Error creating folder:", error);
      return false;
    }
  }
}
