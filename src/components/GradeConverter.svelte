<style>
input {
  width: 100%;
  background-color: var(--input-bg);
  border: none;
  border-radius: 0.5rem;
  font-size: 10rem;
  line-height: 0;
  padding: 1rem;
  color: var(--text-color-contrast);
  text-align: center;
}
input::placeholder {
  font-size: 2rem;
}
input:focus {
  outline: var(--border);
}
.converter-input-box {
  max-width: 500px;
  width: 100%;
  padding: 10px 0;
}

.mode-selector {
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grade-list {
  display: grid;
}
</style>

<script lang="ts">
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
import { onMount } from "svelte";
import type { Grade, Match, GradeScaleType, Tuple } from "../lib/types";
``;

let inputValue = "";
let jumpToList = false;

const allGradeScales: [GradeScale, GradeScaleType][] = [
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

let inputElement: HTMLInputElement;
const blankArray = Array.from({ length: 100 }, (_, index) => {
  return index;
});

// this should just be for the list of all grades
const allDifficultiesOfAllSystems: Record<string, Grade>[] = [];
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

$: matches = allGradeScales.reduce((memo, gradeScale) => {
  const [scale, type] = gradeScale;
  const score = scale.getScore(inputValue);
  if (score !== -1) {
    const massagedScore =
      typeof score === "number"
        ? score
        : (score.map((item) => Math.floor(item)) as Tuple);
    const formattedScore = scale.getGrade(massagedScore);
    memo.push({ scale: scale.displayName, score, type, formattedScore });
  }
  return memo;
}, [] as Match[]);

const handleViewWholeList = () => {
  jumpToList = true;
  inputValue = "";
};

const handleInput = () => (jumpToList = false);

// focus input element on mount
onMount(() => {
  const handleWindowFocus = () => {
    if (inputElement) {
      inputElement.focus();
    }
  };
  handleWindowFocus();

  window.addEventListener("focus", handleWindowFocus);

  return () => {
    window.removeEventListener("focus", handleWindowFocus);
  };
});
</script>

<div class="converter-input-box">
  <input
    bind:value="{inputValue}"
    bind:this="{inputElement}"
    placeholder="Enter any climbing grade"
    on:input="{handleInput}" />
</div>

{#if inputValue}
  <div class="grade-list">
    {#each matches as match}
      <div>{match.scale}: {match.formattedScore}</div>
    {/each}
  </div>
{/if}

{#if jumpToList}
  <div>all difficulties here</div>
{/if}

<div class="mode-selector">
  {#if !inputValue && !jumpToList}
    <button on:click="{handleViewWholeList}">
      Select a grade from a list instead?
    </button>
  {/if}
</div>
