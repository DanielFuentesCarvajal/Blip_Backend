import { status as PrismaStatus} from "@prisma/client/wasm";
import Status from "../../util/StatusEnum";

export class StatusMapper {
  static toPrismaStatus(status: Status): PrismaStatus {
    switch (status) {
      case Status.active:
        return PrismaStatus.active;
      case Status.deleted:
        return PrismaStatus.deleted;
    }
  }

  static toDomainStatus(status: PrismaStatus): Status {
    switch (status) {
      case PrismaStatus.active:
        return Status.active;
      case PrismaStatus.deleted:
        return Status.deleted;
    }
  }
}
