import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

// Create compound index to ensure one progress record per user per post
progressSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
