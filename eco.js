import mongoose from "mongoose";
import { econ } from "./schemas.js";

let daily = 0;
let weekly = 0;
let job = 0;
let daily_enabled = false;
let weekly_enabled = false;
let job_enabled = false;

export const eco = {
  /**
   * Connect to MongoDB database
   * @param {String} url
   */
  async register(url) {
    try {
      await mongoose.connect(url);
      console.log("Connected to MongoDB database");
    } catch (error) {
      console.error("Error connecting to MongoDB database", error);
    }
  },

  /**
   * Checks the status of the MongoDB connection
   * @returns {Promise<String>}
   *
   */

  async status() {
    if (mongoose.connection.readyState === 1) {
      return "Connected to MongoDB database";
    } else {
      return "Not connected to MongoDB database";
    }
  },

  /**
   *
   * @param {Number} daily The daily eco claim
   * @param {Number} weekly The weekly eco claim
   * @param {Number} job The job eco claim
   * @param {Boolean} daily_enabled The daily eco claim status
   * @param {Boolean} weekly_enabled The weekly eco claim status
   * @param {Boolean} job_enabled The job eco claim status
   */
  async configure({
    daily,
    weekly,
    job,
    daily_enabled,
    weekly_enabled,
    job_enabled,
  }) {
    if (daily) this.daily = daily;
    if (weekly) this.weekly = weekly;
    if (job) this.job = job;
    if (daily_enabled) this.daily_enabled = daily_enabled;
    if (weekly_enabled) this.weekly_enabled = weekly_enabled;
    if (job_enabled) this.job_enabled = job_enabled;
  },

  /**
   * Claim a user's eco
   * @param {*} user 
   * @param {*} type
   * @returns {true | false} Returns true if the user's eco was claimed, false if not
   */
  async claimEco({ user, type }) {
    if (!user.Number || !user.String) return false; 
    const data = await econ.findOne({ user_id: user }); 
    if (!data) { 
        const newData = new econ({ user_id: user, cash: 0, bank: 0, last_daily: new Date(), last_weekly: new Date(), last_job: new Date() }); 
        await newData.save(); 
    }
    if (type === "daily" && this.daily_enabled) {
      if (data.last_daily.getTime() + 86400000 < Date.now()) {
        data.last_daily = new Date();
        data.cash += this.daily;
        await data.save();
        return true;
      } else {
        return false;
      }
    }
    if (type === "weekly" && this.weekly_enabled) {
      if (data.last_weekly.getTime() + 604800000 < Date.now()) {
        data.last_weekly = new Date();
        data.cash += this.weekly;
        await data.save();
        return true;
      } else {
        return false;
      }
    }
    if (type === "job" && this.job_enabled) {
      if (data.last_job.getTime() + 3600000 < Date.now()) {
        data.last_job = new Date();
        data.cash += this.job;
        await data.save();
        return true;
      } else {
        return false;
      }
    }

  },
};
