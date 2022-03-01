import React from "react";
import ReactDOM from "react-dom";
import  "./index.css"
import ReactMarkdown from 'https://cdn.skypack.dev/react-markdown@7?min'
import remarkGfm from "https://cdn.skypack.dev/remark-gfm@3?min";
import rehypeRaw from "https://cdn.skypack.dev/rehype-raw@6?min";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: placeHolder
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }
    render() {
        return (
            <div>
                <Editor input={this.state.input} handleChange={this.handleChange} />
                <Preview input={this.state.input} />
            </div>
        );
    }
}

class Editor extends React.Component {

    render() {
        return (
            <div className="editor">
                <textarea
                    id="editor"
                    value={this.props.input}
                    onChange={this.props.handleChange}
                ></textarea>
            </div>
        );
    }
}

class Preview extends React.Component {

    render() {
        return (
            <div id="preview" className="preview">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    children={this.props.input}
                />
            </div>
        );
    }
}
const placeHolder = `# A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.
👉 Changes are re-rendered as you type.
> dsdada
👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins

## Table of contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
This section is replaced by an actual table of contents.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
import React from "https://cdn.skypack.dev/react"
import ReactDOM from "https://cdn.skypack.dev/react-dom"
import ReactMarkdown from "https://cdn.skypack.dev/react-markdown"
import rehypeHighlight from "https://cdn.skypack.dev/rehype-highlight"

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
import React from "https://cdn.skypack.dev/react"
import ReactDOM from "https://cdn.skypack.dev/react-dom"
import ReactMarkdown from "https://cdn.skypack.dev/react-markdown"
import MyFancyRule from './components/my-fancy-rule.js'

ReactDOM.render(
  <ReactMarkdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr: ({node, ...props}) => <MyFancyRule {...props} />
    }}
  >
    # Your markdown here
  </ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/) `;

ReactDOM.render(<App />, document.getElementById("app"));