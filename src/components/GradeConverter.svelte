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
  margin: 0 auto;
}

.mode-selector {
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grade-list {
  max-width: 100%;
  overflow-x: scroll;
  display: grid;
  padding-bottom: 50px;
  max-height: 50vh;
}

.header-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
}

.header-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  flex: 0 0 70px;
  word-break: break-word;
  font-size: 1rem;
  text-align: center;
  background-color: var(--bg-color);
  padding: 5px 0;
}

.select-button {
  border-radius: 0;
  background-color: var(--text-color);
  color: var(--bg-color);
  padding: 2px 10px;
  border: solid 1px var(--border);
  font-size: 1.2rem;
}
</style>

<script lang="ts">
import { onMount } from "svelte";
import { VScale } from "@openbeta/sandbag";
import type {
  GradeScalesTypes,
  Tuple,
} from "@openbeta/sandbag/dist/GradeScale";
import { allGradeScales, blankArray } from "../lib/constants";
import ScoreRow from "./ScoreRow.svelte";

type Match = [number | Tuple, GradeScalesTypes];

let inputValue = "";
let jumpToList = false;

let inputElement: HTMLInputElement;
let matchingScores: Match[] = [];

$: {
  if (inputValue) {
    const nextMatchingScores: Match[] = [];
    for (const [scale] of allGradeScales) {
      if (scale.isType(inputValue)) {
        const score = scale.getScore(inputValue);
        nextMatchingScores.push([score, scale.name]);
      }
    }
    matchingScores = nextMatchingScores;
  }
  if (jumpToList) {
    matchingScores = blankArray.map((score) => [score, VScale.name]);
  }
  if (!jumpToList && !inputValue) {
    matchingScores = [];
  }
}

const handleViewWholeList = () => {
  jumpToList = true;
  inputValue = "";
};

const handleInput = () => {
  jumpToList = false;
};

const handleSelectGrade = (event: CustomEvent) => {
  const nextValue = event.detail;
  inputValue = nextValue;
  jumpToList = false;
};

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

{#if matchingScores.length}
  <div class="grade-list">
    <div class="header-row">
      {#each allGradeScales as [scale]}
        <div class="header-cell">{scale.displayName}</div>
      {/each}
    </div>
    {#each matchingScores as match (match)}
      <ScoreRow
        match="{match}"
        suppressEmphasis="{jumpToList}"
        on:select="{handleSelectGrade}" />
    {/each}
  </div>
{/if}

<div class="mode-selector">
  {#if !inputValue && !jumpToList}
    <button on:click="{handleViewWholeList}" class="select-button">
      Select a grade from a list instead?
    </button>
  {/if}
</div>
