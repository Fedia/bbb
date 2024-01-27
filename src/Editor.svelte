<script>
  import { basicSetup, EditorView } from "codemirror";
  import { javascript } from "@codemirror/lang-javascript";

  export let value = "";
  export let view;

  let parent;

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      value = update.state.doc.toString();
    }
  });

  $: if (parent && !view) {
    view = new EditorView({
      doc: value,
      extensions: [basicSetup, javascript(), updateListener],
      parent,
    });
  }
</script>

<div class="editor" bind:this={parent} />

<style>
  .editor :global(.cm-editor) {
    outline: none;
  }
  .editor :global(.cm-gutters) {
    background: transparent;
    border: 0;
  }
</style>
