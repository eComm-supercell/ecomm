export class AddressEntity {
  id: number;
  street?: string | null;
  cityId?: number | null;
  provinceId: number;
  latitude?: number | null;
  longitude?: number | null;
  buildingNo?: string | null;
  floorNo?: string | null;
  apartmentNo?: string | null;
  city?: {
    id: number;
    name: string;
  } | null;
  province: {
    id: number;
    name: string;
  };
}
