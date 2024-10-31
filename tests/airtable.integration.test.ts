import Airtable from "airtable";
import validEnv from "../env";
import {
  AirtableRecordSchema,
  AirtableRecordFields,
} from "../src/models/airtableRecordSchema";

//console.log("Env variables:", validEnv);

const base = new Airtable({ apiKey: validEnv.AIRTABLE_TOKEN }).base(
  validEnv.AIRTABLE_BASE_ID
);

describe("Airtable Integration Test", () => {
  it("should fetch data from Airtable and return the correct fields", async () => {
    console.log("starting integration test...");

    try {
      const tableName = "Show Onboarding Table";
      console.log("Fetching records from table:", tableName);

      const records = await base(tableName).select().firstPage();
      // console.log(
      //   "Image:",
      //   records[6].fields["Default Image File for your Show"]
      // );

      const data = records.map(
        (record) => record.fields as unknown as AirtableRecordFields
      );

      // console.log("Fetched data:", data);

      expect(data.length).toBeGreaterThan(0);

      data.forEach((record) => {
        const validationResult = AirtableRecordSchema.safeParse(record);
        if (!validationResult.success) {
          // console.error("Validation error:", validationResult.error);
        } else {
          // console.log("Validated record:", validationResult.data);
        }
      });
    } catch (error) {
      console.error("Error fetching data from Airtable:", error);
    } // Log the data for manual verification
  });
});
