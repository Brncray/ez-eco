import { Schema, model } from "mongoose";


const ecoSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    cash: {
        type: Number,
        default: 0,
    },
    bank: {
        type: Number,
        default: 0,
    },
    last_daily: {
        type: Date,
        default: new Date(),
    },
    last_weekly: {
        type: Date,
        default: new Date(),
    },
    last_job: {
        type: Date,
        default: new Date(),
    },

});

export const econ = model("econ", ecoSchema);