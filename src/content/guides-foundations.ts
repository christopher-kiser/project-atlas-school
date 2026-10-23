import type { LessonStudyGuide } from "./study-types";

const term = (term: string, meaning: string) => ({ term, meaning });
const optional = (topic: string, reason: string) => ({ topic, reason });
const step = (title: string, instruction: string, expected: string) => ({
  title,
  instruction,
  expected,
});
const detail = (
  command: string,
  breakdown: string,
  expected: string,
  pitfall: string,
) => ({ command, breakdown, expected, pitfall });

export const foundationGuides: Record<string, LessonStudyGuide> = {
  orientation: {
    startingPoint:
      "Open the tab/profile labeled Ubuntu in Windows Terminal, or a terminal inside your Ubuntu VM. A browser page is not a shell, and a PowerShell prompt beginning PS is a different shell. If Ubuntu is not installed or you cannot find that environment, pause and follow the lesson’s official WSL/Ubuntu setup reference before running labs. Use an ordinary user account rather than root. The website only displays instructions; type commands into the Ubuntu terminal.",
    whyItMatters:
      "Cloud engineers must establish which machine they control and whether a change actually happened. This small folder experiment introduces the same observation → test → evidence loop used during incidents.",
    required: [
      "Distinguish terminal window, shell, and operating system: the window displays text, Bash interprets it, and Linux manages resources.",
      "Read a command as program, options, and arguments; Enter runs the line and a new prompt means the shell is ready again.",
      "Create and enter a disposable workspace, then prove its location with pwd.",
      "Separate a claim, an attempted action, and an observed result. An error is information to investigate.",
    ],
    optional: [
      optional(
        "Memorizing command options",
        "Look them up when needed; explaining the options you actually use matters more than recalling every option.",
      ),
      optional(
        "Other shells and Linux distributions",
        "Ubuntu and Bash give this course one reproducible environment. Compare alternatives after the core workflow is comfortable.",
      ),
    ],
    terms: [
      term(
        "Prompt",
        "The text before your cursor when the shell is waiting for a command; do not copy it as part of a command.",
      ),
      term(
        "Argument",
        "A value after a command name, such as a path telling the command what to work on.",
      ),
      term(
        "Option",
        "A setting that changes behavior, often beginning with -, such as -p.",
      ),
      term(
        "Home directory",
        "Your account’s personal Linux directory, often /home/your-name; Bash expands an unquoted leading ~ to this path.",
      ),
      term(
        "Evidence",
        "An observable result that supports a specific claim, such as the path printed by pwd.",
      ),
    ],
    walkthrough: [
      step(
        "Establish your starting point",
        'In the Ubuntu tab run uname -s, then echo "$BASH_VERSION", then pwd. Read the whole path and write down what it says before changing anything.',
        "Linux, a Bash version number, and an absolute path beginning with / should appear. If the environment differs, stop and use the setup reference. The path is this shell’s current directory, not necessarily the folder containing the website.",
      ),
      step(
        "Create a workspace",
        "Run mkdir -p ~/atlas-labs/orientation, then cd ~/atlas-labs/orientation and pwd.",
        "The last output ends with /atlas-labs/orientation. mkdir and cd normally print nothing when successful.",
      ),
      step(
        "Observe a failed change",
        "Run cd atlas-no-such-folder, then pwd. Leave the missing folder uncreated.",
        "Bash reports a missing directory; pwd still shows /atlas-labs/orientation. The attempted change did not occur.",
      ),
      step(
        "Read a reference",
        "Run man pwd. Use the arrow keys to move and press q to leave. If man is unavailable, read pwd --help instead.",
        "You can explain what pwd prints and return to a prompt. Write observation, hypothesis, test, and result in your own words.",
      ),
    ],
    commandDetails: [
      detail(
        'uname -s / echo "$BASH_VERSION"',
        'uname -s prints the kernel name. echo "$BASH_VERSION" prints Bash’s built-in version variable: $ asks Bash to substitute a stored value and quotes keep that value together.',
        "Linux and a nonempty Bash version in the declared course environment.",
        "A tab’s appearance alone does not establish its shell or operating system. If these checks fail, return to the official Ubuntu setup rather than changing commands by guesswork.",
      ),
      detail(
        "pwd",
        "Print working directory. With no path argument it reports the directory attached to this shell.",
        "One path such as /home/learner/atlas-labs/orientation.",
        "Do not infer location from a tab title or a previous command that failed.",
      ),
      detail(
        "mkdir -p",
        "mkdir creates directories; -p creates missing parents and accepts directories that already exist. ~/atlas-labs/orientation is the target.",
        "Usually no text; verify the directory by entering it and running pwd.",
        "An existing file with the target name is an error. -p does not turn a file into a folder.",
      ),
      detail(
        "man",
        "man pwd opens the manual for pwd. The viewer is interactive; q quits it. pwd --help is a useful fallback when manual pages are absent.",
        "A reference page appears, followed by your shell prompt after q.",
        "Typing commands while a pager is open sends keys to the viewer, not to Bash.",
      ),
      detail(
        "cd",
        "Change directory in the current shell. cd ~/atlas-labs/orientation uses your home path; cd atlas-no-such-folder resolves from the current location.",
        "A valid target changes the following pwd result; an invalid target prints an error and leaves the location unchanged.",
        "Do not type the $ prompt shown in some tutorials, or type a Windows C:\\ path into Bash.",
      ),
    ],
    readiness: [
      "I can explain each part of mkdir -p ~/atlas-labs/orientation.",
      "I can prove both a successful and a failed directory change.",
      "I know where to type commands and where the course expects me to keep lab files.",
    ],
  },
  "terminal-map": {
    startingPoint:
      "Use the same Ubuntu shell as orientation. You can already create a directory, use cd, and read pwd; keep a fresh map workspace under ~/atlas-labs.",
    whyItMatters:
      "Every configuration file, log, script, and repository has a location. Many apparent missing-file failures are simply commands run from the wrong directory.",
    required: [
      "Resolve a relative path from the current directory and an absolute path from /.",
      "Explain . as current directory, .. as parent, and ~ as your home directory.",
      "Read names with ls, include hidden names with -a, and inspect details with -l.",
      "Use completion and quote paths containing spaces; correct the path before attempting unrelated repairs.",
    ],
    optional: [
      optional(
        "Filesystem directory conventions",
        "Learning /etc, /var, and /usr becomes useful during administration; memorizing the complete Linux directory standard is unnecessary here.",
      ),
      optional(
        "Symbolic links and physical paths",
        "They can make pwd -P differ from plain pwd. Explore after ordinary navigation makes sense.",
      ),
    ],
    terms: [
      term(
        "Root /",
        "The top of the Linux filesystem. It differs from /root, the administrative user’s home.",
      ),
      term(
        "Absolute path",
        "A full address beginning with /, independent of your present directory.",
      ),
      term(
        "Relative path",
        "An address interpreted from your present directory, such as ../evidence.",
      ),
      term(
        "Dotfile",
        "A name beginning with a dot; ordinary ls omits these names.",
      ),
      term(
        "Case sensitive",
        "Names such as Evidence and evidence can identify different entries.",
      ),
    ],
    walkthrough: [
      step(
        "Build two neighboring folders",
        "Run mkdir -p ~/atlas-labs/map/evidence ~/atlas-labs/map/drafts, then cd ~/atlas-labs/map/drafts and pwd.",
        "pwd ends with /map/drafts. Both child directories exist under the same parent.",
      ),
      step(
        "Use a relative route",
        "Run ls .. to inspect the parent, then cd ../evidence and pwd.",
        "The parent listing includes drafts and evidence; your final location ends with /map/evidence.",
      ),
      step(
        "Use a home-based route",
        "Run cd ~, then type cd ~/atl and press Tab without pressing Enter until you have inspected the completed path. Finish the path to map/evidence and run pwd.",
        "Completion fills matching names or offers choices. Both routes reach the same evidence directory.",
      ),
      step(
        "Diagnose spelling",
        "Try cd ../Evidence. Run pwd and ls -la .. after the error; identify the differently capitalized name.",
        "The failed command did not move you. The listing gives the actual spelling rather than requiring a guess.",
      ),
    ],
    commandDetails: [
      detail(
        "pwd",
        "Print the current working directory. Use it before interpreting a relative address.",
        "An absolute path showing this shell’s location.",
        "A second tab has its own location; changing one tab does not move another.",
      ),
      detail(
        "ls",
        "ls lists current-directory names; ls .. lists the parent. In ls -la, -l adds mode/owner/size/time columns and -a includes dot names, including . and ...",
        "Directory entries; exact names and dates depend on your machine.",
        "-h changes displayed sizes when combined with a listing; it does not mean hidden.",
      ),
      detail(
        "cd",
        'cd ./notes enters a child; cd .. moves one level upward; cd ../evidence enters a sibling. Quote the entire path when it contains spaces, such as cd "./my notes".',
        "Silence on success, then a different pwd result.",
        "cd ../.. means two parents, not a special named folder; predict its result before running it.",
      ),
      detail(
        "Tab completion",
        "Type part of a command/path and press the Tab key. Bash attempts completion; multiple matches may require another Tab or more letters.",
        "The input line expands or possible matches are displayed; nothing runs until Enter.",
        "Do not type the word Tab. Quoting spaces and inspecting the completed line still matter.",
      ),
      detail(
        "mkdir -p",
        "Create both specified paths and their missing parent directories before trying to navigate them.",
        "No normal output. ls ~/atlas-labs/map shows the children.",
        "Repeated practice reuses existing directories; choose a new child if they contain work you need.",
      ),
    ],
    readiness: [
      "Starting from drafts, I can reach evidence with a relative path and explain every component.",
      "I can recover from a capitalization mistake using pwd and ls.",
      "I can identify a hidden name without changing the file.",
    ],
  },
  "terminal-files": {
    startingPoint:
      "You can navigate and inspect names. Use a new folder under ~/atlas-labs/files so the writing and copying exercises cannot replace earlier work.",
    whyItMatters:
      "Engineers create configuration drafts, preserve evidence copies, and rename runbooks. The distinction between content, filenames, and locations prevents accidental overwrites.",
    required: [
      "Choose mkdir for directories and touch for an absent empty file; touch preserves existing contents.",
      "Read small text with cat and create a simple line with echo.",
      "Read cp and mv as source first, destination second; inspect the destination before an overwrite prompt.",
      "Understand that > replaces file contents before writing. Verify names and contents after each change.",
    ],
    optional: [
      optional(
        "Copying whole trees and preserving metadata",
        "cp -r and archive options matter later; this lesson requires only deliberate copying of named text files.",
      ),
      optional(
        "Timestamp internals",
        "Know that touch changes timestamps without erasing content; detailed access/modify/change timestamp rules can wait.",
      ),
    ],
    terms: [
      term("Source", "The existing file you copy or move from."),
      term("Destination", "The new name or directory you copy or move to."),
      term(
        "Overwrite",
        "Replace data already stored at a destination; this can destroy the previous contents.",
      ),
      term(
        "Redirection",
        "Shell syntax that sends a command’s output to a file rather than displaying it.",
      ),
      term(
        "Empty file",
        "An existing file with no content; it can have a name even when cat prints nothing.",
      ),
    ],
    walkthrough: [
      step(
        "Prepare a safe ticket",
        "Run mkdir -p ~/atlas-labs/files/ticket-101/evidence and cd ~/atlas-labs/files/ticket-101. Check pwd and ls -la; use another fresh ticket name if existing work is present.",
        "An empty working directory with an evidence child is ready.",
      ),
      step(
        "Write and read one note",
        'Run echo "Investigating an HTTP failure" > note.txt, touch checklist.txt, then cat note.txt and cat checklist.txt.',
        "The note prints a line; the empty checklist prints none. ls -l shows both names and their different sizes.",
      ),
      step(
        "Preserve then rename",
        "Run cp -i note.txt evidence/note.txt, then mv -i note.txt investigation.txt.",
        "The original location now has investigation.txt and no note.txt. evidence/note.txt remains a separate copy.",
      ),
      step(
        "Verify independently",
        "Run ls -l, ls -l evidence, and cat investigation.txt evidence/note.txt. Explain which action changed a name and which duplicated data.",
        "Both note contents print and the directory listings show the intended names. Read any overwrite prompt rather than automatically answering yes.",
      ),
    ],
    commandDetails: [
      detail(
        "mkdir / mkdir -p",
        "mkdir evidence creates one directory when its parent exists. -p creates missing intermediate components such as ticket-101/evidence.",
        "No normal output; inspect the resulting names with ls.",
        "mkdir does not create a regular text file.",
      ),
      detail(
        "touch",
        "touch checklist.txt creates a missing empty file; for an existing file it updates timestamps without truncating its content.",
        "Usually no output. An absent checklist becomes a zero-byte file.",
        "Do not use touch when you intend to erase existing content.",
      ),
      detail(
        "cat",
        "cat note.txt prints the file. Multiple path arguments print each file in sequence; the output does not automatically label them.",
        "Text appears exactly as stored, or no text for an empty file.",
        "A missing-file error differs from an empty successful result; check ls and the error.",
      ),
      detail(
        "echo",
        'echo "Observed at 10:00" prints one simple quoted message and a newline. Quotes keep the spaces in the argument.',
        "Observed at 10:00 on the terminal unless redirected.",
        "echo has portability details for escapes/options; use the simple literal form taught here.",
      ),
      detail(
        "cp -i",
        "cp -i note.txt evidence/note.txt copies source contents to the destination; -i requests confirmation before an existing destination is replaced.",
        "Normally silent; both copies can be listed and read.",
        "Reversing source and destination may replace the wrong file. Answer n if unsure.",
      ),
      detail(
        "mv -i",
        "mv -i note.txt investigation.txt renames the source; a destination directory instead moves it inside that directory. -i protects an existing destination with a prompt.",
        "The new name exists and the old source name is gone.",
        "Moving does not create a backup; copy first when preservation is required.",
      ),
      detail(
        ">",
        "Bash handles > note.txt before running echo and opens/truncates that destination for standard output.",
        "The echoed text is stored in note.txt rather than shown on the terminal.",
        "An existing note.txt is replaced even when the command later fails; use a fresh sandbox file.",
      ),
    ],
    readiness: [
      "I can predict which names remain after a copy followed by a rename.",
      "I can explain why touch does not erase a report.",
      "I can verify both content and location without relying on a command’s silence.",
    ],
  },
  "terminal-cleanup": {
    startingPoint:
      "You have practiced explicit file paths and copying. Use only the new cleanup sandbox; the lesson’s deletion exercises have no desktop recycle-bin recovery.",
    whyItMatters:
      "Cleanup is a real operations task, but deleting the wrong logs, configuration, or evidence can turn a small issue into an outage. Scope and preservation are part of success.",
    required: [
      "Preview shell wildcard expansion without deleting matches.",
      "Distinguish deleting a file, deleting an empty directory, and recursively deleting a tree.",
      "Inspect the exact target and neighboring keep file before every removal.",
      "Read each interactive prompt and prove both intended absence and neighboring preservation afterward.",
    ],
    optional: [
      optional(
        "Complex glob patterns",
        "Character classes and recursive glob settings are useful conveniences; explicit paths are easier to audit while learning.",
      ),
      optional(
        "Automated retention policies",
        "Real production cleanup needs retention requirements and backups. This lesson establishes the manual decision process first.",
      ),
    ],
    terms: [
      term(
        "Wildcard / glob",
        "A shell pattern expanded into matching filenames before the command receives them.",
      ),
      term(
        "Recursive",
        "An action that descends through a directory and its children.",
      ),
      term(
        "Interactive prompt",
        "A question requiring a response before the program continues.",
      ),
      term(
        "Precondition",
        "Something that must be true first, such as a directory being empty for rmdir.",
      ),
    ],
    walkthrough: [
      step(
        "Make only disposable targets",
        "Run mkdir -p ~/atlas-labs/cleanup/disposable-tree/child, touch ~/atlas-labs/cleanup/keep.txt, and touch ~/atlas-labs/cleanup/disposable-tree/child/scratch.txt.",
        "The parent contains keep.txt and the disposable-tree directory; the child contains only scratch.txt.",
      ),
      step(
        "Inspect all intended scope",
        "Run pwd, ls -la ~/atlas-labs/cleanup, and ls -la ~/atlas-labs/cleanup/disposable-tree/child. Stop if you see unrelated contents.",
        "You can name every object the removal will affect and the neighboring file it must preserve.",
      ),
      step(
        "Observe an empty-directory guard",
        "Try rmdir ~/atlas-labs/cleanup/disposable-tree before deleting its contents.",
        "The nonempty-directory error prevents the operation. This is expected and does not justify force flags.",
      ),
      step(
        "Remove and prove the result",
        "Run rm -ri ~/atlas-labs/cleanup/disposable-tree. Read each prompt; answer y only for the intended tree. Then list ~/atlas-labs/cleanup.",
        "The tree is absent and keep.txt remains. If you answered n, inspect what remains rather than claiming complete cleanup.",
      ),
    ],
    commandDetails: [
      detail(
        "Wildcards * and ?",
        "* matches a sequence of filename characters; ? matches one character. In ls ./*.log, Bash expands the unquoted pattern before ls. Ordinary patterns omit leading-dot names.",
        "Matching names are listed. With no match, default Bash passes the pattern literally and ls may report it missing.",
        "Preview with ls; these labs never use wildcard removal targets. A pattern can include more than intended.",
      ),
      detail(
        "rm -i",
        "rm removes named files. -i asks before each removal; ./discard.txt explicitly names a file in the current directory.",
        "A confirmation prompt followed by removal only if accepted; verify with ls.",
        "rm bypasses ordinary desktop trash. A confirmation is only useful when you read its target.",
      ),
      detail(
        "rmdir",
        "rmdir ./empty removes a directory only when it contains no entries other than . and ...",
        "An empty directory disappears; a nonempty directory produces an error and remains.",
        "Hidden files also make a directory nonempty; inspect ls -la before choosing any next action.",
      ),
      detail(
        "rm -ri",
        "-r descends recursively through the named tree; -i asks about descent/removal. The exact ~/atlas-labs/cleanup/disposable-tree path limits this exercise.",
        "Several prompts can appear for directories and files; after accepted removal the whole named tree is absent.",
        "Do not add sudo, -f, or an unexamined variable. Keep the parent and keep.txt outside the target.",
      ),
      detail(
        "mkdir -p / touch / ls -la",
        "Create the nested fixture, create its harmless empty files, and inspect all names including hidden entries. These setup commands do not prove cleanup.",
        "A small known tree before removal and only keep.txt afterward.",
        "Repeating setup in an old tree can mix disposable fixtures with previous work; inspect first.",
      ),
    ],
    readiness: [
      "I can explain exactly what -r and -i change.",
      "I know why rmdir refused and can inspect the reason.",
      "I can prove keep.txt survived, as well as proving the target is gone.",
    ],
  },
  "terminal-streams": {
    startingPoint:
      "You can create and read small text files. Keep this exercise in a fresh streams/capture directory, because output redirection can replace existing files.",
    whyItMatters:
      "Command-line tools become useful together when their input, normal results, and diagnostics travel through intentional channels. Separating those channels preserves incident evidence.",
    required: [
      "Identify stdin 0, stdout 1, and stderr 2 and their default terminal destinations.",
      "Explain replace (>), append (>>), read-input (<), and diagnostic redirection (2>).",
      "Explain that a pipe connects only the left program’s stdout to the right program’s stdin by default.",
      "Predict files created by a failing command and never redirect output into the file being read.",
    ],
    optional: [
      optional(
        "Descriptor duplication and ordering",
        "2>&1 and more complex pipelines are useful later; master separate channels first.",
      ),
      optional(
        "Binary pipelines and buffering",
        "These explain some advanced stream behavior but are unnecessary for the small line-oriented fixtures.",
      ),
    ],
    terms: [
      term(
        "stdin",
        "The input stream a program reads; by default it can come from terminal input.",
      ),
      term("stdout", "The normal-result stream, numbered 1."),
      term(
        "stderr",
        "The diagnostic stream, numbered 2; it can appear beside stdout while remaining separate.",
      ),
      term("Truncate", "Reduce a file to empty before writing new contents."),
      term(
        "Pipe",
        "A connection between two running programs’ output and input streams.",
      ),
    ],
    walkthrough: [
      step(
        "Create two observations",
        'In a fresh ~/atlas-labs/streams/capture directory run echo "request sent" > observations.txt, then echo "request failed" >> observations.txt.',
        "cat observations.txt prints two lines in order. The second command appended instead of erasing the first.",
      ),
      step(
        "Read through stdin",
        "Run cat < observations.txt and wc -l < observations.txt.",
        "cat prints both observations. wc prints 2 because both echo lines end in newline characters.",
      ),
      step(
        "Separate a deliberate error",
        "Run cat definitely-absent.txt > result.txt 2> error.txt, then read error.txt and inspect ls -l result.txt.",
        "The terminal need not show an error because it was captured. error.txt contains the diagnostic and result.txt exists with zero bytes.",
      ),
      step(
        "Trace a pipeline",
        "Run cat observations.txt | wc -l and explain the data at each side of |.",
        "cat sends two lines through stdout; wc reads those lines from stdin and prints 2. A direct wc -l < observations.txt achieves the same count with one program.",
      ),
    ],
    commandDetails: [
      detail(
        ">",
        'echo "first observation" > note.txt sends stdout to note.txt. Bash opens and truncates the file before echo runs.',
        "One line is stored; normally no terminal output.",
        "It replaces old contents. Never run cat note.txt > note.txt: the input may be emptied before cat reads it.",
      ),
      detail(
        ">>",
        'echo "second observation" >> note.txt opens stdout in append mode, preserving existing content and creating the file if needed.',
        "The new line follows the old line.",
        "Appending repeatedly duplicates entries; inspect an existing fixture before replaying a demo.",
      ),
      detail(
        "<",
        "cat < note.txt makes Bash provide note.txt as stdin. By contrast cat note.txt asks cat to open the named file itself.",
        "Both forms can print the same content through different input mechanisms.",
        "< redirects input, not output; it does not write into the named file.",
      ),
      detail(
        "2>",
        "cat missing.txt > result.txt 2> error.txt sends normal output to result.txt and diagnostics to error.txt. The 2 must touch >.",
        "The missing-file diagnostic appears in error.txt; result.txt is empty because there was no normal result.",
        "Typing 2 > instead can make 2 a program argument and changes the meaning.",
      ),
      detail(
        "|",
        "cat note.txt | wc -l connects cat’s stdout to wc’s stdin. wc -l counts newline characters.",
        "A two-newline fixture returns 2.",
        "The default pipe excludes stderr. A count without its source context is weak evidence.",
      ),
      detail(
        "wc -l",
        "wc means word count, but -l selects newline counting. With < observations.txt it reads stdin and prints only the count.",
        "2 for the two-line echo fixture; with a filename argument it also prints that name.",
        "A final text fragment without a newline is not counted as a newline, even if it looks like a line in an editor.",
      ),
    ],
    readiness: [
      "I can draw where each of the three streams goes in the failing cat example.",
      "I can explain why an empty result file is compatible with failure.",
      "I can preserve a prior observation when adding another.",
    ],
  },
  "terminal-search": {
    startingPoint:
      "You understand files, pipes, and append redirection. Create the exact four-line fixture first so you can compare predictions with observable results.",
    whyItMatters:
      "Production logs are often too large to read entirely. Engineers locate the right files, select relevant lines, and preserve enough context to explain a failure.",
    required: [
      "Use find for filenames/properties and grep for text inside files.",
      "Quote wildcard patterns passed to find so Bash does not expand them too early.",
      "Read bounded portions with head/tail and count only selected lines with a pipe.",
      "Start and stop a log follower, distinguishing the reader from a separate writer.",
    ],
    optional: [
      optional(
        "Regular expressions",
        "Literal INFO and ERROR are sufficient here; learn more pattern syntax as actual investigations require it.",
      ),
      optional(
        "tail -F and log rotation",
        "Useful when a log file is replaced; tail -f on a fixed local fixture teaches the required follow behavior first.",
      ),
    ],
    terms: [
      term(
        "Fixture",
        "Small known input designed so expected results can be predicted.",
      ),
      term(
        "Pattern",
        "A selection rule; filename globs in find differ from grep’s content patterns.",
      ),
      term(
        "Line number",
        "A line’s position in its source file; grep -n preserves this useful context.",
      ),
      term(
        "Follower",
        "A program that waits and prints newly appended data rather than exiting immediately.",
      ),
    ],
    walkthrough: [
      step(
        "Build a predictable log",
        "In ~/atlas-labs/search/ticket write INFO start, ERROR timeout, INFO retry, and ERROR refused as four separate echo lines, using > once then >> three times.",
        "cat app.log shows four ordered lines; errors occupy original lines 2 and 4.",
      ),
      step(
        "Locate then select",
        'Run find . -type f -name "*.log", then grep -n ERROR app.log and grep ERROR app.log | wc -l.',
        "find prints ./app.log; grep prefixes error lines with 2: and 4:; the count is 2.",
      ),
      step(
        "Read the boundaries",
        "Run head -n 2 app.log and tail -n 1 app.log.",
        "head shows INFO start and ERROR timeout; tail shows ERROR refused. These inspect original file boundaries, not only errors.",
      ),
      step(
        "Observe another writer",
        'Run tail -f app.log. In a second Ubuntu tab append echo "ERROR retry-exhausted" >> ~/atlas-labs/search/ticket/app.log. Return to the first tab, press Ctrl+C, and recount.',
        "The new line appears in the follower; after stopping it, the file remains and the error count is 3. The second tab needs the full path because it has its own current directory.",
      ),
    ],
    commandDetails: [
      detail(
        "find",
        'find . begins at the current directory; -type f keeps regular files; -name "*.log" tests each name against the quoted pattern.',
        "./app.log in the known fixture.",
        "An unquoted *.log may be expanded by Bash before find sees it. Starting at / scans far beyond this lab.",
      ),
      detail(
        "grep",
        "grep -n ERROR app.log selects case-sensitive matching lines and prints original line numbers. -i would ignore case.",
        "2:ERROR timeout and 4:ERROR refused before the append.",
        "No output can mean no match, wrong case, or a wrong/empty file; read diagnostics and inspect the fixture.",
      ),
      detail(
        "head",
        "head -n 2 app.log prints at most the first two lines; -n takes the requested line count.",
        "The first two original lines.",
        "head after a grep reads filtered output, whereas head app.log reads the original file.",
      ),
      detail(
        "tail",
        "tail -n 1 reads the last line. tail -f first prints a tail sample, then waits for appended data. Ctrl+C interrupts this follower.",
        "ERROR refused initially; the newly appended error later appears during follow.",
        "A follower staying open is expected. Stopping the reader does not stop a different process writing the log.",
      ),
      detail(
        "wc",
        "wc counts input; -l selects newlines. grep ERROR app.log | wc -l counts only grep’s selected lines.",
        "2 before the append, 3 afterward.",
        "wc -l app.log counts every original line, not just errors.",
      ),
      detail(
        "echo / > / >>",
        "Use one echo per fixture line. > creates/replaces the first log, and >> adds subsequent lines.",
        "Exactly four lines before the live-append step.",
        "Replaying append commands into an old fixture changes expected counts; inspect first or use a fresh child directory.",
      ),
    ],
    readiness: [
      "I can decide whether a question needs find or grep.",
      "I can explain both the selected error count and their original line numbers.",
      "I can stop tail without assuming the log or writer disappeared.",
    ],
  },
  "terminal-control": {
    startingPoint:
      "You can use grep, inspect errors, and connect a short pipeline. This lesson adds command lookup and the status value that controls conditional execution.",
    whyItMatters:
      "Automation needs a dependable success/failure signal. Friendly-looking text or a quiet terminal is insufficient for deciding whether to run the next step.",
    required: [
      "Distinguish builtins from external commands and inspect resolution with type.",
      "Explain $PATH as directories searched for external programs without editing it.",
      "Read $? immediately: 0 conventionally means success, grep 1 means no match, and grep 2 means an error.",
      "Use short && and || checks and consult command help before interpreting nonzero statuses.",
    ],
    optional: [
      optional(
        "Aliases, functions, and lookup precedence",
        "type may reveal these; writing custom shell layers can wait until basic command resolution is clear.",
      ),
      optional(
        "Complex conditional chains",
        "Use explicit small checks first. Long A && B || C chains are not always equivalent to an if/else.",
      ),
    ],
    terms: [
      term(
        "Builtin",
        "A command implemented by the shell itself, such as cd, which must change that shell’s state.",
      ),
      term(
        "External program",
        "A separate executable process, often found using PATH.",
      ),
      term(
        "Variable expansion",
        "Replacing a $name reference with its stored value before the command runs.",
      ),
      term(
        "Exit status",
        "The integer result of a command, separate from what it printed.",
      ),
      term(
        "Conditional execution",
        "Run another command only when the prior command’s status meets a condition.",
      ),
    ],
    walkthrough: [
      step(
        "Inspect command lookup",
        'Run type cd, type cat, and echo "$PATH".',
        "cd is normally reported as a shell builtin. cat normally resolves to an executable path; PATH contains colon-separated directories.",
      ),
      step(
        "Make a controlled result",
        'In ~/atlas-labs/control/check write echo READY > state.txt. Run grep READY state.txt, immediately followed by echo "$?".',
        "The matched line prints and the status is 0.",
      ),
      step(
        "Compare two failures",
        'Run grep ABSENT state.txt and immediately echo "$?". Then run grep READY definitely-absent.txt and immediately echo "$?".',
        "No-match status is 1; unreadable/missing-file error status is normally 2 with a diagnostic. They need different interpretations.",
      ),
      step(
        "Use the result",
        "Run grep READY state.txt && echo present, then grep ABSENT state.txt || echo missing. Look up grep in man and find EXIT STATUS.",
        "present appears after success and missing after no match. Explain why || would also run for a read error unless you distinguish it explicitly.",
      ),
    ],
    commandDetails: [
      detail(
        "type",
        "type cd asks Bash how cd resolves; type cat inspects cat. This can reveal a builtin, alias, function, or executable path.",
        "Typically cd is a shell builtin and cat is /usr/bin/cat or /bin/cat.",
        "Customized shells may differ; describe your actual output rather than forcing a textbook result.",
      ),
      detail(
        "$PATH",
        'echo "$PATH" expands the PATH variable as one quoted argument. Its colon-separated directories are searched for external command names.',
        "A list such as /usr/local/bin:/usr/bin:/bin.",
        "PATH is not a command. A script in the current folder is not automatically discoverable by its bare name.",
      ),
      detail(
        "$?",
        'echo "$?" displays the status of the immediately previous command. The echo itself then becomes the previous command.',
        "0 for a matching grep, 1 for no match, or another documented failure status.",
        "Running ls or another echo before inspecting it overwrites the status you intended to observe.",
      ),
      detail(
        "&& / ||",
        'A && B runs B when A returns zero; A || B runs B when A returns nonzero. cat missing.txt || echo "Read failed" is a fallback based on status.',
        "The fallback appears after the failed read; a success-only message appears after a matching grep.",
        "The fallback’s success can make the whole chain return zero; do not interpret that as proof the original operation succeeded.",
      ),
      detail(
        "history",
        "history 5 lists up to five recent entries from this shell’s history. Arrow keys recall an editable command line.",
        "Numbered recent commands in an interactive Bash session.",
        "History can contain private values. Never submit the entire history as lab evidence or execute a recalled line without inspecting it.",
      ),
      detail(
        "man",
        "man grep opens the reference; /EXIT STATUS searches in the usual pager and q exits. grep --help is a fallback.",
        "The manual distinguishes match, no match, and error statuses.",
        "Not every program uses the same nonzero meanings; use that program’s documentation.",
      ),
      detail(
        "grep / echo",
        "grep READY state.txt searches case-sensitively for READY; echo present prints a literal marker. Their results and statuses are separate.",
        "A match prints READY, then a conditional echo can print present.",
        "Searching ABSENT is a deliberate no-match test, not evidence the file itself is missing.",
      ),
    ],
    readiness: [
      "I can capture a status before replacing it.",
      "I can explain why grep no-match and grep read-error differ.",
      "I can predict whether the right-hand command of && or || runs.",
    ],
  },
  "linux-permissions": {
    startingPoint:
      "Use your ordinary Ubuntu user and a harmless file you own. Run whoami first; if it prints root, switch to your normal account before attempting the expected permission denial.",
    whyItMatters:
      "A cloud service can fail because its identity cannot read a file or traverse a directory. Precise permission repair restores access without exposing data to everyone.",
    required: [
      "Read owner, group, and other permission classes in ls -l.",
      "Translate file r/w/x and directory r/w/x correctly; reading content and deleting a directory entry are different permissions.",
      "Translate 600, 644, and 755 using r=4, w=2, x=1.",
      "Reproduce and repair a missing owner-read bit, then repeat the original read as the same user.",
    ],
    optional: [
      optional(
        "ACLs, sticky bits, and special modes",
        "These extend ordinary permissions. Learn them when the basic owner/group/other model cannot explain access.",
      ),
      optional(
        "Privileged ownership administration",
        "Understand what sudo and chown do, but this required exercise uses your own files and does not need either.",
      ),
    ],
    terms: [
      term(
        "Owner",
        "The user associated with a file, shown after its permission mode in ls -l.",
      ),
      term("Group", "A set of users that can share one permission class."),
      term(
        "Mode bits",
        "Read, write, and execute permissions assigned separately to owner, group, and others.",
      ),
      term(
        "Traversal",
        "Permission to pass through/search a directory while reaching an entry inside it.",
      ),
      term(
        "Least privilege",
        "Give only the access needed for the intended task.",
      ),
    ],
    walkthrough: [
      step(
        "Identify yourself and the target",
        "Run whoami, id, and groups. In ~/atlas-labs/permissions/recovery create note.txt with harmless text, then chmod 600 note.txt and ls -l note.txt.",
        "You are not root; the mode begins -rw------- and the owner is your account.",
      ),
      step(
        "Create a specific denial",
        "Run chmod u-r note.txt, then cat note.txt and ls -l note.txt.",
        "The owner-read bit is absent and the ordinary owner receives Permission denied. Root/capabilities can bypass this test, so their success is not the intended result.",
      ),
      step(
        "Repair only what is missing",
        "Run chmod u+r note.txt, then repeat cat note.txt and ls -l note.txt.",
        "The text is readable again and the mode returns to -rw-------. Group and others still have no access.",
      ),
      step(
        "Decode modes",
        "Create public-note.txt and executable-example with touch, then chmod 644 public-note.txt and chmod 755 executable-example. Inspect ls -l.",
        "The modes are -rw-r--r-- and -rwxr-xr-x. An execute bit does not put useful program instructions into an empty file.",
      ),
      step(
        "Connect identity to access",
        'Run id -gn. Explain the result and the quoted command substitution in chgrp "$(id -gn)" note.txt before optionally using it on this owned lab file.',
        "The selected group is your primary group; the file’s owner is unchanged. You can explain why changing ownership is a different operation.",
      ),
    ],
    commandDetails: [
      detail(
        "whoami / id / groups",
        "whoami prints the effective username. id prints numeric user/group IDs and memberships; groups lists membership names. id -gn requests the primary group name (-g for group, -n for name).",
        "Your ordinary account and its groups; exact values vary.",
        "A user’s group memberships do not override a more specifically selected owner class by adding all classes together.",
      ),
      detail(
        "ls -l",
        "The first character is file type, followed by owner/group/other rwx triplets. Subsequent columns include link count, owner, group, size, timestamp, and name.",
        "A 600 regular file begins -rw-------.",
        "Parent directory traversal can block access even when the file’s own read bit is present.",
      ),
      detail(
        "chmod",
        "chmod 600 note.txt sets owner read+write (4+2), group none, others none. u-r removes owner read only; u+r restores it. 644 and 755 set full specified modes.",
        "Mode listings change; a denied read succeeds after the missing bit is restored.",
        "777 grants all three access types to everyone and hides the diagnosis rather than solving the intended policy.",
      ),
      detail(
        "chgrp",
        'chgrp "$(id -gn)" private-note.txt changes the file’s group. Bash runs id -gn and substitutes its output; quotes keep that group name together.',
        "The group column shows your primary group, possibly unchanged if it already matched.",
        "Ordinary users need suitable ownership and group membership. Do not guess another group or add sudo for this exercise.",
      ),
      detail(
        "sudo / chown",
        "sudo runs an authorized command as another identity, usually root. chown changes ownership. man sudo and man chown only read their documentation.",
        "Reference pages explain administrative boundaries; no ownership change is required here.",
        "Using sudo cat would bypass the intended ordinary-user denial and fail to prove its repair.",
      ),
      detail(
        "touch / cat",
        "touch creates the two absent empty comparison files. cat tests actual read access to note.txt as your current user.",
        "Empty comparison files exist; note.txt’s read fails then succeeds under the intended modes.",
        "The filename must be the same in the failing test and the recovered test.",
      ),
    ],
    readiness: [
      "I can decode 600, 644, and 755 without calling every permission executable.",
      "I can distinguish file write permission from directory-entry deletion permission.",
      "I can repair a denied read without granting new access to group or others.",
    ],
  },
  "linux-processes": {
    startingPoint:
      "You understand users and exit statuses. This exercise launches only harmless sleep processes that you own; do not signal an existing application to practice.",
    whyItMatters:
      "Many services use multiple processes with similar names. Identifying the exact process and requesting orderly termination prevents stopping unrelated workloads.",
    required: [
      "Distinguish a program on disk from a running process with PID, owner, and parent PID.",
      "Capture each background process PID immediately with $! and inspect it before signaling.",
      "Use ps for a snapshot and top for a changing view.",
      "Use TERM on the selected lab process and verify that its neighboring process remains running.",
    ],
    optional: [
      optional(
        "All signal numbers and process states",
        "Recognize TERM, KILL, and ordinary running/sleeping states first; consult the reference for less common states.",
      ),
      optional(
        "Advanced process trees and tracing",
        "Tracing system calls and scheduling behavior is useful specialist work after the basic lifecycle is clear.",
      ),
    ],
    terms: [
      term(
        "Process",
        "A running instance of a program, with state and resources managed by the kernel.",
      ),
      term(
        "PID / PPID",
        "The process identifier and its parent process identifier.",
      ),
      term(
        "Signal",
        "A notification/control event delivered to a process; the name kill refers to sending signals.",
      ),
      term(
        "Background",
        "Running without occupying this shell’s foreground command slot.",
      ),
      term(
        "Variable assignment",
        "atlas_pid=$! saves the latest background PID; there are no spaces around =.",
      ),
    ],
    walkthrough: [
      step(
        "Start and label two tasks",
        "In one Ubuntu tab run sleep 180 &, immediately atlas_first=$!, then sleep 180 & and immediately atlas_second=$!.",
        "The shell reports launch identifiers and both variables contain different PIDs. The prompt remains usable.",
      ),
      step(
        "Inspect before acting",
        'Run ps -p "$atlas_first" -o pid,ppid,user,comm, then the same command for atlas_second.',
        "Each row belongs to you and names sleep. If either is absent or does not match, stop and start a fresh exercise rather than reusing an old PID.",
      ),
      step(
        "Terminate the selected task",
        'Run kill -TERM "$atlas_first", then inspect both PIDs again. A brief transition may require one more inspection.',
        "The first sleep disappears after termination/reaping; the second remains. A job-completion message from Bash is normal.",
      ),
      step(
        "Clean up your remaining task",
        "Inspect atlas_second once more and send TERM only if it is still your expected sleep. Optionally open top and exit with q.",
        "Both exercise sleeps have ended and you can explain why TERM was adequate. No unrelated process was signaled.",
      ),
    ],
    commandDetails: [
      detail(
        "ps",
        'ps -p "$atlas_pid" selects one PID. -o pid,ppid,user,stat,comm chooses columns: IDs, owner, process state, and command name.',
        "A header and one row while the process exists; no matching row after it exits.",
        "A header alone is not a running process. A stale numeric PID may later identify a different process.",
      ),
      detail(
        "ps aux",
        "On Linux this BSD-style option group lists many users’ processes, including command arguments. The pipe to head -n 8 bounds the displayed sample.",
        "A broad snapshot with USER, PID, CPU, memory, and command columns.",
        "Full arguments can contain private data. Do not publish the entire snapshot without review.",
      ),
      detail(
        "top",
        "top refreshes process and system activity until you exit; q returns to the shell.",
        "Changing CPU/memory/process values rather than one fixed snapshot.",
        "A momentary high number is not a sustained resource problem. Do not press process-kill shortcuts for this inspection.",
      ),
      detail(
        "kill -TERM",
        'kill -TERM "$atlas_pid" sends signal TERM (15) to the single quoted PID. TERM lets programs handle cleanup; KILL (9) cannot be caught.',
        "Usually no normal output; the verified lab process stops and its later ps row disappears.",
        "Do not replace it with killall, a broad name pattern, or a PID saved from a previous session.",
      ),
      detail(
        "sleep / & / $!",
        "sleep 120 waits roughly 120 seconds. & starts it as background work. atlas_pid=$! stores this shell’s most recent background process PID for subsequent inspection.",
        "A usable prompt and a PID that ps identifies as your sleep process.",
        "Another background launch replaces $!. Save each PID immediately in a distinct variable.",
      ),
      detail(
        "head -n 8",
        "head reads the first eight lines of the ps output supplied by the pipe.",
        "A manageable snapshot sample, often a header plus seven process rows.",
        "Sampling is not a guarantee your specific lab process is included; use ps -p for that.",
      ),
    ],
    readiness: [
      "I can show owner and command for a PID immediately before sending a signal.",
      "I can stop one lab process while proving another survived.",
      "I can explain why TERM and KILL have different cleanup implications.",
    ],
  },
  "linux-jobs": {
    startingPoint:
      "Use an interactive Bash tab, not a script runner. You know what a PID and sleep are. Keyboard controls below are key presses, not words to paste into the terminal.",
    whyItMatters:
      "A terminal that appears stuck may simply have foreground work running or a suspended job. Knowing the states helps you regain control without closing sessions or stopping unrelated services.",
    required: [
      "Distinguish a shell’s job number from an operating-system PID.",
      "Move a harmless job between foreground, stopped, and background states.",
      "Read the actual jobs list before using fg or bg.",
      "Explain Ctrl+Z as suspend and Ctrl+C as interrupt, then verify final cleanup.",
    ],
    optional: [
      optional(
        "Durable session tools",
        "nohup, disown, and terminal multiplexers solve different persistence needs; background & alone is not durable service management.",
      ),
      optional(
        "Terminal signal internals",
        "Job process groups and detailed terminal control become useful after the visible state changes are familiar.",
      ),
    ],
    terms: [
      term(
        "Job",
        "Work tracked by one interactive shell; a pipeline can contain several processes in one job.",
      ),
      term(
        "Job specification",
        "A shell-local reference such as %1; it differs from PID 1.",
      ),
      term(
        "Foreground",
        "The job currently using terminal input and receiving terminal-generated control signals.",
      ),
      term(
        "Stopped",
        "Suspended rather than finished; the process still exists.",
      ),
      term(
        "Background running",
        "Making progress while the shell can accept another command.",
      ),
    ],
    walkthrough: [
      step(
        "Observe foreground work",
        "Run sleep 180 with no &. Wait a moment and observe that a normal shell prompt has not returned.",
        "sleep occupies the foreground while doing no visible output; this is expected, not a frozen terminal.",
      ),
      step(
        "Suspend and identify",
        "Hold Ctrl and press Z, then run jobs -l.",
        "The prompt returns and jobs reports Stopped, a bracketed job number, and a PID.",
      ),
      step(
        "Resume without taking the keyboard",
        "Use bg %N, replacing N with that observed job number. Run jobs -l and pwd.",
        "The job is Running and pwd works while it continues in the background.",
      ),
      step(
        "Bring forward and stop",
        "Run fg %N with the current job number, then press Ctrl+C. Run jobs -l again after Bash reports completion.",
        "The selected job was brought forward and interrupted; it no longer appears as running/stopped. If it finished naturally, start a fresh lab instead of guessing another job number.",
      ),
    ],
    commandDetails: [
      detail(
        "&",
        "sleep 180 & asks Bash to launch sleep in the background rather than wait in the foreground.",
        "Bash reports a job number/PID and gives a prompt immediately.",
        "Closing the session may affect the job; & is not a promise of persistence or supervision.",
      ),
      detail(
        "jobs / jobs -l",
        "jobs lists work tracked by this shell. -l adds process IDs alongside shell-local job numbers.",
        "Entries labeled Running or Stopped, or no entries when none remain.",
        "A new terminal tab does not inherit another tab’s jobs; an empty list does not mean no processes exist on the machine.",
      ),
      detail(
        "fg",
        "fg %1 brings job 1 to the foreground; use the actual number shown by jobs instead of copying 1 blindly.",
        "The command is displayed and the prompt waits until the job stops or finishes.",
        "The % prefix refers to a job number; this is not a PID argument to kill.",
      ),
      detail(
        "bg",
        "bg %1 resumes stopped job 1 in the background.",
        "The selected job becomes Running and the prompt remains usable.",
        "If no such job exists, inspect jobs in the same shell; do not select an unrelated job.",
      ),
      detail(
        "Ctrl+Z / Ctrl+C",
        "Ctrl+Z normally sends the foreground job a suspend signal. Ctrl+C normally sends an interrupt signal; simple sleep exits on it.",
        "Stopped state after Ctrl+Z; an interrupted sleep disappears after Ctrl+C and shell cleanup.",
        "These affect the foreground job. Pressing Ctrl+C at an idle prompt does not automatically stop a background job.",
      ),
      detail(
        "sleep / pwd",
        "sleep supplies a harmless timed foreground/background task; pwd is a short command demonstrating that the shell is usable while sleep runs in the background.",
        "No output from sleep; one current-directory path from pwd.",
        "A short sleep may finish naturally during reading. If it ends, do not reuse its old job reference.",
      ),
    ],
    readiness: [
      "I can explain the difference between [1], %1, and a PID.",
      "I can resume a stopped job without restarting it.",
      "I can finish the exercise with no running or stopped lab jobs left.",
    ],
  },
  "linux-services": {
    startingPoint:
      "Work inside Ubuntu. First inspect PID 1; service-manager examples require systemd. This lesson inspects existing services only; privileged package changes belong to the later isolated Nginx lab.",
    whyItMatters:
      "A package existing on disk, a service running now, and a service configured for boot are separate operational facts. Confusing them leads to misleading incident reports.",
    required: [
      "Explain package, daemon, unit, active runtime state, and startup configuration.",
      "Check systemd before interpreting systemctl commands, especially in WSL.",
      "Inspect one actual service and its own bounded journal; record absent/inactive evidence honestly.",
      "Distinguish apt update metadata refresh from install/remove and distinguish start/stop/restart from enable.",
    ],
    optional: [
      optional(
        "Creating unit files",
        "Custom unit dependencies, restart policies, and timers are useful after you can inspect an existing service.",
      ),
      optional(
        "Changing WSL boot settings",
        "Use the official environment setup instructions only if required; this inspection lesson does not require improvising host-wide changes.",
      ),
    ],
    terms: [
      term(
        "Package",
        "An installable software bundle managed by apt/dpkg, including files and metadata.",
      ),
      term(
        "Daemon",
        "A program that performs background work, often as part of a managed service.",
      ),
      term(
        "Unit",
        "A systemd-managed object; a .service unit describes how a service runs.",
      ),
      term(
        "Active",
        "A current runtime state; for long-running services, active (running) is the usual healthy baseline.",
      ),
      term(
        "Enabled",
        "Configured to be started through relevant startup links; it does not by itself say whether it is active now.",
      ),
      term(
        "Journal",
        "The systemd log store containing recorded events from services and the system.",
      ),
    ],
    walkthrough: [
      step(
        "Verify the manager",
        "Run ps -p 1 -o comm=. If the result is not systemd, record that limitation and follow the course’s official WSL setup reference before continuing these checks.",
        "systemd is printed on a compatible Ubuntu environment. Another result is a prerequisite finding, not a failed service repair.",
      ),
      step(
        "Choose one real unit",
        "Run systemctl status cron --no-pager. If missing, list existing services with systemctl list-units --type=service --no-pager and select a known harmless unit for inspection.",
        "A named unit and an actual active/inactive/failed state, or an honest absent-unit message.",
      ),
      step(
        "Separate startup and logs",
        "Run systemctl is-enabled cron and journalctl -u cron -n 20 --no-pager, substituting your selected unit consistently if different.",
        "Enabled/disabled/static is separate from active state; at most 20 relevant log entries appear, or the journal reports insufficient/no entries.",
      ),
      step(
        "Read package information",
        "Run apt show nginx. Write three separate sentences about package metadata, startup configuration, and runtime state.",
        "Package description/version information may appear. This command neither installs Nginx nor proves its service is running.",
      ),
    ],
    commandDetails: [
      detail(
        "systemctl status",
        "systemctl status cron --no-pager inspects the cron unit. --no-pager prints directly instead of opening an interactive viewer.",
        "Unit identification, loaded state, active state, and possibly recent log lines.",
        "Nonzero status can mean inactive/failed/unknown; the word Loaded alone does not mean Running.",
      ),
      detail(
        "journalctl",
        "journalctl -u cron restricts records to that unit; -n 20 selects the newest 20 entries; --no-pager returns directly to the prompt.",
        "Timestamped events for the selected unit, if available and readable.",
        "No entries or denied access does not prove health. Some Ubuntu journal access requires a permitted group or scoped sudo inspection.",
      ),
      detail(
        "systemctl start / stop / restart",
        "start activates a named unit now; stop deactivates it; restart performs a stop/start cycle. sudo systemctl start nginx is reserved for your accepted disposable lab.",
        "Runtime state changes are verified afterward with status and the original application request.",
        "restart can interrupt users; it is not a generic inspection. enable changes startup setup and is a separate operation.",
      ),
      detail(
        "apt update / install / remove",
        "apt show nginx reads metadata. sudo apt update refreshes the package list, sudo apt install nginx installs it and dependencies, and sudo apt remove nginx removes the package, possibly leaving configuration.",
        "show displays metadata; mutation commands display a plan and may download/change packages.",
        "Do not execute commented later-lab operations here. update does not upgrade all installed software.",
      ),
      detail(
        "ps -p 1 -o comm=",
        "Select PID 1 and print only its command name; the trailing = suppresses the header for this output field.",
        "systemd on an environment configured for these service labs.",
        "Running inside a container or an older WSL setup can show another PID 1. Repeated systemctl retries do not fix that prerequisite.",
      ),
      detail(
        "systemctl is-enabled / list-units",
        "is-enabled cron reads startup configuration. list-units --type=service --no-pager lists loaded service units you may inspect.",
        "A startup-state word, or a table of existing unit names and states.",
        "static means a unit is not directly enabled using ordinary enable links; it can still be activated by dependencies.",
      ),
    ],
    readiness: [
      "I can describe how a service can be disabled yet active.",
      "I can associate status and logs with the same unit.",
      "I know whether this Ubuntu environment actually supports the systemd lab.",
    ],
  },
  "linux-resources": {
    startingPoint:
      "You can identify your Ubuntu environment and read mode listings. This is a measurement exercise; use a tiny text fixture and never intentionally fill disk or memory.",
    whyItMatters:
      "Capacity and consumption measurements inform incidents and resizing decisions. The wrong measurement can lead to deleting useful data or purchasing resources without evidence.",
    required: [
      "Use df for the containing filesystem, du for a directory tree, and free for Linux memory.",
      "Interpret both the measured path and the units, rather than comparing unlabeled numbers.",
      "Use available memory as a better starting signal than the completely unused free column alone.",
      "Separate observation from a full-disk, permission, or memory-leak hypothesis and propose a discriminating next check.",
    ],
    optional: [
      optional(
        "Inode exhaustion",
        "Recognize df -i as a diagnostic when byte capacity looks available; creating huge numbers of files is unnecessary.",
      ),
      optional(
        "Allocator, cache, and filesystem internals",
        "Useful for performance specialization; the required skill is choosing and interpreting basic measurements.",
      ),
    ],
    terms: [
      term(
        "Filesystem / mount",
        "The storage system containing a path, attached at a directory in Linux’s tree.",
      ),
      term(
        "Capacity",
        "Total and remaining room on a filesystem, shared by all its directories.",
      ),
      term(
        "Directory usage",
        "Disk space accounted to files beneath a particular directory.",
      ),
      term(
        "Available memory",
        "An estimate of memory available for new work without swapping, including reclaimable memory.",
      ),
      term(
        "Inode",
        "Filesystem metadata identifying an object; inode availability can constrain new files separately from byte capacity.",
      ),
    ],
    walkthrough: [
      step(
        "Make a small known target",
        'Run mkdir -p ~/atlas-labs/resources/ticket and echo "Small fixture" > ~/atlas-labs/resources/ticket/note.txt.',
        "A tiny harmless note exists; no resource-pressure workload is needed.",
      ),
      step(
        "Ask two disk questions",
        "Run df -h ~/atlas-labs/resources/ticket and du -sh ~/atlas-labs/resources/ticket. Label what each row measures.",
        "df reports a containing filesystem with Size/Used/Avail columns; du prints one summary for the directory. The values need not be similar.",
      ),
      step(
        "Read a memory snapshot",
        "Run free -h. Locate the Mem row and both free and available values.",
        "The numbers reflect Ubuntu’s current view. Substantial available memory can coexist with low completely free memory because of caching.",
      ),
      step(
        "Write a bounded diagnosis",
        "Run ls -ld ~/atlas-labs/resources/ticket. Explain what you would inspect after No space left on device versus Permission denied.",
        "The directory mode/owner and df address different hypotheses. One memory snapshot does not establish a leak, and WSL’s view is not a complete Windows memory report.",
      ),
    ],
    commandDetails: [
      detail(
        "df -h",
        "df reports the filesystem containing the supplied path; -h uses readable power-of-1024 units. ~/atlas-labs targets the Linux lab filesystem.",
        "A row with filesystem, size, used, available, use percentage, and mount location.",
        "A small lab directory can still live on a nearly full filesystem. /mnt/c and Linux home may refer to different storage.",
      ),
      detail(
        "du -sh",
        "du measures directory-tree usage; -s requests a summary and -h readable units.",
        "One usage amount and the specified directory name.",
        "It does not report free capacity. Allocated storage can exceed a tiny file’s text length because storage is allocated in blocks.",
      ),
      detail(
        "free -h",
        "free prints memory/swap totals; -h formats readable units. Read the available estimate in context with workload and repeated observations.",
        "Mem and Swap rows; exact amounts vary by machine and time.",
        "Low free alone does not prove a leak; caches are useful and often reclaimable.",
      ),
      detail(
        "df -i",
        "-i switches df to inode totals/usage rather than byte capacity for the containing filesystem.",
        "Columns such as Inodes, IUsed, IFree, and IUse% where supported.",
        "Filesystem/platform reporting can differ. This inspection is not a reason to generate many files.",
      ),
      detail(
        "ls -ld",
        "ls -l gives mode/ownership details; -d means inspect the directory entry itself rather than list the files inside it.",
        "The directory’s permission bits and owner/group.",
        "Checking the file alone can miss a parent-directory traversal or write restriction.",
      ),
    ],
    readiness: [
      "I can choose df, du, or free for a concrete question and label its scope.",
      "I can explain why small directory usage does not prove spare disk capacity.",
      "I can state what additional evidence would be needed before declaring a memory leak.",
    ],
  },
  "network-addresses": {
    startingPoint:
      "Use Ubuntu’s terminal and inspect its own network view. In WSL or a VM, Linux may have virtual interfaces and addresses different from the Windows/Mac host.",
    whyItMatters:
      "Cloud networks route packets between interfaces and services. Reading addresses and routes helps you locate the next useful test without changing network configuration blindly.",
    required: [
      "Identify loopback, one non-loopback interface when present, and the address/prefix attached to each.",
      "Distinguish IPv4 and IPv6 and explain the network portion represented by CIDR, including the /24 example.",
      "Read a default route’s next hop and interface; distinguish gateway, DNS resolver, NAT, and firewall roles.",
      "Interpret bounded ICMP probes as reachability evidence for that probe, without claiming HTTP health.",
    ],
    optional: [
      optional(
        "Every subnet size and IPv6 notation rule",
        "Work through prefixes and look up unfamiliar lengths; memorizing all masks and compression forms is unnecessary at this stage.",
      ),
      optional(
        "Dynamic routing protocols and packet captures",
        "These deepen network specialization after the basic interface → route → next-hop model is clear.",
      ),
    ],
    terms: [
      term(
        "Interface",
        "A physical or virtual network attachment, named for example lo or eth0.",
      ),
      term(
        "Loopback",
        "An address pointing back to the environment issuing the request: 127.0.0.1 for IPv4 and ::1 for IPv6.",
      ),
      term(
        "CIDR prefix",
        "The /number stating how many leading address bits define the network; /24 fixes 24 of IPv4’s 32 bits.",
      ),
      term(
        "Gateway",
        "A next-hop router used to reach destinations according to a routing entry.",
      ),
      term(
        "NAT / firewall",
        "NAT translates addresses at a boundary; a firewall permits or filters traffic. They serve different purposes.",
      ),
      term(
        "ICMP",
        "A network control-message protocol; ping commonly uses its echo request/reply messages.",
      ),
    ],
    walkthrough: [
      step(
        "Read interface addresses",
        "Run ip addr. Find lo and the inet/inet6 lines. Record one non-loopback interface and its prefix if present.",
        "Loopback includes 127.0.0.1/8 and often ::1/128. Other names/addresses depend on this environment; do not copy example IPs as your own.",
      ),
      step(
        "Read where traffic goes",
        "Run ip route, then ip -6 route. Identify default, via, and dev when shown.",
        "via labels a gateway and dev labels the interface. A missing default route is a real finding; IPv4 and IPv6 have separate tables.",
      ),
      step(
        "Probe only the local stack",
        "Run ping -c 3 127.0.0.1 and read the final packet summary.",
        "Three requests are bounded. Replies support local ICMP reachability; restrictions or tool absence should be recorded rather than repaired with guessed settings.",
      ),
      step(
        "Sketch the path",
        "Draw one path to loopback and another toward a remote service using your observed default route. Optionally probe your own observed gateway with ping -c 3 if permitted.",
        "Loopback stays local. The remote sketch distinguishes observed local facts from possible upstream NAT/firewalls. A gateway that ignores ICMP can still route application traffic.",
      ),
    ],
    commandDetails: [
      detail(
        "ip addr",
        "ip selects Linux network objects; addr shows interfaces and their assigned addresses. inet denotes IPv4 and inet6 denotes IPv6; the suffix is a prefix length.",
        "Interface blocks including lo and usually at least one other interface.",
        "An interface existing or being UP does not prove remote application health.",
      ),
      detail(
        "ip route",
        "Show the IPv4 routing table. A default entry is a fallback; more-specific matching prefixes take priority.",
        "Entries such as default via an-address dev an-interface, plus directly connected prefixes.",
        "A gateway address is not automatically the DNS server. No default route is not permission to add a guessed one.",
      ),
      detail(
        "ip -6 route",
        "-6 selects IPv6 before route displays that family’s table.",
        "IPv6 routes, or an empty/limited table when IPv6 is unavailable.",
        "The IPv4 table does not fully describe IPv6 connectivity; clients may attempt either address family.",
      ),
      detail(
        "ping -c",
        "ping -c 3 127.0.0.1 sends three ICMP echo requests to loopback and then summarizes received/lost packets and timing.",
        "A bounded set of replies and summary if ICMP is allowed.",
        "A ping response proves neither a TCP listener nor HTTP correctness; a timeout alone does not prove a host is off.",
      ),
    ],
    readiness: [
      "I can identify my own observed interface and next hop without inventing topology.",
      "I can explain why 192.168.50.10/24 and 192.168.60.10 are outside the same /24.",
      "I can state what ping did and what it did not test.",
    ],
  },
  "network-dns": {
    startingPoint:
      "You understand that an IP address identifies an endpoint environment and a route selects a path. Now separate finding an address from reaching a service at that address.",
    whyItMatters:
      "A cloud hostname can fail because of spelling, local lookup policy, DNS, connectivity, or the application. Each requires different evidence and a different repair.",
    required: [
      "Explain hostname, resolver, A, AAAA, and cached answers.",
      "Use getent hosts for the system host-lookup sources and distinguish that from a direct DNS query.",
      "Read /etc/hosts and /etc/resolv.conf without changing generated settings.",
      "Compare localhost, a normal external name, and an intentionally invalid name; capture each status before another command replaces it.",
    ],
    optional: [
      optional(
        "dig and nslookup",
        "These provide useful DNS detail when already installed. Required progress depends on interpreting system lookup, not installing every diagnostic tool.",
      ),
      optional(
        "DNS delegation, TTL tuning, and DNSSEC",
        "These matter when operating domains; first master which layer failed and what an address answer proves.",
      ),
    ],
    terms: [
      term(
        "Hostname",
        "A human-readable name used to identify a host or service, such as example.com.",
      ),
      term(
        "Resolver",
        "A component that obtains and may cache name-resolution answers.",
      ),
      term(
        "A / AAAA",
        "DNS record types carrying IPv4 and IPv6 addresses respectively.",
      ),
      term(
        "Hosts file",
        "Local name-to-address entries in /etc/hosts that can participate in system lookup.",
      ),
      term(
        "Stub resolver",
        "A local resolver endpoint that forwards queries or coordinates the machine’s resolution policy.",
      ),
      term(
        ".invalid",
        "A reserved name suffix intended not to resolve through normal public DNS; suitable for an intentional negative test.",
      ),
    ],
    walkthrough: [
      step(
        "Resolve a local name",
        'Run getent hosts localhost and immediately echo "$?", then cat /etc/hosts.',
        "Usually one or more loopback address mappings and status 0. Local configuration can resolve localhost even if external DNS is unavailable.",
      ),
      step(
        "Inspect the resolver path",
        "Run cat /etc/resolv.conf. Identify nameserver lines and note whether they point to a local stub or another address.",
        "Resolver configuration appears; generated-file comments are a clue to leave this file under its manager’s control.",
      ),
      step(
        "Compare positive and negative lookups",
        "Run getent hosts example.com and capture its status immediately. Repeat for atlas-does-not-exist.invalid.",
        "The external positive lookup depends on actual network access; the negative lookup normally has no answer and a nonzero status. Record the real result if the environment intercepts names.",
      ),
      step(
        "Choose the next layer",
        "Explain the next test if a name resolves but the web request is refused. If dig exists, compare dig example.com A with getent and identify that they use different lookup paths.",
        "You investigate address/port/listener after successful resolution, rather than rewriting resolver configuration. dig’s exit status alone is not proof a useful answer exists.",
      ),
    ],
    commandDetails: [
      detail(
        "getent hosts",
        "getent reads a named system database. hosts requests host resolution through configured sources such as files and DNS; the final argument is the name.",
        "Address/name rows on success; a missing key normally gives no row and nonzero status.",
        "An empty answer does not identify whether spelling, unavailable resolver, policy, or another condition caused it.",
      ),
      detail(
        "cat /etc/resolv.conf",
        "cat reads the resolver configuration file; nameserver entries identify resolver endpoints and comments may identify its manager.",
        "Resolver/search/options lines as configured on this environment.",
        "Do not overwrite WSL/systemd-generated configuration as a generic fix; it can be regenerated and disrupt valid settings.",
      ),
      detail(
        "dig",
        "dig example.com A queries DNS for IPv4 records and prints a header/status plus answer/authority sections. type dig checks availability first.",
        "An ANSWER section for a successful existing record when the resolver is reachable; actual addresses and TTLs vary.",
        "dig commonly exits zero for a completed query even with NXDOMAIN. Read the DNS status and answer, not only $?.",
      ),
      detail(
        "nslookup",
        "nslookup example.com asks a DNS server for the name and reports resolver and answer information.",
        "DNS server details and address answers when the query succeeds.",
        "It is a direct DNS tool, so local /etc/hosts results may differ legitimately from getent.",
      ),
      detail(
        "ping hostname",
        "ping -c 2 localhost first resolves the name, then attempts two ICMP echo requests to the selected address.",
        "A displayed resolved address followed by echo results.",
        "Successful name resolution followed by lost ICMP replies is different from failing to resolve the name.",
      ),
      detail(
        'cat /etc/hosts / echo "$?"',
        'Read local static mappings with cat /etc/hosts. Run echo "$?" immediately after each getent to preserve that command’s result for your record.',
        "A local mapping list and separate status for each tested lookup.",
        "Reading another file before echo replaces the lookup status with the read command’s status.",
      ),
    ],
    readiness: [
      "I can explain why getent and dig can return different answers.",
      "I can distinguish name resolution from connection acceptance.",
      "I can document a network-unavailable result honestly without inventing a successful external lookup.",
    ],
  },
  "network-http": {
    startingPoint:
      "You can distinguish a name from an IP address. Check type python3, type curl, and type ss in Ubuntu; if any required tool is absent, use the official setup reference before starting. Both terminal tabs must be in the same Ubuntu environment.",
    whyItMatters:
      "Cloud services need a listener and correct responses. This local server makes the layers visible without spending money or publishing a service.",
    required: [
      "Read address:port and distinguish a loopback bind from all-interface exposure.",
      "Explain TCP connection, HTTP request/response, GET versus HEAD, status code, headers, and body.",
      "Inspect a listener and compare 200, HTTP 404, and connection refusal.",
      "Use bounded curl requests, interpret curl’s exit status separately from HTTP status, and stop your learning server afterward.",
    ],
    optional: [
      optional(
        "HTTP versions and TLS internals",
        "Recognize HTTPS as authenticated encrypted HTTP; protocol negotiation and cipher details can wait until HTTPS deployment.",
      ),
      optional(
        "UDP applications and production web servers",
        "Understand the transport distinction; Python’s learning server is enough to expose the required layers here.",
      ),
    ],
    terms: [
      term(
        "Port",
        "A number selecting a transport endpoint on a host; a convention such as HTTP 80 does not force a program to use it.",
      ),
      term(
        "Bind address",
        "The local address where a server accepts connections; 127.0.0.1 limits IPv4 access to local loopback.",
      ),
      term("Listener", "A socket waiting for incoming requests/connections."),
      term(
        "HTTP headers / body",
        "Response metadata such as Content-Type, followed by the requested content.",
      ),
      term(
        "GET / HEAD",
        "GET requests a representation; HEAD asks for corresponding headers without the response body.",
      ),
      term(
        "TLS",
        "The mechanism HTTPS uses for encryption and server authentication.",
      ),
    ],
    walkthrough: [
      step(
        "Prepare a harmless web root",
        'In terminal A run mkdir -p ~/atlas-labs/http/practical, cd there, and echo "Atlas practical response" > index.html. Inspect ss -ltn "sport = :8080" before launch.',
        "The file exists. No listening row at that port means it is available for this attempt; if occupied choose another unused port consistently.",
      ),
      step(
        "Launch only on loopback",
        'In A run python3 -m http.server 8080 --bind 127.0.0.1. Keep this tab visible. In Ubuntu terminal B run ss -ltn "sport = :8080".',
        "A stays occupied by the server; B shows a LISTEN row at 127.0.0.1:8080.",
      ),
      step(
        "Compare resource results",
        'In B run curl --noproxy "*" -i --max-time 3 http://127.0.0.1:8080/index.html, then request /not-there using the same options.',
        "The existing path returns 200 plus the expected text; the missing path returns 404. Both prove an HTTP server responded.",
      ),
      step(
        "Compare transport failure and recovery",
        "Press Ctrl+C in A. Repeat the exact index URL in B and inspect the listener. Restart A with the same command, repeat the URL, verify the body, then stop A again.",
        "With no competing listener the stopped-server request is refused; recovery returns the expected body. Final cleanup leaves no lab listener.",
      ),
    ],
    commandDetails: [
      detail(
        "ss -tuln",
        "ss inspects sockets; -t selects TCP, -u UDP, -l listening/bound endpoints, and -n keeps addresses/ports numeric.",
        "A socket table, possibly including unrelated local services.",
        "A socket table does not prove correct HTTP responses and should not be used as permission to stop other listeners.",
      ),
      detail(
        "ss -ltn",
        '-l selects listeners, -t TCP, -n numeric output. The quoted filter "sport = :8080" selects exactly local port 8080.',
        "A LISTEN row while the local TCP server runs and no such row after it stops.",
        "A loose text search for 80 can match 8080 or unrelated addresses; use the exact port filter.",
      ),
      detail(
        "curl -I",
        '-I sends HEAD for response headers; --max-time 3 limits the whole transfer to three seconds. --noproxy "*" disables proxy use for this local diagnostic request.',
        "An HTTP status line and headers without the page body.",
        "HEAD does not verify body content. The quoted * must remain a curl option value rather than a Bash filename expansion.",
      ),
      detail(
        "curl --fail",
        "--fail treats HTTP error responses (400 and above) as curl failures; the remaining options keep the local request direct and bounded.",
        "A missing resource normally causes curl exit status 22 with --fail; plain curl can exit zero after receiving a valid 404 response.",
        "Read both HTTP status and process status; zero transfer status does not by itself mean the requested resource exists.",
      ),
      detail(
        "python3 -m http.server",
        "-m runs Python’s http.server module. 8080 chooses the port; --bind 127.0.0.1 restricts IPv4 binding. By default it serves the current working directory.",
        "A startup message and per-request log lines; the foreground command remains running.",
        "Serve only harmless sandbox files. It is a learning server, and omitting --bind can expose it beyond loopback.",
      ),
      detail(
        "curl -i / Ctrl+C",
        "Lowercase -i includes headers along with the GET response body; uppercase -I instead requests HEAD. Ctrl+C in the server’s foreground tab stops that server.",
        "Status, headers, and expected file contents together for the GET request.",
        "Stopping curl in terminal B does not necessarily stop the server in terminal A. Cleanup belongs in the server’s own tab.",
      ),
    ],
    readiness: [
      "I can explain why 404 and connection refused need different repairs.",
      "I can read every flag in the local curl and Python commands.",
      "I can prove both listener presence and expected content, then remove my test listener.",
    ],
  },
  "troubleshoot-nginx": {
    startingPoint:
      "Complete the service-manager and local HTTP lessons first. Use only your isolated disposable Ubuntu instance with systemd as PID 1 and no users depending on Nginx. Record its original state before installation/startup changes.",
    whyItMatters:
      "This is a small incident rehearsal: record a healthy baseline, create a known outage, diagnose from separate observations, and prove the minimal repair with the original request.",
    required: [
      "Confirm the exact environment and service are yours to stop, and review any package installation plan.",
      "Capture service, listener, headers, and body before introducing the failure.",
      "Explain how a deliberately stopped service changes each observation and inspect relevant journal events.",
      "Start only the named service, repeat the original URL, verify content, and restore the recorded original state.",
    ],
    optional: [
      optional(
        "Editing Nginx configuration",
        "The required fault is a stopped unit. Configuration edits would add another cause; nginx -t is a diagnostic when startup itself fails.",
      ),
      optional(
        "Public hosting, firewall rules, and TLS",
        "A localhost recovery proves a local service exercise; remote access and production hardening require separate later work.",
      ),
    ],
    terms: [
      term(
        "Baseline",
        "Observed working state recorded before an experiment or outage.",
      ),
      term(
        "Incident",
        "An interruption or degradation that needs diagnosis, recovery, and a record.",
      ),
      term(
        "Impact",
        "What stopped working and for whom; this exercise affects only your disposable lab.",
      ),
      term(
        "Recovery verification",
        "Repeat the original failing request and check the intended behavior, not just the repair command’s status.",
      ),
      term(
        "Configuration test",
        "An inspection of Nginx configuration syntax and referenced files, separate from serving a request.",
      ),
    ],
    walkthrough: [
      step(
        "Accept scope and prerequisites",
        'Run ps -p 1 -o comm=. Inspect systemctl status nginx --no-pager and ss -ltn "sport = :80". If Nginx is absent, review the demonstrated apt plan in this isolated environment first; do not stop another port-80 owner.',
        "You know whether the service originally ran, which process/service should own the port, and whether systemd supports the exercise.",
      ),
      step(
        "Record the baseline",
        'With your lab Nginx healthy, run curl --noproxy "*" -I --max-time 3 http://127.0.0.1/ and an ordinary curl GET. Record time, status, and a recognizable harmless body fragment.',
        "A service state, exact listener, and expected response all support the same target. A header alone does not verify page content.",
      ),
      step(
        "Create and explain the outage",
        "Run sudo systemctl stop nginx. Repeat the exact HTTP request, inspect status and the port-80 listener, then read journalctl -u nginx -n 30 --no-pager.",
        "Nginx is inactive, its listener is gone, and the request is normally refused if nothing else owns the port. Journal evidence may show the stop transition.",
      ),
      step(
        "Repair and repeat",
        "Run sudo systemctl start nginx, then repeat status, socket, header, and body checks. If start fails, inspect the journal and sudo nginx -t rather than changing multiple settings.",
        "The original URL succeeds with expected content and the named service is active again. If any layer differs, record the limitation instead of claiming recovery.",
      ),
      step(
        "Close the ticket",
        "Write impact, cause, repair, verification, and limits. Restore the original runtime state recorded before setup; preserve the evidence in ~/atlas-labs/nginx.",
        "The note explains why starting this stopped service was sufficient and what localhost evidence does not establish.",
      ),
    ],
    commandDetails: [
      detail(
        "apt install nginx",
        "sudo apt update refreshes package metadata; sudo apt install nginx proposes/install Nginx and needed dependencies. sudo authorizes the administrative package operation.",
        "A package plan followed by installation output; Ubuntu may also start Nginx automatically.",
        "Review the plan and scope first. Skip installation when already present, and avoid public forwarding because package startup may bind beyond loopback.",
      ),
      detail(
        "systemctl status / stop / start",
        "status inspects the unit; sudo systemctl stop nginx intentionally deactivates it; sudo systemctl start nginx activates it. --no-pager prints status directly.",
        "Inactive after the accepted stop, active after recovery, with independent HTTP/socket confirmation.",
        "Do not practice on shared/production services. A successful start command alone does not prove application content.",
      ),
      detail(
        "journalctl -u nginx",
        "-u nginx selects this unit; -n 30 bounds to the newest 30 entries; --no-pager avoids the viewer.",
        "Relevant timestamped service transition/error entries if accessible.",
        "Insufficient journal access should be recorded. On your own lab, a permitted sudo journalctl inspection may be needed.",
      ),
      detail(
        "ss port filter",
        'ss -ltn "sport = :80" selects numeric TCP listeners with local port exactly 80.',
        "Nginx-associated listener endpoints at baseline/recovery and absence during its stop, unless another service owns the port.",
        "Do not kill another listener or equate a text match for 8080 with port 80.",
      ),
      detail(
        "curl localhost",
        'curl --noproxy "*" -I --max-time 3 http://127.0.0.1/ requests HEAD directly to IPv4 loopback port 80; removing -I makes a GET body test.',
        "Expected headers/body while healthy and a distinct failure while the accepted service is stopped.",
        "Use the same target in failure and recovery. Local success does not prove another machine can reach the server.",
      ),
      detail(
        "nginx -t",
        "sudo nginx -t tests configuration syntax and access to referenced configuration files without starting/restarting the service.",
        "A test-success report or an error identifying a file/line/resource to investigate.",
        "Passing syntax does not prove the service is running or reachable. Preserve an error before considering the smallest appropriate edit.",
      ),
      detail(
        "ps -p 1 -o comm=",
        "Inspect the command name of PID 1 without a header before any systemctl assumption.",
        "systemd in the supported environment.",
        "A different manager is a setup prerequisite, not evidence that Nginx is misconfigured.",
      ),
    ],
    readiness: [
      "I can support a stopped-service hypothesis with at least two observations.",
      "I can reproduce the exact original test after repair and check its body.",
      "I can state the original-state restoration and the limits of localhost proof.",
    ],
  },
  "troubleshoot-layers": {
    startingPoint:
      "You have independently completed the loopback Python HTTP lab and know 404 versus refusal. Use two Ubuntu terminal tabs and separate harmless intended/empty web-root directories.",
    whyItMatters:
      "Good diagnosis chooses the layer supported by the symptom. A listening, responding server can still serve the wrong directory; changing DNS or firewalls cannot repair that resource mapping.",
    required: [
      "Turn the exact symptom into a hypothesis and choose a test that distinguishes plausible causes.",
      "Explain what successful lower layers are already demonstrated by an HTTP 404.",
      "Compare actual listener, requested URL, file location, and server web root.",
      "Change one supported setting, repeat the unchanged URL, and produce a reproducible handoff/runbook.",
    ],
    optional: [
      optional(
        "Inspecting every layer in every incident",
        "The ladder is a map; numeric loopback does not require external DNS/routing checks before inspecting a 404.",
      ),
      optional(
        "Packet captures and remote firewall diagnosis",
        "Useful when evidence reaches those layers; they are unnecessary for this controlled wrong-root case.",
      ),
    ],
    terms: [
      term(
        "Web root",
        "The directory whose contents a server maps to URL paths.",
      ),
      term(
        "Layer",
        "A responsibility such as naming, transport connection, HTTP, or resource selection.",
      ),
      term(
        "Discriminating test",
        "A check whose possible results help distinguish competing hypotheses.",
      ),
      term(
        "Runbook",
        "Instructions another person can follow, including expected results and branches for unexpected results.",
      ),
      term(
        "Escalation",
        "A handoff of concrete evidence and remaining uncertainty when the next action needs another owner or capability.",
      ),
    ],
    walkthrough: [
      step(
        "Create the mismatch deliberately",
        "Create ~/atlas-labs/layers/intended/index.html containing Correct web root and an empty sibling directory. In terminal A cd to empty and run python3 -m http.server 8080 --bind 127.0.0.1 on an unused port.",
        "The server runs, but its default web root is empty, not intended.",
      ),
      step(
        "Capture the real symptom",
        'In B request http://127.0.0.1:8080/index.html using curl --noproxy "*" -i --max-time 3, then inspect ss -ltn "sport = :8080".',
        "A 404 HTTP response and a listening socket prove the server accepted/responded. The named file’s URL mapping remains wrong.",
      ),
      step(
        "Test the hypothesis",
        "Run ls -l ~/atlas-labs/layers/intended/index.html. Compare that path with the directory from which terminal A launched Python.",
        "The file exists elsewhere. Existence on disk does not prove the running server is configured to serve it.",
      ),
      step(
        "Change the root only",
        "Stop A with Ctrl+C and restart python3 -m http.server 8080 --bind 127.0.0.1 --directory ~/atlas-labs/layers/intended. Repeat the exact URL in B.",
        "The same port and path return 200 with Correct web root. The web-root selection was the meaningful change.",
      ),
      step(
        "Write and clean up",
        "Record failing request, observations, hypothesis, change, repeated test, and what to escalate if a listener exists but the request times out. Stop A.",
        "Another beginner can reproduce the diagnosis; no lab server remains running and no untested remote-network claim is made.",
      ),
    ],
    commandDetails: [
      detail(
        "Service evidence",
        "systemctl status nginx --no-pager reads a managed service’s current state; journalctl -u nginx -n 20 --no-pager reads recent transitions. They apply to the Nginx branch, not to the foreground Python process.",
        "Named service status/logs when that is the relevant service manager.",
        "Do not pretend a manually started Python server appears as the nginx systemd unit.",
      ),
      detail(
        "Socket evidence",
        'ss -ltn "sport = :8080" selects this local TCP listening port numerically.',
        "A LISTEN row even while this wrong-root server returns 404.",
        "A listener proves socket binding, not resource correctness or a timely response.",
      ),
      detail(
        "Request evidence",
        'curl --noproxy "*" -i --max-time 3 URL makes a bounded direct GET with headers/body.',
        "404 for the wrong-root mapping, then 200 and expected body after the single repair.",
        "Do not switch URLs between failure and verification; otherwise you may only have tested a different target.",
      ),
      detail(
        "Network evidence",
        "ip addr reads interfaces, ip route reads IPv4 routes, and getent hosts localhost resolves through system lookup sources. Choose these when the error concerns their layer.",
        "Relevant local network facts if required by the observed symptom.",
        "A numeric loopback 404 already bypassed external DNS and received HTTP, so those changes are unsupported here.",
      ),
      detail(
        "python3 --directory / ls -l",
        "Python’s --directory PATH explicitly selects the served root regardless of the launching shell’s current directory. ls -l PATH inspects the intended file’s actual location.",
        "The existing index.html becomes reachable at the unchanged URL once its directory is served.",
        "A relative --directory is resolved from launch context; use the explicit sandbox path for clarity. Keep --bind 127.0.0.1.",
      ),
      detail(
        "Ctrl+C",
        "Interrupt the foreground server in terminal A before restarting it with the corrected root; interrupt again for final cleanup.",
        "The serving prompt returns and its listener disappears before the next launch.",
        "Starting another server without stopping the first commonly causes Address already in use, adding a second problem.",
      ),
    ],
    readiness: [
      "I can explain which layers a 404 already proves.",
      "I can distinguish a file’s existence from its URL mapping.",
      "I can give another beginner a minimal diagnosis and recovery runbook with expected observations.",
    ],
  },
  "git-basics": {
    startingPoint:
      "Use a fresh Ubuntu directory outside any existing project and check git --version. You can create/read text files and understand paths. This lesson is local; no GitHub account, remote, or payment is needed.",
    whyItMatters:
      "Cloud engineers version scripts, infrastructure, configuration, and runbooks. A reviewed staged snapshot makes an intentional record of what changed and why.",
    required: [
      "Distinguish working tree, staging area, commit history, and GitHub hosting.",
      "Set author identity only for the disposable repository; understand this metadata does not authenticate you anywhere.",
      "Inspect unstaged and staged changes and stage the latest intended version before committing.",
      "Create two coherent commits, read their history, and verify a clean working tree without equating clean with correct/published.",
    ],
    optional: [
      optional(
        "Rewriting history and recovery commands",
        "Amend, reset, reflog, and rebase can wait until the normal edit → review → stage → commit sequence is reliable.",
      ),
      optional(
        "Real portfolio author identity",
        "Before publishing, choose an intended name and email privacy setting. The example.invalid address here is only disposable lab metadata.",
      ),
    ],
    terms: [
      term(
        "Repository",
        "A project with Git history and metadata, usually stored in a hidden .git directory.",
      ),
      term("Working tree", "The project files you currently edit."),
      term(
        "Staging area / index",
        "The exact file contents proposed for the next commit.",
      ),
      term(
        "Commit",
        "A recorded snapshot with author/message information and links to prior history.",
      ),
      term(
        "Untracked",
        "A file Git sees in the working directory but has not yet added to tracked history.",
      ),
      term(
        "Diff",
        "A comparison of file contents, often with + additions and - removals.",
      ),
    ],
    walkthrough: [
      step(
        "Initialize the lab only",
        'In a fresh ~/atlas-labs/git-basics/practical directory run git init -b main, git config user.name "Atlas Learner", and git config user.email "atlas@example.invalid".',
        "Git creates .git and the main branch. Local author configuration applies only to this repository because --global was not used.",
      ),
      step(
        "Stage and inspect the first version",
        "Write a title to README.md with echo, run git status, git add README.md, and git diff --staged.",
        "The new file moves from untracked to staged. The staged diff contains exactly the title that will be recorded.",
      ),
      step(
        "Make the first record",
        'Run git commit -m "Introduce the Nginx incident lab", then git log --oneline -2.',
        "A commit summary/hash appears; history contains the introduction. Nothing has been uploaded.",
      ),
      step(
        "Edit with a basic text editor",
        "Open README.md in your Ubuntu text editor. If nano is available, nano README.md opens it; type your own observations/diagnosis/repair/verification sections, press Ctrl+O then Enter to save, and Ctrl+X to exit.",
        "cat README.md shows your new explanation. If you do not have an editor, arrange one in the declared Ubuntu setup before continuing rather than pasting editor instructions into Bash.",
      ),
      step(
        "Review the exact second snapshot",
        'Run git diff, git add README.md, git diff --staged, and git commit -m "Explain diagnosis and verify recovery". Finish with git log --oneline -2 and git status.',
        "Two meaningful commits are present and status is clean. If you edit after git add, stage again or the latest edit remains outside the commit.",
      ),
    ],
    commandDetails: [
      detail(
        "git init",
        "git init -b main creates repository metadata in the current directory and names its initial branch main.",
        "An initialized repository message and a hidden .git directory.",
        "Do not initialize inside Atlas source, a parent repository, or a folder containing unrelated work.",
      ),
      detail(
        "git status",
        "git status explains tracked, untracked, staged, and unstaged states. --short uses two columns: index status first, working-tree status second; ?? means untracked.",
        "A new README begins untracked, then staged, then clean after its intended commit.",
        "Clean only means no outstanding tracked changes; it does not mean the runbook was tested or published.",
      ),
      detail(
        "git add",
        "git add README.md copies that file’s current contents into staging. It does not continually follow later edits.",
        "The staged diff includes the intended current text.",
        "Editing after staging requires another add to include the newer version. Prefer explicit paths to accidentally staging everything.",
      ),
      detail(
        "git diff",
        "git diff compares working files to staging; git diff --staged compares staging to the current commit.",
        "The two views identify edits not staged versus the exact next snapshot.",
        "Untracked files are not shown by ordinary git diff; inspect git status too. A pager can be exited with q.",
      ),
      detail(
        "git commit",
        'git commit -m "Document local HTTP recovery" records staged content and uses -m for the message argument.',
        "A commit summary and new identifier in history.",
        "It records staging, not every file on disk. Local author config is required but is not a remote login.",
      ),
      detail(
        "git log",
        "git log --oneline -5 shows up to five recent commits with abbreviated IDs and messages.",
        "One row per existing commit, newest first.",
        "IDs vary by content/metadata. A commit being listed does not show that any remote received it.",
      ),
      detail(
        "git config / git --version",
        "git --version verifies the installed tool. git config user.name and user.email set repository-local commit author metadata when --global is omitted.",
        "A version string and configured identity used by subsequent local commits.",
        "Use the example identity only in this disposable repository. Never put an access token in author configuration.",
      ),
      detail(
        "nano README.md",
        "If installed, nano edits text in the terminal. Ctrl+O writes the file, Enter accepts its filename, and Ctrl+X exits. The ^ shown in nano shortcuts means Ctrl.",
        "Saved README contents visible with cat and as a Git diff.",
        "Editor keystrokes belong inside the editor; they are not shell commands. Save before reviewing the file from another tab.",
      ),
    ],
    readiness: [
      "I can draw working tree → staging → commit and explain what each contains.",
      "I can detect and fix an edit made after staging.",
      "I can make and review two local commits without claiming they are on GitHub.",
    ],
  },
  "git-branches": {
    startingPoint:
      "Continue in the clean main branch of your git-basics/practical repository. You understand staging and commits and can save README edits using your chosen editor.",
    whyItMatters:
      "Branches let a change be reviewed before integration. Ignore rules reduce generated clutter, while explicit staging still controls what becomes lasting history.",
    required: [
      "Explain a branch as a movable commit reference, not a separate folder.",
      "Create a feature branch, commit its focused improvement, and switch only when work is deliberately preserved.",
      "Merge into the branch that should receive the work and understand a fast-forward.",
      "Ignore untracked generated output while reviewing/staging only intended source files; .gitignore does not erase tracked secrets.",
    ],
    optional: [
      optional(
        "Stash, rebase, and branch deletion",
        "These support more complex workflows but are unnecessary for the clean feature-branch/fast-forward exercise.",
      ),
      optional(
        "Complex ignore-pattern syntax",
        "A directory rule is enough here. Look up negation and nested ignore precedence when a project needs them.",
      ),
    ],
    terms: [
      term(
        "Branch",
        "A named movable reference to a commit; commits advance the currently checked-out branch.",
      ),
      term(
        "HEAD",
        "Git’s reference to the current checkout, normally through the current branch.",
      ),
      term(
        "Fast-forward",
        "Moving a branch reference forward along existing history when it has not independently diverged.",
      ),
      term(
        "Merge target",
        "The currently checked-out branch that receives the integration.",
      ),
      term(
        "Ignore rule",
        "A pattern excluding matching untracked paths from ordinary add/status handling; it does not untrack existing history.",
      ),
    ],
    walkthrough: [
      step(
        "Verify the starting state",
        "Run git status, git switch main, and git branch in the completed practical repository. Continue only when tracked work is clean.",
        "main is the current branch, marked with *, and there are no unintended pending edits.",
      ),
      step(
        "Create one focused line of work",
        "Run git switch -c runbook-checks. Edit README.md with an original verification checklist and run git diff.",
        "The new branch is current and the diff shows only the proposed checklist improvement.",
      ),
      step(
        "Separate generated output",
        'Run mkdir -p lab-output, echo "Harmless generated output" > lab-output/example.txt, and echo "lab-output/" > .gitignore only if that ignore file is new. If it exists, edit it to preserve prior rules.',
        "The generated file remains on disk; status shows intended README/.gitignore changes, not an untracked lab-output/example.txt.",
      ),
      step(
        "Review and integrate",
        "Stage README.md and .gitignore explicitly, inspect git diff --staged, and commit. Switch to main and run git merge --ff-only runbook-checks.",
        "main receives the committed improvement through a fast-forward. If histories diverged, --ff-only refuses rather than inventing an integration decision.",
      ),
      step(
        "Verify the result",
        "Read the final README, run git log --oneline --graph --all -8 and git status.",
        "Both branch names point into the expected history and tracked state is clean; ignored local output can still exist.",
      ),
    ],
    commandDetails: [
      detail(
        "git branch",
        "List local branch names; * marks the currently checked-out branch.",
        "main and your new branch after creation.",
        "A local branch list does not prove a remote branch or pull request exists.",
      ),
      detail(
        "git switch -c",
        "git switch -c docs-recovery creates the named branch at the current commit and switches to it.",
        "A new-branch confirmation; later commits move this branch.",
        "The name must be unused. If repeating the lab, choose a fresh descriptive name rather than force-replacing an existing branch.",
      ),
      detail(
        "git switch",
        "git switch main selects the existing main branch and updates the working tree to that checkout.",
        "The selected branch becomes current.",
        "Git may block a switch to protect local changes; inspect status/diffs and preserve work instead of forcing the switch.",
      ),
      detail(
        "git merge",
        "git merge --ff-only docs-recovery integrates that branch into the current branch only when it can fast-forward.",
        "A Fast-forward report and updated target files in the intended simple case.",
        "Run it while on main when main should receive the change. Refusal after divergence needs inspection, not force flags.",
      ),
      detail(
        ".gitignore",
        "The file .gitignore contains patterns. lab-output/ ignores matching untracked directories; echo with > is suitable only for a new ignore file.",
        "The generated fixture remains on disk but is omitted from ordinary untracked status.",
        "An ignore rule neither removes already tracked files nor protects a secret previously committed. Do not overwrite existing rules.",
      ),
      detail(
        "git log --graph",
        "--graph draws ancestry; --oneline shortens entries; --all includes all references; -8 bounds output to eight commits.",
        "A compact history showing the relevant branch pointers.",
        "A neat graph is not a content review; read the merged file too.",
      ),
      detail(
        "git add / git diff --staged / git commit",
        "Explicitly stage README.md and .gitignore, review the staged proposal, then record that exact snapshot with a message.",
        "One coherent commit containing intended documentation and ignore rules.",
        "Avoid git add . when you have not reviewed every new local file.",
      ),
    ],
    readiness: [
      "I can name the branch receiving a merge before running it.",
      "I can explain why --ff-only refuses divergent histories.",
      "I can explain why an ignored file remains on disk and why ignore is not secret removal.",
    ],
  },
  "git-conflicts": {
    startingPoint:
      "You can create branches and merge a fast-forward. Use a fresh ~/atlas-labs/git-conflicts repository and local lab identity; the conflict is deliberate and does not require losing earlier work.",
    whyItMatters:
      "Automation cannot decide every intended change. Engineers resolve competing edits by preserving useful behavior, then review and verify the combined result.",
    required: [
      "Create two different edits to the same original line so a real conflict occurs.",
      "Read markers as competing versions, including which side is the current branch.",
      "Write a coherent final requirement, remove markers, stage the resolution, and finish the merge.",
      "Verify meaning and history; understand abort as a recovery option for an in-progress merge begun from clean state.",
    ],
    optional: [
      optional(
        "Graphical merge tools",
        "They can help with larger changes, but a one-line text conflict makes the underlying decision visible.",
      ),
      optional(
        "Advanced merge strategies",
        "Ours/theirs shortcuts and strategy settings can discard useful work if used without context; they are unnecessary here.",
      ),
    ],
    terms: [
      term(
        "Divergence",
        "Two branches each contain commits the other does not have.",
      ),
      term(
        "Conflict",
        "A paused integration where Git cannot choose the final content automatically.",
      ),
      term(
        "Conflict markers",
        "<<<<<<<, =======, and >>>>>>> delimit competing versions; they are file text to resolve, not shell commands.",
      ),
      term(
        "Resolution",
        "The intended final content, which may combine useful ideas from both versions.",
      ),
      term(
        "Abort",
        "Attempt to cancel an in-progress merge and restore its prior state.",
      ),
    ],
    walkthrough: [
      step(
        "Create a shared base",
        "Initialize main in a fresh git-conflicts directory, set local lab identity, write Verify the service. to check.txt, stage, and commit.",
        "Both future branches can share this original committed line.",
      ),
      step(
        "Create two competing changes",
        "Create socket-check, replace the line with Verify the listening socket., and commit. Switch to main, replace the original line with Verify the HTTP response., and commit.",
        "The branches now contain different changes to the same original line; main has not already absorbed socket-check.",
      ),
      step(
        "Observe the conflict",
        "While on main run git merge socket-check, then git status, git diff, and cat check.txt.",
        "Git reports a content conflict. The file shows HEAD’s HTTP text and socket-check’s listener text between markers; the merge is paused.",
      ),
      step(
        "Resolve meaning before syntax",
        "Edit check.txt to require both the listening socket and expected HTTP response, with no markers. Run git add check.txt, git diff --staged, and commit the combined result.",
        "The final sentence preserves both useful checks. Staging records your resolution; the commit completes the merge.",
      ),
      step(
        "Verify and explain recovery",
        "Run cat check.txt, git log --oneline --graph --all -6, and git status. Explain when you would instead use git merge --abort.",
        "The final document is coherent, a merge commit links both histories, and no merge remains in progress. Abort is for an unfinished merge, not a normal undo of an already completed commit.",
      ),
    ],
    commandDetails: [
      detail(
        "git status",
        "Read whether a merge is in progress and which paths are unmerged; after git add it reports resolved paths ready to commit.",
        "An unmerged check.txt during the conflict and clean state after completion.",
        "Do not read a conflict message as total repository corruption; Git is waiting for an explicit content decision.",
      ),
      detail(
        "git diff",
        "During an unresolved conflict, git diff highlights conflict content; after staging, git diff --staged reviews the proposed resolved result relative to the current commit.",
        "The competing versions initially, then the intended combined change after resolution.",
        "Removing markers is insufficient if a useful requirement was also discarded.",
      ),
      detail(
        "git add",
        "git add check.txt stages the edited content and marks that path resolved for the ongoing merge.",
        "The path is no longer unmerged; the merge still awaits its final commit.",
        "Git can stage leftover conflict markers as ordinary text; you must read the file before marking it resolved.",
      ),
      detail(
        "git commit",
        'git commit -m "Combine response and listener checks" finishes the in-progress merge using the staged resolution.',
        "A merge commit links the formerly competing histories.",
        "A successful commit proves a recorded resolution, not that the document or program’s behavior is correct.",
      ),
      detail(
        "git merge --abort",
        "While a merge is in progress, --abort attempts to return to the state before it started.",
        "The merge-in-progress state disappears and the pre-merge branch contents return in this clean-start lab.",
        "Preexisting uncommitted edits complicate reconstruction; begin this exercise clean and do not use abort as a general-purpose history rewrite.",
      ),
      detail(
        "git init / config / switch / merge",
        "Create the disposable main repository, set local author metadata, make socket-check with switch -c, commit each replacement, switch back to main, then merge socket-check without --ff-only for this deliberate divergent case.",
        "Three input commits produce a real paused conflict, followed by the resolution commit.",
        "Different files or nonoverlapping lines may merge automatically. Both branches must change the same original line differently to reproduce this fixture.",
      ),
    ],
    readiness: [
      "I can identify both useful requirements before editing markers away.",
      "I can distinguish editing, staging a resolution, and committing the completed merge.",
      "I can show a real conflict and a verified combined result without force/reset shortcuts.",
    ],
  },
  "git-collaboration": {
    startingPoint:
      "You can create commits, inspect branches, and resolve a small conflict. All three repositories in this lesson live under ~/atlas-labs/git-remote, so remote means another local path and no GitHub credentials are needed.",
    whyItMatters:
      "A local commit does not synchronize other copies. Understanding clone, push, fetch, and pull prevents accidental overwrites and misleading claims that a teammate already has your change.",
    required: [
      "Draw author clone → bare remote → reviewer clone and distinguish each repository’s state.",
      "Inspect fetch/push destinations before transferring commits.",
      "Explain push, fetch, and pull and why fetch alone does not update the current working tree.",
      "Use --ff-only for the expected linear reviewer update and treat rejection as a reason to inspect history, not force overwrite.",
    ],
    optional: [
      optional(
        "Network authentication and real GitHub publication",
        "Local transport isolates the Git model. Account credentials, access rights, and public visibility are separate later concerns.",
      ),
      optional(
        "Resolving divergent remote histories",
        "The required transfer is linear; the challenge can introduce divergence after the normal directions are clear.",
      ),
    ],
    terms: [
      term(
        "Remote",
        "A named repository destination, stored locally as a nickname such as origin.",
      ),
      term(
        "Clone",
        "A new repository copied from another repository, usually with origin configured.",
      ),
      term(
        "Bare repository",
        "A repository holding history without a normal editable working tree; suitable as this local transfer destination.",
      ),
      term(
        "Remote-tracking reference",
        "Your local record of a remote branch’s observed position, such as origin/main after fetch.",
      ),
      term(
        "Upstream / tracking",
        "The relationship used by a local branch to identify its usual remote branch.",
      ),
      term(
        "Non-fast-forward rejection",
        "A refusal to advance a destination in a way that would discard its existing branch history.",
      ),
    ],
    walkthrough: [
      step(
        "Build the local destination",
        "Run mkdir -p ~/atlas-labs/git-remote, then git init --bare -b main ~/atlas-labs/git-remote/origin.git. Clone it into the fresh author path.",
        "The bare destination exists; an empty-repository warning during the first clone is expected because there are no commits yet.",
      ),
      step(
        "Publish one local commit to it",
        "In author, set local identity, create README.md, stage, and commit. Run git remote -v and verify both destinations are the intended local origin.git. Then git push -u origin main.",
        "The remote receives main and tracking is recorded. No external account or network destination is involved.",
      ),
      step(
        "Create a second working copy",
        "Clone the same origin.git into reviewer and read its README. Return to author, append a verification sentence, commit, inspect origin again, and git push origin main.",
        "The bare remote has the second commit; the already-created reviewer working tree still has its old content until explicitly updated.",
      ),
      step(
        "Bring reviewer forward",
        "In reviewer run git status, git pull --ff-only origin main, cat README.md, and git log --oneline -2.",
        "The reviewer fast-forwards and displays the new sentence and both commits. It must begin with no conflicting local work.",
      ),
      step(
        "Explain transfer boundaries",
        "Draw which copy changed at each commit/push/pull. Explain how git fetch origin would differ from the final pull.",
        "A commit changes one clone, push changes destination references/history, fetch updates local remote-tracking information, and pull also integrates into the current branch.",
      ),
    ],
    commandDetails: [
      detail(
        "git clone",
        "git clone SOURCE DESTINATION copies the repository and usually configures origin to SOURCE. Here both arguments are explicit ~/atlas-labs/git-remote paths.",
        "A fresh author/reviewer directory with Git metadata and checked-out main once commits exist.",
        "The destination should be fresh. A local clone is not an account login or a public upload.",
      ),
      detail(
        "git remote -v",
        "remote lists configured nicknames; -v shows full fetch and push destinations.",
        "origin pointing to the intended origin.git path twice, labeled fetch and push.",
        "A nickname is not proof of ownership or safety; read the actual destination before each push.",
      ),
      detail(
        "git push",
        "git push -u origin main sends local main to origin and records upstream tracking. Later git push origin main repeats the explicit destination without needing -u again.",
        "Destination update output for the newly transferred commits.",
        "Inspect history and the destination first. A rejected push preserves remote work; do not bypass it with force.",
      ),
      detail(
        "git fetch",
        "git fetch origin obtains objects/references from origin and updates local remote-tracking references without merging into the current branch.",
        "Remote information is refreshed while current working files need not change.",
        "Downloading a commit does not automatically make it part of the current branch or working tree.",
      ),
      detail(
        "git pull --ff-only",
        "git pull --ff-only origin main fetches origin’s main then integrates only if the current branch can fast-forward to it.",
        "A fast-forward message and the new README content in the linear lab.",
        "If histories diverge it refuses. Inspect before choosing an integration strategy; forcing is not an appropriate automatic repair.",
      ),
      detail(
        "git init --bare",
        "git init --bare -b main PATH creates history storage at PATH with main as the initial branch name and no normal working-tree files.",
        "origin.git contains repository internals, not an editable README working copy.",
        "Do not edit internals to change project content. Make commits in a clone, then push them.",
      ),
      detail(
        "git config / add / commit / echo >>",
        "Set identity in author only, append the second sentence with >>, explicitly stage README.md, and commit before pushing.",
        "The second local commit includes the sentence; only the later push transfers it.",
        "An unstaged or uncommitted edit is not sent merely because you ran git push.",
      ),
    ],
    readiness: [
      "I can identify exactly which repository contains a change after each step.",
      "I can explain why fetch and pull are different operations.",
      "I can verify a local remote destination and preserve a rejection for investigation.",
    ],
  },
  "github-workflow": {
    startingPoint:
      "Use a clean local lab repository with main and a new documentation branch. You understand commits and local remotes. Required work stays local; GitHub publication and a real hosted Actions run are optional later checkpoints.",
    whyItMatters:
      "A portfolio contribution should let another engineer reproduce your work. An issue, review description, useful README, and limited automated check give different forms of evidence.",
    required: [
      "Write a concrete problem, expected behavior, and observable acceptance criterion.",
      "Prepare a README that states Ubuntu setup, verification, failure/recovery, cleanup, and limitations.",
      "Read workflow YAML as event → jobs → runner → steps and understand the minimal read-only permissions.",
      "Demonstrate a heading check failing and passing locally while honestly separating text structure from real service behavior and hosted execution.",
    ],
    optional: [
      optional(
        "Publishing an issue, PR, and Actions run",
        "These require deliberate destination/visibility/account checks. Local drafts do not count as posted items, and required learning can proceed without account spending.",
      ),
      optional(
        "Workflow hardening and deployment",
        "Pinned action revisions, untrusted inputs, secrets, and deployments are later CI/CD topics. The starter workflow only reads files and checks a heading.",
      ),
    ],
    terms: [
      term(
        "Issue",
        "A record of a problem with reproducible context and acceptance criteria.",
      ),
      term(
        "Pull request",
        "A proposal to review and integrate one branch into a chosen base branch.",
      ),
      term(
        "YAML",
        "Indented structured text used here to define workflow settings; indentation expresses nesting.",
      ),
      term(
        "Event / job / runner / step",
        "An event triggers the workflow; a job runs on a runner machine; ordered steps execute commands/actions within the job.",
      ),
      term(
        "Action",
        "A reusable workflow component, such as checkout for making repository files available on the runner.",
      ),
      term(
        "Acceptance criterion",
        "An observable condition used to decide whether the intended outcome was achieved.",
      ),
    ],
    walkthrough: [
      step(
        "Prepare a reviewable proposal",
        "Create a documentation branch from a clean main. In your editor draft README.md, ISSUE.md, and PR.md. Omit the exact ## Verification heading initially; ensure those words do not accidentally occur as a heading elsewhere.",
        "The README explains the lab, the issue names an observable problem, and the PR draft says what changed, how it was checked, and what remains untested.",
      ),
      step(
        "Prove the check can fail",
        'Run grep -q "^## Verification" README.md and immediately echo "$?".',
        "No matching text prints because -q is quiet. Status 1 shows the expected heading is absent; status 2 instead indicates a read/tool error to inspect.",
      ),
      step(
        "Add meaningful verification",
        "Add a ## Verification heading with actual commands and expected service outcomes. Repeat the identical grep and immediate status check.",
        "Status becomes 0. The added instructions still need practical validation; the heading test cannot establish their correctness.",
      ),
      step(
        "Save the workflow as a file",
        "Run mkdir -p .github/workflows. Save the lesson’s YAML in .github/workflows/docs.yml using your editor; do not paste raw YAML at a Bash prompt. Read the indentation and each level aloud.",
        "The file contains a workflow triggered by push/pull_request, a five-minute Ubuntu job, checkout, and the same grep check. contents: read limits repository-token permission.",
      ),
      step(
        "Review the resulting branch",
        "Stage only the named documentation/workflow files, inspect git diff --staged, commit, then inspect git diff main...HEAD and git status. Record local check passed; hosted workflow not run.",
        "The branch proposal is reviewable, the local command has a failure and success record, and you do not claim optional hosted work without its actual URL/run evidence.",
      ),
    ],
    commandDetails: [
      detail(
        "git diff main...HEAD",
        "The three-dot comparison shows changes from the merge base of main and HEAD to the current checkout’s commit, useful for a branch proposal.",
        "The documentation/workflow changes committed on your feature branch relative to its shared starting point.",
        "Uncommitted changes are not part of this committed branch comparison. Review working/staged diffs separately before the commit.",
      ),
      detail(
        "grep -q",
        'grep -q "^## Verification" README.md quietly tests for a pattern. ^ anchors the beginning of a line; the quoted text keeps spaces and # characters in the pattern argument.',
        "No normal output; 0 for a match, 1 for no match, 2 for an error in normal grep usage.",
        "The pattern accepts a line beginning with those characters, including a longer heading. It proves only that prefix exists, not that the section contains useful instructions.",
      ),
      detail(
        "git status",
        "Read the current branch and staged/unstaged/untracked paths before deciding what to add or commit.",
        "Only intended README.md, ISSUE.md, PR.md, and workflow changes appear in the proposal.",
        "Status alone does not show the complete proposed content; pair it with the relevant diff.",
      ),
      detail(
        "Workflow location",
        "Save YAML at .github/workflows/docs.yml inside the repository. This is a file path, not an executable shell command.",
        "A locally prepared workflow definition for GitHub to discover if intentionally published later.",
        "A local file cannot prove a hosted Actions run. YAML indentation uses spaces consistently, not pasted prompt characters.",
      ),
      detail(
        'echo "$?"',
        "Expand and print the immediately preceding grep status before any other inspection replaces it.",
        "1 before adding the heading, then 0 after adding it.",
        "A friendly-looking line of output is not a substitute for the measured check result.",
      ),
      detail(
        "git switch -c / mkdir -p / git add / git commit",
        "Create a feature branch, create the workflow parent directory, explicitly stage the four intended files, and commit after reviewing git diff --staged.",
        "A coherent local proposal in version history.",
        "ISSUE.md and PR.md are drafts, not posted GitHub objects. The sample actions/checkout version must be reviewed against official guidance before an actual hosted publish.",
      ),
    ],
    readiness: [
      "I can tell a beginner which terminal/editor/file each instruction belongs in.",
      "I can explain event, job, runner, and step in the sample YAML.",
      "I can name exactly what the local check proves and what real recovery/hosted evidence is still missing.",
    ],
  },
};
