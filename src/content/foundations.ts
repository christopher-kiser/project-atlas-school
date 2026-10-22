import type { Exercise, Lesson } from "./types";

const command = (
  name: string,
  purpose: string,
  example: string,
  caution?: string,
) => ({ command: name, purpose, example, caution });
const exactAnswerIds = new Set([
  "orientation-recall",
  "terminal-map-recall",
  "terminal-map-predict",
  "terminal-map-diagnose",
  "terminal-files-recall",
  "terminal-files-diagnose",
  "terminal-cleanup-recall",
  "terminal-search-recall",
  "terminal-control-recall",
  "terminal-control-diagnose",
  "linux-permissions-diagnose",
  "linux-jobs-recall",
  "linux-jobs-diagnose",
  "linux-services-recall",
  "linux-resources-recall",
  "linux-resources-capacity",
  "network-addresses-recall",
  "network-dns-recall",
  "troubleshoot-nginx-recall",
  "troubleshoot-nginx-diagnose",
  "troubleshoot-layers-recall",
  "git-basics-recall",
  "git-basics-restage",
  "git-branches-recall",
  "git-branches-predict",
  "git-conflicts-recall",
  "git-conflicts-diagnose",
  "git-collaboration-recall",
  "github-workflow-recall",
  "github-workflow-check",
]);
const exercise = (
  id: string,
  kind: Exercise["kind"],
  prompt: string,
  answers: string[],
  hint: string,
  explanation: string,
): Exercise => ({
  id,
  kind,
  prompt,
  answers,
  hint,
  explanation,
  caseSensitive: exactAnswerIds.has(id),
});
const ubuntu =
  "Your own disposable Ubuntu WSL2 instance or Ubuntu VM. Use ~/atlas-labs on the Linux filesystem. A Mac can be the client, but Linux administration commands belong in the Ubuntu terminal. These instructions are manual; this website does not execute commands.";
const shell =
  "Bash in Ubuntu WSL2 or an Ubuntu VM. All created files stay under ~/atlas-labs. On macOS, basic file commands are similar, but this course uses Bash/Linux behavior; open the Ubuntu environment for reproducible results.";

export const foundations: Lesson[] = [
  {
    id: "orientation",
    section: 0,
    title: "Think in claims, tests, and evidence",
    minutes: 25,
    status: "released",
    prerequisites: [],
    summary:
      "Set up a safe learning workspace and turn “it works” into a claim you can prove.",
    outcomes: [
      "Identify the machine and shell before acting",
      "Separate observation, hypothesis, change, and proof",
      "Use AI as a reviewer while keeping responsibility for commands",
    ],
    concepts: [
      {
        title: "A terminal is a control surface",
        body: "The terminal displays text; the shell interprets commands; the operating system manages files and processes. A Windows Terminal tab can contain PowerShell or Ubuntu. A Mac terminal usually starts zsh. The same window shape does not imply the same operating system.",
      },
      {
        title: "Make one testable claim",
        body: "“The site is broken” is vague. “An HTTP request to 127.0.0.1:80 is refused at 14:05” is observable. State a hypothesis, choose the smallest inspection that could disprove it, make one justified change, then repeat the original failing test.",
      },
      {
        title: "Understand before running",
        body: "Before pasting a command, name its program, arguments, target, privilege, and likely side effect. Read unfamiliar options in official help. Never paste secrets into AI or public evidence. Ask AI to explain a proposed command, then compare its claims with documentation and actual output.",
      },
      {
        title: "Practice is not mastery",
        body: "A guided success proves you followed a procedure. Independent success and a later repeat provide stronger evidence. Record mistakes as clues for review. The migration assessment can recognize your prior terminal and Nginx work without skipping evidence checks.",
      },
    ],
    commands: [
      command("pwd", "Show which directory this shell is in.", "pwd"),
      command(
        "mkdir -p",
        "Create your lab directory and any missing parent.",
        "mkdir -p ~/atlas-labs/orientation",
      ),
      command(
        "man",
        "Read a local command reference; q exits the viewer.",
        "man pwd",
      ),
    ],
    demo: {
      title: "A small claim you can verify",
      code: "pwd\nmkdir -p ~/atlas-labs/orientation\ncd ~/atlas-labs/orientation\npwd",
      explanation:
        "The final path should end in /atlas-labs/orientation. If it does not, the claimed location is not proven. Read the error rather than assuming that a command silently succeeded.",
    },
    practice: [
      "Name the operating system and shell of your current tab.",
      "Explain each word in mkdir -p ~/atlas-labs/orientation before typing it.",
      "Write a four-line note: observation, hypothesis, test, result. Use the final pwd output as the result.",
    ],
    exercises: [
      exercise(
        "orientation-recall",
        "recall",
        "Which command prints your current working directory?",
        ["pwd"],
        "The abbreviation refers to “print working directory”.",
        "pwd gives an observation about this shell, which is stronger than assuming where you are.",
      ),
      exercise(
        "orientation-predict",
        "predict",
        "A command reports an error, but you have not inspected the result. Is success proven? Answer yes or no.",
        ["no"],
        "A request to do something and evidence it happened are different.",
        "An attempted change is not evidence of the intended state.",
      ),
      exercise(
        "orientation-diagnose",
        "diagnose",
        "An AI suggests an unfamiliar command that changes files. Your first action: inspect, execute, or publish?",
        ["inspect"],
        "First determine the target and side effect.",
        "Read help and explain the command. Execute only after you understand and authorize its scope.",
      ),
    ],
    lab: {
      title: "Create your first evidence note",
      environment: shell,
      scenario:
        "A teammate needs proof that your practice environment is ready, without access to your computer.",
      steps: [
        "Open Ubuntu and identify the tab as Linux, not PowerShell.",
        "Create ~/atlas-labs/orientation and navigate into it.",
        "Capture the final pwd output and explain what ~ expanded to.",
        "Deliberately try cd into a nonexistent child named atlas-no-such-folder. Read the error, run pwd, and explain why the location did not change.",
        "Write a short note containing the failed action, observation, recovery, and verification. Do not include account secrets or full personal command history.",
      ],
      evidence: [
        "The final directory path, with your personal username redacted if desired",
        "The failed cd error and subsequent pwd",
        "Your own explanation of why a failed command did not prove a change",
      ],
      rubric: [
        "Correctly identifies the Linux environment",
        "Keeps all created files in the sandbox",
        "Distinguishes attempted action from observed state",
        "Explains the result without copying the solution",
      ],
      hints: [
        "The failure is intentional; do not create the missing folder.",
        "cd changes this shell only after it can enter the target directory.",
      ],
      solution:
        "mkdir -p ~/atlas-labs/orientation\ncd ~/atlas-labs/orientation\npwd\ncd atlas-no-such-folder\npwd\n# The second pwd still ends with /atlas-labs/orientation.",
      challenge:
        "Tomorrow, start in a different directory and establish the same workspace without opening the demo. Explain one command you chose to look up rather than memorize.",
    },
    resourceIds: ["linux-foundation", "lpi", "bash", "ai"],
  },
  {
    id: "terminal-map",
    section: 1,
    title: "Know where you are",
    minutes: 25,
    status: "released",
    prerequisites: ["orientation"],
    summary:
      "Navigate a filesystem using paths, inspect names, and let completion prevent typing mistakes.",
    outcomes: [
      "Use absolute and relative paths",
      "Explain ., .., and ~",
      "Inspect hidden files and use tab completion",
    ],
    concepts: [
      {
        title: "A path is an address",
        body: "An absolute path begins at /, the filesystem root. A relative path begins at your current directory. A filename can be correct while its relative path is wrong because the shell is somewhere else.",
        analogy:
          "An absolute path resembles a full street address; a relative path resembles “the next room”.",
      },
      {
        title: "Three useful shortcuts",
        body: ". means this directory, .. means its parent, and an unquoted ~ at the start of a shell word expands to your home directory. / is the filesystem root; /root is the root user’s home. These are different places.",
      },
      {
        title: "Inspect before acting",
        body: "pwd establishes your starting point. ls shows names; ls -la adds details and dotfiles. Tab can complete a path; pressing it again can show ambiguous matches. A missing file may simply be hidden or in a different directory.",
      },
      {
        title: "Repair the address",
        body: "For “No such file or directory,” check pwd, list the parent, check spelling and capitalization, and quote spaces. Linux filenames are normally case sensitive. Prove recovery by entering the intended directory and printing its path.",
      },
    ],
    commands: [
      command("pwd", "Print the current directory.", "pwd"),
      command(
        "ls",
        "List names; -la includes hidden entries and details.",
        "ls -la ~/atlas-labs",
      ),
      command(
        "cd",
        "Change this shell’s working directory.",
        "cd ~/atlas-labs",
      ),
      command(
        "Tab completion",
        "Complete a partially typed path.",
        "Type cd ~/atl then press Tab; inspect before Enter.",
      ),
    ],
    demo: {
      title: "Navigate the same target two ways",
      code: "mkdir -p ~/atlas-labs/map/notes\ncd ~/atlas-labs/map\npwd\nls -la\ncd ./notes\npwd\ncd ..\npwd\ncd ~/atlas-labs/map/notes",
      explanation:
        "./notes and the full path reach the same directory only when their starting context makes them equivalent. cd .. returns one level upward.",
    },
    practice: [
      "Navigate to your home using ~ and print the path.",
      "Use Tab to complete the lab path.",
      "From map/notes, predict where cd ../.. will go before running it.",
    ],
    exercises: [
      exercise(
        "terminal-map-recall",
        "recall",
        "Write the command to move to the parent directory.",
        ["cd .."],
        "The parent has a two-dot name.",
        "cd .. moves one directory level up.",
      ),
      exercise(
        "terminal-map-predict",
        "predict",
        "You are in /home/learner/atlas-labs/map. After cd ./notes, what is the absolute path?",
        ["/home/learner/atlas-labs/map/notes"],
        ". refers to the current directory.",
        "The relative child notes is resolved against the current directory.",
      ),
      exercise(
        "terminal-map-diagnose",
        "diagnose",
        "A file named .settings is absent from plain ls output. Which flag reveals hidden names: -a or -h?",
        ["-a", "a"],
        "The flag means all.",
        "Dotfiles are omitted by ordinary ls; ls -a includes them.",
      ),
    ],
    lab: {
      title: "Recover a lost location",
      environment: shell,
      scenario:
        "You need to enter an evidence directory from an unfamiliar starting point.",
      steps: [
        "Create ~/atlas-labs/map/evidence and ~/atlas-labs/map/drafts with mkdir -p.",
        "Begin in drafts. Reach evidence using a relative path.",
        "Return home, then reach evidence using a path starting with ~.",
        "Try the wrong capitalized name Evidence, inspect the failure, and recover.",
        "Explain how you would inspect a name containing spaces without guessing.",
      ],
      evidence: [
        "pwd before and after each route",
        "Both successful cd commands",
        "A note explaining the case mismatch",
      ],
      rubric: [
        "Uses a valid relative sibling path",
        "Reaches the same directory from home",
        "Uses inspection to correct the failed address",
      ],
      hints: [
        "Sibling directories share a parent.",
        'Quote an entire path containing spaces, such as cd "./my notes".',
      ],
      solution:
        "mkdir -p ~/atlas-labs/map/evidence ~/atlas-labs/map/drafts\ncd ~/atlas-labs/map/drafts\ncd ../evidence\npwd\ncd ~\ncd ~/atlas-labs/map/evidence\npwd\ncd ../Evidence\nls ..\ncd ../evidence",
      challenge:
        "Create a new three-level practice tree. Give a partner two different routes to the deepest directory and explain their starting assumptions.",
    },
    resourceIds: ["bash", "linux-foundation", "lpi"],
  },
  {
    id: "terminal-files",
    section: 1,
    title: "Create, copy, and move deliberately",
    minutes: 30,
    status: "released",
    prerequisites: ["terminal-map"],
    summary:
      "Build a small incident folder and distinguish creating a name, copying content, and moving it.",
    outcomes: [
      "Create nested folders and empty files",
      "Read small text files",
      "Copy and rename with overwrite protection",
    ],
    concepts: [
      {
        title: "Names and content are separate",
        body: "mkdir creates a directory. touch creates a missing empty file or updates an existing file’s timestamps; it does not empty an existing file. cat prints file contents. An empty output can mean an empty file, so inspect the filename too.",
      },
      {
        title: "Copy versus move",
        body: "cp makes another file containing the data. mv renames a file or moves it to a different directory. If the destination exists, these commands can overwrite it. Use -i during practice and read the prompt before responding.",
      },
      {
        title: "Small text needs careful quoting",
        body: "echo prints simple text. Quotes keep spaces inside one argument. The > symbol is handled by the shell and writes output to a file, replacing its current contents. We will explore streams separately; here only write newly created sandbox files.",
      },
      {
        title: "Verify the artifact",
        body: "A successful command alone does not tell you that the right file was changed. List both locations and read the intended destination. If content went to the wrong name, inspect it before moving it; do not delete unknown files to make the directory look tidy.",
      },
    ],
    commands: [
      command(
        "mkdir / mkdir -p",
        "Create one folder, or a tree with missing parents.",
        "mkdir -p ~/atlas-labs/files/evidence",
      ),
      command(
        "touch",
        "Create an empty file if absent; otherwise update timestamps.",
        "touch checklist.txt",
      ),
      command("cat", "Read a small text file.", "cat note.txt"),
      command(
        "echo",
        "Print a short literal message.",
        'echo "Observed at 10:00"',
      ),
      command(
        "cp -i",
        "Copy, asking before overwriting.",
        "cp -i note.txt evidence/note.txt",
      ),
      command(
        "mv -i",
        "Move or rename, asking before overwriting.",
        "mv -i note.txt incident.txt",
      ),
    ],
    demo: {
      title: "A working copy and an evidence copy",
      code: 'mkdir -p ~/atlas-labs/files/evidence\ncd ~/atlas-labs/files\ntouch checklist.txt\necho "HTTP request failed" > note.txt\ncp -i note.txt evidence/note.txt\nmv -i note.txt incident.txt\nls -l\ncat evidence/note.txt',
      explanation:
        "After the move, the original directory contains incident.txt. The evidence copy still has its own name and the same initial contents. Rerunning may prompt before overwriting; stop and inspect if these files contain work you need.",
    },
    practice: [
      "Make a fresh folder named rehearsal within files.",
      "Create an empty checklist, then explain why cat prints no text.",
      "Copy one short note and rename the original; inspect both.",
    ],
    exercises: [
      exercise(
        "terminal-files-recall",
        "recall",
        "Write the command that creates missing parent folders for logs/archive.",
        ["mkdir -p logs/archive"],
        "The parents option is a single-letter flag.",
        "mkdir -p creates any missing components and tolerates existing directories.",
      ),
      exercise(
        "terminal-files-predict",
        "predict",
        "report.txt contains hello. You run touch report.txt. Is its content hello or empty?",
        ["hello"],
        "touch changes timestamps on existing files.",
        "touch does not truncate existing content.",
      ),
      exercise(
        "terminal-files-diagnose",
        "diagnose",
        "You need a second copy while keeping the original name. Choose cp or mv.",
        ["cp"],
        "One duplicates; the other relocates.",
        "cp preserves the original; verify the destination before using it as evidence.",
      ),
    ],
    lab: {
      title: "Prepare a support ticket folder",
      environment: shell,
      scenario:
        "A support ticket needs a working note, a preserved copy, and an empty checklist.",
      steps: [
        "Create a new directory ~/atlas-labs/files/ticket-101 with an evidence child.",
        "Create a short note with echo and > only inside this new folder.",
        "Copy the note into evidence, then rename the working note to investigation.txt.",
        "Create checklist.txt without changing investigation.txt.",
        "Compare the directory listing and both note contents.",
      ],
      evidence: [
        "Final ls -l output for the ticket and evidence directories",
        "Both note contents",
        "Explanation of what touch would do if checklist.txt already had text",
      ],
      rubric: [
        "Keeps the evidence copy when renaming the working file",
        "Uses correct source and destination order",
        "Verifies contents and names instead of relying on silence",
      ],
      hints: [
        "cp source destination is the order.",
        "mkdir -p can create ticket-101/evidence in one operation.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/files/ticket-101/evidence\ncd ~/atlas-labs/files/ticket-101\necho "Investigating an HTTP failure" > note.txt\ncp -i note.txt evidence/note.txt\nmv -i note.txt investigation.txt\ntouch checklist.txt\nls -l\nls -l evidence\ncat investigation.txt evidence/note.txt',
      challenge:
        "Without the demo, build ticket-102 and preserve a copy before rewriting its working note. Explain why the preserved copy matters during troubleshooting.",
    },
    resourceIds: ["linux-man", "bash", "lpi"],
  },
  {
    id: "terminal-cleanup",
    section: 1,
    title: "Remove only what you intend",
    minutes: 25,
    status: "released",
    prerequisites: ["terminal-files"],
    summary:
      "Understand wildcards and irreversible deletion using a tiny, inspected sandbox.",
    outcomes: [
      "Predict shell wildcard expansion",
      "Distinguish file, empty-directory, and recursive removal",
      "Inspect exact targets before removal",
    ],
    concepts: [
      {
        title: "Expansion happens before the command",
        body: "In Bash, an unquoted * expands to matching names before most commands run. *.log usually matches log names in the current directory, not hidden dotfiles. A broad match can include more files than expected. Preview matches with ls, then choose explicit names for deletion.",
      },
      {
        title: "Deletion has no ordinary undo",
        body: "rm removes files without moving them to a desktop trash bin. rmdir removes an empty directory and refuses a nonempty one. rm -r traverses a directory tree. In this course, use rm -ri only on a newly created, explicitly named disposable tree after inspecting it.",
      },
      {
        title: "A refusal is useful evidence",
        body: "“Directory not empty” means the precondition for rmdir is false. Inspect with ls -la; do not respond by adding force flags. If the contents are expected lab files, remove their exact names and retry rmdir.",
      },
      {
        title: "Prove both absence and preservation",
        body: "After cleanup, verify the intended target is absent and a neighboring keep file remains. A cleanup that deletes everything may satisfy absence while failing the real task.",
      },
    ],
    commands: [
      command(
        "Wildcards * and ?",
        "Match names: * matches any sequence; ? matches one character.",
        "ls ./*.log",
        "Preview expansion; do not use a wildcard as a removal target in these labs.",
      ),
      command(
        "rm -i",
        "Remove one file after confirmation.",
        "rm -i ./discard.txt",
        "No ordinary undo. First verify pwd and the exact filename.",
      ),
      command("rmdir", "Remove an empty directory.", "rmdir ./empty"),
      command(
        "rm -ri",
        "Recursively remove an inspected disposable tree with prompts.",
        "rm -ri ~/atlas-labs/cleanup/disposable-tree",
        "Only this dedicated tree. Never use sudo, force flags, or a broad variable target.",
      ),
    ],
    demo: {
      title: "Let a precondition protect you",
      code: "mkdir -p ~/atlas-labs/cleanup/empty\ncd ~/atlas-labs/cleanup\ntouch keep.txt discard.txt\nls -la\nrm -i ./discard.txt\nrmdir ./empty\nls -la",
      explanation:
        "Read the rm confirmation and respond only after checking it names discard.txt. The final listing must retain keep.txt.",
    },
    practice: [
      "Create one.log and two.log, then preview ./*.log with ls.",
      "Try rmdir on a disposable directory containing one file and explain its refusal.",
      "Remove that exact file interactively, then retry rmdir.",
    ],
    exercises: [
      exercise(
        "terminal-cleanup-recall",
        "recall",
        "Which command removes an empty directory: rmdir or cat?",
        ["rmdir"],
        "Its name describes removing a directory.",
        "rmdir refuses nonempty directories, making it a useful cautious choice.",
      ),
      exercise(
        "terminal-cleanup-predict",
        "predict",
        "The directory contains a.log, b.log, and keep.txt. How many names match *.log?",
        ["2", "two"],
        "Only the suffix matters here.",
        "The shell expands the wildcard to a.log and b.log.",
      ),
      exercise(
        "terminal-cleanup-diagnose",
        "diagnose",
        "rmdir says “Directory not empty.” Your next step: inspect or force?",
        ["inspect"],
        "The unexpected contents are evidence.",
        "Use ls -la to see hidden and ordinary entries before deciding what is safe to remove.",
      ),
    ],
    lab: {
      title: "Clean a throwaway folder without collateral loss",
      environment: shell,
      scenario:
        "Remove a nested disposable tree while preserving a neighboring note.",
      steps: [
        "Create ~/atlas-labs/cleanup/disposable-tree/child and keep.txt beside disposable-tree.",
        "Create only a file named scratch.txt inside child.",
        "Inspect the parent, child, and keep.txt path. Do not proceed if unrelated work is present.",
        "Use rm -ri with the full dedicated disposable-tree path. Read each prompt.",
        "Verify keep.txt still exists and the tree is gone. Explain why you did not use a wildcard.",
      ],
      evidence: [
        "Before and after directory listings",
        "The exact removal command",
        "One sentence explaining the scope and irreversible effect",
      ],
      rubric: [
        "Checks the current path and all nested contents first",
        "Removes only the named disposable tree",
        "Proves keep.txt survived",
      ],
      hints: [
        "rm -ri can ask about descending into a directory as well as deleting its entries.",
        "If uncertain at any prompt, answer n and inspect again.",
      ],
      solution:
        "mkdir -p ~/atlas-labs/cleanup/disposable-tree/child\ntouch ~/atlas-labs/cleanup/keep.txt\ntouch ~/atlas-labs/cleanup/disposable-tree/child/scratch.txt\nls -la ~/atlas-labs/cleanup\nls -la ~/atlas-labs/cleanup/disposable-tree/child\nrm -ri ~/atlas-labs/cleanup/disposable-tree\nls -la ~/atlas-labs/cleanup\n# Confirm keep.txt remains and disposable-tree is absent.",
      challenge:
        "In a new sandbox, remove two explicitly named empty directories and one disposable file while preserving three neighbors. Narrate your checks before acting.",
    },
    resourceIds: ["bash", "linux-man"],
  },
  {
    id: "terminal-streams",
    section: 1,
    title: "Connect input, output, and errors",
    minutes: 35,
    status: "released",
    prerequisites: ["terminal-files"],
    summary:
      "Route text intentionally with redirection and pipes without losing errors or replacing evidence.",
    outcomes: [
      "Explain stdin, stdout, stderr and descriptors 0/1/2",
      "Choose overwrite, append, input redirection, or a pipe",
      "Capture an error separately from normal output",
    ],
    concepts: [
      {
        title: "Programs have text channels",
        body: "Standard input (stdin, descriptor 0) carries input. Standard output (stdout, 1) carries normal results. Standard error (stderr, 2) carries diagnostics. By default, input comes from the terminal and both output channels appear there, but they remain separate channels.",
      },
      {
        title: "The shell connects the channels",
        body: "> writes stdout to a file and truncates that file first. >> appends stdout. < reads stdin from a file. 2> redirects stderr. Redirection is arranged before the program runs, so even a failing program can leave an output file truncated.",
      },
      {
        title: "A pipe joins programs",
        body: "A | connects the left program’s stdout to the right program’s stdin. It does not pipe stderr by default. cat < note.txt reads a file through stdin; cat note.txt reads a filename argument. Both can display the same text through different mechanisms.",
      },
      {
        title: "Keep evidence intact",
        body: "If a log disappears, inspect whether > replaced it. Use >> for a chronological note, and keep error output when diagnosing failures. Never redirect a program’s output into the same file it is reading; the shell may truncate the input before the program reads it.",
      },
    ],
    commands: [
      command(
        ">",
        "Replace a file with stdout.",
        'echo "first observation" > note.txt',
        "Only use a fresh sandbox file or an intentional replacement.",
      ),
      command(">>", "Append stdout.", 'echo "second observation" >> note.txt'),
      command("<", "Read stdin from a file.", "cat < note.txt"),
      command(
        "2>",
        "Write stderr separately.",
        "cat missing.txt > result.txt 2> error.txt",
      ),
      command(
        "|",
        "Send stdout into another program’s stdin.",
        "cat note.txt | wc -l",
      ),
    ],
    demo: {
      title: "Normal results and failure evidence",
      code: 'mkdir -p ~/atlas-labs/streams\ncd ~/atlas-labs/streams\necho "first" > note.txt\necho "second" >> note.txt\ncat < note.txt\ncat atlas-missing.txt > result.txt 2> error.txt\ncat error.txt\nwc -l < note.txt',
      explanation:
        "note.txt has two newline-terminated lines. result.txt is created but empty because cat had no normal output. error.txt contains the missing-file diagnostic. wc -l counts newline characters, so this fixture produces 2.",
    },
    practice: [
      "Predict the contents after two > operations, then test in a new file.",
      "Repeat with > followed by >> and compare.",
      "Capture stdout and stderr into different files and inspect both.",
    ],
    exercises: [
      exercise(
        "terminal-streams-recall",
        "recall",
        "Which descriptor number is stderr?",
        ["2"],
        "The descriptors start at zero.",
        "0 is stdin, 1 is stdout, and 2 is stderr.",
      ),
      exercise(
        "terminal-streams-predict",
        "predict",
        "echo first > note.txt then echo second > note.txt: what single word remains?",
        ["second"],
        "Both operations replace.",
        "The second > truncates the file before echo writes.",
      ),
      exercise(
        "terminal-streams-diagnose",
        "diagnose",
        "A normal pipe misses an error message. Which stream usually carries diagnostics: stdout or stderr?",
        ["stderr", "standard error"],
        "Normal pipes connect descriptor 1.",
        "stderr is a separate channel and is not included by a plain | pipe.",
      ),
    ],
    lab: {
      title: "Keep results and errors separately",
      environment: shell,
      scenario:
        "An incident note must preserve two observations while a failed read produces a separate diagnostic.",
      steps: [
        "Create a fresh ~/atlas-labs/streams/capture directory.",
        "Write “request sent” to observations.txt, then append “request failed”.",
        "Read a deliberately nonexistent filename, redirecting stdout to result.txt and stderr to error.txt.",
        "Read observations.txt through stdin redirection.",
        "Report the line count and explain why result.txt can exist even though the read failed.",
      ],
      evidence: [
        "Two-line observations.txt content",
        "Captured missing-file diagnostic",
        "Explanation of 0, 1, 2 and the empty result file",
      ],
      rubric: [
        "Preserves both observations",
        "Separates normal output from diagnostics",
        "Explains why file existence does not prove command success",
      ],
      hints: [
        "Use >> for the second observation.",
        "Redirection creates or truncates the target before cat opens its input.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/streams/capture\ncd ~/atlas-labs/streams/capture\necho "request sent" > observations.txt\necho "request failed" >> observations.txt\ncat definitely-absent.txt > result.txt 2> error.txt\ncat < observations.txt\nwc -l < observations.txt\ncat error.txt\nls -l result.txt',
      challenge:
        "Capture three observations and one failure in a new directory without consulting the command cards. Explain what would change if you swapped > and >>.",
    },
    resourceIds: ["bash", "linux-man"],
  },
  {
    id: "terminal-search",
    section: 1,
    title: "Find the signal in files and logs",
    minutes: 35,
    status: "released",
    prerequisites: ["terminal-streams"],
    summary:
      "Locate files, select meaningful log lines, count evidence, and follow a changing log.",
    outcomes: [
      "Distinguish searching names from searching contents",
      "Use head, tail, and grep on a known fixture",
      "Follow a log and exit without stopping its writer",
    ],
    concepts: [
      {
        title: "Two different searches",
        body: "find traverses directories and tests file properties such as names. grep selects lines whose contents match a pattern. Use find to locate a log and grep to inspect errors inside it. Quote a find pattern so the shell does not expand it first.",
      },
      {
        title: "Read a bounded sample",
        body: "head -n 2 shows the first two lines; tail -n 2 shows the last two. wc -l counts newline characters. A small fixture lets you predict results and catches a pipeline that counts the wrong thing.",
      },
      {
        title: "Observe ongoing work",
        body: "tail -f follows new data in a growing file and stays running. Ctrl+C stops your follower. It does not stop a separate program writing the log. Real log rotation may replace files; tail -F can follow a name across replacement, which you can look up when needed.",
      },
      {
        title: "No match is not always a failure",
        body: "An empty grep result can mean no matching lines, a case mismatch, or the wrong file. Inspect the file and spelling before changing the application. grep is case sensitive unless asked otherwise with -i. For this lesson, use literal INFO and ERROR markers.",
      },
    ],
    commands: [
      command(
        "find",
        "Find filenames under a specific directory.",
        'find . -type f -name "*.log"',
      ),
      command(
        "grep",
        "Select matching lines; -n includes line numbers.",
        "grep -n ERROR app.log",
      ),
      command("head", "Read the beginning.", "head -n 2 app.log"),
      command(
        "tail",
        "Read the end or follow new lines.",
        "tail -f app.log",
        "Ctrl+C exits following.",
      ),
      command(
        "wc",
        "Count lines, words, or bytes.",
        "grep ERROR app.log | wc -l",
      ),
    ],
    demo: {
      title: "Count errors without reading the whole log",
      code: 'mkdir -p ~/atlas-labs/search\ncd ~/atlas-labs/search\necho "INFO start" > app.log\necho "ERROR timeout" >> app.log\necho "INFO retry" >> app.log\necho "ERROR refused" >> app.log\nfind . -type f -name "*.log"\ngrep -n ERROR app.log\ngrep ERROR app.log | wc -l\ntail -n 1 app.log',
      explanation:
        "find prints ./app.log. grep identifies lines 2 and 4. The pipeline returns 2 and the final tail returns ERROR refused. These predictable results are a test fixture for your understanding.",
    },
    practice: [
      "Predict head -n 2 app.log before running it.",
      "Search for lowercase error and explain the empty result.",
      "Run tail -f app.log; append a new line from a second Ubuntu tab, observe it, and press Ctrl+C in the follower.",
    ],
    exercises: [
      exercise(
        "terminal-search-recall",
        "recall",
        "Which command searches file contents: find or grep?",
        ["grep"],
        "The other locates files and directories.",
        "grep selects matching lines from content.",
      ),
      exercise(
        "terminal-search-predict",
        "predict",
        "A file has INFO, ERROR, ERROR on three newline-terminated lines. What does grep ERROR file | wc -l print?",
        ["2", "two"],
        "Only matched lines enter the pipe.",
        "Two selected newline-terminated lines reach wc.",
      ),
      exercise(
        "terminal-search-diagnose",
        "diagnose",
        "tail -f keeps the terminal occupied. Which key combination stops the follower?",
        ["ctrl+c", "ctrl-c", "control+c", "control-c"],
        "Send an interrupt to the foreground program.",
        "Ctrl+C interrupts tail. Another terminal writing the file remains unaffected.",
      ),
    ],
    lab: {
      title: "Extract an incident timeline",
      environment: shell,
      scenario:
        "You must report how many requests failed and identify the newest failure in a small application log.",
      steps: [
        "Create the demo fixture in a fresh ~/atlas-labs/search/ticket directory.",
        "Find its .log file by name starting at the ticket directory.",
        "Select ERROR lines with their original line numbers and count them.",
        "Follow the log in one tab and append “ERROR retry-exhausted” from another.",
        "Stop following, show the last line, and recount failures.",
      ],
      evidence: [
        "find result",
        "Numbered error lines before and after the append",
        "Counts of 2 then 3 and the newest error",
        "Explanation of why Ctrl+C did not erase the file",
      ],
      rubric: [
        "Uses a quoted filename pattern",
        "Counts only error lines",
        "Demonstrates live follow and clean exit",
        "Checks final content after the change",
      ],
      hints: [
        "Second tabs start in their own current directory; use the full sandbox path.",
        "wc -l counts lines delivered by the pipe, not all lines in the source file.",
      ],
      solution:
        '# After creating the four-line demo fixture in ticket:\ncd ~/atlas-labs/search/ticket\nfind . -type f -name "*.log"\ngrep -n ERROR app.log\ngrep ERROR app.log | wc -l\ntail -f app.log\n# In a second tab:\necho "ERROR retry-exhausted" >> ~/atlas-labs/search/ticket/app.log\n# After Ctrl+C in the first tab:\ntail -n 1 app.log\ngrep ERROR app.log | wc -l',
      challenge:
        "Make a six-line fixture containing warnings and errors. Without hints, report only warnings, their count, and the final two original lines. Explain why a count alone loses context.",
    },
    resourceIds: ["bash", "linux-man", "observability"],
  },
  {
    id: "terminal-control",
    section: 1,
    title: "Understand how the shell decides what happens next",
    minutes: 35,
    status: "released",
    prerequisites: ["terminal-search"],
    summary:
      "Inspect command lookup, exit status, and conditional execution instead of guessing from printed text.",
    outcomes: [
      "Inspect PATH and distinguish builtins from external commands",
      "Read the immediately preceding exit code",
      "Use && and || and retrieve commands safely",
    ],
    concepts: [
      {
        title: "A name must resolve to an action",
        body: "Bash checks functions and builtins as well as external programs. cd must affect the current shell, so it is a builtin. External program names are commonly found through the colon-separated directories in $PATH. type shows how a name resolves; a file in the current directory is not automatically on PATH.",
      },
      {
        title: "Status is a separate result",
        body: "A command returns an integer status. Zero conventionally means success; nonzero means a condition requiring interpretation. echo $? prints the status of the immediately previous command. Capture it before running another command, which replaces it. grep returns 1 for no matching lines; that is different from an inability to read the file.",
      },
      {
        title: "Conditional execution",
        body: "A && B runs B only if A succeeds. A || B runs B only if A fails. These connect status, not whether output looks reassuring. More complex chains have subtle grouping behavior; keep beginner scripts explicit and small.",
      },
      {
        title: "Lookup beats risky memory",
        body: "Use man for detailed reference, / to search inside many manual viewers, and q to quit. history shows previous commands, which can contain sensitive information. Inspect and edit recalled commands before running them; do not submit your entire history publicly.",
      },
    ],
    commands: [
      command("type", "Describe how Bash resolves a command.", "type cd"),
      command(
        "$PATH",
        "A colon-separated search path for external programs.",
        'echo "$PATH"',
      ),
      command(
        "$?",
        "Status from the immediately preceding command.",
        'echo "$?"',
      ),
      command(
        "&& / ||",
        "Run a next action based on success or failure.",
        'cat missing.txt || echo "Read failed"',
      ),
      command(
        "history",
        "Review prior commands in this shell.",
        "history 5",
        "Redact private commands; arrow keys can recall and edit without auto-executing.",
      ),
      command("man", "Look up behavior and options.", "man grep"),
    ],
    demo: {
      title: "A controlled failure and fallback",
      code: 'mkdir -p ~/atlas-labs/control\ncd ~/atlas-labs/control\ntype cd\ntype cat\necho "$PATH"\ncat atlas-absent.txt\necho "$?"\ncat atlas-absent.txt || echo "Could not read the file"\necho "ready" > state.txt\ngrep ready state.txt && echo "State confirmed"',
      explanation:
        "The failed cat returns nonzero. The fallback runs because of that status. The successful grep returns zero, so the && message runs. type may report aliases or functions on a customized machine; inspect the real result.",
    },
    practice: [
      "Look up grep and find the EXIT STATUS section.",
      'Run grep absent state.txt followed immediately by echo "$?".',
      "Use an arrow key to recall a harmless command, edit it, then decide whether to run it.",
    ],
    exercises: [
      exercise(
        "terminal-control-recall",
        "recall",
        "Write the usual command to print the preceding exit status.",
        ["echo $?", 'echo "$?"'],
        "Use echo and the special status expansion.",
        "Read $? immediately; another command overwrites the status.",
      ),
      exercise(
        "terminal-control-predict",
        "predict",
        "The left command returns 1 in left && echo done. Does done print? Answer yes or no.",
        ["no"],
        "&& requires zero status.",
        "The right command is skipped after a nonzero status.",
      ),
      exercise(
        "terminal-control-diagnose",
        "diagnose",
        "You ran ls after a failed grep, then echo $?. Which command status are you reading: ls or grep?",
        ["ls"],
        "It remembers only the immediately previous command.",
        "The intervening ls replaced grep’s status.",
      ),
    ],
    lab: {
      title: "Build a truthful status check",
      environment: shell,
      scenario:
        "Your check must say “present” only when a fixture contains READY and “missing” when it does not.",
      steps: [
        "Create ~/atlas-labs/control/check and a file state.txt containing READY.",
        "Use grep with && to print present after a match.",
        "Search for ABSENT and immediately inspect its exit status.",
        "Use || to print missing after that search.",
        "Inspect how cd and cat resolve, and explain why PATH matters to one of them.",
      ],
      evidence: [
        "Commands and outputs for match and no match",
        "The immediately captured nonzero status",
        "type results and your builtin explanation",
      ],
      rubric: [
        "Uses exit status rather than output text to control execution",
        "Does not overwrite the status before inspecting it",
        "Explains command lookup without editing PATH",
      ],
      hints: [
        "A grep no-match normally returns 1.",
        "Use separate short checks while learning, rather than a long &&/|| chain.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/control/check\ncd ~/atlas-labs/control/check\necho READY > state.txt\ngrep READY state.txt && echo present\ngrep ABSENT state.txt\necho "$?"\ngrep ABSENT state.txt || echo missing\ntype cd\ntype cat',
      challenge:
        "Repeat with a nonexistent file and distinguish “no match” from “could not read.” Consult the manual and record both statuses and diagnostics.",
    },
    resourceIds: ["bash", "linux-man"],
  },
  {
    id: "linux-permissions",
    section: 2,
    title: "Give the right identity the smallest useful access",
    minutes: 40,
    status: "released",
    prerequisites: ["terminal-control"],
    summary:
      "Read Linux ownership and permissions, reproduce a denial, and repair only the missing access.",
    outcomes: [
      "Interpret user/group/other and rwx",
      "Translate 600, 644, and 755",
      "Explain sudo, root, group ownership, and least privilege",
    ],
    concepts: [
      {
        title: "Identity comes before permission",
        body: "whoami prints your effective username. id shows user and group IDs and group membership. ls -l shows a file’s owner, group, and permission bits. Linux evaluates owner, group, or other permissions according to the accessing identity; it does not simply add all three categories together.",
      },
      {
        title: "Read, write, execute",
        body: "For files, r reads contents, w changes contents, and x permits execution. For directories, r lists names, w changes entries, and x permits traversal/search. A readable file can still be inaccessible when a parent directory lacks traversal permission. Deleting a file normally depends on the parent directory’s permissions, not just the file’s write bit.",
      },
      {
        title: "Two ways to state access",
        body: "Symbolic modes name a class and change: chmod u+r restores owner read access; chmod go-w removes group/other write access. Numeric modes assign r=4, w=2, x=1. 600 is owner read/write only; 644 adds group/other read; 755 adds owner write and executable/readable access for all. Do not make a sensitive file 777 to bypass diagnosis.",
      },
      {
        title: "Privilege is a deliberate boundary",
        body: "root is the privileged administrative identity. sudo runs a permitted command as another user, usually root; it is not a generic repair prefix. chgrp changes group ownership when allowed; chown changes ownership and usually requires administrative privilege. In this lab, work only on your own files and use your own primary group. Inspect the denial, change the exact missing bit, then retry the original access.",
      },
    ],
    commands: [
      command(
        "whoami / id / groups",
        "Identify the user and list group memberships.",
        "whoami\nid\ngroups\nid -gn",
      ),
      command(
        "ls -l",
        "Inspect owner, group, and mode.",
        "ls -l private-note.txt",
      ),
      command(
        "chmod",
        "Change permission bits on a file you own.",
        "chmod 600 private-note.txt",
      ),
      command(
        "chgrp",
        "Change a file to an allowed group.",
        'chgrp "$(id -gn)" private-note.txt',
        "$(id -gn) substitutes the name of your primary group; explain it before running.",
      ),
      command(
        "sudo / chown",
        "Administrative execution / changing file ownership.",
        "man sudo\nman chown",
        "Conceptual here. Do not run privileged ownership changes in this exercise.",
      ),
    ],
    demo: {
      title: "Cause and repair a specific denial",
      code: 'mkdir -p ~/atlas-labs/permissions\ncd ~/atlas-labs/permissions\necho "Practice data, not a secret" > private-note.txt\nchmod 600 private-note.txt\nls -l private-note.txt\nchmod u-r private-note.txt\ncat private-note.txt\nchmod u+r private-note.txt\ncat private-note.txt\nls -l private-note.txt',
      explanation:
        "As an ordinary non-root owner, removing u-r blocks your read. Restoring u+r repairs it while preserving the other restrictions. If you ran as root, the expected denial may not occur; return to your ordinary account rather than treating that as a successful exercise.",
    },
    practice: [
      "Translate 600, 644, and 755 into nine rwx positions on paper.",
      "Run whoami and id; explain the difference between user identity and group membership.",
      "Change the practice note to your primary group with chgrp and inspect the group column.",
    ],
    exercises: [
      exercise(
        "linux-permissions-recall",
        "recall",
        "Which numeric mode gives only the owner read/write and nobody else access?",
        ["600"],
        "Owner needs 4+2; group and other need zero.",
        "600 is rw-------.",
      ),
      exercise(
        "linux-permissions-predict",
        "predict",
        "For a regular file with mode 644, can the owner execute it based on these mode bits? yes or no.",
        ["no"],
        "The owner has 6, which is 4+2.",
        "No execute bit is set. Read/write permission is not execution permission.",
      ),
      exercise(
        "linux-permissions-diagnose",
        "diagnose",
        "Your owned practice file lacks owner read access. Write the narrow symbolic repair for note.txt.",
        ["chmod u+r note.txt"],
        "Add read to user only.",
        "The repair adds exactly owner read permission, avoiding broader access.",
      ),
    ],
    lab: {
      title: "Recover a denied evidence file",
      environment: ubuntu,
      scenario:
        "A support note should be private to its owner, but an accidental mode change prevents reading it.",
      steps: [
        "Confirm you are not root and create a harmless note under ~/atlas-labs/permissions/recovery.",
        "Set it to 600, inspect it, then deliberately remove owner read access.",
        "Capture the failed cat and inspect ownership and mode.",
        "Restore only owner read and repeat cat.",
        "Create two additional empty practice files and set them to 644 and 755. Explain why the second is executable but contains no useful program.",
      ],
      evidence: [
        "Identity and before/after mode listings",
        "The failed read and successful repeat",
        "Translations of all three modes and a least-privilege explanation",
      ],
      rubric: [
        "Reproduces the denial as an ordinary user",
        "Repairs only the missing permission",
        "Verifies the original operation and final mode",
        "Explains why sudo would hide the learning failure",
      ],
      hints: [
        "chmod u-r removes only the owner’s read bit.",
        "An executable bit does not create script contents.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/permissions/recovery\ncd ~/atlas-labs/permissions/recovery\nwhoami\necho "Harmless lab evidence" > note.txt\nchmod 600 note.txt\nchmod u-r note.txt\nls -l note.txt\ncat note.txt\nchmod u+r note.txt\ncat note.txt\ntouch public-note.txt executable-example\nchmod 644 public-note.txt\nchmod 755 executable-example\nls -l',
      challenge:
        "Start with a file at 666 and reduce it to owner read/write and group read using symbolic changes. Explain why changing the parent directory is a separate decision.",
    },
    resourceIds: ["linux-man", "lpi", "security"],
  },
  {
    id: "linux-processes",
    section: 2,
    title: "Inspect a process before sending a signal",
    minutes: 30,
    status: "released",
    prerequisites: ["linux-permissions"],
    summary:
      "Track a harmless process from creation to termination and verify its identity before acting.",
    outcomes: [
      "Explain PID and PPID",
      "Inspect a selected process and system activity",
      "Prefer SIGTERM and understand why SIGKILL is a last resort",
    ],
    concepts: [
      {
        title: "A process is a running program",
        body: "The kernel gives each process a process ID (PID). The parent process ID (PPID) identifies the process that created it. Multiple processes can run the same program. A name alone is a weak target; inspect PID, owner, command, and context.",
      },
      {
        title: "Snapshots versus live views",
        body: "ps reports a snapshot. ps aux shows many users’ processes and full arguments on Linux; a focused ps -p PID is easier to reason about. top continuously refreshes activity; q exits. Process arguments can contain private data, so redact evidence before sharing.",
      },
      {
        title: "A signal is a request or control event",
        body: "kill sends a signal; it does not always mean immediate forced termination. SIGTERM (15) requests termination and allows a program to handle cleanup. SIGKILL (9) cannot be caught and prevents application cleanup. Use TERM first on a known lab process; do not use broad name-based killing.",
      },
      {
        title: "Prove the intended process stopped",
        body: "A stale PID can later identify a different process. Inspect immediately before signaling, and verify the same lab command afterward. A missing process is expected if sleep naturally finished; do not reuse the old PID on another day.",
      },
    ],
    commands: [
      command(
        "ps",
        "Inspect selected process identity and parent.",
        'ps -p "$atlas_pid" -o pid,ppid,user,stat,comm',
      ),
      command(
        "ps aux",
        "View a broad Linux process snapshot.",
        "ps aux | head -n 8",
        "Arguments may contain private information.",
      ),
      command(
        "top",
        "View changing process/resource activity; q quits.",
        "top",
      ),
      command(
        "kill -TERM",
        "Request graceful termination of a verified lab process.",
        'kill -TERM "$atlas_pid"',
        "Use only the PID you just created and inspected.",
      ),
      command(
        "sleep / & / $!",
        "Create a harmless timed process in the background and capture its PID.",
        "sleep 120 &\natlas_pid=$!",
        "$! is the latest background process PID in this shell.",
      ),
    ],
    demo: {
      title: "Follow one process through its lifecycle",
      code: 'sleep 120 &\natlas_pid=$!\nps -p "$atlas_pid" -o pid,ppid,user,stat,comm\nkill -TERM "$atlas_pid"\nps -p "$atlas_pid" -o pid,ppid,user,stat,comm',
      explanation:
        "The first inspection should show sleep owned by you. After termination and shell cleanup, the second shows no matching running process. A brief asynchronous delay can occur; inspect once more if needed. Do not substitute an unrelated process when the lab process has already ended.",
    },
    practice: [
      "Find the PPID of your lab sleep and explain which shell launched it.",
      "Open top and exit with q without changing anything.",
      "Explain why “kill everything named python” is unsafe on a shared system.",
    ],
    exercises: [
      exercise(
        "linux-processes-recall",
        "recall",
        "What abbreviation identifies a process’s parent?",
        ["ppid"],
        "It adds parent to PID.",
        "PPID is the parent process ID.",
      ),
      exercise(
        "linux-processes-predict",
        "predict",
        "Can a program catch SIGKILL to finish writing a file? yes or no.",
        ["no"],
        "Signal 9 bypasses application handlers.",
        "SIGKILL cannot be caught, blocked, or handled for cleanup.",
      ),
      exercise(
        "linux-processes-diagnose",
        "diagnose",
        "Which signal should you normally try first on your verified lab process: SIGTERM or SIGKILL?",
        ["sigterm", "term", "15"],
        "Give it a chance to clean up.",
        "TERM requests termination; KILL is reserved for cases that do not respond and have been assessed.",
      ),
    ],
    lab: {
      title: "Close only your test process",
      environment: ubuntu,
      scenario:
        "A harmless timed task should stop, while a second task must continue.",
      steps: [
        "Start sleep 180 in the background and immediately capture its PID as atlas_first.",
        "Start a second sleep 180 and capture its PID as atlas_second.",
        "Inspect both with ps, including owner, PPID, and command.",
        "Send TERM only to atlas_first and verify atlas_second is still present.",
        "Inspect atlas_second again, then send it TERM for cleanup. Never signal a PID whose command or owner does not match this exercise.",
      ],
      evidence: [
        "Both process identities before the change",
        "First process absent and second present afterward",
        "Your explanation of TERM versus KILL",
      ],
      rubric: [
        "Captures each PID immediately after launch",
        "Verifies identity before every signal",
        "Stops the selected process without stopping its neighbor",
        "Cleans up the second lab process",
      ],
      hints: [
        "Each new background launch replaces $!. Save it immediately.",
        'Use ps -p "$atlas_first" and ps -p "$atlas_second" separately to avoid confusing output.',
      ],
      solution:
        'sleep 180 &\natlas_first=$!\nsleep 180 &\natlas_second=$!\nps -p "$atlas_first" -o pid,ppid,user,comm\nps -p "$atlas_second" -o pid,ppid,user,comm\nkill -TERM "$atlas_first"\nps -p "$atlas_first" -o pid,ppid,user,comm\nps -p "$atlas_second" -o pid,ppid,user,comm\nkill -TERM "$atlas_second"',
      challenge:
        "Repeat later without the solution. Explain why the captured PID is valid for this run but should not be stored as a permanent cleanup command.",
    },
    resourceIds: ["linux-man", "lpi"],
  },
  {
    id: "linux-jobs",
    section: 2,
    title: "Control foreground and background work",
    minutes: 30,
    status: "released",
    prerequisites: ["linux-processes"],
    summary:
      "Pause, resume, foreground, and stop a harmless job without confusing job numbers with PIDs.",
    outcomes: [
      "Distinguish a shell job from an operating-system process",
      "Use &, jobs, fg, and bg",
      "Explain Ctrl+C versus Ctrl+Z",
    ],
    concepts: [
      {
        title: "The shell groups work into jobs",
        body: "A job is work tracked by one interactive shell; it can include multiple pipeline processes. Job numbers such as %1 are local to that shell. PIDs belong to the operating system. A new terminal tab does not inherit the old tab’s jobs list.",
      },
      {
        title: "Foreground has the keyboard",
        body: "A foreground job receives terminal input and terminal-generated signals. & starts a command in the background so the shell can accept another command. Background work is not automatically a durable service; closing the session may affect it.",
      },
      {
        title: "Pause is not terminate",
        body: "Ctrl+Z normally suspends a foreground job. bg resumes a stopped job in the background. fg brings a job to the foreground. Ctrl+C normally interrupts the foreground job. A stopped job still exists, so a prompt returning does not prove the task ended.",
      },
      {
        title: "Inspect the job number",
        body: "jobs shows shell-tracked work and jobs -l adds PIDs. Use the actual number shown when choosing fg %N or bg %N. If the shell says “no such job,” inspect this tab’s jobs list instead of guessing numbers from an earlier session.",
      },
    ],
    commands: [
      command("&", "Launch a job in the background.", "sleep 180 &"),
      command(
        "jobs / jobs -l",
        "Inspect this shell’s jobs and PIDs.",
        "jobs -l",
      ),
      command(
        "fg",
        "Move a selected job to the foreground.",
        "fg %1",
        "Replace 1 with the actual job number from jobs.",
      ),
      command(
        "bg",
        "Resume a stopped job in the background.",
        "bg %1",
        "Replace 1 with the actual stopped job number.",
      ),
      command(
        "Ctrl+Z / Ctrl+C",
        "Suspend / interrupt foreground work.",
        "Run sleep 180, press Ctrl+Z, inspect jobs; later foreground it and press Ctrl+C.",
      ),
    ],
    demo: {
      title: "Observe all three job states",
      code: "sleep 180\n# Press Ctrl+Z; do not type the key name as a command.\njobs -l\n# Substitute the actual job number shown below.\nbg %1\njobs -l\nfg %1\n# Press Ctrl+C.\njobs -l",
      explanation:
        "The job moves from foreground running to stopped, then background running, then foreground running, then interrupted. %1 is an example only; confirm your shell’s job number.",
    },
    practice: [
      "Predict whether Ctrl+Z removes the process; inspect with jobs -l.",
      "Open a second terminal and compare its jobs output.",
      "Bring the original job forward and interrupt it, then verify the first terminal’s job list.",
    ],
    exercises: [
      exercise(
        "linux-jobs-recall",
        "recall",
        "Which command lists jobs with process IDs?",
        ["jobs -l"],
        "Use the long-detail flag on jobs.",
        "jobs -l includes PID information alongside shell job numbers.",
      ),
      exercise(
        "linux-jobs-predict",
        "predict",
        "After Ctrl+Z pauses sleep, is it stopped or terminated?",
        ["stopped", "suspended"],
        "Pause leaves the process available to resume.",
        "The shell can resume a stopped job using bg or fg.",
      ),
      exercise(
        "linux-jobs-diagnose",
        "diagnose",
        "Job %2 is stopped in this shell. Write the command to resume it in the background.",
        ["bg %2"],
        "Background uses the job spec, including %.",
        "bg %2 resumes that selected stopped job without taking the terminal foreground.",
      ),
    ],
    lab: {
      title: "Recover a “frozen” terminal safely",
      environment: ubuntu,
      scenario:
        "A long-running harmless command occupies the terminal. You must pause it, do an inspection, resume it, and finally stop it.",
      steps: [
        "Start sleep 180 in a fresh Ubuntu tab.",
        "Suspend it with Ctrl+Z and inspect jobs -l.",
        "Record the job number and PID, then resume the actual job with bg.",
        "Run pwd while the sleep remains in the background.",
        "Bring that job forward, interrupt it with Ctrl+C, and verify it no longer runs.",
      ],
      evidence: [
        "Stopped and running jobs output",
        "The selected job number and its PID",
        "Final jobs output and your explanation of the two keyboard signals",
      ],
      rubric: [
        "Uses the observed job number",
        "Distinguishes pause from termination",
        "Demonstrates shell work while the task runs in background",
        "Leaves no lab job running",
      ],
      hints: [
        "If sleep finishes naturally before the next step, start a fresh lab job and use its new identifiers.",
        "Type fg % followed by the observed number; then press Ctrl+C.",
      ],
      solution:
        "sleep 180\n# Press Ctrl+Z.\njobs -l\n# If jobs shows [1], use:\nbg %1\npwd\njobs -l\nfg %1\n# Press Ctrl+C.\njobs -l",
      challenge:
        "Start two harmless sleep jobs. Pause and resume only one while explaining how shell job numbers differ from the PIDs printed by ps.",
    },
    resourceIds: ["bash", "linux-man"],
  },
  {
    id: "linux-services",
    section: 2,
    title: "Inspect the service manager and package lifecycle",
    minutes: 40,
    status: "released",
    prerequisites: ["linux-jobs"],
    summary:
      "Separate installed software, service configuration, current runtime state, and useful logs.",
    outcomes: [
      "Identify systemd and inspect a unit",
      "Distinguish start, restart, enable, and package installation",
      "Read bounded journal output and understand apt operations",
    ],
    concepts: [
      {
        title: "A service has a manager",
        body: "A daemon is a background program; a service manager starts and supervises managed work. On Ubuntu using systemd, systemd is PID 1 and a unit describes a service. A running background shell job is not automatically a managed service.",
      },
      {
        title: "Installed, enabled, and active are different",
        body: "apt install installs a package and may trigger service startup. systemctl start runs a unit now. stop stops it now. restart stops and starts it, which can interrupt requests. enable changes startup configuration; it does not by itself mean “running now.” A package can be installed while its service is inactive.",
      },
      {
        title: "WSL and macOS are different environments",
        body: "Check ps -p 1 -o comm= in Ubuntu. If systemd is not PID 1, use the official WSL systemd guide before service labs; do not blindly rewrite wsl.conf. Restarting WSL from Windows can interrupt other distributions. macOS uses different service tooling, so systemctl and apt examples belong inside Ubuntu, even when your client is a Mac.",
      },
      {
        title: "Logs explain transitions",
        body: "systemctl status is a snapshot and may show only a few recent messages. journalctl -u UNIT -n 20 --no-pager narrows evidence. Missing logs can mean insufficient access or no events, not proven health. apt update refreshes package metadata; it does not upgrade installed packages. apt install adds software, while apt remove removes a package and can leave configuration. Read proposed changes before accepting any package operation.",
      },
    ],
    commands: [
      command(
        "systemctl status",
        "Inspect current unit state without changing it.",
        "systemctl status cron --no-pager",
      ),
      command(
        "journalctl",
        "Read a bounded unit journal.",
        "journalctl -u cron -n 20 --no-pager",
      ),
      command(
        "systemctl start / stop / restart",
        "Change current runtime state of an explicitly selected service.",
        "sudo systemctl start nginx",
        "Reserved for the later, explicitly accepted disposable Nginx lab. Restart can interrupt clients.",
      ),
      command(
        "apt update / install / remove",
        "Refresh package metadata / install / remove.",
        "apt show nginx\n# Later lab only: sudo apt update\n# Later lab only: sudo apt install nginx\n# Optional teardown after review: sudo apt remove nginx",
        "Read package and removal plans. Never remove unrelated packages or run these on a shared server for practice.",
      ),
    ],
    demo: {
      title: "Inspect the known cron service without changing it",
      code: "ps -p 1 -o comm=\nsystemctl status cron --no-pager\njournalctl -u cron -n 20 --no-pager\napt show nginx",
      explanation:
        "Proceed with systemctl only when PID 1 is systemd. cron may be absent or inactive; record that actual state. apt show describes a package; it does not prove installation or a running service. A status command can return nonzero when the unit is inactive.",
    },
    practice: [
      "Explain what an inactive installed service means.",
      "Find the newest displayed journal timestamp and distinguish historical entries from current state.",
      "Read the WSL resource if your environment lacks systemd; retain this lesson as practicing until the environment is ready.",
    ],
    exercises: [
      exercise(
        "linux-services-recall",
        "recall",
        "Write a read-only command to inspect nginx status without a pager.",
        [
          "systemctl status nginx --no-pager",
          "systemctl --no-pager status nginx",
        ],
        "Use status, the unit name, and the no-pager option.",
        "status inspects current state without starting or stopping the unit.",
      ),
      exercise(
        "linux-services-predict",
        "predict",
        "Does apt update alone upgrade installed packages? yes or no.",
        ["no"],
        "It refreshes package information.",
        "apt update downloads metadata; upgrading installed packages is a different operation.",
      ),
      exercise(
        "linux-services-diagnose",
        "diagnose",
        "systemctl reports systemd is not PID 1 in WSL. Inspect the environment or repeatedly restart nginx?",
        ["inspect the environment", "inspect", "environment"],
        "The manager itself is not running in that role.",
        "Establish systemd support and configuration first using the WSL guide.",
      ),
    ],
    lab: {
      title: "Write a service-state report",
      environment: ubuntu,
      scenario:
        "A teammate confuses “package available,” “service enabled,” and “service active.” Produce an evidence-based explanation using your Ubuntu environment.",
      steps: [
        "Inspect PID 1. If it is not systemd, document the prerequisite and use the official WSL guide; do not pretend the service checks passed.",
        "Inspect cron with systemctl status. If cron is absent, inspect a known installed harmless unit from systemctl list-units --type=service and record its name.",
        "Read at most 20 journal entries for the same unit.",
        "Read apt show nginx without installing anything.",
        "Describe what each output proves and what it does not prove. Redact personal hostnames from public evidence.",
      ],
      evidence: [
        "PID 1 identity and selected unit name",
        "Service status and bounded journal excerpt",
        "A three-way distinction between metadata, startup configuration, and current runtime state",
      ],
      rubric: [
        "Uses Ubuntu rather than macOS system commands",
        "Does not infer running state from package metadata",
        "Associates logs with the same unit and relevant time",
        "Reports absent evidence honestly",
      ],
      hints: [
        "No journal entries is an observation, not a reason to invent a log.",
        "systemctl is-enabled UNIT inspects startup configuration separately; it can report static for units not intended to be enabled directly.",
      ],
      solution:
        "ps -p 1 -o comm=\n# Only when the output is systemd:\nsystemctl status cron --no-pager\nsystemctl is-enabled cron\njournalctl -u cron -n 20 --no-pager\napt show nginx\n# If cron is absent, choose an existing unit from:\nsystemctl list-units --type=service --no-pager",
      challenge:
        "Without hints, explain how a service can be installed, disabled, and active at the same time. Inspect another existing unit without changing it.",
    },
    resourceIds: ["ubuntu", "wsl", "linux-man"],
  },
  {
    id: "linux-resources",
    section: 2,
    title: "Inspect disk and memory without creating a crisis",
    minutes: 30,
    status: "released",
    prerequisites: ["linux-services"],
    summary:
      "Tell filesystem capacity, directory usage, and available memory apart.",
    outcomes: [
      "Use df, du, and free for distinct questions",
      "Interpret available memory rather than just unused memory",
      "Report a bounded resource hypothesis and next test",
    ],
    concepts: [
      {
        title: "Capacity and consumption are different questions",
        body: "df -h PATH reports the filesystem containing PATH. du -sh DIRECTORY summarizes the directory’s disk usage. A small folder can sit on a nearly full filesystem because other folders consume space. Inspect the same mount when comparing results.",
      },
      {
        title: "Memory is used to help you",
        body: "Linux uses memory for caches. free -h includes available memory, an estimate of memory available for new work without swapping. Low completely free memory alone does not prove a leak. Observe trends and workload context before deciding there is pressure.",
      },
      {
        title: "Your environment sets the scope",
        body: "Inside WSL, free describes the Linux environment’s view, not a complete Windows physical-memory report. df under /mnt/c and under the Linux home can describe different filesystems. State which path and environment you measured.",
      },
      {
        title: "Inspect before cleanup or resizing",
        body: "When writes fail, check the error, filesystem usage, and permissions. A full disk is one hypothesis; permission denial is another. Never fill a real disk to practice. Do not delete logs or other users’ data blindly. Prove a repair with the original write and a new capacity check.",
      },
    ],
    commands: [
      command(
        "df -h",
        "Inspect capacity of the filesystem containing a path.",
        "df -h ~/atlas-labs",
      ),
      command(
        "du -sh",
        "Summarize disk usage for a directory.",
        "du -sh ~/atlas-labs",
      ),
      command(
        "free -h",
        "Inspect Linux memory totals and availability.",
        "free -h",
      ),
      command(
        "df -i",
        "Inspect inode capacity when space appears available.",
        "df -i ~/atlas-labs",
        "Inodes track filesystem objects; this is a diagnostic extension, not a reason to create many files.",
      ),
    ],
    demo: {
      title: "Ask three specific questions",
      code: 'mkdir -p ~/atlas-labs/resources\necho "A small known fixture" > ~/atlas-labs/resources/sample.txt\ndf -h ~/atlas-labs/resources\ndu -sh ~/atlas-labs/resources\nfree -h',
      explanation:
        "The answers are filesystem capacity, usage of this directory, and Linux memory state. Exact numbers vary. Do not claim a leak or a full disk from a single unlabeled number.",
    },
    practice: [
      "Point to the Available column of df and the available column of free.",
      "Compare df for ~/atlas-labs and, on WSL only, /mnt/c; explain whether they describe the same mount.",
      "Explain why a 1 KB text file can occupy more than 1 KB of allocated disk space.",
    ],
    exercises: [
      exercise(
        "linux-resources-recall",
        "recall",
        "Write the command to summarize ~/atlas-labs directory usage in human-readable units.",
        ["du -sh ~/atlas-labs"],
        "Directory usage, summary, human-readable.",
        "du -sh targets consumption of that directory, not total filesystem capacity.",
      ),
      exercise(
        "linux-resources-predict",
        "predict",
        "Does a small du result prove the whole filesystem has plenty of space? yes or no.",
        ["no"],
        "Other directories share the filesystem.",
        "Use df to inspect the containing filesystem’s capacity.",
      ),
      exercise(
        "linux-resources-diagnose",
        "diagnose",
        "free shows little free memory but substantial available memory. Is a memory leak proven? yes or no.",
        ["no"],
        "Caches and reclaimable memory matter.",
        "A leak needs further evidence such as sustained growth under comparable workload.",
      ),
      exercise(
        "linux-resources-capacity",
        "recall",
        "Your lab folder is small, but you need the containing filesystem’s free capacity in readable units. Write the command targeting ~/atlas-labs.",
        ["df -h ~/atlas-labs"],
        "Use the capacity tool rather than directory usage.",
        "df -h ~/atlas-labs measures capacity on the filesystem that contains this path; du answers a different question.",
      ),
    ],
    lab: {
      title: "Produce a resource triage note",
      environment: ubuntu,
      scenario:
        "A fictional ticket says “the machine is out of resources.” Replace the vague claim with measurements, without stressing your machine.",
      steps: [
        "Create a small text fixture in ~/atlas-labs/resources/ticket.",
        "Measure its directory usage and containing filesystem capacity.",
        "Capture a memory snapshot and label the available value.",
        "Write one supported observation and one hypothesis that remains unproven.",
        "Explain which next check would distinguish disk exhaustion from a permission-denied write. Do not intentionally exhaust disk or memory.",
      ],
      evidence: [
        "Labeled df, du, and free output",
        "Environment and measured path",
        "A next-test explanation tied to the actual error type",
      ],
      rubric: [
        "Distinguishes directory usage from filesystem capacity",
        "Interprets available memory without claiming a leak",
        "Makes no destructive cleanup or resource-pressure changes",
      ],
      hints: [
        "Use the same sandbox path for df and du.",
        "The exact diagnostic message is often more useful than “it failed.”",
      ],
      solution:
        'mkdir -p ~/atlas-labs/resources/ticket\necho "Small fixture" > ~/atlas-labs/resources/ticket/note.txt\ndf -h ~/atlas-labs/resources/ticket\ndu -sh ~/atlas-labs/resources/ticket\nfree -h\nls -ld ~/atlas-labs/resources/ticket\n# Explain which output supports capacity versus permission hypotheses.',
      challenge:
        "Repeat after a normal day of work. Compare observations without assuming that any change is a fault. State what additional evidence you would need before recommending cleanup.",
    },
    resourceIds: ["linux-man", "lpi", "observability"],
  },
  {
    id: "network-addresses",
    section: 3,
    title: "Trace the first hop",
    minutes: 40,
    status: "released",
    prerequisites: ["linux-resources"],
    summary:
      "Map interfaces, addresses, prefixes, and routes before blaming the network.",
    outcomes: [
      "Identify loopback and a non-loopback interface",
      "Explain IPv4, IPv6, CIDR, and a default gateway",
      "Distinguish local reachability from Internet or application health",
    ],
    concepts: [
      {
        title: "An interface carries addresses",
        body: "An interface is a network attachment, physical or virtual. An IPv4 address has 32 bits, commonly written as four decimal numbers. IPv6 uses 128 bits written in hexadecimal groups. 127.0.0.1 and ::1 are loopback addresses: they refer to the environment making the request, not a remote server.",
      },
      {
        title: "A prefix marks the network portion",
        body: "CIDR writes a prefix length after an address. /24 uses 24 IPv4 bits for the network portion, equivalent to mask 255.255.255.0. In 192.168.50.0/24, addresses share the first three octets. /24 contains 256 addresses; usable host counts depend on the network design and platform reservations.",
      },
      {
        title: "Routes select the next hop",
        body: "The routing table chooses how to reach destinations, favoring the most specific matching prefix. A default route is the fallback; its gateway is a next hop, not a DNS resolver. Private IPv4 ranges include 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. NAT can translate addresses at a boundary, but it is not a substitute for an access policy.",
      },
      {
        title: "A reply proves only that test",
        body: "ping uses ICMP echo, not HTTP. A reply supports IP reachability for that probe; a failure may reflect filtering rather than an offline host. Check ip addr and ip route before changing anything. Firewalls filter traffic, and an upstream network can fail even if your local interface looks healthy.",
      },
    ],
    commands: [
      command("ip addr", "Inspect addresses on Linux interfaces.", "ip addr"),
      command("ip route", "Inspect the IPv4 routing table.", "ip route"),
      command("ip -6 route", "Inspect IPv6 routes separately.", "ip -6 route"),
      command(
        "ping -c",
        "Send a bounded number of ICMP probes.",
        "ping -c 3 127.0.0.1",
        "No response alone does not locate the failure; do not run endless probes.",
      ),
    ],
    demo: {
      title: "Draw your environment from observations",
      code: "ip addr\nip route\nip -6 route\nping -c 3 127.0.0.1",
      explanation:
        "Find lo and its loopback address, then the interface used by a default route if one exists. WSL interfaces and addresses depend on its network mode; record observed values instead of copying an example address.",
    },
    practice: [
      "Sketch application → local interface → gateway → upstream network.",
      "Identify the interface attached to your default route.",
      "Explain why localhost from a Mac does not automatically mean the Ubuntu VM on another computer.",
    ],
    exercises: [
      exercise(
        "network-addresses-recall",
        "recall",
        "Which Linux command displays the IPv4 routing table?",
        ["ip route", "ip route show"],
        "The second word names the thing being inspected.",
        "ip route shows routes including a default route when configured.",
      ),
      exercise(
        "network-addresses-predict",
        "predict",
        "What IPv4 netmask corresponds to /24?",
        ["255.255.255.0"],
        "24 one-bits fill three octets.",
        "Three full 8-bit octets are 255, leaving the final octet zero.",
      ),
      exercise(
        "network-addresses-diagnose",
        "diagnose",
        "ping replies, but HTTP fails. Is the web application proven healthy? yes or no.",
        ["no"],
        "The probes use different protocols.",
        "ICMP reachability does not prove a TCP listener or a valid HTTP response.",
      ),
    ],
    lab: {
      title: "Write a packet-path sketch",
      environment: ubuntu,
      scenario:
        "Before any outage repair, document how your Ubuntu environment reaches local and external destinations.",
      steps: [
        "Inspect interfaces and label loopback, one non-loopback address, and its prefix if present.",
        "Inspect routes and identify the default gateway and interface, or explicitly report their absence.",
        "Run three loopback probes and record the result.",
        "If your own lab network permits it, send three probes to the observed gateway; a timeout is valid evidence, not a demand to change firewalls.",
        "Draw two paths: a request to loopback and a request to a remote service. Mark where NAT or a firewall might exist without claiming unobserved topology as fact.",
      ],
      evidence: [
        "Redacted interface and routing output",
        "A labeled path sketch or textual sequence",
        "Explanation of what the ping results can and cannot establish",
      ],
      rubric: [
        "Uses actual observed interface names and routes",
        "Separates loopback from remote destinations",
        "Treats blocked ICMP as inconclusive about HTTP",
        "Makes no routing or firewall changes",
      ],
      hints: [
        "A default route commonly contains “via” before the gateway and “dev” before the interface.",
        "No default route is a finding; do not invent one for the diagram.",
      ],
      solution:
        "ip addr\nip route\nip -6 route\nping -c 3 127.0.0.1\n# Optional: ping -c 3 followed by the gateway you observed.\n# Record facts separately from inferred NAT/firewall locations.",
      challenge:
        "Given 192.168.50.10/24 and destination 192.168.60.10, explain why the destination is outside the local prefix and which routing-table entry you would inspect next.",
    },
    resourceIds: ["network", "cisco", "wsl", "linux-man"],
  },
  {
    id: "network-dns",
    section: 3,
    title: "Separate a name problem from a connection problem",
    minutes: 35,
    status: "released",
    prerequisites: ["network-addresses"],
    summary:
      "Inspect the application’s name-resolution path and compare it with direct DNS queries.",
    outcomes: [
      "Explain names, resolvers, A and AAAA records",
      "Use getent and inspect resolver configuration",
      "Recognize why DNS success does not prove a reachable service",
    ],
    concepts: [
      {
        title: "Names are translated into addresses",
        body: "DNS is a distributed naming system. An A record supplies an IPv4 address; an AAAA record supplies IPv6. A resolver asks questions and may cache answers. A returned address is not proof that an application is listening there.",
      },
      {
        title: "The operating system has a lookup policy",
        body: "getent hosts uses the system’s configured host lookup sources, which may include /etc/hosts and DNS. dig and nslookup query DNS directly and can therefore differ from getent. Use the application’s lookup path first when reproducing an application failure.",
      },
      {
        title: "Configuration may be generated",
        body: "/etc/resolv.conf contains resolver settings and may point to a local stub. In WSL or systems using resolver managers, it can be generated. Read it for evidence; do not overwrite it as a generic fix. A localhost mapping can come from /etc/hosts rather than a public DNS answer.",
      },
      {
        title: "Choose a discriminating test",
        body: "If a name fails to resolve, check spelling, compare a known name, and inspect resolver settings. If a direct IP test also fails, name resolution is not the only possible issue. A public name lookup needs a working resolver path; repeated package installation is not a DNS repair.",
      },
    ],
    commands: [
      command(
        "getent hosts",
        "Use the system host lookup path.",
        "getent hosts localhost",
      ),
      command(
        "cat /etc/resolv.conf",
        "Read configured resolver information.",
        "cat /etc/resolv.conf",
        "Inspect only. Do not overwrite generated configuration.",
      ),
      command(
        "dig",
        "Inspect DNS answer sections when installed.",
        "dig example.com A",
        "Optional: type dig first. Ubuntu may require the dnsutils package; do not install it blindly.",
      ),
      command(
        "nslookup",
        "An alternative direct DNS query tool.",
        "nslookup example.com",
      ),
      command(
        "ping hostname",
        "Resolve a name and attempt ICMP echo.",
        "ping -c 2 localhost",
        "A failure after successful resolution is a different layer from a name error.",
      ),
    ],
    demo: {
      title: "Compare lookup paths",
      code: 'getent hosts localhost\ncat /etc/resolv.conf\ngetent hosts example.com\necho "$?"\ngetent hosts atlas-does-not-exist.invalid\necho "$?"',
      explanation:
        "localhost should resolve from local configuration. example.com depends on your resolver/network. The .invalid name is intentionally nonresolving in normal DNS. Record the actual status and do not equate every empty result with the same root cause.",
    },
    practice: [
      "Inspect /etc/hosts without editing it and find localhost mappings.",
      "Run a bounded ping to localhost and separate its displayed address from the echo result.",
      "If dig or nslookup is already installed, compare its example.com answer with getent and explain why differences can be legitimate.",
    ],
    exercises: [
      exercise(
        "network-dns-recall",
        "recall",
        "Write the command to resolve example.com through the system host lookup sources.",
        ["getent hosts example.com"],
        "Use getent with the hosts database.",
        "getent follows the system’s configured lookup sources.",
      ),
      exercise(
        "network-dns-predict",
        "predict",
        "Which record supplies an IPv6 address: A or AAAA?",
        ["aaaa"],
        "IPv6 uses the longer record name.",
        "AAAA records carry IPv6 addresses; A records carry IPv4.",
      ),
      exercise(
        "network-dns-diagnose",
        "diagnose",
        "getent resolves a host. Does this prove TCP port 443 accepts connections? yes or no.",
        ["no"],
        "An address and a listener are different facts.",
        "Resolution succeeds before the client attempts its transport connection.",
      ),
    ],
    lab: {
      title: "Classify a naming failure",
      environment: ubuntu,
      scenario:
        "A request to a misspelled service name fails before connecting. Prove which layer failed using safe lookups.",
      steps: [
        "Resolve localhost through getent and inspect /etc/hosts.",
        "Read /etc/resolv.conf and describe whether it names a local resolver or another address; do not edit it.",
        "Resolve example.com if network access is available, then query atlas-does-not-exist.invalid.",
        "Record each lookup’s status immediately.",
        "Write a diagnosis that distinguishes an intentionally nonexistent name, a possible resolver outage, and a later connection failure.",
      ],
      evidence: [
        "Lookup output and immediate statuses",
        "A redacted resolver description",
        "One next test for each of the three possible failure classes",
      ],
      rubric: [
        "Uses system lookup rather than assuming a direct DNS query is identical",
        "Leaves resolver configuration unchanged",
        "Does not claim application health from resolution",
        "Reports network unavailable when applicable",
      ],
      hints: [
        'Run echo "$?" immediately after each getent.',
        "A local hosts entry can work even when external DNS is unavailable.",
      ],
      solution:
        'getent hosts localhost\necho "$?"\ncat /etc/hosts\ncat /etc/resolv.conf\ngetent hosts example.com\necho "$?"\ngetent hosts atlas-does-not-exist.invalid\necho "$?"\n# Explain each result without changing network configuration.',
      challenge:
        "A colleague reports “DNS is broken,” but getent returns an address and curl says connection refused. Explain the next layer to inspect and why changing resolv.conf is unsupported by that evidence.",
    },
    resourceIds: ["network", "cisco", "ubuntu", "wsl"],
  },
  {
    id: "network-http",
    section: 3,
    title: "Follow a request from socket to HTTP response",
    minutes: 45,
    status: "released",
    prerequisites: ["network-dns"],
    summary:
      "Start a loopback-only disposable server and distinguish refused connections, HTTP errors, and healthy responses.",
    outcomes: [
      "Explain ports, sockets, TCP, UDP, HTTP, and HTTPS",
      "Inspect listeners and send bounded HTTP requests",
      "Distinguish HTTP status from curl transport success",
    ],
    concepts: [
      {
        title: "An address finds a host; a port selects a service",
        body: "A socket endpoint combines an address, transport protocol, and port. TCP provides an ordered byte stream after connection setup; UDP sends datagrams without that connection model. Common conventions include SSH on TCP 22, HTTP on TCP 80, HTTPS on TCP 443, and DNS commonly on UDP or TCP 53. Conventions do not force a program to use that port.",
      },
      {
        title: "A listener has a bind address",
        body: "127.0.0.1:8080 accepts connections on IPv4 loopback in this environment. 0.0.0.0:8080 indicates all local IPv4 interfaces. ss -tuln shows TCP/UDP sockets numerically, including listeners. A listening socket proves a process accepted the bind; it does not prove the application returns correct content.",
      },
      {
        title: "HTTP adds meaning above the connection",
        body: "HTTP exchanges requests and responses. curl -I requests headers using HEAD; ordinary curl fetches a body with GET. A 200 response indicates success for that request; 404 means the server handled the request but could not find the resource. HTTPS adds TLS authentication and encryption. Do not disable certificate verification as a generic repair.",
      },
      {
        title: "Name, transport, and application failures differ",
        body: "A DNS error occurs before reaching an address. Connection refused commonly means no listener or an explicit rejection. A timeout can have many causes, including filtering, routing, or an unresponsive peer. curl can exit zero after receiving HTTP 404; --fail makes HTTP error responses produce nonzero status. Inspect both response and command status.",
      },
    ],
    commands: [
      command("ss -tuln", "Inspect numeric local TCP/UDP sockets.", "ss -tuln"),
      command(
        "ss -ltn",
        "Inspect TCP listeners, optionally filtered by port.",
        'ss -ltn "sport = :8080"',
      ),
      command(
        "curl -I",
        "Request HTTP response headers with a time bound.",
        'curl --noproxy "*" -I --max-time 3 http://127.0.0.1:8080/',
      ),
      command(
        "curl --fail",
        "Return a failure status for HTTP 400+ responses.",
        'curl --noproxy "*" --fail --max-time 3 http://127.0.0.1:8080/missing.txt',
      ),
      command(
        "python3 -m http.server",
        "Run a tiny local learning server from a sandbox directory.",
        "python3 -m http.server 8080 --bind 127.0.0.1",
        "Learning only. Bind to loopback and serve only harmless sandbox files. Ctrl+C stops it.",
      ),
    ],
    demo: {
      title: "A local service you can inspect",
      code: '# Terminal A; requires python3 (check type python3 first).\nmkdir -p ~/atlas-labs/http\ncd ~/atlas-labs/http\necho "Atlas local server" > index.html\npython3 -m http.server 8080 --bind 127.0.0.1\n# Terminal B, in the same Ubuntu environment:\nss -ltn "sport = :8080"\ncurl --noproxy "*" -I --max-time 3 http://127.0.0.1:8080/\ncurl --noproxy "*" --max-time 3 http://127.0.0.1:8080/',
      explanation:
        'The server remains foreground in terminal A. --noproxy "*" bypasses proxy environment settings for these local diagnostic requests. If port 8080 is already occupied, inspect it and choose an unused lab port such as 8081; never kill the existing listener.',
    },
    practice: [
      "Request /missing.txt and observe 404 while the server stays running.",
      "Repeat with --fail and immediately inspect $?.",
      "Stop only your Python server using Ctrl+C; repeat the original request and socket inspection.",
    ],
    exercises: [
      exercise(
        "network-http-recall",
        "recall",
        "Which conventional TCP port is used for HTTPS?",
        ["443"],
        "It differs from HTTP port 80.",
        "HTTPS commonly uses TCP 443; newer HTTP transports have additional protocol details covered later.",
      ),
      exercise(
        "network-http-predict",
        "predict",
        "A server returns HTTP 404. Did an HTTP server respond? yes or no.",
        ["yes"],
        "404 is an application-layer response.",
        "The response proves the HTTP exchange reached a server, even though the requested resource was absent.",
      ),
      exercise(
        "network-http-diagnose",
        "diagnose",
        "No listener appears on the requested local port and curl is refused. Inspect the application process or change DNS?",
        [
          "inspect the application process",
          "application process",
          "process",
          "inspect the process",
        ],
        "The request already uses a numeric loopback address.",
        "A missing listener directs you toward the service/process and configured port.",
      ),
    ],
    lab: {
      title: "Three failures that need different repairs",
      environment: `${ubuntu} Python 3 must already be available; if absent, use the official installation instructions in your disposable environment before starting.`,
      scenario:
        "Create a working local web request, an HTTP missing-resource response, and a refused connection without altering any network policy.",
      steps: [
        "Create a fresh harmless web root in ~/atlas-labs/http/practical; start Python’s server bound to 127.0.0.1 on an unused port.",
        "In another Ubuntu tab, inspect its listener and request /index.html.",
        "Request a nonexistent path and capture the HTTP response.",
        "Stop your foreground server with Ctrl+C and repeat the successful URL; capture the new error.",
        "Restart the same server, repeat the original URL, verify the expected body, then stop it for cleanup.",
      ],
      evidence: [
        "Listener while running and absence after stopping",
        "200, 404, and refused observations labeled by cause",
        "Recovered response body and explanation of curl exit status",
      ],
      rubric: [
        "Binds only to loopback and serves sandbox files",
        "Distinguishes HTTP 404 from a connection failure",
        "Repeats the same original request after recovery",
        "Stops the test server at the end",
      ],
      hints: [
        "Keep terminal A visible so you know which process Ctrl+C will stop.",
        "A 404 repair concerns the URL or resource; restarting a healthy server does not create the missing file.",
      ],
      solution:
        '# Terminal A:\nmkdir -p ~/atlas-labs/http/practical\ncd ~/atlas-labs/http/practical\necho "Atlas practical response" > index.html\npython3 -m http.server 8080 --bind 127.0.0.1\n# Terminal B:\nss -ltn "sport = :8080"\ncurl --noproxy "*" -i --max-time 3 http://127.0.0.1:8080/index.html\ncurl --noproxy "*" -i --max-time 3 http://127.0.0.1:8080/not-there\n# Stop A with Ctrl+C, repeat the index request, restart A, repeat again.\n# Stop A after collecting recovery evidence.',
      challenge:
        "Ask a partner to give you either a wrong URL path or wrong port for your local server. Diagnose which it is using the observed error before changing anything.",
    },
    resourceIds: ["network", "mdn", "python", "linux-man"],
  },
  {
    id: "troubleshoot-nginx",
    section: 4,
    title: "Break and recover your Nginx lab service",
    minutes: 55,
    status: "released",
    prerequisites: ["linux-services", "network-http"],
    summary:
      "Revisit your existing Nginx practice as a measured incident: baseline, outage, diagnosis, repair, proof.",
    outcomes: [
      "Establish a service/socket/HTTP baseline",
      "Diagnose a deliberately stopped local service",
      "Restore and prove behavior without treating a restart as diagnosis",
    ],
    concepts: [
      {
        title: "Agree on the failure boundary",
        body: "This exercise intentionally stops Nginx. Do it only in your own disposable Ubuntu environment after confirming it hosts no real users or unrelated work. The browser does not execute these commands. If the environment is shared or production, use a fresh VM instead. Your prior Atlas Nginx work counts as practice, but this independent explanation is new evidence.",
      },
      {
        title: "Record a baseline before the outage",
        body: "Check systemd, service status, the exact port-80 listener, and an HTTP response. Record which address you used. Nginx package installation may start the service and listen on more than loopback, so use an isolated lab with no public forwarding. Keep any private web content out of this exercise.",
      },
      {
        title: "Diagnose before repairing",
        body: "After a deliberate stop, the service should be inactive, its listener absent, and the request refused if no other service owns the port. journalctl ties the state change to time. If another process owns port 80, investigate it without killing it. If Nginx will not start, inspect the journal and use sudo nginx -t to test configuration before considering a change.",
      },
      {
        title: "Use multiple independent proofs",
        body: "systemctl start returning successfully is useful but incomplete. Prove the service is active, the expected socket exists, and the original request returns the expected response. A localhost success does not prove access from another device, firewall correctness, TLS, or production readiness.",
      },
    ],
    commands: [
      command(
        "apt install nginx",
        "Install the package only when absent in the accepted disposable lab.",
        "sudo apt update\nsudo apt install nginx",
        "Review the package plan. Skip installation when your existing Atlas lab already has Nginx.",
      ),
      command(
        "systemctl status / stop / start",
        "Observe, intentionally stop, and recover the lab service.",
        "systemctl status nginx --no-pager\nsudo systemctl stop nginx\nsudo systemctl start nginx",
        "Manual exercise only after confirming the service has no other users.",
      ),
      command(
        "journalctl -u nginx",
        "Inspect recent events for this unit.",
        "journalctl -u nginx -n 30 --no-pager",
      ),
      command(
        "ss port filter",
        "Inspect TCP listeners whose local port is exactly 80.",
        'ss -ltn "sport = :80"',
      ),
      command(
        "curl localhost",
        "Test an HTTP response with a bounded local request.",
        'curl --noproxy "*" -I --max-time 3 http://127.0.0.1/',
      ),
      command(
        "nginx -t",
        "Test Nginx configuration when startup fails.",
        "sudo nginx -t",
        "Read-only configuration test; do not overwrite a configuration to silence an error.",
      ),
    ],
    demo: {
      title: "Inspect three layers without changing state",
      code: 'ps -p 1 -o comm=\nsystemctl status nginx --no-pager\nss -ltn "sport = :80"\ncurl --noproxy "*" -I --max-time 3 http://127.0.0.1/\njournalctl -u nginx -n 20 --no-pager',
      explanation:
        "These are baseline inspections. If Nginx is already absent or unhealthy, investigate before introducing a deliberate outage. Read permission errors honestly; on your own lab, sudo journalctl may be needed to read system journal entries.",
    },
    practice: [
      "Write the predicted status, socket, and HTTP behavior after a stop without running it yet.",
      "Name why a successful localhost request cannot prove remote access.",
      "Explain why changing DNS cannot repair a stopped service addressed by 127.0.0.1.",
    ],
    exercises: [
      exercise(
        "troubleshoot-nginx-recall",
        "recall",
        "Write the command to read 20 recent Nginx journal entries without a pager.",
        [
          "journalctl -u nginx -n 20 --no-pager",
          "sudo journalctl -u nginx -n 20 --no-pager",
        ],
        "Select the unit, count, and no-pager option.",
        "The unit filter keeps the evidence tied to the service; privilege may be needed to view all system entries.",
      ),
      exercise(
        "troubleshoot-nginx-predict",
        "predict",
        "Nginx is the only port-80 listener. After a completed stop, should its listener be present or absent?",
        ["absent"],
        "A stopped process no longer owns its socket.",
        "The absence of the expected listener supports the stopped-service diagnosis.",
      ),
      exercise(
        "troubleshoot-nginx-diagnose",
        "diagnose",
        "Nginx is inactive, port 80 has no listener, and localhost is refused. In this accepted lab, what command starts the service?",
        ["sudo systemctl start nginx", "systemctl start nginx"],
        "Use start on the observed inactive unit.",
        "Starting the confirmed stopped service addresses the observed failure; verify all layers afterward.",
      ),
    ],
    lab: {
      title: "Incident 001: local web service unavailable",
      environment: `${ubuntu} Required: systemd as PID 1, curl, ss, and an isolated Nginx service you are allowed to stop. Read and accept this scope before manually running sudo commands. No shared or production server.`,
      scenario:
        "The local Nginx service has stopped. Restore it and produce a short incident record that another engineer can review.",
      steps: [
        "Confirm this is your isolated lab and record the original Nginx state. If the package is absent, manually review sudo apt update and sudo apt install nginx first; skip installation when already present.",
        "Establish a healthy baseline with status, port-80 socket inspection, and an HTTP request. Do not continue if another application owns port 80.",
        "Manually run sudo systemctl stop nginx. Capture the failing original HTTP request.",
        "Inspect service status, socket state, and recent Nginx journal entries; write your hypothesis before repairing.",
        "Run sudo systemctl start nginx. Repeat the exact HTTP request, inspect the socket and status, and confirm expected page content with ordinary curl.",
        "Record impact, cause, repair, verification, and limitations. Restore the original service state if the baseline was inactive before setup; if it was already running, leave it running. Keep evidence under ~/atlas-labs/nginx or in this local submission.",
      ],
      evidence: [
        "Before/failure/recovery HTTP observations with timestamps",
        "Inactive and recovered active status plus socket evidence",
        "Relevant journal excerpt and original-state restoration note",
        "Your incident explanation in your own words",
      ],
      rubric: [
        "Confirms authority and isolation before stopping a service",
        "Diagnoses with at least two supporting observations",
        "Makes the minimal supported repair",
        "Repeats the original failure test and checks content",
        "States that localhost proof does not establish remote or production readiness",
      ],
      hints: [
        "A stopped unit can make systemctl status return nonzero; that is evidence.",
        "Use an exact ss port filter; a loose grep for 80 could also match 8080.",
        "If start fails, inspect journalctl and nginx -t rather than repeatedly restarting.",
      ],
      solution:
        '# After accepting the lab scope and obtaining a healthy baseline:\nsudo systemctl stop nginx\ncurl --noproxy "*" -I --max-time 3 http://127.0.0.1/\nsystemctl status nginx --no-pager\nss -ltn "sport = :80"\njournalctl -u nginx -n 30 --no-pager\nsudo systemctl start nginx\nsystemctl status nginx --no-pager\nss -ltn "sport = :80"\ncurl --noproxy "*" -I --max-time 3 http://127.0.0.1/\ncurl --noproxy "*" --max-time 3 http://127.0.0.1/\n# Restore the original service state if you changed it during setup.',
      challenge:
        "After a delay, have a partner stop only this accepted lab service or give you a wrong port. Diagnose which fault occurred without looking at the solution, and write why you rejected the alternative hypothesis.",
    },
    resourceIds: ["ubuntu", "wsl", "linux-man", "observability"],
  },
  {
    id: "troubleshoot-layers",
    section: 4,
    title: "Choose the next test from the evidence",
    minutes: 50,
    status: "released",
    prerequisites: ["troubleshoot-nginx"],
    summary:
      "Use a diagnostic ladder without blindly running every command or changing unrelated layers.",
    outcomes: [
      "Follow service → process → application → socket → network evidence",
      "Choose tests that discriminate between hypotheses",
      "Write a concise runbook with verification and escalation",
    ],
    concepts: [
      {
        title: "A ladder is a map, not a ritual",
        body: "For a local service, start with service → process → application → socket. For reachability, inspect interface → routing → DNS → firewall → upstream network as the evidence requires. A numeric localhost URL avoids external DNS and external routing; checking those first wastes time.",
      },
      {
        title: "Use the error to narrow the layer",
        body: "“Could not resolve host” points toward naming. “Connection refused” directs attention to listener, address, port, or explicit rejection. A timeout leaves several possibilities. HTTP 403 or 404 proves an HTTP response happened and directs attention to policy or resource selection. No single message establishes every root cause.",
      },
      {
        title: "One change creates interpretable evidence",
        body: "Record the failing test, prediction, and smallest justified change. Repeat the same test after the change. Changing DNS, firewall, file permissions, and service state together destroys the ability to tell which change helped and may create new problems.",
      },
      {
        title: "Escalation should preserve the useful facts",
        body: "A useful handoff includes target and time, exact error, expected behavior, environment, checks already performed, what each ruled out, and the next hypothesis. Redact credentials and unrelated logs. “Restarted everything” is not an explanation.",
      },
    ],
    commands: [
      command(
        "Service evidence",
        "Inspect current service state and recent transitions.",
        "systemctl status nginx --no-pager\njournalctl -u nginx -n 20 --no-pager",
      ),
      command(
        "Socket evidence",
        "Verify the target address and port.",
        'ss -ltn "sport = :8080"',
      ),
      command(
        "Request evidence",
        "Inspect headers/body with a bounded request.",
        'curl --noproxy "*" -i --max-time 3 http://127.0.0.1:8080/index.html',
      ),
      command(
        "Network evidence",
        "Inspect only relevant lower layers.",
        "ip addr\nip route\ngetent hosts localhost",
      ),
    ],
    demo: {
      title: "Three observations, three next tests",
      code: '# Scenario A: name cannot be resolved.\ngetent hosts atlas-does-not-exist.invalid\n# Scenario B: numeric local address is refused.\nss -ltn "sport = :8080"\n# Scenario C: local server returns 404.\nls -l ~/atlas-labs/http/practical/index.html',
      explanation:
        "These are alternative branches, not a mandatory script. A file can exist on disk but still be outside the configured web root; compare the server launch directory or --directory setting before claiming that file existence proves routing correctness.",
    },
    practice: [
      "For each failure, state the layer already proven and one still uncertain.",
      "Explain why adding sudo to curl does not start a missing server.",
      "Write a recovery test before making the repair, so the success criterion cannot shift afterward.",
    ],
    exercises: [
      exercise(
        "troubleshoot-layers-recall",
        "recall",
        "Which command inspects the local TCP listener on exactly port 8080?",
        ['ss -ltn "sport = :8080"', "ss -ltn 'sport = :8080'"],
        "Filter ss by source/local port.",
        "The exact filter avoids accidentally matching another port containing similar digits.",
      ),
      exercise(
        "troubleshoot-layers-predict",
        "predict",
        "The original request was HTTP 404. Restarting the same server without changing its files guarantees a 200. true or false?",
        ["false"],
        "A missing resource remains missing.",
        "A restart alone does not repair an incorrect path or missing file.",
      ),
      exercise(
        "troubleshoot-layers-diagnose",
        "diagnose",
        "A numeric localhost request is refused and the target port has no listener. First inspect process or DNS?",
        ["process", "inspect process", "inspect the process"],
        "There was no hostname lookup in that request.",
        "Inspect the application process, startup failure, and configured port before unrelated networking changes.",
      ),
    ],
    lab: {
      title: "Independent diagnostic ticket: wrong web root",
      environment: `${ubuntu} Requires the loopback Python HTTP lab already completed. No privileged changes.`,
      scenario:
        "The service is listening and responding, but /index.html returns 404. The file exists in one sandbox directory while the server serves another. Diagnose and fix the mismatch.",
      steps: [
        "Create ~/atlas-labs/layers/intended with index.html and a separate empty ~/atlas-labs/layers/empty directory.",
        "From empty, start your loopback Python server on an unused port.",
        "From another tab, request /index.html and capture the 404. Do not move on until you can explain which layers already worked.",
        "Inspect the listener, the file path, and the server’s startup directory. Write a hypothesis.",
        "Stop only your server and start it with --directory pointing to intended. Repeat the same URL and verify the expected body.",
        "Write a five-step runbook and stop the server. Include an escalation branch for when the listener exists but requests time out.",
      ],
      evidence: [
        "The original HTTP 404 and final 200 with expected body",
        "The unchanged target URL and observed listener",
        "Your hypothesis and five-step runbook",
        "A statement identifying what this local lab does not test",
      ],
      rubric: [
        "Identifies the web-root mismatch without changing DNS/firewall",
        "Explains that 404 proves an HTTP response",
        "Repairs one setting and repeats the original request",
        "Produces usable independent documentation",
      ],
      hints: [
        "A server cannot serve a file outside its configured web root simply because the filename exists elsewhere.",
        "The Python server supports --directory; inspect its help if needed.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/layers/intended ~/atlas-labs/layers/empty\necho "Correct web root" > ~/atlas-labs/layers/intended/index.html\ncd ~/atlas-labs/layers/empty\npython3 -m http.server 8080 --bind 127.0.0.1\n# In another tab, request /index.html and inspect the listener.\n# Stop the server with Ctrl+C, then in its terminal:\npython3 -m http.server 8080 --bind 127.0.0.1 --directory ~/atlas-labs/layers/intended\n# Repeat the original request and verify “Correct web root”; stop for cleanup.',
      challenge:
        "Two days later, reproduce either a missing listener or wrong web root without telling your partner which. Require a hypothesis and discriminating test before the first change.",
    },
    resourceIds: ["ubuntu", "network", "python", "observability"],
  },
  {
    id: "git-basics",
    section: 5,
    title: "Make a small, reviewable snapshot",
    minutes: 45,
    status: "released",
    prerequisites: ["troubleshoot-layers"],
    summary:
      "Learn working tree, staging area, and commits before publishing a portfolio.",
    outcomes: [
      "Initialize a dedicated local repository",
      "Inspect unstaged and staged changes",
      "Commit only intended files and explain a clean working tree",
    ],
    concepts: [
      {
        title: "Git records project history",
        body: "A repository stores version history and metadata, usually in .git. The working tree is the files you edit. The staging area is the exact next snapshot you propose. A commit records that staged snapshot with metadata and links to its parent history. Git works locally; GitHub is a service that can host repositories and collaboration.",
      },
      {
        title: "Staging is a review boundary",
        body: "git add README.md stages that file’s current contents. Editing it again afterward creates a new unstaged difference. git diff shows working-tree changes relative to staging; git diff --staged shows the staged proposal relative to the current commit. git status tells you which states exist, including untracked files.",
      },
      {
        title: "Identity is metadata, not authentication",
        body: "Set user.name and user.email locally for this disposable repository. The lab uses Atlas Learner and an example.invalid address; do not reuse that example identity for a real portfolio. Before public work, choose your intended author identity and an email privacy setting from GitHub’s official account guidance. A commit email does not log you into a remote.",
      },
      {
        title: "Repair the staging mistake before committing",
        body: "If you staged an earlier version, inspect both diffs and stage the intended final contents again. If a commit reports no changes, inspect status rather than adding arbitrary files. A clean working tree means no uncommitted changes relative to the tracked snapshot; it does not mean the project is correct or published.",
      },
    ],
    commands: [
      command(
        "git init",
        "Create a local repository with an explicit starting branch.",
        "git init -b main",
      ),
      command(
        "git status",
        "Inspect working-tree and staging states.",
        "git status --short",
      ),
      command(
        "git add",
        "Stage the current contents of one intended file.",
        "git add README.md",
        "Prefer explicit paths while learning; review before staging everything.",
      ),
      command(
        "git diff",
        "Inspect unstaged or staged differences.",
        "git diff\ngit diff --staged",
      ),
      command(
        "git commit",
        "Record the staged snapshot with a meaningful message.",
        'git commit -m "Document local HTTP recovery"',
      ),
      command(
        "git log",
        "Inspect recent commit history.",
        "git log --oneline -5",
      ),
    ],
    demo: {
      title: "Your first local repository",
      code: '# Use a fresh directory; do not initialize inside another project.\nmkdir -p ~/atlas-labs/git-basics/demo\ncd ~/atlas-labs/git-basics/demo\ngit init -b main\ngit config user.name "Atlas Learner"\ngit config user.email "atlas@example.invalid"\necho "# Linux service evidence" > README.md\ngit status\ngit add README.md\ngit diff --staged\ngit commit -m "Add service evidence introduction"\ngit log --oneline -3\ngit status',
      explanation:
        "The author settings apply only to this repository because --global is not used. No remote is configured, so this commit stays local. If the directory already contains an existing project, inspect it and choose a fresh lab directory instead.",
    },
    practice: [
      "Append a harmless sentence to README.md and inspect git diff.",
      "Stage it, append one more sentence, then compare git diff with git diff --staged.",
      "Restage only when the final intended snapshot is clear, then commit.",
    ],
    exercises: [
      exercise(
        "git-basics-recall",
        "recall",
        "Write the command that shows the proposed staged changes.",
        ["git diff --staged", "git diff --cached"],
        "The flag names the staging area.",
        "Both --staged and --cached compare the staged snapshot with the current commit.",
      ),
      exercise(
        "git-basics-predict",
        "predict",
        "You stage a file, then edit it again. Is that later edit automatically included in the staged snapshot? yes or no.",
        ["no"],
        "Staging captures content at the time of git add.",
        "Run git diff to see the later unstaged edit; stage it again only if intended.",
      ),
      exercise(
        "git-basics-diagnose",
        "diagnose",
        "A local commit succeeded. Is it automatically on GitHub? yes or no.",
        ["no"],
        "Commit and push are separate operations.",
        "Git records commits locally. Publishing requires an explicitly configured remote and push.",
      ),
      exercise(
        "git-basics-restage",
        "recall",
        "You staged README.md, then edited it again. You have reviewed and want the newer contents in the next commit. Write the command to update its staged snapshot.",
        ["git add README.md"],
        "Stage the current content of this explicit path again.",
        "git add refreshes the staged README.md snapshot. Review git diff --staged before committing it.",
      ),
    ],
    lab: {
      title: "Version your incident explanation",
      environment: `${shell} Git must already be installed (git --version). Use a fresh repository, not the Atlas website source or another existing project.`,
      scenario:
        "Turn the Nginx incident explanation into a small local project whose history tells a reviewer what changed.",
      steps: [
        "Create a fresh repository under ~/atlas-labs/git-basics/practical and set local lab author identity.",
        "Create README.md with a title and a sentence describing the lab’s purpose.",
        "Stage, review, and commit that introduction.",
        "Add observations, diagnosis, repair, and verification sections using your editor. Include no secrets or unnecessary personal data.",
        "Inspect the diff, stage README.md, inspect the staged diff, and commit the explanation.",
        "Show the last two commits and confirm the working tree is clean.",
      ],
      evidence: [
        "README content in your own words",
        "Staged diff from the second change",
        "Two commit messages and final status",
        "Explanation of working tree → staging → commit",
      ],
      rubric: [
        "Uses a dedicated local lab repository",
        "Reviews the staged content before committing",
        "Makes meaningful snapshots rather than one unexplained dump",
        "Does not claim a local commit is published",
      ],
      hints: [
        "An editor can add multiple lines without teaching shell quoting tricks here.",
        "git diff --staged can be empty before you stage changes.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/git-basics/practical\ncd ~/atlas-labs/git-basics/practical\ngit init -b main\ngit config user.name "Atlas Learner"\ngit config user.email "atlas@example.invalid"\necho "# Nginx incident evidence" > README.md\ngit add README.md\ngit diff --staged\ngit commit -m "Introduce the Nginx incident lab"\n# Edit README.md with your own incident explanation.\ngit diff\ngit add README.md\ngit diff --staged\ngit commit -m "Explain diagnosis and verify recovery"\ngit log --oneline -2\ngit status',
      challenge:
        "Create a separate local repository for a resource-inspection report. Produce two coherent commits without referring to this sequence, then explain exactly what each stores.",
    },
    resourceIds: ["git", "github"],
  },
  {
    id: "git-branches",
    section: 5,
    title: "Develop a change on a branch",
    minutes: 40,
    status: "released",
    prerequisites: ["git-basics"],
    summary:
      "Use a branch to isolate a coherent change and merge it only after inspecting its content.",
    outcomes: [
      "Create and switch branches deliberately",
      "Compare branch content and history",
      "Explain fast-forward merge and protect a clean starting state",
    ],
    concepts: [
      {
        title: "A branch is a movable history pointer",
        body: "A branch names a line of development. A new branch begins at the current commit; subsequent commits move that branch forward. It is not a separate folder. Switching branches updates the working tree to the selected history, so commit or intentionally preserve your work first.",
      },
      {
        title: "Merge into the branch you intend to update",
        body: "To bring docs-recovery into main, switch to main, then merge docs-recovery. When main has not diverged, Git can fast-forward its pointer to the newer commit. If both lines changed independently, Git may need a merge commit or a conflict resolution.",
      },
      {
        title: "Ignore generated clutter, not responsibility",
        body: ".gitignore records patterns for untracked files you do not want to add, such as lab-output/ or local scratch data. It does not remove already tracked content from history and does not make secrets safe. Inspect status and staged diffs before every commit, including ignored-file decisions.",
      },
      {
        title: "Treat a blocked switch as protection",
        body: "Git may refuse a switch that would overwrite local edits. Read git status and both diffs, then commit the coherent work or preserve it deliberately. Do not use force or a hard reset just to make the message disappear. Verify a merge by reading the resulting file and inspecting the history.",
      },
    ],
    commands: [
      command(
        "git branch",
        "List local branches and the current one.",
        "git branch",
      ),
      command(
        "git switch -c",
        "Create and switch to a new branch.",
        "git switch -c docs-recovery",
      ),
      command("git switch", "Switch to an existing branch.", "git switch main"),
      command(
        "git merge",
        "Integrate another branch into the current branch.",
        "git merge --ff-only docs-recovery",
        "--ff-only refuses if the histories diverged instead of silently choosing a merge strategy.",
      ),
      command(
        ".gitignore",
        "Describe untracked file patterns to exclude.",
        'echo "lab-output/" > .gitignore',
      ),
      command(
        "git log --graph",
        "Inspect branch history compactly.",
        "git log --oneline --graph --all -8",
      ),
    ],
    demo: {
      title: "A focused documentation branch",
      code: 'cd ~/atlas-labs/git-basics/practical\ngit status\ngit switch -c docs-recovery\necho "Verify the original HTTP request after repair." >> README.md\ngit diff\ngit add README.md\ngit commit -m "Clarify recovery verification"\ngit switch main\ngit merge --ff-only docs-recovery\ngit log --oneline --graph --all -6',
      explanation:
        "Begin only with a clean working tree from the previous lesson. The new branch name must be unused; if repeating, choose a fresh descriptive name. The merge works as a fast-forward because main has no independent new commits.",
    },
    practice: [
      "Before merging, compare README.md on the feature branch and main.",
      "Explain why creating a branch did not publish anything.",
      "Create a harmless untracked lab-output folder and inspect how a committed .gitignore changes status.",
    ],
    exercises: [
      exercise(
        "git-branches-recall",
        "recall",
        "Write the command to create and enter a new branch named docs-check.",
        ["git switch -c docs-check"],
        "switch has a create flag.",
        "git switch -c creates a branch from the current commit and makes it current.",
      ),
      exercise(
        "git-branches-predict",
        "predict",
        "You are on main and run git merge docs-check. Which branch is updated: main or docs-check?",
        ["main"],
        "The checked-out branch receives the integration.",
        "merge updates the current branch with the other branch’s history.",
      ),
      exercise(
        "git-branches-diagnose",
        "diagnose",
        "A credential file was already committed. Does adding its name to .gitignore remove it from history? yes or no.",
        ["no"],
        "Ignore rules affect untracked discovery, not existing history.",
        "Already published credentials require rotation and a separate history-remediation process; ignore rules cannot undo disclosure.",
      ),
    ],
    lab: {
      title: "Review a runbook improvement",
      environment: `${shell} Continue only in the clean git-basics/practical lab repository.`,
      scenario:
        "Improve the incident runbook on a branch while keeping generated terminal output out of tracked history.",
      steps: [
        "Confirm main is clean, then create a new branch named runbook-checks.",
        "Use your editor to add a verification checklist to README.md.",
        "Create lab-output/example.txt with harmless text and add lab-output/ to a new .gitignore file.",
        "Inspect status, stage only README.md and .gitignore, and review the staged proposal.",
        "Commit, switch to main, and fast-forward merge runbook-checks.",
        "Read the merged README and show history and clean tracked state.",
      ],
      evidence: [
        "Feature-branch staged diff",
        "The ignore rule and status showing the output file is not staged",
        "Merge result and final README",
        "Explanation of which branch received the merge",
      ],
      rubric: [
        "Starts from a clean known branch",
        "Stages only intended source/documentation",
        "Preserves the improvement through merge",
        "Does not describe .gitignore as secret protection",
      ],
      hints: [
        "Use mkdir -p lab-output before creating its fixture.",
        "The folder may still exist after switching branches because it is untracked; branch switching does not promise to remove ignored files.",
      ],
      solution:
        'cd ~/atlas-labs/git-basics/practical\ngit status\ngit switch main\ngit switch -c runbook-checks\n# Edit README.md with an original verification checklist.\nmkdir -p lab-output\necho "Harmless generated output" > lab-output/example.txt\necho "lab-output/" > .gitignore\ngit status\ngit add README.md .gitignore\ngit diff --staged\ngit commit -m "Add verification checklist and ignore lab output"\ngit switch main\ngit merge --ff-only runbook-checks\ngit log --oneline --graph --all -8\ngit status',
      challenge:
        "Create a second branch that improves the resource report. Before merging, explain the target branch and show the proposed diff to another person or record your own review notes.",
    },
    resourceIds: ["git", "github", "security"],
  },
  {
    id: "git-conflicts",
    section: 5,
    title: "Resolve a disagreement in content",
    minutes: 45,
    status: "released",
    prerequisites: ["git-branches"],
    summary:
      "Create a tiny intentional merge conflict, choose meaningful final content, and verify the completed merge.",
    outcomes: [
      "Recognize conflict markers and unmerged status",
      "Resolve content deliberately rather than pick a side blindly",
      "Know when to abort a merge safely",
    ],
    concepts: [
      {
        title: "Git cannot choose product meaning",
        body: "A conflict arises when Git cannot automatically combine changes. For example, two branches can replace the same line differently. The history is not lost: Git pauses the merge so you can decide the final intended content.",
      },
      {
        title: "Markers are a question, not valid final content",
        body: "A conflicted text file may contain <<<<<<<, =======, and >>>>>>> markers around competing versions. Read the surrounding context and both versions, then edit a coherent result and remove the markers. Choosing all of “ours” or “theirs” without understanding can discard needed work.",
      },
      {
        title: "Stage the resolution, then complete it",
        body: "git status names unmerged paths. After editing, git add marks a path as resolved; git diff --staged lets you review the proposed result. A commit finishes the merge. Test the resulting behavior or document, because a clean merge can still be wrong.",
      },
      {
        title: "Abort is a controlled recovery path",
        body: "git merge --abort attempts to return to the pre-merge state. Begin the lab with no uncommitted work so that recovery is straightforward. If a real merge contains preexisting edits, do not assume abort can reconstruct every change; preserve work and inspect carefully.",
      },
    ],
    commands: [
      command(
        "git status",
        "Find unmerged paths and the current merge state.",
        "git status",
      ),
      command(
        "git diff",
        "Inspect conflict content before editing.",
        "git diff",
      ),
      command(
        "git add",
        "Mark the edited path as resolved.",
        "git add check.txt",
      ),
      command(
        "git commit",
        "Finish the merge after reviewing the resolution.",
        'git commit -m "Combine response and listener checks"',
      ),
      command(
        "git merge --abort",
        "Cancel an in-progress merge when appropriate.",
        "git merge --abort",
        "Start clean and use only during an actual in-progress merge.",
      ),
    ],
    demo: {
      title: "What a conflict looks like",
      code: "# Example file content during a merge, not shell commands:\n<<<<<<< HEAD\nVerify the HTTP response.\n=======\nVerify the listening socket.\n>>>>>>> socket-check\n\n# A reasoned final document can contain both checks:\nVerify the listening socket and the expected HTTP response.",
      explanation:
        "Both checks are valuable and prove different layers. The final line integrates their meaning. Removing marker syntax alone is insufficient if it also removes a required check.",
    },
    practice: [
      "Explain why the two checks are complementary.",
      "List the evidence you would inspect before resolving a conflict in a configuration file.",
      "Describe the difference between aborting a merge and deleting the conflicting file.",
    ],
    exercises: [
      exercise(
        "git-conflicts-recall",
        "recall",
        "After editing check.txt to the correct result, which command marks that path resolved?",
        ["git add check.txt"],
        "The same staging command records the chosen content.",
        "git add replaces the unresolved index entries with the edited result.",
      ),
      exercise(
        "git-conflicts-predict",
        "predict",
        "Does a clean working tree after the merge prove the chosen text is semantically correct? yes or no.",
        ["no"],
        "Git tracks state, not the correctness of your decision.",
        "You must inspect and test the resulting behavior or documentation.",
      ),
      exercise(
        "git-conflicts-diagnose",
        "diagnose",
        "You began clean and want to cancel an in-progress merge. Write the command.",
        ["git merge --abort"],
        "Use merge’s abort operation.",
        "Aborting is the explicit recovery operation for a merge you no longer want to complete.",
      ),
    ],
    lab: {
      title: "Merge two useful verification checks",
      environment: `${shell} Use a fresh ~/atlas-labs/git-conflicts directory with no unrelated files.`,
      scenario:
        "Two authors replaced the same checklist line. Preserve both valid verification requirements in the final result.",
      steps: [
        "Initialize a fresh main branch and commit check.txt containing “Verify the service.” Set local lab identity first.",
        "Create socket-check, replace the line with “Verify the listening socket.”, and commit.",
        "Switch to main, replace the same original line with “Verify the HTTP response.”, and commit.",
        "Merge socket-check into main and inspect the expected conflict.",
        "Edit the file to require both listener and expected HTTP response; remove all conflict markers.",
        "Stage, review, commit, and inspect the graph and final text.",
      ],
      evidence: [
        "The unmerged status and conflicted file",
        "Your final combined requirement with an explanation",
        "Completed merge commit, graph, and clean status",
      ],
      rubric: [
        "Produces and identifies an actual conflict",
        "Preserves both useful requirements",
        "Reviews the staged resolution before committing",
        "Verifies content after merge completion",
      ],
      hints: [
        "Both branches must change the same original line differently.",
        "Use your editor for the final resolution; the goal is meaningful content, not memorizing marker symbols.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/git-conflicts\ncd ~/atlas-labs/git-conflicts\ngit init -b main\ngit config user.name "Atlas Learner"\ngit config user.email "atlas@example.invalid"\necho "Verify the service." > check.txt\ngit add check.txt\ngit commit -m "Add initial check"\ngit switch -c socket-check\necho "Verify the listening socket." > check.txt\ngit add check.txt\ngit commit -m "Specify listener verification"\ngit switch main\necho "Verify the HTTP response." > check.txt\ngit add check.txt\ngit commit -m "Specify HTTP verification"\ngit merge socket-check\ngit status\ncat check.txt\necho "Verify the listening socket and expected HTTP response." > check.txt\ngit add check.txt\ngit diff --staged\ngit commit -m "Combine response and listener checks"\ngit log --oneline --graph --all -6\ngit status',
      challenge:
        "In a new repository, create another small conflict and practice aborting it from a clean starting state. Show that the original main content remains, then retry and resolve deliberately.",
    },
    resourceIds: ["git", "github"],
  },
  {
    id: "git-collaboration",
    section: 5,
    title: "Move commits between repositories",
    minutes: 50,
    status: "released",
    prerequisites: ["git-conflicts"],
    summary:
      "Practice clone, remote, push, fetch, and pull with a local remote before involving an account or public data.",
    outcomes: [
      "Distinguish commits from remote synchronization",
      "Inspect remote destinations before pushing",
      "Use fast-forward pull and diagnose rejected updates",
    ],
    concepts: [
      {
        title: "A remote is a named destination",
        body: "origin is a conventional local nickname for another repository, not a magic GitHub connection. git remote -v shows URLs or filesystem paths. clone makes a new local repository from another one and usually configures origin. A bare repository stores history without a normal working tree, making it useful as a local teaching remote.",
      },
      {
        title: "The directions are explicit",
        body: "push sends local commits and proposes remote reference updates. fetch downloads remote history without integrating it into your current branch. pull fetches and then integrates. Use pull --ff-only while learning so divergent histories stop for a deliberate decision instead of an unexpected automatic integration.",
      },
      {
        title: "A rejection preserves somebody’s work",
        body: "A non-fast-forward push can mean the remote contains commits you do not have. Inspect status, fetch, and compare histories. Integrate intentionally, resolving conflicts if needed. Do not use force push to bypass a normal collaboration disagreement.",
      },
      {
        title: "Transport and authorization are separate",
        body: "A GitHub remote requires an authenticated connection with suitable access, but a local commit does not. Never place tokens in repository files or paste credential-bearing remote URLs into public evidence. Before any real push, verify the destination, author identity, staged/history content, and intended visibility.",
      },
    ],
    commands: [
      command(
        "git clone",
        "Create a new local copy and configure origin.",
        "git clone ~/atlas-labs/git-remote/origin.git ~/atlas-labs/git-remote/reviewer",
      ),
      command(
        "git remote -v",
        "Inspect fetch and push destinations.",
        "git remote -v",
      ),
      command(
        "git push",
        "Send commits to the named remote/branch.",
        "git push -u origin main",
        "Inspect origin first; -u records the tracking relationship.",
      ),
      command(
        "git fetch",
        "Download remote history without integrating it.",
        "git fetch origin",
      ),
      command(
        "git pull --ff-only",
        "Fetch and integrate only a fast-forward update.",
        "git pull --ff-only origin main",
      ),
      command(
        "git init --bare",
        "Create a local teaching remote without a working tree.",
        "git init --bare -b main ~/atlas-labs/git-remote/origin.git",
      ),
    ],
    demo: {
      title: "Inspect before transferring",
      code: "git remote -v\ngit status\ngit log --oneline --graph --all -8\n# Only when origin is the intended local teaching remote:\ngit push -u origin main\n# In a different clone of that same remote:\ngit pull --ff-only origin main",
      explanation:
        "This sequence has context: it belongs in the repositories created by the lab, not an arbitrary project. A remote path under ~/atlas-labs keeps the exercise offline and makes no GitHub account changes.",
    },
    practice: [
      "Draw author clone → bare remote → reviewer clone.",
      "Explain which copy changes during commit, push, fetch, and pull.",
      "Inspect the real remote destination before every practice push.",
    ],
    exercises: [
      exercise(
        "git-collaboration-recall",
        "recall",
        "Write the command to inspect configured remote URLs or paths.",
        ["git remote -v"],
        "Ask remote for verbose destinations.",
        "The output shows where fetch and push will go.",
      ),
      exercise(
        "git-collaboration-predict",
        "predict",
        "Does git fetch alone merge downloaded commits into the current branch? yes or no.",
        ["no"],
        "Download and integration are separate.",
        "fetch updates remote-tracking information; pull or merge performs integration.",
      ),
      exercise(
        "git-collaboration-diagnose",
        "diagnose",
        "A push is rejected because the remote advanced. First fetch and inspect, or force push?",
        ["fetch and inspect", "fetch", "inspect"],
        "Preserve the remote work and understand divergence.",
        "A rejection is a prompt to compare histories, not permission to overwrite others’ commits.",
      ),
    ],
    lab: {
      title: "Collaborate with two local clones",
      environment: `${shell} Use fresh directories under ~/atlas-labs/git-remote. No account, network remote, authentication, or spending is required.`,
      scenario:
        "Act as an author and a reviewer, transferring a documentation improvement through a local bare remote.",
      steps: [
        "Create the bare origin.git and clone it into author. An empty-repository warning is expected before the first commit.",
        "Set local lab identity in author, create README.md, commit, inspect origin, and push main.",
        "Clone origin.git into reviewer and verify README.md arrived.",
        "In author, append a verification sentence, commit, and push.",
        "In reviewer, inspect status, pull with --ff-only, and verify the new sentence and history.",
        "Explain why a push into the bare remote did not automatically edit an already existing reviewer working tree.",
      ],
      evidence: [
        "Remote destinations showing only sandbox paths",
        "Author’s two commit messages and push results",
        "Reviewer’s pull result and final README",
        "Your transfer diagram and explanation",
      ],
      rubric: [
        "Inspects the destination before pushing",
        "Transfers both commits successfully",
        "Distinguishes remote history from reviewer working-tree state",
        "Uses no force push or credentials",
      ],
      hints: [
        "The reviewer must pull after the second author push to update its working tree.",
        "Set identity only in the clone where you create commits.",
      ],
      solution:
        'mkdir -p ~/atlas-labs/git-remote\ngit init --bare -b main ~/atlas-labs/git-remote/origin.git\ngit clone ~/atlas-labs/git-remote/origin.git ~/atlas-labs/git-remote/author\ncd ~/atlas-labs/git-remote/author\ngit config user.name "Atlas Learner"\ngit config user.email "atlas@example.invalid"\necho "# Local collaboration lab" > README.md\ngit add README.md\ngit commit -m "Introduce collaboration lab"\ngit remote -v\ngit push -u origin main\ngit clone ~/atlas-labs/git-remote/origin.git ~/atlas-labs/git-remote/reviewer\necho "Verify the original HTTP request after recovery." >> README.md\ngit add README.md\ngit commit -m "Add recovery verification"\ngit push origin main\ncd ~/atlas-labs/git-remote/reviewer\ngit status\ngit pull --ff-only origin main\ncat README.md\ngit log --oneline -2',
      challenge:
        "Create different new commits in both clones, push one, and observe the other push being rejected. Fetch and draw the divergence before choosing an integration strategy; do not force push.",
    },
    resourceIds: ["git", "github"],
  },
  {
    id: "github-workflow",
    section: 5,
    title: "Prepare a reviewable portfolio contribution",
    minutes: 50,
    status: "released",
    prerequisites: ["git-collaboration"],
    summary:
      "Connect an issue, a branch, a pull request, a README, and a first check without confusing local preparation with published proof.",
    outcomes: [
      "Write an issue with observable acceptance criteria",
      "Prepare a pull-request description and meaningful README",
      "Explain a basic GitHub Actions workflow and verify its check locally",
    ],
    concepts: [
      {
        title: "An issue states the problem",
        body: "A useful issue records a concrete failing behavior, expected behavior, reproduction context, and acceptance criteria. “Improve docs” is weak; “A new learner cannot identify the recovery verification step” gives a reviewer something to test.",
      },
      {
        title: "A pull request is a review conversation",
        body: "A branch isolates a proposed change; a pull request presents that branch for review against a base branch. Describe the problem, the result, validation, and limits. Respond to review with additional commits. A green check is evidence about one check, while human review still assesses meaning and scope.",
      },
      {
        title: "A README should help somebody operate",
        body: "For the Linux web-service project, explain purpose, environment, architecture, setup, verification, failure/recovery, cleanup, and limitations. Include sanitized evidence and explain your decisions. A reviewer should reproduce the lab without guessing whether commands run in Ubuntu, PowerShell, or macOS.",
      },
      {
        title: "A workflow declares when and how checks run",
        body: "GitHub Actions reads YAML files under .github/workflows. An event triggers jobs on runners; steps run commands or actions. The starter check below verifies that README.md contains a Verification heading. It does not prove the runbook is correct. The workflow has read-only repository permissions and no credentials or deployment. Local execution proves the command; only a real Actions run proves the hosted workflow.",
      },
    ],
    commands: [
      command(
        "git diff main...HEAD",
        "Review the branch proposal relative to its common ancestor with main.",
        "git diff main...HEAD",
      ),
      command(
        "grep -q",
        "Check whether a required heading exists, using exit status.",
        'grep -q "^## Verification" README.md',
      ),
      command(
        "git status",
        "Confirm exactly what will be committed.",
        "git status",
      ),
      command(
        "Workflow location",
        "Store a GitHub Actions YAML definition.",
        ".github/workflows/docs.yml",
        "A local file is a prepared workflow, not evidence of a hosted run.",
      ),
    ],
    demo: {
      title: "A small check whose scope is honest",
      code: '# Save this YAML as .github/workflows/docs.yml in your lab repo.\nname: Documentation check\non: [push, pull_request]\npermissions:\n  contents: read\njobs:\n  verify-readme:\n    runs-on: ubuntu-latest\n    timeout-minutes: 5\n    steps:\n      - uses: actions/checkout@v6\n      - name: Require a verification section\n        run: grep -q "^## Verification" README.md',
      explanation:
        "The checked official quickstart uses checkout v6. For security-sensitive projects, verify and pin third-party action revisions as taught in the CI/CD section. Run the grep command locally first, deliberately observe failure without the heading, then add a substantive section and verify success. Hosted availability and billing depend on repository/account settings; this required lab stays local.",
    },
    practice: [
      "Draft an issue with one observable acceptance criterion.",
      "Write a PR description that says what was checked and what remains unverified.",
      "Explain event, job, runner, and step using the YAML, then predict which step fails when the heading is absent.",
    ],
    exercises: [
      exercise(
        "github-workflow-recall",
        "recall",
        "In which repository directory do GitHub Actions workflow files belong?",
        [".github/workflows", ".github/workflows/"],
        "It is a hidden GitHub-specific folder with a workflows child.",
        "GitHub discovers workflow YAML in .github/workflows.",
      ),
      exercise(
        "github-workflow-predict",
        "predict",
        "The heading grep check passes. Does that prove the Nginx recovery procedure works? yes or no.",
        ["no"],
        "The test checks text presence only.",
        "A heading check protects document structure; a real recovery lab provides different evidence.",
      ),
      exercise(
        "github-workflow-diagnose",
        "diagnose",
        "A workflow exists only on your laptop. Is a hosted Actions run proven? yes or no.",
        ["no"],
        "Preparing a file and observing a service execute it are different.",
        "Actual hosted-run output is required before claiming GitHub Actions passed.",
      ),
      exercise(
        "github-workflow-check",
        "recall",
        "Write the demonstrated quiet grep check requiring a line beginning ## Verification in README.md. Quote the pattern.",
        [
          'grep -q "^## Verification" README.md',
          "grep -q '^## Verification' README.md",
        ],
        "The ^ anchors the match to the beginning of a line; -q reports through status.",
        "This exact check protects a heading requirement. A zero exit status still does not validate the recovery procedure’s content.",
      ),
    ],
    lab: {
      title: "Prepare the Linux web-service portfolio review",
      environment: `${shell} Work in a new branch of your local lab repository. Required work is local and free; public publication is a later separate portfolio checkpoint.`,
      scenario:
        "Prepare an incident project that is ready for a reviewer, including one deliberately limited automated check and a candid validation record.",
      steps: [
        "Create a new documentation branch and draft a README with purpose, Ubuntu environment, setup, recovery, cleanup, and limits. Intentionally omit the exact ## Verification heading until the failing-check step.",
        "Draft ISSUE.md with the problem and acceptance criteria and PR.md with the proposed result, validation, and limitations. These are local drafts, not posted issues or pull requests.",
        "Run the heading check before adding a Verification heading and capture its nonzero status. Add the heading with real instructions and repeat to capture zero.",
        "Create .github/workflows/docs.yml using the demo, inspect its permissions and commands, and explain each YAML level.",
        "Stage only the intended documentation/workflow files, review the diff, and commit.",
        "Record “local check passed; hosted workflow not run.” In an optional later GitHub session, verify account/plan settings and public content before pushing, then open an issue and PR and inspect the actual Actions run. Do not claim that optional work is complete without its URLs and run evidence.",
      ],
      evidence: [
        "README, local issue draft, and local PR draft",
        "Failing and passing local check statuses",
        "Workflow YAML and explanation of its limited guarantee",
        "Reviewed commit diff and explicit hosted/unhosted status",
      ],
      rubric: [
        "Provides reproducible Linux-specific setup and recovery instructions",
        "Ties the proposed change to an observable acceptance criterion",
        "Demonstrates that the check can fail as well as pass",
        "Distinguishes local preparation from public portfolio verification",
        "Includes no secrets or raw private logs",
      ],
      hints: [
        "Use your editor for the YAML; indentation matters.",
        'Run echo "$?" immediately after grep -q, since quiet mode intentionally prints no match.',
        "A useful PR description includes how the actual service behavior was tested separately from document structure.",
      ],
      solution:
        '# In your clean local lab repository:\ngit switch -c portfolio-readme\n# Draft README.md, ISSUE.md, and PR.md in your editor.\ngrep -q "^## Verification" README.md\necho "$?"\n# Add a substantive ## Verification section, then repeat:\ngrep -q "^## Verification" README.md\necho "$?"\nmkdir -p .github/workflows\n# Save the demonstrated YAML as .github/workflows/docs.yml.\ngit add README.md ISSUE.md PR.md .github/workflows/docs.yml\ngit diff --staged\ngit commit -m "Prepare reproducible service lab and documentation check"\ngit diff main...HEAD\ngit status',
      challenge:
        "Have a reviewer follow the README in a fresh disposable environment. Record each ambiguity they encounter, repair it on a new commit, and distinguish their practical evidence from your automated heading check.",
    },
    resourceIds: ["git", "github", "actions", "security"],
  },
];
