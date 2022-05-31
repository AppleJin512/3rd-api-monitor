<script lang="ts">
  import axios from "axios";
  import { baseURL } from "../services/Constants";
  import { onMount } from "svelte";
  import dayjs from "dayjs";

  let endpointList = [];
  let timestamp;
  let loading = false;
  onMount(() => {
    getEndPointList();
  });

  const refresh = () => {
    getEndPointList();
  };

  const getEndPointList = () => {
    loading = true;
    endpointList = [];
    axios
      .get(baseURL)
      .then((res) => {
        if (res.data && res.data.health) {
          endpointList = res.data.health;
        }
        timestamp = res.data.timestamp;
        loading = false;
      })
      .catch((err) => {
        console.log(err);
        loading = false;
      });
  };
</script>

<div class="w-2/3 mx-auto py-10">
  {#if loading}
    <div
      class="loading w-8 h-8 border-2 border-green-700 loading-div mx-auto"
    />
  {:else if endpointList.length === 0}
    <div class="nodata">
      <div class="text-center text-2xl font-bold">No service!</div>
      <div
        class="text-center font-bold cursor-pointer underline mt-10"
        on:click={refresh}
      >
        Refresh
      </div>
    </div>
  {:else}
    <div class="flex justify-between items-center">
      <div>{dayjs(timestamp).format("MM/DD/YYYY, HH:mmA")}</div>
      <div
        class="text-center font-bold cursor-pointer underline"
        on:click={refresh}
      >
        Refresh
      </div>
    </div>
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
  {/if}
</div>

<style global>
  @-webkit-keyframes loadingmove {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(359deg);
    }
  }

  .loading {
    border-radius: 50%;
    animation: loadingmove 1.2s linear infinite;
    -webkit-animation: loadingmove 1.2s linear infinite;
    border-bottom: 3px solid transparent;
  }

  .loading-div {
    margin-top: calc((100vh - 32px) / 2);
  }

  .nodata {
    margin-top: calc((100vh - 132px) / 2);
  }
</style>
