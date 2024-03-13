const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        designs: [{ type: Schema.Types.ObjectId, ref: 'designs', default: null }]
    },

    { timestamps: true }
);

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;
