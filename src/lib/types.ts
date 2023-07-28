export type Grade = {
  value: string;
  exists: boolean;
  emphasized: boolean;
  type: GradeScaleType;
};

export type Tuple = [number, number];

export type GradeScaleType = "boulder" | "aid" | "free-climbing" | "ice";
