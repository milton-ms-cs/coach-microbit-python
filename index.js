// Microbit Coach Extension
(async function(codioIDE, window) {

  const VERSION = "1.12.0";

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
- Keep responses short: 2-3 sentences for simple questions, a short paragraph for bigger concepts.
- Use plain language: "This line checks if button A is being pressed" not "This evaluates the button state."
- Be encouraging by naming one specific thing they did right ("Your if line reads button_a correctly."). Only say they're close when one small fix is left. Don't start every reply the same way.
- Always look at the student's actual code (in <files> tags) before answering.
- Reference the assignment guide (in <guide> tags) to understand what they're working on.
- Base your advice on the official MicroPython docs. When relevant, mention which doc page has more info.
- If the student sends only code, only a terminal line (like the run command), or only an error with no question: for an error, explain it as usual. For code or a terminal line with no error, ask one short question first: "What did you expect it to do, and what happened instead?" You may name one obvious syntax error in the same reply, but don't rewrite their logic until you know what they want.
- When fixing a problem in their code, prefer the tools the guide uses. Don't bring in new ideas (like lists or functions) to fix a bug unless the guide shows them or the student already uses them. You can still explain any micro:bit idea they ask about.

Allowed documentation sources:
${allowedDocs.join("\n")}

What you CAN do:
- Explain what an error message means in plain language.
- Point out bugs in their code and suggest fixes (on a find-the-bug assignment, follow the ladder in "Diagnosing" instead).
- Write short example snippets (3-5 lines) that show how a micro:bit concept works, with explanations of each line.
- Help them think through their logic step by step.
- Show small code examples with TODOs or comments so students know where to adapt them.

What you CANNOT do:
- Write complete programs or full solutions to assignments.
- Do their homework for them. If they ask, say in your own words that writing it is the part they're learning, ask what part they're stuck on, and give the next small step.
- Answer questions outside of course content (see "About this chat and about you" below).
- Make up micro:bit APIs that don't exist. If unsure, say so and point to the closest doc page.

## You always see their latest work

Before every reply you get a fresh copy of the student's files in <files>. Your earlier replies in this chat were written about an older version. When their files changed, their message starts with "(Note: the student's files have changed since your last reply.)"
- If a problem you pointed out earlier is gone, the student fixed it. Say so ("You fixed the colon on line 3, nice!"). Do NOT apologize or say you misread. You didn't.
- Only correct yourself if your earlier advice was wrong for the code it was about. Then say it once, plainly, give the right fix, and don't apologize again later.
- Never ask the student to paste their code. You can already see it.
- If their message and <files> disagree (they say they changed something you can't see, or an error mentions a line that is now fine), the file you see may be a little behind. Say what you see and ask them to save (Ctrl+S or Cmd+S) and run it again. Never insist their working code is broken.
- You see the project's .py files, and open tabs show the editor's latest version. If <files> marks a file as cut off, you only see its start. If it lists a file as not shown, you can't see it at all. Say so, and ask what they need help with in it. Don't guess at its contents. If <files> says the files couldn't be read, say you can't see their code right now and ask them to save and ask again.

## Diagnosing

**First, check the assignment.** If the assignment is about finding bugs (its name or guide says "Find the Bug", "bug hunt", "debug", "what's wrong", or similar), spotting the bug IS the lesson. Don't point straight at it. Use this ladder, one step per reply, and only go down a step after they've tried:
1. Ask which program/part they're on, and what they expected vs. what actually happens when they run it.
2. Point to WHERE to look (the part of the program), not WHAT is wrong.
3. Name the kind of thing involved (for example "the condition that decides when the loop stops"), still not the fix.
4. Only if they're still stuck: say what's wrong in one sentence and let them make the fix.
Never give fixes for more than one bug in a reply. If they say you're not helping, say sorry in a few words and give the next step of the ladder, not the answer.
On other assignments, be direct and specific, and point right at the problem:
- Error messages and tracebacks (NameError, SyntaxError, IndentationError, etc.): explain what the error is saying in plain English and point to the exact line.
- Typos in API names (e.g. button_a vs Button_A, display.scroll vs display.Scroll) or a wrong pin: point to the closest doc page if you're not sure of the exact one.
- A check like \`if answer == "yes" or "y":\` is always true, because "y" on its own counts as true. If you see it anywhere in their file, mention it briefly even if they asked about something else. Explain it; don't rewrite the line for them.

The rules in the next section say how much code to show.

## Short programs: one line can be the whole answer

Many tasks in this class are only a few lines, so one "small" line can be the entire step. Before you show any code, compare it with the task in the <guide>: if your snippet plus their code would finish the step, don't show it. Show the idea with different names and values instead, and let them write their own line. Keep snippets to 5 lines or fewer.

**Bugs in a line they already wrote: be direct.** Error messages, typos, a missing colon or bracket, = instead of ==, a wrong pin or button name: say what is wrong and point to the exact line. You may show the corrected version of a line THEY already wrote. This is for fixing their line, never for writing a line they haven't tried yet.

**The skills the lessons teach: they write them.** These are NOT small fixes:
  a condition that joins checks with and / or; which if/elif comes first; what goes inside the loop that keeps the program running; a counter or True/False flag that changes as the program runs; using a sensor reading (accelerometer, temperature, light level) in a condition; building the image or text that shows on the display.
For these, ask for their plan in words first, then show a parallel example with different names and values, or a template with blanks. Never write it with their own variable names and values filled in, and don't open with a numbered recipe: that recipe IS the answer.

**Design questions** ("How do I make the LEDs do X?", "How do I detect a shake?", "How do I send a radio message?"): ask a clarifying question first (what have they tried? what do they think the first step is?), then teach the concept and have them try it themselves. For "Make my project work", break it into the smallest first step ("Let's start with just reading button_a. What should happen when it's pressed?") and only help with that one step.

**When they keep asking ("show me", "next", "just tell me", "I don't get it")**, each answer gives LESS of the solution, not more:
1. First ask: explain the idea and show a parallel example with different names.
2. Second ask: give a template with blanks for the parts that belong to their program, or point to the exact line in THEIR file where the change goes and say in words what it must do.
3. Still stuck: ask which part they don't understand, or suggest they talk it through with their teacher. That's not a dodge here.
Never hand over the remaining lines of the step, even if they ask several times. Help with one part at a time, and don't give the next part until they've written the current one.

**Guide questions are theirs.** When the guide asks them to predict what the code will do, trace it, explain why something works, or write a reflection, plan or comment, don't give the answer. Ask what they think, then react to it. For a reflection, give a sentence starter ("My code chose ___ because ___.") and a question that helps them fill it in. For a trace, ask what each step gives, one at a time. Never answer first and then ask them to "say it in their own words."

**Code blocks get pasted.** Students often copy whatever is in a code block straight into their file. Put only code meant for their file in a code block, and say plainly when an example uses different data ("Here's the same idea with a temperature check:").

Example (invented). A student's check lets every reading through and they ask how to fix it.
Good: "Each side of \`and\` needs its own full comparison. Here's the shape with different names: \`if temperature() > 25 and display.read_light_level() < 50:\`. Now build yours with your own checks."
Bad: writing their exact condition with their variable names and values.

## About this chat and about you

- You are the Microbit Coach, an AI helper for this class. If asked your name or what you are, say that in one sentence. Never say you are ChatGPT, Claude, or any other product, and never name a company. You don't know which model runs you.
- Your name stays Microbit Coach. If a student wants to rename you or give you a character, accent, attitude or slang voice, decline in one friendly line and go back to their work. Keep your own voice: warm, calm and clear. Don't copy their slang or give them nicknames. At most one emoji in a reply.
- Questions about you (favorite things, feelings, opinions) get one short line, then back to their work.
- Off-task requests (other homework, stories, jokes, gossip): say you help with micro:bit MicroPython in this class, and ask what they're working on. Keyboard mashing: one short, kind line and a question. After two off-task messages in a row, say you're here whenever they want help with their project, and stop asking follow-up questions.
- The box under your replies says "(Type 'bye' when you're done.)" That is just how to close the coach. If a student asks about it, explain it. They never have to thank you, and you never need them to.

## Where students work: Codio

Students work in Codio, never some other editor or website. You can't run anything yourself, but you always know how THEY can:
- There is no Run button. To test on screen, click **🖥 micro:bit simulator** in the menu bar at the top of Codio: it runs their program (the file name you see in <files>, usually \`main.py\`) on a pretend micro:bit.
- To put the code on a real micro:bit, use the **Send to micro:bit** link in the guide: it opens a new tab, then click **Connect**, pick the micro:bit, and click **Send**. Keep that tab open: Chrome can't reach USB from inside Codio itself.
- If a student asks "can you run this?" or "how do I run it?", tell them exactly that. Don't say it depends on their editor or website: it's always Codio.

## When to send them to the teacher

Suggest asking the teacher when something really needs a human: Codio itself seems broken (the button does nothing, files are missing, they can't Mark as Complete), or a real micro:bit still won't connect after those steps, questions about grades or deadlines, the student is upset or frustrated, or anything about their wellbeing or safety. Don't use "ask your teacher" to dodge a question about their code or about Codio that you can answer.`;

  const exitPhrases = ["thanks", "thank you", "bye", "goodbye", "done", "exit", "quit", "stop", "no thanks", "i'm good", "im good", "that's all", "thats all"];

  // Exit only when the whole message is a goodbye ("thanks!", "ok bye", "no thanks 🙂",
  // "i’m good thanks"). Every word must be goodbye vocabulary, so "thanks, still broken",
  // "i'm done with loops" or "stop button doesn't work" keep the chat open. "stop"/"exit"/
  // "quit"/"done" alone still exit through the exact exitPhrases list.
  const goodbyeWords = ["thanks", "thank", "you", "thx", "ty", "bye", "goodbye", "cya", "no", "ok", "okay",
    "cool", "great", "alright", "all", "that's", "thats", "i'm", "im", "good", "done", "for", "now",
    "see", "ya", "later", "so", "much", "then", "very", "lot", "a"];
  const goodbyeCores = ["thanks", "thank", "thx", "ty", "bye", "goodbye", "cya"];
  const goodbyePhrases = ["i'm good", "im good", "i'm done", "im done", "that's all", "thats all", "see ya", "see you"];
  function isExitMessage(text) {
    if (typeof text !== "string") return false;
    if (text.indexOf("?") !== -1) return false;
    const norm = text.toLowerCase().replace(/[‘’]/g, "'").replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ").trim();
    if (!norm) return false;
    if (exitPhrases.includes(norm)) return true;
    const words = norm.split(" ");
    if (words.length > 6) return false;
    if (!words.every(function(w) { return goodbyeWords.indexOf(w) !== -1; })) return false;
    const padded = " " + norm + " ";
    return words.some(function(w) { return goodbyeCores.indexOf(w) !== -1; }) ||
      goodbyePhrases.some(function(p) { return padded.indexOf(" " + p + " ") !== -1; });
  }

  // Collect .py files via codioIDE.files (supplement to context.files, which
  // only lists files currently OPEN in the editor). codioIDE.workspace does
  // NOT exist in the Custom Assistant runtime: codioIDE.files is the
  // supported channel: https://codio.github.io/client/codioIDE.files.html
  // Returns { entries: [{path, text}], notShown: [paths] }. Entries are sorted later so
  // the files block (and its fingerprint) doesn't depend on read order.
  async function collectPythonFiles(skipPaths) {
    const entries = [];
    const notShown = [];
    const totalBudget = 40000;
    let used = 0;
    const F = codioIDE.files;
    if (!F || typeof F.getStructure !== "function" || typeof F.getContent !== "function") return { entries, notShown };

    let files = [];
    try {
      files = findRelevantFiles(await withTimeout(F.getStructure(), 8000, "structure"), "");
    } catch (err) {
      return { entries, notShown };
    }

    for (const filePath of files) {
      if (skipPaths && skipPaths.has(normalizePath(filePath))) continue;
      if (used >= totalBudget) { notShown.push(filePath); continue; }

      try {
        const content = await withTimeout(F.getContent(filePath), 8000, "read " + filePath);
        if (typeof content !== "string") { notShown.push(filePath); continue; }
        if (content.length === 0) {
          entries.push({ path: filePath, text: "(empty file)" });
          continue;
        }
        const maxLen = Math.min(15000, totalBudget - used);

        if (content.length <= maxLen) {
          entries.push({ path: filePath, text: content });
          used += content.length;
        } else {
          entries.push({ path: filePath, text: content.slice(0, maxLen) + `\n(cut off after ${maxLen} characters)` });
          used += maxLen;
        }
      } catch (err) {
        notShown.push(filePath);
      }
    }

    return { entries, notShown };
  }

  function normalizePath(p) {
    return String(p).replace(/^\.\//, "").replace(/^\//, "");
  }

  // getStructure() returns a name->value MAP: a file's value is a leaf (Codio
  // uses 1), a directory's value is a nested map; not an array of nodes.
  function findRelevantFiles(node, path) {
    let out = [];
    if (!node || typeof node !== "object") return out;

    for (const name in node) {
      if (!Object.prototype.hasOwnProperty.call(node, name)) continue;
      if (name.startsWith(".")) continue;
      const full = path ? `${path}/${name}` : name;
      const value = node[name];

      if (value && typeof value === "object") {
        out = out.concat(findRelevantFiles(value, full));
      } else if (name.toLowerCase().endsWith(".py")) {
        out.push(full);
      }
    }
    return out;
  }

  // Register the button in Codio
  codioIDE.coachBot.register("microbitHelp", "Microbit Coach", onPress);

  // Build the context-bearing first message from a fresh getContext() +
  // codioIDE.files read. Re-run before every ask() so the coach sees the
  // student's latest edits, not their code as of the button press.
  // The exact files block last sent to the model (between the <files> tags). Used
  // for the per-turn fingerprint and the "your files changed" note.
  let lastFilesBlock = "";

  async function buildContextMessage(initialInput, isRefresh) {
    let context = {};
    try {
      context = (await withTimeout(codioIDE.coachBot.getContext(), 8000, "getContext")) || {};
    } catch (e) {
      // On a refresh keep the previous context (the caller catches this); on the first
      // turn fall back to no open-tab files and no guide: the workspace read still runs.
      if (isRefresh) throw e;
      context = {};
    }

    // Open-tab files first; one whose content isn't a string is unreadable, so try
    // reading the same path through codioIDE.files.
    const entries = [];
    const notShown = [];
    const openPaths = new Set();
    for (const f of (context.files || [])) {
      if (!f || typeof f.path !== "string") continue;
      const openPath = normalizePath(f.path);
      if (openPaths.has(openPath)) continue; // same file listed twice
      openPaths.add(openPath);
      let text = f.content;
      if (typeof text !== "string") {
        text = null;
        try {
          if (codioIDE.files && typeof codioIDE.files.getContent === "function") {
            const got = await withTimeout(codioIDE.files.getContent(f.path), 8000, "read " + f.path);
            if (typeof got === "string") text = got;
          }
        } catch (e) {}
      }
      if (text === null) notShown.push(openPath);
      else entries.push({ path: openPath, text: text.length === 0 ? "(empty file)" : text });
    }

    // Supplement with project .py files (may catch files context.files misses)
    const workspace = await collectPythonFiles(openPaths);
    workspace.entries.forEach(function(e) { entries.push(e); });
    workspace.notShown.forEach(function(n) { notShown.push(n); });

    // Sort by path so tab switches or key order can't change the block (or its fingerprint).
    entries.sort(function(a, b) { return a.path < b.path ? -1 : (a.path > b.path ? 1 : 0); });
    let filesContent = entries.map(function(e) { return `File: ${e.path}\n${e.text}`; }).join("\n\n");
    if (notShown.length > 0) {
      filesContent += (filesContent ? "\n\n" : "") + `Not shown (too long to include, or couldn't be read): ${notShown.join(", ")}`;
    }

    if (!filesContent) {
      filesContent = "No files available.";
    }
    lastFilesBlock = filesContent;

    const guideContent = (context.guidesPage && context.guidesPage.content)
      ? context.guidesPage.content
      : "No guide available.";

    const assignmentName = (context.assignmentData && context.assignmentData.name)
      ? context.assignmentData.name
      : null;

    // On a refresh the first question is background only: the newest message is the last one in the chat.
    const studentLine = isRefresh
      ? `(The student's first question in this chat was: ${initialInput}. Their newest message is the last one below.)`
      : `The student says: ${initialInput}`;

    return `Here are the student's files (current as of their latest question):
<files>
${filesContent}
</files>
Here is the assignment guide:
<guide>
${guideContent}
</guide>
${assignmentName ? `\nAssignment: ${assignmentName}\n` : ''}
${studentLine}`;
  }

  // Used when the first context build throws: no files, so the coach still answers.
  function fallbackContextMessage(question) {
    return `Here are the student's files:
<files>
(I couldn't read the student's files just now.)
</files>

The student says: ${question}`;
  }

  // ============================================================
  // Session log — a hidden, shared workspace file (.coach-log.json) that every
  // coach appends to (one entry per session, tagged with `coach`), summarizing
  // how students use the coaches. Dot-prefixed so it never enters the LLM
  // context. Deliberately records the student's questions: Codio's own course
  // coach-log export logs only the userPrompt field, which is empty for
  // messages-based coaches like these — this file is where the questions live.
  // Sessions are never dropped (always appended). Logging is wrapped so it can
  // never break the coach.
  // ============================================================

  const SESSION_LOG_PATH = ".coach-log.json";
  const COACH_ID = "microbit";
  const MAX_LOGGED_QUESTIONS = 50;

  // Bound any files-API call so a hung deleteFiles/add/getContent can't stall the coach.
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function withTimeout(promise, ms, label) {
    let t;
    const timeout = new Promise((_, rej) => { t = setTimeout(() => rej(new Error("timeout: " + label)), ms); });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(t));
  }

  // Confirm a write really landed — Codio's deleteFiles()+add() overwrite can land
  // a 0-byte file while add() throws nothing (observed live Aug 2026: the shared
  // .coach-log.json was wiped to 0 bytes). Verify by length (tolerant of trailing-
  // newline normalization), not exact match.
  async function readbackOk(F, path, content) {
    if (typeof F.getContent !== "function") return true;
    try {
      const got = await withTimeout(F.getContent(path), 8000, "read " + path);
      return typeof got === "string" && got.length > 0 && got.length >= content.length - 4;
    } catch (e) {
      return false;
    }
  }

  // Write and VERIFY. add() can't overwrite, so an existing file needs
  // deleteFiles()+add — but that add can land empty if the delete hasn't settled,
  // so pause, re-add, read back, and retry. Never reports success on an empty write.
  async function addVerified(F, path, content) {
    try {
      await withTimeout(F.add(path, content), 8000, "add " + path);
      if (await readbackOk(F, path, content)) return true;
    } catch (e) {}
    if (typeof F.deleteFiles !== "function") return false;
    for (let attempt = 0; attempt < 5; attempt++) {
      try { await withTimeout(F.deleteFiles([path]), 8000, "del " + path); } catch (e) {}
      await delay(150 + attempt * 150);
      try { await withTimeout(F.add(path, content), 8000, "add " + path); } catch (e) {}
      if (await readbackOk(F, path, content)) return true;
      await delay(150);
    }
    return false;
  }

  // Returns the parsed history, [] when the file doesn't exist or is empty, or null when the
  // file exists but couldn't be read/parsed. null disables saving for this session so a
  // transient read failure can never overwrite (wipe) everyone's history.
  async function loadSessionHistory() {
    const F = codioIDE.files;
    if (!F || typeof F.getContent !== "function") return null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const text = await withTimeout(F.getContent(SESSION_LOG_PATH), 8000, "read log");
        if (typeof text !== "string" || !text.trim()) return [];
        const parsed = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : null;
      } catch (e) {
        await delay(300);
      }
    }
    // Both reads failed: only start fresh if the file really isn't there.
    try {
      if (typeof F.getStructure === "function") {
        const tree = await withTimeout(F.getStructure(), 8000, "structure");
        if (tree && typeof tree === "object" && Object.keys(tree).length > 0 && !(SESSION_LOG_PATH in tree)) return [];
      }
    } catch (e) {}
    return null;
  }

  async function saveSessionHistory(history) {
    const F = codioIDE.files;
    if (!F || typeof F.add !== "function") return;
    const text = JSON.stringify(history, null, 2);
    await addVerified(F, SESSION_LOG_PATH, text);
  }

  // Never block the conversation on a log write — shared pattern, see the coaches
  // CLAUDE.md "Session Logging". saveSessionHistory() is a full read-modify-rewrite
  // (deleteFiles + add) of the shared log; awaiting it in the turn loop means a
  // stalled write freezes the coach with no input box. queueSave() serializes
  // writes on a promise chain (overlapping fire-and-forget saves can't corrupt the
  // file) and is called WITHOUT await each turn; only the end-of-session flush is awaited.
  let saveChain = Promise.resolve();
  function queueSave(history) {
    saveChain = saveChain.then(function() { return saveSessionHistory(history); }).catch(function() {});
    return saveChain;
  }

  // ============================================================
  // Strict mode: a nudge toward trying first for students who lean on the coach.
  // Turned on from this workspace's own .coach-log.json history, never from a
  // list of students. It changes only the advice in STRICT_PROMPT; the coach still
  // helps on every question and never mentions a mode, limit or count. Thresholds
  // are here so the monthly review can tune them.
  // ============================================================
  const STRICT_WORKSPACE_QUESTIONS = 20; // questions logged in this workspace by this coach...
  const STRICT_WORKSPACE_DAYS = 14;      // ...in sessions that started within this many days
  const STRICT_SESSION_QUESTIONS = 10;   // questions in the current session
  const STRICT_RECENT_WINDOW = 8;        // look at the last N questions...
  const STRICT_RECENT_NEXT_STEP = 5;     // ...and turn on if this many are "next step" asks
  const STRICT_RELEASE_ATTEMPTS = 2;     // own attempts in a row that turn it off for the session

  const NEXT_STEP_PATTERNS = [
    /^(ok(ay)? )?(so )?(what'?s |what is )?(the )?next( step| part| one)?( please| pls)?$/,
    /^(ok(ay)? )?(and )?then what$/,
    /^(what goes |the )?next (line|bit)$/,
    /^what goes next$/,
    /^(keep going|continue|go on|more)( please| pls)?$/,
    /^(and|ok) (then|now)$/,
    /^(idk|i don'?t know|i dunno)( what to do| what to write)?$/,
    /\bshow me\b/,
    /\bwhat (do|should|can) i (write|type|put|add|do|drag|click|use)\b/,
    /\b(what|which) blocks? (do|should|can) i (use|add|drag|put|need)\b/,
    /^which blocks?$/,
    /\bwhat'?s the (code|answer)\b/,
    /\bwhat now\b/,
    /\bnow what\b/,
    /\bis (this|it|that|my code|mine) (right|correct|good|ok|okay)$/,
    /\bjust tell me\b/,
    /\b(give|write|tell) me the (code|answer|line|blocks?)\b/,
    /\b(can|could) you (just )?(write|code|do|make|finish) (it|this|that|the [a-z ]+|my [a-z ]+) for me\b/,
    /\bdo it for me\b/,
    /^(can (you|u) )?(just )?fix (it|this|that|my [a-z]+)( for me)?( please| pls)?$/,
    /^can (you|u) (just )?do it$/
  ];

  function normalizeAsk(text) {
    return String(text || "").toLowerCase().replace(/[‘’]/g, "'").replace(/[^a-z0-9' ?\n]+/g, " ").replace(/[ \t]+/g, " ").trim();
  }

  const CODE_WORDS = ["if", "elif", "else", "for", "in", "while", "def", "return", "and", "or", "not", "is", "import", "from", "as", "true", "false", "none", "pass", "break", "with", "class", "let", "const", "var", "function"];

  // A paste of code with no question, no error and no sentence of their own in it.
  // A non-code line with 3+ plain words (outside quotes and comments) counts as their own
  // words ("my plan: ask for a number", "it prints twice"), so it isn't a bare paste.
  function isBarePaste(text) {
    const s = String(text || "");
    if (s.length < 12 || s.indexOf("?") !== -1) return false;
    if (!/[=(){}\[\]:<>;]/.test(s)) return false; // no code characters: it's prose, not a paste
    if (/error|traceback|exception|\b(why|how|what|where|help|doesn'?t|isn'?t|won'?t|can'?t|stuck|wrong|broken|not|nothing|still|instead|but|working|tried|plan)\b/i.test(s)) return false;
    return !s.split("\n").some(function(line) {
      const bare = line.replace(/(["'])(?:(?!\1).)*\1/g, " ").replace(/(#|\/\/).*$/, " ");
      if (/[=(){}\[\]:<>;+*\/-]/.test(bare)) return false; // a code line
      const plain = bare.split(/\s+/).filter(function(w) { return /^[a-z]+[.,!]?$/i.test(w) && CODE_WORDS.indexOf(w.toLowerCase()) === -1; });
      return plain.length >= 3;
    });
  }

  function isNextStepPhrase(text) {
    const norm = normalizeAsk(text).replace(/\?/g, "").trim();
    if (!norm || norm.split(/\s+/).length > 10) return false;
    if (/error|traceback|\b(run|running|tried|try|plan)\b/.test(norm)) return false; // normal help
    return NEXT_STEP_PATTERNS.some(function(p) { return p.test(norm); });
  }

  function isNextStepAsk(text) {
    return isBarePaste(text) || isNextStepPhrase(text);
  }

  // The student is working on their own: they changed their files, or wrote a real
  // message (a plan, an explanation, a specific question) instead of a "next" ask.
  function isOwnAttempt(text, filesChanged) {
    if (isNextStepPhrase(text)) return false;
    if (filesChanged) return true; // they edited their work (a paste after an edit counts)
    if (isBarePaste(text)) return false;
    return normalizeAsk(text).split(/\s+/).filter(Boolean).length >= 6;
  }

  // Returns the threshold that fired ("workspace", "session" or "next-steps"), or null.
  function strictTrigger(history, session) {
    let workspaceCount = 0;
    let recent = [];
    for (let i = 0; i < history.length; i++) {
      const s = history[i];
      if (!s || typeof s !== "object" || s.coach !== COACH_ID) continue; // this coach's sessions only
      const qs = Array.isArray(s.questions) ? s.questions : [];
      const startedMs = Date.parse(s.started);
      if (s !== session && !(startedMs > Date.now() - STRICT_WORKSPACE_DAYS * 86400000)) continue; // old or undated
      workspaceCount += (typeof s.exchanges === "number" && s.exchanges >= qs.length) ? s.exchanges : qs.length;
      recent = recent.concat(qs.filter(function(q) { return typeof q === "string"; }));
    }
    if (workspaceCount >= STRICT_WORKSPACE_QUESTIONS) return "workspace";
    if ((session.exchanges || 0) >= STRICT_SESSION_QUESTIONS) return "session";
    const last = recent.slice(-STRICT_RECENT_WINDOW);
    if (last.filter(isNextStepAsk).length >= STRICT_RECENT_NEXT_STEP) return "next-steps";
    return null;
  }

  // Call once per question, after recordTurn() (so `history` includes this session and
  // this question). Updates the session's log fields; the next queued save carries them.
  function updateStrict(state, history, session, latestText, filesChanged) {
    if (state.released) return state; // off for the rest of this session
    if (state.on) {
      state.attemptStreak = isOwnAttempt(latestText, filesChanged) ? state.attemptStreak + 1 : 0;
      if (state.attemptStreak >= STRICT_RELEASE_ATTEMPTS) {
        state.on = false;
        state.released = true;
        session.strictReleased = true;
      }
      return state;
    }
    const reason = strictTrigger(history, session);
    if (reason) {
      state.on = true;
      state.reason = reason;
      state.attemptStreak = 0;
      session.strict = true;
      session.strictReason = reason;
    }
    return state;
  }

  const STRICT_PROMPT = `

## Right now: help this student try first

This student has been leaning on you for the next step. Stay warm and keep helping with every question, but nudge them to try first.
- Same as always: explain what an error message means and which line it points to, explain an idea, give a short example with different names or data, point out a typo or missing punctuation, and help them find a block, menu or button, and tell them how to run their work.
- For "what do I write", "next" or "show me" questions, first ask one short question back ("What do you think the next step is?" or "What did you try?") and wait for their answer. If they answer with a real attempt, even a wrong one, help as usual from there.
- Don't write the lesson's main step in their own work (their condition, their loop, their counter, their blocks). Show the pattern with different names and let them adapt it. If they ask twice for that step, give a parallel example, not their finished line. Fixing a typo or missing punctuation in a line they already wrote is still fine.
- After about three "next step" asks in a row, suggest they run what they have and see what happens, or ask them to explain their plan in one sentence.
- If they've been stuck on the same thing for three or more turns, kindly suggest their teacher, for example: "This one might be easier to sort out with your teacher. If you're in class, ask them now. If you're working at home, send them a message about where you're stuck." That's a suggestion, never a refusal. Keep helping too.
- Never mention a mode, a limit or how many questions they've asked, and never refuse. You're a coach who wants them to try first.`;

  // Short, stable fingerprint of the files block the model sees (FNV-1a, 8 hex chars).
  // Logged per turn so a later review can tell "student fixed it" from "coach saw stale files".
  function fingerprint(text) {
    const s = String(text || "");
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return { len: s.length, hash: ("0000000" + h.toString(16)).slice(-8) };
  }

  async function onPress() {
    codioIDE.coachBot.write(
      `Microbit Coach v${VERSION} - Ask me your micro:bit questions!`,
      codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT
    );

    let messages = [];

    let initialInput;
    while (true) {
      try {
        initialInput = await codioIDE.coachBot.input("What can I help you with?");
      } catch (e) {
        codioIDE.coachBot.showMenu();
        return;
      }

      if ((initialInput || "").trim().toLowerCase() === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      // A blank message is ignored.
      if (!(initialInput || "").trim()) continue;

      // The very first message can already be a goodbye: no ask(), no log session.
      if (isExitMessage(initialInput)) {
        codioIDE.coachBot.write("Okay, bye! Come back any time you want help.");
        codioIDE.coachBot.showMenu();
        return;
      }

      break;
    }

    let sessionHistory = await loadSessionHistory();
    const logEnabled = sessionHistory !== null;
    if (!logEnabled) sessionHistory = [];
    const session = {
      coach: COACH_ID,
      started: new Date().toISOString(),
      updated: null,
      ended: null,
      coachVersion: VERSION,
      exchanges: 0,
      questions: [],
      contextFingerprints: [],
      strict: false,
      strictReason: null,
      strictReleased: false
    };
    const strictState = { on: false, reason: null, released: false, attemptStreak: 0 };
    sessionHistory.push(session);

    async function recordTurn(question) {
      session.exchanges += 1;
      if (session.questions.length < MAX_LOGGED_QUESTIONS) {
        session.questions.push(String(question).slice(0, 300));
      }
      session.updated = new Date().toISOString();
      if (logEnabled) queueSave(sessionHistory); // fire-and-forget: never block the input loop on a log write
    }

    // Hash of the files block at the last turn that got a real answer. Kept in its own
    // variable (not read back from the capped contextFingerprints array).
    let lastAnsweredHash = null;
    let pendingHash = null;

    // Fingerprint of the files block the model sees this turn; "changed" is true when it
    // differs from the last answered turn's. Returns changed.
    function recordFingerprint(refreshFailed) {
      let entry;
      let changed = false;
      if (refreshFailed) {
        pendingHash = null;
        entry = { len: null, hash: null, changed: false, refreshFailed: true };
      } else {
        const fp = fingerprint(lastFilesBlock);
        pendingHash = fp.hash;
        changed = lastAnsweredHash !== null && fp.hash !== lastAnsweredHash;
        entry = { len: fp.len, hash: fp.hash, changed: changed };
      }
      if (session.contextFingerprints.length < MAX_LOGGED_QUESTIONS) session.contextFingerprints.push(entry);
      return changed;
    }

    // Run one ask(); returns true if a real reply was added to the history.
    async function askAndRecord() {
      try {
        codioIDE.coachBot.showThinkingAnimation();
        const result = await codioIDE.coachBot.ask({
          systemPrompt: strictState.on ? systemPrompt + STRICT_PROMPT : systemPrompt,
          messages: messages
        }, { preventMenu: true });
        const reply = (result && typeof result.result === "string") ? result.result : "";
        if (!reply.trim()) {
          // Never keep an empty assistant turn: an empty message in the history can make every
          // later ask() fail too (seen live: one session got 10 empty replies in a row).
          session.failedReplies = (session.failedReplies || 0) + 1;
          codioIDE.coachBot.write("Hmm, I didn't get an answer that time. Please ask again!");
          messages.pop();          // drop the user turn that got no answer
          return false;
        }
        messages.push({ "role": "assistant", "content": reply });
        if (pendingHash !== null) lastAnsweredHash = pendingHash;
        return true;
      } catch (e) {
        session.failedReplies = (session.failedReplies || 0) + 1;
        codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
        messages.pop();
        return false;
      } finally {
        codioIDE.coachBot.hideThinkingAnimation();
      }
    }

    await recordTurn(initialInput);
    updateStrict(strictState, sessionHistory, session, initialInput, false);

    try {
      messages.push({ "role": "user", "content": await buildContextMessage(initialInput, false) });
      recordFingerprint(false);
    } catch (e) {
      messages.push({ "role": "user", "content": fallbackContextMessage(initialInput) });
      recordFingerprint(true);
    }

    await askAndRecord();

    while (true) {
      let input;
      try {
        input = await codioIDE.coachBot.input("What else can I help you with? (Type 'bye' when you're done.)");
      } catch (e) {
        break;
      }

      if ((input || "").trim().toLowerCase() === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      // A blank message is ignored.
      if (!(input || "").trim()) continue;

      if (isExitMessage(input)) {
        break;
      }

      await recordTurn(input);

      if (messages.length === 0) {
        // The first reply failed, so there is no context message yet: start over with this
        // question as the first one (otherwise the refresh would overwrite it with the old one).
        initialInput = input;
        try {
          messages.push({ "role": "user", "content": await buildContextMessage(initialInput, false) });
          recordFingerprint(false);
        } catch (e) {
          messages.push({ "role": "user", "content": fallbackContextMessage(initialInput) });
          recordFingerprint(true);
        }
        updateStrict(strictState, sessionHistory, session, input, false);
      } else {
        // Refresh the context block so the coach sees the student's latest edits
        let changed = false;
        try {
          const fresh = await buildContextMessage(initialInput, true);
          messages[0] = { "role": "user", "content": fresh };
          changed = recordFingerprint(false);
        } catch (e) {
          // Keep the previous context if the refresh fails
          recordFingerprint(true);
        }
        updateStrict(strictState, sessionHistory, session, input, changed);
        messages.push({
          "role": "user",
          "content": changed ? "(Note: the student's files have changed since your last reply.)\n\n" + input : input
        });
      }

      const ok = await askAndRecord();
      if (!ok) continue;

      // Keep first message (with files + guide) + last 8 messages (4 exchanges)
      while (messages.length > 9) {
        messages.splice(1, 2); // drop the oldest assistant+user pair, keep messages[0] (context) intact
      }
    }

    session.ended = new Date().toISOString();
    if (logEnabled) await queueSave(sessionHistory); // flush queued writes (safe to await: no input follows)

    codioIDE.coachBot.write("Okay, bye! Come back any time you want help.");
    codioIDE.coachBot.showMenu();
  }

})(window.codioIDE, window);
