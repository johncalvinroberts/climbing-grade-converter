import {
  French,
  YosemiteDecimal,
  AI,
  Aid,
  Ewbank,
  Font,
  Norwegian,
  Saxon,
  UIAA,
  VScale,
  WI,
} from "@openbeta/sandbag";
import type GradeScale from "@openbeta/sandbag/dist/GradeScale";
import type { Grade, GradeScaleType } from "../lib/types";

export const COLOR_SCHEME_KEY = "🍆";

export const allGradeScales: [GradeScale, GradeScaleType][] = [
  [Font, "boulder"],
  [VScale, "boulder"],
  [YosemiteDecimal, "free-climbing"],
  [French, "free-climbing"],
  [Ewbank, "free-climbing"],
  [Saxon, "free-climbing"],
  [Norwegian, "free-climbing"],
  [UIAA, "free-climbing"],
  [Aid, "aid"],
  [AI, "ice"],
  [WI, "ice"],
];

export const blankArray = Array.from({ length: 100 }, (_, index) => {
  return index;
});

// this should just be for the list of all grades
export const allDifficultiesOfAllSystems: Record<string, Grade>[] = [];
for (const index of blankArray) {
  const previousItem = allDifficultiesOfAllSystems[index - 1];
  const item = allGradeScales.reduce((memo, gradeScale) => {
    const [scale, type] = gradeScale;
    const value = scale.getGrade(index);
    let exists = true;
    if (previousItem && value) {
      exists = previousItem?.[scale.displayName]?.value === value;
    }

    return { ...memo, [scale.displayName]: { value, exists, type } };
  }, {});
  allDifficultiesOfAllSystems.push(item);
}
