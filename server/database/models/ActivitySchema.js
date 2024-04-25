const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program', // Reference to the Program model
    },
  },
  {
    timestamps: true,
  },
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity
