import { z as zod } from "zod";

const FileAttachmentSchema = zod.object({
  id: zod.string(),
  width: zod.number(),
  height: zod.number(),
  url: zod.string().url(),
  filename: zod.string(),
  size: zod.number(),
  type: zod.string(),
  thumbnails: zod
    .object({
      small: zod
        .object({
          url: zod.string().url(),
          width: zod.number(),
          height: zod.number(),
        })
        .optional(),
      large: zod
        .object({
          url: zod.string().url(),
          width: zod.number(),
          height: zod.number(),
        })
        .optional(),
      full: zod
        .object({
          url: zod.string().url(),
          width: zod.number(),
          height: zod.number(),
        })
        .optional(),
    })
    .optional(),
});

export const AirtableRecordSchema = zod.object({
  "Show Name": zod.string().optional(),
  "Host Name": zod.string().optional(),
  "Show Location": zod.string().optional(),
  "Default Image File for your Show": zod
    .array(FileAttachmentSchema)
    .optional(),

  "Default Description of your Show": zod.string().optional(),
  "Email Address": zod.union([zod.string().email(), zod.string().optional()]),
  "Social Media Options": zod.array(zod.string()).optional(),
  "Notes / Comments": zod.string().optional(),
  "Show Name w/ Host Name + Show Location": zod.string().optional(),
  Show_ID_Threads: zod.string().optional(),
});

export type AirtableRecordFields = zod.infer<typeof AirtableRecordSchema>;
