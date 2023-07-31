import type {
  GradeScalesTypes,
  Tuple,
} from "@openbeta/sandbag/dist/GradeScale";
export type Grade = {
  value: string;
  exists: boolean;
  emphasized: boolean;
  type: GradeScaleType;
};

export type GradeScaleType = "boulder" | "aid" | "free-climbing" | "ice";

export type Match = [number | Tuple, GradeScalesTypes];
