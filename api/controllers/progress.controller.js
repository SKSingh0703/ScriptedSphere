import Progress from '../models/progress.model.js';
import { errorHandler } from '../utils/error.js';

export const updateProgress = async (req, res, next) => {
    try {
        const { postId, completed } = req.body;
        const userId = req.user.id;

        if (!postId) {
            return next(errorHandler(400, 'Post ID is required'));
        }

        // Find existing progress or create new one
        let progress = await Progress.findOne({ userId, postId });
        
        if (progress) {
            // Update existing progress
            progress.completed = completed;
            progress.completedAt = completed ? new Date() : null;
            await progress.save();
        } else {
            // Create new progress record
            progress = new Progress({
                userId,
                postId,
                completed,
                completedAt: completed ? new Date() : null
            });
            await progress.save();
        }

        res.status(200).json({
            success: true,
            message: 'Progress updated successfully',
            progress
        });
    } catch (error) {
        next(error);
    }
};

export const getProgress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const progress = await Progress.find({ userId });
        
        // Convert to object with postId as key for easier lookup
        const progressMap = {};
        progress.forEach(p => {
            progressMap[p.postId] = {
                completed: p.completed,
                completedAt: p.completedAt
            };
        });

        res.status(200).json({
            success: true,
            progress: progressMap
        });
    } catch (error) {
        next(error);
    }
};

export const getProgressStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        // Get all progress records for the user
        const allProgress = await Progress.find({ userId });
        const completedProgress = allProgress.filter(p => p.completed).length;
        
        // Note: We don't calculate total here as it should come from the frontend
        // based on the actual number of problems available
        
        res.status(200).json({
            success: true,
            stats: {
                completed: completedProgress
            }
        });
    } catch (error) {
        next(error);
    }
};
