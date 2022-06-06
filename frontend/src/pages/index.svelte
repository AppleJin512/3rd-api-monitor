<script lang="ts">
  import axios from "axios";
  import { baseURL } from "../services/Constants";
  import { onMount } from "svelte";
  import { ProgressLinear } from "svelte-materialify";
  import dayjs from "dayjs";

  let endpointList = [];
  let timestamp;
  let endpointStability;
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
          endpointStability = res.data.stability;
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
        {#each endpoint.urls as {health, responseTime, url}}
          <ol class="flex items-center">
            {#if endpointStability[url] === 0}
              <img
                src="/logos/status-green.svg"
                alt="health"
                class="w-5 h-5 mr-2"
              />
            {:else if endpointStability[url] <= 50}
              <img
                src="/logos/status-yellow.svg"
                alt="health"
                class="w-5 h-5 mr-2"
              />
            {:else if endpointStability[url] > 50}
              <img
                src="/logos/status-red.svg"
                alt="health"
                class="w-5 h-5 mr-2"
              />
            {/if}
            <img
                src="/images/icon-{health ? 'green' : 'red'}.svg"
                alt="health"
                class="w-6 h-6 mr-4"
              />
            <a href={url} class="underline cursor-pointer" target="_blank">{url}</a>
          </ol>
          <ol class="flex items-center">            
            <span class="w-14 h-4 mr-4 text-xs"></span>   
            {#if responseTime === -1}
              <ProgressLinear class="h-4" color="red" value={0} buffer={0} stream></ProgressLinear>                
            {:else if responseTime < 1000}
              <ProgressLinear class="h-4" color="green" value={responseTime / 200} buffer={responseTime / 200} stream></ProgressLinear>           
            {:else if (responseTime >= 1000) && (responseTime < 5000)}
              <ProgressLinear class="h-4" color="yellow" value={responseTime / 200} buffer={responseTime / 200} stream></ProgressLinear>           
            {:else if responseTime >= 5000}
              <ProgressLinear class="h-4" color="red" value={responseTime / 200} buffer={responseTime / 200} stream></ProgressLinear>           
            {/if}
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
