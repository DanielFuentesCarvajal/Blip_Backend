import Type from "../../util/TypeEnum";
import { Type as PrismaType } from "@prisma/client/wasm";

export class TypeMapper {
  static toPrismaType(type: Type): PrismaType {
    switch (type) {
      case Type.comment:
        return PrismaType.comment;
      case Type.post:
        return PrismaType.post;
    }
  }

  static toDomainType(type: PrismaType): Type {
    switch (type) {
      case PrismaType.comment:
        return Type.comment;
      case PrismaType.post:
        return Type.post;
    }
  }
}