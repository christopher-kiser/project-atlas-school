import type { Exercise, Lesson } from "./types";

const q = (
  id: string,
  kind: Exercise["kind"],
  prompt: string,
  answers: string[],
  hint: string,
  explanation: string,
  caseSensitive = true,
): Exercise => ({
  id,
  kind,
  prompt,
  answers,
  hint,
  explanation,
  caseSensitive,
});
const c = (
  command: string,
  purpose: string,
  example: string,
  caution?: string,
) => ({ command, purpose, example, caution });
const local =
  "Manually use your own Ubuntu WSL2 environment or disposable Ubuntu VM. Keep files under ~/atlas-labs/expanded. A Mac or Windows machine can be the client; use the Ubuntu shell for these Linux examples. The website executes nothing on your computer.";
const python = `${local} Python 3 must already be available. Use python3 --version to check; follow official installation guidance if missing. These lessons use the standard library and no paid API.`;

export const expanded: Lesson[] = [
  {
    id: "computing-basics",
    section: 0,
    title: "A computer, a program, and your first file",
    summary:
      "Start from zero: identify the environment, create a text file, and prove it exists outside the application that made it.",
    minutes: 30,
    status: "released",
    prerequisites: [],
    outcomes: [
      "Distinguish hardware, operating system, program, and data",
      "Locate a saved file and its extension",
      "Separate local storage from an account or online service",
    ],
    concepts: [
      {
        title: "Four layers, one everyday task",
        body: "Hardware supplies processing, memory, and storage. The operating system coordinates those resources. A program asks the operating system to do work. Data is the information that program reads or produces. When you write a note, the editor is the program and the saved text is data. Closing the editor does not erase a correctly saved file.",
      },
      {
        title: "Working memory is different from saved storage",
        body: "RAM holds active working data; it is not your long-term file archive. A save operation asks the program to write data to storage. A browser page can hold unsaved text only in memory, so a reload may lose it. A login does not by itself mean every local file or draft is synchronized.",
      },
      {
        title: "A name helps people choose the right data",
        body: "A filename has a name and often an extension, such as welcome.txt. The extension is a convention that helps software choose a format; renaming a picture to .txt does not turn its bytes into readable prose. Show extensions in your file manager so note.txt.txt does not surprise you.",
      },
      {
        title: "Start with inspection, not repair",
        body: "If a file seems missing, check whether you saved it, which folder was selected, and whether the application filters the displayed file type. Reopen the exact path in a second view before claiming the file is gone. Do not delete unfamiliar folders while searching.",
      },
    ],
    commands: [
      c(
        "File manager",
        "Inspect actual names, folders, and extensions.",
        "Windows: File Explorer. macOS: Finder. Ubuntu: Files.",
      ),
      c(
        "Text editor",
        "Create plain text, save it, close it, and reopen it.",
        "Save as welcome.txt in your own Atlas practice folder.",
        "Use plain text, not a word-processing document with a disguised extension.",
      ),
    ],
    demo: {
      title: "The smallest useful persistence test",
      code: "1. Open a plain-text editor.\n2. Type: My first Atlas evidence.\n3. Save welcome.txt into an Atlas practice folder.\n4. Close the editor.\n5. Locate welcome.txt in the file manager.\n6. Reopen it and compare the sentence.",
      explanation:
        "The observation after reopening proves that this file’s text survived closing the editor. It does not prove a cloud backup exists. Write down the folder location as part of the evidence.",
    },
    practice: [
      "Point to one piece of hardware, your operating system, the editor, and the text data.",
      "Enable filename extensions in the file manager and inspect welcome.txt.",
      "Make an unsaved edit, then use the editor’s save prompt to preserve it deliberately.",
    ],
    exercises: [
      q(
        "compute-os",
        "recall",
        "What software layer coordinates hardware resources for programs?",
        ["operating system", "os"],
        "It is Windows, macOS, or Linux in this course.",
        "The operating system manages resources and exposes services to programs.",
        false,
      ),
      q(
        "compute-memory",
        "recall",
        "Which term names active working memory: RAM or a saved text file?",
        ["ram"],
        "It is volatile working memory.",
        "RAM holds active state; saving writes data to storage.",
        false,
      ),
      q(
        "compute-extension",
        "predict",
        "What extension does welcome.txt use? Include the dot.",
        [".txt"],
        "Read the suffix.",
        "The extension is .txt; the full filename still matters.",
      ),
      q(
        "compute-missing",
        "diagnose",
        "An editor says a file was saved, but you cannot find it. Inspect the selected folder or reinstall the operating system?",
        ["inspect the selected folder", "selected folder", "folder"],
        "Begin with the smallest plausible location mistake.",
        "Confirm the save destination and displayed file types before changing the machine.",
        false,
      ),
    ],
    lab: {
      title: "Prove a file survives an application restart",
      environment:
        "Any personal Windows, macOS, or Ubuntu computer with a plain-text editor. No terminal, account, installation, or payment is required.",
      scenario:
        "A teammate needs a simple note they can locate again after closing the editor.",
      steps: [
        "Create an Atlas practice folder inside your personal documents area.",
        "Save welcome.txt with two sentences: your learning goal and the folder’s location.",
        "Close the editor and reopen the file through the file manager.",
        "Edit the second sentence, save, and reopen again.",
        "Capture a screenshot or write the exact filename, extension, location, and observed contents. Redact personal path details if sharing.",
      ],
      evidence: [
        "Filename and storage location",
        "Before and after content",
        "Explanation of editor versus file versus operating system",
      ],
      rubric: [
        "Uses a real saved plain-text file",
        "Reopens and verifies the changed content",
        "Explains what is local and what is not backed up",
      ],
      hints: [
        "The Save As dialog shows the destination folder.",
        "A recent-files list is convenient, but verify the underlying folder too.",
      ],
      solution:
        "Create a plain-text .txt file, save it explicitly, close the editor, and reopen that same file by its folder path. Compare the saved sentence after each change. Report storage persistence separately from online backup.",
      challenge:
        "Tomorrow, locate the file without relying on the editor’s recent-files list. Explain how you know you opened the same file.",
    },
    resourceIds: ["engineering", "linux-foundation"],
  },
  {
    id: "web-foundations",
    section: 0,
    title: "What happens when you open a website?",
    summary:
      "Trace a browser request and distinguish the page, its address, its server, and your local browser data.",
    minutes: 35,
    status: "released",
    prerequisites: ["computing-basics"],
    outcomes: [
      "Read a URL’s scheme, host, and path",
      "Explain client, server, request, and response",
      "Distinguish a browser cache, local progress, and a server account",
    ],
    concepts: [
      {
        title: "A browser is a client",
        body: "A client requests something; a server responds. A browser can request an HTML document, then request styles, images, and scripts referenced by that document. HTML describes content, CSS controls presentation, and JavaScript can change behavior. A page is often many requests rather than one file.",
      },
      {
        title: "Read an address before trusting it",
        body: "In https://example.com/lessons/start, https is the scheme, example.com is the host, and /lessons/start is the path. A fragment beginning with # identifies client-side page state and is not sent as part of an HTTP request target. HTTPS protects the connection and authenticates the named server through certificates; it does not guarantee that every claim on a page is true.",
      },
      {
        title: "Storage has an owner and a scope",
        body: "A browser cache keeps reusable responses. Cookies and browser databases can store site-related state. An account may connect to server storage, but an application must actually implement synchronization. Two browsers or two site origins generally do not share the same local progress. Exporting a backup is an explicit transfer, not automatic synchronization.",
      },
      {
        title: "Observe the failing boundary",
        body: "A missing Internet connection, a DNS failure, a server error, and a JavaScript error can all look like a broken page. Start with the exact address and message. Browser developer tools can show requests and response status. Do not enter passwords into a look-alike host while trying random links.",
      },
    ],
    commands: [
      c(
        "Browser address bar",
        "Inspect the scheme, host, path, and fragment.",
        "https://example.com/lessons/start#practice",
      ),
      c(
        "Developer tools → Network",
        "Observe requests and response status without modifying the site.",
        "Open the Network panel, reload a public documentation page, and select the document request.",
        "Do not publish cookies, authorization headers, or personal query parameters.",
      ),
    ],
    demo: {
      title: "An address is a set of parts",
      code: "https://example.com/lessons/start#practice\n└scheme┘ └──host───┘ └────path────┘ └fragment┘\n\nBrowser → request → server\nBrowser ← response ← server\nBrowser storage stays in this browser unless the app synchronizes it.",
      explanation:
        "example.com is an example host. The /lessons/start path is illustrative, so do not expect it to contain a real lesson. Analyze the address rather than infer content from its spelling.",
    },
    practice: [
      "Identify the host in the address of this school.",
      "Find the difference between refresh and closing a tab.",
      "Read the school’s storage description and name how progress moves to another computer.",
    ],
    exercises: [
      q(
        "web-client",
        "recall",
        "In a normal web request, is the browser the client or the server?",
        ["client"],
        "It asks for the resource.",
        "The browser acts as a client for that exchange.",
        false,
      ),
      q(
        "web-host",
        "predict",
        "What is the host in https://example.com/lesson?id=3?",
        ["example.com"],
        "It follows the scheme and precedes the next slash.",
        "The host is example.com; the path and query are separate.",
      ),
      q(
        "web-style",
        "recall",
        "Which web language primarily controls presentation and layout?",
        ["css"],
        "HTML structures content; this layer styles it.",
        "CSS controls styling and layout rules.",
        false,
      ),
      q(
        "web-backup",
        "diagnose",
        "You saved local school progress in Browser A. What explicit file operation moves it to Browser B when sync is absent?",
        [
          "export and import",
          "export/import",
          "export progress and import progress",
        ],
        "Create a backup, then load it in the other browser.",
        "Export/import moves the saved data deliberately; login alone is not proof of synchronization.",
        false,
      ),
    ],
    lab: {
      title: "Inspect a real request without exposing private data",
      environment:
        "A desktop browser. Use a public official documentation page with no login. No account or paid tool is required.",
      scenario:
        "Explain to a beginner which parts of a website live in the browser and which arrive from a server.",
      steps: [
        "Open a public documentation link from the resource library.",
        "Write down its scheme, host, and path.",
        "Open developer tools and the Network panel, then reload.",
        "Select the main document request and record its status; identify one separate image, style, or script request if present.",
        "Write a short explanation of what the observations prove and why local progress on another origin is separate.",
      ],
      evidence: [
        "Redacted URL decomposition",
        "Document status and one dependent request",
        "A client/server/storage explanation",
      ],
      rubric: [
        "Identifies the URL parts correctly",
        "Records actual observations rather than invented statuses",
        "Distinguishes downloaded content from persistent local learning data",
      ],
      hints: [
        "Some pages reuse cached content; the panel may report cache activity.",
        "Screenshots should exclude headers containing private tokens.",
      ],
      solution:
        "Inspect the address and Network panel on a public page. Record the main document and a dependent request. Explain that the browser renders responses and can keep origin-scoped local state; server synchronization requires explicit application behavior.",
      challenge:
        "Explain why a valid HTTPS connection to the wrong host is still the wrong destination. Then describe how you would back up this school’s progress before changing computers.",
    },
    resourceIds: ["mdn", "network", "security"],
  },
  {
    id: "editor-workflow",
    section: 1,
    title: "Save, run, and diagnose a tiny program",
    summary:
      "Connect a text editor, the filesystem, and a terminal using one small Python file.",
    minutes: 35,
    status: "released",
    prerequisites: ["computing-basics", "terminal-files"],
    outcomes: [
      "Distinguish source text from program output",
      "Run the file you actually edited",
      "Read a syntax error and verify a precise correction",
    ],
    concepts: [
      {
        title: "Source text is an instruction document",
        body: "A program file contains source code that a language implementation can interpret or compile. Editing the source does not automatically run it. The terminal’s current directory affects relative filenames. Save the file, confirm its path, then ask the correct program to run it.",
      },
      {
        title: "Plain text and punctuation matter",
        body: "An editor for code saves plain text. Smart quotes from a word processor can be different characters from programming quotes. Python uses indentation to group statements. A filename ending .py.txt can look right in a file manager that hides extensions but is a different path from hello.py.",
      },
      {
        title: "An error is a location clue",
        body: "A syntax error means the language could not understand the code structure. Read the filename, line, and message, inspect that line and the preceding one, and make one small correction. A corrected syntax error does not prove the resulting logic is useful; compare actual output with your intended result.",
      },
      {
        title: "Keep the work reproducible",
        body: "Write down the program version and exact run command. Do not assume the editor’s Run button uses the same interpreter or directory as your terminal. A terminal command makes those choices visible and is easier for another learner to repeat.",
      },
    ],
    commands: [
      c(
        "python3 --version",
        "Inspect the installed interpreter version.",
        "python3 --version",
      ),
      c("python3 FILE", "Run saved Python source.", "python3 hello.py"),
      c("cat FILE", "Inspect the exact saved text.", "cat hello.py"),
      c("pwd", "Verify the execution directory.", "pwd"),
    ],
    demo: {
      title: "Save this as hello.py",
      code: 'print("Atlas is running this file.")\nprint(2 + 3)',
      explanation:
        "Run python3 hello.py from the directory where you saved it. Expect two output lines: the sentence and 5. The quotation marks delimit text; 2 + 3 is an arithmetic expression.",
    },
    practice: [
      "Predict the output before running the program.",
      "Change the sentence, save, and run again.",
      "Remove one closing parenthesis, observe the syntax error, restore it, and repeat the original run.",
    ],
    exercises: [
      q(
        "editor-run",
        "recall",
        "Write the terminal command to run a saved file named hello.py with Python 3.",
        ["python3 hello.py"],
        "Program first, file second.",
        "The command explicitly selects Python 3 and the source path.",
      ),
      q(
        "editor-result",
        "predict",
        "What does print(2 + 3) output?",
        ["5"],
        "The expression is arithmetic.",
        "Python evaluates the addition before printing.",
      ),
      q(
        "editor-syntax",
        "diagnose",
        "Python cannot parse a missing closing parenthesis. What kind of error is this?",
        ["syntax error", "syntaxerror"],
        "It concerns the structure of the code.",
        "A syntax error prevents normal execution of the file.",
        false,
      ),
      q(
        "editor-location",
        "recall",
        "Which command shows the directory used to resolve hello.py?",
        ["pwd"],
        "Print the working directory.",
        "Relative paths depend on this shell’s current directory.",
      ),
    ],
    lab: {
      title: "Prove you edited and ran the same file",
      environment: python,
      scenario:
        "A learner says the program ignores their edit. Build a repeatable edit/save/run loop and reproduce one actual error.",
      steps: [
        "Create ~/atlas-labs/expanded/editor and open it in your editor.",
        "Save the demo as hello.py and inspect it using cat.",
        "Run it and compare both output lines with your prediction.",
        "Deliberately remove a parenthesis, save, and capture the error.",
        "Correct only the syntax, save, run again, and capture the restored output.",
        "Record the path, Python version, and command so another learner can reproduce the result.",
      ],
      evidence: [
        "Saved source and exact run command",
        "One syntax error and the repaired output",
        "Explanation of editor buffer versus saved file",
      ],
      rubric: [
        "Runs the file from the documented path",
        "Uses a deliberate harmless failure",
        "Verifies the intended output after the repair",
      ],
      hints: [
        "An unsaved editor buffer can differ from cat output.",
        "Do not type Python source directly at a Bash prompt; save it in the .py file.",
      ],
      solution:
        "mkdir -p ~/atlas-labs/expanded/editor\ncd ~/atlas-labs/expanded/editor\n# Save the demo in hello.py using your editor.\npwd\npython3 --version\ncat hello.py\npython3 hello.py\n# Introduce, observe, then repair the missing parenthesis in the editor.\npython3 hello.py",
      challenge:
        "Create a second program that prints a label and 7 multiplied by 6. Give only the saved file and run instructions to another person.",
    },
    resourceIds: ["python", "engineering"],
  },
  {
    id: "bash-values",
    section: 6,
    title: "Keep shell values intact",
    summary:
      "Use variables, arguments, quoting, and environment variables without turning data into accidental commands.",
    minutes: 40,
    status: "released",
    prerequisites: ["terminal-control", "git-basics"],
    outcomes: [
      "Assign and expand a variable",
      "Preserve spaces with double quotes",
      "Distinguish positional arguments from exported environment values",
    ],
    concepts: [
      {
        title: "A variable gives a value a name",
        body: 'In Bash, report="incident notes.txt" assigns a value; spaces around = would change the command. "$report" expands the value as one argument. Unquoted expansion can split words and expand wildcard characters, so a filename with spaces can unexpectedly become several arguments.',
      },
      {
        title: "Quotes choose what the shell interprets",
        body: "Single quotes preserve literal text. Double quotes preserve argument boundaries while still allowing variable expansion. In echo \"$HOME\", the variable expands. In echo '$HOME', the dollar sign and name remain literal. Quoting is about the shell’s parsing, not secrecy.",
      },
      {
        title: "Inputs cross a process boundary",
        body: "$1 is the first positional argument passed to a script. $# counts arguments. An exported variable is inherited by child processes; an ordinary shell variable is not automatically exported. Use environment values for configuration, but do not store secret values in examples, command history, or submitted evidence.",
      },
      {
        title: "Inspect the argument before doing work",
        body: "A script should explain which input it accepted and reject missing input before modifying files. Reproduce unexpected behavior with a harmless filename containing spaces, then quote the expansion and repeat. Do not use eval to make arbitrary user input behave like code.",
      },
    ],
    commands: [
      c(
        "name=value",
        "Assign a shell value without spaces around =.",
        'report="incident notes.txt"',
      ),
      c(
        '"$name"',
        "Expand a value while preserving one argument.",
        'cat "$report"',
      ),
      c(
        "$1 / $#",
        "Read the first argument and argument count.",
        'echo "Argument count: $#"',
      ),
      c(
        "export",
        "Make a configuration value available to child processes.",
        "export ATLAS_MODE=practice",
      ),
    ],
    demo: {
      title: "Save as show-input.sh",
      code: '#!/usr/bin/env bash\nreport="incident notes.txt"\nprintf "Report: %s\\n" "$report"\nprintf "First argument: %s\\n" "$1"\nprintf "Argument count: %s\\n" "$#"',
      explanation:
        'Run bash show-input.sh "web service". The quoted phrase is one positional argument, so the count is 1. printf uses a fixed format and treats the value as data.',
    },
    practice: [
      'Run the demo with "web service", then with two unquoted words and compare the argument count.',
      "Print the literal text $HOME with single quotes.",
      "Export ATLAS_MODE=practice and inspect it in a child Bash using bash -c 'echo \"$ATLAS_MODE\"'.",
    ],
    exercises: [
      q(
        "bvalues-assign",
        "recall",
        "Assign the text web notes.txt to the Bash variable report using double quotes.",
        ['report="web notes.txt"'],
        "No spaces around the assignment operator.",
        "The quotes preserve the spaces inside the value.",
      ),
      q(
        "bvalues-count",
        "predict",
        'bash show-input.sh "web service" passes how many positional arguments to the script?',
        ["1", "one"],
        "Quoted spaces remain inside one argument.",
        "The argument count is one.",
        false,
      ),
      q(
        "bvalues-literal",
        "recall",
        "Write echo with single quotes to print literal $HOME without expansion.",
        ["echo '$HOME'"],
        "Single quotes suppress expansion.",
        "The output contains the dollar sign and the word HOME.",
      ),
      q(
        "bvalues-fix",
        "diagnose",
        "Complete the safe file-read command using variable report: cat ...",
        ['cat "$report"'],
        "Quote the expansion.",
        "Double quotes preserve the filename as one argument.",
      ),
    ],
    lab: {
      title: "Handle a filename containing spaces",
      environment: local,
      scenario:
        "Your reporting script fails when a ticket title contains spaces. Reproduce the parsing issue without deleting or overwriting evidence.",
      steps: [
        "Create ~/atlas-labs/expanded/bash-values and a harmless file named incident notes.txt.",
        "Save the demo and run it once with quoted input and once with unquoted input.",
        'Write a second script that sets report to the spaced filename and reads it with cat "$report".',
        "Demonstrate the unquoted cat expansion failing or addressing separate files, then repair it with quotes.",
        "Record both argument counts and explain why quoting fixed parsing rather than file permissions.",
      ],
      evidence: [
        "Scripts and observed argument counts",
        "Unquoted failure and quoted success",
        "Explanation of argument boundaries",
      ],
      rubric: [
        "Keeps all test files in the sandbox",
        "Uses fixed printf formats and quoted file expansions",
        "Explains why one value became multiple arguments",
      ],
      hints: [
        'Create the file using echo "harmless" > "incident notes.txt".',
        "Use bash script.sh to run the script before learning executable-file setup.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/expanded/bash-values\ncd ~/atlas-labs/expanded/bash-values\necho "harmless" > "incident notes.txt"\nreport="incident notes.txt"\ncat $report\ncat "$report"\n# Save show-input.sh from the demo.\nbash show-input.sh "web service"\nbash show-input.sh web service',
      challenge:
        "Use a new filename containing both a space and a literal asterisk. Read it through a quoted variable and explain why the asterisk must remain data.",
    },
    resourceIds: ["bash", "linux-man"],
  },
  {
    id: "bash-decisions",
    section: 6,
    title: "Validate input before choosing a branch",
    summary:
      "Use explicit conditions and exit statuses to make a small script fail clearly.",
    minutes: 45,
    status: "released",
    prerequisites: ["bash-values"],
    outcomes: [
      "Validate argument count and file readability",
      "Separate normal output from diagnostics",
      "Return meaningful status for success and failure",
    ],
    concepts: [
      {
        title: "A condition selects behavior",
        body: "An if statement runs one branch when a test succeeds and another when it fails. Bash [[ ... ]] supports tests such as -r for readable files and -f for regular files. Validate what the script actually needs; an existing directory is not necessarily valid input to a file parser.",
      },
      {
        title: "Error text and error status do different jobs",
        body: "People read stderr; calling programs inspect exit status. A message saying “failed” with exit 0 tells automation the operation succeeded. Choose documented nonzero statuses for invalid input and operational failure, and print diagnostics to descriptor 2.",
      },
      {
        title: "Check a command where it runs",
        body: "if grep -q PATTERN FILE; then ... directly tests grep’s status. Capturing $? after another command checks the wrong command. Some tools distinguish “no match” from “unable to read”; consult their documentation when your script must preserve that distinction.",
      },
      {
        title: "Recovery is a repeated failing case",
        body: "Test missing arguments, missing files, and a valid fixture. Fixing only the happy path leaves the caller unable to trust failures. Prefer explicit checks before adding complex shell options whose error behavior you cannot yet explain.",
      },
    ],
    commands: [
      c(
        "if / then / else / fi",
        "Choose a branch from a status or test.",
        'if [[ -r "$1" ]]; then\n  cat -- "$1"\nelse\n  echo "Unreadable input" >&2\n  exit 2\nfi',
      ),
      c("[[ $# -eq 1 ]]", "Check an exact argument count.", "[[ $# -eq 1 ]]"),
      c("exit", "Return a documented process status.", "exit 2"),
      c(
        ">&2",
        "Send a message to standard error.",
        'printf "Expected one file path\\n" >&2',
      ),
    ],
    demo: {
      title: "Save as read-report.sh",
      code: '#!/usr/bin/env bash\nif [[ $# -ne 1 ]]; then\n  printf "Usage: bash read-report.sh FILE\\n" >&2\n  exit 2\nfi\nif [[ ! -f "$1" || ! -r "$1" ]]; then\n  printf "Expected a readable regular file\\n" >&2\n  exit 3\nfi\ncat -- "$1"',
      explanation:
        "The first branch protects the use of $1. The second rejects directories and unreadable paths. The -- marker prevents a leading-dash filename from becoming an option. The final cat status becomes the script’s status, preserving a read failure that happens after validation.",
    },
    practice: [
      "Predict the status for no argument before running the script.",
      "Run it on a directory and explain why the -f condition matters.",
      "Capture stdout and stderr separately for an invalid input.",
    ],
    exercises: [
      q(
        "bdecision-count",
        "recall",
        "Write the Bash conditional test for exactly one argument.",
        ["[[ $# -eq 1 ]]"],
        "Compare argument count numerically.",
        "-eq performs an integer equality comparison.",
      ),
      q(
        "bdecision-status",
        "predict",
        'The script executes exit 3. What does echo "$?" immediately afterward print?',
        ["3"],
        "The caller receives the exit status.",
        "The explicit status is 3.",
      ),
      q(
        "bdecision-stderr",
        "recall",
        "Which redirection suffix sends printf output to stderr?",
        [">&2", "1>&2"],
        "Send descriptor 1 to descriptor 2.",
        "The diagnostic travels on standard error.",
      ),
      q(
        "bdecision-file",
        "diagnose",
        "Which Bash test requires a regular file: -f or -d?",
        ["-f"],
        "The other tests directories.",
        "-f distinguishes a regular file from a directory.",
      ),
    ],
    lab: {
      title: "Write a trustworthy read-only script",
      environment: local,
      scenario:
        "A caller needs to distinguish usage mistakes, invalid paths, and a successful report read.",
      steps: [
        "Create a fresh sandbox and save read-report.sh from the demo.",
        "Create a small report.txt fixture.",
        "Run with no argument, a nonexistent path, the current directory, and report.txt.",
        "Capture status immediately after each run.",
        "Capture one failing run’s stdout and stderr into different sandbox files.",
        "Explain why the script needs both a useful message and a nonzero status.",
      ],
      evidence: [
        "Four-case input/status table",
        "Separate output and error files",
        "Script and explanation of each branch",
      ],
      rubric: [
        "Rejects invalid argument count before using $1",
        "Rejects a directory as report input",
        "Preserves a successful file read and meaningful failure statuses",
        "Does not modify the source report",
      ],
      hints: [
        'A caller can run bash read-report.sh report.txt followed immediately by echo "$?".',
        "The validation check and the later read are separate operations; do not claim validation makes the filesystem immutable.",
      ],
      solution:
        'bash read-report.sh\necho "$?"\nbash read-report.sh absent.txt\necho "$?"\nbash read-report.sh .\necho "$?"\nbash read-report.sh report.txt\necho "$?"\nbash read-report.sh absent.txt > normal.txt 2> diagnostic.txt\ncat diagnostic.txt',
      challenge:
        "Add a documented rejection for an empty report while preserving the original valid-file behavior. Test an empty file and a file containing a newline.",
    },
    resourceIds: ["bash", "linux-man"],
  },
  {
    id: "bash-loops",
    section: 6,
    title: "Repeat a safe operation over files",
    summary:
      "Build a bounded report loop that handles spaces, skips empty matches, and avoids parsing ls output.",
    minutes: 45,
    status: "released",
    prerequisites: ["bash-decisions", "terminal-search"],
    outcomes: [
      "Iterate over a small file set",
      "Handle an unmatched glob deliberately",
      "Produce predictable counts without modifying source files",
    ],
    concepts: [
      {
        title: "A loop repeats one understandable step",
        body: "A for loop assigns each item to a variable and runs a body. First make the single-file operation correct, then repeat it. A small known fixture helps you predict every output row before using a larger directory.",
      },
      {
        title: "Filenames are not rows from ls",
        body: 'Filenames can contain spaces and other unusual characters. for f in $(ls) reparses display text and breaks names. A quoted directory prefix with an unquoted suffix glob, "$dir"/*.log, lets the shell enumerate matching names while keeping each expansion as a filename.',
      },
      {
        title: "An empty match needs an explicit decision",
        body: 'By default Bash can leave an unmatched pattern literally unchanged. Guard with [[ -f "$file" ]] || continue so the nonexistent pattern is skipped. This lesson intentionally processes regular files in one directory only; recursion is a different requirement.',
      },
      {
        title: "Counts depend on the definition",
        body: "grep -c ERROR reports matching-line count, not number of occurrences or requests. A line containing ERROR twice counts once. A no-match status is expected here, but a read error must not be silently reported as zero. We use wc -l on known readable fixture files for the first loop.",
      },
    ],
    commands: [
      c(
        "for / do / done",
        "Repeat a body over matching files.",
        'for file in "$dir"/*.log; do\n  [[ -f "$file" ]] || continue\n  wc -l < "$file"\ndone',
      ),
      c(
        "continue",
        "Skip the current item and move to the next.",
        '[[ -f "$file" ]] || continue',
      ),
      c(
        "printf",
        "Format the filename and count without reparsing it.",
        'printf "%s: %s lines\\n" "$file" "$lines"',
      ),
    ],
    demo: {
      title: "Save as count-logs.sh",
      code: '#!/usr/bin/env bash\nif [[ $# -ne 1 || ! -d "$1" ]]; then\n  echo "Usage: bash count-logs.sh DIRECTORY" >&2\n  exit 2\nfi\ndir="$1"\nfor file in "$dir"/*.log; do\n  [[ -f "$file" ]] || continue\n  if ! lines=$(wc -l < "$file"); then\n    echo "Could not read a log" >&2\n    exit 3\n  fi\n  printf "%s: %s lines\\n" "$file" "$lines"\ndone',
      explanation:
        "The command substitution captures the count. Quoting preserves each filename. Files without a final newline can make wc -l smaller than a human’s visual line count, so the fixtures deliberately end every line with a newline.",
    },
    practice: [
      "Create one.log with two lines and web errors.log with three.",
      "Predict the output set without relying on a particular display order.",
      "Run against an empty directory and explain why no literal *.log row appears.",
    ],
    exercises: [
      q(
        "bloop-end",
        "recall",
        "Which keyword closes a Bash for loop?",
        ["done"],
        "A loop begins its body with do.",
        "done ends the loop body.",
      ),
      q(
        "bloop-count",
        "predict",
        "A file has three newline characters. What does wc -l < file report?",
        ["3"],
        "Count newline characters.",
        "wc -l counts three newlines.",
      ),
      q(
        "bloop-skip",
        "recall",
        "Which Bash keyword skips the rest of the current loop iteration?",
        ["continue"],
        "It continues with the next item.",
        "continue skips the current iteration rather than ending the whole script.",
      ),
      q(
        "bloop-space",
        "diagnose",
        "Complete the safe read of the current filename variable: wc -l < ...",
        ['wc -l < "$file"'],
        "Quote the filename expansion.",
        "Quoting keeps a spaced name intact.",
      ),
    ],
    lab: {
      title: "Summarize logs without changing them",
      environment: local,
      scenario:
        "An operator needs line counts for each .log file in a folder that includes spaces in filenames.",
      steps: [
        "Create a fresh logs folder and an empty folder under ~/atlas-labs/expanded/bash-loops.",
        "Use printf to create two known newline-terminated log fixtures and one .txt neighbor.",
        "Save and run the loop on the logs folder.",
        "Verify only .log files appear and their counts match the fixtures.",
        "Run against the empty directory and a missing directory; distinguish empty success from invalid input.",
        "Read the fixtures again to prove the script did not modify them.",
      ],
      evidence: [
        "Script and known fixture contents",
        "Output for populated, empty, and missing directories",
        "Explanation of quoted names and the guard",
      ],
      rubric: [
        "Handles the spaced filename as one item",
        "Skips non-log files and unmatched patterns",
        "Distinguishes empty input set from a bad directory",
        "Preserves source contents",
      ],
      hints: [
        'printf "one\\ntwo\\n" creates two newline-terminated lines.',
        "Do not replace the glob with command substitution around ls.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/expanded/bash-loops/logs ~/atlas-labs/expanded/bash-loops/empty\ncd ~/atlas-labs/expanded/bash-loops\nprintf "one\\ntwo\\n" > logs/one.log\nprintf "a\\nb\\nc\\n" > "logs/web errors.log"\necho "keep" > logs/keep.txt\n# Save count-logs.sh, then:\nbash count-logs.sh logs\nbash count-logs.sh empty\necho "$?"\nbash count-logs.sh absent\necho "$?"',
      challenge:
        "Extend the script to report total newline count after processing all matching logs. Test zero, one, and two files, and explain your no-match behavior.",
    },
    resourceIds: ["bash", "linux-man"],
  },
  {
    id: "bash-functions",
    section: 6,
    title: "Package a safe operation as a function",
    summary:
      "Build a reusable copy helper with local variables, explicit return values, and a restore check.",
    minutes: 45,
    status: "released",
    prerequisites: ["bash-loops", "linux-permissions"],
    outcomes: [
      "Explain function arguments and return status",
      "Keep internal variables local",
      "Refuse an overwrite and prove a copied file can be read back",
    ],
    concepts: [
      {
        title: "A function names one responsibility",
        body: "A Bash function groups commands that accomplish one task. It receives its own positional arguments. A function should have a clear input, effect, output, and failure contract. Keep it small enough that a reviewer can explain every mutation.",
      },
      {
        title: "Local state prevents surprising interference",
        body: 'local source="$1" keeps a helper’s source variable inside the function. Without local, changing a common variable name can change the caller’s state. return ends a function and sets its status; exit ends the script or shell process. A helper should usually return so its caller can decide what to do.',
      },
      {
        title: "A copy needs an overwrite policy",
        body: "The helper below requires a readable source and a nonexistent destination. It refuses a repeat that would overwrite an earlier copy. This is a cautious learning contract, not a concurrent-safe backup system: another process could change paths between checks. Production backup systems need stronger coordination and retention design.",
      },
      {
        title: "Recovery is part of the definition",
        body: "A successful copy command does not establish useful recovery. Read the copy, compare its checksum with the source, then restore it to a fresh filename and compare again. Backups of live databases need database-aware consistency handling rather than a blind file copy.",
      },
    ],
    commands: [
      c(
        "function_name() { ...; }",
        "Name a reusable shell operation.",
        'copy_report() {\n  local source="$1"\n  local target="$2"\n  cp -i -- "$source" "$target"\n}',
      ),
      c("local", "Limit a variable to a function.", 'local source="$1"'),
      c("return", "Finish the function with a status.", "return 3"),
      c(
        "sha256sum",
        "Compare file content with a digest.",
        "sha256sum original.txt copied.txt",
        "Matching hashes support byte equality, not independent trust in the original data.",
      ),
    ],
    demo: {
      title: "Save as copy-report.sh",
      code: '#!/usr/bin/env bash\ncopy_report() {\n  if [[ $# -ne 2 ]]; then return 2; fi\n  local source="$1"\n  local target="$2"\n  if [[ ! -f "$source" || ! -r "$source" || -e "$target" ]]; then\n    echo "Source invalid or target already exists" >&2\n    return 3\n  fi\n  cp -i -- "$source" "$target"\n}\ncopy_report "$@"',
      explanation:
        '"$@" passes each caller argument as its own argument, preserving spaces. The final function status becomes the script status. -- ends option parsing for cp so a filename beginning with a dash is not interpreted as an option.',
    },
    practice: [
      "Call the helper with two quoted paths and inspect status.",
      "Repeat the same call and predict the refusal.",
      "Explain why replacing return with exit changes a reusable helper’s contract.",
    ],
    exercises: [
      q(
        "bfunction-local",
        "recall",
        "Which Bash keyword confines a variable to a function?",
        ["local"],
        "Declare it at the function boundary.",
        "local reduces accidental interference with the caller.",
      ),
      q(
        "bfunction-return",
        "recall",
        "Which keyword exits a function while allowing its caller to continue?",
        ["return"],
        "It returns a status.",
        "return differs from exit, which ends the shell process.",
      ),
      q(
        "bfunction-args",
        "recall",
        "Which quoted Bash expansion forwards every positional argument separately?",
        ['"$@"'],
        "The at-sign preserves one item per argument.",
        '"$@" keeps the original argument boundaries.',
      ),
      q(
        "bfunction-refuse",
        "predict",
        "The demo target already exists. Which status does the helper return?",
        ["3"],
        "Read the guarded failure branch.",
        "The helper returns 3 before invoking cp.",
      ),
    ],
    lab: {
      title: "Copy, refuse overwrite, and restore",
      environment: local,
      scenario:
        "A report must be copied without overwriting yesterday’s evidence, and its recovery must be tested.",
      steps: [
        "Create a fresh ~/atlas-labs/expanded/bash-functions directory and save the helper there.",
        "Create original.txt containing three known lines.",
        "Copy it to evidence-copy.txt and compare checksums.",
        "Repeat the same copy request and record the refusal status.",
        "Copy evidence-copy.txt to a fresh restored.txt and read it.",
        "Verify source, copy, and restore hashes match, and explain what this does not establish about live-database backups.",
      ],
      evidence: [
        "Helper source and call/status transcript",
        "Three matching file hashes",
        "Repeated-call refusal and restore content",
      ],
      rubric: [
        "Preserves both source and earlier copy",
        "Handles all paths as arguments rather than code",
        "Returns documented failures",
        "Demonstrates a readable restore",
      ],
      hints: [
        "Use a fresh destination for the restore.",
        "Inspect $? immediately after the refused operation.",
      ],
      solution:
        'printf "one\\ntwo\\nthree\\n" > original.txt\nbash copy-report.sh original.txt evidence-copy.txt\nsha256sum original.txt evidence-copy.txt\nbash copy-report.sh original.txt evidence-copy.txt\necho "$?"\nbash copy-report.sh evidence-copy.txt restored.txt\ncat restored.txt\nsha256sum original.txt evidence-copy.txt restored.txt',
      challenge:
        "Without the solution, change the helper to emit a clear usage diagnostic for the wrong argument count. Keep its overwrite policy and verify that every failure leaves earlier evidence intact.",
    },
    resourceIds: ["bash", "security"],
  },
  {
    id: "python-data",
    section: 7,
    title: "Turn an inventory into useful data",
    summary:
      "Use Python values, lists, dictionaries, loops, and functions to answer a concrete operations question.",
    minutes: 45,
    status: "released",
    prerequisites: ["editor-workflow", "terminal-control"],
    outcomes: [
      "Choose a list for repeated records and a dictionary for named fields",
      "Distinguish text, integers, and booleans",
      "Write a function that returns a filtered result",
    ],
    concepts: [
      {
        title: "Types affect what an operation means",
        body: '"3" is text; 3 is an integer. Text addition joins strings, while integer addition performs arithmetic. True and False represent boolean values. Converting external text into numbers should be an explicit decision with error handling, not an assumption that every input is valid.',
      },
      {
        title: "Collections describe a shape",
        body: 'A list holds an ordered sequence. A dictionary maps keys to values. A service record can be {"name": "web", "healthy": True}; a list can hold several service records. Index 0 selects the first list element. A missing dictionary key raises an error, which is useful when a required field is absent.',
      },
      {
        title: "A function returns a result",
        body: "def names_needing_attention(records): defines a reusable computation. A return statement gives a result to its caller. Printing shows a value to a person; it does not replace returning structured data. Keep the calculation separate from display so you can test it later.",
      },
      {
        title: "Test boundaries, not only one familiar fixture",
        body: "Use zero records, all healthy records, and one unhealthy record. If a result is wrong, inspect the input types and the condition before rewriting the whole function. Predict the expected list first and compare it with the actual return value.",
      },
    ],
    commands: [
      c(
        "python3 inventory.py",
        "Run the saved inventory program.",
        "python3 inventory.py",
      ),
      c(
        "list / dict",
        "Represent repeated records and named fields.",
        'services = [{"name": "web", "healthy": True}]',
      ),
      c(
        "def / return",
        "Define a calculation that returns data.",
        "def double(value):\n    return value * 2",
      ),
    ],
    demo: {
      title: "Save as inventory.py",
      code: 'def names_needing_attention(records):\n    result = []\n    for record in records:\n        if not record["healthy"]:\n            result.append(record["name"])\n    return result\n\nservices = [\n    {"name": "web", "healthy": True},\n    {"name": "worker", "healthy": False},\n]\nprint(names_needing_attention(services))',
      explanation:
        "The result is ['worker']. The function iterates over records, checks each boolean, and appends only unhealthy names. It does not contact those services; the input is a local fixture.",
    },
    practice: [
      "Predict the result for an empty list.",
      "Change both healthy values to True and compare output.",
      "Replace a required key with a misspelling and inspect the resulting error before repairing the data.",
    ],
    exercises: [
      q(
        "pydata-list",
        "recall",
        "Which Python collection represents an ordered sequence of service records?",
        ["list"],
        "Its literal form uses square brackets.",
        "A list preserves the sequence of records.",
        false,
      ),
      q(
        "pydata-index",
        "predict",
        'What is services[0]["name"] for the demo fixture?',
        ["web"],
        "Indexing begins at zero.",
        "The first record names web.",
      ),
      q(
        "pydata-return",
        "recall",
        "Which Python keyword gives a computed result back to the caller?",
        ["return"],
        "Printing and returning are different.",
        "return supplies a value that another function can use.",
      ),
      q(
        "pydata-empty",
        "predict",
        "What list does names_needing_attention([]) return?",
        ["[]"],
        "The loop has no records to append.",
        "The initially empty result remains empty.",
      ),
    ],
    lab: {
      title: "Summarize a small service inventory",
      environment: python,
      scenario:
        "An operator wants a list of services requiring attention without mixing the calculation with terminal output.",
      steps: [
        "Create ~/atlas-labs/expanded/python-data and save inventory.py.",
        "Run the original fixture and compare with a written prediction.",
        "Add a third unhealthy record with a different name.",
        "Test empty, all-healthy, and mixed input lists.",
        "Introduce one misspelled required key, record the error, then repair it.",
        "Explain why this program summarizes supplied data but does not prove actual endpoint health.",
      ],
      evidence: [
        "Function source",
        "Expected/actual results for three boundary cases",
        "The key error and repaired result",
      ],
      rubric: [
        "Returns a list instead of only printing inside the function",
        "Selects unhealthy records correctly",
        "Handles an empty list",
        "States the limit of fixture-based evidence",
      ],
      hints: [
        "Use print(names_needing_attention([])) for the empty case.",
        "A dictionary key must match exactly, including capitalization.",
      ],
      solution:
        "Use the demo function unchanged, then call it with [], with only healthy records, and with both healthy and unhealthy records. The expected results are [], [], and the names of the unhealthy records in input order. Repair the misspelled field in the fixture rather than suppressing every exception.",
      challenge:
        "Write a separate function that counts healthy records. Test zero, one, and several records without consulting the demo function.",
    },
    resourceIds: ["python"],
  },
  {
    id: "python-files-json",
    section: 7,
    title: "Read configuration without trusting its shape",
    summary:
      "Load JSON from a file, validate its fields, and report useful errors without hiding them.",
    minutes: 50,
    status: "released",
    prerequisites: ["python-data"],
    outcomes: [
      "Read UTF-8 text and decode JSON",
      "Distinguish syntax validity from schema validity",
      "Catch expected input failures while preserving a nonzero status",
    ],
    concepts: [
      {
        title: "JSON is text with a defined structure",
        body: "JSON represents objects, arrays, strings, numbers, booleans, and null. Python json.loads converts JSON text into Python values. A syntactically valid JSON document can still have the wrong shape for your application: a list is not the configuration object you expected.",
      },
      {
        title: "A file read can fail before parsing",
        body: "Path.read_text reads the named file using an explicit encoding. The file may be missing, unreadable, or contain invalid encoding. Separate the file path from its content and report the operation that failed. Never paste secret production configuration into a learning submission.",
      },
      {
        title: "Validation makes assumptions visible",
        body: "The demo requires an object with a name string and an integer port from 1 through 65535. Exact type checking rejects booleans as ports even though Python booleans have an integer relationship. Validation is an application contract, not a guarantee that a network listener exists on that port.",
      },
      {
        title: "Handle the expected failure, then stop",
        body: "Catch specific input-related exceptions, print a concise diagnostic to stderr, and exit nonzero. Catching every exception and continuing with a fake success report makes failures harder to diagnose. Use separate valid, malformed, and wrong-shape fixtures to test each boundary.",
      },
    ],
    commands: [
      c(
        "Path.read_text",
        "Read a known local text file with explicit encoding.",
        'text = Path("config.json").read_text(encoding="utf-8")',
      ),
      c(
        "json.loads",
        "Decode JSON text into Python values.",
        "config = json.loads(text)",
      ),
      c(
        "json.dumps",
        "Encode a result as JSON for another tool.",
        'print(json.dumps({"validated": True}))',
      ),
      c(
        "raise ValueError",
        "Reject a value that violates the application contract.",
        'raise ValueError("port must be an integer from 1 to 65535")',
      ),
    ],
    demo: {
      title:
        'Save as validate_config.py; config.json holds {"name":"web","port":8080}',
      code: 'import json\nimport sys\nfrom pathlib import Path\n\ntry:\n    config = json.loads(Path("config.json").read_text(encoding="utf-8"))\n    if not isinstance(config, dict):\n        raise ValueError("configuration must be an object")\n    if not isinstance(config.get("name"), str) or not config["name"]:\n        raise ValueError("name must be nonempty text")\n    port = config.get("port")\n    if type(port) is not int or not 1 <= port <= 65535:\n        raise ValueError("port must be an integer from 1 to 65535")\nexcept (OSError, UnicodeError, ValueError) as error:\n    print(f"Invalid configuration: {error}", file=sys.stderr)\n    sys.exit(2)\nprint(json.dumps({"name": config["name"], "port": port, "validated": True}))',
      explanation:
        "JSON decoding errors are ValueError subclasses. The final success output is reached only after every check. It reports validation of local data, not a running web service.",
    },
    practice: [
      "Use a JSON boolean true as port and predict rejection.",
      "Remove a quote to produce a syntax error.",
      "Replace the entire object with [] and explain why valid JSON is still rejected.",
    ],
    exercises: [
      q(
        "pyjson-decode",
        "recall",
        "Which Python function decodes a string of JSON text?",
        ["json.loads"],
        "The s indicates a string input.",
        "json.loads decodes text; json.load reads from a file object.",
      ),
      q(
        "pyjson-shape",
        "diagnose",
        "config.json contains []. What Python type results from decoding it?",
        ["list"],
        "JSON arrays become this collection.",
        "The file is valid JSON but violates the required object shape.",
        false,
      ),
      q(
        "pyjson-port",
        "predict",
        "The port value is 70000. Which exit status does the demo use?",
        ["2"],
        "The value violates the allowed range.",
        "Validation rejects it and exits with status 2.",
      ),
      q(
        "pyjson-stderr",
        "recall",
        "In print(message, file=...), which sys object sends diagnostics to stderr?",
        ["sys.stderr"],
        "Use the standard error stream.",
        "sys.stderr keeps diagnostics separate from machine-readable stdout.",
      ),
    ],
    lab: {
      title: "Build a configuration test table",
      environment: python,
      scenario:
        "A tool must reject invalid configuration instead of reporting a healthy service based on malformed input.",
      steps: [
        "Create a fresh JSON lab directory and save the validator.",
        "Create a valid fixture and capture its JSON output and status.",
        "Test malformed JSON, an array instead of an object, a missing name, and an out-of-range port.",
        "For each test, preserve the fixture and record the expected/actual status.",
        "Rename the input fixture to reproduce a missing-file error, then restore it.",
        "Repeat the original valid case and explain the exact limit of the validated:true claim.",
      ],
      evidence: [
        "Five input fixtures or their exact text",
        "Expected/actual status table",
        "Separated success output and failure diagnostics",
      ],
      rubric: [
        "Rejects both syntax and shape errors",
        "Produces nonzero status on expected failures",
        "Restores and reruns the original valid case",
        "Does not equate configuration validation with endpoint health",
      ],
      hints: [
        "Keep copies named valid.json and wrong-shape.json, then copy the selected fixture to config.json.",
        "Read $? immediately after python3 validate_config.py.",
      ],
      solution:
        'Run the demo against {"name":"web","port":8080}; expect status 0. Run against malformed JSON, [], {"port":8080}, and {"name":"web","port":70000}; expect status 2 with a diagnostic. Restore the valid input and rerun. Keep the configuration file local and harmless.',
      challenge:
        "Add a required environment field limited to dev or test. Reject prod in this learning tool and document why an allowlist is clearer than accepting arbitrary text.",
    },
    resourceIds: ["python", "security"],
  },
  {
    id: "python-http-api",
    section: 7,
    title: "Fetch JSON with a timeout and a clear failure contract",
    summary:
      "Build a small client for a loopback API fixture and distinguish HTTP, transport, decoding, and schema failures.",
    minutes: 55,
    status: "released",
    prerequisites: ["python-files-json", "network-http"],
    outcomes: [
      "Make a bounded HTTP request using the standard library",
      "Separate HTTP errors from connection and JSON errors",
      "Explain why retries need limits and idempotency reasoning",
    ],
    concepts: [
      {
        title: "An API response is still untrusted input",
        body: "An HTTP API exposes data or operations through requests. A response status, headers, and body carry different information. A 200 response with malformed JSON is not a usable result for a client expecting JSON. Decode and validate the body before reporting success.",
      },
      {
        title: "Bound waiting and reading",
        body: "urllib.request.urlopen accepts a timeout for blocking socket operations. It is not a complete end-to-end deadline across arbitrary retries. The demo also caps the body read so an unexpected large response is rejected. It uses a fixed loopback URL, avoiding an arbitrary-address fetcher. The custom opener disables environment proxy settings for this local-only exercise.",
      },
      {
        title: "Classify before retrying",
        body: "HTTP 404 means the server responded but the resource was missing. A refused connection points toward transport/listener state. Invalid JSON or the wrong schema points toward the response contract. Retrying every failure can amplify load and repeat side effects; retry only a suitable operation with a limit and backoff.",
      },
      {
        title: "A local fixture makes failure repeatable",
        body: "Serve a harmless status.json file with Python’s local HTTP server. Change the path, stop the server, and alter the file to reproduce distinct failures. These are client tests; they do not prove authentication, TLS, pagination, or a real provider API integration.",
      },
    ],
    commands: [
      c(
        "urlopen(..., timeout=3)",
        "Request a response with a socket-operation timeout.",
        "with urlopen(url, timeout=3) as response:\n    body = response.read(65537)",
      ),
      c(
        "HTTPError / URLError",
        "Classify HTTP response failures versus transport failures.",
        "except HTTPError as error:\n    print(error.code)",
      ),
      c(
        "python3 -m http.server",
        "Serve only the local JSON fixture.",
        "python3 -m http.server 8093 --bind 127.0.0.1",
        "Run from the dedicated fixture folder; stop with Ctrl+C.",
      ),
    ],
    demo: {
      title: "Save as fetch_status.py outside the served fixture folder",
      code: 'import json\nimport sys\nfrom urllib.error import HTTPError, URLError\nfrom urllib.request import ProxyHandler, build_opener\n\nurl = "http://127.0.0.1:8093/status.json"\nopener = build_opener(ProxyHandler({}))\ntry:\n    with opener.open(url, timeout=3) as response:\n        body = response.read(65537)\n    if len(body) > 65536:\n        raise ValueError("response exceeds the lab limit")\n    payload = json.loads(body.decode("utf-8"))\n    if not isinstance(payload, dict) or type(payload.get("healthy")) is not bool:\n        raise ValueError("expected an object with boolean healthy")\nexcept HTTPError as error:\n    print(f"HTTP failure: {error.code}", file=sys.stderr)\n    sys.exit(2)\nexcept (URLError, TimeoutError, OSError) as error:\n    print(f"Transport failure: {error}", file=sys.stderr)\n    sys.exit(3)\nexcept (UnicodeError, ValueError) as error:\n    print(f"Response contract failure: {error}", file=sys.stderr)\n    sys.exit(4)\nprint(json.dumps(payload))',
      explanation:
        "HTTPError is handled before URLError because it is a specialized subtype. The client validates the shape and returns the actual healthy value; receiving healthy:false is not a transport failure and must be interpreted by the caller.",
    },
    practice: [
      "Predict the difference between an absent file and a stopped server.",
      'Serve {"healthy":false} and inspect the result without calling it a network outage.',
      "Explain why this GET fixture does not justify blindly retrying a payment POST.",
    ],
    exercises: [
      q(
        "pyhttp-timeout",
        "recall",
        "Which urlopen keyword argument bounds blocking socket operations?",
        ["timeout"],
        "The demo sets it to 3.",
        "timeout avoids an unbounded wait for the socket operation.",
      ),
      q(
        "pyhttp-404",
        "diagnose",
        "The server returns 404. Which demo exception handler runs first?",
        ["HTTPError"],
        "It carries an HTTP status code.",
        "HTTPError represents an HTTP error response.",
      ),
      q(
        "pyhttp-json",
        "predict",
        "A 200 body contains not-json. What failure status does this client return?",
        ["4"],
        "The connection worked but decoding failed.",
        "A response-contract failure exits with 4.",
      ),
      q(
        "pyhttp-limit",
        "predict",
        "The body is 65537 bytes. Is its accepted maximum 65536 or 65537?",
        ["65536"],
        "The extra byte detects exceeding the cap.",
        "Reading one extra byte allows the client to reject an oversized body.",
      ),
    ],
    lab: {
      title: "Test four API outcomes locally",
      environment: python,
      scenario:
        "A support tool must explain whether an endpoint is missing, unreachable, malformed, or usable.",
      steps: [
        'Create ~/atlas-labs/expanded/python-api/fixtures and place status.json containing {"healthy":true} inside it.',
        "Start the loopback server from fixtures on an unused port; adjust the fixed client URL consistently if needed.",
        "Save the client in the parent directory and run the successful case.",
        "Rename status.json to reproduce 404, restore it, then write invalid JSON to reproduce contract failure.",
        "Restore valid JSON, stop the server, and reproduce the transport failure.",
        "Restart, repeat the successful case, then stop the server. Record observed error classes without changing DNS or firewall policy.",
      ],
      evidence: [
        "Client source and fixed local URL",
        "Success/404/invalid-JSON/refused result table",
        "Recovered response and cleanup note",
      ],
      rubric: [
        "Uses a time bound and body-size cap",
        "Classifies failures by their actual layer",
        "Validates JSON shape before reporting success",
        "Restores the original successful case",
      ],
      hints: [
        "Run the server and client in separate Ubuntu terminals.",
        "Leave private files outside the fixture folder.",
      ],
      solution:
        'The valid file returns {"healthy":true} and status 0. An absent path reaches HTTPError/status 2. Invalid JSON reaches contract failure/status 4. Stopping the local server produces transport failure/status 3. Restore the original file/server and repeat the same URL to verify recovery.',
      challenge:
        "Refactor fetching and validation into separate functions. Test a healthy:false response and explain the difference between a valid API reply and a healthy application.",
    },
    resourceIds: ["python", "mdn", "network"],
  },
  {
    id: "python-testing",
    section: 7,
    title: "Make a failing test protect a useful promise",
    summary:
      "Use standard-library tests and a temporary directory to verify behavior without changing real data.",
    minutes: 50,
    status: "released",
    prerequisites: ["python-data", "python-files-json"],
    outcomes: [
      "Separate a pure function from command-line behavior",
      "Write success, boundary, and invalid-input tests",
      "Observe a failing test before trusting its protection",
    ],
    concepts: [
      {
        title: "A test names a promise",
        body: "A useful test says what must remain true for a caller. “Port 0 is rejected” protects a behavior. Checking the exact order of internal helper calls often protects an implementation accident instead. Choose boundaries that explain real failure modes.",
      },
      {
        title: "Pure calculations are easier to isolate",
        body: "A function that receives a value and returns a result can be tested without a network or real filesystem. Move input/output to the edges. If file behavior matters, use tempfile.TemporaryDirectory so tests own their fixture location and clean it up automatically.",
      },
      {
        title: "Assertions compare expectation with observation",
        body: "unittest.TestCase offers assertEqual and assertRaises. The test runner collects methods beginning test_. A failing assertion should show a meaningful disagreement. A test that never runs can appear reassuring while protecting nothing; inspect the reported test count.",
      },
      {
        title: "First prove the check can fail",
        body: "Deliberately introduce a narrow bug, run tests, and observe the relevant failure. Restore the correct logic and rerun. Do not change the expectation merely to silence a failure unless the intended behavior actually changed. An all-green unit suite still does not prove provider or browser behavior.",
      },
    ],
    commands: [
      c(
        "python3 -m unittest -v",
        "Run discovered standard-library unit tests.",
        "python3 -m unittest -v",
      ),
      c(
        "assertRaises",
        "Require an expected exception.",
        "with self.assertRaises(ValueError):\n    valid_port(0)",
      ),
      c(
        "assertEqual",
        "Compare an actual value with its expected result.",
        "self.assertEqual(valid_port(8080), 8080)",
      ),
      c(
        "TemporaryDirectory",
        "Own disposable filesystem fixtures.",
        'with tempfile.TemporaryDirectory() as folder:\n    path = Path(folder) / "sample.txt"',
      ),
    ],
    demo: {
      title: "Save ports.py and test_ports.py as separate files",
      code: '# ports.py\ndef valid_port(value):\n    if type(value) is not int or not 1 <= value <= 65535:\n        raise ValueError("invalid port")\n    return value\n\n# test_ports.py\nimport unittest\nfrom ports import valid_port\n\nclass PortTests(unittest.TestCase):\n    def test_valid_port(self):\n        self.assertEqual(valid_port(8080), 8080)\n\n    def test_boundaries(self):\n        self.assertEqual(valid_port(1), 1)\n        self.assertEqual(valid_port(65535), 65535)\n\n    def test_rejects_zero(self):\n        with self.assertRaises(ValueError):\n            valid_port(0)\n\n    def test_rejects_boolean(self):\n        with self.assertRaises(ValueError):\n            valid_port(True)',
      explanation:
        "Do not paste both labeled parts into one file. The test runner imports ports.py and runs four named tests. Change the lower bound to 0 deliberately to prove test_rejects_zero catches the regression.",
    },
    practice: [
      "Predict which test fails if the lower bound becomes 0.",
      "Add rejection tests for a string and 65536.",
      "Explain why four tests can contain more than four individual assertions.",
    ],
    exercises: [
      q(
        "pytest-run",
        "recall",
        "Write the demonstrated verbose standard-library test command.",
        ["python3 -m unittest -v"],
        "Run unittest as a module.",
        "The verbose runner lists test names and reports failures.",
      ),
      q(
        "pytest-exception",
        "recall",
        "Which unittest assertion checks that code raises an expected exception?",
        ["assertRaises", "self.assertRaises"],
        "It describes the expected raised condition.",
        "assertRaises turns an expected rejection into a tested contract.",
      ),
      q(
        "pytest-boundary",
        "predict",
        "The lower bound changes from 1 to 0. Which test name catches that specific regression?",
        ["test_rejects_zero"],
        "The bug wrongly accepts zero.",
        "The rejection test must fail when no ValueError is raised.",
      ),
      q(
        "pytest-prefix",
        "recall",
        "What prefix must these unittest test method names use?",
        ["test_"],
        "The runner discovers methods by convention.",
        "Methods beginning test_ are collected as tests.",
      ),
    ],
    lab: {
      title: "Protect a configuration boundary",
      environment: python,
      scenario:
        "A future edit must not silently permit invalid ports in a configuration tool.",
      steps: [
        "Create a fresh testing folder and save the two demo files separately.",
        "Run the suite and record the count and outcome.",
        "Change the lower bound to 0, rerun, and capture the failed rejection test.",
        "Restore the bound and add tests for a string and the upper out-of-range value.",
        "Run all tests again and explain why this proves the function contract, not a live listening service.",
        "Optionally practice TemporaryDirectory with a tiny saved/read-back fixture, without writing outside the temporary folder.",
      ],
      evidence: [
        "Function and tests",
        "The deliberate red test result",
        "Final passing count and proof-boundary explanation",
      ],
      rubric: [
        "Demonstrates the relevant test actually fails",
        "Keeps production logic separate from tests",
        "Covers valid, boundary, and invalid inputs",
        "Does not claim unit tests prove a network deployment",
      ],
      hints: [
        "A test file normally starts with test_.",
        "Do not remove the failing test when the bug is in the function.",
      ],
      solution:
        "Run python3 -m unittest -v on the provided files. The original four tests pass. Allowing port 0 causes test_rejects_zero to fail because ValueError is not raised. Restore the bound, add two rejection cases, and verify six tests pass.",
      challenge:
        "Extract the inventory selection function from python-data into an importable module and test empty, all-healthy, and mixed records without using a real endpoint.",
    },
    resourceIds: ["python", "engineering"],
  },
  {
    id: "database-sql",
    section: 9,
    title: "Ask questions of a small relational database",
    summary:
      "Create a disposable SQLite inventory and learn tables, keys, SELECT, filtering, ordering, and parameter binding.",
    minutes: 55,
    status: "released",
    prerequisites: ["python-files-json"],
    outcomes: [
      "Represent records as rows with typed columns and a primary key",
      "Query a fixture with explicit filtering and ordering",
      "Bind a value as data instead of interpolating SQL",
    ],
    concepts: [
      {
        title: "A table stores records with a shared shape",
        body: "A relational table has rows and named columns. A primary key identifies a row uniquely. A constraint rejects invalid data at the database boundary. SQLite can run inside a local application without a separate database server, making it useful for this disposable lab; cloud databases add identity, network, backup, scaling, and operations responsibilities.",
      },
      {
        title: "A query describes a result",
        body: "SELECT chooses columns, FROM chooses the table, WHERE filters rows, and ORDER BY specifies result order. Do not rely on an unstated default ordering. COUNT(*) counts rows selected by the query; it does not count the number of distinct service names unless you request that separately.",
      },
      {
        title: "Values are not SQL source",
        body: "Use ? placeholders with Python sqlite3 and pass a tuple of values separately. The database treats the bound value as data. Concatenating an input string into a SQL statement can change the query’s meaning. Parameter binding protects values; table or column identifiers require a separate allowlist design.",
      },
      {
        title: "Inspect both records and rejected inputs",
        body: "If a query looks wrong, inspect the fixture, selected columns, filter, and ordering. Test a value containing an apostrophe to reveal interpolation mistakes. A successful query does not prove that every application user should be allowed to run it.",
      },
    ],
    commands: [
      c(
        "SELECT / WHERE / ORDER BY",
        "Filter and order selected records.",
        "SELECT name FROM services WHERE healthy = 0 ORDER BY name;",
      ),
      c(
        "CREATE TABLE",
        "Define columns and constraints.",
        "CREATE TABLE services (id INTEGER PRIMARY KEY, name TEXT NOT NULL, healthy INTEGER NOT NULL CHECK (healthy IN (0, 1)));",
      ),
      c(
        "execute with parameters",
        "Keep values separate from SQL text.",
        'connection.execute("SELECT name FROM services WHERE name = ?", (name,))',
      ),
    ],
    demo: {
      title:
        "Save as query_inventory.py; in-memory database disappears after the run",
      code: 'import sqlite3\n\nconnection = sqlite3.connect(":memory:")\nconnection.execute("CREATE TABLE services (id INTEGER PRIMARY KEY, name TEXT NOT NULL, healthy INTEGER NOT NULL CHECK (healthy IN (0, 1)))")\nconnection.executemany("INSERT INTO services VALUES (?, ?, ?)", [\n    (1, "web", 1), (2, "worker", 0), (3, "operator\'s dashboard", 0)\n])\nconnection.commit()\nrows = connection.execute("SELECT name FROM services WHERE healthy = ? ORDER BY name", (0,)).fetchall()\nprint(rows)\nname = "operator\'s dashboard"\nprint(connection.execute("SELECT id FROM services WHERE name = ?", (name,)).fetchall())\nconnection.close()',
      explanation:
        "The first query returns the two unhealthy names in alphabetical order. The apostrophe in the second query’s value stays data because it is bound through a placeholder. :memory: keeps the fixture disposable.",
    },
    practice: [
      "Predict COUNT(*) for healthy = 0.",
      "Change the bound value from 0 to 1 and inspect the result.",
      "Try inserting healthy = 2 and read the constraint failure without weakening the constraint.",
    ],
    exercises: [
      q(
        "sql-select",
        "recall",
        "Which SQL clause filters rows by a condition?",
        ["where", "WHERE"],
        "It follows the table selection.",
        "WHERE determines which rows qualify.",
        false,
      ),
      q(
        "sql-count",
        "predict",
        "The demo has healthy values 1, 0, 0. What is COUNT(*) WHERE healthy = 0?",
        ["2"],
        "Count qualifying rows.",
        "Two records match the filter.",
      ),
      q(
        "sql-key",
        "recall",
        "What table constraint identifies each row uniquely?",
        ["primary key"],
        "The demo uses id for it.",
        "A primary key gives each row a unique identity.",
        false,
      ),
      q(
        "sql-bind",
        "diagnose",
        "Which placeholder symbol does this sqlite3 example use for a bound value?",
        ["?"],
        "The value is passed separately in a tuple.",
        "The ? placeholder prevents the value from becoming SQL syntax.",
      ),
    ],
    lab: {
      title: "Query an inventory with an awkward name",
      environment: python,
      scenario:
        "A service name contains an apostrophe, and the reporting tool must still find the exact record safely.",
      steps: [
        "Save and run the in-memory demo.",
        "Write down the predicted order of unhealthy names and compare it with output.",
        "Query the apostrophe-containing name using a bound parameter.",
        "Attempt a duplicate id and an invalid healthy value; catch and report sqlite3.IntegrityError separately in your test script.",
        "Keep the constraints, repair the invalid fixture, and rerun the original query.",
        "Explain which operations would need additional access controls in a shared database.",
      ],
      evidence: [
        "Table definition and query code",
        "Expected/actual query results",
        "Constraint errors and corrected fixture",
      ],
      rubric: [
        "Uses parameters for data values",
        "Requests explicit result ordering",
        "Preserves key and validity constraints",
        "Distinguishes local querying from production database authorization",
      ],
      hints: [
        "A one-item Python tuple needs a trailing comma: (name,).",
        "Use a new in-memory connection for each independent experiment so failed fixtures do not confuse later results.",
      ],
      solution:
        "Use the schema and parameterized queries from the demo. The unhealthy count is 2. The exact apostrophe-containing name resolves to id 3. Duplicate primary keys and healthy=2 are rejected by constraints; repair the input rather than removing those constraints.",
      challenge:
        "Add an environment column limited to dev or test, query unhealthy services in test, and write a test that proves a prod record is rejected.",
    },
    resourceIds: ["python", "architecture", "security"],
  },
  {
    id: "database-transactions",
    section: 9,
    title: "Keep a multi-step change consistent",
    summary:
      "Use an explicit SQLite transaction to make a two-record update succeed together or roll back together.",
    minutes: 55,
    status: "released",
    prerequisites: ["database-sql", "python-testing"],
    outcomes: [
      "Explain why several successful statements can still form a broken operation",
      "Use BEGIN, COMMIT, and ROLLBACK deliberately",
      "Test a failure between two related updates",
    ],
    concepts: [
      {
        title: "An operation can span several rows",
        body: "Moving 30 units from account 1 to account 2 requires a subtraction and an addition. A crash between independent commits could lose 30 units. A transaction groups the changes so the database commits the complete operation or rolls it back. The invariant in this fixture is that balances sum to 150.",
      },
      {
        title: "Constraints and transactions solve different problems",
        body: "CHECK(balance >= 0) rejects a negative balance. It cannot by itself ensure the transfer was credited to the other account. Preserve both row-level validity and the whole-operation invariant. A successful SQL statement is weaker evidence than a verified transfer.",
      },
      {
        title: "Make transaction ownership explicit",
        body: "This lesson connects with isolation_level=None and issues SQL BEGIN, COMMIT, and ROLLBACK explicitly. That avoids relying on implicit transaction behavior. It teaches atomicity in a single local connection; it does not demonstrate concurrent writers, production isolation levels, replication, or disaster recovery.",
      },
    ],
    commands: [
      c("BEGIN", "Start the explicit transaction", 'db.execute("BEGIN")'),
      c(
        "COMMIT",
        "Make the complete transaction durable according to the database configuration",
        'db.execute("COMMIT")',
      ),
      c(
        "ROLLBACK",
        "Undo this uncommitted transaction",
        'db.execute("ROLLBACK")',
      ),
    ],
    demo: {
      title: "Save transfer.py inside a fresh transactions folder",
      code: 'import sqlite3\n\ndb = sqlite3.connect(":memory:", isolation_level=None)\ndb.execute("CREATE TABLE accounts (id INTEGER PRIMARY KEY, balance INTEGER CHECK(balance >= 0))")\ndb.executemany("INSERT INTO accounts VALUES (?, ?)", [(1, 100), (2, 50)])\n\ndef transfer(amount, fail_after_debit=False):\n    if type(amount) is not int or amount <= 0:\n        raise ValueError("amount must be a positive integer")\n    db.execute("BEGIN")\n    try:\n        db.execute("UPDATE accounts SET balance = balance - ? WHERE id = 1", (amount,))\n        if fail_after_debit:\n            raise RuntimeError("injected failure")\n        db.execute("UPDATE accounts SET balance = balance + ? WHERE id = 2", (amount,))\n        db.execute("COMMIT")\n    except Exception:\n        db.execute("ROLLBACK")\n        raise\n\ntry:\n    transfer(30, fail_after_debit=True)\nexcept RuntimeError as error:\n    print(error)\nprint(db.execute("SELECT balance FROM accounts ORDER BY id").fetchall())\ntransfer(30)\nprint(db.execute("SELECT balance FROM accounts ORDER BY id").fetchall())\ndb.close()',
      explanation:
        "The injected failure leaves balances at 100 and 50. The successful retry changes them to 70 and 80. The exception handler re-raises after rollback so a caller cannot mistake the failed operation for success. Account IDs are fixed, pre-existing fixture rows; a general transfer tool must also validate source and destination existence.",
    },
    practice: [
      "Predict both printed balance pairs before running.",
      "Try transferring 200 and identify the rejected constraint.",
      "Describe what would break if COMMIT occurred immediately after the debit.",
    ],
    exercises: [
      q(
        "tx-atomic",
        "recall",
        "What transaction property means the changes succeed together or are rolled back together?",
        ["atomicity"],
        "Think of one indivisible operation.",
        "Atomicity concerns the transaction as a whole.",
        false,
      ),
      q(
        "tx-rollback",
        "recall",
        "Which SQL statement undoes an open uncommitted transaction?",
        ["ROLLBACK"],
        "Do not use COMMIT for failure recovery.",
        "ROLLBACK discards the changes in that transaction.",
        false,
      ),
      q(
        "tx-balance",
        "predict",
        "After the injected failure, what is account 1’s balance?",
        ["100"],
        "The debit was not committed.",
        "The rollback restores the initial value.",
      ),
      q(
        "tx-total",
        "predict",
        "What should the sum of both balances be after a successful transfer of 30?",
        ["150"],
        "A transfer moves value without creating it.",
        "70 + 80 preserves the original total.",
      ),
    ],
    lab: {
      title: "Prove an interrupted transfer does not lose value",
      environment: python,
      scenario:
        "A local ledger must remain consistent even when processing stops between a debit and a credit.",
      steps: [
        "Run the demo and compare both predicted result sets.",
        "Add assertions that the total is 150 and balances are exactly unchanged after the injected error.",
        "Catch sqlite3.IntegrityError for an attempted transfer of 200 and assert both balances remain unchanged.",
        "Make the ordinary transfer pass, preserving the sum.",
        "Add a test rejecting zero or negative amounts before BEGIN.",
        "Write the boundary: these tests prove behavior for the fixture, not safe concurrent banking software.",
      ],
      evidence: [
        "Code containing explicit transaction ownership",
        "Failure, rollback, and successful retry results",
        "Assertions for total, individual balances, and invalid amounts",
      ],
      rubric: [
        "Rolls back before propagating a failure",
        "Checks individual rows as well as the total",
        "Uses bound SQL values",
        "States the concurrency and production limitations",
      ],
      hints: [
        "Run each independent experiment against a fresh in-memory fixture.",
        "An unchanged sum alone would miss transferring in the wrong direction.",
      ],
      solution:
        "Keep BEGIN outside the two UPDATE statements, commit only after both succeed, and roll back in the exception handler. After the injected failure assert [(100,), (50,)]. After success assert [(70,), (80,)]. An excessive debit is rejected by CHECK and must leave the previous valid state intact.",
      challenge:
        "Parameterize both account IDs, reject a missing destination before changing balances, and write a test proving a missing account cannot cause value to disappear.",
    },
    resourceIds: ["python", "architecture", "engineering"],
  },
  {
    id: "aws-availability",
    section: 10,
    title: "Design for a failed Availability Zone",
    summary:
      "Model capacity and dependencies locally before claiming a cloud architecture can survive a failure.",
    minutes: 60,
    status: "released",
    prerequisites: ["aws-plan", "python-data", "database-transactions"],
    outcomes: [
      "Separate a Region, an Availability Zone, and an application replica",
      "Calculate remaining capacity after a failure",
      "Identify a stateful dependency that invalidates an availability claim",
    ],
    concepts: [
      {
        title: "Replicas need independent failure domains",
        body: "An AWS Region contains multiple Availability Zones. A Zone can contain more than one data center and is designed to isolate many physical failures from other Zones. Two application processes on one host do not provide the same failure isolation as replicas across Zones. Multiple Zones still share some regional and application dependencies.",
      },
      {
        title: "Redundancy needs spare capacity",
        body: "A fleet serving 90 requests per second with two Zones each able to serve 60 has 120 total capacity. Losing either Zone leaves only 60, so it is redundant but cannot meet the target load during that failure. Scaling policies and load balancers do not make extra capacity arrive instantly.",
      },
      {
        title: "Follow the state, not just the web servers",
        body: "A stateless web tier can be replaced when session and durable data live elsewhere. Its availability still depends on identity, network paths, storage, and the database. A backup supports recovery after data loss; it is not an already-serving replacement. A diagram must specify how state becomes available, how long recovery may take, and what is unproven.",
      },
    ],
    commands: [
      c(
        "python3 capacity.py",
        "Evaluate the local failure model",
        "python3 capacity.py",
      ),
      c(
        "min",
        "Find the weakest one-Zone-loss capacity",
        "min(remaining.values())",
      ),
    ],
    demo: {
      title: "A deliberately insufficient capacity model",
      code: 'zones = {"zone-a": 60, "zone-b": 60}\ntarget_rps = 90\nremaining = {failed: sum(capacity for zone, capacity in zones.items() if zone != failed) for failed in zones}\nfor failed, capacity in remaining.items():\n    print(f"lose {failed}: {capacity} rps; meets target: {capacity >= target_rps}")\nprint("normal capacity:", sum(zones.values()))\nprint("worst surviving capacity:", min(remaining.values()))',
      explanation:
        "Both failure cases are below the target even though normal capacity is sufficient. Change each Zone to 90 to satisfy this simplified one-Zone-loss calculation. The model does not measure an actual instance, autoscaling delay, database bottleneck, or request distribution.",
    },
    practice: [
      "Calculate normal and surviving capacity by hand.",
      "Draw client → load balancer → application replicas → durable state.",
      "Mark which dependencies have actually been tested and which are design assumptions.",
    ],
    exercises: [
      q(
        "awsaz-domain",
        "recall",
        "What AWS boundary inside a Region is designed to isolate many physical infrastructure failures?",
        ["availability zone", "az"],
        "It is broader than an individual process.",
        "Availability Zones provide physical failure isolation within a Region.",
        false,
      ),
      q(
        "awsaz-capacity",
        "predict",
        "With two Zones at 60 rps each, what capacity remains after losing one?",
        ["60", "60 rps"],
        "Remove one Zone from the sum.",
        "Only the surviving 60 rps remains.",
        false,
      ),
      q(
        "awsaz-required",
        "predict",
        "Each of two Zones must independently sustain a 90 rps target. What minimum capacity does each need in this model?",
        ["90", "90 rps"],
        "The entire target must fit in one surviving Zone.",
        "Each Zone needs at least 90 rps in this simplified model.",
        false,
      ),
      q(
        "awsaz-state",
        "diagnose",
        "A replaced server loses sessions stored only in its memory. What property should the replaceable web tier have?",
        ["stateless"],
        "Durable/session state must not depend on that instance’s memory.",
        "A stateless tier externalizes state needed across replacements.",
        false,
      ),
    ],
    lab: {
      title: "Challenge an availability claim with a local model",
      environment:
        python +
        " This is an architecture simulation. Do not create or change AWS resources.",
      scenario:
        "A fictional small service promises to serve 90 rps during one Zone outage, but its initial two-Zone design has insufficient surviving capacity.",
      steps: [
        "Save capacity.py and record the failing cases.",
        "Revise modeled capacity and assert every one-Zone-loss case meets the target.",
        "Add a database dependency in your diagram; explicitly describe its assumed failover and backup behavior without claiming you configured either.",
        "Model a database availability flag that can make application capacity unusable even when web replicas survive.",
        "Write a recovery acceptance test containing load, duration, error-rate threshold, and recovery-time target.",
        "Label all measurements as synthetic and all untested service behavior as assumptions.",
      ],
      evidence: [
        "Original and corrected capacity calculation",
        "Dependency diagram with state and failure boundaries",
        "A proposed live test and explicit evidence limits",
      ],
      rubric: [
        "Tests every modeled Zone failure",
        "Separates capacity from resource count",
        "Finds a shared stateful dependency",
        "Does not present the model as AWS operational proof",
      ],
      hints: [
        "The surviving sum must exceed or equal the target in every modeled case.",
        "A healthy web process cannot serve a request that requires an unavailable database.",
      ],
      solution:
        "Set each of two fictional Zones to at least 90 capacity, then test loss of each. Keep the dependency diagram honest: a database failure may still make usable capacity zero. Document the missing real load/failover experiment and the data-loss/recovery assumptions.",
      challenge:
        "Compare three Zones at 50 rps each with two Zones at 90 rps each for one-Zone loss. State the capacity tradeoff and two real-world measurements the arithmetic cannot supply.",
    },
    resourceIds: ["aws", "architecture", "sre"],
  },
  {
    id: "aws-operations",
    section: 10,
    title: "Reconstruct an operational change from evidence",
    summary:
      "Correlate a synthetic change record, application errors, and recovery without confusing correlation with proof.",
    minutes: 55,
    status: "released",
    prerequisites: [
      "aws-availability",
      "python-files-json",
      "troubleshoot-layers",
    ],
    outcomes: [
      "Distinguish audit events from application health signals",
      "Build an ordered incident timeline from a fixture",
      "Choose a reversible recovery test and state what evidence is missing",
    ],
    concepts: [
      {
        title: "Different questions need different evidence",
        body: "AWS CloudTrail records account activity such as API actions by users, roles, and services. Application logs describe application events; metrics summarize behavior over time. An authorized deployment event does not prove that the deployed application works. Absence from a particular audit view does not prove no activity occurred; coverage, region, time range, and event type matter.",
      },
      {
        title: "A timeline narrows the investigation",
        body: "A change at 10:02 followed by errors at 10:03 is a useful lead. Other changes or dependencies may also explain the failure. Record timestamps, actor, resource, and observed impact. Use a reversible comparison, such as restoring the previous application configuration in a disposable test, to strengthen the causal explanation.",
      },
      {
        title: "Recovery must answer the user’s question",
        body: "A rollback command returning success only proves the command completed. Verify the affected request path, error rate, and expected data behavior afterward. Record both a short-term mitigation and a follow-up that reduces recurrence. Use sanitized evidence; production logs can contain identifiers and secrets.",
      },
    ],
    commands: [
      c(
        "sorted",
        "Order events by a consistent timestamp representation",
        'sorted(events, key=lambda event: event["time"])',
      ),
      c(
        "json.dumps",
        "Produce readable structured evidence",
        "json.dumps(event, sort_keys=True)",
      ),
    ],
    demo: {
      title: "Save timeline.py with explicitly synthetic events",
      code: 'import json\n\nevents = [\n    {"time": "2026-01-01T10:03:00Z", "kind": "request", "status": 502, "version": "v2"},\n    {"time": "2026-01-01T10:01:00Z", "kind": "request", "status": 200, "version": "v1"},\n    {"time": "2026-01-01T10:02:00Z", "kind": "change", "actor": "demo-deployer", "setting": "upstream_port", "before": 8080, "after": 8081},\n    {"time": "2026-01-01T10:05:00Z", "kind": "request", "status": 200, "version": "v1"},\n    {"time": "2026-01-01T10:04:00Z", "kind": "rollback", "actor": "demo-operator", "setting": "upstream_port", "after": 8080},\n]\nfor event in sorted(events, key=lambda item: item["time"]):\n    print(json.dumps(event, sort_keys=True))\nrequests = [event for event in events if event["kind"] == "request"]\nprint("sample errors:", sum(event["status"] >= 500 for event in requests))',
      explanation:
        "These invented records are not the CloudTrail schema and do not come from AWS. Their consistent UTC timestamp format sorts correctly as strings. The output supports investigating the port change; it does not independently prove that port caused the observed error.",
    },
    practice: [
      "Name the first observed bad request and the preceding change.",
      "Write a command you would use locally to inspect a listening port.",
      "Explain why one successful request after rollback is limited evidence.",
    ],
    exercises: [
      q(
        "awsops-audit",
        "recall",
        "Which AWS service records account API activity for auditing?",
        ["cloudtrail", "aws cloudtrail"],
        "It answers who changed what.",
        "CloudTrail provides account activity records.",
        false,
      ),
      q(
        "awsops-setting",
        "diagnose",
        "Which setting changed immediately before the first failed request in the fixture?",
        ["upstream_port"],
        "Read the change event.",
        "The upstream_port changed from 8080 to 8081.",
      ),
      q(
        "awsops-errors",
        "predict",
        "How many request events in the demo have a status at least 500?",
        ["1"],
        "Exclude change and rollback records.",
        "Only the 502 request meets the filter.",
      ),
      q(
        "awsops-listener",
        "recall",
        "Write the Linux command taught earlier that lists listening TCP sockets numerically, with process information when permitted.",
        ["ss -ltnp"],
        "Use the four taught options.",
        "ss -ltnp inspects listeners; permission can limit process details.",
      ),
    ],
    lab: {
      title: "Write a change-to-recovery case file",
      environment:
        python +
        " All events are synthetic. No AWS account access or resource changes are required.",
      scenario:
        "A fictional deploy changed an upstream port, requests began failing, and rollback apparently recovered service.",
      steps: [
        "Run the timeline demo and label it synthetic.",
        "Write symptom, suspected change, alternative explanation, and next observation separately.",
        "Add a healthy unrelated service event and ensure your request analysis filters to the affected service by adding a service field to every relevant fixture record.",
        "Create a local pure function that returns 200 only when configured_port equals the fixture’s listening_port; demonstrate bad and restored configurations.",
        "Record why that function tests the hypothesis model but not an actual load balancer or AWS service.",
        "Write a short runbook with inspection, rollback decision, verification, and escalation criteria.",
      ],
      evidence: [
        "Ordered, labeled fixture timeline",
        "A local failing/passing configuration test",
        "Runbook with alternative hypothesis and evidence boundary",
      ],
      rubric: [
        "Separates audit activity from application health",
        "Filters the affected service explicitly",
        "Uses a reversible test",
        "Does not overclaim a synthetic incident as provider experience",
      ],
      hints: [
        "An event’s actor identifies a principal in the fixture, not necessarily a human person.",
        "Use a comparison with the same inputs except for the suspected setting.",
      ],
      solution:
        "The candidate change is upstream_port 8080 → 8081 at 10:02, followed by 502 at 10:03. A rollback at 10:04 precedes a successful sample at 10:05. Test the port mismatch locally, then propose repeated affected-path requests and real listener/configuration inspection for a live incident.",
      challenge:
        "Add a second simultaneous change that also could cause failures. Design a test that distinguishes the two causes without changing both variables at once.",
    },
    resourceIds: ["aws", "observability", "sre"],
  },
  {
    id: "terraform-modules",
    section: 11,
    title: "Build a small reusable Terraform module",
    summary:
      "Use inputs, validation, outputs, and a local module with Terraform’s built-in resource, without a cloud provider.",
    minutes: 65,
    status: "released",
    prerequisites: ["terraform-local", "bash-values"],
    outcomes: [
      "Separate a module interface from its implementation",
      "Reject invalid input before applying",
      "Read a plan and inspect an output without provisioning cloud resources",
    ],
    concepts: [
      {
        title: "A module is a configuration boundary",
        body: "Every Terraform configuration directory is a module. The root module can call a child directory through a module block. Input variables define what callers may configure; outputs expose selected results. A small stable interface reduces repeated code and makes expectations reviewable.",
      },
      {
        title: "Validation protects an assumption",
        body: "The module below permits only dev or test. Validation turns an invalid environment into an explicit error. It does not authorize deployments or guarantee a secure architecture. A valid string can still be used in a bad design.",
      },
      {
        title: "A plan deserves inspection",
        body: "terraform_data belongs to Terraform’s built-in provider and needs no external provider plugin or cloud account. Its input is stored in local Terraform state and exposed as output. This lesson practices language and lifecycle mechanics; it creates no server and gives no evidence of cloud provisioning ability.",
      },
    ],
    commands: [
      c(
        "terraform fmt -recursive",
        "Format the root and child modules",
        "terraform fmt -recursive",
      ),
      c(
        "terraform validate",
        "Check configuration structure after initialization",
        "terraform validate",
      ),
      c(
        "terraform plan",
        "Preview the proposed local state change",
        "terraform plan",
      ),
      c(
        "terraform output",
        "Read exposed root output values",
        "terraform output label",
      ),
    ],
    demo: {
      title: "Create main.tf and modules/label/main.tf separately",
      code: '# main.tf (root)\nterraform {\n  required_version = ">= 1.4.0"\n}\nmodule "label" {\n  source      = "./modules/label"\n  environment = "dev"\n}\noutput "label" {\n  value = module.label.label\n}\n\n# modules/label/main.tf (child)\nvariable "environment" {\n  type = string\n  validation {\n    condition     = contains(["dev", "test"], var.environment)\n    error_message = "Use dev or test for this learning module."\n  }\n}\nresource "terraform_data" "label" {\n  input = "atlas-${var.environment}"\n}\noutput "label" {\n  value = terraform_data.label.output\n}',
      explanation:
        "The labels identify two distinct files; do not combine them. In a fresh folder, run terraform init, fmt, validate, and plan. Apply only after confirming the plan contains this local terraform_data resource. The resulting root output is atlas-dev.",
    },
    practice: [
      "Trace root input → child variable → resource input → child output → root output.",
      "Predict the output when environment becomes test.",
      "Replace dev with prod and read the validation failure.",
    ],
    exercises: [
      q(
        "tfmod-source",
        "recall",
        "Which module argument points to the child module directory?",
        ["source"],
        "It locates the module code.",
        'source = "./modules/label" selects the local child.',
      ),
      q(
        "tfmod-output",
        "predict",
        "What output string should the demo produce for environment = test?",
        ["atlas-test"],
        "Follow the string interpolation.",
        "The resource input combines atlas- with the supplied environment.",
      ),
      q(
        "tfmod-validation",
        "recall",
        "Which Terraform block inside the variable rejects prod?",
        ["validation"],
        "It contains a condition and an error_message.",
        "validation encodes the accepted input contract.",
      ),
      q(
        "tfmod-plan",
        "recall",
        "Which command previews proposed changes without applying them?",
        ["terraform plan"],
        "Review this before apply.",
        "terraform plan describes intended changes; it does not apply them.",
      ),
    ],
    lab: {
      title: "Publish a local module interface",
      environment:
        local +
        " Terraform 1.4 or later must already be installed. Use a fresh ~/atlas-labs/expanded/terraform-modules folder. No backend block, external providers, credentials, provisioners, or paid resources.",
      scenario:
        "Two learning environments need consistent labels while invalid environments must fail early.",
      steps: [
        "Create the two files and directories exactly as labeled.",
        "Run terraform init, terraform fmt -recursive, terraform validate, then terraform plan.",
        "Confirm the plan contains only the built-in terraform_data label, then run terraform apply and review its interactive confirmation.",
        "Capture terraform output label, then try prod and save the validation failure.",
        "Correct the input to test, review the new plan, apply, and verify atlas-test.",
        "Keep state and saved plans out of Git; commit only source and a sanitized explanation if you create a practice repository.",
      ],
      evidence: [
        "Both source files and interface explanation",
        "Rejected input diagnostic",
        "Reviewed local plan and final output",
      ],
      rubric: [
        "Calls a local child module correctly",
        "Demonstrates validation rejection",
        "Reviews the resource scope before apply",
        "Identifies state/output as local learning evidence",
      ],
      hints: [
        "The child variable belongs in the child file, not just the root.",
        "Run Terraform commands from the root folder containing the module block.",
      ],
      solution:
        "Create modules/label/main.tf, pass environment from the root, and expose module.label.label. Initialize and validate from the root. dev yields atlas-dev; prod fails validation; test yields atlas-test after a reviewed local apply.",
      challenge:
        "Add an owner input that must contain at least three characters and expose a combined label. Demonstrate one rejected and one accepted owner without adding a cloud provider.",
    },
    resourceIds: ["terraform", "engineering", "security"],
  },
  {
    id: "terraform-state",
    section: 11,
    title: "Rename a resource without losing its identity",
    summary:
      "Inspect local Terraform state and use a moved block to make a refactor explicit.",
    minutes: 60,
    status: "released",
    prerequisites: ["terraform-modules", "git-branches"],
    outcomes: [
      "Explain how a Terraform address relates configuration to state",
      "Compare a replacement plan with a moved-address plan",
      "Keep state and saved plans private and recoverable",
    ],
    concepts: [
      {
        title: "Names participate in resource identity",
        body: "Terraform tracks an object under a resource address such as terraform_data.original. Renaming the configuration block alone normally leaves one address removed and another added, so a plan proposes destroying one object and creating another. That is a lifecycle change, not just a cosmetic code edit.",
      },
      {
        title: "A moved block records the migration",
        body: "A moved block maps an old address to a new address. Terraform can then preserve the tracked object while updating its address. Keep migration history available for users who have not upgraded yet. A state refactor still needs plan review, because other changes may legitimately cause replacement.",
      },
      {
        title: "State is operational data",
        body: "State can include sensitive resource values; marking an output sensitive only changes normal display behavior and does not by itself encrypt state. Do not commit state or saved plans to Git. Remote storage, access control, versioning, and locking need a separately configured and tested backend; this local lesson does not demonstrate those controls.",
      },
    ],
    commands: [
      c(
        "terraform state list",
        "Inspect tracked addresses",
        "terraform state list",
      ),
      c(
        "terraform state show",
        "Inspect a single local fixture object",
        "terraform state show terraform_data.original",
        "Real state can contain secrets; use only this nonsecret fixture.",
      ),
      c(
        "terraform plan",
        "Check the effect of a refactor before applying",
        "terraform plan",
      ),
    ],
    demo: {
      title: "Create the original resource, then perform the labeled refactor",
      code: '# Initial main.tf in a NEW folder\nterraform {\n  required_version = ">= 1.4.0"\n}\nresource "terraform_data" "original" {\n  input = "nonsecret-demo"\n}\n\n# AFTER applying the initial file, replace its resource block with:\n# resource "terraform_data" "renamed" {\n#   input = "nonsecret-demo"\n# }\n# First inspect a plan with only that rename; do NOT apply it.\n# Then add this block (uncomment it in main.tf):\n# moved {\n#   from = terraform_data.original\n#   to   = terraform_data.renamed\n# }',
      explanation:
        "The first plan after the bare rename should propose remove/create. Adding the moved block should instead show the address migration without destroying or creating the unchanged object. Record the object id before and after the reviewed migration to verify identity preservation.",
    },
    practice: [
      "Explain what the state address identifies.",
      "Predict why merely renaming a block can be disruptive.",
      "Distinguish a private backup of local state from a public source commit.",
    ],
    exercises: [
      q(
        "tfstate-list",
        "recall",
        "Which command lists resource addresses in the current state?",
        ["terraform state list"],
        "Use the read-only state subcommand.",
        "state list reports tracked addresses.",
      ),
      q(
        "tfstate-move",
        "recall",
        "Which HCL block records an old-to-new resource address mapping?",
        ["moved"],
        "It contains from and to.",
        "A moved block documents the address migration.",
      ),
      q(
        "tfstate-target",
        "predict",
        "After the demonstrated migration, what is the new full resource address?",
        ["terraform_data.renamed"],
        "Keep the type and new block name.",
        "The renamed block is tracked at terraform_data.renamed.",
      ),
      q(
        "tfstate-private",
        "diagnose",
        "What local Terraform file should stay out of a public Git repository because it records resource state?",
        ["terraform.tfstate"],
        "Its extension names its purpose.",
        "The state file may contain operational and sensitive values.",
      ),
    ],
    lab: {
      title: "Compare a destructive refactor with an explicit migration",
      environment:
        local +
        " Terraform 1.4+ must already be installed. Use a fresh terraform-state folder with only the built-in resource shown. Do not open a work or production Terraform directory.",
      scenario:
        "A developer wants a clearer resource name while preserving the same tracked object.",
      steps: [
        "Apply the initial local fixture after reviewing its one-resource plan.",
        "Record state list and the nonsecret object id using state show.",
        "Rename original to renamed in source without a moved block; capture but do not apply the remove/create plan.",
        "Add the uncommented moved block and inspect the corrected plan.",
        "Apply only the reviewed address migration, then compare the id and address.",
        "Run a final plan and verify no further changes. Explain how real state backup/access/locking would need separate testing.",
      ],
      evidence: [
        "The two contrasting plans",
        "Source with moved block",
        "Matching before/after id and final no-change plan",
      ],
      rubric: [
        "Never applies the unintended replacement plan",
        "Preserves object identity during the rename",
        "Checks final convergence",
        "Keeps local state and plans out of public source",
      ],
      hints: [
        "The initial fixture must be applied before the rename, or there is no existing state to migrate.",
        "If the input also changes, isolate that edit from the naming refactor.",
      ],
      solution:
        "Apply terraform_data.original, capture its id, then rename the block. The unassisted plan proposes remove/create. Add a moved block with from = terraform_data.original and to = terraform_data.renamed on separate lines, review, and apply. The address changes while the id stays the same.",
      challenge:
        "In a second fresh fixture, move a built-in resource into a local child module with an explicit moved mapping. Prove the same identity-preservation property without manually editing state JSON.",
    },
    resourceIds: ["terraform", "security", "engineering"],
  },
  {
    id: "docker-build",
    section: 12,
    title: "Build and inspect your own container image",
    summary:
      "Package a tiny static site, run it as an unprivileged user, and prove exactly which image served the response.",
    minutes: 65,
    status: "released",
    prerequisites: ["docker-local", "python-http-api", "linux-permissions"],
    outcomes: [
      "Distinguish Dockerfile, image, tag, and running container",
      "Keep the build context small and free of secrets",
      "Verify a loopback-published container and identify its image",
    ],
    concepts: [
      {
        title: "An image is a packaged filesystem and configuration",
        body: "A Dockerfile describes a build. The resulting image contains filesystem layers and runtime defaults. A container is a running instance with its own writable layer. Rebuilding an image does not update an already-running container. A tag such as atlas-expanded-web:1 is a movable name; record an image ID or registry digest when you need to identify the exact artifact.",
      },
      {
        title: "The build context is an input boundary",
        body: "The final dot in docker build names the context directory. COPY can read included files from that context. Use a fresh small folder and explicit COPY rather than sending an entire home directory. A .dockerignore reduces accidentally included material, but cannot rescue a secret deliberately copied into a layer.",
      },
      {
        title: "Ports cross a network boundary",
        body: "The learning server listens on 0.0.0.0 inside its container so the container network can reach it. Publishing 127.0.0.1:8094:8080 binds host port 8094 on loopback to container port 8080. EXPOSE documents the intended container port; it does not publish a host port. Python http.server is used only for this local exercise, not as a production web server.",
      },
    ],
    commands: [
      c(
        "docker build",
        "Create the local image from the current small context",
        "docker build -t atlas-expanded-web:1 .",
      ),
      c(
        "docker run",
        "Run the named fixture on host loopback",
        "docker run --detach --name atlas-expanded-web --publish 127.0.0.1:8094:8080 atlas-expanded-web:1",
      ),
      c(
        "docker inspect",
        "Read the exact image ID of the running container",
        'docker inspect --format "{{.Image}}" atlas-expanded-web',
      ),
      c(
        "docker stop",
        "Stop only this named lab container",
        "docker stop atlas-expanded-web",
      ),
    ],
    demo: {
      title: "Create these three files in a fresh docker-build folder",
      code: '# Dockerfile\nFROM python:3.13-slim\nWORKDIR /app\nCOPY --chown=10001:10001 index.html /app/index.html\nUSER 10001:10001\nEXPOSE 8080\nCMD ["python", "-m", "http.server", "8080", "--bind", "0.0.0.0", "--directory", "/app"]\n\n# index.html (save as HTML, not Dockerfile lines)\n<!doctype html><title>Atlas local image</title><h1>Atlas release 1</h1>\n\n# .dockerignore\n.git\n.env\n*.pem\n*.key',
      explanation:
        "The base image tag can receive updates; the local image ID identifies the built artifact. Files are copied deliberately and the process runs as numeric user 10001. No host directory, Docker socket, privileged mode, or cloud registry push is needed.",
    },
    practice: [
      "Predict which port curl uses from the host.",
      "Explain why changing index.html after a build does not change the existing container.",
      'Inspect the configured user with docker inspect --format "{{.Config.User}}" atlas-expanded-web.',
    ],
    exercises: [
      q(
        "dockerbuild-host",
        "predict",
        "With 127.0.0.1:8094:8080, which port does the host client request?",
        ["8094"],
        "Host binding appears before the container port.",
        "The host requests loopback port 8094.",
      ),
      q(
        "dockerbuild-copy",
        "recall",
        "Which Dockerfile instruction copies index.html into the image?",
        ["COPY"],
        "It reads from the build context.",
        "COPY places the selected source in the image.",
        false,
      ),
      q(
        "dockerbuild-user",
        "recall",
        "Which Dockerfile instruction selects the runtime user?",
        ["USER"],
        "The demo chooses 10001:10001.",
        "USER sets the user used for subsequent runtime defaults.",
        false,
      ),
      q(
        "dockerbuild-publish",
        "diagnose",
        "Which docker run option in the demonstrated command publishes the host port?",
        ["--publish", "-p"],
        "EXPOSE alone is insufficient.",
        "--publish creates the specified host-to-container port mapping.",
      ),
    ],
    lab: {
      title: "Build, break, and replace a local web image",
      environment:
        local +
        " Docker Engine or Docker Desktop with a working Linux-container context must already be installed. Confirm docker context show and docker info identify your own local environment. The base image download needs network access and disk space. Never use a remote work/production Docker context.",
      scenario:
        "A static page needs a reproducible package and a verified response from the expected build.",
      steps: [
        "Create the three files in ~/atlas-labs/expanded/docker-build, then build the image.",
        'Start the named container with the demonstrated loopback port mapping and run curl --noproxy "*" -fsS http://127.0.0.1:8094/index.html.',
        "Record the running image ID, configured user, and returned release text.",
        "Change index.html to release 2 and rebuild the same tag. Before replacing the container, request it again and explain the still-old response.",
        "Stop and remove only atlas-expanded-web using docker stop atlas-expanded-web followed by docker rm atlas-expanded-web. Start it again with the same run command and verify release 2 and its image ID.",
        "Finish by stopping and removing only that named container. Keep the image for the next lessons; do not run global prune commands.",
      ],
      evidence: [
        "Dockerfile and context listing without secrets",
        "Before/rebuild/replace response comparison",
        "Image IDs, runtime user, and scoped cleanup result",
      ],
      rubric: [
        "Builds from the dedicated context",
        "Runs without privileged mode or host socket mounts",
        "Explains tag versus running artifact identity",
        "Verifies response after replacement and cleans up by name",
      ],
      hints: [
        "If the name already exists, inspect it before stopping anything; do not remove an unrelated container.",
        "A missing Docker daemon is a setup problem, not a successful practical.",
      ],
      solution:
        "Build the image, run it on 127.0.0.1:8094, and verify release 1. A rebuild of the tag leaves the running container on its old image. Replace the named container to serve release 2, then record its image ID and user 10001:10001. Stop/remove only the lab container.",
      challenge:
        "Build a third image using a distinct release tag, keep both prior image IDs in a manifest, and demonstrate a verified rollback to a known earlier ID. Explain why these local results do not prove supply-chain scanning or production readiness.",
    },
    resourceIds: ["docker", "python", "security"],
  },
  {
    id: "docker-compose",
    section: 12,
    title: "Describe a small service and its health check",
    summary:
      "Use Compose to run the local image consistently and learn the difference between running, healthy, and recovered.",
    minutes: 60,
    status: "released",
    prerequisites: ["docker-build", "bash-decisions"],
    outcomes: [
      "Validate a Compose file before starting its project",
      "Diagnose an unhealthy service using check output and logs",
      "Separate startup dependency ordering from ongoing recovery",
    ],
    concepts: [
      {
        title: "Compose gives related containers a project",
        body: "A Compose file describes services, networks, and optional volumes. The project name groups related resources. Explicitly choosing atlas-expanded keeps this learning project identifiable. docker compose config checks and renders the configuration; it does not prove the application will run.",
      },
      {
        title: "A health check asks a specific question",
        body: "A running process can serve the wrong content or fail requests. This check requests /index.html inside the container. It proves only that this endpoint responds successfully at check time. A status of unhealthy does not automatically restart a container or repair its dependencies.",
      },
      {
        title: "Startup order is not a recovery strategy",
        body: "For a dependent service, depends_on with condition: service_healthy waits for the dependency’s health check at startup. It does not provide continuous application retry logic or guarantee later availability. Applications still need bounded timeouts, failure handling, and an intentional recovery policy. Named volumes can outlive containers; this stateless lesson intentionally needs none.",
      },
    ],
    commands: [
      c(
        "docker compose config",
        "Validate and inspect this project configuration",
        "docker compose -p atlas-expanded config",
      ),
      c(
        "docker compose up -d",
        "Start the declared local project",
        "docker compose -p atlas-expanded up -d",
      ),
      c(
        "docker compose ps",
        "Inspect project state and health",
        "docker compose -p atlas-expanded ps",
      ),
      c(
        "docker compose down",
        "Remove this project’s containers and networks",
        "docker compose -p atlas-expanded down",
        "Do not add global cleanup or unrelated volume removal.",
      ),
    ],
    demo: {
      title: "Save compose.yaml in a new docker-compose folder",
      code: 'services:\n  web:\n    image: atlas-expanded-web:1\n    ports:\n      - "127.0.0.1:8095:8080"\n    read_only: true\n    cap_drop:\n      - ALL\n    security_opt:\n      - no-new-privileges:true\n    healthcheck:\n      test: ["CMD", "python", "-c", \'import urllib.request; urllib.request.urlopen("http://127.0.0.1:8080/index.html", timeout=2).close()\']\n      interval: 5s\n      timeout: 3s\n      retries: 3\n      start_period: 5s',
      explanation:
        "Use the image built in docker-build. The process only reads its static page, so a read-only container filesystem is sufficient. The health request runs inside the container on port 8080; a host request uses port 8095. These checks support the local lesson, not a general production security guarantee.",
    },
    practice: [
      "Explain why the health check does not use port 8095.",
      "Predict what happens if only the health path becomes /missing.html.",
      "Compare process logs with the health check diagnostic output.",
    ],
    exercises: [
      q(
        "compose-config",
        "recall",
        "Write the demonstrated command that validates the named project configuration.",
        ["docker compose -p atlas-expanded config"],
        "Use the project name and config subcommand.",
        "config parses and renders the configuration.",
      ),
      q(
        "compose-healthport",
        "predict",
        "Which port should the check inside the container request?",
        ["8080"],
        "Inside-container networking uses the container listener.",
        "The host mapping is not needed from inside the same container.",
      ),
      q(
        "compose-condition",
        "recall",
        "What depends_on condition waits for a dependency’s health check at startup?",
        ["service_healthy"],
        "It names the expected dependency state.",
        "service_healthy gates startup on health checks, not perpetual availability.",
      ),
      q(
        "compose-state",
        "diagnose",
        "A bad health path fails repeatedly while the server keeps running. Which health status should eventually appear?",
        ["unhealthy"],
        "The process can stay alive despite failed checks.",
        "Unhealthy describes repeated failed checks, not necessarily a stopped process.",
        false,
      ),
    ],
    lab: {
      title: "Repair a false health failure",
      environment:
        local +
        " Use the same verified local Docker context, installed Docker Compose v2, and image from docker-build. No remote Docker host or cloud deployment.",
      scenario:
        "A service is serving correctly but a mistaken health endpoint marks it unhealthy.",
      steps: [
        "Save compose.yaml, inspect docker compose -p atlas-expanded config, and start the project.",
        "Wait for the configured checks to report healthy, then verify the host response at http://127.0.0.1:8095/index.html.",
        "Change only the health check path to /missing.html and run docker compose -p atlas-expanded up -d again. Allow retries to complete.",
        'Capture ps and logs, then inspect health diagnostics with docker inspect --format "{{json .State.Health}}" "$(docker compose -p atlas-expanded ps -q web)".',
        "Restore /index.html, apply the Compose change, and verify both healthy status and a host request.",
        "Run docker compose -p atlas-expanded down from this project folder and confirm its containers are gone.",
      ],
      evidence: [
        "Validated Compose configuration",
        "Unhealthy status plus the failed check diagnostic",
        "Healthy recovery, successful host request, and named-project cleanup",
      ],
      rubric: [
        "Uses an explicit local project name",
        "Separates process state from readiness evidence",
        "Repairs the check rather than hiding failure",
        "Verifies both the check and user-facing path",
      ],
      hints: [
        "Health transitions take time because interval and retries are intentional.",
        "A check reaching a missing path can fail even while /index.html works.",
      ],
      solution:
        "The wrong path produces HTTP 404 in the check and eventually unhealthy status. Restore the path in compose.yaml and use up -d so the changed service definition takes effect. Confirm health and a host curl request, then down the named project.",
      challenge:
        "Add a one-shot checker service that waits for web with condition: service_healthy and requests http://web:8080/index.html. Explain service-name networking and show why this one-time successful check cannot guarantee future availability.",
    },
    resourceIds: ["docker", "observability", "security"],
  },
  {
    id: "cicd-artifacts",
    section: 13,
    title: "Promote the artifact you actually tested",
    summary:
      "Build a small local release, test and hash it, then deploy those same bytes and perform a verified rollback.",
    minutes: 65,
    status: "released",
    prerequisites: ["ci-contract", "python-testing", "git-branches"],
    outcomes: [
      "Distinguish source revisions, build artifacts, and deployments",
      "Verify artifact integrity with a recorded digest",
      "Reject a bad candidate before promoting it",
    ],
    concepts: [
      {
        title: "Source code is not the deployed artifact",
        body: "A pipeline may turn source into a bundle, package, or image. If each environment rebuilds separately, dependency or tool changes can produce different bytes from apparently identical source. Build once, test that artifact, record its identity, and promote it through later stages when the product permits this approach.",
      },
      {
        title: "Integrity is not authenticity",
        body: "A SHA-256 digest detects changes relative to a trusted expected digest. If an attacker can replace both artifact and manifest, a matching hash does not establish who built it. Signing, protected workflows, review, and access controls answer different questions. This exercise proves local byte equality and behavior only.",
      },
      {
        title: "A release needs a recovery path",
        body: "A failed candidate should leave the current good release usable. A rollback selects a previously verified artifact and checks behavior afterward. Real databases and external side effects may make rollback more complicated than copying a file; a saved old binary alone does not guarantee data compatibility.",
      },
    ],
    commands: [
      c(
        "sha256sum",
        "Record a digest of the tested file",
        "sha256sum release-v1/index.html",
      ),
      c(
        "sha256sum -c",
        "Verify a manifest against the current bytes",
        "sha256sum -c release-v1.sha256",
      ),
      c(
        "python3 verify_release.py",
        "Check the artifact’s required behavior contract",
        "python3 verify_release.py release-v1/index.html",
      ),
    ],
    demo: {
      title: "Save verify_release.py in a fresh artifacts folder",
      code: 'from pathlib import Path\nimport sys\n\nif len(sys.argv) != 2:\n    print("usage: verify_release.py PATH", file=sys.stderr)\n    raise SystemExit(2)\ntry:\n    page = Path(sys.argv[1]).read_text(encoding="utf-8")\nexcept (OSError, UnicodeError) as error:\n    print(f"cannot read release: {error}", file=sys.stderr)\n    raise SystemExit(2)\nif "<h1>Atlas release" not in page or "<title>" not in page:\n    print("release contract failed", file=sys.stderr)\n    raise SystemExit(1)\nprint("release contract passed")',
      explanation:
        "The deliberately small contract checks the exported HTML fixture, not the source file that might have generated it. A real site needs more meaningful browser and accessibility checks. Here the artifact, digest, release directory, and recovery decision are the learning focus.",
    },
    practice: [
      "Explain why a passing test on release-v1 does not approve a changed release-v2.",
      "Predict what a digest mismatch means.",
      "Describe one database change that could prevent simple application rollback.",
    ],
    exercises: [
      q(
        "artifact-digest",
        "recall",
        "Which demonstrated Linux command computes a SHA-256 digest?",
        ["sha256sum"],
        "The command name includes the algorithm family.",
        "sha256sum identifies file contents with a digest.",
      ),
      q(
        "artifact-verify",
        "recall",
        "Which flag asks sha256sum to check a saved manifest?",
        ["-c", "--check"],
        "Use the check option.",
        "-c compares files against expected manifest digests.",
      ),
      q(
        "artifact-exit",
        "predict",
        "A readable file lacks the required title. What exit code does verify_release.py return?",
        ["1"],
        "Read the contract-failure branch.",
        "The invalid artifact exits 1 instead of being promoted.",
      ),
      q(
        "artifact-stage",
        "recall",
        "What operation returns service to a previously verified release?",
        ["rollback"],
        "Recovery selects the previous known-good artifact.",
        "Rollback must be followed by a behavioral verification.",
        false,
      ),
    ],
    lab: {
      title: "Reject a bad candidate and recover a good release",
      environment:
        python +
        " Use a fresh ~/atlas-labs/expanded/artifacts directory. All releases are local files; no hosted workflow, credentials, registry push, or deployment provider is needed.",
      scenario:
        "A candidate with a missing page title should be rejected without damaging the current good release.",
      steps: [
        "Create release-v1 and live subdirectories. Save a valid index.html containing <title>Atlas</title><h1>Atlas release 1</h1> in release-v1.",
        "Run the verifier and only on success save sha256sum release-v1/index.html > release-v1.sha256. Keep the original artifact unchanged.",
        "Copy the verified file into live/index.html. Compare its digest with the release-v1 file and inspect its content.",
        "Create release-v2/index.html with the heading but no title. Capture the verifier’s failure and leave live/index.html unchanged.",
        "Repair v2, test and record its own digest, then promote its exact bytes to live. Verify the new content.",
        "Restore the preserved v1 artifact to live, compare digests, and verify behavior. Write which steps would need protected CI jobs and environment authorization in a hosted pipeline.",
      ],
      evidence: [
        "Artifact contracts and distinct manifests",
        "Bad candidate failure with unchanged live digest",
        "Promotion and rollback content/digest checks",
      ],
      rubric: [
        "Tests the artifact that is promoted",
        "Retains a known-good recovery artifact",
        "Rejects failure before changing live",
        "Distinguishes hash integrity from trusted provenance",
      ],
      hints: [
        "Use mkdir -p for only these named lab directories.",
        "Checking release-v1.sha256 validates the original release path; separately compare live/index.html to that artifact.",
      ],
      solution:
        "Verify v1, record its digest, and copy those bytes into live. A bad v2 fails and must not replace live. After repairing and verifying v2, promote and compare its bytes. Copy v1 back for rollback and verify the known-good content and matching digest.",
      challenge:
        "Write a small Bash promotion function that verifies a candidate before copying into the lab’s live path and returns a nonzero code on failure. Test that invalid input leaves the previous live digest unchanged.",
    },
    resourceIds: ["actions", "engineering", "git", "security"],
  },
  {
    id: "observability-signals",
    section: 14,
    title: "Turn request events into useful service signals",
    summary:
      "Use structured local logs to calculate an error rate, inspect latency, and find one failed request without overstating the data.",
    minutes: 60,
    status: "released",
    prerequisites: ["reliability-sli", "python-files-json", "python-testing"],
    outcomes: [
      "Distinguish logs, metrics, and traces",
      "Compute a correctly scoped request error rate",
      "Connect a symptom to request-level evidence and missing context",
    ],
    concepts: [
      {
        title: "Three signals answer different questions",
        body: "A log records an event with details. A metric summarizes measurements over dimensions and time. A distributed trace connects spans representing work across boundaries. Adding request_id to logs helps correlate events, but does not automatically create a distributed trace with parent/child span relationships and timing.",
      },
      {
        title: "Choose a population before calculating a rate",
        body: "For a request-based error SLI, define eligible requests and what counts as bad. This fixture counts status >= 500 as bad and includes every fixture request in the denominator. In a real system, a policy must decide about health checks, retries, client errors, time windows, and missing records. Changing the denominator changes the meaning.",
      },
      {
        title: "Averages can hide the slow tail",
        body: "Four fast requests and one very slow request can produce an acceptable-looking average while one user suffers. Sorting durations reveals the tail. Percentiles require a defined calculation method and enough representative samples; do not present a five-row toy dataset as a reliable production p99.",
      },
    ],
    commands: [
      c(
        "json.dumps",
        "Write structured event evidence",
        "json.dumps(event, sort_keys=True)",
      ),
      c(
        "sum",
        "Count events meeting a stated bad-event rule",
        'sum(event["status"] >= 500 for event in events)',
      ),
      c(
        "sorted",
        "Inspect ordered request durations",
        'sorted(event["duration_ms"] for event in events)',
      ),
    ],
    demo: {
      title: "Save signals.py with five synthetic requests",
      code: 'events = [\n    {"request_id": "r1", "status": 200, "duration_ms": 20},\n    {"request_id": "r2", "status": 200, "duration_ms": 30},\n    {"request_id": "r3", "status": 503, "duration_ms": 800},\n    {"request_id": "r4", "status": 200, "duration_ms": 25},\n    {"request_id": "r5", "status": 404, "duration_ms": 15},\n]\n\ndef summarize(records):\n    if not records:\n        return {"requests": 0, "error_rate": None, "max_ms": None}\n    bad = sum(record["status"] >= 500 for record in records)\n    return {"requests": len(records), "error_rate": bad / len(records), "max_ms": max(record["duration_ms"] for record in records)}\n\nprint(summarize(events))\nprint("durations:", sorted(record["duration_ms"] for record in events))\nprint("failed ids:", [record["request_id"] for record in events if record["status"] >= 500])',
      explanation:
        "The error rate is 1/5 = 0.2 under this explicit rule; 404 is not counted as a server error. The slowest request is r3 at 800 ms. An empty dataset returns unknown rates instead of claiming zero errors or dividing by zero.",
    },
    practice: [
      "Calculate the error rate and average duration by hand.",
      "Explain why excluding the 404 request changes the denominator.",
      "Name the additional trace context needed to follow work through another service.",
    ],
    exercises: [
      q(
        "signals-rate",
        "predict",
        "For the five fixture requests with one status >= 500, what is the error rate as a decimal?",
        ["0.2", "0.20"],
        "Divide bad by eligible.",
        "One divided by five is 0.2.",
      ),
      q(
        "signals-id",
        "diagnose",
        "Which request_id identifies both the server error and the slowest request?",
        ["r3"],
        "Find status 503 and duration 800.",
        "r3 is the event worth inspecting first.",
      ),
      q(
        "signals-kind",
        "recall",
        "Which signal links parent and child spans across services?",
        ["trace", "distributed trace"],
        "A correlation ID in logs alone is insufficient.",
        "A distributed trace captures related spans.",
        false,
      ),
      q(
        "signals-empty",
        "predict",
        "What Python value represents error_rate for an empty record list in the demo?",
        ["None"],
        "No observations do not establish a zero error rate.",
        "None records the undefined/unknown rate.",
      ),
    ],
    lab: {
      title: "Create a small service signal report",
      environment:
        python +
        " Use synthetic fixture events only; do not paste production logs or credentials into the learning journal.",
      scenario:
        "A teammate sees a slow request but needs a scoped report that explains the overall symptom and its limitations.",
      steps: [
        "Run signals.py and record the sample count, bad-event rule, rate, and maximum latency.",
        "Add unit tests for empty, all-good, and mixed records.",
        "Add an intentionally missing field fixture and decide whether to reject the record or count it separately; implement that decision explicitly.",
        "Add a health-check field and calculate a second report excluding those records, naming the changed population.",
        "Write a request-level investigation note for r3, identifying two missing observations that would help locate the delay.",
        "Propose an actionable alert with window, eligible population, threshold, and response owner; do not call five synthetic events a production baseline.",
      ],
      evidence: [
        "Report code and tests",
        "Two clearly labeled populations and results",
        "Request investigation and an actionable alert proposal",
      ],
      rubric: [
        "Defines numerator and denominator",
        "Handles no-data and malformed-data cases explicitly",
        "Preserves request correlation without claiming full tracing",
        "States synthetic sample and coverage limitations",
      ],
      hints: [
        "Unknown and zero are different states.",
        "A useful alert tells someone what impact to investigate, not merely that a number changed.",
      ],
      solution:
        "Report 5 eligible requests, 1 server error, rate 0.2, and maximum 800 ms. Investigate r3 with downstream timing and dependency evidence. Test empty data as unknown, and label any filtered population separately so rates remain interpretable.",
      challenge:
        "Generate 100 deterministic fixture events with a brief error burst, compare whole-period and short-window rates, and explain why the whole-period average can hide an incident.",
    },
    resourceIds: ["observability", "sre", "python"],
  },
  {
    id: "security-threat-model",
    section: 15,
    title: "Model a trust boundary and test authorization",
    summary:
      "Protect a fictional report by asking who may read it, where identity comes from, and how a denied request is proved.",
    minutes: 60,
    status: "released",
    prerequisites: ["security-review", "python-testing", "web-foundations"],
    outcomes: [
      "Identify an asset, actor, entry point, and trust boundary",
      "Distinguish authentication from object-level authorization",
      "Test deny-by-default behavior with synthetic identities",
    ],
    concepts: [
      {
        title: "Start with something worth protecting",
        body: "A threat model is a structured explanation of what you protect, who can interact with it, how data crosses boundaries, and what could go wrong. Here the asset is a private report, the entry point is a report-read request, and the boundary is between client-supplied input and trusted server-side identity. Keep the model specific enough to produce a test.",
      },
      {
        title: "Identity and permission answer different questions",
        body: "Authentication establishes who is making the request. Authorization decides whether that identity may perform this action on this object. A valid login alone does not grant access to every report. An owner field supplied by the client must not override the actual stored owner.",
      },
      {
        title: "Deny unless the rule explicitly allows access",
        body: "The fixture permits only an authenticated owner to read a private report. Missing identity, unknown report, and another owner are denied. This is a teaching policy, not a complete login or multi-tenant system. Production controls also need trusted session validation, revocation, safe error handling, audit coverage, and tests across all access paths.",
      },
    ],
    commands: [
      c(
        "python3 -m unittest -v",
        "Run the authorization regression tests",
        "python3 -m unittest -v",
      ),
      c(
        "assertFalse",
        "Prove an unauthorized request is rejected",
        'self.assertFalse(can_read("bob", reports, "r1"))',
      ),
    ],
    demo: {
      title: "Save access.py and test_access.py as separate files",
      code: '# access.py\ndef can_read(authenticated_user, reports, report_id):\n    report = reports.get(report_id)\n    if authenticated_user is None or report is None:\n        return False\n    return authenticated_user == report["owner"]\n\n# test_access.py\nimport unittest\nfrom access import can_read\n\nclass AccessTests(unittest.TestCase):\n    def setUp(self):\n        self.reports = {"r1": {"owner": "alice", "title": "Demo private report"}}\n\n    def test_owner_allowed(self):\n        self.assertTrue(can_read("alice", self.reports, "r1"))\n\n    def test_other_user_denied(self):\n        self.assertFalse(can_read("bob", self.reports, "r1"))\n\n    def test_anonymous_denied(self):\n        self.assertFalse(can_read(None, self.reports, "r1"))\n\n    def test_missing_report_denied(self):\n        self.assertFalse(can_read("alice", self.reports, "missing"))',
      explanation:
        "authenticated_user stands for an identity already verified by a trusted server component; the fixture does not implement authentication. Do not construct that identity from a client’s editable user field. The tests use invented identities and no passwords or tokens.",
    },
    practice: [
      "Draw browser input → authentication boundary → authorization check → report store.",
      "Predict the outcome for bob requesting r1.",
      "Explain why hiding a button is insufficient when the server still accepts the request.",
    ],
    exercises: [
      q(
        "threat-authn",
        "recall",
        "Which process establishes who is making a request?",
        ["authentication"],
        "It precedes deciding what they may access.",
        "Authentication verifies identity.",
        false,
      ),
      q(
        "threat-authz",
        "recall",
        "Which process decides whether an identified user may read a specific report?",
        ["authorization", "authorisation"],
        "A login alone does not answer the object-access question.",
        "Authorization evaluates permission for the action and object.",
        false,
      ),
      q(
        "threat-test",
        "diagnose",
        "Which test catches allowing any logged-in user to read r1?",
        ["test_other_user_denied"],
        "The other user is authenticated but not the owner.",
        "This test detects missing object-level authorization.",
      ),
      q(
        "threat-policy",
        "recall",
        "What default decision should this policy make when identity or report is missing?",
        ["deny", "denied"],
        "Only an explicit matching rule allows access.",
        "Deny-by-default avoids accidental permission from incomplete input.",
        false,
      ),
    ],
    lab: {
      title: "Turn a privacy threat into a regression test",
      environment:
        python +
        " Use only the invented report and identities. No real tokens, credentials, private reports, or provider permissions are needed.",
      scenario:
        "A fictional app accidentally lets any signed-in user read any private report.",
      steps: [
        "Create the two files and run the four tests.",
        "Deliberately replace the final ownership comparison with return True. Capture the test that now fails.",
        "Restore the policy and verify the complete suite passes.",
        "Add a second report owned by bob and tests proving each owner can read only their own report.",
        "Write a threat statement: actor, entry point, protected asset, failed boundary, and observable denial.",
        "List evidence safe to log, such as an invented request id and allow/deny outcome, and data that should be omitted, such as report contents and session tokens.",
      ],
      evidence: [
        "Trust-boundary diagram or written flow",
        "Deliberate authorization regression and passing repair",
        "Object-specific tests plus a safe logging decision",
      ],
      rubric: [
        "Checks permission against stored ownership",
        "Tests authenticated but unauthorized access",
        "Defaults to denial for missing identity or object",
        "Does not claim the fixture implements real authentication",
      ],
      hints: [
        "The correct answer for bob depends on the report owner, not simply whether bob is logged in.",
        "Avoid tests that merely repeat the function’s comparison; express allowed and denied user stories.",
      ],
      solution:
        "The insecure return True breaks test_other_user_denied. Restore the stored-owner comparison, then test the same identities against both owners’ reports. Keep authentication as an explicitly assumed trusted input and document where a real server must supply it.",
      challenge:
        "Add a read-only support role using a server-side policy map, with explicit denial for editing reports. Test that a client-supplied role field cannot change the trusted role used by your authorization function.",
    },
    resourceIds: ["security", "engineering", "python"],
  },
  {
    id: "kubernetes-workloads",
    section: 16,
    title: "Recover a Service whose selector matches no Pods",
    summary:
      "Run your local image in a disposable kind cluster, inspect readiness and Service endpoints, and repair a deliberate routing mismatch.",
    minutes: 90,
    status: "released",
    prerequisites: [
      "kubernetes-read",
      "docker-compose",
      "observability-signals",
    ],
    outcomes: [
      "Relate a Deployment, Pod labels, readiness probe, and Service selector",
      "Inspect EndpointSlices when service traffic fails",
      "Recover and verify the actual in-cluster request path",
    ],
    concepts: [
      {
        title: "Controllers reconcile declared state",
        body: "A Deployment manages a desired set of Pods through ReplicaSets. Kubernetes may replace a failed Pod; its individual identity is temporary. Two replicas on one local kind node demonstrate reconciliation mechanics, not physical failure isolation or multi-Zone availability.",
      },
      {
        title: "A Service needs matching, ready backends",
        body: "For this selector-based Service, the selector must match the Pods’ labels. EndpointSlices describe the discovered backends and their readiness. A Service object can exist while no usable backend matches. Inspect labels, selector, readiness, target port, and the application listener in a deliberate order.",
      },
      {
        title: "A probe and a request prove different things",
        body: "A readiness probe affects whether a Pod is considered ready to receive normal Service traffic. A liveness probe can cause container restart; this lesson deliberately defines only readiness. A host port-forward reaches a selected Pod through the API path and does not by itself prove cluster DNS or Service routing. The in-cluster request below tests those additional pieces.",
      },
    ],
    commands: [
      c(
        "kind create cluster",
        "Create only the named local learning cluster",
        "kind create cluster --name atlas-expanded",
        "Do not reuse an unrelated cluster with this name.",
      ),
      c(
        "kind load docker-image",
        "Load the previously built image into that local cluster",
        "kind load docker-image atlas-expanded-web:1 --name atlas-expanded",
      ),
      c(
        "kubectl get endpointslices",
        "Inspect this Service’s backend discovery",
        "kubectl --context kind-atlas-expanded -n atlas-expanded get endpointslices -l kubernetes.io/service-name=web -o yaml",
      ),
      c(
        "kubectl rollout status",
        "Wait for the local Deployment readiness",
        "kubectl --context kind-atlas-expanded -n atlas-expanded rollout status deployment/web --timeout=120s",
      ),
    ],
    demo: {
      title: "Save workloads.yaml in a fresh kubernetes folder",
      code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: atlas-web\n  template:\n    metadata:\n      labels:\n        app: atlas-web\n    spec:\n      containers:\n        - name: web\n          image: atlas-expanded-web:1\n          imagePullPolicy: Never\n          ports:\n            - containerPort: 8080\n          readinessProbe:\n            httpGet:\n              path: /index.html\n              port: 8080\n            periodSeconds: 3\n          resources:\n            requests:\n              cpu: 50m\n              memory: 32Mi\n            limits:\n              cpu: 250m\n              memory: 128Mi\n          securityContext:\n            runAsNonRoot: true\n            runAsUser: 10001\n            allowPrivilegeEscalation: false\n            readOnlyRootFilesystem: true\n            capabilities:\n              drop: ["ALL"]\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  selector:\n    app: atlas-web\n  ports:\n    - port: 8080\n      targetPort: 8080',
      explanation:
        "Every kubectl operation in this lab names the kind-atlas-expanded context and atlas-expanded namespace explicitly. imagePullPolicy Never requires the image to be loaded into kind first. This prevents silently using a different registry image; it also means a missing local image is a real setup failure to diagnose.",
    },
    practice: [
      "Trace Service selector app: atlas-web to the Pod template label.",
      "Predict EndpointSlice backend availability if only the Service selector becomes wrong-app.",
      "Explain why two replicas on one machine cannot survive failure of that machine.",
    ],
    exercises: [
      q(
        "kube-selector",
        "recall",
        "Which Service field maps label requirements to backend Pods?",
        ["selector", "spec.selector"],
        "It must match Pod labels.",
        "The Service selector chooses the Pods whose endpoints can back the Service.",
      ),
      q(
        "kube-ready",
        "recall",
        "Which probe controls whether the Pod is ready for normal Service traffic?",
        ["readiness", "readinessProbe", "readiness probe"],
        "It is separate from restart-oriented liveness.",
        "Readiness determines whether the Pod is a ready backend.",
        false,
      ),
      q(
        "kube-endpoints",
        "recall",
        "Which modern Kubernetes resource does this lab inspect for Service backend discovery?",
        ["EndpointSlice", "EndpointSlices", "endpointslices"],
        "The plural appears in the get command.",
        "EndpointSlices describe Service endpoints and their conditions.",
        false,
      ),
      q(
        "kube-image",
        "diagnose",
        "The image is missing from kind and pull policy is Never. Which kind subcommand loads the local image?",
        ["load docker-image"],
        "It copies the image into the named local cluster.",
        "kind load docker-image atlas-expanded-web:1 --name atlas-expanded makes the built image available.",
      ),
    ],
    lab: {
      title: "Repair the path from Service name to ready Pod",
      environment:
        local +
        " This practical requires already-installed kind, kubectl, a working local Docker Linux-container context, and the atlas-expanded-web:1 image. Review kind’s official prerequisites and local resource use first. Create a fresh cluster named atlas-expanded; if that name belongs to unrelated work, stop and use a separately reviewed lab setup. Never target a remote or production context. Missing prerequisites mean the practical is not yet complete.",
      scenario:
        "Pods are ready, but a mistaken Service selector prevents the application from being reached through its Service name.",
      steps: [
        "Confirm your local Docker context, run kind get clusters, then create the named cluster and load the image using the commands above.",
        "Create the dedicated namespace with kubectl --context kind-atlas-expanded create namespace atlas-expanded. Save the manifest and apply it with kubectl --context kind-atlas-expanded -n atlas-expanded apply -f workloads.yaml.",
        "Wait for rollout status, then inspect Pods with kubectl --context kind-atlas-expanded -n atlas-expanded get pods --show-labels and inspect EndpointSlices with the demonstrated command.",
        "From a running web Pod, test Service DNS and routing: kubectl --context kind-atlas-expanded -n atlas-expanded exec deployment/web -- python -c 'import urllib.request; print(urllib.request.urlopen(\"http://web:8080/index.html\", timeout=3).read().decode())'. Record the successful page.",
        "Change only the Service selector app value in the manifest to wrong-app. Reapply, inspect EndpointSlices, and rerun the in-cluster request to capture failure. Keep Deployment labels unchanged.",
        "Restore the Service selector to atlas-web, reapply, and verify ready endpoints plus the in-cluster response.",
        "Optional host inspection: kubectl --context kind-atlas-expanded -n atlas-expanded port-forward --address 127.0.0.1 service/web 8096:8080, then curl that loopback port in another terminal. Stop the foreground forward with Ctrl+C.",
        "After recording sanitized evidence, remove only the cluster created for this lab with kind delete cluster --name atlas-expanded. Confirm kind get clusters no longer lists it.",
      ],
      evidence: [
        "Exact local context and namespace",
        "Healthy Pods plus empty/unusable backend evidence during failure",
        "Repaired EndpointSlices, successful in-cluster request, and named-cluster cleanup",
      ],
      rubric: [
        "Scopes every cluster operation explicitly",
        "Distinguishes healthy Pods from usable Service backends",
        "Repairs selector mismatch without weakening readiness",
        "Verifies the in-cluster path and states the single-node limitation",
      ],
      hints: [
        "If Pods show ErrImageNeverPull, load the image into this named kind cluster before troubleshooting routing.",
        "Changing Deployment selectors is a different operation; edit only the Service selector for the intended failure.",
      ],
      solution:
        "Load the image, apply the Deployment and matching Service, and verify the Service request from inside a Pod. Changing only the Service selector to wrong-app removes usable matching backends while Pods remain healthy. Restore atlas-web, inspect ready endpoints, and verify the same request succeeds before scoped cleanup.",
      challenge:
        "In a new disposable run, keep the selector correct but change targetPort to 8081. Diagnose how the evidence differs from an empty selector result, restore 8080, and prove recovery without recreating the whole cluster.",
    },
    resourceIds: ["kubernetes", "docker", "observability", "security"],
  },
  {
    id: "reliability-incident",
    section: 14,
    title: "Restore a database and measure the recovery",
    summary:
      "Use a consistent SQLite backup, damage only a disposable fixture, and measure what was recovered and what was lost.",
    minutes: 70,
    status: "released",
    prerequisites: [
      "database-transactions",
      "observability-signals",
      "cicd-artifacts",
    ],
    outcomes: [
      "Distinguish backup creation from verified restoration",
      "Measure recovery time separately from acceptable data loss",
      "Write an incident record with detection, mitigation, proof, and follow-up",
    ],
    concepts: [
      {
        title: "A backup is a candidate recovery input",
        body: "A file named backup is not enough. You need a consistent copy, a way to restore it, and a test of restored behavior. SQLite’s connection backup API copies a database consistently; copying arbitrary database files while writes are active can miss related journal state. This lesson uses the API and then queries the restored database.",
      },
      {
        title: "RPO and RTO are objectives",
        body: "Recovery point objective describes acceptable data loss measured in time; recovery time objective describes acceptable time to restore service. The latest backup predates some changes, so restoration may recover an older valid state. Report the actual recovery duration and lost fixture changes separately from targets. A fast restore can still violate the data-loss target.",
      },
      {
        title: "A useful incident report preserves uncertainty",
        body: "Record what failed, when it was detected, how impact was reduced, and what evidence supports recovery. State whether timestamps are measured or invented. In this local exercise, record a measured restore duration and explicitly synthetic write times. Do not present the result as a production disaster-recovery test.",
      },
    ],
    commands: [
      c(
        "Connection.backup",
        "Copy SQLite contents through its supported backup API",
        "source.backup(destination)",
      ),
      c(
        "time.perf_counter",
        "Measure elapsed recovery time",
        "started = time.perf_counter()",
      ),
      c(
        "SELECT COUNT(*)",
        "Verify expected restored records",
        'restored.execute("SELECT COUNT(*) FROM notes").fetchone()',
      ),
    ],
    demo: {
      title: "Save recovery.py in a fresh recovery folder",
      code: 'from pathlib import Path\nimport sqlite3\nimport tempfile\nimport time\n\nwith tempfile.TemporaryDirectory(prefix="atlas-recovery-") as folder:\n    root = Path(folder)\n    live = sqlite3.connect(root / "live.db")\n    live.execute("CREATE TABLE notes (id INTEGER PRIMARY KEY, body TEXT NOT NULL)")\n    live.execute("INSERT INTO notes VALUES (1, ?)", ("saved before backup",))\n    live.commit()\n    backup = sqlite3.connect(root / "backup.db")\n    live.backup(backup)\n    backup.close()\n    live.execute("INSERT INTO notes VALUES (2, ?)", ("saved after backup",))\n    live.commit()\n    print("before incident:", live.execute("SELECT * FROM notes ORDER BY id").fetchall())\n    # Deliberate damage to ONLY this disposable fixture.\n    live.execute("DELETE FROM notes")\n    live.commit()\n    print("detected count:", live.execute("SELECT COUNT(*) FROM notes").fetchone()[0])\n    started = time.perf_counter()\n    backup = sqlite3.connect(root / "backup.db")\n    restored = sqlite3.connect(root / "restored.db")\n    backup.backup(restored)\n    rows = restored.execute("SELECT * FROM notes ORDER BY id").fetchall()\n    assert rows == [(1, "saved before backup")]\n    elapsed = time.perf_counter() - started\n    print("restored:", rows)\n    print("restore and verification seconds:", round(elapsed, 6))\n    print("post-backup records not recovered:", 1)\n    restored.close()\n    backup.close()\n    live.close()',
      explanation:
        "The temporary directory is created and cleaned up by Python, so no existing user database is touched. Restore goes into a separate file and does not overwrite the damaged fixture. One post-backup record is intentionally absent after recovery; report that loss instead of calling the restoration complete to the latest state.",
    },
    practice: [
      "Predict which row returns after recovery and which does not.",
      "Explain why a row count alone would not detect wrong content.",
      "Distinguish measured restore duration from total incident duration including detection and decisions.",
    ],
    exercises: [
      q(
        "recovery-rpo",
        "recall",
        "Which objective describes the acceptable data-loss interval: RPO or RTO?",
        ["RPO"],
        "It concerns the recovery point in time.",
        "RPO sets the tolerated age of recovered data.",
        false,
      ),
      q(
        "recovery-rto",
        "recall",
        "Which objective describes the acceptable time to restore service?",
        ["RTO"],
        "It concerns recovery time.",
        "RTO is a target for restoration time.",
        false,
      ),
      q(
        "recovery-row",
        "predict",
        "Which note ID is present in restored.db after the demo?",
        ["1"],
        "The backup was made before note 2.",
        "Only note 1 existed at the backup point.",
      ),
      q(
        "recovery-api",
        "recall",
        "Which sqlite3 Connection method makes the demonstrated consistent backup?",
        ["backup", "backup()"],
        "Call it on the source connection with a destination connection.",
        "Connection.backup copies the database through SQLite’s backup API.",
      ),
    ],
    lab: {
      title: "Run and explain a measured local recovery",
      environment:
        python +
        " The demo creates its own temporary fixture and deletes rows only there. Do not replace its paths with any existing database. Keep your script and written evidence under ~/atlas-labs/expanded/recovery.",
      scenario:
        "A local demo loses its notes after the latest backup. You must restore a known-good state and disclose the unrecovered change.",
      steps: [
        "Predict the before-incident, damaged, and restored results, then run recovery.py.",
        "Capture the observed state transition and measured restore-plus-verification duration.",
        "Add an assertion for the exact recovered content and a test that the post-backup note is absent.",
        "Assign explicitly synthetic times: backup 10:00, note 2 at 10:03, incident 10:05. Compare the five-minute backup age with a two-minute RPO target and explain the violation.",
        "Set a local recovery-time target before another run, measure the restore again, and state whether that narrow measured stage meets it. Do not include unmeasured detection/decision time.",
        "Write a short incident record and propose a follow-up that reduces the data-loss window, plus a test of that follow-up.",
      ],
      evidence: [
        "Predicted and actual data states",
        "Measured timing with precise start/end boundaries",
        "Lost-record disclosure, objective comparison, and follow-up test",
      ],
      rubric: [
        "Restores into a separate disposable database",
        "Verifies content rather than file existence alone",
        "Separates data-loss and recovery-time objectives",
        "Labels synthetic times and local-only proof honestly",
      ],
      hints: [
        "A backup at 10:00 recovered after a 10:05 failure is five minutes old.",
        "A test of more frequent backup must still perform a restore, not just count backup files.",
      ],
      solution:
        "The fixture starts with two notes, deliberate deletion produces zero, and restore yields only note 1. Measure restore plus query verification, disclose the missing second note, and state that a five-minute-old backup misses a two-minute RPO. The script does not measure complete operational RTO.",
      challenge:
        "Add a second backup after note 2, restore each candidate into a separate temporary file, and choose the newest verified recovery point. Simulate an unusable latest candidate and document the fallback’s extra data-loss risk.",
    },
    resourceIds: ["python", "sre", "observability", "engineering"],
  },
];
