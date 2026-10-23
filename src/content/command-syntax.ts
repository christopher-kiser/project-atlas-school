import type { CommandTopic } from "./study-types";

export const commandSyntax: Record<string, CommandTopic> = {
  "shell-basics": {
    id: "shell-basics",
    title: "Read a terminal command one word at a time",
    kind: "syntax",
    explanation:
      "The terminal is the window that displays text. The shell interprets what you enter; a program performs the requested work. Use Ubuntu Bash for this course’s Linux commands. A command name can also identify a shell builtin such as cd. Spaces separate words: options change behavior, an option value supplies a setting, and an operand names the thing to act on. A tool such as git also has subcommands. Copy the command itself, without a displayed prompt such as user@machine:~$ or PS C:\\> and without the output printed beneath it.",
    example: "mkdir -p ~/atlas-labs/orientation\ngit status",
    parts: [
      { token: "mkdir", meaning: "The command that creates directories." },
      {
        token: "-p",
        meaning:
          "An option: create missing parents and accept an existing directory.",
      },
      {
        token: "~/atlas-labs/orientation",
        meaning: "The operand: which directory mkdir should create.",
      },
      {
        token: "git status",
        meaning:
          "git is the program; status is its subcommand. Run it inside your own Git lab repository.",
      },
      {
        token: "--help / man NAME",
        meaning:
          "Read help to check a tool’s actual options. Uppercase NAME is an instruction to substitute a command name, as in man mkdir.",
      },
    ],
    expected:
      "mkdir normally prints nothing when successful; inspect the resulting directory. git status prints repository state or explains that this is not a repository. Silence alone is not a verification.",
    question:
      "In mkdir -p ~/atlas-labs/orientation, which word chooses the target?",
    answer:
      "~/atlas-labs/orientation is the target operand; -p changes how mkdir handles directories.",
  },
  "paths-quotes": {
    id: "paths-quotes",
    title: "Locate a file and preserve its name",
    kind: "syntax",
    explanation:
      "Enter these examples in Ubuntu Bash. An absolute Linux path begins at /; a relative path begins in the directory shown by pwd. . is the current directory and .. its parent. An unquoted ~ at the start of a word expands to your home directory. Quotes keep a space-containing filename in one argument; the shell removes the grouping quotes before calling the program. Linux /home/... paths and Windows C:\\... paths belong to different path conventions.",
    example:
      'pwd\ncd ~/atlas-labs/expanded/bash-values\ncat "incident notes.txt"',
    parts: [
      {
        token: "pwd",
        meaning:
          "Print the current directory before interpreting a relative path.",
      },
      {
        token: "cd PATH",
        meaning:
          "Change this shell’s directory. Replace PATH with the real directory; a failed cd leaves the location unchanged.",
      },
      {
        token: "~ / . / ..",
        meaning:
          'Home expansion, this directory, and the parent directory. Quoted "~" is a literal tilde, so use "$HOME/..." when quoting a home path.',
      },
      {
        token: '"incident notes.txt"',
        meaning:
          "One filename argument containing a space. Without quotes, cat receives two separate names.",
      },
      {
        token: "--",
        meaning:
          'Many tools accept this marker to end options, as in cat -- "$report". A later leading dash is then part of an operand.',
      },
    ],
    expected:
      "After creating the lesson fixture, cat displays the harmless file’s contents. If it says the file is absent, check pwd, the exact saved name, and its extension before changing permissions.",
    question:
      "You are in the wrong directory. Does a correct relative filename prove you are reading the intended file?",
    answer:
      "No. Establish the working directory with pwd or use the intended absolute path, then inspect the file.",
  },
  pipe: {
    id: "pipe",
    title: "| sends one program’s output into another",
    kind: "syntax",
    explanation:
      "In Ubuntu Bash, a pipe connects the left command’s standard output to the right command’s standard input. The programs can run concurrently as text flows between them. | is shell syntax, not an option passed to grep or wc. A normal pipe does not include standard error and does not save a file. PowerShell’s cmdlet pipeline carries objects; use its separate lesson for that environment.",
    example: "grep ERROR app.log | wc -l",
    parts: [
      {
        token: "grep ERROR app.log",
        meaning:
          "Read the existing log and emit only lines containing the case-sensitive pattern ERROR.",
      },
      {
        token: "|",
        meaning:
          "Connect descriptor 1 (stdout) on the left to descriptor 0 (stdin) on the right.",
      },
      {
        token: "wc -l",
        meaning:
          "Count newline characters in the received text. It receives matched log lines, not the filename app.log.",
      },
    ],
    expected:
      "If app.log contains four newline-terminated lines with two ERROR matches, this pipeline prints 2. This is a reading example; prepare the file named by your lesson before trying it. A missing-file diagnostic remains on the terminal, so the right-hand count alone cannot prove the left command succeeded.",
    question:
      "Does this count all app.log lines or only grep’s selected lines?",
    answer:
      "Only the selected lines. By default Bash reports the last command’s pipeline status, so inspect upstream errors too; pipefail changes that status rule.",
  },
  "redirect-out": {
    id: "redirect-out",
    title: "> creates or replaces an output file",
    kind: "syntax",
    explanation:
      "Type this in Ubuntu Bash from the disposable streams lesson directory. The shell opens the destination before running the command. > redirects standard output (descriptor 1), creating an absent file or truncating an existing file under the default Bash settings. The destination path is shell syntax, not another argument to echo. Standard error remains separate.",
    example: 'echo "first" > note.txt\necho "second" > note.txt\ncat note.txt',
    parts: [
      {
        token: 'echo "first"',
        meaning: "Produce the text first followed by a newline on stdout.",
      },
      {
        token: "> note.txt",
        meaning:
          "Connect stdout to this file, replacing any previous contents.",
      },
      {
        token: "cat note.txt",
        meaning: "Read the resulting file to verify what was actually saved.",
      },
    ],
    expected:
      "cat prints only second. A failing command can still leave a newly created or emptied output file because redirection happens first. Never redirect a command into the same file it is reading.",
    question: "After both writes, will the file contain first and second?",
    answer:
      "No. The second > replaces the previous content; use >> when you intend to append.",
  },
  "redirect-append": {
    id: "redirect-append",
    title: ">> preserves existing content and appends",
    kind: "syntax",
    explanation:
      "Enter this in Ubuntu Bash in a disposable lesson folder. >> connects standard output to the end of a file. It creates the file if absent and keeps existing bytes if present. It does not insert a separator itself: the command must produce any desired newline. Repeating an append repeats the text, so inspect before rerunning an evidence step.",
    example:
      'echo "request sent" > observations.txt\necho "request failed" >> observations.txt\ncat observations.txt',
    parts: [
      {
        token: "> observations.txt",
        meaning:
          "Start this known fixture with one line, replacing any previous fixture.",
      },
      {
        token: ">> observations.txt",
        meaning: "Append the next command’s stdout after the existing bytes.",
      },
      {
        token: "echo",
        meaning:
          "For these simple words, write the message and a newline. printf is useful when exact formatting matters.",
      },
    ],
    expected:
      "The saved file contains request sent and request failed on two lines, in that order.",
    question: "What changes if the second operator is > instead of >>?",
    answer: "The first observation is lost; only request failed remains.",
  },
  "redirect-in": {
    id: "redirect-in",
    title: "< supplies a file through standard input",
    kind: "syntax",
    explanation:
      "In Ubuntu Bash, < opens an existing file for the command’s standard input (descriptor 0). The filename following < is handled by the shell. With wc -l note.txt, wc instead receives a filename operand and opens it itself. Both can count the same data, but their input mechanism and displayed labels differ. Neither form changes the input file.",
    example: "cat < note.txt\nwc -l < note.txt",
    parts: [
      {
        token: "cat",
        meaning:
          "With no filename arguments, read stdin and copy its bytes to stdout.",
      },
      {
        token: "< note.txt",
        meaning:
          "Feed the saved file into stdin instead of waiting for keyboard input.",
      },
      {
        token: "wc -l",
        meaning:
          "Count newline characters. A final line without a newline does not add one to this count.",
      },
    ],
    expected:
      "For the two-line streams fixture, cat displays both lines and wc prints 2 without a filename label. If the input path cannot be opened, the shell reports an error and does not run this command.",
    question: "Does wc receive note.txt as an argument in wc -l < note.txt?",
    answer:
      "No. Bash opens note.txt and connects it to stdin; wc receives only the -l option.",
  },
  "redirect-error": {
    id: "redirect-error",
    title: "Keep diagnostics, results, and status separate",
    kind: "syntax",
    explanation:
      "Run these Ubuntu Bash redirections in the created ~/atlas-labs/streams folder. Each process normally has stdin (descriptor 0, input), stdout (1, results), and stderr (2, diagnostics). Both output streams usually appear in the same terminal, but they remain separate. 2> opens a file for stderr; >&2 sends the command’s stdout to wherever stderr currently goes. Stream numbers identify channels. An exit status is a separate number indicating how a command finished.",
    example:
      'cat atlas-missing.txt > result.txt 2> error.txt\necho "$?"\nprintf "Expected one file path\\n" >&2',
    parts: [
      {
        token: "> result.txt",
        meaning: "Create or truncate the normal-output file.",
      },
      {
        token: "2> error.txt",
        meaning:
          "Create or truncate the diagnostic file. The 2 must touch > to identify the descriptor.",
      },
      {
        token: 'echo "$?"',
        meaning:
          "Immediately display cat’s exit status before another command replaces it.",
      },
      {
        token: ">&2",
        meaning:
          "Equivalent here to 1>&2: duplicate stderr’s destination for stdout. It does not set a failure status.",
      },
      {
        token: "2>&1",
        meaning:
          "Send stderr to stdout’s current destination. Redirections are processed left to right, so their order matters.",
      },
    ],
    expected:
      "When the deliberately absent file is absent, result.txt is empty, error.txt contains a diagnostic, and the immediate status is nonzero. The printf message appears on stderr, but a successful printf still returns 0.",
    question:
      "Does writing a message to descriptor 2 automatically return exit status 2?",
    answer:
      "No. The output channel and exit status are independent. A script must choose a failure status with exit or return when appropriate.",
  },
  "status-control": {
    id: "status-control",
    title: "$?, &&, and || follow exit status",
    kind: "syntax",
    explanation:
      "In Ubuntu Bash, 0 means command success and a nonzero status describes another outcome. Each tool defines its own nonzero meanings: grep uses 1 for no match and a higher value for an error. $? expands to the preceding command’s status, so read or save it immediately. A && B runs B only after A succeeds; A || B runs B only after A returns nonzero. These operators inspect status, not reassuring-looking text.",
    example:
      'grep ABSENT state.txt\necho "$?"\ngrep READY state.txt && echo present\ngrep ABSENT state.txt || echo missing',
    parts: [
      {
        token: "$?",
        meaning:
          "The most recent status. echo itself becomes the most recent command after printing it.",
      },
      {
        token: "&&",
        meaning:
          "Run the right-hand command only when the left-hand command returns 0.",
      },
      {
        token: "||",
        meaning:
          "Run the right-hand command only when the left-hand command returns nonzero.",
      },
      {
        token: "exit 2",
        meaning:
          "End a script process with status 2. A function normally uses return to let its caller continue.",
      },
    ],
    expected:
      "With the lesson’s state.txt containing READY, the first status is 1, then the messages present and missing appear. A fallback can itself succeed, so the status of an entire || list may be 0 after an initial failure.",
    question:
      "Can a missing message after grep ... || echo missing distinguish no match from a read error?",
    answer:
      "No. Both return nonzero and trigger the fallback. Inspect grep’s diagnostic and status when the distinction matters; use a clear if statement for more complex decisions.",
  },
  expansion: {
    id: "expansion",
    title: "Variables and arguments hold values",
    kind: "syntax",
    explanation:
      "These are Bash statements typed at an Ubuntu prompt or saved in a .sh script. name=value assigns a shell variable, with no spaces around =. $name expands its value; double quotes keep that value in one argument, while single quotes preserve literal text. export makes a variable available in subsequently launched child processes. A script’s positional arguments are separate from environment variables and do not come from filenames mentioned inside the script.",
    example:
      'report="incident notes.txt"\ncat "$report"\nexport ATLAS_MODE=practice\nbash show-input.sh "web service"',
    parts: [
      {
        token: 'report="incident notes.txt"',
        meaning:
          "Assign the spaced filename. report = value would try to run a command named report.",
      },
      {
        token: '"$report"',
        meaning:
          "Expand report as one filename argument; unquoted expansion can split words and expand globs.",
      },
      {
        token: "export ATLAS_MODE=practice",
        meaning:
          "Children inherit ATLAS_MODE. Exporting does not retroactively change other terminal tabs.",
      },
      {
        token: "$1 / $#",
        meaning:
          "Inside show-input.sh, $1 is the first argument and $# is the argument count.",
      },
      {
        token: '"$@"',
        meaning:
          "Forward every positional argument separately, preserving each argument’s boundary.",
      },
      {
        token: "${1:-http://localhost}",
        meaning:
          "Use the first argument when set and nonempty; otherwise use this default value.",
      },
    ],
    expected:
      "After saving the lesson’s show-input.sh, the quoted web service value produces argument count 1. Unquoted web service supplies two arguments. echo '$HOME' prints literal $HOME; echo \"$HOME\" prints the home path.",
    question: 'Does report = "incident notes.txt" assign a variable in Bash?',
    answer:
      'No. Remove the spaces around =. Then use cat "$report" to preserve the filename as one argument.',
  },
  globs: {
    id: "globs",
    title: "Wildcards are expanded by the shell",
    kind: "syntax",
    explanation:
      "In Ubuntu Bash, an unquoted * in a filename pattern matches zero or more characters, ? matches one character, and [...] matches one character from a set. Bash expands a matching glob into filenames before launching the command. These are filename patterns, not grep’s regular expressions. Quoting a pattern passes it literally to a program that understands its own pattern syntax, such as find -name. Default Bash usually leaves a pattern unchanged when nothing matches.",
    example:
      'dir="logs"\nfor file in "$dir"/*.log; do\n  [[ -f "$file" ]] || continue\n  wc -l < "$file"\ndone',
    parts: [
      {
        token: '"$dir"/*.log',
        meaning:
          "Quote the directory value while leaving *.log active. Matching spaced filenames stay individual loop items.",
      },
      {
        token: '[[ -f "$file" ]] || continue',
        meaning:
          "Skip a non-regular file, including the literal unmatched pattern under default Bash settings.",
      },
      {
        token: 'find . -type f -name "*.log"',
        meaning:
          "Here the quotes stop Bash expansion so find can test each discovered filename against the pattern.",
      },
    ],
    expected:
      "With the loop lesson’s fixtures, only one.log and web errors.log are counted. keep.txt is skipped. An empty directory produces no count lines. Ordinary * does not include leading-dot names by default.",
    question:
      'Why does find -name "*.log" quote its pattern while the loop leaves *.log unquoted?',
    answer:
      "find must receive a pattern to apply during traversal. The loop asks Bash itself to enumerate the matching paths first.",
  },
  "jobs-signals": {
    id: "jobs-signals",
    title: "Foreground work, background work, and signals",
    kind: "syntax",
    explanation:
      "Use an interactive Ubuntu Bash terminal for this lesson. A foreground program occupies the terminal until it finishes; Ctrl+C normally sends SIGINT to the foreground process group. A trailing & launches work asynchronously and returns the prompt. $! is the PID of the most recently started background process. kill sends a signal to a process; TERM requests termination, while KILL cannot be caught for cleanup. Inspect only the lab process you just started before signaling it.",
    example:
      'sleep 120 &\natlas_pid=$!\nps -p "$atlas_pid" -o pid,ppid,user,stat,comm\nkill -TERM "$atlas_pid"\nps -p "$atlas_pid" -o pid,ppid,user,stat,comm',
    parts: [
      {
        token: "&",
        meaning:
          "Start sleep in the background. This is different from &&, which conditionally runs another command.",
      },
      {
        token: "atlas_pid=$!",
        meaning: "Save the background PID immediately in this shell.",
      },
      {
        token: "ps -p",
        meaning:
          "Inspect this exact PID and confirm its owner and command are the expected sleep.",
      },
      {
        token: "kill -TERM",
        meaning:
          "Send signal 15 to the verified lab process; do not substitute an unrelated or stale PID.",
      },
      {
        token: "jobs / Ctrl+Z / fg",
        meaning:
          "In interactive Bash, list this shell’s jobs, suspend foreground work, and resume a selected job in the foreground. Suspension is not termination.",
      },
    ],
    expected:
      "The first ps shows your sleep process. After termination is handled, the second has no matching process row and may return nonzero. Ctrl+C in a separate tail -f follower stops that follower, not the program writing its log.",
    question: "Is Ctrl+Z proof that the process has exited?",
    answer:
      "No. It normally suspends a foreground job. Check jobs and resume with fg when appropriate; verify termination with process inspection.",
  },
  "shell-flow": {
    id: "shell-flow",
    title: "Read Bash decisions, loops, and functions",
    kind: "syntax",
    explanation:
      "This is Bash source: save it in a .sh file with a plain-text editor, then run bash FILE.sh from that folder. if selects a branch from a command or test’s status; then begins that branch and fi closes it. A for loop assigns each item to a variable and repeats do ... done. A function groups reusable commands, receives its own arguments, and can return a status to its caller. Defining a function does not call it.",
    example:
      'count_log() {\n  local file="$1"\n  if [[ -f "$file" && -r "$file" ]]; then\n    wc -l < "$file"\n    return "$?"\n  else\n    return 3\n  fi\n}\nfor file in logs/*.log; do\n  [[ -f "$file" ]] || continue\n  count_log "$file"\ndone',
    parts: [
      {
        token: "count_log() { ... }",
        meaning:
          'Define a function. count_log "$file" later calls it with one argument.',
      },
      {
        token: 'local file="$1"',
        meaning:
          "Give this function a local variable for its first argument, limiting accidental changes to a caller’s variable.",
      },
      {
        token: '[[ -f "$file" && -r "$file" ]]',
        meaning:
          "A Bash conditional expression: require a regular file and read permission. ! negates a test; -d tests a directory; -eq compares integers.",
      },
      {
        token: "test / [ ... ]",
        meaning:
          "Other shell test forms. With [, spaces around arguments and before ] are required. Their syntax differs from Bash’s [[ ... ]].",
      },
      {
        token: "for / do / done / continue",
        meaning:
          "Assign each filename, enter and close the repeated body, or skip to the next item.",
      },
      {
        token: "return",
        meaning:
          "Finish the function with a status; it does not print a returned value. exit would end the script process.",
      },
    ],
    expected:
      "After creating the logs fixture, each readable regular .log file produces its newline count. The function’s stdout carries the count and its status carries success or failure. A caller must inspect that status if failure needs to stop the loop.",
    question: "Does return 3 print the number 3 or terminate the whole script?",
    answer:
      "Neither: it leaves the function with status 3. The calling shell code decides whether to continue, branch, or exit.",
  },
  "script-vs-shell": {
    id: "script-vs-shell",
    title: "Save source in the editor; launch it in the shell",
    kind: "workflow",
    explanation:
      "Python lines such as print(2 + 3) belong in hello.py; Bash control statements belong in a .sh file. Type the launch command in Ubuntu Bash after saving the appropriate file. python3 and bash are interpreters that read those files. The shell does not change language because pasted text resembles Python. A script’s #!/usr/bin/env bash line selects Bash when an executable script is launched directly; bash file.sh explicitly selects Bash and does not require that file to be executable.",
    example: "pwd\ncat hello.py\npython3 hello.py",
    parts: [
      {
        token: "Editor: hello.py",
        meaning:
          "Save the editor-workflow lesson’s two print statements as plain text with this exact name, not hello.py.txt.",
      },
      {
        token: "cat hello.py",
        meaning:
          "Inspect the saved bytes before execution. cat displays source; it does not execute Python.",
      },
      {
        token: "python3 hello.py",
        meaning:
          "Ask Python 3 to execute the saved file relative to this shell’s working directory.",
      },
      {
        token: "bash health.sh URL",
        meaning:
          "Ask Bash to run the separate health-script lesson’s file. Replace URL with the actual local service address required by that lesson.",
      },
      {
        token: "source file.sh / . file.sh",
        meaning:
          "Execute Bash source in the current shell, so directory and variable changes can affect it. This differs from starting bash as a child process.",
      },
    ],
    expected:
      "For hello.py from the lesson, cat shows two print statements, then Python prints Atlas is running this file. and 5. If output does not reflect an edit, save and check the exact file path and interpreter.",
    question:
      "Where do you enter python3 hello.py, and where do you put print(2 + 3)?",
    answer:
      "Enter python3 hello.py in Ubuntu Bash. Put print(2 + 3) in the saved hello.py file using the editor.",
  },
  "python-syntax": {
    id: "python-syntax",
    title: "Understand Python source before running it",
    kind: "syntax",
    explanation:
      "Save Python source in the .py file named by its lesson, then launch it with python3 FILE.py in Ubuntu Bash. import loads a module; from ... import ... selects a named item. def defines a function whose indented body runs when called. = assigns a value; == compares values. Strings are quoted text, numbers support arithmetic, lists hold ordered values, and dictionaries map keys to values. Bash pipes and redirections belong on the launch command, outside Python source.",
    example:
      'import json\nfrom pathlib import Path\n\ndef running_names(records):\n    return [item["name"] for item in records if item["state"] == "running"]\n\nif __name__ == "__main__":\n    records = json.loads(Path("inventory.json").read_text())\n    print(running_names(records))',
    parts: [
      {
        token: "import json / from pathlib import Path",
        meaning:
          "Use Python’s standard-library JSON parser and filesystem-path class; no extra package is needed for these imports.",
      },
      {
        token: "def running_names(records):",
        meaning:
          "Define a function with one parameter. The colon starts its indented body; use consistent spaces.",
      },
      {
        token: 'item["name"] / [ ... for ... if ... ]',
        meaning:
          "Read a dictionary key; the list comprehension collects names only for records meeting its condition.",
      },
      {
        token: 'Path("inventory.json").read_text()',
        meaning:
          "Create a path object and call its read_text method to get file text. Parentheses call a function or method.",
      },
      {
        token: "json.loads(...) / return / print(...)",
        meaning:
          "Parse JSON text into Python values, return a value to a caller, and separately display a value on stdout.",
      },
      {
        token: '__name__ == "__main__"',
        meaning:
          "Run this block when the file is executed as the main program, rather than when imported for tests.",
      },
    ],
    expected:
      "With the inventory lesson’s web-1/running and worker-1/stopped JSON fixture beside the script, Python prints ['web-1']. Missing files, malformed JSON, and missing required keys produce different exceptions; a .json filename alone does not validate data.",
    question:
      "Does defining running_names immediately print the running names?",
    answer:
      "No. The definition creates a callable function. The main block calls it, receives its returned list, and passes that list to print.",
  },
  "sql-syntax": {
    id: "sql-syntax",
    title: "SQL queries go to a database engine",
    kind: "syntax",
    explanation:
      "SQL describes database operations. In this course, save the demonstrated Python sqlite3 program and run it with python3; its connection.execute call sends the SQL string to SQLite. Do not paste SELECT into a Bash prompt. SELECT chooses result expressions, FROM names a table, WHERE filters rows, and ORDER BY defines result ordering. A bare SQL example explains the query; it assumes the lesson has created its table and rows.",
    example:
      'rows = connection.execute(\n    "SELECT name FROM services WHERE healthy = ? ORDER BY name",\n    (0,),\n).fetchall()\nprint(rows)',
    parts: [
      {
        token: "connection.execute(...)",
        meaning:
          "Python asks the existing SQLite connection to execute SQL; this excerpt belongs inside query_inventory.py after setup.",
      },
      {
        token: "SELECT name FROM services",
        meaning: "Select the name column from each qualifying services row.",
      },
      {
        token: "WHERE healthy = ? / (0,)",
        meaning:
          "Bind the Python value 0 as data through a placeholder. The comma makes this a one-item tuple. Do not build SQL by concatenating an input value.",
      },
      {
        token: "ORDER BY name / .fetchall()",
        meaning:
          "Order the selected rows by name, then retrieve them as a Python list of result tuples.",
      },
      {
        token: "COUNT(*) / BEGIN / COMMIT / ROLLBACK",
        meaning:
          "Count qualifying rows, start a transaction, accept its changes, or undo the current transaction. These words are sent to SQLite, not run as shell programs.",
      },
    ],
    expected:
      "The query_inventory.py fixture returns operator's dashboard and worker, in order. The apostrophe stays data when bound as a parameter. Its in-memory database disappears when the program closes the connection.",
    question:
      "Can you run this excerpt alone at a Bash prompt to create a database?",
    answer:
      "No. It is Python source using an already-created SQLite connection and table. Save the complete lesson demo and launch that file with Python.",
  },
  "config-files": {
    id: "config-files",
    title: "Configuration text belongs in its named file",
    kind: "workflow",
    explanation:
      "Save configuration examples with a plain-text editor at the exact path named in the lesson. Terraform reads HCL from .tf files, Compose and Kubernetes read YAML, and Python’s json module reads JSON data. These formats are not Bash command lists. The consuming tool defines each field’s meaning and validation. A section labeled Dockerfile, index.html, or modules/label/main.tf names a distinct file; do not combine several labeled examples into one file.",
    example:
      'terraform {\n  required_version = ">= 1.4"\n}\nresource "terraform_data" "lab" {\n  input = "atlas-v1"\n}\noutput "label" {\n  value = terraform_data.lab.output\n}',
    parts: [
      {
        token: "main.tf",
        meaning:
          "Save this HCL example in the fresh local Terraform lesson directory. Then use terraform init, validate, and plan in that directory.",
      },
      {
        token: 'resource "terraform_data" "lab" { ... }',
        meaning:
          "Declare a resource type, a local label, and attributes in a block. This lesson uses only Terraform’s built-in local resource.",
      },
      {
        token: "YAML: key: value / indentation / -",
        meaning:
          "YAML uses mappings, nested indentation with spaces, and sequence entries. Preserve the lesson’s structure; a changed indent can change the meaning.",
      },
      {
        token: 'JSON: {"name":"web","port":8080}',
        meaning:
          "JSON objects use double-quoted keys, colons, and commas. Standard JSON has no comments or trailing commas; true, false, and null are lowercase.",
      },
      {
        token: "run: python3 -m unittest -v",
        meaning:
          "In a workflow YAML file, run is configuration whose value the runner later executes as a shell command. The surrounding YAML is still configuration.",
      },
    ],
    expected:
      "Pasting resource {...} into Bash does not configure Terraform. Saving valid main.tf and running the lesson’s validate/plan steps makes Terraform inspect that file. Validation proves structure; review the proposed plan to understand effects.",
    question:
      "Does changing a .yaml file automatically update a running service?",
    answer:
      "No. Save the file and follow that tool’s explicit validation and application steps. Different consumers decide when configuration is read.",
  },
  "workflow-reading": {
    id: "workflow-reading",
    title: "Recognize a diagram, plan, or placeholder",
    kind: "workflow",
    explanation:
      "Read design notes, numbered procedures, arrows, and pseudocode as explanations. They are not automatically runnable programs. Before acting, identify the actual program, environment, input, and intended observation. Uppercase words such as FILE, DIRECTORY, URL, and PID often stand for values you must choose; they are not usually text to copy literally. A # comment in Bash or Python explains nearby source, but an illustrative diagram may have no programming-language meaning at all.",
    example:
      "Browser → request → server\nBrowser ← response ← server\n\nObserve → form a hypothesis → choose a test → verify the result",
    parts: [
      {
        token: "→ / ←",
        meaning:
          "Show relationships or flow in a diagram; they are not Bash pipe operators.",
      },
      {
        token: "1. Open an editor",
        meaning:
          "A human action: open the actual editor application. Do not type the sentence into a terminal.",
      },
      {
        token: "FILE / URL / PID",
        meaning:
          "Instructional placeholders. Use the real saved file, reviewed local address, or freshly inspected process ID required by the lesson.",
      },
      {
        token: "# explanation",
        meaning:
          "A comment in languages that support #. The surrounding example’s language and location still matter.",
      },
      {
        token: "<<<<<<< / ======= / >>>>>>>",
        meaning:
          "Git conflict markers in a text file. Resolve the contents in an editor; do not run these lines as shell commands.",
      },
    ],
    expected:
      "You can explain which steps are observations, file edits, GUI actions, or terminal commands before starting. A design review can produce a diagram and evidence note without creating a running cloud system.",
    question:
      "Should you paste Browser → request → server into Ubuntu to send a request?",
    answer:
      "No. It is a diagram. Use the actual browser action or the lesson’s concrete HTTP command when instructed to perform a request.",
  },
  "gui-actions": {
    id: "gui-actions",
    title: "Create welcome.txt with real Windows applications",
    kind: "workflow",
    explanation:
      "File manager and Text editor are roles, not terminal commands. On Windows 11, use File Explorer to manage folders and Notepad to edit this note. Open File Explorer with Windows+E, navigate to your chosen personal documents folder, and create Atlas practice using New → Folder or Ctrl+Shift+N. Note that exact destination; a Documents folder may be synchronized by OneDrive. Show complete names using View → Show → File name extensions. Open Start, search for Notepad, and open the application. No terminal is required.",
    example:
      "1. In Notepad, type: My first Atlas evidence.\n2. Choose File → Save as; open your Atlas practice folder.\n3. Set File name to welcome.txt, choose the .txt text-document type and UTF-8 encoding, then Save.\n4. In File Explorer, verify the full name is welcome.txt, with exactly one .txt suffix.\n5. Close the note, then reopen that saved file from its folder.\n6. Change a sentence, press Ctrl+S, and reopen the file from that folder again.",
    parts: [
      {
        token: "File Explorer",
        meaning:
          "Windows’ file manager. A visible folder path and full filename establish where the file was saved.",
      },
      {
        token: "Notepad / Save as",
        meaning:
          "The editor creates the text; Save as chooses the folder, filename, file type, and encoding. Use the visible controls if your app version arranges them differently.",
      },
      {
        token: "Plain text / UTF-8",
        meaning:
          "A text format and a character encoding. Save actual text rather than a Word .docx or rich-text .rtf document renamed to .txt.",
      },
      {
        token: "welcome.txt",
        meaning:
          "The complete name. If it is welcome.txt.txt, correct the name in File Explorer with extensions visible and verify it again.",
      },
      {
        token: "Reopen the saved file",
        meaning:
          "Open it through the actual folder. Notepad can restore unsaved tabs, so a restored tab alone does not prove the file was saved at that path.",
      },
    ],
    expected:
      "File Explorer shows welcome.txt in the selected folder, and reopening that exact file shows the saved sentence and later edit. That proves file persistence; check synchronization separately if you need to establish online backup.",
    question:
      "A Notepad tab reappears after restarting. What extra check proves welcome.txt was actually saved?",
    answer:
      "Locate welcome.txt with extensions visible in the selected folder and open that file. Confirm its content and exact name, rather than relying on a restored tab or recent-files list.",
  },
  "browser-tools": {
    id: "browser-tools",
    title: "Use the browser address bar and Network panel",
    kind: "workflow",
    explanation:
      "These are actions in a desktop web browser such as Edge, Chrome, or Firefox. Type a web address into the address bar, not Ubuntu Bash. Open the browser’s developer tools from its menu and choose Network; menu placement and shortcuts vary. Keep that panel open while reloading a public documentation page, then select the document request. The panel observes the browser’s requests; it does not itself configure or repair the server.",
    example:
      "1. Open a public official documentation page without logging in.\n2. Read its full address in the browser’s address bar.\n3. Open Developer tools and select Network.\n4. Reload the page while Network is open.\n5. Select the document request and inspect its URL, method, status, and response headers.",
    parts: [
      {
        token: "https://example.com/lessons/start#practice",
        meaning:
          "An illustrative URL: https is the scheme, example.com the host, /lessons/start the path, and #practice the fragment. This invented path is not a promised working lesson.",
      },
      {
        token: "Address bar",
        meaning:
          "The browser field showing the current location. The page’s own search field is a different control.",
      },
      {
        token: "Network / reload",
        meaning:
          "Observe new requests while loading. A document can cause additional requests for scripts, styles, and images; the page is not necessarily one request.",
      },
      {
        token: "Status / headers",
        meaning:
          "Inspect the selected response. HTTP 404 still indicates an HTTP response; a transport failure may show an error instead of a response status.",
      },
      {
        token: "#fragment / browser storage",
        meaning:
          "The fragment is handled by the client and omitted from the HTTP request target. Browser storage and a server account are distinct places for application state.",
      },
    ],
    expected:
      "You can identify one document request and report its actual status and URL. Cache or service-worker handling may affect the observation; read the panel’s indication. Share only the needed result, excluding cookies, authorization headers, or personal parameters.",
    question:
      "Does Developer tools → Network mean you should type that phrase into a shell?",
    answer:
      "No. Open developer tools inside the browser and select its Network panel. The arrow describes interface navigation.",
  },
  "powershell-syntax": {
    id: "powershell-syntax",
    title: "PowerShell commands pass objects",
    kind: "syntax",
    explanation:
      "Run this in a Windows PowerShell tab, as required by the Windows lesson. Get-Process and Select-Object are cmdlets: PowerShell commands commonly named Verb-Noun. Cmdlets pass structured objects through |, so later commands select properties or filter values without parsing displayed columns. Bash and PowerShell have different variable, option, and pipeline rules; a Windows Terminal window can host either shell.",
    example:
      "$PSVersionTable.PSVersion\nGet-Location\nGet-Process | Select-Object -First 5 Name, Id\nGet-Service | Where-Object Status -eq Running",
    parts: [
      {
        token: "$PSVersionTable.PSVersion",
        meaning:
          "Read the PSVersion property from PowerShell’s version information.",
      },
      {
        token: "Get-Location",
        meaning: "Inspect this PowerShell session’s working location.",
      },
      {
        token: "Get-Process |",
        meaning:
          "Send process objects to the next cmdlet, rather than sending a screenshot of the printed process table.",
      },
      {
        token: "Select-Object -First 5 Name, Id",
        meaning:
          "Select at most five input objects and expose their Name and Id properties. -First is a named parameter, and 5 is its value.",
      },
      {
        token: "Where-Object Status -eq Running",
        meaning:
          "Keep service objects whose Status property equals Running. -eq is PowerShell’s equality operator in this filter.",
      },
    ],
    expected:
      "The version, working location, process names/IDs, and running services vary by machine and edition. These commands inspect Windows state. Record what you observe instead of trying to match another computer’s IDs.",
    question:
      "Why can Select-Object ask for Name and Id without identifying text-column positions?",
    answer:
      "It receives structured process objects with named properties. Formatting them as a display table happens separately.",
  },
  "command-substitution": {
    id: "command-substitution",
    title: "$(...) captures output as a value",
    kind: "syntax",
    explanation:
      "In Bash source or an Ubuntu Bash prompt, $(...) runs the enclosed commands in a subshell environment and substitutes their stdout, removing trailing newline characters. It captures text, not an exit status, and does not automatically capture stderr. Keep the value quoted when passing it on. A bare assignment containing command substitution has the substitution’s status, which lets the loop lesson check whether the read succeeded.",
    example:
      'file="logs/one.log"\nif ! lines=$(wc -l < "$file"); then\n  echo "Could not read a log" >&2\nelse\n  printf "%s: %s lines\\n" "$file" "$lines"\nfi',
    parts: [
      {
        token: '$(wc -l < "$file")',
        meaning:
          "Run the line counter, feed it the selected file, and capture its normal output.",
      },
      {
        token: "lines=$(...)",
        meaning:
          "Store the captured count text. No spaces surround =; assignment here does not require quoting the substitution to prevent word splitting.",
      },
      {
        token: "if ! ...; then",
        meaning:
          "Negate the assignment’s status so the error branch runs if reading or counting returned nonzero.",
      },
      {
        token: 'printf "%s: %s lines\\n" "$file" "$lines"',
        meaning:
          "Use a fixed format with two string placeholders and a newline. Quoted values stay separate arguments and cannot become format instructions.",
      },
    ],
    expected:
      "With one.log containing the lesson’s two newline-terminated lines, the report shows a count of 2. With an absent input file, the error branch runs; the diagnostic is not silently stored as a successful count.",
    question: 'Does lines=$(wc -l < "$file") put wc’s status into lines?',
    answer:
      "No. lines holds the text printed on stdout. Check the assignment’s status immediately or place it directly in a condition to determine success.",
  },
};
