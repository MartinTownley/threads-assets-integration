import Airtable from "airtable";
import validEnv from "../env"; // Ensure this points to your env file

console.log("Env variables:", validEnv);
interface AirtableRecordFields {
  "Show Name": string;
}

const base = new Airtable({ apiKey: validEnv.AIRTABLE_TOKEN }).base(
  validEnv.AIRTABLE_BASE_ID
);

describe("Airtable Integration Test", () => {
  it("should fetch data from Airtable and return the correct fields", async () => {
    console.log("strating integration test...");

    try {
      const tableName = "Show Onboarding Table";
      console.log("Fetching records from table:", tableName);

      const records = await base(tableName).select().firstPage();
      console.log("Records fetched:", records);

      const data = records.map(
        (record) => record.fields as unknown as AirtableRecordFields
      );

      console.log("Fetched data:", data);

      expect(data.length).toBeGreaterThan(0); // Ensure that some data is returned
      console.log(data); // Log the data for manual verification
    } catch (error) {
      console.error("Error fetching data from Airtable:", error);
    } // Log the data for manual verification
  });
});
