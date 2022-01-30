<!--本vue参考CodeMirror component for Vue3, from github-->
<template>
  <Codemirror
    ref="codemirrorJS"
    :value="code"
    :options="cmOptions"
    border
    placeholder="test placeholder"
    :height="550"
    @change="codeChange"
  />
</template>

<script>
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/dracula.css";

//代码补全提示
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';



import { ref } from "vue";
export default {
  components: { Codemirror },
  setup() {
    const code = ref(`//可使用ctrl获取代码提示。\rconsole.log("Hello World");`);

    return {
      code,
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "dracula", // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
        hintOptions: {
          completeSingle: false
        },
        extraKeys: {"Ctrl": "autocomplete"},
      },
    };
  },
  methods: {
    codeChange() {
      // console.log("askj")
      // this.codemirrorJS.showHint();
    }
  }
};
</script>

<style>
.CodeMirror-code {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>