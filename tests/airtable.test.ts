import { fetchAirtableData } from "../src/airtable";

jest.mock("airtable", () => {
  const mockSelect = jest.fn().mockReturnValue({
    firstPage: jest
      .fn()
      .mockResolvedValue([
        { fields: { "Show Name": "Test Show 1" } },
        { fields: { "Show Name": "Test Show 2" } },
      ]),
  });

  const mockBase = jest.fn().mockReturnValue({
    select: mockSelect,
  });

  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      base: jest.fn().mockImplementation(() => mockBase),
    })),
  };
});

describe("fetchAirtableData", () => {
  it("should fetch data from Airtable and return the correct fields", async () => {
    const tableName = "Shows";
    const data = await fetchAirtableData(tableName);

    expect(data).toEqual([
      { "Show Name": "Test Show 1" },
      { "Show Name": "Test Show 2" },
    ]);
  });
});
