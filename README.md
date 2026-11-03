# micro:bit Coach

A Codio Custom Assistant (Virtual Coach) for middle school students learning MicroPython on the [BBC micro:bit](https://microbit.org/).

## What it does

- Reads the student's open files, every `.py` file in the project and the current guide page before every answer.
- Bases its answers on the official MicroPython v2 documentation.
- Gives direct help with errors and typos and guided questions for design problems. For "write it for me" requests it turns the request down, offers a short plan and gives a tiny example (5 lines at most). It never writes a full solution.
- Tells students how to test in Codio: the **🖥 micro:bit simulator** preview, or the guide's **Send to micro:bit** link for a real board.

One `index.js` plus `metadata.json`, with no build step and no dependencies.

## Using it in Codio

1. In Codio, go to **Organization > Extensions**, click **Add extension**, and paste this repository's URL. You need to be an organization owner.
2. Choose the coach in the [Virtual Coach settings](https://docs.codio.com/instructors/setupcourses/assignment-settings/virtual-coach.html) for a course or assignment.
3. After a new release, click **Check for Updates** on the Extensions page. Students can type `version` in the coach to see which version is running.

Every change to `index.js` or `metadata.json` needs a new GitHub release, with a tag that matches the `VERSION` constant in `index.js`.

## Session log

Each coach session adds a short summary to a hidden `.coach-log.json` file in the student's workspace: when it started and ended, the coach version, how many questions were asked, and the questions themselves (up to 50, each cut to 300 characters). Codio's own coach-log export leaves the student's question blank for message-based coaches like this one, so this file is the only record of what students asked. It's never sent to the model, and logging can't break the coach.

The same history drives gentle "try-first" help. The model labels each student message with a hidden tag at the start of its reply: `[[ask]]` (wants the next step, the code or a check), `[[attempt]]` (shows their own try) or `[[other]]`. The coach keeps those labels in the log and, before every reply, lists this assignment's recent questions with their labels in a `<recent_questions>` block (last 14 days, this coach only) and says which help each label gets this turn. Try-first applies when a message would be the 3rd ask in the last 5 since the student's last attempt, stays on until an attempt, and always applies after 10 questions in one session (the backstop). The tag is stripped before the student sees the reply (`ask()` runs with `stream: false` and the coach calls `write()` itself) but is kept in the chat history so the model keeps tagging; a missing tag counts as `other`. Each session entry records `labels` and `modes` (one value per reply), `strict`, `strictReason` (`model` or `backstop`) and `strictReleased`, plus `contextFingerprints` and `failedReplies`. The log lives in that one assignment's workspace, so this only reflects how the student used this coach on this assignment.

## Development

```bash
node --check index.js
```
