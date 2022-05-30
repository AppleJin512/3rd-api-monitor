<script lang="ts">
  import axios from "axios";
  import { baseURL } from "../services/Constants";
  import { onMount } from "svelte";
  let endpointList = [];
  onMount(() => {
    endpointList = [];
    axios
      .get(baseURL)
      .then((res) => {
        if (res.data) {
          endpointList = res.data;
        }
      })
      .catch((err) => console.log(err));
  });
</script>

<div class="w-2/3 mx-auto py-10">
  {#each endpointList as endpoint}
    <h2 class="font-bold my-2 text-xl">{endpoint.name}</h2>
    <ul>
      {#each endpoint.urls as item}
        <ol class="flex items-center mb-2">
          <img
            src="/images/icon-{item.health ? 'green' : 'red'}.svg"
            alt="health"
            class="w-6 h-6 mr-4"
          />
          <a href={item.url} class="underline cursor-pointer" target="_blank"
            >{item.url}</a
          >
        </ol>
      {/each}
    </ul>
  {/each}
</div>
