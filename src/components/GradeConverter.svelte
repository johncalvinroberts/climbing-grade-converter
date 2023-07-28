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
import { onMount } from "svelte";
import { allGradeScales, blankArray } from "../lib/constants";
import ScoreRow from "./ScoreRow.svelte";
import type { Tuple } from "@openbeta/sandbag/dist/GradeScale";

let inputValue = "";
let jumpToList = false;

let inputElement: HTMLInputElement;
let matchingIndexes: (number | Tuple)[] = blankArray;

$: {
  if (inputValue) {
    const nextMatchingIndexes: (number | Tuple)[] = [];
    for (const [scale] of allGradeScales) {
      if (scale.isType(inputValue)) {
        const score = scale.getScore(inputValue);
        console.log({ score, inputValue });
        nextMatchingIndexes.push(score);
      }
    }
    matchingIndexes = nextMatchingIndexes;
  } else {
    matchingIndexes = blankArray;
  }
}

$: console.log({ matchingIndexes });

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
    {#each matchingIndexes as score}
      {#if typeof score === "number"}
        <ScoreRow score="{score}" />
      {:else}
        {#each score as subScore}
          <ScoreRow score="{subScore}" />
        {/each}
      {/if}
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
