import Airtable, { FieldSet, Records } from "airtable";
import validEnv from "../env";

interface AirtableRecordFields {
  "Show Name": string;
}

const base = new Airtable({ apiKey: validEnv.AIRTABLE_TOKEN }).base(
  validEnv.AIRTABLE_BASE_ID
);

export async function fetchAirtableData(
  tableName: string
): Promise<AirtableRecordFields[]> {
  const records: Records<FieldSet> = await base(tableName).select().firstPage();
  return records.map(
    (record) => record.fields as unknown as AirtableRecordFields
  );
}
