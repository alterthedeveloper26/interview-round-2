export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "C2 Resource CRUD API",
    version: "1.0.0",
    description: "Express + TypeScript CRUD API with Prisma persistence."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server"
    }
  ],
  tags: [
    { name: "Health" },
    { name: "Resources" }
  ],
  components: {
    schemas: {
      Resource: {
        type: "object",
        properties: {
          id: { type: "string", example: "cmabc1234def5678ghi9012jk" },
          name: { type: "string", example: "My Resource" },
          description: { type: "string", nullable: true, example: "Optional description" },
          status: { type: "string", enum: ["active", "inactive"], example: "active" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "name", "status", "createdAt", "updatedAt"]
      },
      CreateResourceRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "My Resource" },
          description: { type: "string", example: "Optional description" },
          status: { type: "string", enum: ["active", "inactive"], example: "active" }
        },
        required: ["name"]
      },
      UpdateResourceRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "Updated Name" },
          description: { type: "string", example: "Updated description" },
          status: { type: "string", enum: ["active", "inactive"], example: "inactive" }
        }
      },
      ListResourcesResponse: {
        type: "object",
        properties: {
          total: { type: "number", example: 1 },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/Resource" }
          }
        },
        required: ["total", "items"]
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string", example: "Validation failed." }
        },
        required: ["error"]
      }
    }
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/resources": {
      get: {
        tags: ["Resources"],
        summary: "List resources",
        parameters: [
          { name: "status", in: "query", schema: { type: "string", enum: ["active", "inactive"] } },
          { name: "searchTerm", in: "query", schema: { type: "string" } }
        ],
        responses: {
          "200": {
            description: "Resource list",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ListResourcesResponse" }
              }
            }
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      post: {
        tags: ["Resources"],
        summary: "Create resource",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateResourceRequest" }
            }
          }
        },
        responses: {
          "201": {
            description: "Created resource",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resource" }
              }
            }
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/resources/{id}": {
      get: {
        tags: ["Resources"],
        summary: "Get resource by id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "Resource found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resource" }
              }
            }
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      put: {
        tags: ["Resources"],
        summary: "Update resource",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateResourceRequest" }
            }
          }
        },
        responses: {
          "200": {
            description: "Updated resource",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resource" }
              }
            }
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Resources"],
        summary: "Delete resource",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "204": {
            description: "Deleted successfully"
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    }
  }
} as const;
