<script>
  import { runBot } from "./bot.js";
  import Editor from "./Editor.svelte";

  const STORAGE_KEY = "__bbb_src";

  let editorValue = sessionStorage[STORAGE_KEY] || "";
  $: sessionStorage[STORAGE_KEY] = editorValue;

  let running = false;
  let errMsg = null;

  async function run() {
    if (!editorValue.trim()) return;
    errMsg = null;
    running = true;
    try {
      await runBot(editorValue);
    } catch (e) {
      console.error(e);
      // <anonymous>:3:1
      const m = e.stack.match(/anonymous\>\:(\d+)\:(\d+)/);
      errMsg = m ? m[1] - 2 + ":" + m[2] : "?:?";
    }
    running = false;
  }
</script>

<div class="main">
  <div class="menu">
    <button on:click={run} disabled={running}
      >▶ {#if running}Running{:else}Run{/if}</button
    >
    {#if errMsg}
      <div class="err">Error at {errMsg} - see console</div>
    {/if}
  </div>
  <!--textarea class="editor" bind:value={editorValue} spellcheck="false" placeholder="Javascript here"></textarea-->
  <div class="editor">
    <Editor bind:value={editorValue}></Editor>
  </div>
</div>

<style>
  .main {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-flow: column;
    background: #eee;
    font: 16px sans-serif;
  }
  /*
  textarea.editor {
    display: block;
    padding: 0.6em;
    height: 100%;
    outline: none;
    resize: none;
    border: 0;
    background: transparent;
    font: 1em monospace;
  }
*/
  .editor {
    height: 100%;
    overflow: auto;
  }

  .menu {
    background: #ddd;
    display: flex;
    color: #444;
    align-items: center;
  }

  .menu button {
    margin: 0.4em;
    border: 0;
    border-radius: 6px;
    font: inherit;
    padding: 0.4em 0.6em;
    cursor: pointer;
    background: transparent;
  }
  .menu button:hover {
    background: #ccc;
  }
  .menu button:active {
    background: #bbb;
  }
  .menu button:disabled {
    opacity: 0.6;
  }

  .err {
    padding: 0.4;
    border-radius: 6px;
    padding: 0.4em 0.6em;
    background: pink;
    font-size: 80%;
  }
</style>
