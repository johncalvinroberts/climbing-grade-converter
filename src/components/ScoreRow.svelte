<style>
.score-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.score-row-item {
  flex: 1;
}

.hidden {
  opacity: 0;
}
.emphasized {
  background-color: pink;
}
</style>

<script lang="ts">
import { allDifficultiesOfAllSystems } from "../lib/constants";

export let score: number;
const row = allDifficultiesOfAllSystems[score];
const rowItems = row ? Object.entries(row) : [];
</script>

<div class="score-row">
  {#each rowItems as [_, item]}
    <div
      class="score-row-item"
      class:hidden="{!item.exists}"
      class:emphasized="{item.emphasized}">
      {item.value} <small>({score})</small>
    </div>
  {/each}
</div>
