import { cleanEnv, str } from "envalid";

const validEnv = cleanEnv(process.env, {
  AIRTABLE_TOKEN: str(),
  AIRTABLE_BASE_ID: str(),
});

export default validEnv;
