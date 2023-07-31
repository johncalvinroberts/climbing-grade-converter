<style>
.score-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.score-cell {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  border: solid 1px var(--border);
  border-bottom-width: 0;
  border-right-width: 0;
  max-width: 120px;
  flex: 0 0 70px;
  overflow: hidden;
}

.score-cell:last-child {
  border-right-width: 1px;
}

.score-row:last-child .score-cell {
  border-bottom-width: 1px;
}

.emphasized {
  background-color: pink;
}
</style>

<script lang="ts">
import { createEventDispatcher } from "svelte";

import { allGradeScales } from "../lib/constants";
import type { Match } from "../lib/types";
import type GradeScale from "@openbeta/sandbag/dist/GradeScale";
import type { Tuple } from "@openbeta/sandbag/dist/GradeScale";

export let match: Match;
export let suppressEmphasis = false;

const dispatch = createEventDispatcher();

const [score, system] = match;

const handleSelect = (score: number | Tuple, scale: GradeScale) => {
  const gradeStringValue = scale.getGrade(score);
  dispatch("select", gradeStringValue);
};
</script>

<div class="score-row">
  {#each allGradeScales as [scale]}
    <button
      class="score-cell"
      class:emphasized="{system === scale.name && !suppressEmphasis}"
      on:click="{() => handleSelect(score, scale)}">
      <small>{scale.getGrade(score)}</small>
    </button>
  {/each}
</div>
