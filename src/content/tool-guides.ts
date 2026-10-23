import type { Lesson } from "./types";
import type { CommandLesson, CommandTopic } from "./study-types";
import { commandSyntax } from "./command-syntax";

// Teach program identity here; each lesson's existing commandDetails owns the
// precise invocation, expected output, and pitfalls for its individual commands.
const programs: Record<string, CommandTopic> = {
  navigation: {
    id: "tools-navigation",
    title: "pwd, cd, and ls: locate yourself",
    kind: "program",
    explanation:
      "In an Ubuntu terminal, pwd prints the current directory, cd is a Bash builtin that changes it, and ls lists directory entries. An operand names the directory; an option changes how a program reports it. None opens a graphical folder window.",
    example: "pwd\nls -la .\ncd ./notes",
    parts: [
      {
        token: "pwd",
        meaning: "Print the absolute path of this shell's current directory.",
      },
      {
        token: "ls -la .",
        meaning:
          "List all entries (-a), with metadata (-l), in the current directory (.).",
      },
      {
        token: "cd ./notes",
        meaning:
          "Change this shell into the existing notes subdirectory; cd normally prints nothing.",
      },
    ],
    expected:
      "pwd prints a path; ls prints entries; a successful cd changes the next pwd result. The notes directory must exist.",
    question: "Does ls ./notes move your shell into notes?",
    answer: "No. ls inspects it; cd ./notes changes the shell's directory.",
  },
  create: {
    id: "tools-create",
    title: "mkdir and touch: create practice fixtures",
    kind: "program",
    explanation:
      "mkdir creates directories. touch creates an empty file when it is missing, or updates timestamps when it already exists; it does not erase existing contents. Run these in the Ubuntu terminal, inside the named practice directory.",
    example:
      "mkdir -p ~/atlas-labs/example/notes\ntouch ~/atlas-labs/example/notes/checklist.txt",
    parts: [
      { token: "mkdir", meaning: "Make a directory." },
      {
        token: "-p",
        meaning:
          "Create missing parent directories and accept an already-existing directory.",
      },
      {
        token: "touch",
        meaning:
          "Create a missing file or update an existing file's timestamps.",
      },
      {
        token: "~/atlas-labs/example/notes/checklist.txt",
        meaning: "The file operand, under your Ubuntu home directory.",
      },
    ],
    expected:
      "Successful commands usually print nothing; ls can confirm the directory and file now exist.",
    question:
      "Will touching an existing report replace its text with an empty file?",
    answer: "No. touch changes its timestamps; it leaves the text intact.",
  },
  text: {
    id: "tools-text",
    title: "cat, echo, and printf: produce text",
    kind: "program",
    explanation:
      "cat copies a file's contents to standard output. Bash echo prints its arguments and usually a newline. printf prints according to a format, making repeated or structured output more predictable. These produce output; Bash redirection decides whether that output appears on screen or goes to a file.",
    example:
      "echo \"Atlas evidence\"\nprintf '%s: %s\\n' 'status' 'ready'\ncat ./note.txt",
    parts: [
      { token: "echo", meaning: "Print the following text arguments." },
      {
        token: "printf '%s: %s\\n'",
        meaning: "Print two text values (%s), a colon, and a newline (\\n).",
      },
      {
        token: "cat ./note.txt",
        meaning:
          "Read this existing file and send its bytes to standard output.",
      },
    ],
    expected:
      "The first two lines print text; cat prints note.txt or reports an error if it cannot read the file.",
    question: "Does echo know that note.txt should be a filename?",
    answer:
      "No. echo note.txt prints that text. A shell operator such as > is what redirects output into a file.",
  },
  copy: {
    id: "tools-copy",
    title: "cp and mv: copy versus relocate",
    kind: "program",
    explanation:
      "cp copies a source to a destination, preserving the source. mv renames or relocates the source, so its former pathname goes away on success. In these Ubuntu exercises, -i asks before overwriting an existing destination. Inspect both paths before answering any prompt.",
    example:
      "cp -i -- ./note.txt ./evidence/note.txt\nmv -i -- ./note.txt ./incident.txt",
    parts: [
      {
        token: "cp / mv",
        meaning:
          "Choose copy or move; the slash in this label means alternatives, not something to type.",
      },
      { token: "-i", meaning: "Ask before replacing an existing destination." },
      {
        token: "--",
        meaning: "End option parsing so later names are treated as operands.",
      },
      {
        token: "./note.txt ./evidence/note.txt",
        meaning:
          "Source first, destination second; the destination directory must already exist.",
      },
    ],
    expected:
      "cp leaves two copies; mv changes where the original is named. Successful operations are often silent.",
    question:
      "After a successful mv note.txt incident.txt, should note.txt still exist?",
    answer:
      "No. incident.txt names the moved file; use cp when the original must remain.",
  },
  remove: {
    id: "tools-remove",
    title: "rm and rmdir: remove a checked fixture",
    kind: "program",
    explanation:
      "rm removes directory entries for files; recursive rm can also remove directory trees. rmdir removes an empty directory and refuses a nonempty one. These terminal tools do not promise a graphical recycle bin. Use only the disposable paths from this lesson.",
    example: "ls -l ./discard.txt\nrm -i -- ./discard.txt\nrmdir ./empty",
    parts: [
      { token: "rm -i", meaning: "Ask before removing the named file." },
      {
        token: "-r",
        meaning:
          "For rm, descend into a directory tree; combining it with -i still requires care at every prompt.",
      },
      {
        token: "rmdir ./empty",
        meaning: "Remove only this directory, and only if it is empty.",
      },
    ],
    expected:
      "rm asks for confirmation; accepting removes discard.txt. rmdir fails if empty contains anything.",
    question:
      "Which tool deliberately refuses to remove a directory containing files?",
    answer:
      "rmdir. Its empty-directory requirement is useful protection in a cleanup exercise.",
  },
  search: {
    id: "tools-search",
    title: "find, grep, head, tail, and wc: narrow evidence",
    kind: "program",
    explanation:
      "find searches directory entries; grep selects matching text lines; head shows the beginning; tail shows the end; wc counts bytes, words, or lines. These are separate Ubuntu programs. A pipe can connect their output and input, but each program still performs its own job.",
    example:
      "find . -type f -name '*.log'\ngrep -n ERROR app.log\nhead -n 2 app.log\ntail -n 1 app.log\nwc -l app.log",
    parts: [
      {
        token: "find . -type f -name '*.log'",
        meaning:
          "Search below . for regular files whose names match the quoted pattern.",
      },
      {
        token: "grep -n ERROR app.log",
        meaning:
          "Select lines containing ERROR and show their line numbers; -q instead suppresses output and reports status.",
      },
      {
        token: "head -n 2 / tail -n 1",
        meaning: "Show the first two / last one lines of the file operand.",
      },
      {
        token: "wc -l",
        meaning:
          "Count newline characters; this represents lines for the newline-terminated lab fixtures.",
      },
    ],
    expected:
      "find prints paths, grep prints matching lines, head/tail print excerpts, and wc prints a count. grep status 1 means no matching line.",
    question:
      "In grep ERROR app.log | wc -l, which program selects errors and which counts them?",
    answer:
      "grep selects matching lines; wc -l counts the newline-terminated lines received through the pipe.",
  },
  help: {
    id: "tools-help",
    title: "type, history, and man: inspect the shell's tools",
    kind: "program",
    explanation:
      "Bash type reports how a command name resolves, such as a builtin or executable file. history shows remembered shell commands; it does not run them merely by listing them. man opens a program's local manual in a viewer, usually exited with q. Some minimal Ubuntu installations lack manual pages.",
    example: "type cd\ntype cat\nhistory\nman ls",
    parts: [
      { token: "type cd", meaning: "Ask Bash what cd means in this shell." },
      {
        token: "history",
        meaning:
          "Inspect the interactive shell's command history; avoid sharing private entries.",
      },
      {
        token: "man ls",
        meaning:
          "Open the manual for ls; ls is an operand here, not a second command being executed.",
      },
    ],
    expected:
      "type distinguishes builtins from executable paths. history prints numbered entries. man shows a manual or a missing-page message.",
    question: "Does man rm delete a file?",
    answer: "No. man displays rm's manual; rm is the manual topic operand.",
  },
  identity: {
    id: "tools-identity",
    title: "whoami, id, and groups: identify the actor",
    kind: "program",
    explanation:
      "Linux checks file access against user and group identities. whoami prints the current effective username, id reports user/group identifiers, and groups lists group memberships. Run them in the same Ubuntu environment where the file operation occurs.",
    example: "whoami\nid\ngroups",
    parts: [
      { token: "whoami", meaning: "Name the current effective user." },
      { token: "id", meaning: "Show numeric and named user/group identities." },
      {
        token: "groups",
        meaning: "Show the groups available to the current user.",
      },
    ],
    expected:
      "Output describes your Linux identity, which can differ from your Windows login identity.",
    question:
      "Does knowing a Windows account name tell you the effective user of an Ubuntu command?",
    answer: "No. Inspect the identity inside Ubuntu with whoami or id.",
  },
  permissions: {
    id: "tools-permissions",
    title: "chmod, chgrp, chown, and sudo: separate access changes",
    kind: "program",
    explanation:
      "chmod changes file permission bits; chgrp changes its group; chown changes its owner and optionally group. sudo asks to run a command as another user, commonly root, under local policy. sudo does not explain or repair an incorrect permission design. The fixture exercise uses chmod on a file you own.",
    example: "chmod 600 ./private-note.txt\nls -l ./private-note.txt",
    parts: [
      {
        token: "chmod 600",
        meaning:
          "Give owner read/write (6), group none (0), and others none (0).",
      },
      {
        token: "chmod u-r / chmod u+r",
        meaning:
          "Remove / add owner read permission; choose one complete command with the file operand.",
      },
      {
        token: "chgrp GROUP FILE / chown USER FILE",
        meaning:
          "Replace GROUP/USER/FILE with reviewed real values; these labels are reference forms, not commands to paste.",
      },
      {
        token: "sudo COMMAND",
        meaning:
          "Run the reviewed command under elevated authority only when the disposable lab explicitly requires it.",
      },
    ],
    expected:
      "ls -l reflects changed mode bits. Removing your own read bit makes an ordinary cat fail until you restore it.",
    question: "Which changes permission bits: chmod or sudo?",
    answer:
      "chmod. sudo changes the authority under which a command runs; the invoked command determines what changes.",
  },
  processes: {
    id: "tools-processes",
    title: "ps and top: inspect running work",
    kind: "program",
    explanation:
      "A process is a running program with a PID (process identifier). ps takes a snapshot; top repeatedly refreshes a process view and quits with q. Their reports show evidence, not a guarantee that a service is working correctly.",
    example: "ps -p 1 -o comm=\nps aux",
    parts: [
      {
        token: "ps -p 1",
        meaning: "Select PID 1, the initial process in this environment.",
      },
      {
        token: "-o comm=",
        meaning: "Print the command name column with an empty heading.",
      },
      {
        token: "ps aux",
        meaning:
          "Use ps's BSD-style option form to show processes across users; these letters are not filename operands.",
      },
      {
        token: "top",
        meaning:
          "Open a continuously refreshed terminal view; press q to leave it.",
      },
    ],
    expected:
      "PID 1 might be systemd or another process. A process list can change between observations.",
    question:
      "Does a process appearing in ps prove that HTTP requests succeed?",
    answer:
      "No. It proves the process existed at the snapshot; test the socket and original request separately.",
  },
  jobs: {
    id: "tools-jobs",
    title: "sleep, kill, jobs, fg, and bg: control your own work",
    kind: "program",
    explanation:
      "sleep waits for a duration. kill sends a signal to a PID; TERM requests termination. Bash jobs lists jobs launched from this shell, fg brings one to the foreground, and bg resumes a stopped job in the background. A shell job number such as %1 differs from an operating-system PID.",
    example:
      'sleep 120 &\natlas_pid=$!\nps -p "$atlas_pid"\nkill -TERM "$atlas_pid"',
    parts: [
      {
        token: "sleep 120",
        meaning:
          "Wait for 120 seconds; & asks Bash to launch it in the background.",
      },
      {
        token: "$!",
        meaning: "Bash's PID of its most recently launched background job.",
      },
      {
        token: "kill -TERM",
        meaning:
          "Request termination of the specific PID operand; use only the fixture you launched.",
      },
      {
        token: "jobs -l / fg %1 / bg %1",
        meaning:
          "List shell jobs with PIDs / foreground / resume the actual job number. These are alternative commands.",
      },
    ],
    expected:
      "The fixture appears in ps, then ends after TERM. A later ps may show no matching process once termination completes.",
    question:
      "Can you copy a PID from someone else's example and safely kill it?",
    answer:
      "No. Capture the PID of your own fixture with $! and inspect it first.",
  },
  services: {
    id: "tools-services",
    title: "systemctl and journalctl: inspect a managed service",
    kind: "program",
    explanation:
      "systemctl talks to systemd, Linux's service manager. status inspects a unit; start, stop, and restart change its lifecycle. journalctl reads the system journal. These lessons require systemd to be running as PID 1 before service-manager exercises can work.",
    example:
      "systemctl status cron --no-pager\njournalctl -u cron -n 20 --no-pager",
    parts: [
      {
        token: "status",
        meaning: "A systemctl subcommand that requests service state.",
      },
      {
        token: "cron",
        meaning:
          "The unit operand; this example inspects cron, not every service.",
      },
      {
        token: "journalctl -u cron -n 20",
        meaning: "Read up to the last 20 journal entries for the cron unit.",
      },
      {
        token: "--no-pager",
        meaning: "Print directly rather than opening an interactive viewer.",
      },
    ],
    expected:
      "State and available logs appear, or a useful unavailable-manager/unit/permission message. Log visibility depends on local permissions.",
    question: "Does journalctl -u nginx restart Nginx?",
    answer:
      "No. It reads logs for that unit; systemctl restart nginx would change the service.",
  },
  packages: {
    id: "tools-packages",
    title: "apt: inspect and manage Ubuntu packages",
    kind: "program",
    explanation:
      "apt is Ubuntu's package-management command. show reads package metadata, update refreshes available-package indexes, install changes installed software, and remove uninstalls a package. update alone does not upgrade installed software. Mutations need an authorized disposable system and usually elevated permission.",
    example: "apt show nginx",
    parts: [
      { token: "apt", meaning: "The package-management program." },
      {
        token: "show",
        meaning: "Read package metadata without installing it.",
      },
      { token: "nginx", meaning: "The package-name operand." },
      {
        token: "update / install / remove",
        meaning:
          "Different subcommands with different effects; follow the exact reviewed lab step before any mutation.",
      },
    ],
    expected:
      "apt show prints metadata from available local package indexes or reports it cannot locate the package.",
    question: "Will apt update by itself install Nginx?",
    answer:
      "No. It refreshes indexes. install nginx is the separate installation operation.",
  },
  resources: {
    id: "tools-resources",
    title: "df, du, and free: ask three different capacity questions",
    kind: "program",
    explanation:
      "df reports filesystem capacity, du totals the disk space used by selected paths, and free reports memory/swap information. Use these Ubuntu programs to inspect resources; none of these examples deliberately fills disk or memory.",
    example: "df -h .\ndu -sh ./evidence\nfree -h\ndf -i .",
    parts: [
      {
        token: "df -h .",
        meaning: "Report the filesystem containing . in readable byte units.",
      },
      {
        token: "du -sh ./evidence",
        meaning:
          "Summarize (-s) this directory's disk usage in readable units (-h).",
      },
      {
        token: "free -h",
        meaning:
          "Report memory and swap in readable units; available memory includes reclaimable capacity.",
      },
      {
        token: "df -i",
        meaning:
          "Report inode capacity, which counts filesystem objects rather than file bytes.",
      },
    ],
    expected:
      "Byte capacity, directory usage, memory, and inode reports can tell different stories; record the metric and units.",
    question: "Can a filesystem run out of inodes while byte space remains?",
    answer: "Yes. df -i can expose that; df -h measures a different capacity.",
  },
  network: {
    id: "tools-network",
    title: "ip and ping: inspect addresses, routes, and reachability",
    kind: "program",
    explanation:
      "Linux ip inspects or configures networking; the addr and route forms here only inspect it. ping sends ICMP echo probes and reports replies or loss. An ICMP result does not prove an HTTP service works, and some networks filter ICMP.",
    example: "ip addr\nip route\nip -6 route\nping -c 3 127.0.0.1",
    parts: [
      {
        token: "addr / route",
        meaning: "ip objects: interface addresses / routing information.",
      },
      { token: "-6", meaning: "Ask ip for IPv6 information." },
      {
        token: "ip route get 203.0.113.10",
        meaning:
          "Ask which route Linux would select for that documentation address; it does not send an application request.",
      },
      {
        token: "ping -c 3 127.0.0.1",
        meaning:
          "Limit the probe to three packets targeting IPv4 loopback, this environment itself.",
      },
    ],
    expected:
      "ip prints current configuration; loopback ping normally returns replies. Route and interface names vary by machine.",
    question: "Does a successful loopback ping prove port 8080 is listening?",
    answer:
      "No. It tests local IP reachability; ss and an HTTP request test the later layers.",
  },
  dns: {
    id: "tools-dns",
    title: "getent, dig, and nslookup: distinguish lookup paths",
    kind: "program",
    explanation:
      "getent hosts asks Linux's configured host-name lookup system, which can include /etc/hosts and DNS. dig and nslookup query DNS and expose DNS-specific answers. A hostname is an operand; it is not a command. /etc/resolv.conf is a file describing resolver configuration.",
    example: "getent hosts localhost\ndig example.com\nnslookup example.com",
    parts: [
      {
        token: "getent hosts",
        meaning:
          "Read the hosts database through the system lookup configuration.",
      },
      {
        token: "localhost",
        meaning:
          "The name being resolved; often supplied by a local hosts file.",
      },
      {
        token: "dig / nslookup",
        meaning:
          "Alternative DNS-query programs; use whichever is installed and required by the lab.",
      },
      {
        token: "example.com",
        meaning:
          "A documentation hostname to look up, requiring working DNS/network access.",
      },
    ],
    expected:
      "getent prints addresses/names if found. dig/nslookup report DNS answers or DNS failures. Missing tools require installation guidance, not treating a shell error as a DNS result.",
    question:
      "If getent hosts localhost succeeds, have you proved external DNS works?",
    answer:
      "No. localhost can resolve from local configuration without a DNS request.",
  },
  sockets: {
    id: "tools-sockets",
    title: "ss: inspect socket listeners",
    kind: "program",
    explanation:
      "Linux ss reports sockets, the endpoints that processes use for network communication. A listening TCP socket can accept connections; it does not alone prove the application returns the correct content. Read the local address as well as the port.",
    example: "ss -ltn 'sport = :8080'",
    parts: [
      { token: "-l", meaning: "Show listening sockets." },
      {
        token: "-t / -u",
        meaning: "Select TCP / UDP; -tuln selects both kinds of listeners.",
      },
      { token: "-n", meaning: "Keep addresses and ports numeric." },
      {
        token: "'sport = :8080'",
        meaning: "A single quoted ss filter selecting source/local port 8080.",
      },
    ],
    expected:
      "A matching listener row appears when the local service is listening. No row is evidence about this selection, not every host or port.",
    question:
      "Does a listener on 127.0.0.1:8080 accept remote-machine traffic directly?",
    answer:
      "No. 127.0.0.1 is loopback for this environment; it is locally reachable.",
  },
  curl: {
    id: "tools-curl",
    title: "curl: make an HTTP request from a terminal",
    kind: "program",
    explanation:
      "curl is an HTTP-capable transfer program. It receives a URL operand and options describing the request, timeout, and reporting behavior. By default an HTTP error response can still count as a completed transfer; --fail makes qualifying HTTP error statuses produce failure status.",
    example: "curl --noproxy '*' -I --max-time 3 http://127.0.0.1:8080/",
    parts: [
      {
        token: "--noproxy '*'",
        meaning:
          "For this loopback lab, bypass configured proxies; quote * so Bash does not expand filenames.",
      },
      {
        token: "-I",
        meaning:
          "Request HTTP headers using HEAD; this differs from fetching the response body.",
      },
      {
        token: "--max-time 3",
        meaning: "Limit the whole curl operation to about three seconds.",
      },
      {
        token: "-f / -s / -S / -v",
        meaning:
          "Fail for HTTP errors / hide progress / still show errors / show verbose diagnostics; -fsS combines the first three.",
      },
    ],
    expected:
      "Headers or body appear for a reachable service; timeout/refusal/HTTP failures explain different boundaries. Verbose output can include sensitive headers, so use lab data.",
    question: "Does curl returning a 404 prove no server is listening?",
    answer:
      "No. A server returned an HTTP response; inspect the requested resource or application route.",
  },
  httpServer: {
    id: "tools-http-server",
    title: "python3 -m http.server: serve a local fixture",
    kind: "program",
    explanation:
      "Python includes an http.server module for simple file serving during local practice. -m tells the interpreter to run a module. The current directory becomes the served directory unless --directory says otherwise. Keep only the disposable public fixture there; this is a learning server.",
    example: "python3 -m http.server 8080 --bind 127.0.0.1",
    parts: [
      {
        token: "python3 -m http.server",
        meaning: "Launch Python's standard-library file-server module.",
      },
      {
        token: "8080",
        meaning: "Port operand: a number identifying this listener.",
      },
      {
        token: "--bind 127.0.0.1",
        meaning: "Listen on loopback inside this Ubuntu environment.",
      },
      {
        token: "Ctrl+C",
        meaning:
          "Press these keys in the server's terminal to stop it; do not type the key name.",
      },
    ],
    expected:
      "The server occupies Terminal A and logs requests. Use Terminal B in the same environment to run curl or ss.",
    question: "Why does the shell prompt disappear while the server runs?",
    answer:
      "The server is in the foreground. Leave it running for the test and use a second terminal; stop it with Ctrl+C afterward.",
  },
  nginx: {
    id: "tools-nginx",
    title: "Nginx: distinguish server, package, service, and config check",
    kind: "program",
    explanation:
      "Nginx is a web server. apt installs its Ubuntu package, systemctl manages its service, journalctl reads that service's logs, and nginx -t asks Nginx to validate configuration syntax and referenced files. The same name can identify different objects depending on the program receiving it.",
    example: "nginx -t",
    parts: [
      {
        token: "nginx",
        meaning:
          "Run the Nginx executable; in systemctl status nginx it would instead be a service-name operand.",
      },
      {
        token: "-t",
        meaning:
          "Test configuration without starting/restarting the service; reading protected files may require the lab's reviewed authority.",
      },
      {
        token: "curl http://127.0.0.1/",
        meaning:
          "A separate request test of the running service, not a configuration-syntax check.",
      },
    ],
    expected:
      "A successful check reports syntax/check success; errors identify a configuration or access problem. It does not prove a live HTTP response is correct.",
    question:
      "Does a successful nginx -t prove the service has been restarted with that configuration?",
    answer:
      "No. Validation and service lifecycle are separate operations; verify the original request after an authorized change.",
  },
  git: {
    id: "tools-git",
    title: "git: working files, staging area, and snapshots",
    kind: "program",
    explanation:
      "Git records repository history locally. init creates repository metadata; config sets this repository's identity; status reports changes; add stages selected contents; diff compares contents; commit records the staged snapshot; log reads history. A saved editor file is not automatically a Git commit.",
    example: "git status\ngit diff\ngit add README.md\ngit diff --staged",
    parts: [
      {
        token: "git",
        meaning: "The version-control program; the next word is a subcommand.",
      },
      {
        token: "status / diff",
        meaning:
          "Read the working/staging state / compare changes; these forms do not publish anything.",
      },
      {
        token: "add README.md",
        meaning:
          "Copy the current contents of this path into the staging area.",
      },
      {
        token: "diff --staged",
        meaning:
          "Inspect the staged change that the next commit would record; -m on commit supplies its message.",
      },
    ],
    expected:
      "Git reports the state of the current repository. git log --oneline prints short commit summaries; git rev-parse HEAD prints the current commit identifier.",
    question:
      "If you edit a file again after git add, is the second edit automatically staged?",
    answer: "No. Review and add the intended contents again before committing.",
  },
  branches: {
    id: "tools-git-branches",
    title: "Git branches, merges, and ignored files",
    kind: "program",
    explanation:
      "A branch names a line of Git history. branch lists/manages names; switch changes the current branch and -c creates one; merge integrates history. --ff-only allows only a simple forward move. A conflict needs an editor decision and a reviewed resolution. .gitignore is a text configuration file of untracked-path patterns, not a command.",
    example:
      "git switch -c docs-recovery\ngit status\ngit log --oneline --graph --all -6",
    parts: [
      {
        token: "switch -c docs-recovery",
        meaning:
          "Create and switch to the named branch in the current lab repository.",
      },
      {
        token: "merge --ff-only docs-recovery",
        meaning:
          "Integrate that branch only if no divergent-history merge is needed.",
      },
      {
        token: "merge --abort",
        meaning:
          "Abandon an in-progress merge when supported; check status and protect unrelated work first.",
      },
      {
        token: "--graph --all -6",
        meaning:
          "Draw branch relationships, include all branch references, and limit the log to six commits.",
      },
    ],
    expected:
      "status names the current branch and any unresolved files. An ignored file is not automatically untracked if it was already committed.",
    question: "Do you type .gitignore into Bash to enable ignored paths?",
    answer:
      "No. Save patterns in a file named .gitignore at the appropriate repository location.",
  },
  remotes: {
    id: "tools-git-remotes",
    title: "Git remotes: move history between repositories",
    kind: "program",
    explanation:
      "A remote is a configured repository address, which can be another local directory. clone creates a working copy; remote -v shows configured addresses; fetch downloads history without integrating your branch; pull --ff-only fetches then permits only a forward integration; push sends commits. init --bare makes a teaching remote without working files.",
    example:
      "git remote -v\ngit fetch origin\ngit log --oneline --graph --all -8",
    parts: [
      {
        token: "origin",
        meaning:
          "A conventional remote nickname; inspect what it actually points to before transfers.",
      },
      {
        token: "fetch",
        meaning:
          "Retrieve remote commits and update remote-tracking references.",
      },
      {
        token: "push -u origin main",
        meaning:
          "Send main and set its upstream; use only the intended local teaching remote in this lesson.",
      },
      {
        token: "clone / init --bare",
        meaning:
          "Create a working clone / a repository without a checked-out working tree.",
      },
    ],
    expected:
      "The local teaching repositories exchange commits. Fetch alone does not edit your current branch's working files.",
    question: "Does a remote always mean GitHub on the internet?",
    answer:
      "No. This lab uses local directory repositories, so it needs no account or network publication.",
  },
  bash: {
    id: "tools-bash",
    title: "Bash: the interpreter that runs your shell script",
    kind: "program",
    explanation:
      "Bash reads shell language and launches commands. Save a complete script as plain text, then bash FILE runs it in a child shell. export makes a variable available to launched processes; exit N ends the script with status N. Inside functions, local limits a variable's scope and return N ends the function instead of the whole script.",
    example: "bash read-report.sh 'report notes.txt'",
    parts: [
      {
        token: "bash",
        meaning:
          "Run the Bash interpreter; this is the program, not part of the filename.",
      },
      {
        token: "read-report.sh",
        meaning: "The saved script pathname, read by Bash.",
      },
      {
        token: "'report notes.txt'",
        meaning: "One argument available as $1 inside the script.",
      },
      {
        token: "#!/usr/bin/env bash",
        meaning:
          "A script's first-line interpreter hint for direct execution; bash FILE explicitly selects Bash anyway.",
      },
    ],
    expected:
      "The script produces output and a status according to its code. A script's exit does not close the parent shell when launched as bash FILE.",
    question:
      "Why save a script containing exit before running it with bash FILE?",
    answer:
      "It gives exit the child-script boundary intended by the example; pasting exit into your interactive shell would end that shell.",
  },
  python: {
    id: "tools-python",
    title: "python3: run a saved Python program",
    kind: "program",
    explanation:
      "python3 is the Python interpreter. It reads Python source, evaluates expressions, and calls functions. Save Python code in a .py file with a plain-text editor; use the Ubuntu terminal to launch it. Python statements such as import or def do not belong at the Bash prompt.",
    example: "python3 --version\npython3 inventory.py",
    parts: [
      {
        token: "python3",
        meaning: "The Python 3 interpreter executable in this environment.",
      },
      {
        token: "--version",
        meaning:
          "Ask the interpreter to report its installed version and exit.",
      },
      {
        token: "inventory.py",
        meaning:
          "A saved script operand, resolved from the current directory unless you supply a path.",
      },
      {
        token: "-m MODULE",
        meaning:
          "Alternative form that runs an installed Python module, used for unittest, venv, and http.server.",
      },
    ],
    expected:
      "The version check prints a version. Running the saved script prints its results or a traceback; an unsaved editor buffer cannot be executed by pathname.",
    question: "Does python3 inventory.py run whichever editor tab is active?",
    answer:
      "No. It reads the saved file at that path relative to the terminal's current directory.",
  },
  pythonData: {
    id: "tools-python-data",
    title: "Python values and builtins: calculate from records",
    kind: "program",
    explanation:
      "These are Python language objects and built-in functions, evaluated inside your .py program. list holds ordered items; dict maps keys to values. print displays values; len counts items; sum totals numbers (including True as 1); min/max select extremes; sorted returns a new ordered list. type and isinstance inspect value types before trusting input.",
    example:
      "values = [60, 60]\nprint(sum(values), min(values), sorted(values))",
    parts: [
      {
        token: "[60, 60]",
        meaning:
          "A list with two integer values; braces with key:value pairs form a dictionary.",
      },
      {
        token: "sum(values)",
        meaning: "Call the builtin to add all items, yielding 120.",
      },
      {
        token: "min(values)",
        meaning:
          "Return the smallest item, 60; empty input needs deliberate handling.",
      },
      {
        token: "sorted(values)",
        meaning:
          "Return items in order; key= can select a field for record ordering.",
      },
    ],
    expected:
      "The example prints 120 60 [60, 60]. A service model's result is evidence about its input assumptions, not a measurement of live infrastructure.",
    question:
      "In sum(record['status'] >= 500 for record in events), what is counted?",
    answer:
      "Each True comparison contributes 1, so it counts events whose status is at least 500.",
  },
  pythonFiles: {
    id: "tools-python-files",
    title: "pathlib and json: turn local text into checked data",
    kind: "program",
    explanation:
      "pathlib and json are Python standard-library modules. Path represents a filesystem path; read_text reads a file into a string. json.loads decodes a JSON string into Python values; json.dumps encodes Python values into JSON text. Decoding syntax does not prove values satisfy your application's contract.",
    example:
      "from pathlib import Path\nimport json\npayload = json.loads(Path('config.json').read_text(encoding='utf-8'))\nprint(json.dumps(payload, sort_keys=True))",
    parts: [
      {
        token: "Path('config.json')",
        meaning:
          "Create a path object relative to the process's current directory.",
      },
      {
        token: ".read_text(encoding='utf-8')",
        meaning: "Read and decode the file using an explicit text encoding.",
      },
      {
        token: "json.loads(...) / json.dumps(...)",
        meaning:
          "Decode JSON text / encode Python data. These are Python calls, not terminal programs.",
      },
      {
        token: "sort_keys=True",
        meaning: "Sort JSON object keys in the output for consistent evidence.",
      },
    ],
    expected:
      "The saved program prints JSON if reading, parsing, and later validation succeed; missing files or invalid input should follow its explicit error path.",
    question:
      "Does successful json.loads prove a field named port is an allowed integer?",
    answer:
      "No. Validate the decoded value's type and allowed range separately.",
  },
  tests: {
    id: "tools-python-tests",
    title: "unittest: turn a claim into a repeatable check",
    kind: "program",
    explanation:
      "unittest is Python's standard testing module. The terminal runs its test discovery; test classes and assertions belong in saved test_*.py files. assertEqual compares actual and expected values, assertRaises requires an exception, and assertTrue/assertFalse require truthy/falsey results. TemporaryDirectory supplies an automatically cleaned temporary fixture when used as a context manager.",
    example: "python3 -m unittest -v",
    parts: [
      {
        token: "-m unittest",
        meaning:
          "Ask Python to run its unittest module and discover tests from the current project.",
      },
      { token: "-v", meaning: "Report individual test names and outcomes." },
      {
        token: "self.assertEqual(actual, expected)",
        meaning:
          "An assertion inside a unittest.TestCase method; a mismatch fails the test.",
      },
      {
        token: "with self.assertRaises(ValueError):",
        meaning: "Require the indented operation to raise ValueError.",
      },
    ],
    expected:
      "Discovered tests report pass/fail/error and a final count. A run with zero tests is not evidence that the intended behavior was checked.",
    question:
      "If a test expected ValueError but no exception occurred, should the test pass?",
    answer:
      "No. assertRaises fails because the required rejection did not happen.",
  },
  pythonCli: {
    id: "tools-python-cli",
    title: "argparse and sys: define a program's input/output contract",
    kind: "program",
    explanation:
      "argparse parses your script's command-line options; its --help describes the interface you defined. sys.argv holds supplied arguments, sys.stderr is the error-output stream, and sys.exit or SystemExit returns a process status. These Python APIs are written inside a .py file; callers pass values from Bash.",
    example:
      "python3 report.py --input 'fixtures with spaces/health.json' --minimum 1",
    parts: [
      {
        token: "python3 report.py",
        meaning: "Launch the saved Python CLI program.",
      },
      {
        token: "--input",
        meaning:
          "An option declared by report.py, not a built-in Python interpreter option.",
      },
      {
        token: "'fixtures with spaces/health.json'",
        meaning: "One file-path argument despite containing spaces.",
      },
      {
        token: "--minimum 1",
        meaning:
          "Supply the script's health target; its parser converts and validates this value.",
      },
    ],
    expected:
      "--help prints usage; a valid invocation produces the script's result. Bash's immediately following echo $? reveals its exit status.",
    question:
      "Who defines the meaning of --minimum here: Bash, Python itself, or report.py?",
    answer:
      "report.py defines it through argparse. Bash passes the arguments to Python, which runs that script.",
  },
  venv: {
    id: "tools-venv",
    title: "venv: select an isolated Python environment",
    kind: "program",
    explanation:
      "venv is a Python standard-library module that creates a project environment with its own interpreter and package-install location. It does not make a virtual machine or install project dependencies automatically. The course examples can use the standard library without paid APIs.",
    example: "python3 -m venv .venv\n.venv/bin/python --version",
    parts: [
      {
        token: "-m venv",
        meaning:
          "Run the environment-creation module with the current Python interpreter.",
      },
      {
        token: ".venv",
        meaning:
          "The environment-directory operand inside this practice project.",
      },
      {
        token: ".venv/bin/python",
        meaning:
          "Explicitly select the created Linux environment's interpreter without needing activation.",
      },
      {
        token: "source .venv/bin/activate",
        meaning:
          "Optional Bash activation changes this shell's command search path; deactivate later leaves that activation.",
      },
    ],
    expected:
      "A .venv directory is created. Explicitly invoking its Python selects that environment; creating it alone does not change the current shell.",
    question:
      "Does creating .venv automatically make every later python3 command use it?",
    answer:
      "No. Activate it in that shell or invoke .venv/bin/python explicitly.",
  },
  urllib: {
    id: "tools-urllib",
    title: "urllib: make an HTTP request from Python",
    kind: "program",
    explanation:
      "urllib.request is Python's standard HTTP client library; urllib.error defines failure types. urlopen or an opener's open method returns a response object. HTTPError means an HTTP error response; URLError covers transport-related failure. The loopback demo builds an opener with ProxyHandler({}) to bypass proxy configuration.",
    example:
      "from urllib.request import urlopen\nwith urlopen('http://127.0.0.1:8093/status.json', timeout=3) as response:\n    body = response.read(65537)",
    parts: [
      {
        token: "urlopen(URL, timeout=3)",
        meaning:
          "Open the URL with a socket-operation timeout; it is not a guaranteed total program deadline.",
      },
      {
        token: "with ... as response",
        meaning: "Close the response when leaving this block.",
      },
      {
        token: ".read(65537)",
        meaning:
          "Read at most that many bytes so the lab can reject bodies exceeding 65536 bytes.",
      },
      {
        token: "HTTPError / URLError",
        meaning:
          "Python exception classes, caught in the saved program to classify failure.",
      },
    ],
    expected:
      "The program receives response bytes, then explicitly decodes, parses, and validates them; success at one layer does not guarantee success at the next.",
    question:
      "If the server returns malformed JSON with HTTP 200, which check should reject it?",
    answer:
      "The JSON parsing or application-contract validation after the HTTP request, not just transport-status handling.",
  },
  cidr: {
    id: "tools-ipaddress",
    title: "ipaddress: calculate address ranges without deploying",
    kind: "program",
    explanation:
      "Python's ipaddress module represents IP addresses and networks. IPv4Network parses a CIDR network; strict=True rejects host bits in a network address. subnets produces smaller ranges, num_addresses counts all addresses, overlaps checks shared ranges, and IPv4Address membership tests whether an address belongs to a network.",
    example:
      "from ipaddress import IPv4Network\nnetwork = IPv4Network('10.20.0.0/26', strict=True)\nprint(network.num_addresses)",
    parts: [
      {
        token: "'10.20.0.0/26'",
        meaning:
          "CIDR text: an aligned network address with 26 fixed prefix bits.",
      },
      {
        token: "strict=True",
        meaning:
          "Reject a non-network-aligned address rather than silently masking host bits.",
      },
      {
        token: ".num_addresses",
        meaning:
          "Total addresses, 64 for /26; a provider's reserved addresses are a separate rule.",
      },
      {
        token: "left.overlaps(right)",
        meaning: "Return True if the two network ranges share any address.",
      },
    ],
    expected:
      "This local calculation prints 64 and creates no networks or cloud resources.",
    question:
      "Does num_addresses automatically subtract a cloud provider's reservations?",
    answer:
      "No. It reports mathematical range size. The lesson explicitly applies its separate ordinary-AWS fixture rule.",
  },
  sqlite: {
    id: "tools-sqlite",
    title: "sqlite3: execute SQL inside a Python fixture",
    kind: "program",
    explanation:
      "Python's sqlite3 module embeds the SQLite database engine. connect(':memory:') creates a process-local database in memory. execute sends one SQL statement; executemany repeats one statement with parameter sets. fetchall/fetchone read result rows; commit completes a transaction, close releases the connection, and backup copies a database through SQLite's API.",
    example:
      "import sqlite3\ndb = sqlite3.connect(':memory:')\nprint(db.execute('SELECT ?', (7,)).fetchone())\ndb.close()",
    parts: [
      {
        token: "sqlite3.connect(':memory:')",
        meaning:
          "Open a new in-memory fixture, not an existing production database.",
      },
      {
        token: "execute('SELECT ?', (7,))",
        meaning:
          "Bind the value 7 to ? without assembling SQL text from input.",
      },
      {
        token: "(7,)",
        meaning: "A one-item Python tuple of bound values; the comma matters.",
      },
      { token: ".fetchone()", meaning: "Read one result row as a tuple." },
    ],
    expected:
      "The example prints (7,). SQL belongs in strings sent to SQLite, not at a Bash prompt; closing the in-memory database discards it.",
    question: "Why bind a name containing an apostrophe as a parameter?",
    answer:
      "SQLite treats it as a value rather than SQL syntax, preserving both correctness and the query/data boundary.",
  },
  recovery: {
    id: "tools-python-recovery",
    title: "tempfile and time: scope and measure a recovery rehearsal",
    kind: "program",
    explanation:
      "Python tempfile creates disposable fixtures; TemporaryDirectory owns a folder that is cleaned when its with block ends. time.perf_counter reads an elapsed-time clock; subtract two readings to measure the selected work. SQLite Connection.backup copies database state to another connection, so a restore must still be checked against expected rows.",
    example:
      "import time\nstarted = time.perf_counter()\n# Perform and verify the disposable fixture restore here.\nelapsed = time.perf_counter() - started",
    parts: [
      {
        token: "TemporaryDirectory",
        meaning:
          "Create a fresh temporary folder for this rehearsal, without substituting an existing database path.",
      },
      {
        token: "source.backup(destination)",
        meaning:
          "Copy from the source connection into the destination connection; direction matters.",
      },
      {
        token: "time.perf_counter() - started",
        meaning:
          "Seconds elapsed across the operations between the two readings.",
      },
      {
        token: "SELECT COUNT(*)",
        meaning:
          "A SQL query counting rows; a count alone does not prove every restored row is correct.",
      },
    ],
    expected:
      "The lesson's restore recovers only the pre-backup row, verifies its contents, and reports measured restore/verification time.",
    question:
      "Should a backup from before the second insert recover that second record?",
    answer:
      "No. That record lies after the backup's recovery point; report the loss honestly.",
  },
  terraform: {
    id: "tools-terraform",
    title: "Terraform: configuration, plan, state, and apply",
    kind: "program",
    explanation:
      "Terraform reads .tf configuration and compares desired objects with tracked state. init prepares the directory; fmt formats source; validate checks configuration; plan previews actions; apply performs the reviewed plan; show/output inspect results. state list/show inspect tracked identities. Here terraform_data is built in and the lab remains local.",
    example: "terraform fmt -recursive\nterraform validate\nterraform plan",
    parts: [
      {
        token: "terraform",
        meaning:
          "The CLI program, launched in the dedicated lab directory containing .tf files.",
      },
      {
        token: "fmt -recursive",
        meaning:
          "Format .tf files including child directories; this changes source formatting.",
      },
      {
        token: "validate / plan",
        meaning:
          "Check configuration validity / preview proposed changes after initialization.",
      },
      {
        token: "state list / state show ADDRESS",
        meaning:
          "Inspect tracked resource addresses / one object's state. State may contain sensitive values in real projects.",
      },
    ],
    expected:
      "A plan previews local fixture actions without applying them. A resource-name change can look like replacement until a valid moved block preserves its identity.",
    question: "Does terraform plan create the proposed resource?",
    answer:
      "No. It previews changes; apply is the separate mutation. Review the exact local scope first.",
  },
  docker: {
    id: "tools-docker",
    title: "Docker: image, container, context, and port mapping",
    kind: "program",
    explanation:
      "The Docker CLI talks to a container engine selected by its context. An image is a packaged filesystem/instructions; a container is an instance running a process from an image. build creates an image from a Dockerfile/build context; run starts a container; ps lists it; logs reads output; inspect reads metadata; stop requests shutdown. Check the local context before mutations.",
    example: "docker context show\ndocker ps\ndocker logs atlas-web",
    parts: [
      {
        token: "context show / info",
        meaning:
          "Inspect which engine the CLI targets and its available runtime information.",
      },
      {
        token: "build -t atlas-expanded-web:1 .",
        meaning:
          "Build/tag an image from the current directory's build context; Dockerfile instructions belong in a file.",
      },
      {
        token: "run / logs / inspect / stop",
        meaning:
          "Start a container / read its output / inspect its metadata / stop its process; use each lesson's exact arguments.",
      },
      {
        token: "-p 127.0.0.1:8080:80",
        meaning:
          "Publish loopback host port 8080 to container port 80; this mapping is an example, not a command by itself.",
      },
    ],
    expected:
      "Read-only inspections identify your engine and fixture containers. Stopping a container ends its listener; it does not erase the image used to create it.",
    question: "Is the image deleted when docker stop ends a container?",
    answer: "No. Images and container instances have separate lifecycles.",
  },
  compose: {
    id: "tools-compose",
    title: "Docker Compose: describe and inspect related services",
    kind: "program",
    explanation:
      "Compose is invoked as docker compose and reads a service-definition YAML file such as compose.yaml. config parses/resolves it; up -d creates/starts services in the background; ps reports them; down stops/removes this Compose project's containers and networks. A health check is a repeated command inside the container, distinct from merely seeing a running process.",
    example: "docker compose config\ndocker compose ps",
    parts: [
      {
        token: "docker compose",
        meaning:
          "Select the Compose CLI plugin against the already-verified Docker context.",
      },
      {
        token: "config",
        meaning:
          "Inspect the interpreted YAML; it can expose interpolated values, so use synthetic fixture configuration.",
      },
      {
        token: "up -d",
        meaning:
          "Start the described local services detached; review the configuration first.",
      },
      {
        token: "down",
        meaning:
          "Clean up this project's containers/networks; options that remove volumes have additional effects.",
      },
    ],
    expected:
      "config prints the interpreted service definition; ps reports runtime and health state after the lab has started it.",
    question: "Can a running container still be unhealthy?",
    answer:
      "Yes. Its process can exist while the configured request check fails.",
  },
  checksum: {
    id: "tools-checksum",
    title: "sha256sum: identify bytes and verify a manifest",
    kind: "program",
    explanation:
      "sha256sum computes a SHA-256 digest of file bytes. Identical digests support content equality; they do not independently establish who produced a file. -c reads expected digests/pathnames from a previously created manifest and compares the current files. Run it from the directory expected by relative manifest paths.",
    example: "sha256sum ./index.html\nsha256sum -c ./checksums.txt",
    parts: [
      {
        token: "sha256sum ./index.html",
        meaning: "Read this file and print its digest plus path.",
      },
      {
        token: "-c",
        meaning:
          "Check entries in a digest manifest rather than hash the manifest itself.",
      },
      {
        token: "./checksums.txt",
        meaning: "An existing manifest with expected hashes and file paths.",
      },
    ],
    expected:
      "Hashing prints a digest; checking reports OK or FAILED per manifest entry and a failure status for mismatches.",
    question:
      "After changing one byte of index.html, should its old manifest check still pass?",
    answer:
      "No. Its digest changes; the old checksum should report a mismatch.",
  },
  kubectl: {
    id: "tools-kubectl",
    title: "kubectl: ask a particular Kubernetes cluster",
    kind: "program",
    explanation:
      "kubectl is a client for the Kubernetes API. A context selects a cluster/user/namespace combination, so inspect it before any command. get lists resources; describe reports detail/events; rollout status waits for a controller's rollout; apply changes objects from a manifest. A Service selector must match Pod labels to select its backends.",
    example:
      "kubectl config current-context\nkubectl get pods\nkubectl get endpointslices",
    parts: [
      {
        token: "config current-context",
        meaning:
          "Report the selected context; it does not switch to a safer one automatically.",
      },
      {
        token: "get pods / get endpointslices",
        meaning:
          "List Pods / Service endpoint collections in the selected namespace.",
      },
      {
        token: "describe RESOURCE NAME",
        meaning:
          "Reference form for inspecting one resource; replace the placeholders with the lab's actual values.",
      },
      {
        token: "rollout status deployment/web",
        meaning:
          "Observe rollout progress for the Deployment named web; it is not a fix by itself.",
      },
    ],
    expected:
      "Read operations show the selected cluster's state, or a connection/authorization error. In the reading-only lesson, predict these outputs from the paper scenario.",
    question: "Do two running Pods prove a Service selects either of them?",
    answer:
      "No. Compare the Service selector with Pod labels and inspect its endpoint collections.",
  },
  kind: {
    id: "tools-kind",
    title: "kind: a Kubernetes lab using local containers",
    kind: "program",
    explanation:
      "kind runs local Kubernetes nodes as Docker containers. create cluster creates that local cluster and a kubectl context; load docker-image copies a locally built image into its nodes. It requires the reviewed local Docker environment and enough local resources. It is separate from kubectl, which operates objects through the cluster API.",
    example: "kind get clusters",
    parts: [
      { token: "kind", meaning: "The local-cluster lifecycle program." },
      {
        token: "get clusters",
        meaning: "List kind cluster names without creating a cluster.",
      },
      {
        token: "create cluster --name atlas-expanded",
        meaning:
          "Create the dedicated named fixture only after checking that name is unused by unrelated work.",
      },
      {
        token: "load docker-image atlas-expanded-web:1 --name atlas-expanded",
        meaning:
          "Copy this existing local image into this named cluster, without pushing a registry image.",
      },
    ],
    expected:
      "Inspection shows existing local clusters; the practical creates and uses only the dedicated atlas-expanded fixture and later removes it using the lab's cleanup step.",
    question:
      "Does kind load docker-image publish the image to a public registry?",
    answer:
      "No. It imports the local image into the selected kind cluster's nodes.",
  },
  powershell: {
    id: "tools-powershell",
    title: "PowerShell: cmdlets send objects through pipelines",
    kind: "program",
    explanation:
      "PowerShell is the interpreter for this Windows lesson. A cmdlet is a PowerShell command, commonly named Verb-Noun. Get-Location reports the current path; Get-Process lists processes; Get-Service lists Windows services; Select-Object chooses properties/items; Where-Object filters objects. This pipeline passes structured objects, unlike the Bash text streams used earlier.",
    example: "Get-Process | Select-Object -First 5 Name, Id",
    parts: [
      {
        token: "Get-Process",
        meaning: "Produce process objects in the Windows PowerShell session.",
      },
      { token: "|", meaning: "Send those objects to the next command." },
      {
        token: "Select-Object -First 5",
        meaning: "Keep the first five received objects.",
      },
      {
        token: "Name, Id",
        meaning: "Choose these two object properties for the result.",
      },
    ],
    expected:
      "A table shows up to five process names and IDs. The command belongs in PowerShell, not the Ubuntu Bash terminal.",
    question:
      "In Get-Service | Where-Object Status -eq Running, what is compared?",
    answer:
      "Each service object's Status property is compared with Running; Where-Object keeps the matching objects.",
  },
  aws: {
    id: "tools-aws-cli",
    title: "AWS CLI: identify the principal before inspection",
    kind: "program",
    explanation:
      "aws is the AWS command-line client. It uses your approved authentication/session configuration and sends requests to AWS APIs. sts selects the Security Token Service; get-caller-identity reports the caller's account and identity. This read operation does not create EC2, VPC, or S3 resources and is only one piece of the field checkpoint.",
    example: "aws sts get-caller-identity",
    parts: [
      {
        token: "aws",
        meaning:
          "The installed AWS CLI, run in the environment containing your approved authenticated session.",
      },
      { token: "sts", meaning: "Select the AWS service API." },
      {
        token: "get-caller-identity",
        meaning: "Select the identity-inspection operation.",
      },
      {
        token: "Account / Arn / UserId",
        meaning:
          "Identity fields in the response; redact account-specific details in public evidence.",
      },
    ],
    expected:
      "The configured principal's identity is returned, or an authentication/configuration error. Confirm the intended sandbox before following separately reviewed field steps.",
    question:
      "Does get-caller-identity prove that the principal can read every S3 object?",
    answer:
      "No. It identifies the caller; authorization for a particular S3 action/resource needs separate evidence.",
  },
};

type EntryMode = CommandLesson["entries"][number]["mode"];
type Surface =
  | "desktop"
  | "browser"
  | "ubuntu"
  | "python"
  | "terraform"
  | "docker"
  | "kubernetes"
  | "windows"
  | "planning"
  | "aws";
type Profile = {
  environment: Surface;
  orientation: string;
  tools: string[];
  syntax: string[];
  mode: EntryMode;
  overrides: Record<string, EntryMode>;
  editor?: string;
  demoMode: EntryMode;
  demoWhere: string;
};
const environments: Record<Surface, string> = {
  desktop: "Your desktop file manager and plain-text editor.",
  browser: "A desktop web browser and its built-in developer tools.",
  ubuntu: "An Ubuntu Bash terminal in your own WSL2 instance or disposable VM.",
  python:
    "A plain-text editor for .py files, plus an Ubuntu Bash terminal to launch Python 3.",
  terraform:
    "A plain-text editor for .tf files, plus Terraform CLI in a fresh local practice directory.",
  docker:
    "A plain-text editor for container configuration, plus an Ubuntu terminal targeting your verified local Docker engine.",
  kubernetes:
    "A plain-text editor for YAML, plus kubectl targeting only the reviewed local lab context.",
  windows:
    "Windows PowerShell; these commands use Windows objects and cmdlets.",
  planning:
    "A written worksheet, diagram, or reading exercise; no shell is required for the sketch.",
  aws: "Your own approved AWS sandbox and authenticated AWS CLI session.",
};

function p(
  environment: Surface,
  orientation: string,
  tools: string[],
  syntax: string[],
  demoMode: EntryMode,
  demoWhere: string,
  mode: EntryMode = "terminal",
  overrides: Record<string, EntryMode> = {},
  editor?: string,
): Profile {
  return {
    environment,
    orientation,
    tools,
    syntax,
    mode,
    overrides,
    editor,
    demoMode,
    demoWhere,
  };
}
const terminalDemo =
  "Type these commands one line at a time in the Ubuntu Bash terminal. Comments beginning with # explain the next step; omit any displayed prompt. Inspect results before proceeding.";
const pythonDemo = (file: string) =>
  `Save this Python source in ${file} with your plain-text editor, then run python3 ${file} from its directory in the Ubuntu terminal. Do not paste Python source into Bash.`;
const bashDemo = (file: string) =>
  `Save this complete Bash script as ${file}, then run bash ${file} with the lesson's required arguments from the Ubuntu terminal. Read the validation branches before running it.`;
const referenceDemo =
  "Read this sketch as a model and record your prediction in the worksheet; these lines are not executable commands.";

// Every catalog lesson deliberately chooses its own tools, notation, and surface.
// Do not infer execution mode from a slash, uppercase word, or code fence alone.
const profiles: Record<string, Profile> = {
  "computing-basics": p(
    "desktop",
    "Use windows, menus, and Save in the named apps. File manager and Text editor are tool categories, not words to execute in a terminal.",
    [],
    ["gui-actions"],
    "graphical",
    "Follow the numbered actions in your desktop file manager and plain-text editor; save welcome.txt and reopen that saved file.",
    "graphical",
  ),
  "web-foundations": p(
    "browser",
    "Use the browser address bar to navigate, then inspect a request in Developer Tools → Network. A URL and its labeled diagram are not shell commands.",
    [],
    ["browser-tools"],
    "reference",
    "Read the URL anatomy and request/response arrows, then inspect the actual page in your desktop browser.",
    "graphical",
  ),
  orientation: p(
    "ubuntu",
    "Open Ubuntu first. A command has a program name followed by arguments; create and enter the dedicated directory before collecting evidence.",
    ["navigation", "create", "help"],
    ["shell-basics", "paths-quotes"],
    "terminal",
    terminalDemo,
  ),
  "terminal-map": p(
    "ubuntu",
    "Your terminal's current directory determines what relative paths mean. Tab completion is a keyboard action while composing a command, not a command named Tab completion.",
    ["navigation", "create"],
    ["shell-basics", "paths-quotes"],
    "terminal",
    terminalDemo,
    "terminal",
    { "Tab completion": "reference" },
  ),
  "terminal-files": p(
    "ubuntu",
    "Run file operations only in this lesson's practice tree. Learn which program creates text and which Bash operator directs it to a file before composing the command.",
    ["navigation", "create", "text", "copy"],
    ["shell-basics", "paths-quotes", "redirect-out"],
    "terminal",
    terminalDemo,
  ),
  "terminal-cleanup": p(
    "ubuntu",
    "Inspect each disposable operand before confirming removal. Wildcards are patterns expanded by Bash; they are not programs and should be previewed before a removal command.",
    ["navigation", "create", "remove"],
    ["shell-basics", "paths-quotes", "globs"],
    "terminal",
    terminalDemo,
    "terminal",
    { "Wildcards * and ?": "reference" },
  ),
  "terminal-streams": p(
    "ubuntu",
    "The named programs produce/consume text, while Bash handles >, >>, <, 2>, and |. These symbols need a surrounding command; a symbol alone is reference notation.",
    ["navigation", "create", "text", "search"],
    [
      "shell-basics",
      "redirect-out",
      "redirect-append",
      "redirect-in",
      "redirect-error",
      "pipe",
    ],
    "terminal",
    terminalDemo,
    "reference",
  ),
  "terminal-search": p(
    "ubuntu",
    "Build a tiny known log first, then trace paths, matching lines, and counts through the separate search programs.",
    ["navigation", "create", "text", "search"],
    ["paths-quotes", "globs", "redirect-out", "redirect-append", "pipe"],
    "terminal",
    terminalDemo,
  ),
  "terminal-control": p(
    "ubuntu",
    "Bash resolves program names and records exit status. Read $? immediately after the operation you are checking; && and || decide whether the next command runs.",
    ["navigation", "create", "text", "search", "help"],
    ["shell-basics", "expansion", "status-control", "redirect-out"],
    "terminal",
    terminalDemo,
    "terminal",
    { $PATH: "reference", "$?": "reference", "&& / ||": "reference" },
  ),
  "editor-workflow": p(
    "python",
    "Use the editor to save source and Bash to launch the exact saved pathname. The active editor tab and the terminal's current directory are separate state.",
    ["python", "text", "navigation"],
    ["script-vs-shell", "python-syntax", "paths-quotes"],
    "editor",
    pythonDemo("hello.py"),
  ),
  "linux-permissions": p(
    "ubuntu",
    "Check Linux identity and mode bits before changing access. The lab changes only your own fixture; account/group/ownership administration has a separate authority boundary.",
    ["identity", "permissions", "navigation", "create", "text"],
    ["paths-quotes", "redirect-out"],
    "terminal",
    terminalDemo,
  ),
  "linux-processes": p(
    "ubuntu",
    "Launch your own sleep fixture, capture its real PID, inspect it, then send TERM only to that fixture. Job launch and variable expansion are Bash syntax.",
    ["processes", "jobs"],
    ["jobs-signals", "expansion", "paths-quotes"],
    "terminal",
    terminalDemo,
  ),
  "linux-jobs": p(
    "ubuntu",
    "This exercise is interactive. Ctrl+Z and Ctrl+C are keys; %1 is a shell job reference only if your jobs output shows that job number.",
    ["jobs"],
    ["jobs-signals"],
    "terminal",
    "Use the same interactive Ubuntu Bash terminal for sleep, jobs, bg, and fg. When comments say Ctrl+Z or Ctrl+C, press the keys instead of typing their names.",
    "terminal",
    { "&": "reference", "Ctrl+Z / Ctrl+C": "reference" },
  ),
  "linux-services": p(
    "ubuntu",
    "Confirm PID 1 and inspect a service before discussing lifecycle changes. Reading status, reading logs, refreshing package indexes, and installing software are different operations.",
    ["processes", "services", "packages"],
    ["shell-basics"],
    "terminal",
    terminalDemo,
  ),
  "linux-resources": p(
    "ubuntu",
    "Name the resource and units for each observation. A directory's usage, a filesystem's remaining bytes/inodes, and available memory are different measurements.",
    ["create", "text", "resources"],
    ["paths-quotes", "redirect-out"],
    "terminal",
    terminalDemo,
  ),
  "network-addresses": p(
    "ubuntu",
    "Read the local environment's interfaces and routes, then probe loopback. A reachable address and a listening application are separate claims.",
    ["network"],
    ["shell-basics"],
    "terminal",
    terminalDemo,
  ),
  "network-dns": p(
    "ubuntu",
    "Start with the system's host lookup path. Resolver-file content, DNS queries, and an ICMP probe answer different questions; do not edit resolver configuration in this lesson.",
    ["dns", "text", "network"],
    ["paths-quotes", "expansion", "status-control"],
    "terminal",
    terminalDemo,
  ),
  "network-http": p(
    "ubuntu",
    "Terminal A runs the local server; Terminal B sends requests in the same Ubuntu environment. Identify the listener and HTTP result separately.",
    ["help", "navigation", "create", "text", "httpServer", "sockets", "curl"],
    ["paths-quotes", "redirect-out", "jobs-signals"],
    "terminal",
    "Use Terminal A for setup and the foreground Python server. Keep it running; execute only the labeled Terminal B commands in a second Ubuntu terminal. Stop Terminal A with Ctrl+C after verification.",
  ),
  "troubleshoot-nginx": p(
    "ubuntu",
    "Use only your isolated Nginx lab service. Package installation, service state, logs, sockets, HTTP, and configuration validation form separate evidence checks.",
    ["packages", "processes", "services", "sockets", "curl", "nginx"],
    ["shell-basics", "paths-quotes"],
    "terminal",
    terminalDemo,
  ),
  "troubleshoot-layers": p(
    "ubuntu",
    "Service evidence and Socket evidence are reasoning labels, not CLI commands. The demo uses real read-only commands to distinguish name lookup, listening sockets, and file paths.",
    ["services", "sockets", "curl", "network", "dns", "navigation"],
    ["workflow-reading", "paths-quotes"],
    "terminal",
    terminalDemo,
    "reference",
  ),
  "git-basics": p(
    "ubuntu",
    "Git runs inside the fresh lab repository. Review working contents, staged contents, then the recorded snapshot; the demo's identity settings stay in this local repository.",
    ["git", "navigation", "create", "text"],
    ["shell-basics", "paths-quotes", "redirect-out"],
    "terminal",
    terminalDemo,
  ),
  "git-branches": p(
    "ubuntu",
    "Stay in the clean practical repository. Git subcommands act on history, while .gitignore is a text file you edit to describe ignored untracked paths.",
    ["git", "branches", "navigation", "text"],
    ["paths-quotes", "redirect-append", "config-files"],
    "terminal",
    terminalDemo,
    "terminal",
    { ".gitignore": "editor" },
    ".gitignore in the current lab repository",
  ),
  "git-conflicts": p(
    "ubuntu",
    "Inspect status in Bash, resolve the actual document in your editor, then stage and commit the reviewed result. Conflict-marker text is file content, not executable shell syntax.",
    ["git", "branches"],
    ["workflow-reading", "script-vs-shell"],
    "editor",
    "Read the conflict markers in the affected text file, choose the final intended content in your editor, and save it before returning to Bash for Git inspection/staging.",
    "terminal",
    {},
    "the conflicted document in the lab repository",
  ),
  "git-collaboration": p(
    "ubuntu",
    "Inspect the remote address before transferring history. This lesson's remote is another local teaching repository; the commands do not require a hosted account.",
    ["git", "branches", "remotes"],
    ["shell-basics", "paths-quotes"],
    "terminal",
    terminalDemo,
  ),
  "github-workflow": p(
    "ubuntu",
    "Git and grep run in a terminal; workflow YAML is saved in the repository. The YAML's run value is a shell command executed later by a workflow runner, subject to the lesson's account/limit review.",
    ["git", "search"],
    ["config-files", "workflow-reading"],
    "editor",
    "Save the YAML as .github/workflows/docs.yml in the lab repository. The run: value contains a shell command for the workflow runner; do not paste the surrounding YAML into Bash.",
    "terminal",
    { "Workflow location": "editor" },
    ".github/workflows/docs.yml in the lab repository",
  ),
  "bash-values": p(
    "ubuntu",
    "Edit a script, then launch it with Bash and arguments. Assignments, quoted expansions, positional parameters, and export are shell-language forms rather than separate installed programs.",
    ["bash", "text"],
    ["script-vs-shell", "shell-basics", "expansion", "paths-quotes"],
    "editor",
    bashDemo("show-input.sh"),
    "editor",
    {},
    "show-input.sh; then launch it with bash show-input.sh and a sample argument",
  ),
  "bash-decisions": p(
    "ubuntu",
    "The script must reject invalid arguments before reading a file. Conditional keywords and tests belong to the saved Bash script; cat is the program launched after validation.",
    ["bash", "text"],
    [
      "script-vs-shell",
      "shell-flow",
      "expansion",
      "paths-quotes",
      "redirect-error",
      "status-control",
    ],
    "editor",
    bashDemo("read-report.sh"),
    "editor",
    {},
    "read-report.sh; then run bash read-report.sh with the fixture file path",
  ),
  "bash-health": p(
    "ubuntu",
    "Save the health-check script and provide an allowed local URL. curl performs the request; Bash branches on its exit status and reports failure truthfully.",
    ["bash", "curl", "text"],
    [
      "script-vs-shell",
      "shell-flow",
      "expansion",
      "redirect-out",
      "redirect-error",
      "status-control",
    ],
    "editor",
    bashDemo("health.sh"),
    "terminal",
    { exit: "editor" },
    "health.sh",
  ),
  "bash-loops": p(
    "ubuntu",
    "Iterate over the disposable fixture directory with quoted paths. The shell expands the glob and command substitution; wc counts each selected file and printf reports the result.",
    ["bash", "text", "search"],
    [
      "script-vs-shell",
      "shell-flow",
      "globs",
      "expansion",
      "paths-quotes",
      "redirect-in",
      "redirect-error",
      "command-substitution",
    ],
    "editor",
    bashDemo("count-logs.sh"),
    "editor",
    {},
    "count-logs.sh; pass the fixture directory when launching it",
  ),
  "bash-functions": p(
    "ubuntu",
    "Save the function and its call in a script. Function scope, arguments, and return statuses control when cp is allowed; sha256sum can independently compare the copied bytes afterward.",
    ["bash", "copy", "text", "checksum"],
    [
      "script-vs-shell",
      "shell-flow",
      "expansion",
      "paths-quotes",
      "redirect-error",
      "status-control",
    ],
    "editor",
    bashDemo("copy-report.sh"),
    "editor",
    { sha256sum: "terminal" },
    "copy-report.sh; pass the reviewed source and destination paths",
  ),
  "python-data": p(
    "python",
    "Lists, dictionaries, and def/return are Python source. Run the saved program with python3; predict the calculation from its synthetic records before interpreting its output.",
    ["python", "pythonData"],
    ["script-vs-shell", "python-syntax"],
    "editor",
    pythonDemo("inventory.py"),
    "editor",
    { "python3 inventory.py": "terminal" },
    "inventory.py",
  ),
  "python-files-json": p(
    "python",
    "The file/JSON APIs are calls in Python source. Save the demo and config.json separately; parse and validate local input before reporting success.",
    ["python", "pythonFiles", "pythonData", "pythonCli"],
    ["script-vs-shell", "python-syntax", "config-files"],
    "editor",
    pythonDemo("validate_config.py"),
    "editor",
    {},
    "validate_config.py, with the separate config.json fixture in its working directory",
  ),
  "python-testing": p(
    "python",
    "Production functions and test assertions belong in separate saved Python files. Run unittest from their project directory and check the discovered test count.",
    ["python", "pythonData", "tests"],
    ["script-vs-shell", "python-syntax"],
    "editor",
    "Save the first section as ports.py and the second as test_ports.py in the same practice directory. Run python3 -m unittest -v there in the Ubuntu terminal.",
    "editor",
    { "python3 -m unittest -v": "terminal" },
    "ports.py and test_ports.py",
  ),
  "python-cli": p(
    "python",
    "The demo defines a CLI inside report.py. Its --input and --minimum options are interpreted by your script, while echo $? is a separate Bash check after the program exits.",
    ["python", "pythonCli", "pythonFiles", "pythonData", "text"],
    [
      "script-vs-shell",
      "python-syntax",
      "paths-quotes",
      "status-control",
      "expansion",
    ],
    "editor",
    "Save this source as report.py. In the Ubuntu terminal run python3 report.py --help, then pass --input with the path of your synthetic JSON fixture and --minimum with the intended target. The script requires --input; launching it without that option deliberately produces a usage error.",
  ),
  "python-inventory": p(
    "python",
    "Create the local environment, save the inventory script and JSON fixture, then launch the chosen interpreter. Environment creation and running tests are distinct commands.",
    ["python", "venv", "pythonFiles", "pythonData", "tests"],
    ["script-vs-shell", "python-syntax", "config-files"],
    "editor",
    pythonDemo("inventory.py"),
  ),
  "python-http-api": p(
    "python",
    "The HTTP client code belongs in a .py file. A separate foreground terminal serves the disposable JSON fixture; the client checks transport, HTTP, decoding, and application data in order.",
    [
      "python",
      "urllib",
      "httpServer",
      "pythonFiles",
      "pythonData",
      "pythonCli",
    ],
    ["script-vs-shell", "python-syntax", "jobs-signals"],
    "editor",
    pythonDemo("fetch_status.py"),
    "editor",
    { "python3 -m http.server": "terminal" },
    "fetch_status.py outside the served fixture folder; server commands go in a separate terminal inside that folder",
  ),
  "network-cidr": p(
    "python",
    "The local Python fixture calculates ranges without contacting AWS. Treat IPv4Network and overlaps as Python API calls and keep mathematical capacity separate from provider-specific reservations.",
    ["python", "cidr", "pythonData"],
    ["script-vs-shell", "python-syntax"],
    "editor",
    pythonDemo("cidr_plan.py"),
    "editor",
    { "python3 cidr_plan.py": "terminal" },
    "cidr_plan.py",
  ),
  "cloud-packet": p(
    "ubuntu",
    "Read the arrows as a request-path model. The two terminal diagnostics inspect route choice and an HTTPS exchange; neither is the whole cloud path by itself.",
    ["network", "curl"],
    ["workflow-reading", "shell-basics"],
    "reference",
    referenceDemo,
  ),
  "cloud-model": p(
    "planning",
    "Compare responsibilities and tradeoffs in the worksheet. This lesson has no executable command entries and requires no cloud provisioning.",
    [],
    ["workflow-reading"],
    "reference",
    referenceDemo,
    "reference",
  ),
  "database-sql": p(
    "python",
    "Save the Python wrapper; SQL strings are passed to SQLite by execute. Bind values as parameters, and distinguish the Python API call from the SQL language inside its string.",
    ["python", "sqlite"],
    ["script-vs-shell", "python-syntax", "sql-syntax"],
    "editor",
    pythonDemo("query_inventory.py"),
    "editor",
    {},
    "query_inventory.py; SQL goes inside the demonstrated sqlite3 calls",
  ),
  "database-transactions": p(
    "python",
    "BEGIN, COMMIT, and ROLLBACK are SQL statements sent by the saved Python program to its in-memory SQLite fixture. They are not Bash commands or real bank operations.",
    ["python", "sqlite", "pythonData"],
    ["script-vs-shell", "python-syntax", "sql-syntax"],
    "editor",
    pythonDemo("transfer.py"),
    "editor",
    {},
    "transfer.py; transaction SQL is executed through db.execute",
  ),
  "aws-plan": p(
    "planning",
    "Write the design and cost/cleanup boundaries before any provider activity. This planning lesson contains no executable commands and does not provision a sandbox.",
    [],
    ["workflow-reading"],
    "reference",
    referenceDemo,
    "reference",
  ),
  "aws-availability": p(
    "python",
    "Run only a local synthetic capacity calculation. Python min and sum evaluate the model; no AWS client is involved and no live service capacity is measured.",
    ["python", "pythonData"],
    ["script-vs-shell", "python-syntax"],
    "editor",
    pythonDemo("capacity.py"),
    "editor",
    { "python3 capacity.py": "terminal" },
    "capacity.py",
  ),
  "aws-operations": p(
    "python",
    "Sort and serialize synthetic events in a saved Python program. JSON output is an evidence format, and its modeled timeline should not be mistaken for real provider observations.",
    ["python", "pythonData", "pythonFiles"],
    ["script-vs-shell", "python-syntax"],
    "editor",
    pythonDemo("timeline.py"),
    "editor",
    {},
    "timeline.py",
  ),
  "aws-field": p(
    "aws",
    "The identity command is an actual read-only AWS request. The demo is a checklist to fill with your own redacted evidence; resource-changing field work follows separately reviewed official guidance.",
    ["aws"],
    ["shell-basics", "workflow-reading"],
    "reference",
    "Read the checklist, then fill it with actual redacted observations from your approved sandbox. Do not paste the checklist labels into a terminal.",
  ),
  "terraform-local": p(
    "terraform",
    "Save HCL source in main.tf; Terraform commands run from its fresh directory. This exercise uses the built-in terraform_data resource and local state.",
    ["terraform"],
    ["config-files", "script-vs-shell"],
    "editor",
    "Save this Terraform/HCL configuration as main.tf in the new local lab directory. Run the lesson's terraform init/plan/apply commands from that directory after reviewing the local plan.",
  ),
  "terraform-modules": p(
    "terraform",
    "Save root and child HCL files at their labeled paths. Terraform loads configuration as a project; the module's source is a local directory, not a shell command.",
    ["terraform"],
    ["config-files", "script-vs-shell"],
    "editor",
    "Save the root section as main.tf and the child section as modules/label/main.tf. Run Terraform commands from the root practice directory, not inside an unrelated project.",
  ),
  "terraform-state": p(
    "terraform",
    "Work only with this local fixture's state. Edit the resource name and moved block in main.tf, then inspect the plan before deciding whether to apply.",
    ["terraform"],
    ["config-files", "workflow-reading"],
    "editor",
    "Save the initial HCL as main.tf in the new lab directory. Follow the comments as staged editor changes after the initial apply; uncomment the moved block only at the specified step.",
  ),
  "docker-local": p(
    "docker",
    "Verify that Docker targets your own local engine. Container lifecycle commands and curl observe different parts of the running service.",
    ["docker", "curl"],
    ["shell-basics", "jobs-signals"],
    "terminal",
    terminalDemo,
  ),
  "docker-build": p(
    "docker",
    "Dockerfile instructions, HTML content, and ignore patterns are separate saved files. docker build reads their directory as the build context; the CLI does not interpret Dockerfile lines as shell commands.",
    ["docker", "httpServer"],
    ["config-files", "script-vs-shell"],
    "editor",
    "Save each labeled section separately: Dockerfile, index.html, and .dockerignore in the dedicated build directory. Then use the lesson's docker build command from that directory.",
  ),
  "docker-compose": p(
    "docker",
    "Save service YAML as compose.yaml. Compose runs from that project directory; the healthcheck array launches Python inside the container rather than in your host shell.",
    ["docker", "compose", "python", "urllib"],
    ["config-files", "script-vs-shell"],
    "editor",
    "Save this YAML as compose.yaml next to the local service files. The healthcheck is container-side Python embedded as YAML data; run docker compose commands from the project directory.",
  ),
  "ci-contract": p(
    "ubuntu",
    "git rev-parse reads the local commit identity. The demo is workflow YAML; its run step launches unittest on a configured runner only after the lesson's account/limit review.",
    ["git", "python", "tests"],
    ["config-files", "workflow-reading"],
    "editor",
    "Save this YAML under .github/workflows/check.yml in the lab repository. The run: value is a runner shell command; the surrounding keys are YAML, not Bash.",
  ),
  "cicd-artifacts": p(
    "python",
    "The verifier is saved Python source; sha256sum is a separate terminal program. Test the exact local release file and compare its bytes before promoting the fixture.",
    ["python", "pythonFiles", "pythonCli", "checksum"],
    ["script-vs-shell", "python-syntax", "paths-quotes", "redirect-out"],
    "editor",
    "Save this source as verify_release.py. After creating the lesson's release-v1/index.html fixture, run python3 verify_release.py release-v1/index.html from the artifacts directory. The verifier requires the release-file argument; do not launch it without one when testing the successful case.",
  ),
  "reliability-sli": p(
    "planning",
    "Calculate the fraction and budget from the stated request counts. The demo's equations are worksheet notation; this lesson has no executable command entries.",
    [],
    ["workflow-reading"],
    "reference",
    referenceDemo,
    "reference",
  ),
  "observability-signals": p(
    "python",
    "Calculate signals only from the synthetic Python events. json.dumps, sum, and sorted are Python APIs, not terminal command names; define the eligible requests before interpreting rates.",
    ["python", "pythonData", "pythonFiles"],
    ["script-vs-shell", "python-syntax"],
    "editor",
    pythonDemo("signals.py"),
    "editor",
    {},
    "signals.py",
  ),
  "reliability-incident": p(
    "python",
    "Save and run the self-contained recovery fixture. Its temporary database files, backup direction, row assertions, and elapsed-time measurement are part of the result to explain.",
    ["python", "sqlite", "pythonFiles", "pythonData", "recovery"],
    ["script-vs-shell", "python-syntax", "sql-syntax"],
    "editor",
    pythonDemo("recovery.py"),
    "editor",
    {},
    "recovery.py; keep the demonstrated temporary-database boundary intact",
  ),
  "security-review": p(
    "planning",
    "Annotate the synthetic design and explain the smallest needed access. This is a review worksheet, with no executable commands and no real credentials to change.",
    [],
    ["workflow-reading"],
    "reference",
    referenceDemo,
    "reference",
  ),
  "security-threat-model": p(
    "python",
    "Save the access function and its tests separately. assertFalse belongs to a unittest test case; the terminal runs test discovery against invented identities.",
    ["python", "pythonData", "tests"],
    ["script-vs-shell", "python-syntax"],
    "editor",
    "Save the labeled sections as access.py and test_access.py in the same lab directory, then run python3 -m unittest -v in that directory.",
    "editor",
    { "python3 -m unittest -v": "terminal" },
    "access.py and test_access.py",
  ),
  "kubernetes-read": p(
    "planning",
    "Compare labels and selectors on paper first. The listed kubectl commands are real read-only commands for a later reviewed local context, not a requirement to contact a cluster for this reading exercise.",
    ["kubectl"],
    ["workflow-reading", "config-files"],
    "reference",
    referenceDemo,
  ),
  "kubernetes-workloads": p(
    "kubernetes",
    "kind owns the local cluster's lifecycle; kubectl talks to the chosen cluster API. Save the YAML and check context before applying it to the dedicated fixture.",
    ["kind", "kubectl", "docker", "httpServer"],
    ["config-files", "script-vs-shell"],
    "editor",
    "Save this multi-document YAML as workloads.yaml. After verifying the dedicated kind context, use the lesson's kubectl apply command against that file; YAML itself is not a terminal command.",
  ),
  "powershell-bridge": p(
    "windows",
    "Use Windows PowerShell for these commands. Verb-Noun names identify cmdlets, -First is a parameter, and the pipe carries objects with named properties.",
    ["powershell"],
    ["powershell-syntax"],
    "terminal",
    "Run each line in Windows PowerShell. Keep this separate from the Ubuntu Bash terminal; $PSVersionTable and the object pipeline are PowerShell syntax.",
  ),
  "ai-verify": p(
    "planning",
    "Review the synthetic suggestion as a claim requiring a diagnostic and predicted outcomes. There are no command entries to execute; choose a justified read-only test in your written response.",
    [],
    ["workflow-reading"],
    "reference",
    referenceDemo,
    "reference",
  ),
  "architecture-tradeoffs": p(
    "planning",
    "Read the diagram and write a decision with assumptions and failure boundaries. Arrows and labels describe architecture; this lesson has no executable commands.",
    [],
    ["workflow-reading"],
    "reference",
    referenceDemo,
    "reference",
  ),
};

function entryLocation(
  profile: Profile,
  mode: EntryMode,
  command: string,
): string {
  if (mode === "graphical") {
    return profile.environment === "browser"
      ? "Use the named control in your desktop browser; this label is a graphical action, not a terminal command."
      : "Open the named desktop app and use its menus/windows; this app category is not a command to type.";
  }
  if (mode === "editor")
    return `Write this source/configuration in your plain-text editor: ${profile.editor ?? "the file and path named by the lesson"}. Run only the separately labeled launch command in the terminal.`;
  if (mode === "reference") {
    if (command === "Tab completion")
      return "While composing a pathname in the Ubuntu Bash terminal, press Tab; do not type the words Tab completion or press Enter to execute a partial path.";
    if (command === "Ctrl+Z / Ctrl+C")
      return "Press the indicated keyboard shortcut in the terminal running your own fixture; these key names are not text commands.";
    return "Read this notation or evidence label alongside its concrete example; it is not a complete standalone command to paste into a terminal.";
  }
  if (profile.environment === "windows")
    return "Run in Windows PowerShell, where these cmdlets and object pipelines are understood.";
  if (profile.environment === "aws")
    return "Run in the terminal holding your approved authenticated AWS sandbox session; inspect identity before further field steps.";
  if (profile.environment === "planning")
    return "Optional later inspection only: run in a terminal with the reviewed local Kubernetes context after checking kubectl config current-context. The paper exercise needs no cluster connection.";
  return "Run the complete example in your Ubuntu Bash terminal, from the lesson's dedicated practice directory; replace only explicitly described placeholders.";
}

export function commandLessonFor(lesson: Lesson): CommandLesson {
  const profile = profiles[lesson.id];
  if (!profile)
    throw new Error(`Missing command-learning profile for lesson ${lesson.id}`);
  const topics = [
    ...profile.tools.map((key) => {
      const topic = programs[key];
      if (!topic)
        throw new Error(`Unknown program topic ${key} in ${lesson.id}`);
      return topic;
    }),
    ...profile.syntax.map((key) => {
      const topic = commandSyntax[key];
      if (!topic)
        throw new Error(`Unknown syntax topic ${key} in ${lesson.id}`);
      return topic;
    }),
  ];
  return {
    environment: `${environments[profile.environment]} ${lesson.lab.environment}`,
    orientation: profile.orientation,
    topics,
    entries: lesson.commands.map(({ command }) => {
      const mode = profile.overrides[command] ?? profile.mode;
      return { command, mode, where: entryLocation(profile, mode, command) };
    }),
    demoMode: profile.demoMode,
    demoWhere: profile.demoWhere,
  };
}
