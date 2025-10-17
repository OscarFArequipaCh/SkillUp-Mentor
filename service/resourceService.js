import { ResourceRepository } from "../repositories/resourceRepository.js";
import { Resource } from "../models/resource.js";

export class ResourceService {
  constructor() {
    this.resourceRepository = new ResourceRepository();
  }
    async getAllResources() {
        return await this.resourceRepository.getAll();
    }
    async getResourceById(id) {
        return await this.resourceRepository.getById(id);
    }
    async createResource(resourceData) {
        const resource = new Resource(
            null,
            resourceData.title,
            resourceData.description,
            resourceData.url,
            resourceData.id_course
        );
        return await this.resourceRepository.create(resource);
    }
    async updateResource(id, resourceData) {
        const existingResource = await this.resourceRepository.getById(id);
        if (!existingResource) {
            throw new Error("Resource not found");
        }
        const updatedResource = new Resource(
            id,
            resourceData.title || existingResource.title,
            resourceData.description || existingResource.description,
            resourceData.url || existingResource.url,
            resourceData.id_course || existingResource.id_course
        );
        return await this.resourceRepository.update(id, updatedResource);
    }
    async deleteResource(id) {
        const existingResource = await this.resourceRepository.getById(id);
        if (!existingResource) {
            throw new Error("Recourse not found");
        }
        return await this.resourceRepository.delete(id);
    }
}