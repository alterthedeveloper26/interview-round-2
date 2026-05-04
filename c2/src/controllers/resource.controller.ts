import { Request, Response } from "express";
import { CreateResourceDto } from "../dto/create-resource.dto";
import { ListResourcesQueryDto } from "../dto/list-resources-query.dto";
import { UpdateResourceDto } from "../dto/update-resource.dto";
import { ResourceService } from "../services/resource.service";

export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const resource = await this.resourceService.create(req.body as CreateResourceDto);
    res.status(201).json(resource);
  };

  list = async (req: Request, res: Response): Promise<void> => {
    const result = await this.resourceService.list(req.query as unknown as ListResourcesQueryDto);
    res.status(200).json(result);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const resource = await this.resourceService.getById(req.params.id);
    res.status(200).json(resource);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const resource = await this.resourceService.update(req.params.id, req.body as UpdateResourceDto);
    res.status(200).json(resource);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    await this.resourceService.delete(req.params.id);
    res.status(204).send();
  };
}
