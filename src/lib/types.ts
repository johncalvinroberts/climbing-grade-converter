export type Grade = {
  value: string;
  exists: boolean;
};

export type Tuple = [number, number];

export type GradeScaleType = "boulder" | "aid" | "free-climbing" | "ice";

export type Match = {
  score: Tuple | number;
  scale: string;
  type: GradeScaleType;
  formattedScore: string;
};
