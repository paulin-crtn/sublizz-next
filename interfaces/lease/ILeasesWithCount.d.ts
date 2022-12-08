import { ILeaseImage } from "./ILeaseImage";
import { ICityCoordinates } from "./ICityCoordinates";

export interface ILeasesWithCount {
  totalCount: number;
  leases: (Lease & {
    leaseImages: ILeaseImage[];
  })[];
  cityCoordinates?: ICityCoordinates;
}
