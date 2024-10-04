import { cleanEnv, str } from "envalid";

const validEnv = cleanEnv(process.env, {
  AIRTABLE_TOKEN: str(),
  AIRTABLE_BASE_ID: str(),
  DROPBOX_APP_KEY: str(),
  DROPBOX_APP_SECRET: str(),
  DROPBOX_ACCESS_TOKEN: str(),
});

export default validEnv;
