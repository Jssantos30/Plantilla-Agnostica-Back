import mongoose, { Schema, model } from "mongoose";

interface record {
  point_name: string;
  zone_id: any;
  name_zone: string;
  id_watchman: any;
  date: string;
  time_date: string;
  name_watchman: string;
  document_watchman: string;
}

const record_schema = new Schema<record>({
  point_name: {
    type: String,
    required: true,
  },
  zone_id: {
    type: mongoose.Types.ObjectId,
    ref: "zone",
    required: true,
  },
  name_zone: {
    type: String,
    required: true,
  },
  id_watchman: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time_date: {
    type: String,
    required: true,
  },
  name_watchman: {
    type: String,
    required: true,
  },
  document_watchman: {
    type: String,
    required: true,
  },
});

export const record_model = model<record>("record", record_schema);
