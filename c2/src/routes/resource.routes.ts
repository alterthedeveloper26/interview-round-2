import { Router } from "express";
import { ResourceController } from "../controllers/resource.controller";
import { CreateResourceDto } from "../dto/create-resource.dto";
import { ListResourcesQueryDto } from "../dto/list-resources-query.dto";
import { ResourceIdParamDto } from "../dto/resource-id-param.dto";
import { UpdateResourceDto } from "../dto/update-resource.dto";
import { validateDto } from "../middleware/validation.middleware";
import { ResourceRepository } from "../repositories/resource.repository";
import { ResourceService } from "../services/resource.service";
import { asyncHandler } from "../utils/async-handler";

const repository = new ResourceRepository();
const service = new ResourceService(repository);
const controller = new ResourceController(service);

export const resourceRouter = Router();

resourceRouter.post("/", validateDto(CreateResourceDto, "body"), asyncHandler(controller.create));
resourceRouter.get("/", validateDto(ListResourcesQueryDto, "query"), asyncHandler(controller.list));
resourceRouter.get("/:id", validateDto(ResourceIdParamDto, "params"), asyncHandler(controller.getById));
resourceRouter.put(
  "/:id",
  validateDto(ResourceIdParamDto, "params"),
  validateDto(UpdateResourceDto, "body"),
  asyncHandler(controller.update)
);
resourceRouter.delete("/:id", validateDto(ResourceIdParamDto, "params"), asyncHandler(controller.delete));
