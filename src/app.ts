// app.ts or main.ts

import validEnv from "../env";
import { DropboxService } from "./DropboxService";

async function initialiseApp() {
  const accessToken = validEnv.DROPBOX_ACCESS_TOKEN;
  const dropboxService = new DropboxService(accessToken);

  const isConnected = await dropboxService.verifyConnection();
  if (isConnected) {
    console.log("Connected to Dropbox successfully!");
    // Continue initializing other parts of your app...
  } else {
    console.error(
      "Dropbox connection failed. Check your access token and network."
    );
    process.exit(1); // Exit the app if Dropbox connection fails
  }
}

// Start the app
initialiseApp();
