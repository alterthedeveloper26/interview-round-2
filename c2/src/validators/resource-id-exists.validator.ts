import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { prisma } from "../lib/prisma";

@ValidatorConstraint({ name: "ResourceIdExists", async: true })
class ResourceIdExistsConstraint implements ValidatorConstraintInterface {
  async validate(id: unknown): Promise<boolean> {
    if (typeof id !== "string" || id.length === 0) {
      return false;
    }

    const resource = await prisma.resource.findUnique({
      where: { id },
      select: { id: true }
    });

    return Boolean(resource);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Resource with id '${String(args.value)}' does not exist.`;
  }
}

export function IsResourceIdExists(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ResourceIdExistsConstraint
    });
  };
}
