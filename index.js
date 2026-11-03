// Microbit Coach Extension
(async function(codioIDE, window) {

  const VERSION = "1.13.0";

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
- Be encouraging by naming one specific thing they did right ("Your if line reads button_a correctly."). Only say they're close when one small fix is left. After the tag line, don't start every reply with the same words.
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

  async function buildContextMessage(initialInput, isRefresh, history, session) {
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

    // Not part of lastFilesBlock, so it never affects the fingerprint or the files-changed note.
    const recentBlock = recentQuestionsBlock(history, session || { exchanges: 0 });

    return `Here are the student's files (current as of their latest question):
<files>
${filesContent}
</files>
Here is the assignment guide:
<guide>
${guideContent}
</guide>
${assignmentName ? `\nAssignment: ${assignmentName}\n` : ''}
${recentBlock}

${studentLine}`;
  }

  // Used when the first context build throws: no files, so the coach still answers.
  function fallbackContextMessage(question, history, session) {
    return `Here are the student's files:
<files>
(I couldn't read the student's files just now.)
</files>

${recentQuestionsBlock(history, session)}

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
  // Try-first help (strict mode), with the model's judgment and the code's memory.
  // Each reply starts with a hidden tag labelling the student's CURRENT message:
  // [[ask]] (wants the next step, the code or a check instead of trying), [[attempt]]
  // (shows or describes their own try), or [[other]]. The code keeps those labels in
  // the box's log and, before every reply, tells the model in <recent_questions> which
  // kind of help each label gets this turn: try-first when this would be the 3rd ask
  // in their last 5 questions since their last attempt, or while try-first is already on (until an attempt).
  // The tag is stripped before the student sees the reply (ask() runs with
  // stream:false, then write()) and kept in the chat history so the model keeps
  // tagging. Backstop: STRICT_SESSION_QUESTIONS questions in a session means try-first.
  // The log is per box (one student, one assignment), so nothing carries over.
  // ============================================================
  const STRICT_SESSION_QUESTIONS = 10; // backstop: questions in the current session
  const STRICT_WORKSPACE_DAYS = 14;    // only sessions that started within this many days
  const TRY_FIRST_ASKS = 3;            // asks among the last TRY_FIRST_WINDOW questions that switch it on
  const TRY_FIRST_WINDOW = 5;
  const RECENT_QUESTIONS_SHOWN = 10;   // questions listed in <recent_questions>
  const RECENT_QUESTION_CHARS = 160;   // each one cut to this length
  const MODE_LABELS = ["ask", "attempt", "other"];

  // This coach's recent questions in this box (last STRICT_WORKSPACE_DAYS days, this
  // session included), each with the label the model gave it (null if none yet).
  function recentQuestionList(history, session) {
    let total = 0;
    let items = [];
    const list = Array.isArray(history) ? history : [];
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      if (!s || typeof s !== "object" || s.coach !== COACH_ID) continue;
      const startedMs = Date.parse(s.started);
      if (s !== session && !(startedMs > Date.now() - STRICT_WORKSPACE_DAYS * 86400000)) continue;
      const qs = Array.isArray(s.questions) ? s.questions : [];
      const labels = Array.isArray(s.labels) ? s.labels : [];
      total += (typeof s.exchanges === "number" && s.exchanges >= qs.length) ? s.exchanges : qs.length;
      for (let j = 0; j < qs.length; j++) {
        if (typeof qs[j] === "string") items.push({ q: qs[j], label: MODE_LABELS.indexOf(labels[j]) !== -1 ? labels[j] : null });
      }
    }
    return { total: total, items: items };
  }

  // Which help each possible label of the CURRENT question gets this turn.
  function modeRule(history, session) {
    const recent = recentQuestionList(history, session);
    let prior = recent.items.slice(0, -1).slice(-(TRY_FIRST_WINDOW - 1));
    let lastAttempt = -1;
    prior.forEach(function(it, i) { if (it.label === "attempt") lastAttempt = i; });
    prior = prior.slice(lastAttempt + 1); // an attempt starts the count over
    const priorAsks = prior.filter(function(it) { return it.label === "ask"; }).length;
    const modes = Array.isArray(session.modes) ? session.modes : [];
    const lastMode = modes.length ? modes[modes.length - 1] : "normal";
    if ((session.exchanges || 0) >= STRICT_SESSION_QUESTIONS) {
      return { ask: "try-first", attempt: "try-first", other: "try-first", backstop: true, recent: recent };
    }
    return {
      ask: (priorAsks + 1 >= TRY_FIRST_ASKS || lastMode === "try-first") ? "try-first" : "normal",
      attempt: "normal",
      other: lastMode === "try-first" ? "try-first" : "normal",
      backstop: false,
      recent: recent
    };
  }

  // The <recent_questions> block for messages[0]. Rebuilt every turn after recordTurn().
  function recentQuestionsBlock(history, session) {
    const rule = modeRule(history, session);
    const shown = rule.recent.items.slice(-RECENT_QUESTIONS_SHOWN).map(function(it, i, arr) {
      const one = it.q.replace(/\s+/g, " ").trim();
      const cut = one.length > RECENT_QUESTION_CHARS ? one.slice(0, RECENT_QUESTION_CHARS) + "..." : one;
      const tag = (i === arr.length - 1) ? "[current]" : "[" + (it.label || "?") + "]";
      return (i + 1) + ". " + tag + " " + cut;
    });
    const big = function(m) { return m === "try-first" ? "TRY-FIRST help" : "NORMAL help"; };
    return "<recent_questions>\n" +
      "Questions to you in this assignment in the last " + STRICT_WORKSPACE_DAYS + " days: " + rule.recent.total +
      ". In this session: " + (session.exchanges || 0) + ".\n" +
      (shown.length ? "Their recent questions, oldest first, with the label you gave each:\n" + shown.join("\n") : "No earlier questions.") +
      "\nFor the current question, label it and give this help:\n" +
      "- [[ask]]: " + big(rule.ask) + "\n" +
      "- [[attempt]]: " + big(rule.attempt) + "\n" +
      "- [[other]]: " + big(rule.other) + "\n" +
      "</recent_questions>";
  }

  // Reads and strips the hidden tag line. Returns the label (null if missing) and the
  // cleaned text. Tolerates ** or backtick wrappers, # or >, one closing bracket, a
  // trailing colon, and extra words like "[[ask | try-first]]".
  function readModeTag(reply) {
    const text = String(reply || "");
    const nl = text.search(/\n|$/);
    const first = text.slice(0, nl);
    let label = null;
    let rest = text;
    // Strip only the tag itself, so "[[ask]] What did you try?" keeps its words.
    const lead = first.match(/^\s*[#*_`> \t]*\[\[\s*(ask|attempt|other|try-first|normal)\b([^\]\n]{0,30}\]\]|\]{0,2})[*_`:]*[ \t]*/i);
    if (lead) {
      const w = lead[1].toLowerCase();
      label = MODE_LABELS.indexOf(w) !== -1 ? w : null;
      rest = first.slice(lead[0].length) + text.slice(nl);
    }
    const clean = rest
      .replace(/[*_`]*\[\[\s*(ask|attempt|other|try-first|normal)(\s*\|[^\]\n]{0,30})?\s*\]\][*_`:]*[ \t]*/gi, "") // stray copies
      .replace(/^\s+/, "");
    return { label: label, text: clean };
  }

  // The chat-history copy of a reply keeps its tag line (only the student's view is
  // cleaned), so the model keeps seeing itself tag every reply.
  function historyReply(tagged) {
    return "[[" + (tagged.label || "other") + "]]\n" + tagged.text;
  }

  // Call after every non-empty reply, with the rule used for this turn (from
  // modeRule(), computed when this turn's context was built) and the tag read from the
  // reply. Logs the label and the mode; the next queued save carries them.
  function recordMode(session, rule, label) {
    const mode = rule[label || "other"];
    if (!Array.isArray(session.labels)) session.labels = [];
    if (!Array.isArray(session.modes)) session.modes = [];
    // labels line up with questions: pad for any earlier question that got no reply
    while (session.labels.length < (session.questions || []).length - 1) session.labels.push(null);
    while (session.modes.length < session.labels.length) session.modes.push(null);
    if (session.labels.length < MAX_LOGGED_QUESTIONS) session.labels.push(label);
    if (session.modes.length < MAX_LOGGED_QUESTIONS) session.modes.push(mode);
    if (mode === "try-first") {
      session.strictReleased = false;
      if (!session.strict) {
        session.strict = true;
        session.strictReason = rule.backstop ? "backstop" : "model";
      }
    } else if (session.strict) {
      session.strictReleased = true; // went back to normal help after try-first
    }
    return mode;
  }

  const TRY_FIRST_PROMPT = `

## Try-first help: label each message

Each message includes <recent_questions>: the student's recent questions to you in this assignment and the label you gave each one. Start EVERY reply with one hidden tag line that labels the student's CURRENT message, then your reply on the next line:
- [[ask]]: they want you to give them the next step, the code, or a check instead of trying something themselves. Judge the meaning in any wording: "now what", "how do I do that", "what goes next", "can you tell me how to...", "is this right?", "like that?", "show me", a bare paste with no question.
- [[attempt]]: THIS message shows or describes something new they tried since your last reply (what they changed, what happened when they ran it, or their own plan), or it starts with the note that their files changed. Code that was already in their files does not make a message an attempt.
- [[other]]: anything else, including pasting a real error message, asking what something means or how something works, asking how to run their code, asking where to find a block, menu or button, or answering a question you asked.
Label the student's words, not their files. Examples: "how do I do that" [[ask]]; "like that?" [[ask]]; "show me" [[ask]]; "and then" [[ask]]; "NameError: name 'x' is not defined" [[other]]; "what does int() do?" [[other]]; "I added an if but it prints both times" [[attempt]]; "I think I should use a loop that adds 1 each time" [[attempt]].
Then give the kind of help <recent_questions> lists for that label. The student never sees the tag. Never mention it, the labels, the mode, or their question count.

Try-first help means: stay warm and keep helping with every question, but nudge them to try first.
- Same as always: explain what an error message means and which line it points to, explain an idea, give a short example with different names or data, point out a typo or missing punctuation, help them find a block, menu or button, and tell them how to run their work.
- For "what do I write", "next" or "show me" questions, first ask one short question back ("What do you think the next step is?" or "What did you try?") and wait for their answer. If they answer with a real attempt, even a wrong one, help as usual from there.
- Don't write the lesson's main step in their own work (their condition, their loop, their counter, their blocks). Show the pattern with different names and let them adapt it. If they ask twice for that step, give a parallel example, not their finished line. Fixing a typo or missing punctuation in a line they already wrote is still fine.
- After about three "next step" asks in a row, suggest they run what they have and see what happens, or ask them to explain their plan in one sentence.
- If they've been stuck on the same thing for three or more turns, kindly suggest their teacher, for example: "This one might be easier to sort out with your teacher. If you're in class, ask them now. If you're working at home, send them a message about where you're stuck." That's a suggestion, never a refusal. Keep helping too.
- Never mention a mode, a limit or how many questions they've asked, and never refuse. You're a coach who wants them to try first.`;

  const fullSystemPrompt = systemPrompt + TRY_FIRST_PROMPT;

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
      strictReleased: false,
      modes: [],
      labels: []
    };
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
        // stream:false so the hidden mode tag can be stripped before the student sees the reply.
        const result = await codioIDE.coachBot.ask({
          systemPrompt: fullSystemPrompt,
          messages: messages
        }, { stream: false, preventMenu: true });
        const raw = (result && typeof result.result === "string") ? result.result : "";
        const rule = modeRule(sessionHistory, session);
        const tagged = readModeTag(raw);
        if (!tagged.text.trim()) {
          // Never keep an empty assistant turn: an empty message in the history can make every
          // later ask() fail too (seen live: one session got 10 empty replies in a row).
          session.failedReplies = (session.failedReplies || 0) + 1;
          codioIDE.coachBot.write("Hmm, I didn't get an answer that time. Please ask again!");
          messages.pop();          // drop the user turn that got no answer
          return false;
        }
        recordMode(session, rule, tagged.label);
        codioIDE.coachBot.write(tagged.text, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        messages.push({ "role": "assistant", "content": historyReply(tagged) }); // tag kept in history
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

    try {
      messages.push({ "role": "user", "content": await buildContextMessage(initialInput, false, sessionHistory, session) });
      recordFingerprint(false);
    } catch (e) {
      messages.push({ "role": "user", "content": fallbackContextMessage(initialInput, sessionHistory, session) });
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
          messages.push({ "role": "user", "content": await buildContextMessage(initialInput, false, sessionHistory, session) });
          recordFingerprint(false);
        } catch (e) {
          messages.push({ "role": "user", "content": fallbackContextMessage(initialInput, sessionHistory, session) });
          recordFingerprint(true);
        }
      } else {
        // Refresh the context block so the coach sees the student's latest edits
        let changed = false;
        try {
          const fresh = await buildContextMessage(initialInput, true, sessionHistory, session);
          messages[0] = { "role": "user", "content": fresh };
          changed = recordFingerprint(false);
        } catch (e) {
          // Keep the previous context if the refresh fails
          recordFingerprint(true);
        }
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
