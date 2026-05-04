import { CreateResourceDto } from "../dto/create-resource.dto";
import { ListResourcesQueryDto } from "../dto/list-resources-query.dto";
import { UpdateResourceDto } from "../dto/update-resource.dto";
import { HttpError } from "../errors/http-error";
import { ResourceRepository } from "../repositories/resource.repository";
import { Resource } from "../types";

export class ResourceService {
  constructor(private readonly repository: ResourceRepository) {}

  async create(input: CreateResourceDto): Promise<Resource> {
    return this.repository.create({
      name: input.name.trim(),
      description: input.description?.trim(),
      status: input.status ?? "active"
    });
  }

  async list(filters: ListResourcesQueryDto): Promise<{ total: number; items: Resource[] }> {
    const items = await this.repository.findAll(filters);

    return {
      total: items.length,
      items
    };
  }

  async getById(id: string): Promise<Resource> {
    const resource = await this.repository.findById(id);
    if (!resource) {
      throw new HttpError(404, "Resource not found.");
    }
    return resource;
  }

  async update(id: string, input: UpdateResourceDto): Promise<Resource> {
    const hasAnyField = input.name !== undefined || input.description !== undefined || input.status !== undefined;
    if (!hasAnyField) {
      throw new HttpError(400, "Provide at least one updatable field: name, description, status.");
    }

    const resource = await this.getById(id);
    const updates: Partial<Pick<Resource, "name" | "description" | "status">> = {};

    if (input.name !== undefined) {
      updates.name = input.name.trim();
    }
    if (input.description !== undefined) {
      updates.description = input.description.trim();
    }
    if (input.status !== undefined) {
      updates.status = input.status;
    }
    return this.repository.update(resource.id, updates);
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.deleteById(id);
    if (!deleted) {
      throw new HttpError(404, "Resource not found.");
    }
  }
}
