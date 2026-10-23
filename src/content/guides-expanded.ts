import type { LessonStudyGuide } from "./study-types";

const term = (term: string, meaning: string) => ({ term, meaning });
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
const explore = (topic: string, reason: string) => ({ topic, reason });

export const expandedGuides: Record<string, LessonStudyGuide> = {
  "computing-basics": {
    startingPoint:
      "Use an ordinary personal computer, its file manager, and an editor that can save plain text. No command line is required. Make a new Atlas practice folder in Documents so you know which files belong to this exercise.",
    whyItMatters:
      "A cloud engineer constantly moves between tools and the files those tools read. You need to know where the durable result exists before a script, upload, or backup can use it.",
    required: [
      "Explain hardware → operating system → program → data using the note you create.",
      "Save a plain-text file, identify its complete filename and folder, and reopen the same file after closing the editor.",
      "Distinguish an unsaved editor buffer, RAM, local saved storage, and a separate cloud backup.",
    ],
    optional: [
      explore(
        "CPU architecture and storage hardware",
        "Useful when sizing systems later; you do not need chip-design or electronics expertise to complete this lesson.",
      ),
      explore(
        "Binary file formats",
        "Know that changing an extension does not convert content; detailed format specifications can wait.",
      ),
    ],
    terms: [
      term(
        "RAM",
        "Working memory used by running programs; do not rely on it as a persistent file archive.",
      ),
      term(
        "Path",
        "A file's location, including its containing folders and filename.",
      ),
      term("Extension", "A suffix such as .txt that suggests a file format."),
      term(
        "Buffer",
        "The editor's in-memory working copy, which can differ from the saved file.",
      ),
    ],
    walkthrough: [
      step(
        "Choose the destination",
        "Create the practice folder in Documents and open it in the file manager. Write down how you reached it.",
        "You can identify this folder without the editor's Recent Files list.",
      ),
      step(
        "Save deliberate content",
        "Type two sentences in a plain-text editor. Save as welcome.txt inside that folder. Enable visible extensions in the file manager.",
        "The full name is welcome.txt, not welcome.txt.txt or a word-processing document.",
      ),
      step(
        "Test persistence",
        "Close the editor completely. Open welcome.txt from the folder and compare its content with your original sentences.",
        "The saved text remains; closing the program did not remove the file.",
      ),
      step(
        "Separate editing from saving",
        "Change one sentence, save explicitly, close, and reopen again. Compare the changed sentence.",
        "The second saved version survives too. This proves local persistence, not an online backup.",
      ),
    ],
    commandDetails: [
      detail(
        "File manager",
        "File Explorer, Finder, or Files is a graphical program for browsing storage. Folders organize paths; opening a file asks a suitable program to display it.",
        "You see the complete filename in the folder you selected.",
        "A shortcut or Recent Files entry is a reference; confirm the underlying location.",
      ),
      detail(
        "Text editor",
        "Use Save As to choose the folder, plain-text format, and welcome.txt name; use Save to update that same file.",
        "Reopening displays the exact saved text.",
        "Rich-text formats can add formatting bytes; renaming them .txt does not produce plain text.",
      ),
    ],
    readiness: [
      "Locate the file tomorrow without Recent Files.",
      "Identify which changes require Save.",
      "Explain what extra mechanism would be needed for another computer to have this file.",
    ],
  },
  "web-foundations": {
    startingPoint:
      "You can find and reopen a local file. Use a desktop browser and a public documentation page; no login is needed for this inspection.",
    whyItMatters:
      "Cloud work supports requests flowing between clients, services, and storage. Knowing which boundary failed is more useful than describing every failure as 'the website is down'.",
    required: [
      "Identify scheme, host, path, query, and fragment in a URL; the # fragment stays with the browser.",
      "Trace a request and response, then distinguish HTML content, CSS presentation, and JavaScript behavior.",
      "Explain local browser storage separately from server-account synchronization; a login alone does not demonstrate sync.",
    ],
    optional: [
      explore(
        "Browser rendering internals",
        "You need to inspect network behavior now; rendering-engine implementation can wait.",
      ),
      explore(
        "Building a complete frontend",
        "Recognizing HTML/CSS/JavaScript is required here; becoming a specialist frontend developer is a separate path.",
      ),
    ],
    terms: [
      term("Client", "A program making a request, such as your browser."),
      term(
        "Server",
        "A program responding to a request; it may run on another computer.",
      ),
      term(
        "Origin",
        "The combination of scheme, host, and port that scopes many browser security and storage rules.",
      ),
      term(
        "Cache",
        "A reusable stored response; it is different from an account's learning-progress records.",
      ),
      term(
        "HTTP status",
        "A response code describing how the server handled a request.",
      ),
    ],
    walkthrough: [
      step(
        "Read before navigating",
        "Decompose https://example.com/lessons/start#practice on paper. The path is illustrative, so do not expect a real lesson there.",
        "Scheme https; host example.com; path /lessons/start; fragment practice.",
      ),
      step(
        "Capture requests",
        "Open an official resource, open developer tools → Network, then reload. Select the main document row.",
        "A request has an address and observed status; cached responses may have different transfer indicators.",
      ),
      step(
        "Find page dependencies",
        "Select a CSS, JavaScript, or image request if one is present. Compare its URL with the document's URL.",
        "A single visible page can require several separate responses.",
      ),
      step(
        "Name the storage boundary",
        "Read Atlas's current storage description and explain how progress would move to another browser. Keep credentials and request headers out of shared evidence.",
        "Your explanation names either implemented account synchronization or explicit export/import rather than assuming the browser shares local data.",
      ),
    ],
    commandDetails: [
      detail(
        "Browser address bar",
        "In https://example.com/lesson?id=3#practice, ? begins query data and # begins a browser fragment; the host is example.com.",
        "You identify the requested host before trusting the page.",
        "HTTPS authenticates the named host, not the truth of every claim on the page.",
      ),
      detail(
        "Developer tools → Network",
        "Open the panel before reloading so it can record requests. A row represents one exchange; Headers shows request/response details.",
        "You can record the document's actual status and one dependent resource.",
        "Do not copy cookies, authorization headers, or private query values into your journal.",
      ),
    ],
    readiness: [
      "Explain why the wrong hostname remains wrong over HTTPS.",
      "Distinguish a server error from missing local saved data.",
      "State where progress is stored in the particular Atlas site you use.",
    ],
  },
  "editor-workflow": {
    startingPoint:
      "Use the Ubuntu practice shell from terminal-files, a plain-text code editor, and an already-installed Python 3 interpreter. Save programs before running them.",
    whyItMatters:
      "Automation is only reproducible when you can connect the edited source, saved path, chosen interpreter, and observed output.",
    required: [
      "Repeat edit → save → inspect → run → compare output.",
      "Explain print, quoted strings, arithmetic expressions, and parentheses in the two-line demo.",
      "Read a syntax error's file and line, make one correction, and rerun the same command.",
    ],
    optional: [
      explore(
        "Editor extensions and debuggers",
        "Helpful later, but the shell run command is enough to understand this small program.",
      ),
      explore(
        "Compilation and interpreter internals",
        "Distinguish source from execution now; language implementation details are not a prerequisite.",
      ),
    ],
    terms: [
      term(
        "Interpreter",
        "The program, here python3, that executes Python source.",
      ),
      term("Source", "The saved instructions in hello.py."),
      term("Output", "The text produced by executing the source."),
      term(
        "Syntax error",
        "A failure to parse the code's grammatical structure.",
      ),
      term(
        "Relative path",
        "A location interpreted from the current working directory.",
      ),
    ],
    walkthrough: [
      step(
        "Establish the folder",
        "Run mkdir -p ~/atlas-labs/expanded/editor, then cd ~/atlas-labs/expanded/editor and pwd. Open this folder in your editor.",
        "pwd ends in /atlas-labs/expanded/editor.",
      ),
      step(
        "Save the program",
        "Save the demo as hello.py, then run cat hello.py. Explain that print calls a function and parentheses enclose its input.",
        "The saved file contains two print calls with ordinary straight quotes.",
      ),
      step(
        "Predict and execute",
        "Run python3 --version, predict the two lines, then run python3 hello.py.",
        "The sentence appears followed by 5; the version identifies the interpreter used.",
      ),
      step(
        "Learn from a controlled error",
        "Remove one closing parenthesis in the editor, save, and run again. Read the filename, line, and SyntaxError. Restore the parenthesis and repeat.",
        "The broken file fails; the repaired file returns the original two-line output.",
      ),
    ],
    commandDetails: [
      detail(
        "python3 --version",
        "python3 selects the interpreter; --version asks it to print its installed version instead of running a file.",
        "A Python 3.x version line.",
        "Command not found means Python is missing from this environment; do not treat that as a program syntax error.",
      ),
      detail(
        "python3 FILE",
        "Replace the teaching placeholder FILE with hello.py; the interpreter reads that saved path.",
        "The sentence and 5 on separate lines.",
        "An unsaved buffer or wrong directory can cause an old result or a cannot-open-file error.",
      ),
      detail(
        "cat FILE",
        "cat hello.py displays the saved bytes as text without executing Python.",
        "The two source lines.",
        "Do not type the source directly at a Bash prompt.",
      ),
      detail(
        "pwd",
        "Print working directory shows the base used for relative paths.",
        "Your editor lab directory.",
        "The editor's open folder and terminal folder can differ.",
      ),
      detail(
        "mkdir -p / cd",
        "mkdir -p creates missing parent folders; cd changes this shell's working directory. ~ expands to your home folder.",
        "The dedicated practice path exists and pwd confirms entry.",
        "Check cd succeeded before saving or running files.",
      ),
    ],
    readiness: [
      "Show that cat matches the editor's saved version.",
      "Predict print(7 * 6).",
      "Repair a missing parenthesis using the error location.",
    ],
  },
  "bash-values": {
    startingPoint:
      "Use Bash in a fresh bash-values folder under ~/atlas-labs/expanded. You already know terminal commands and how to inspect files; these examples do not require chmod or executable scripts.",
    whyItMatters:
      "Deployment and support scripts handle names containing spaces. Preserving input as data prevents accidental extra arguments and makes automation predictable.",
    required: [
      "Assign a variable without spaces around =, and quote its expansion when passing a filename.",
      "Explain single quotes versus double quotes, $1, $#, and an exported child-process setting.",
      "Predict and compare one quoted argument with two unquoted arguments.",
    ],
    optional: [
      explore(
        "Advanced parameter expansion",
        "Learn the common quoted expansion first; substring operators and arrays can be added when a task needs them.",
      ),
      explore(
        "Shell parser internals",
        "You need the argument-boundary model rather than every parsing phase at this stage.",
      ),
    ],
    terms: [
      term("Argument", "One input item passed to a command or script."),
      term(
        "Expansion",
        "The shell replacing syntax such as $report with its value.",
      ),
      term("Environment", "Named values a process passes to its children."),
      term(
        "Glob",
        "A filename pattern such as *.log; unquoted wildcard text can expand to filenames.",
      ),
    ],
    walkthrough: [
      step(
        "Create a spaced fixture",
        "In the new lab directory run printf '%s\\n' harmless > 'incident notes.txt'. Set report=\"incident notes.txt\" and run cat \"$report\".",
        "One file is read and harmless is printed.",
      ),
      step(
        "Inspect a split",
        'Run cat $report on only this harmless fixture, then repeat cat "$report". Do not create separate files named incident or notes.txt.',
        "The unquoted form tries separate names; the quoted form reads the intended file.",
      ),
      step(
        "Count inputs",
        'Save show-input.sh and run bash show-input.sh "web service", then bash show-input.sh web service.',
        "Counts are 1 and 2; the first argument is respectively web service and web.",
      ),
      step(
        "Compare literal and expanded text",
        "Run echo '$HOME' and echo \"$HOME\". Export ATLAS_MODE=practice and run bash -c 'echo \"$ATLAS_MODE\"'.",
        "The single-quoted HOME remains literal; the double-quoted value expands; the child prints practice.",
      ),
    ],
    commandDetails: [
      detail(
        "name=value",
        'report="incident notes.txt" assigns one value. The quotes belong to shell syntax and are not stored in the value.',
        "Assignment normally prints nothing.",
        "report = value attempts to execute a command named report.",
      ),
      detail(
        '"$name"',
        'cat "$report" expands the variable and supplies one argument even when the value contains spaces.',
        "The intended file's content.",
        "Quotes preserve boundaries but do not encrypt the value.",
      ),
      detail(
        "$1 / $#",
        "$1 is this script's first argument; $# is its argument count, excluding the script filename.",
        "Quoted web service gives first argument web service and count 1.",
        "Missing $1 is empty in this demo; validate counts before using input for real work.",
      ),
      detail(
        "export",
        "export ATLAS_MODE=practice makes this nonsecret value available to child processes.",
        "The child bash -c command prints practice.",
        "Exporting configuration is not safe secret storage or synchronization with a parent shell.",
      ),
      detail(
        "bash / printf / echo / >",
        "bash FILE runs a saved script; printf '%s\\n' VALUE uses a fixed text format; echo prints a simple value. > writes stdout to a file, creating or truncating it.",
        "The controlled fixture has a newline and the demo reports its inputs.",
        "Use > only for these new fixtures; keep user values out of printf's format string.",
      ),
    ],
    readiness: [
      "Explain both argument counts before running.",
      "Read a spaced filename through a variable.",
      "Explain why export affects children and why quoting is not secrecy.",
    ],
  },
  "bash-decisions": {
    startingPoint:
      "You can quote shell values and pass arguments. Save read-report.sh in a new directory with a harmless report.txt; run it with bash rather than changing file permissions.",
    whyItMatters:
      "A scheduled job cannot infer failure from a human-readable message. Scripts need a clear input contract, useful diagnostics, and a status callers can inspect.",
    required: [
      "Read each if condition and explain why argument count is checked before $1.",
      "Distinguish readable regular files from directories and nonexistent paths.",
      "Capture stdout, stderr, and the immediately preceding exit status for all four lab cases.",
    ],
    optional: [
      explore(
        "Strict shell options",
        "Options such as set -e have context-dependent behavior; explicit validation is the required technique here.",
      ),
      explore(
        "Race-resistant filesystem APIs",
        "Understand that a path can change after validation; concurrent-safe file tooling is a later specialization.",
      ),
    ],
    terms: [
      term(
        "Exit status",
        "A process result number: 0 conventionally means success; nonzero signals a failure or other documented outcome.",
      ),
      term(
        "stdout",
        "Descriptor 1, normally used for the command's intended result.",
      ),
      term("stderr", "Descriptor 2, normally used for diagnostics."),
      term(
        "Regular file",
        "A file containing data, as distinct from a directory or device.",
      ),
    ],
    walkthrough: [
      step(
        "Read the branches",
        "Read the demo aloud: if the count is not one, exit 2; if the path is not a readable regular file, exit 3; otherwise read it.",
        "You can explain why fi closes each if and why cat is last.",
      ),
      step(
        "Create known input",
        "Save the script and create report.txt using printf '%s\\n' 'fixture report' > report.txt.",
        "cat report.txt displays exactly one harmless line.",
      ),
      step(
        "Run the case table",
        'Run with no argument, absent.txt, ., and report.txt. Immediately after each run execute echo "$?".',
        "Statuses are 2, 3, 3, and 0 for these fixtures.",
      ),
      step(
        "Separate the channels",
        "Run bash read-report.sh absent.txt > normal.txt 2> diagnostic.txt. Capture its status before cat diagnostic.txt.",
        "normal.txt is empty; diagnostic.txt explains the rejected path; the script status is 3.",
      ),
    ],
    commandDetails: [
      detail(
        "if / then / else / fi",
        "if runs a branch when the test command succeeds. then begins that branch; else is an optional alternative; fi closes the construct.",
        "Only the branch whose condition holds is used.",
        "Read the condition's ! negation; a successful test can mean input is invalid.",
      ),
      detail(
        "[[ $# -eq 1 ]]",
        "[[ ]] is Bash conditional syntax; $# counts arguments; -eq compares integers. The demo uses -ne, meaning not equal.",
        "The test succeeds only for exactly one argument.",
        "Whitespace inside the conditional syntax matters; this is Bash syntax, not universal sh syntax.",
      ),
      detail(
        "exit",
        "exit 2 ends the script with status 2; the demo uses 3 for invalid paths.",
        'echo "$?" in the caller immediately prints that status.',
        "Any intervening command replaces $? with its own result.",
      ),
      detail(
        ">&2",
        "Attach >&2 to printf to route its normal output stream to stderr.",
        "The message appears in diagnostic.txt when descriptor 2 is redirected.",
        "Printing failed without a nonzero status still tells automation success.",
      ),
      detail(
        "[[ -f PATH / -r PATH ]] / ! / ||",
        "-f checks for a regular file; -r checks readability; ! negates; || means either failed requirement causes rejection.",
        "A directory is rejected even if it is readable.",
        "These checks do not guarantee a later read cannot fail.",
      ),
      detail(
        "cat -- / > / 2>",
        'cat -- "$1" ends option parsing before the filename. > captures stdout and 2> captures stderr, truncating the chosen fixture files.',
        "A valid report is read without modifying it.",
        "A leading-dash filename must remain a filename; do not drop --.",
      ),
    ],
    readiness: [
      "Predict the four statuses without the solution.",
      "Show a diagnostic separately from normal output.",
      "Explain why the final cat status remains meaningful after validation.",
    ],
  },
  "bash-loops": {
    startingPoint:
      "You can validate arguments, quote paths, and inspect exit status. Use a fresh bash-loops directory with only the logs and empty folders named in the lab.",
    whyItMatters:
      "Operations jobs repeat the same action over many files. A trustworthy loop must also handle spaces, zero files, wrong directories, and read failures.",
    required: [
      "Explain for/do/done and continue using a single-file operation before repeating it.",
      "Preserve each filename and deliberately skip an unmatched glob.",
      "Interpret wc -l as newline count and separate an empty input set from an invalid directory.",
    ],
    optional: [
      explore(
        "Recursive file discovery",
        "The required program intentionally processes one folder; find and null-delimited pipelines address additional requirements.",
      ),
      explore(
        "Parallel processing",
        "First prove sequential behavior; concurrency creates additional ordering and failure problems.",
      ),
    ],
    terms: [
      term("Iteration", "One execution of a loop body for one selected item."),
      term(
        "Command substitution",
        "$(...) runs a command and substitutes its captured stdout, removing trailing newlines.",
      ),
      term("Glob", "A shell filename pattern; *.log selects matching names."),
      term(
        "Guard",
        "A small check that skips or rejects work that is not valid.",
      ),
    ],
    walkthrough: [
      step(
        "Build predictable fixtures",
        "Use mkdir -p logs empty. Write printf 'one\\ntwo\\n' > logs/one.log and printf 'a\\nb\\nc\\n' > 'logs/web errors.log'; add a .txt neighbor.",
        "Two .log files have respectively 2 and 3 newline characters; .txt should be excluded.",
      ),
      step(
        "Trace one iteration",
        "Read count-logs.sh and trace the first file through -f, wc, and printf before running it.",
        "The quoted filename remains one item; wc's stdout becomes lines.",
      ),
      step(
        "Inspect the report",
        "Run bash count-logs.sh logs and compare the filename/count pairs with the fixtures.",
        "Exactly two report rows contain counts 2 and 3; display order is not the requirement.",
      ),
      step(
        "Test boundaries",
        "Run against empty, then absent. Capture $? immediately after each and reread the source files.",
        "Empty succeeds with no report rows; absent returns 2; source text is unchanged.",
      ),
    ],
    commandDetails: [
      detail(
        "for / do / done",
        'for file in "$dir"/*.log enumerates matches; do begins the repeated body and done ends it. The glob suffix stays unquoted so it can match.',
        "Each matching filename is processed once.",
        "for f in $(ls) splits display text and breaks filenames.",
      ),
      detail(
        "continue",
        '[[ -f "$file" ]] || continue skips a nonregular or unmatched item.',
        "An empty folder produces no literal *.log row.",
        "continue skips one iteration; it does not exit the script.",
      ),
      detail(
        "printf",
        'printf "%s: %s lines\\n" "$file" "$lines" formats two data values through fixed %s placeholders.',
        "A filename and its count on one line.",
        "Do not place arbitrary filenames in the format string.",
      ),
      detail(
        "wc -l / < / $(...)",
        'wc -l < "$file" counts newline characters using the file as stdin; $(...) captures that count. if ! lines=$(...); then handles a failed read.',
        "The fixtures report 2 and 3.",
        "A final unterminated text line does not add a newline to wc's count.",
      ),
      detail(
        "[[ -d PATH ]] / mkdir -p / bash",
        "-d tests the required directory; mkdir -p creates only the fixture folders; bash count-logs.sh logs passes the folder as input.",
        "Missing directories are rejected before enumeration.",
        "Do not interpret a read error as a trustworthy zero count.",
      ),
    ],
    readiness: [
      "Predict populated, empty, and missing-directory outcomes.",
      "Explain why the spaced filename is safe.",
      "State precisely what the reported count measures.",
    ],
  },
  "bash-functions": {
    startingPoint:
      "You can write a guarded loop and understand statuses. Use a fresh bash-functions directory and only ordinary files you create; this helper is not a general backup product.",
    whyItMatters:
      "Small named helpers make automation easier to review and reuse, but callers must know their effects, overwrite policy, and failure behavior.",
    required: [
      "Explain function arguments, local variables, return versus exit, and quoted argument forwarding.",
      "Copy a readable fixture only to a new destination and verify repeat-call refusal.",
      "Restore from the copy to another new filename and compare content and digests.",
    ],
    optional: [
      explore(
        "Concurrent backup systems",
        "Race handling, retention, encryption, and live-database consistency are separate requirements beyond this single-user fixture.",
      ),
      explore(
        "Bash function libraries",
        "You can learn sourcing, namespaces, and packaging after the input/effect/status contract is clear.",
      ),
    ],
    terms: [
      term(
        "Function",
        "A named group of commands called with its own positional arguments.",
      ),
      term(
        "Local variable",
        "A value declared within a function to limit interference with its caller.",
      ),
      term("Digest", "A computed fingerprint of bytes, here SHA-256."),
      term(
        "Restore",
        "Using a saved copy to reconstruct readable data in a target location.",
      ),
    ],
    walkthrough: [
      step(
        "Read the contract",
        "Read copy_report: two arguments, readable regular source, destination not already present, and a final cp. Identify each return status before running.",
        "Wrong count is 2; invalid source or existing target is 3.",
      ),
      step(
        "Create and copy",
        "Save copy-report.sh. Create original.txt with printf 'one\\ntwo\\nthree\\n' > original.txt; call bash copy-report.sh original.txt evidence-copy.txt.",
        "The source and new copy both contain three lines; the call succeeds.",
      ),
      step(
        "Prove refusal",
        "Repeat the same copy call and immediately print $?. Inspect the earlier copy.",
        "Status 3 and the previous copy remains intact.",
      ),
      step(
        "Exercise recovery",
        "Copy evidence-copy.txt to a new restored.txt using the helper, read it with cat, then run sha256sum on all three files.",
        "All three digests match and the restored text is readable.",
      ),
    ],
    commandDetails: [
      detail(
        "function_name() { ...; }",
        "copy_report() declares a function; braces enclose its commands. Calling copy_report PATH1 PATH2 supplies its own $1 and $2.",
        "The helper executes only when called.",
        "The short command-card example cp -i is illustrative; use the complete guarded demo for the lab.",
      ),
      detail(
        "local",
        'local source="$1" and local target="$2" keep these function working names scoped locally.',
        "Caller variables are not replaced by these local assignments.",
        "Check the count first, before depending on argument positions.",
      ),
      detail(
        "return",
        "return 3 ends this function with status 3; exit would terminate the shell process running the script.",
        "The caller can choose how to respond to failure.",
        "A function that prints an error but returns success misleads its caller.",
      ),
      detail(
        "sha256sum",
        "sha256sum original.txt evidence-copy.txt restored.txt prints a digest and filename for each input.",
        "Matching first columns support byte equality.",
        "Matching bytes do not prove trusted origin or a consistent live-database backup.",
      ),
      detail(
        'cp -i -- / "$@" / [[ -e PATH / -L PATH ]]',
        'cp copies the source; -i prompts before an overwrite; -- ends options. "$@" forwards every original argument separately. -e rejects an existing target; -L also rejects a dangling symlink.',
        "A new ordinary-file destination is copied; the guarded repeated call is refused.",
        "Validation and copying are separate operations; other processes can change paths between them. Use only your fresh ordinary-file fixture.",
      ),
      detail(
        "printf / cat / bash",
        "printf creates the known fixture, bash runs the saved helper, and cat restored.txt checks recovery content.",
        "The restored three lines are visible.",
        "The fixture-creation > redirection overwrites its target; keep it inside the new lab folder.",
      ),
    ],
    readiness: [
      "Explain the helper's inputs, effect, output, and failures.",
      "Demonstrate refusal without losing the earlier copy.",
      "Explain why file-copy proof is insufficient for a live database.",
    ],
  },
  "python-data": {
    startingPoint:
      "You can save and run hello.py. Use a new python-data folder and Python 3. Everything here is invented inventory data; the program does not contact real services.",
    whyItMatters:
      "Cloud automation turns API and inventory records into decisions. Types, named fields, loops, and return values are the foundation for doing that without confusing display with computation.",
    required: [
      "Recognize strings, integers, booleans, lists, and dictionaries in the fixture.",
      "Trace each record through the function and explain why only unhealthy names are appended.",
      "Return a result independent of printing, and test empty, all-healthy, and mixed inputs.",
    ],
    optional: [
      explore(
        "Classes and advanced Python features",
        "Simple functions and collections are sufficient for these operations scripts; object-oriented design can wait.",
      ),
      explore(
        "Comprehension shortcuts",
        "First trace an ordinary loop accurately; compact syntax should not hide its behavior.",
      ),
    ],
    terms: [
      term(
        "Type",
        "The category of a value, which affects permitted operations and meaning.",
      ),
      term("List", "An ordered collection; its first element is at index 0."),
      term(
        "Dictionary",
        "A mapping of named keys to values, such as name → web.",
      ),
      term("Boolean", "True or False, used to represent a yes/no condition."),
      term(
        "Return value",
        "Data a function gives to its caller; different from text printed to a terminal.",
      ),
    ],
    walkthrough: [
      step(
        "Read the fixture shape",
        'Identify the outer services list and the two dictionaries inside it. Read services[0]["name"] aloud as first record, then its name field.',
        "The first name is web; worker has healthy=False.",
      ),
      step(
        "Trace the function",
        "Before running, start result=[] and follow each iteration. not True is false; not False is true. append adds one name to the list.",
        "Your predicted return value is ['worker'].",
      ),
      step(
        "Run then vary one input",
        "Save inventory.py, run python3 inventory.py, and add a third unhealthy service with a distinct name. Run again.",
        "The result contains unhealthy names in input order.",
      ),
      step(
        "Test boundaries and a mistake",
        "Call the function with [], all healthy records, and mixed records. Misspell healthy in one fixture, observe KeyError, then repair it.",
        "Empty/all-healthy return []; the misspelled required key fails visibly; repaired data works.",
      ),
    ],
    commandDetails: [
      detail(
        "python3 inventory.py",
        "python3 executes the saved program; inventory.py is a relative file path in this working directory.",
        "The original fixture prints ['worker'].",
        "If output ignores an edit, check the saved file and directory before changing the algorithm.",
      ),
      detail(
        "list / dict",
        'services = [{"name": "web", "healthy": True}] combines a list [] and a dictionary {}. record["healthy"] retrieves a required key.',
        "A loop can inspect each record's named fields.",
        'The string "False" is nonempty text, not the boolean False; do not substitute quoted booleans.',
      ),
      detail(
        "def / return",
        "def names_needing_attention(records): defines the function; indented lines are its body; return result supplies the computed list.",
        "The caller can inspect or test the list without parsing terminal output.",
        "Printing inside the function does not replace returning a value.",
      ),
      detail(
        "for / if not / append / print",
        "for visits each record; if not checks an inverted boolean; result.append adds an item; print displays the returned result.",
        "Only unhealthy names are selected.",
        "Incorrect indentation can return after the first record or place the append outside the condition.",
      ),
      detail(
        "names_needing_attention([])",
        "An empty list is a valid input; no iterations run and the initially empty result is returned.",
        "[].",
        "Do not treat an empty fixture as proof that real endpoints are all healthy.",
      ),
    ],
    readiness: [
      "Trace the mixed case without running it.",
      "Explain print versus return.",
      "Explain exactly what a local inventory result can and cannot establish about health.",
    ],
  },
  "python-files-json": {
    startingPoint:
      "You can work with Python lists, dictionaries, booleans, and functions. Save validate_config.py and a nonsecret config.json together in a new lab folder.",
    whyItMatters:
      "Cloud tools consume configuration and API data. Successful decoding is only the first check: the values must also satisfy the assumptions of the operation you intend to run.",
    required: [
      "Separate reading UTF-8 bytes/text, decoding JSON, and validating the resulting Python values.",
      "Explain the required object, nonempty name, and exact integer-port contract.",
      "Reject missing files, malformed JSON, wrong shape, and out-of-range values with diagnostics and status 2.",
    ],
    optional: [
      explore(
        "Schema libraries",
        "They are useful for large contracts; the small explicit checks here make the assumptions visible first.",
      ),
      explore(
        "Configuration format comparisons",
        "YAML/TOML tradeoffs can wait until you can validate one format reliably.",
      ),
    ],
    terms: [
      term(
        "Encoding",
        "The rule used to turn bytes into characters; this file is read as UTF-8.",
      ),
      term(
        "JSON",
        "A text interchange format whose objects/arrays decode to Python dictionaries/lists.",
      ),
      term(
        "Schema",
        "The expected structure and allowed values, beyond valid JSON punctuation.",
      ),
      term(
        "Exception",
        "A raised condition that interrupts normal execution unless handled.",
      ),
      term("Allowlist", "An explicit set of permitted values."),
    ],
    walkthrough: [
      step(
        "Create the valid pair",
        'Save the demo and config.json containing {"name":"web","port":8080}. Run from their directory.',
        "The program finds this local file rather than an unrelated configuration.",
      ),
      step(
        "Follow the pipeline",
        'Read the file read, json.loads call, object check, name check, and port check in that order. Run python3 validate_config.py, then echo "$?" immediately.',
        "Output has name web, port 8080, validated true; status 0.",
      ),
      step(
        "Test syntax versus shape",
        "Keep copies of each fixture. Try malformed JSON and then [] as config.json. Capture stderr and status separately from stdout.",
        "Both return 2, but one fails decoding while the other fails the object contract.",
      ),
      step(
        "Test values and recovery",
        'Try a missing name, port 70000, and port true; rename config.json to test missing-file handling. Restore {"name":"web","port":8080} and run again.',
        "Every invalid case returns 2; restored input returns 0. No running service has been tested.",
      ),
    ],
    commandDetails: [
      detail(
        "Path.read_text",
        'Path("config.json").read_text(encoding="utf-8") reads the relative path as text using the named encoding.',
        "A Python string, or a file/encoding exception.",
        "Run in the saved fixture directory; a missing path fails before JSON parsing.",
      ),
      detail(
        "json.loads",
        "loads decodes a string into Python values: object → dict, array → list, true → True, null → None.",
        "The valid fixture becomes a dictionary.",
        "Valid JSON can still violate your schema; [] is not the required object.",
      ),
      detail(
        "json.dumps",
        "dumps converts the validated dictionary back to JSON text; Python True becomes JSON true.",
        "One machine-readable success result on stdout.",
        "Encoding a result does not prove the configuration's port has a listener.",
      ),
      detail(
        "raise ValueError",
        "raise stops normal execution with the specified exception; the demo catches expected file, encoding, and value failures.",
        "The diagnostic names the rejected assumption.",
        "Catching everything and continuing with fake success hides programming mistakes.",
      ),
      detail(
        "get / isinstance / type / sys.exit",
        "get returns None for a missing field; isinstance checks object/name types. type(port) is int intentionally excludes booleans. sys.exit(2) reports failure; file=sys.stderr selects diagnostics.",
        "Only integers 1 through 65535 are accepted as ports.",
        "Python bool has an integer relationship; isinstance(True, int) alone would accept the wrong type.",
      ),
      detail(
        "python3 validate_config.py / echo / cp / mv",
        "Run the saved validator, inspect $? immediately, use cp to select a preserved fixture as config.json, and mv to temporarily rename only that lab input.",
        "Your case table records the result for each actual fixture.",
        "cp overwrites its target; keep all fixture changes inside the dedicated folder and restore the valid input.",
      ),
    ],
    readiness: [
      "Explain why [] and malformed JSON are different failures.",
      "Predict whether port true is accepted.",
      "Interpret validated:true without claiming service health.",
    ],
  },
  "python-http-api": {
    startingPoint:
      "You can validate JSON and understand HTTP requests. Use two Ubuntu terminals, Python 3, and a fresh python-api/fixtures folder containing only harmless status.json; keep the client in its parent folder.",
    whyItMatters:
      "A cloud script must distinguish an unreachable service from a server's error response and from unusable response data. Otherwise it may retry the wrong thing or report false success.",
    required: [
      "Trace request → status → bounded bytes → UTF-8 decode → JSON parse → schema validation.",
      "Explain the 3-second socket-operation timeout and 65536-byte accepted body limit.",
      "Reproduce success, 404, invalid JSON, and refused connection with distinct statuses, then recover.",
    ],
    optional: [
      explore(
        "OAuth, pagination, and provider SDKs",
        "These matter in real integrations; this local exercise first isolates transport and response-contract behavior.",
      ),
      explore(
        "Retry frameworks",
        "Know that retries need limits and suitable operations; implementing backoff and idempotency is beyond this fixture.",
      ),
    ],
    terms: [
      term(
        "Loopback",
        "127.0.0.1: an address for this machine, not a public service.",
      ),
      term(
        "HTTP error",
        "An error response from a server that was reached, such as 404.",
      ),
      term(
        "Transport failure",
        "Failure to establish/use the connection, such as a refused socket.",
      ),
      term(
        "Timeout",
        "A bound on waiting; here it covers blocking socket operations rather than a whole multi-retry deadline.",
      ),
      term(
        "Idempotency",
        "A property where repeating an operation has the same intended effect as doing it once.",
      ),
    ],
    walkthrough: [
      step(
        "Serve one fixture",
        'Create fixtures/status.json containing {"healthy":true}. In Terminal A cd into fixtures and run python3 -m http.server 8093 --bind 127.0.0.1.',
        "The server stays in the foreground; only the dedicated fixture directory is served.",
      ),
      step(
        "Run the client elsewhere",
        'In Terminal B save fetch_status.py in the parent directory, read its fixed URL, and run python3 fetch_status.py followed immediately by echo "$?".',
        "A JSON reply with healthy true and status 0.",
      ),
      step(
        "Separate two response failures",
        "Rename status.json and run again for 404; restore the name and write not-json for the decoding case.",
        "404 returns 2; a successful HTTP reply with invalid JSON returns 4.",
      ),
      step(
        "Test transport and recovery",
        "Restore the valid JSON. Stop Terminal A's server with Ctrl+C; rerun the client, then restart and retry. Stop the server when finished.",
        "Stopped server gives transport status 3; restored fixture/server gives 0. healthy:false is valid data, not a network error.",
      ),
    ],
    commandDetails: [
      detail(
        "urlopen(..., timeout=3)",
        "The command card shows the basic API; the demo uses opener.open(url, timeout=3) with proxies disabled for this loopback test. with closes the response after use.",
        "A response is read without an unbounded socket wait.",
        "This is not an end-to-end deadline across arbitrary retries.",
      ),
      detail(
        "HTTPError / URLError",
        "HTTPError carries an HTTP response status and is also a URLError subtype, so its handler comes first; the later transport handler catches connection-related failures.",
        "404 is classified separately from connection refusal.",
        "Catching URLError first would hide the more specific classification.",
      ),
      detail(
        "python3 -m http.server",
        "-m runs Python's module; 8093 chooses the listener port; --bind 127.0.0.1 restricts the listener to loopback. The current folder is served.",
        "GET /status.json succeeds while the fixture server runs.",
        "Do not start from a folder with private files; use the dedicated directory.",
      ),
      detail(
        "read(65537) / decode / json.loads",
        "Read at most 65537 bytes, reject length above 65536, decode UTF-8, then parse JSON. The extra byte detects exceeding the accepted cap.",
        "Oversized or malformed data fails the contract with status 4.",
        "A 200 status alone is insufficient; healthy must also be an actual boolean field.",
      ),
      detail(
        "build_opener / ProxyHandler({}) / sys.exit",
        "An empty ProxyHandler bypasses environment proxies for this local fixture. Exit 2 means HTTP failure, 3 transport failure, 4 response-contract failure.",
        "The caller can decide what each failure means.",
        "Do not generalize proxy bypass to every production integration or blindly retry payment POSTs.",
      ),
    ],
    readiness: [
      "Predict the four status outcomes.",
      "Explain healthy:false versus an unreachable API.",
      "Name what this local HTTP exercise does not prove about TLS or authentication.",
    ],
  },
  "python-testing": {
    startingPoint:
      "You can define functions and reject invalid configuration. Save ports.py and test_ports.py as two separate files in one fresh folder; unittest comes with Python.",
    whyItMatters:
      "Automation changes frequently. A useful test captures a caller's promise and demonstrates that an accidental regression is caught before the tool is trusted.",
    required: [
      "Separate the importable function from the test runner and name test methods with test_.",
      "Explain assertEqual, assertRaises, success/boundary/invalid cases, and the reported test count.",
      "Observe a deliberately failing test, repair the behavior, and expand meaningful cases.",
    ],
    optional: [
      explore(
        "Third-party test frameworks and coverage percentages",
        "Standard-library tests are enough here; a coverage number alone does not prove the right behavior was checked.",
      ),
      explore(
        "Mocking frameworks",
        "Pure functions and disposable files avoid needing elaborate mocks for these lessons.",
      ),
    ],
    terms: [
      term(
        "Assertion",
        "A check comparing an observation with an expected result.",
      ),
      term("Boundary case", "An input at or just outside an allowed limit."),
      term(
        "Regression",
        "Previously correct behavior broken by a later change.",
      ),
      term(
        "Discovery",
        "The runner finding tests by file and method naming conventions.",
      ),
      term("Fixture", "Controlled input or setup owned by a test."),
    ],
    walkthrough: [
      step(
        "Split the code correctly",
        "Place valid_port in ports.py and the imports/class in test_ports.py. Run commands from this folder.",
        "The test file can import ports; neither file is a pasted mixture of both labeled parts.",
      ),
      step(
        "Predict and run",
        "Explain accepted endpoints 1/65535 and rejected zero/True. Run python3 -m unittest -v.",
        "Four tests are listed and pass, with an overall OK.",
      ),
      step(
        "Prove protection",
        "Change the lower bound from 1 to 0 in ports.py only, save, and rerun.",
        "test_rejects_zero fails because ValueError was not raised; the suite returns nonzero.",
      ),
      step(
        "Repair and extend",
        "Restore the lower bound. Add separate test methods for string input and 65536, then rerun.",
        "Six tests pass; they verify the function contract, not an actual listening endpoint.",
      ),
      step(
        "Optional file fixture",
        "If practicing files, create them only inside with tempfile.TemporaryDirectory() as folder: and read them back before leaving the block.",
        "The temporary fixture is cleaned when the context ends.",
      ),
    ],
    commandDetails: [
      detail(
        "python3 -m unittest -v",
        "-m runs unittest as a module; no test name invokes discovery; -v lists individual test names. Run from the folder containing test_ports.py.",
        "Initially Ran 4 tests and OK; after two new methods Ran 6 tests.",
        "Ran 0 tests is not proof of the promised behavior; inspect naming and location.",
      ),
      detail(
        "assertRaises",
        "with self.assertRaises(ValueError): requires the indented function call to raise that exception.",
        "Rejection passes; unexpectedly accepting zero fails.",
        "Calling the function outside the with block does not test the expected exception boundary.",
      ),
      detail(
        "assertEqual",
        "self.assertEqual(valid_port(8080), 8080) compares actual and expected values.",
        "The valid port is returned unchanged.",
        "Do not alter an expected value simply to silence a real regression.",
      ),
      detail(
        "TemporaryDirectory",
        "The context manager creates an owned temporary folder; Path(folder) / 'sample.txt' builds a file path within it.",
        "File behavior is tested without touching existing user data.",
        "Using an unrelated path defeats fixture isolation.",
      ),
      detail(
        "def test_ / import / ValueError",
        "The test method prefix enables collection; from ports import valid_port loads the function. A ValueError is the required rejection for an invalid value.",
        "The red test identifies a violated user-facing contract.",
        "Several assertions in one method still count as one test, not several discovered tests.",
      ),
    ],
    readiness: [
      "Explain why the deliberately red test increases confidence.",
      "Spot a zero-test false reassurance.",
      "State why unit tests do not establish browser/provider behavior.",
    ],
  },
  "database-sql": {
    startingPoint:
      "You can run Python and read dictionaries/JSON. Use Python's sqlite3 module and the provided :memory: database; no database server, account, or cloud resource is needed.",
    whyItMatters:
      "Cloud systems store structured state. You need to retrieve the intended rows, preserve constraints, and keep untrusted values separate from query source before operating a shared database.",
    required: [
      "Explain table, row, column, primary key, NOT NULL, and CHECK using the services schema.",
      "Read SELECT/FROM/WHERE/ORDER BY and predict the two unhealthy names and their explicit order.",
      "Bind values with ? and a tuple; demonstrate both an apostrophe-containing value and rejected constraint violations.",
    ],
    optional: [
      explore(
        "Indexes and query plans",
        "Important as data grows; first learn correct selection and constraints on this tiny fixture.",
      ),
      explore(
        "Database service administration",
        "Replication, access roles, network protection, and tuning are additional skills; an in-memory query does not demonstrate them.",
      ),
    ],
    terms: [
      term("Row", "One record in a table; here a service."),
      term("Column", "A named field shared by the table's rows."),
      term(
        "Primary key",
        "A unique row identifier; id is the primary key here.",
      ),
      term("Constraint", "A database rule rejecting invalid data."),
      term(
        "Parameter binding",
        "Passing data values separately from the SQL text.",
      ),
    ],
    walkthrough: [
      step(
        "Decode the schema",
        "Read each services column. healthy is stored as 0 or 1 with CHECK restricting it; name is required with NOT NULL.",
        "You can explain why healthy=2 and duplicate id are rejected.",
      ),
      step(
        "Predict and run",
        "Save query_inventory.py and run it. Before running, order the unhealthy names alphabetically.",
        "The unhealthy rows are operator's dashboard then worker; the name lookup returns id 3.",
      ),
      step(
        "Follow a bound value",
        'Trace execute("SELECT id FROM services WHERE name = ?", (name,)). The apostrophe belongs only to name, not to the SQL source.',
        "The query finds the exact awkward name without constructing SQL by concatenation.",
      ),
      step(
        "Test rejected inputs",
        "In independent fresh in-memory fixtures, attempt a duplicate id and healthy=2; catch sqlite3.IntegrityError. Restore valid data and rerun the original query.",
        "Constraints fail visibly, and correct data still produces the intended result.",
      ),
      step(
        "State the access boundary",
        "Explain who can run this local script and what permission checks a shared report application would need.",
        "A safe bound query is distinguished from authorization to read the data.",
      ),
    ],
    commandDetails: [
      detail(
        "SELECT / WHERE / ORDER BY",
        "SELECT name chooses the output column; FROM services chooses the table; WHERE healthy = 0 filters; ORDER BY name requests ordering.",
        "Two unhealthy names in explicit alphabetical order.",
        "Without ORDER BY, do not rely on the observed row order.",
      ),
      detail(
        "CREATE TABLE",
        "INTEGER PRIMARY KEY supplies identity; TEXT NOT NULL requires a name value; CHECK (healthy IN (0,1)) restricts the health field.",
        "The table accepts only records satisfying its rules.",
        "SQLite's local teaching schema is not automatically a full production type or access policy.",
      ),
      detail(
        "execute with parameters",
        "execute(SQL, (name,)) binds the value to ?. The comma makes a one-element tuple; placeholders are for values, not table names.",
        "operator's dashboard matches id 3.",
        "String concatenation or interpolation can turn input into SQL syntax.",
      ),
      detail(
        "connect / executemany / commit / fetchall / close",
        "connect(':memory:') creates a disposable database; executemany repeats an INSERT for supplied tuples; commit finalizes the fixture writes; fetchall retrieves result rows; close releases the connection.",
        "Printed results are lists of row tuples; a new run starts fresh.",
        "A one-column result still uses tuples such as (3,), not a bare integer.",
      ),
      detail(
        "COUNT(*) / IntegrityError",
        "SELECT COUNT(*) FROM services WHERE healthy = 0 counts qualifying rows. IntegrityError reports a rejected key or CHECK constraint.",
        "The count is 2; invalid inserts fail.",
        "Do not remove a constraint to make the invalid fixture pass.",
      ),
    ],
    readiness: [
      "Write a parameterized exact-name lookup.",
      "Explain why a trailing tuple comma matters.",
      "Distinguish query safety from user permission.",
    ],
  },
  "database-transactions": {
    startingPoint:
      "You can query a disposable SQLite database and run assertions. This fixture has exactly two known accounts; use fresh in-memory state for each independent experiment.",
    whyItMatters:
      "One business operation can span several successful SQL statements. A cloud tool needs to preserve the whole operation's rules even if something fails halfway through.",
    required: [
      "Explain atomicity with debit and credit and track the invariant total of 150.",
      "Read explicit BEGIN/COMMIT/ROLLBACK and explain why failure is re-raised after rollback.",
      "Verify individual balances after injected failure, successful transfer, excessive debit, and invalid amount.",
    ],
    optional: [
      explore(
        "Isolation levels and concurrent writers",
        "They become essential for shared databases; this one-connection fixture intentionally proves a narrower atomicity property.",
      ),
      explore(
        "Financial system design",
        "Currency precision, account locking, auditing, and distributed effects exceed this demonstration.",
      ),
    ],
    terms: [
      term(
        "Transaction",
        "A group of database changes treated as a single commit or rollback unit.",
      ),
      term(
        "Atomicity",
        "The grouped changes take effect together or are undone together.",
      ),
      term(
        "Invariant",
        "A condition that must stay true; here the combined balance remains 150.",
      ),
      term("Commit", "Finalize a transaction's changes."),
      term(
        "Rollback",
        "Discard changes from the current uncommitted transaction.",
      ),
    ],
    walkthrough: [
      step(
        "Predict both outcomes",
        "Start at 100/50. Subtracting 30 then failing should restore 100/50; a complete transfer should produce 70/80.",
        "Both correct outcomes preserve a total of 150.",
      ),
      step(
        "Read transaction ownership",
        "Identify isolation_level=None, explicit BEGIN, the two UPDATE statements, and the commit/rollback paths. Values use ? parameters.",
        "No commit occurs between debit and credit.",
      ),
      step(
        "Run the deliberate interruption",
        "Save transfer.py, run it, and compare the printed injected failure and balances with your predictions.",
        "The failed operation leaves [(100,), (50,)]; the next complete operation yields [(70,), (80,)].",
      ),
      step(
        "Protect failure and success",
        "Add assertions for both individual values and total. In a fresh fixture try amount 200, catch IntegrityError, and confirm balances are unchanged. Reject zero/negative amounts before BEGIN.",
        "Each invalid or interrupted operation leaves a valid prior state; a successful operation moves value in the right direction.",
      ),
    ],
    commandDetails: [
      detail(
        "BEGIN",
        'db.execute("BEGIN") opens the explicit transaction before either UPDATE.',
        "Both updates belong to the same transaction.",
        "Beginning a transaction when another is already open can fail; this fixture owns one connection deliberately.",
      ),
      detail(
        "COMMIT",
        'db.execute("COMMIT") finalizes only after both UPDATE statements succeed.',
        "A successful 30 transfer leaves balances 70 and 80.",
        "Committing after only the debit would break the whole-operation contract.",
      ),
      detail(
        "ROLLBACK",
        'db.execute("ROLLBACK") undoes the open transaction\'s changes; the following raise propagates the original failure.',
        "After injected failure the original balances return.",
        "Rollback does not undo previously committed transactions or external side effects.",
      ),
      detail(
        "sqlite3.connect / UPDATE / CHECK",
        "isolation_level=None disables Python's implicit transaction opening in this pattern. UPDATE subtracts/adds bound amounts; CHECK(balance >= 0) rejects an excessive debit.",
        "The 200-unit debit fails with IntegrityError and is rolled back.",
        "A CHECK on one balance alone cannot ensure a matching credit occurred.",
      ),
      detail(
        "assert / SELECT ... ORDER BY / raise",
        "assert compares observed balances with the intended values. ORDER BY id makes comparisons stable. raise rethrows a failure after cleanup.",
        "Both row-level checks and the total invariant pass after recovery.",
        "A correct total alone misses transferring in the wrong direction; the fixed IDs assume both accounts exist.",
      ),
    ],
    readiness: [
      "Trace the interrupted operation without running it.",
      "Explain what row constraints cannot guarantee alone.",
      "Name the missing concurrency and account-existence requirements for a general transfer tool.",
    ],
  },
  "aws-availability": {
    startingPoint:
      "You can read Python records and sums. This lesson is a local arithmetic model and architecture drawing; do not create an AWS account or resource for it.",
    whyItMatters:
      "Availability claims must account for failure boundaries, surviving capacity, and stateful dependencies. Counting replicas is not enough to show users can still complete requests.",
    required: [
      "Distinguish Region, Availability Zone, host, and process, and identify shared failure dependencies.",
      "Calculate normal capacity and every one-Zone-loss case against the 90-rps target.",
      "Follow requests through application and durable state, and label modeled assumptions separately from measured behavior.",
    ],
    optional: [
      explore(
        "Detailed multi-Region architectures",
        "First understand one-Zone loss; cross-Region replication adds consistency, latency, routing, and cost questions.",
      ),
      explore(
        "AWS product configuration",
        "The required outcome is honest design reasoning; actual load-balancer/database failover needs a later authorized practical.",
      ),
    ],
    terms: [
      term(
        "Region",
        "A geographic AWS area containing multiple Availability Zones.",
      ),
      term(
        "Availability Zone",
        "A failure-isolated infrastructure boundary within a Region, potentially containing multiple data centers.",
      ),
      term(
        "Capacity",
        "The amount of work the model assumes can be served per second.",
      ),
      term(
        "Replica",
        "Another instance of application work or data; independence depends on where it runs.",
      ),
      term(
        "Stateless tier",
        "A replaceable application tier that externalizes state needed across replacements.",
      ),
    ],
    walkthrough: [
      step(
        "Do the arithmetic first",
        "For zone-a=60 and zone-b=60, compute total and remaining capacity after losing each zone.",
        "Normal capacity 120; each failure leaves 60, below target 90.",
      ),
      step(
        "Read the model",
        "Save capacity.py. Trace zones.items(), exclusion of failed, sum of survivors, and comparison with target_rps. Run python3 capacity.py.",
        "Both meets target values are False; worst surviving capacity is 60.",
      ),
      step(
        "Revise the assumption",
        "Change each zone's modeled capacity to 90 and assert every failure leaves at least the target.",
        "Normal capacity 180 and either one-zone-loss case leaves 90.",
      ),
      step(
        "Follow the state",
        "Draw client → load balancer → application → database. Add a database_available boolean to your model so unavailable state makes usable capacity zero.",
        "The diagram exposes a shared dependency even when web capacity remains sufficient.",
      ),
      step(
        "Write a real acceptance proposal",
        "Specify load, duration, error threshold, recovery target, and what to observe during a later controlled test. Mark current numbers synthetic.",
        "The proposed test is distinguished from this arithmetic simulation.",
      ),
    ],
    commandDetails: [
      detail(
        "python3 capacity.py",
        "Run the local saved capacity model; it contacts no AWS API.",
        "The two original failure cases each report 60 rps and False.",
        "Printed modeled numbers are not benchmarks of actual instances.",
      ),
      detail(
        "min",
        "min(remaining.values()) selects the weakest surviving capacity across all modeled failures.",
        "60 initially, 90 after the two-zone revision.",
        "An empty collection makes min fail; keep at least the intended modeled zones.",
      ),
      detail(
        "sum / items / comprehension / >=",
        "items supplies zone-name/capacity pairs; the comprehension excludes the failed zone; sum adds survivors; >= compares them with target_rps.",
        "Every modeled failure is evaluated, rather than testing one convenient case.",
        "Extra replicas on one host do not create independent physical failure domains.",
      ),
      detail(
        "assert",
        "Assert every calculated surviving case meets the stated target, then separately model whether required state is available.",
        "Assertions reject the original insufficient model.",
        "A passing capacity assertion cannot establish database failover, scaling delay, or request distribution.",
      ),
    ],
    readiness: [
      "Calculate three zones at 50 rps after one-zone loss.",
      "Explain backup versus already-serving replacement.",
      "State what a real test must measure before making an availability promise.",
    ],
  },
  "aws-operations": {
    startingPoint:
      "You can read JSON and distinguish application/network layers. Use timeline.py and invented records only; no AWS access or real log export is required.",
    whyItMatters:
      "Operators need to explain who changed what and whether users recovered. Audit events, request outcomes, and temporal correlation answer different parts of that question.",
    required: [
      "Distinguish account activity auditing from application logs and health metrics.",
      "Build an ordered, service-scoped timeline and separate observation, hypothesis, and alternative explanation.",
      "Test one reversible configuration change locally and define user-path recovery verification.",
    ],
    optional: [
      explore(
        "CloudTrail query products and retention design",
        "Coverage and event type matter, but this fixture does not require configuring a trail or buying log services.",
      ),
      explore(
        "Advanced causal inference",
        "The useful operational skill here is changing one variable and stating uncertainty.",
      ),
    ],
    terms: [
      term(
        "Audit event",
        "A record of an action and its actor/resource, not proof that the resulting application works.",
      ),
      term(
        "Metric",
        "A summarized measurement over a population and time window.",
      ),
      term(
        "Correlation",
        "Events occurring together or in sequence without necessarily proving cause.",
      ),
      term(
        "Mitigation",
        "An action reducing immediate impact while a durable fix is investigated.",
      ),
      term(
        "Runbook",
        "A repeatable inspection, decision, action, and verification procedure.",
      ),
    ],
    walkthrough: [
      step(
        "Order the evidence",
        "Save timeline.py and run it. Identify the change before the first bad request and the rollback before the next good sample.",
        "10:02 port change → 10:03 status 502 → 10:04 rollback → 10:05 status 200.",
      ),
      step(
        "Separate record meanings",
        "Label change/rollback as synthetic audit-like events and request records as application observations. State that they are not real CloudTrail schema.",
        "One request has status >=500; the fixture is explicitly invented.",
      ),
      step(
        "Scope to the affected service",
        "Add service fields and a healthy unrelated-service event. Filter request calculations by both kind and the affected service.",
        "Unrelated traffic does not dilute the report's error population.",
      ),
      step(
        "Test the hypothesis",
        "Write a pure function returning 200 when configured_port equals listening_port and 502 otherwise. Compare 8081 versus 8080 against a listener value of 8080.",
        "The model fails and recovers when only that setting changes; this still does not test a real proxy.",
      ),
      step(
        "Write the recovery decision",
        "Record symptom, suspect change, alternative cause, inspection, rollback criteria, repeated user-path checks, and escalation.",
        "Your runbook explains why one successful sample is limited evidence.",
      ),
    ],
    commandDetails: [
      detail(
        "sorted",
        'sorted(events, key=lambda event: event["time"]) returns a new list ordered by the time string.',
        "The consistent UTC strings appear in chronological order.",
        "Mixed timestamp formats or timezone offsets require parsing/normalization; do not assume arbitrary strings sort chronologically.",
      ),
      detail(
        "json.dumps",
        "json.dumps(event, sort_keys=True) serializes an event with alphabetized object keys for readable evidence.",
        "One structured event per print call.",
        "sort_keys sorts fields within each event; sorted orders the events themselves.",
      ),
      detail(
        "python3 timeline.py / sum / list filter",
        'Run the saved script; filter kind == "request" before sum counts boolean status >=500 values.',
        "The original sample error count is 1.",
        "Do not include change records, which lack status, or unrelated-service traffic.",
      ),
      detail(
        "ss -ltnp",
        "ss inspects sockets: -l listening, -t TCP, -n numeric addresses/ports, -p process information where permitted.",
        "A local listener can be compared with configured upstream port.",
        "Permission may hide process details; no row on one host does not prove the entire remote service is down.",
      ),
      detail(
        "assert / pure configuration function",
        "Compare the same synthetic listening_port with one changed configured_port. Assert the bad/restored outcomes.",
        "Only the suspected variable differs between the controlled cases.",
        "A local model supports reasoning but supplies no AWS operational evidence.",
      ),
    ],
    readiness: [
      "Name the audit versus health question.",
      "Explain the fixture's strongest hypothesis without calling it proven cause.",
      "Define verification after a rollback command succeeds.",
    ],
  },
  "terraform-modules": {
    startingPoint:
      "You completed terraform-local and can read shell values. Use an already-installed Terraform 1.4+ in a fresh terraform-modules folder with only this built-in resource; no credentials, backend, or cloud provider is needed.",
    whyItMatters:
      "Reusable infrastructure needs an understandable interface. Inputs, validation, and outputs let a caller use a module without copying its internal implementation into every environment.",
    required: [
      "Trace root argument → child variable → resource input → child output → root output.",
      "Create the two labeled files separately and run init, fmt, validate, and plan from the root.",
      "Review the one local resource before apply; reject prod and verify atlas-dev then atlas-test.",
    ],
    optional: [
      explore(
        "Publishing modules and version constraints",
        "Useful for shared libraries; a local child module is sufficient to learn the interface first.",
      ),
      explore(
        "Remote state and cloud providers",
        "They add credentials, concurrency, and real resource effects beyond this built-in local lesson.",
      ),
    ],
    terms: [
      term(
        "Module",
        "A directory of Terraform configuration; the root can call another directory as a child module.",
      ),
      term(
        "Input variable",
        "A named configurable value supplied to a module.",
      ),
      term("Output", "A selected value the module exposes to its caller."),
      term(
        "State",
        "Terraform's record connecting declared resources with tracked objects.",
      ),
      term(
        "Plan",
        "A preview of proposed changes, which must be reviewed before applying.",
      ),
    ],
    walkthrough: [
      step(
        "Lay out two modules",
        "Create main.tf at the lab root and modules/label/main.tf in the child folder. Copy only each file's labeled part, not both into one file.",
        "The root calls source=./modules/label; the child owns its environment variable/resource/output.",
      ),
      step(
        "Initialize and inspect",
        "From the root run terraform init, terraform fmt -recursive, terraform validate, and terraform plan. Read the proposed address.",
        "Only module.label.terraform_data.label is planned; no server or external cloud provider appears.",
      ),
      step(
        "Apply the reviewed local plan",
        "Run terraform apply, inspect the fresh plan again, and confirm only if it still matches this lab. Run terraform output label.",
        'The root output is "atlas-dev"; quotes indicate a displayed Terraform string.',
      ),
      step(
        "Test the interface boundary",
        "Set the root environment argument to prod and run plan to see validation rejection. Correct it to test, plan, apply the reviewed change, and read the output again.",
        "prod is rejected; the accepted revision yields atlas-test. State stays private.",
      ),
    ],
    commandDetails: [
      detail(
        "terraform fmt -recursive",
        "fmt formats Terraform source; -recursive includes child directories so both modules use consistent formatting.",
        "Files may be listed when changed; a repeat can produce no output.",
        "Formatting does not prove valid semantics or a safe architecture.",
      ),
      detail(
        "terraform validate",
        "After init resolves module/provider setup, validate checks configuration structure and internal consistency.",
        "Success confirms structural checks pass.",
        "Use plan with actual inputs to observe the prod rejection; do not assume validate approves every possible value.",
      ),
      detail(
        "terraform plan",
        "Preview proposed changes using the current source and state; inspect resource addresses, counts, and outputs.",
        "The first plan adds only the built-in terraform_data object.",
        "A plan can contain unintended changes if you run in the wrong folder.",
      ),
      detail(
        "terraform output",
        "terraform output label reads the root output named label after a successful apply.",
        '"atlas-dev" initially and "atlas-test" after the accepted edit.',
        "Outputs may be unknown before apply; outputs are not themselves cloud resources.",
      ),
      detail(
        "terraform init / apply",
        "init prepares this configuration and its local module. apply makes the reviewed changes and asks for confirmation; it is not a read-only command.",
        "Local state tracks the built-in fixture.",
        "Do not add providers/provisioners/backend settings or auto-approve an unexpected plan.",
      ),
      detail(
        "variable / validation / contains / module output",
        'contains(["dev","test"], var.environment) is the allowlist. module.label.label selects the child output, which exposes terraform_data.label.output.',
        "The interface accepts only dev/test and returns the constructed string.",
        "A valid input does not authorize a deployment; exclude state and saved plans from Git.",
      ),
    ],
    readiness: [
      "Trace all five interface links.",
      "Explain init/validate/plan/apply as separate stages.",
      "Show prod rejected without changing the accepted state.",
    ],
  },
  "terraform-state": {
    startingPoint:
      "You can use a local child module and review plans. Start a second fresh folder containing only the original terraform_data fixture; keep it separate from the previous module lab.",
    whyItMatters:
      "Renaming infrastructure source can change tracked addresses. An explicit migration lets a refactor preserve object identity instead of unintentionally replacing resources.",
    required: [
      "Explain resource type/name/address versus the tracked object's id.",
      "Compare a bare rename's remove/create plan with an explicit moved block plan; never apply the unintended replacement.",
      "Apply only the reviewed migration, compare before/after ids, and verify a final no-change plan.",
    ],
    optional: [
      explore(
        "Manual state surgery",
        "The required migration is expressed in source; direct state JSON editing is unnecessary and risky here.",
      ),
      explore(
        "Remote backend locking and recovery",
        "Know these controls need configuration and testing; local fixture success does not establish them.",
      ),
    ],
    terms: [
      term(
        "Resource address",
        "Terraform's configuration/state location, such as terraform_data.original.",
      ),
      term(
        "Object id",
        "The tracked object's identity, distinct from its configuration block name.",
      ),
      term(
        "moved block",
        "A declared mapping from an old address to its new address.",
      ),
      term(
        "Replacement",
        "Destroying one tracked object and creating another.",
      ),
      term("Convergence", "A subsequent plan proposing no further changes."),
    ],
    walkthrough: [
      step(
        "Create the initial identity",
        "Save the initial main.tf in the new folder. Run init, plan, and apply only the one built-in fixture. Record state list and state show terraform_data.original.",
        "One address and a nonsecret id exist before any rename.",
      ),
      step(
        "Observe the unsafe interpretation",
        "Rename only the resource label from original to renamed. Run terraform plan and record it; do not apply.",
        "Terraform proposes removing the old address and creating the new one.",
      ),
      step(
        "Declare the migration",
        "Add an active moved block with from=terraform_data.original and to=terraform_data.renamed on their own lines. Keep input unchanged; plan again.",
        "The plan recognizes the address move without recreating the unchanged object.",
      ),
      step(
        "Verify preservation",
        "Apply only the reviewed migration. Run state list, state show terraform_data.renamed, and a final plan. Compare the id with your original record.",
        "The address changes, the id remains the same, and the final plan has no changes.",
      ),
    ],
    commandDetails: [
      detail(
        "terraform state list",
        "Read the resource addresses tracked in this working configuration's state.",
        "terraform_data.original before migration; terraform_data.renamed afterward.",
        "An empty new directory has nothing to migrate; apply the initial fixture first.",
      ),
      detail(
        "terraform state show",
        "terraform state show terraform_data.original displays this fixture's tracked attributes; use the new address after migration.",
        "You can record the nonsecret id and input for comparison.",
        "Real state can contain credentials or sensitive values; do not publish arbitrary state output.",
      ),
      detail(
        "terraform plan",
        "Compare source addresses with tracked state and preview lifecycle changes.",
        "Bare rename proposes remove/create; moved mapping preserves the unchanged object.",
        "Input changes can complicate the comparison; isolate the rename.",
      ),
      detail(
        "moved { from / to }",
        "from names the old address; to names the new address. This records migration intent for users upgrading the configuration.",
        "Terraform can move the state address rather than replace the object.",
        "The commented teaching block must become active HCL; do not remove migration history prematurely.",
      ),
      detail(
        "terraform init / apply",
        "Initialize the fresh fixture, then apply only the reviewed creation and later reviewed address migration.",
        "The final state preserves the recorded id.",
        "State and saved plans belong outside public Git; sensitive display flags do not encrypt state.",
      ),
    ],
    readiness: [
      "Distinguish address and id.",
      "Show both contrasting plans.",
      "Explain the backup/access/locking controls this local test has not demonstrated.",
    ],
  },
  "docker-build": {
    startingPoint:
      "You completed docker-local and can make local HTTP requests. Docker with a working local Linux-container context must already exist. Use a fresh three-file build folder and verify your context before creating anything.",
    whyItMatters:
      "Containers deploy built artifacts, not your editor buffer. You need to identify what was packaged, what actually runs, and which network boundary exposes it.",
    required: [
      "Distinguish Dockerfile, build context, image, movable tag, image id, and running container.",
      "Explain every Dockerfile line and the loopback host-port mapping; run as the configured unprivileged user.",
      "Demonstrate that rebuilding a tag leaves an existing container unchanged, then replace and verify the new artifact.",
    ],
    optional: [
      explore(
        "Registry publishing and scanning",
        "These add supply-chain and authorization concerns; this local package lesson requires neither a registry nor a cloud deployment.",
      ),
      explore(
        "Multi-stage build optimization",
        "Useful for compiled applications; the three-file static fixture is sufficient now.",
      ),
    ],
    terms: [
      term(
        "Build context",
        "The selected directory of possible build inputs, named by the final dot.",
      ),
      term("Image", "Packaged filesystem layers and runtime configuration."),
      term(
        "Tag",
        "A name that can point to a different image after a rebuild.",
      ),
      term(
        "Container",
        "An instance created from an image, with its own runtime state.",
      ),
      term(
        "Publish",
        "Expose a container port through a selected host address/port.",
      ),
    ],
    walkthrough: [
      step(
        "Confirm scope and files",
        "Inspect docker context show and docker info for your local environment. Create Dockerfile, index.html, and .dockerignore separately in the fresh folder.",
        "The context is local; the folder contains no private configuration or keys.",
      ),
      step(
        "Build and run",
        "Run docker build -t atlas-expanded-web:1 . and the demonstrated named docker run command. Request the loopback URL with curl.",
        "The host receives Atlas release 1 at port 8094.",
      ),
      step(
        "Record the artifact",
        "Inspect the container's .Image and .Config.User. Explain how these differ from the tag spelling.",
        "An image id is recorded; runtime user is 10001:10001.",
      ),
      step(
        "Break the edit-equals-deploy assumption",
        "Change the HTML to release 2 and rebuild the same tag. Request the still-running container before replacing it.",
        "The old container still returns release 1.",
      ),
      step(
        "Replace and clean up",
        "Stop/remove only this lab container, start it again from the rebuilt tag, and verify release 2 plus the new image id. Stop/remove it afterward; keep the image for later lessons.",
        "The response follows the newly created container's image; unrelated containers are untouched.",
      ),
    ],
    commandDetails: [
      detail(
        "docker build",
        "docker build -t atlas-expanded-web:1 . gives the image a tag (-t); the final dot is the current context directory containing Dockerfile.",
        "A local image is built, possibly after downloading the base image.",
        "Do not use your whole home directory as context or treat an unavailable daemon as a completed build.",
      ),
      detail(
        "docker run",
        "--detach runs in background; --name selects this lab's container; --publish 127.0.0.1:8094:8080 maps host loopback 8094 to container 8080; the final argument is the image tag.",
        "The new container serves release 1 to the host URL.",
        "A name conflict or occupied host port is a setup conflict; inspect before removing anything.",
      ),
      detail(
        "docker inspect",
        "--format selects one field: {{.Image}} is the container's image id; {{.Config.User}} is its configured user.",
        "You record exact artifact identity and 10001:10001.",
        "Rebuilding the same tag does not change this existing container's image.",
      ),
      detail(
        "docker stop",
        "docker stop atlas-expanded-web asks only the named container to stop; docker rm atlas-expanded-web removes that stopped container's record.",
        "The named lab container disappears after removal.",
        "Do not use global prune commands or remove an unrelated existing container.",
      ),
      detail(
        "FROM / WORKDIR / COPY / USER / EXPOSE / CMD",
        "FROM chooses python:3.13-slim; WORKDIR sets /app; COPY --chown puts the selected file there; USER sets uid:gid; EXPOSE documents 8080; JSON-form CMD starts the local Python server.",
        "The process reads /app/index.html and listens inside the container on 8080.",
        "EXPOSE does not publish a host port; the base tag can change over time.",
      ),
      detail(
        'curl --noproxy "*" -fsS',
        "--noproxy '*' avoids proxies for this local request; -f fails on HTTP error; -s quiets progress; -S still shows errors. Use http://127.0.0.1:8094/index.html.",
        "The page's release text is returned.",
        "Host requests use 8094; inside-container traffic uses 8080.",
      ),
      detail(
        "docker context show / docker info / .dockerignore",
        "The read-only context/daemon inspection establishes target scope. .dockerignore excludes matching context files such as .env and *.key.",
        "You know the local target and selected build inputs.",
        "Ignoring patterns does not remove a secret already deliberately copied into an image layer.",
      ),
    ],
    readiness: [
      "Explain why rebuilding did not update the first response.",
      "Decode every part of the port mapping.",
      "Show the exact running image id and scoped cleanup.",
    ],
  },
  "docker-compose": {
    startingPoint:
      "The local atlas-expanded-web:1 image from docker-build exists, Docker Compose v2 is installed, and your Docker context is still local. Use a separate folder containing compose.yaml.",
    whyItMatters:
      "A declared service configuration makes launches reproducible. Health checking adds useful observations, but process state, endpoint health, and recovery remain different questions.",
    required: [
      "Explain the project name and validate rendered configuration before starting it.",
      "Decode the host mapping, health command, timing controls, and restricted container settings.",
      "Reproduce unhealthy status from a wrong path, inspect its actual diagnostic, and verify repaired health plus the user path.",
    ],
    optional: [
      explore(
        "Multi-service dependencies",
        "service_healthy is worth recognizing; the one-shot checker extension is optional after the single service is understood.",
      ),
      explore(
        "Persistent volumes",
        "This fixture is stateless; durable volume backup and lifecycle policies require a separate practical.",
      ),
    ],
    terms: [
      term(
        "Service",
        "A Compose definition of a container-based application component.",
      ),
      term(
        "Project",
        "The name grouping this Compose application's containers and networks.",
      ),
      term(
        "Health check",
        "A periodic command whose status answers one defined question about a container.",
      ),
      term("Interval", "The time between health-check attempts."),
      term(
        "Startup dependency",
        "A condition controlling initial service ordering, not a guarantee of continuous availability.",
      ),
    ],
    walkthrough: [
      step(
        "Read the two network positions",
        "Save compose.yaml. Identify host 8095, container 8080, and the health command's 127.0.0.1, which refers to the container itself.",
        "You can explain why the host and check use different ports.",
      ),
      step(
        "Validate and start",
        "Run docker compose -p atlas-expanded config, inspect it, then up -d. Use ps until checks complete and curl the host /index.html path.",
        "The service becomes healthy and the page responds through host loopback.",
      ),
      step(
        "Make only the check wrong",
        "Change the health command's path to /missing.html and run up -d again. Allow the configured retries to finish.",
        "The process can stay running while health eventually reports unhealthy.",
      ),
      step(
        "Inspect evidence",
        "Compare Compose logs with the container's .State.Health diagnostic using the lab's inspect command.",
        "The check's 404/error explains unhealthy status while the correct page can still work.",
      ),
      step(
        "Repair and remove the project",
        "Restore /index.html, apply with up -d, verify healthy plus the host request, then run down in this folder.",
        "Both checks recover; only this named project's containers/networks are removed.",
      ),
    ],
    commandDetails: [
      detail(
        "docker compose config",
        "docker compose -p atlas-expanded config parses and renders the file; -p fixes the project name.",
        "The merged configuration is readable before launch.",
        "Valid syntax does not prove the image or application will run.",
      ),
      detail(
        "docker compose up -d",
        "up creates/updates the declared project; -d keeps services in the background. Repeat after changing the service definition.",
        "The configured container starts or is recreated for the changed definition.",
        "Editing YAML alone does not apply the changed health command.",
      ),
      detail(
        "docker compose ps",
        "List this project's service/container state, including available health information.",
        "Running and healthy/unhealthy can be seen separately.",
        "Health transitions are delayed by interval, timeout, and retries.",
      ),
      detail(
        "docker compose down",
        "Remove this project's containers and networks after recording evidence.",
        "The named project is stopped and removed.",
        "Do not add unrelated global cleanup or assume down proves a persistent-volume recovery strategy.",
      ),
      detail(
        "healthcheck test / interval / timeout / retries / start_period",
        "CMD runs python directly; its -c argument is inline code fetching /index.html with a socket timeout. Checks run every 5s; timeout is 3s; retries 3; start_period gives startup grace.",
        "A good path passes; repeated bad-path checks eventually produce unhealthy.",
        "Unhealthy does not itself restart the container or guarantee user-facing behavior.",
      ),
      detail(
        "docker inspect --format / compose ps -q / logs",
        "ps -q web returns this project's container id; $(...) supplies it to inspect. {{json .State.Health}} shows check records; docker compose -p atlas-expanded logs shows process output.",
        "You see the failed check's evidence and the application's logs.",
        "Use this project folder/name so you inspect the intended container.",
      ),
      detail(
        "read_only / cap_drop / security_opt / curl",
        "read_only restricts the container filesystem; cap_drop ALL removes Linux capabilities; no-new-privileges restricts privilege gains. A host curl uses port 8095.",
        "The static-page fixture still works with these restrictions.",
        "These settings support this limited process; they are not a general production security certification.",
      ),
      detail(
        "depends_on: condition: service_healthy",
        "For an optional dependent checker, this waits for web's health condition during startup; service-name DNS lets it request http://web:8080/index.html.",
        "A one-shot dependent checker can start after initial health passes.",
        "The dependency may fail later; startup ordering supplies no continuous retry policy.",
      ),
    ],
    readiness: [
      "Explain running versus healthy.",
      "Show the actual failed check diagnostic.",
      "Explain why startup ordering and continuous recovery are separate.",
    ],
  },
  "cicd-artifacts": {
    startingPoint:
      "You can run Python tests, inspect files, and use Git branches. Use a new artifacts folder with release-v1, release-v2, and live subfolders; these are local files, not an external deployment.",
    whyItMatters:
      "A release pipeline needs confidence in the exact bytes it promotes and a verified way back. Testing source or rebuilding later can leave the delivered artifact different from what passed.",
    required: [
      "Distinguish source revision, built artifact, deployment location, and artifact digest.",
      "Test each candidate before promotion and leave the current live file unchanged on failure.",
      "Compare the promoted bytes and verify a rollback while distinguishing integrity from authenticity.",
    ],
    optional: [
      explore(
        "Signing and provenance attestations",
        "Know that a hash alone does not prove who built an artifact; implementing protected provenance is a further topic.",
      ),
      explore(
        "Hosted pipeline automation",
        "The required local contract precedes provider credentials, workflow permissions, and environment approvals.",
      ),
    ],
    terms: [
      term(
        "Artifact",
        "The packaged output to be delivered, here a saved index.html.",
      ),
      term(
        "Promotion",
        "Selecting an already-tested artifact for another delivery stage.",
      ),
      term(
        "Manifest",
        "A record associating expected file content with its digest.",
      ),
      term("Integrity", "Whether bytes match a trusted expected value."),
      term(
        "Rollback",
        "Returning to a preserved known-good release and verifying it again.",
      ),
    ],
    walkthrough: [
      step(
        "Create the first candidate",
        "Save verify_release.py and release-v1/index.html with the required title/heading. Run the verifier and capture its status.",
        "release contract passed and status 0.",
      ),
      step(
        "Identify and promote bytes",
        "Only after success, run sha256sum release-v1/index.html > release-v1.sha256. Copy that exact file to live/index.html and compare both digests.",
        "The content matches; the manifest records the original release path.",
      ),
      step(
        "Reject a bad candidate",
        "Create release-v2/index.html with the heading but no title. Run the verifier and recheck the live digest.",
        "The candidate returns 1; live still matches v1.",
      ),
      step(
        "Repair and promote v2",
        "Add its title, verify v2, record a separate digest, copy the verified bytes to live, and inspect content/digests.",
        "live matches the tested v2 bytes, not a rebuilt or edited candidate.",
      ),
      step(
        "Exercise recovery",
        "Copy the preserved v1 artifact back to live, compare its digest with v1, and rerun the behavior verifier on live.",
        "The earlier known-good release is readable and passes again.",
      ),
    ],
    commandDetails: [
      detail(
        "sha256sum",
        "sha256sum release-v1/index.html prints that file's SHA-256 digest and path; > release-v1.sha256 saves the manifest text.",
        "A digest identifies the tested bytes relative to the saved expectation.",
        "The redirection overwrites a manifest; preserve the original release instead of changing it in place.",
      ),
      detail(
        "sha256sum -c",
        "-c reads saved digest/path pairs and compares the named files with them.",
        "release-v1/index.html: OK when the preserved original matches.",
        "This manifest names release-v1, so checking it does not automatically check live/index.html.",
      ),
      detail(
        "python3 verify_release.py",
        "Pass the artifact path as the script's sole argument. sys.argv[1] selects it; the script reads UTF-8 and checks for its small title/heading contract.",
        "0 for passing content, 1 for readable invalid content, 2 for usage/read failure.",
        "This substring contract is a teaching check, not a complete browser/accessibility test.",
      ),
      detail(
        "mkdir -p / cp / cat",
        "Create only the named fixture folders. cp copies candidate bytes into live/index.html; cat inspects the delivered text.",
        "Promotion or rollback changes only the lab's live file.",
        "cp overwrites its target; never promote before the verifier succeeds.",
      ),
      detail(
        "Digest comparison / rollback",
        "Compare live's digest with the chosen artifact, then verify behavior on the delivered path after copying.",
        "The chosen known-good bytes are restored and the contract passes.",
        "An attacker changing both file and manifest can keep a matching hash; database changes may also prevent simple application rollback.",
      ),
    ],
    readiness: [
      "Show that rejected v2 left live unchanged.",
      "Explain what checking the saved manifest actually checks.",
      "Distinguish matching bytes, trusted origin, and usable rollback.",
    ],
  },
  "observability-signals": {
    startingPoint:
      "You understand a request-based SLI, Python dictionaries, and unit tests. Use only the five synthetic events in signals.py; no real customer logs or monitoring subscription is needed.",
    whyItMatters:
      "A useful service report connects user symptoms to a defined population and request evidence. An impressive number without its numerator, denominator, or time scope can mislead an incident response.",
    required: [
      "Distinguish logs, metrics, and traces, including what request ids do and do not provide.",
      "Define eligible requests and bad events before computing the rate; handle no data explicitly.",
      "Inspect latency and the failing request, test boundary/malformed cases, and propose an actionable alert.",
    ],
    optional: [
      explore(
        "Production percentile algorithms",
        "Understand slow-tail risk now; a five-row fixture is not enough to establish a reliable production p99.",
      ),
      explore(
        "Instrumentation vendors",
        "Signal definitions and response ownership matter before choosing a dashboard product.",
      ),
    ],
    terms: [
      term("Log", "An event record containing context and details."),
      term(
        "Metric",
        "A numerical summary over a defined population or time window.",
      ),
      term("Trace", "Related timed spans linking work across boundaries."),
      term(
        "Latency",
        "Elapsed duration for an operation, here measured in milliseconds.",
      ),
      term("Denominator", "The eligible population used to interpret a rate."),
    ],
    walkthrough: [
      step(
        "Define the calculation",
        "Read all five events. Count every fixture request as eligible and status >=500 as bad. Predict the rate and maximum duration.",
        "5 eligible, 1 bad, rate 0.2, maximum 800 ms.",
      ),
      step(
        "Run and correlate",
        "Save signals.py and run it. Find the request matching both server error and slowest duration.",
        "Durations are [15,20,25,30,800]; failed id is r3.",
      ),
      step(
        "Test absence and invalid data",
        "Write unit tests for empty, all-good, and mixed records. Add a missing-field record and implement an explicit reject-or-count-separately policy.",
        "Empty means None for unknown rate/max; malformed data cannot silently become a healthy observation.",
      ),
      step(
        "Change the population deliberately",
        "Add a health-check field and calculate a second labeled report excluding those records. Record the resulting numerator and denominator.",
        "Any changed rate has an explained changed population rather than an unexplained percentage.",
      ),
      step(
        "Connect observation to action",
        "For r3 list missing downstream timings and dependency evidence. Propose an alert specifying window, population, threshold, and response owner.",
        "Your report identifies an investigation and labels its synthetic sample limitations.",
      ),
    ],
    commandDetails: [
      detail(
        "json.dumps",
        "json.dumps(event, sort_keys=True) converts an event dictionary to structured JSON text with stable field ordering; import json when using this command-card extension.",
        "A shareable synthetic log record.",
        "The existing demo needs no json import because it prints ordinary Python values; adding dumps requires importing the module.",
      ),
      detail(
        "sum",
        'sum(record["status"] >= 500 for record in records) counts True comparisons as 1 and False as 0.',
        "1 bad event in the original fixture.",
        "Define eligible records first; missing fields require an explicit policy.",
      ),
      detail(
        "sorted",
        'sorted(record["duration_ms"] for record in records) returns durations in ascending order without changing the original event list.',
        "15, 20, 25, 30, and 800.",
        "A sorted toy list does not establish a representative percentile.",
      ),
      detail(
        "len / max / division / None",
        "len counts eligible records; bad/len computes the decimal rate; max selects the largest duration. The early empty check avoids division by zero and max on an empty set.",
        "0.2 error_rate and max_ms 800; empty returns unknown values.",
        "0.2 means 20%, not 0.2%; no observations do not mean zero failures.",
      ),
      detail(
        "python3 signals.py / unittest",
        "Run the saved calculation and use standard-library tests for boundary promises, following python-testing.",
        "The observed report agrees with your manually predicted fixture.",
        "A request_id supports correlation but does not automatically supply parent/child spans or distributed timing.",
      ),
    ],
    readiness: [
      "Explain the rate with its numerator and denominator.",
      "Describe no-data separately from zero errors.",
      "Name two extra observations needed to investigate r3.",
    ],
  },
  "security-threat-model": {
    startingPoint:
      "You can write unittest cases and understand a browser/server boundary. Use the invented alice/bob reports only; authenticated_user is an already-trusted input assumed by this fixture, not a login implementation.",
    whyItMatters:
      "A signed-in user still needs permission for a particular action on a particular object. Protecting data requires the decision at a trusted server boundary, not merely hiding a button.",
    required: [
      "Describe asset, actor, entry point, trust boundary, and a concrete denied action.",
      "Distinguish authentication from object-level authorization and use stored ownership rather than editable client claims.",
      "Test owner allowed, other user denied, anonymous denied, and missing object denied; prove a deliberate regression is caught.",
    ],
    optional: [
      explore(
        "Role hierarchies and support access",
        "The required owner-only rule should be understood first; the support-role challenge adds a separate policy.",
      ),
      explore(
        "Session protocol implementation",
        "Recognize the need for trusted session validation; this fixture intentionally does not implement it.",
      ),
    ],
    terms: [
      term(
        "Asset",
        "Something worth protecting, here private report contents.",
      ),
      term("Actor", "A person or process attempting an action."),
      term("Authentication", "Establishing the requester's identity."),
      term(
        "Authorization",
        "Deciding whether that identity may take this action on this object.",
      ),
      term(
        "Trust boundary",
        "A point where inputs enter a component with a different level of trust.",
      ),
    ],
    walkthrough: [
      step(
        "Draw the boundary",
        "Write client request → trusted identity validation → can_read → stored report. Identify which inputs a client could edit.",
        "The stored owner and validated identity are not replaced by an editable owner/user field.",
      ),
      step(
        "Save and run separately",
        "Save access.py and test_access.py as distinct files. Run python3 -m unittest -v from their folder.",
        "Four tests pass, including a signed-in nonowner denial.",
      ),
      step(
        "Prove the privacy check matters",
        "Replace only the final owner comparison with return True and rerun.",
        "test_other_user_denied fails; missing/anonymous guard cases remain denied.",
      ),
      step(
        "Restore and expand objects",
        "Restore the comparison, add a report owned by bob, and test both owners requesting each report.",
        "Each owner can read their own object and is denied the other's object.",
      ),
      step(
        "Write safe evidence",
        "Record actor, attempted action, object, rule, and allow/deny outcome. Name data to omit from logs.",
        "The threat is testable without publishing tokens, private report contents, or credentials.",
      ),
    ],
    commandDetails: [
      detail(
        "python3 -m unittest -v",
        "Run standard-library test discovery with verbose test names from the folder containing test_access.py.",
        "Initially four tests pass; the deliberate broad allow produces a relevant failure.",
        "A passing UI-button test alone cannot prove the server refuses unauthorized object reads.",
      ),
      detail(
        "assertFalse",
        'self.assertFalse(can_read("bob", self.reports, "r1")) requires a false permission result for a signed-in nonowner.',
        "The legitimate denial is protected by a regression test.",
        "Only testing anonymous rejection would miss access by another authenticated user.",
      ),
      detail(
        "dict.get / None / ==",
        "reports.get(report_id) returns None for unknown objects; missing identity/object returns False. == compares trusted identity with stored owner.",
        "Only the known authenticated owner is allowed.",
        "Do not build the trusted identity from a client-editable request field.",
      ),
      detail(
        "setUp / assertTrue / return",
        "unittest calls setUp before each test to create controlled reports. assertTrue checks owner access; return supplies the permission decision.",
        "Each test starts with the same independent fixture state.",
        "A global return True allows every nonanonymous user past the object boundary.",
      ),
      detail(
        "Test the second owner",
        "Add bob's stored report and cross-owner read assertions using the same trusted-identity assumption.",
        "Both own-object allows and cross-object denials are demonstrated.",
        "The tests prove this policy function, not real session verification, revocation, or every production route.",
      ),
    ],
    readiness: [
      "Explain why login is insufficient for report access.",
      "Identify which test catches a broad signed-in-user allow.",
      "State where real identity verification must occur.",
    ],
  },
  "kubernetes-workloads": {
    startingPoint:
      "You can read Kubernetes objects and use the local Docker image from docker-build. This practical needs already-installed kind/kubectl, a working local Docker context, and a new disposable atlas-expanded cluster; do not use a remote cluster.",
    whyItMatters:
      "A service can exist while routing to no usable backend. Diagnosing the declared selectors, discovered endpoints, readiness, and application path avoids unnecessary cluster recreation.",
    required: [
      "Relate Deployment replicas, Pod-template labels, Service selector, ports, readiness, and EndpointSlices.",
      "Scope every kubectl call to kind-atlas-expanded and namespace atlas-expanded.",
      "Reproduce selector failure while Pods stay healthy, then verify a repaired in-cluster Service-name request and cleanup.",
    ],
    optional: [
      explore(
        "Production cluster operations",
        "Single-node kind teaches mechanics; upgrades, multi-Zone failure, RBAC, and production capacity need further practical work.",
      ),
      explore(
        "Liveness and advanced probes",
        "Understand readiness here; adding restart behavior changes the recovery design.",
      ),
      explore(
        "Host port-forward",
        "Useful inspection, but it is optional because it does not prove cluster DNS/Service routing.",
      ),
    ],
    terms: [
      term(
        "Deployment",
        "A controller declaration managing a desired number of Pods through ReplicaSets.",
      ),
      term(
        "Pod",
        "A temporary Kubernetes execution unit containing the application container.",
      ),
      term("Selector", "Label requirements used to choose matching objects."),
      term(
        "EndpointSlice",
        "A resource describing discovered Service backends and conditions.",
      ),
      term(
        "Readiness",
        "Whether a Pod is considered ready for normal Service traffic.",
      ),
    ],
    walkthrough: [
      step(
        "Confirm the local target",
        "Inspect the Docker context and kind get clusters. Create only the new atlas-expanded cluster and load atlas-expanded-web:1 into it.",
        "kind-atlas-expanded exists and the local image is available without a registry pull.",
      ),
      step(
        "Apply scoped declarations",
        "Create the dedicated namespace, save workloads.yaml, and apply with the explicit context/namespace. Wait for rollout status and inspect Pod labels/endpoints.",
        "Two Pods are ready with app=atlas-web; matching ready backends appear.",
      ),
      step(
        "Test from inside",
        "Run the demonstrated kubectl exec request to http://web:8080/index.html from a web Pod.",
        "The page is returned through cluster DNS and the Service path, beyond merely inspecting object existence.",
      ),
      step(
        "Break the selector only",
        "Change only Service.spec.selector.app to wrong-app and reapply. Inspect EndpointSlices and rerun the same in-cluster request.",
        "Pods remain healthy but the Service loses usable matching backends and the request fails.",
      ),
      step(
        "Repair then remove",
        "Restore atlas-web, reapply, and verify ready endpoints plus the same request. Delete only the kind cluster created for this lab.",
        "The path recovers; kind get clusters no longer lists the disposable cluster.",
      ),
    ],
    commandDetails: [
      detail(
        "kind create cluster",
        "kind create cluster --name atlas-expanded creates a local cluster with that name and a kind-atlas-expanded kubeconfig context.",
        "The named disposable context becomes available.",
        "If that name already belongs to unrelated work, stop; never overwrite or delete it.",
      ),
      detail(
        "kind load docker-image",
        "kind load docker-image atlas-expanded-web:1 --name atlas-expanded copies the existing Docker image into the selected local cluster.",
        "imagePullPolicy: Never can start the specified image.",
        "ErrImageNeverPull indicates this image is unavailable in the node; do not weaken the policy to hide setup failure.",
      ),
      detail(
        "kubectl get endpointslices",
        "--context fixes the cluster; -n fixes namespace; -l kubernetes.io/service-name=web filters this Service; -o yaml shows endpoint conditions.",
        "Ready backends appear with correct labels; wrong selector yields no usable matches.",
        "A Service object alone does not establish endpoints or successful requests.",
      ),
      detail(
        "kubectl rollout status",
        "rollout status deployment/web waits on that Deployment; --timeout=120s bounds this wait.",
        "The Deployment reports successful readiness or a timed failure.",
        "Healthy Pods do not by themselves prove Service routing.",
      ),
      detail(
        "kubectl create namespace / apply -f / get pods --show-labels",
        "Create the dedicated namespace once; apply -f workloads.yaml reconciles the file in the scoped namespace; get pods --show-labels displays actual Pod labels.",
        "You can compare the actual app label with the Service selector.",
        "Edit only the Service selector for the intended experiment; Deployment selectors are a different concern.",
      ),
      detail(
        "kubectl exec deployment/web -- python -c",
        "exec selects a running web Pod; -- ends kubectl arguments; python -c executes inline request code there. http://web:8080 uses the Service name/port.",
        "A successful response tests the in-cluster path; mismatch gives an actual request failure.",
        "Host loopback requests or port-forwarding do not establish the same DNS/routing path.",
      ),
      detail(
        "kubectl port-forward / kind delete cluster",
        "Optional port-forward --address 127.0.0.1 service/web 8096:8080 exposes a selected backend for host inspection. Ctrl+C stops it; kind delete cluster --name atlas-expanded removes only the created cluster.",
        "Optional host inspection is separate; named-cluster cleanup is verified.",
        "Two replicas on one node cannot survive failure of that host; do not claim multi-Zone availability.",
      ),
      detail(
        "Manifest ports / probes / resources / securityContext",
        "Service port 8080 forwards to targetPort 8080. httpGet readiness requests /index.html. Requests reserve scheduling resources; limits cap usage. User 10001 and restricted privileges match this static image.",
        "The declared app listener, readiness target, and Service target agree.",
        "containerPort documents the port; it does not itself open a listener. A wrong targetPort differs from a selector with no endpoints.",
      ),
    ],
    readiness: [
      "Diagnose selector versus target-port failure using different evidence.",
      "Explain readiness versus liveness.",
      "Show recovered in-cluster response and explicit local cleanup.",
    ],
  },
  "reliability-incident": {
    startingPoint:
      "You can explain transactions, service signals, and release recovery. Use Python's sqlite3 and the provided script, which creates and damages only its own temporary database fixture.",
    whyItMatters:
      "A backup is useful only if it restores acceptable data in acceptable time. Recovery reporting must disclose the latest lost changes and exactly what portion of the incident was measured.",
    required: [
      "Use SQLite's supported backup API and restore into a separate disposable database.",
      "Predict and verify exact recovered rows, including the intentionally missing post-backup row.",
      "Distinguish RPO, RTO, measured restore stage, synthetic timestamps, and complete incident duration.",
    ],
    optional: [
      explore(
        "Continuous recovery and production backup services",
        "Backup frequency, retention, replication, and point-in-time recovery are further designs; the required skill is a verified local restore.",
      ),
      explore(
        "Full disaster-recovery exercises",
        "A local file restore does not test identity, infrastructure rebuilding, network recovery, or real customer load.",
      ),
    ],
    terms: [
      term(
        "Backup",
        "A consistent candidate input for recovery, whose usefulness must be tested.",
      ),
      term(
        "Restore",
        "Reconstructing usable data from a backup and verifying it.",
      ),
      term(
        "RPO",
        "Recovery point objective: the acceptable data-loss interval.",
      ),
      term(
        "RTO",
        "Recovery time objective: the acceptable time to restore service.",
      ),
      term(
        "Recovery point",
        "The data state represented by the selected backup.",
      ),
    ],
    walkthrough: [
      step(
        "Predict the state changes",
        "Read recovery.py before running: row 1 is committed, backup is made, row 2 is committed, then only the fixture's rows are deleted.",
        "Before incident: rows 1/2; after damage: count 0; restored: row 1 only.",
      ),
      step(
        "Run safe restoration",
        "Save and run python3 recovery.py without substituting any existing database paths. Compare the printed rows and timing.",
        "The assertion confirms the exact original row; the post-backup record is explicitly not recovered.",
      ),
      step(
        "Strengthen the check",
        "Add an explicit test that row 2 is absent as well as the exact row-1 content. Explain why merely finding a database file or count 1 is insufficient.",
        "Restored identity and content are checked rather than assumed.",
      ),
      step(
        "Compare objectives honestly",
        "Use labeled synthetic times: backup 10:00, later write 10:03, incident 10:05. Compare the five-minute-old recovery point with a two-minute RPO; separately choose a local restore-stage target before rerunning.",
        "The synthetic RPO is missed; measured restore-plus-verification time is reported with its narrow boundaries.",
      ),
      step(
        "Write the incident record",
        "Record detection, damage scope, recovery action, verification, lost record, and follow-up. Propose testing a more recent backup by actually restoring it.",
        "The report does not claim a complete production RTO exercise or recovery to the latest preincident state.",
      ),
    ],
    commandDetails: [
      detail(
        "Connection.backup",
        "source.backup(destination) copies database contents consistently through SQLite's connection API. live.backup(backup) creates the candidate; backup.backup(restored) restores into another file.",
        "The restored database contains the committed row existing at backup time.",
        "Copying arbitrary live database files can miss related journal state; do not substitute an unsafe filesystem copy.",
      ),
      detail(
        "time.perf_counter",
        "Record a starting counter before opening/restoring the backup, then subtract it after query verification. It measures elapsed duration, not a calendar timestamp.",
        "A nonnegative measured restore-and-verification duration.",
        "The measurement excludes earlier detection and decision time, so do not call it complete incident recovery duration.",
      ),
      detail(
        "SELECT COUNT(*)",
        'execute("SELECT COUNT(*) FROM notes").fetchone()[0] retrieves the scalar count from the first returned row.',
        "Damage yields count 0; the restored content assertion checks more than count alone.",
        "Count 1 could still contain the wrong row or text.",
      ),
      detail(
        "TemporaryDirectory / Path / connect / commit",
        "The context creates an owned disposable folder. Path builds its database paths; connect opens those fixture databases; commit makes the intended writes available before backup.",
        "Only files inside the temporary fixture are touched and then cleaned up.",
        "Do not replace these paths with an existing personal/work database.",
      ),
      detail(
        "DELETE FROM notes / ORDER BY / assert / close",
        "DELETE deliberately removes all rows only in this fixture. ORDER BY id makes output stable; assert compares exact recovered rows; close releases the connections before cleanup.",
        "Rows 1/2 → none → row 1, with the unrecovered row disclosed.",
        "The injected DELETE is not a repair command for real databases; the local exercise is not production disaster-recovery proof.",
      ),
    ],
    readiness: [
      "Explain why the latest write is absent.",
      "Distinguish the RPO violation from measured restore duration.",
      "Define a follow-up test that performs a restore rather than merely counts backup files.",
    ],
  },
};
