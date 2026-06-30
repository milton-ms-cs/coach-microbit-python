// Microbit Coach Extension
(async function(codioIDE, window) {

  // Allowed docs list (from tools/docs_index.json)
  const allowedDocs = [
    "https://microbit-micropython.readthedocs.io/en/v2-docs/",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/buttons.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/images.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/input_output.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/music.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/radio.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/microphone.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/microbit_micropython_api.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/microbit.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/button.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/display.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/accelerometer.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/compass.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/radio.html",
    "https://microbit-micropython.readthedocs.io/en/v2-docs/neopixel.html"
  ];

  const systemPrompt = `You are a friendly and helpful coding coach for students learning BBC micro:bit MicroPython.

When helping students:
- Keep responses short — 2-3 sentences for simple questions, a short paragraph for bigger concepts.
- Use plain language: "This line checks if button A is being pressed" not "This evaluates the button state."
- Be encouraging: "Great question!", "You're really close!", "Nice start!"
- Always look at the student's actual code (in <files> tags) before answering.
- Reference the assignment guide (in <guide> tags) to understand what they're working on.
- Base your advice on the official MicroPython docs. When relevant, mention which doc page has more info.

Allowed documentation sources:
${allowedDocs.join("\n")}

What you CAN do:
- Explain what an error message means in plain language.
- Point out bugs in their code and suggest specific fixes.
- Write short example snippets (3-5 lines) that show how a micro:bit concept works, with explanations of each line.
- Help them think through their logic step by step.
- Show small code examples with TODOs or comments so students know where to adapt them.

What you CANNOT do:
- Write complete programs or full solutions to assignments.
- Do their homework for them. If they ask, say: "I can't write that for you, but let me help you figure it out! What part are you stuck on?" Then outline 3-5 steps they can follow.
- Answer questions outside of course content.
- Make up micro:bit APIs that don't exist. If unsure, say so and point to the closest doc page.`;

  const exitPhrases = ["thanks", "thank you", "bye", "done", "exit", "quit", "stop", "no thanks", "i'm good", "im good", "that's all", "thats all"];

  // Collect .py files from workspace (supplement to context.files)
  async function collectPythonFiles() {
    let out = "";
    if (!codioIDE.workspace || !codioIDE.workspace.getFileTree) return out;

    try {
      const tree = await codioIDE.workspace.getFileTree();
      const files = findRelevantFiles(tree);

      for (const filePath of files) {
        try {
          const content = await codioIDE.workspace.readFile(filePath);
          const maxLen = 15000;

          if (content.length <= maxLen) {
            out += `\nFile: ${filePath}\n${content}\n`;
          } else {
            out += `\nFile: ${filePath} (truncated)\n${content.slice(0, maxLen)}\n...(truncated)\n`;
          }
        } catch (err) {
          // Silent
        }
      }
    } catch (err) {
      // Silent
    }

    return out;
  }

  function findRelevantFiles(node, path = "") {
    let out = [];
    if (!node.children) return out;

    for (const item of node.children) {
      const full = path ? `${path}/${item.name}` : item.name;

      if (item.type === "file") {
        const low = item.name.toLowerCase();
        if (!item.name.startsWith(".") && low.endsWith(".py")) {
          out.push(full);
        }
      } else if (item.type === "directory" && !item.name.startsWith(".")) {
        out = out.concat(findRelevantFiles(item, full));
      }
    }
    return out;
  }

  // Register the button in Codio
  codioIDE.coachBot.register("microbitHelp", "Microbit Coach", onPress);

  async function onPress() {
    let messages = [];

    const context = await codioIDE.coachBot.getContext();

    let initialInput;
    try {
      initialInput = await codioIDE.coachBot.input("What can I help you with?");
    } catch (e) {
      codioIDE.coachBot.showMenu();
      return;
    }

    // Build file context from context.files + workspace .py files
    let filesContent = "";
    if (context.files && context.files.length > 0) {
      filesContent = context.files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n');
    }

    // Supplement with workspace .py files (may catch files context.files misses)
    const workspacePy = await collectPythonFiles();
    if (workspacePy) {
      filesContent += (filesContent ? '\n\n' : '') + workspacePy;
    }

    if (!filesContent) {
      filesContent = "No files available.";
    }

    const guideContent = (context.guidesPage && context.guidesPage.content)
      ? context.guidesPage.content
      : "No guide available.";

    const initialUserPrompt = `Here are the student's files:
<files>
${filesContent}
</files>
Here is the assignment guide:
<guide>
${guideContent}
</guide>

The student says: ${initialInput}`;

    messages.push({ "role": "user", "content": initialUserPrompt });

    try {
      const result = await codioIDE.coachBot.ask({
        systemPrompt: systemPrompt,
        messages: messages
      }, { preventMenu: true });
      messages.push({ "role": "assistant", "content": result.result });
    } catch (e) {
      codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
      messages.pop();
    }

    while (true) {
      let input;
      try {
        input = await codioIDE.coachBot.input("What else can I help you with? (Say 'thanks' when you're done!)");
      } catch (e) {
        break;
      }

      const trimmedInput = input.trim().toLowerCase();
      if (exitPhrases.includes(trimmedInput)) {
        break;
      }

      messages.push({ "role": "user", "content": input });

      try {
        const result = await codioIDE.coachBot.ask({
          systemPrompt: systemPrompt,
          messages: messages
        }, { preventMenu: true });
        messages.push({ "role": "assistant", "content": result.result });
      } catch (e) {
        codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
        messages.pop();
        continue;
      }

      // Keep first message (with files + guide) + last 8 messages (4 exchanges)
      while (messages.length > 9) {
        messages.splice(1, 2); // drop the oldest assistant+user pair, keep messages[0] (context) intact
      }
    }

    codioIDE.coachBot.write("You're welcome! Happy coding with your micro:bit.");
    codioIDE.coachBot.showMenu();
  }

})(window.codioIDE, window);
