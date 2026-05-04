import { Resource } from "../types";
import { prisma } from "../lib/prisma";
import { ListResourcesQueryDto } from "../dto/list-resources-query.dto";

type ResourceRecord = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

function toDomain(record: ResourceRecord): Resource {
  return {
    id: record.id,
    name: record.name,
    description: record.description ?? undefined,
    status: record.status === "inactive" ? "inactive" : "active",
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString()
  };
}

export class ResourceRepository {
  async findAll(filters?: ListResourcesQueryDto): Promise<Resource[]> {
    const rows = await prisma.resource.findMany({
      where: {
        ...(filters?.status ? { status: filters.status } : {}),
        ...(filters?.searchTerm
          ? {
              OR: [
                {
                  name: {
                    contains: filters.searchTerm
                  }
                },
                {
                  description: {
                    contains: filters.searchTerm
                  }
                }
              ]
            }
          : {})
      },
      orderBy: { createdAt: "desc" }
    });
    return rows.map(toDomain);
  }

  async findById(id: string): Promise<Resource | undefined> {
    const row = await prisma.resource.findUnique({ where: { id } });
    return row ? toDomain(row) : undefined;
  }

  async create(resource: Omit<Resource, "id" | "createdAt" | "updatedAt">): Promise<Resource> {
    const created = await prisma.resource.create({
      data: {
        name: resource.name,
        description: resource.description,
        status: resource.status
      }
    });
    return toDomain(created);
  }

  async update(id: string, updates: Partial<Pick<Resource, "name" | "description" | "status">>): Promise<Resource> {
    const updated = await prisma.resource.update({
      where: { id },
      data: updates
    });
    return toDomain(updated);
  }

  async deleteById(id: string): Promise<boolean> {
    const found = await prisma.resource.findUnique({ where: { id } });
    if (!found) {
      return false;
    }
    await prisma.resource.delete({ where: { id } });
    return true;
  }
}
