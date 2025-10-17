import { RatingRepository } from "../repositories/ratingRepository.js";
import { Rating } from "../models/rating.js";

export class RatingService {
    constructor() {
        this.ratingRepository = new RatingRepository();
    }
    async getAllRatings() {
        return await this.ratingRepository.getAll();
    }
    async getRatingById(id) {
        return await this.ratingRepository.getById(id);
    }
    async createRating(ratingData) {
        const rating = new Rating(
            null,
            ratingData.score,
            ratingData.comment,
            ratingData.id_user,
            ratingData.id_course
        );
        return await this.ratingRepository.create(rating);
    }
    async updateRating(id, ratingData) {
        const existingRating = await this.ratingRepository.getById(id);
        if (!existingRating) {
            throw new Error("Rating not found");
        }
        const updatedRating = new Rating(
            id,
            ratingData.score || existingRating.score,
            ratingData.comment || existingRating.comment,
            ratingData.id_user || existingRating.id_user,
            ratingData.id_course || existingRating.id_course
        );
        return await this.ratingRepository.update(id, updatedRating);
    }
    async deleteRating(id) {
        const existingRating = await this.ratingRepository.getById(id);
        if (!existingRating) {
            throw new Error("Rating not found");
        }
        return await this.ratingRepository.delete(id);
    }
}