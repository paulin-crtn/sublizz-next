import { LeaseTypeEnum } from "../enum/LeaseTypeEnum";

export const convertLeaseType = (leaseType: LeaseTypeEnum) => {
  switch (leaseType) {
    case LeaseTypeEnum.MOBILITY:
      return "Bail mobilité";

    case LeaseTypeEnum.STUDENT:
      return "Bail étudiant";

    case LeaseTypeEnum.SHARE:
      return "Colocation";

    case LeaseTypeEnum.SUBLEASE:
      return "Sous-location";

    default:
      return leaseType;
  }
};
