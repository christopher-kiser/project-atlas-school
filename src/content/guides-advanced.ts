import type { LessonStudyGuide } from "./study-types";

export const advancedGuides: Record<string, LessonStudyGuide> = {
  "bash-health": {
    startingPoint:
      "Use Bash in Ubuntu/WSL or macOS, with curl available. You already know how to create a file, inspect a local web service, and make a Git commit. Work in a new ~/atlas-labs/health directory. The script is a file you create from the demonstration; it is not a built-in command.",
    whyItMatters:
      "Automation cannot read your intentions. A scheduler needs a dependable success/failure signal, a bounded wait, and a check whose limits are documented. This is the smallest useful example of turning a manual diagnostic into an operational tool.",
    required: [
      "Read the script from top to bottom: choose a URL, run one request, choose a branch, print a message, and return a status.",
      "Explain the difference between output text and exit status. Status 0 means the command succeeded by its own rules; a nonzero status means failure.",
      "Keep the URL quoted and use an option terminator so its characters remain data. Set a timeout so a stalled service cannot hold the caller indefinitely.",
      "Demonstrate both success and failure and explain what this HTTP check does not test. A successful redirect, wrong page, or cached response may still satisfy curl.",
    ],
    optional: [
      {
        topic: "ShellCheck, functions, and structured log output",
        reason:
          "Useful once you maintain larger scripts; not needed to explain and test this single decision.",
      },
      {
        topic:
          "Retries, status-code validation, and dependency health endpoints",
        reason:
          "Extend the check when a real service contract requires them. First learn the behavior of one attempt; blind retries can hide failures.",
      },
    ],
    terms: [
      {
        term: "Interpreter / shebang",
        meaning:
          "Bash interprets shell syntax. The first line #!/usr/bin/env bash selects Bash when an executable script is launched directly; bash health.sh already chooses Bash explicitly.",
      },
      {
        term: "Argument and parameter",
        meaning:
          "In bash health.sh http://localhost, the URL is the script's first argument, available as $1. ${1:-http://localhost} supplies a fallback if it is unset or empty.",
      },
      {
        term: "stdout / stderr",
        meaning:
          "Standard output carries normal output; standard error carries diagnostics. They are separate streams even when the terminal displays both together.",
      },
      {
        term: "Exit status",
        meaning:
          "A small integer returned to the calling program. Bash's $? expands to the immediately preceding command's status.",
      },
    ],
    walkthrough: [
      {
        title: "Predict before running",
        instruction:
          "Save the demonstrated text as health.sh. Identify which lines are assignments, condition, messages, and exits. Keep a known local HTTP lab service running and write down its exact URL.",
        expected:
          "You can point to the success branch and failure branch before using either. No executable permission is needed for bash health.sh.",
      },
      {
        title: "Observe the successful branch",
        instruction:
          "Run bash health.sh with the working local URL. On the very next shell line run echo $?. Record message and status together.",
        expected:
          "For an endpoint accepted by curl, the message is HTTP check passed and the next echo prints 0. If it fails, investigate the underlying request before editing the script.",
      },
      {
        title: "Observe a real failure",
        instruction:
          "Confirm a chosen local port is unused using your earlier socket-inspection skills, then pass its URL, such as http://127.0.0.1:65530. Immediately read echo $?.",
        expected:
          "curl reports a connection error, the script reports HTTP check failed on stderr, and the script's status is 1. The exact curl diagnostic varies.",
      },
      {
        title: "Read the output boundary",
        instruction:
          "Explain why > /dev/null discards the response body but >&2 sends the failure message to the error stream. Explain why the if statement reads curl's status without needing to print $? inside the script.",
        expected:
          "You distinguish body, diagnostic, message, and status. The failed curl runs within the condition, so Bash chooses else.",
      },
      {
        title: "Document the contract",
        instruction:
          "Write a short README naming the endpoint, timeout, success rule, one false positive, and how you tested both paths. Commit only your script and notes through the Git workflow already learned.",
        expected:
          "Another learner can reproduce the two outcomes and understands that this is one endpoint check, not proof of total system health.",
      },
    ],
    commandDetails: [
      {
        command: "bash health.sh",
        breakdown:
          "bash launches the interpreter; health.sh is a relative filename in the current directory; the final token becomes $1. The default applies when the URL is omitted or empty.",
        expected:
          "One pass/fail message and an exit status. A missing file produces a Bash file error instead of running the script.",
        pitfall:
          "Run it from the directory containing the file or supply its path. Typing the URL alone does not set a script argument.",
      },
      {
        command: "curl -fsS --max-time 3",
        breakdown:
          "-f makes most HTTP 400+ responses fail; -s silences the progress meter; -S restores error messages with -s. --max-time 3 bounds the transfer to three seconds. --proto =http,https allows only those protocols. -- ends curl options. Quoted $url is one argument. > redirects stdout into the discard device.",
        expected:
          "On success, no body appears. Connection, timeout, certificate, or HTTP failures can produce stderr and nonzero status. curl without -L does not follow redirects.",
        pitfall:
          "-f does not mean 'exactly HTTP 200' or 'correct page content'. Do not add -k to bypass certificate validation or assume a 3xx redirect proves application health.",
      },
      {
        command: 'echo "HTTP check failed" >&2',
        breakdown:
          "echo prints its quoted text; >&2 redirects that command's normal output to file descriptor 2, stderr. It does not set the failure status you want the caller to receive.",
        expected:
          "A diagnostic line on the error stream, followed by exit 1 in the script.",
        pitfall:
          "Printing the word failed alone usually still leaves echo successful. The script must return a nonzero status explicitly.",
      },
      {
        command: "exit",
        breakdown:
          "exit ends this script's shell with status 1. exit 0 selects success. The caller can inspect the result or branch on it.",
        expected:
          "No automatic message; execution leaves the script at that line.",
        pitfall:
          "Do not type exit casually in your interactive shell: it closes that shell. These lines belong inside the script.",
      },
      {
        command: "echo $?",
        breakdown:
          "The shell expands $? before echo runs, then echo displays that last status. Run it immediately after the command under investigation.",
        expected:
          "0 after the successful script, 1 after the deliberately failed script.",
        pitfall:
          "An intervening ls or echo replaces the status you meant to inspect. The status is a number, not the previous command's output text.",
      },
    ],
    readiness: [
      "Explain every curl flag and every redirection without copying the explanation.",
      "Produce a real success and real failure, including statuses.",
      "Name one unhealthy situation this check could still report as successful.",
    ],
  },
  "python-inventory": {
    startingPoint:
      "Use a terminal with Python 3 already installed. Work in a new inventory directory. Save two separate files named inventory.py and inventory.json; the current directory matters because the example reads a relative filename. This lesson introduces programming syntax rather than assuming that shell familiarity includes Python.",
    whyItMatters:
      "Cloud tools return structured data. A small tested Python function can turn that data into a useful report while exposing incomplete input instead of silently producing a misleading answer.",
    required: [
      "Recognize a JSON list of records: square brackets hold the list, braces hold each object, and double-quoted keys identify values. JSON text is parsed into Python data; it is not executed.",
      'Read def, its indented function body, return, item["state"], and the filtering list comprehension. Explain why returning a value is different from printing it.',
      "Use the __name__ guard so importing the function for tests does not also read a file or print a report.",
      "Test running, stopped, empty, and malformed records. A basic demo raises KeyError for a missing key; adding deliberate validation is part of the lab, not a property the demo already has.",
    ],
    optional: [
      {
        topic: "Type hints, argparse, and JSON Schema",
        reason:
          "Good next tools for larger programs and interfaces; this lesson needs only a pure function, clear input checks, and standard-library tests.",
      },
      {
        topic: "Third-party packages and cloud SDK clients",
        reason:
          "The report is intentionally offline. Learn data handling before adding dependencies, authentication, and network failure.",
      },
    ],
    terms: [
      {
        term: "Module / import",
        meaning:
          "A Python source file can be a module. import json loads standard-library functionality; from inventory import running_names loads your function for tests.",
      },
      {
        term: "Function / list comprehension",
        meaning:
          'A function names reusable work. [item["name"] for item in records if item["state"] == "running"] visits each record, filters it, and collects selected names.',
      },
      {
        term: "Exception",
        meaning:
          "A reported abnormal condition that interrupts normal execution. FileNotFoundError concerns the file, JSONDecodeError concerns JSON syntax, and KeyError concerns an absent dictionary key.",
      },
      {
        term: "Fixture / assertion",
        meaning:
          "A fixture is controlled test input. An assertion compares actual behavior to expected behavior and fails the test if they differ.",
      },
      {
        term: "Virtual environment",
        meaning:
          "A project-specific Python environment for dependencies. Creating it does not install your application or automatically activate it.",
      },
    ],
    walkthrough: [
      {
        title: "Make the input concrete",
        instruction:
          "Save the demonstrated two-record JSON exactly as inventory.json, and the program as inventory.py. In JSON, use double quotes and no trailing comma. Predict which record passes the state comparison.",
        expected:
          "One running record named web-1 and one stopped record. The predicted Python result is ['web-1'].",
      },
      {
        title: "Trace one execution",
        instruction:
          "Run python3 inventory.py. Follow the steps: read file text, parse JSON, call the function, filter records, return a list, and print the returned list.",
        expected:
          "['web-1'] is printed. This is Python's display of a list, not a new JSON file or a change to the input.",
      },
      {
        title: "Write a first actual test",
        instruction:
          "Create test_inventory.py with the small example below. Run python3 -m unittest -v from the directory containing both files. Add separate methods for stopped input and an empty list using the same pattern.",
        expected:
          "The first run finds test_running and reports OK. With the added cases, the number of executed tests increases. 'Ran 0 tests' is not proof of coverage.",
      },
      {
        title: "Specify invalid records",
        instruction:
          'Call running_names with [{"name":"web-1"}] in a disposable test and observe the original KeyError. Extend the function to check the outer list, each record\'s required string fields, and your documented state vocabulary before filtering. Raise ValueError with the record index for invalid records; test that contract using assertRaises.',
        expected:
          "A missing state is deliberately rejected with an explainable ValueError after your change. Decide whether valid states include only running/stopped for this small exercise; do not assume all cloud inventories use that vocabulary.",
      },
      {
        title: "Separate file errors from record errors",
        instruction:
          "Keep a clean fixture and make disposable copies for malformed JSON and a missing file. Observe each error independently, restore valid input, and rerun the complete tests.",
        expected:
          "You can distinguish parsing failure, missing file, and invalid record shape. Valid and empty input still work after validation is added.",
      },
    ],
    commandDetails: [
      {
        command: "python3 -m venv .venv",
        breakdown:
          "python3 chooses the interpreter, -m runs an installed module, venv creates an environment, and .venv is the target directory. This program uses only the standard library, so activation is optional for this exercise.",
        expected:
          "A .venv directory is created, usually without success text. If venv support is absent, follow your OS's official setup instructions rather than assuming the lesson files are wrong.",
        pitfall:
          "Do not commit .venv. Creating it does not change which interpreter a subsequent bare python3 uses.",
      },
      {
        command: "python3 inventory.py",
        breakdown:
          'Runs the named Python file. Path("inventory.json").read_text() reads relative to the shell\'s current working directory. json.loads parses that text; __name__ == "__main__" is true for this direct launch.',
        expected:
          "The names of matching records appear as a Python list; missing input raises FileNotFoundError.",
        pitfall:
          "Naming your file json.py can shadow the standard-library json module. Keep the exact inventory.py filename for the test import.",
      },
      {
        command:
          'import unittest\nfrom inventory import running_names\n\nclass InventoryTests(unittest.TestCase):\n    def test_running(self):\n        self.assertEqual(\n            running_names([{"name": "web-1", "state": "running"}]),\n            ["web-1"],\n        )',
        breakdown:
          "Save this as test_inventory.py. TestCase supplies assertion methods; a method beginning test_ is discovered as a test; self is the current test instance. assertEqual compares the actual list with the expected list. Indentation defines each block.",
        expected:
          "Importing inventory exposes the function without reading inventory.json because its direct-run code is guarded.",
        pitfall:
          "A file not named test*.py or a method not beginning test_ may be skipped. Make one assertion intentionally wrong to prove the runner can detect a failure, then restore it.",
      },
      {
        command: "python3 -m unittest",
        breakdown:
          "Runs unittest's default discovery from the current directory. -v prints individual test names and results. A test failure returns a nonzero process status for shell automation or CI.",
        expected:
          "A summary naming the tests and ending OK when all pass, or a failure/error traceback when one does not.",
        pitfall:
          "OK with zero tests is insufficient. assertRaises(ValueError) tests the error contract only after you implement deliberate validation; the unmodified demo raises KeyError for a missing key.",
      },
    ],
    readiness: [
      "Trace the comprehension for running, stopped, and empty input.",
      "Explain each file's role and why importing the program has no file-reading side effect.",
      "Show real passing tests plus one demonstrated failure, and distinguish JSON syntax errors from record validation errors.",
    ],
  },
  "cloud-packet": {
    startingPoint:
      "You can already distinguish a local HTTP response from a refused connection. Use Linux for ip and ss; use your own local lab for socket inspection. The documentation address 203.0.113.10 is for route reasoning, not a server promised to answer.",
    whyItMatters:
      "A cloud request crosses several boundaries. Treating every failure as a firewall issue leads to broad, ineffective changes. A packet-path sketch helps choose the next observation and identify what remains unproven.",
    required: [
      "Explain IPv4 /24 as 256 total addresses before reservations, without assuming all are usable hosts.",
      "Separate DNS lookup, selected route, traffic policy, listening socket, TLS certificate validation, and HTTP application response.",
      "Trace both request and response. Stateful policy and address translation influence the return path; a public-looking address alone proves nothing.",
      "Use a route lookup, local listener observation, and bounded HTTP/TLS request for different questions. Record the exact point where evidence stops.",
    ],
    optional: [
      {
        topic: "Binary subnet arithmetic beyond common prefixes",
        reason:
          "Useful for network planning; full subnetting speed drills are not required to diagnose this path.",
      },
      {
        topic: "Packet capture, BGP, and advanced NAT behavior",
        reason:
          "Deeper network operations topics. Begin with route, listener, policy, and protocol evidence before capturing traffic.",
      },
    ],
    terms: [
      {
        term: "CIDR prefix",
        meaning:
          "The /24 fixes 24 of IPv4's 32 bits. Eight varying bits give 2^8 addresses; the network's provider and protocol rules determine usable assignments.",
      },
      {
        term: "Route / next hop",
        meaning:
          "A rule selecting an outgoing interface or gateway for a destination. It does not guarantee that later devices or the return path work.",
      },
      {
        term: "Listener / bind address",
        meaning:
          "A process waiting on a socket. 127.0.0.1 accepts local loopback traffic; a service bound only there is not listening on the machine's external address.",
      },
      {
        term: "TLS / NAT",
        meaning:
          "TLS authenticates and encrypts a connection. NAT rewrites addressing at a network boundary; it does not start a server or grant application authorization.",
      },
    ],
    walkthrough: [
      {
        title: "Draw before testing",
        instruction:
          "Sketch client, DNS result, route, firewall, service host, listener, TLS, and HTTP. Add arrows for the response and mark any address translation.",
        expected:
          "Each box answers a different question. DNS resolution is a lookup before the connection, not a router carrying the later HTTP packets.",
      },
      {
        title: "Observe the local route choice",
        instruction:
          "In Linux run ip route get 203.0.113.10. Identify destination, gateway if present, dev, and src in the response.",
        expected:
          "A route selection or an unreachable-route error. This lookup does not send an HTTP request to that documentation address.",
      },
      {
        title: "Observe the service boundary",
        instruction:
          "On your own service host run ss -ltn and find the intended port. Compare its bind address with the address the client uses.",
        expected:
          "A local listener row establishes that a socket is listening. It does not establish remote firewall access, valid certificates, or a correct page.",
      },
      {
        title: "Classify one HTTPS result",
        instruction:
          "Run the bounded curl example against example.com only if internet access is available. Read resolution/connection, certificate, and response-header observations separately; redact proxy or private details before sharing.",
        expected:
          "A successful exchange includes TLS and response headers. A proxy or local network can change the transcript; name the observed boundary rather than declaring the whole service broken.",
      },
      {
        title: "Choose a discriminating test",
        instruction:
          "For 'works locally, times out remotely', list listener binding, route, and policy hypotheses. Give one observation supporting or weakening each before proposing one reversible change.",
        expected:
          "Your plan does not treat a timeout alone as proof of a firewall denial and includes the original remote request as the recovery test.",
      },
    ],
    commandDetails: [
      {
        command: "ip route get",
        breakdown:
          "ip is Linux's network utility; route chooses routing operations; get asks for the kernel's decision for this destination. dev names the interface; src is the chosen source address; via, if present, names a gateway.",
        expected:
          "A route explanation or unreachable error, depending on this machine.",
        pitfall:
          "A route lookup is local reasoning, not an end-to-end connectivity test. Do not expect this documentation-range address to host a website.",
      },
      {
        command: "ss -ltn",
        breakdown:
          "ss inspects sockets; -l selects listening sockets, -t selects TCP, and -n keeps numeric addresses and ports instead of name lookups.",
        expected:
          "Rows for listening TCP sockets on this Linux host, with local address and port.",
        pitfall:
          "Run it on the service host. Inspecting your laptop's listeners cannot prove what a remote VM is listening on.",
      },
      {
        command: "curl -Iv",
        breakdown:
          "-I requests HTTP headers with HEAD; -v adds connection and TLS diagnostics; --max-time 5 bounds the request; https selects TLS. Headers normally go to stdout and verbose diagnostics to stderr.",
        expected:
          "A connection/TLS transcript and response headers, or an error identifying the failed stage. Some servers handle HEAD differently from GET.",
        pitfall:
          "A 405 response to HEAD is different from network failure. Do not use -k as a certificate fix; certificate-name mismatch suggests a hostname/certificate issue after reaching a TLS endpoint.",
      },
    ],
    readiness: [
      "Explain why allowing 443 cannot create a listener.",
      "Interpret route and socket observations without claiming end-to-end success.",
      "Draw a forward and return path and choose different tests for timeout, certificate mismatch, and HTTP 502.",
    ],
  },
  "cloud-model": {
    startingPoint:
      "This is a design exercise with no cloud account or CLI required. Use the status-page scenario: visitors need to read a public page, and an operator needs to publish updates. Write the need before choosing a provider service.",
    whyItMatters:
      "Cloud engineering is choosing and operating capabilities under constraints. A small system you can explain, secure, monitor, and remove teaches more than a list of service names.",
    required: [
      "Distinguish compute (running code), storage (retaining data), networking (moving requests), and identity (controlling actions). A static page may need hosting without a separately managed server or database.",
      "Separate a geographic region from its availability zones. Redundancy helps only when copies do not share the failure you intend to tolerate.",
      "Assign customer responsibilities for data, permissions, configuration, deployment, and cost even when a provider manages infrastructure.",
      "State traffic assumptions, cost inputs, owner, and cleanup before provisioning. A budget alert is a notification mechanism, not a universal spending cap.",
    ],
    optional: [
      {
        topic: "Global multi-region failover and active-active design",
        reason:
          "These solve stricter availability and geography requirements at greater complexity. They are unnecessary for this initial status-page decision.",
      },
      {
        topic: "Every provider's service catalog",
        reason:
          "Learn capabilities and tradeoffs first; service names and commercial terms can be looked up when a requirement calls for them.",
      },
    ],
    terms: [
      {
        term: "Static content / compute",
        meaning:
          "Static content is served as already prepared files. Compute runs programs; a provider still uses infrastructure to deliver static files even if you manage no server.",
      },
      {
        term: "Region / availability zone",
        meaning:
          "A region is a geographic deployment area; zones separate infrastructure within it. Two processes on one host share that host as a failure domain.",
      },
      {
        term: "Managed service",
        meaning:
          "A service whose provider performs some operational work. The exact responsibility split depends on the product and configuration.",
      },
      {
        term: "Failure domain / teardown",
        meaning:
          "A failure domain is a boundary that can fail together. Teardown removes the resources and allocations you no longer need, rather than merely closing a browser tab.",
      },
    ],
    walkthrough: [
      {
        title: "State the user task",
        instruction:
          "Write 'visitors read current status; one operator publishes updates'. Record whether visitors need accounts, whether data changes per visitor, and how quickly updates must appear.",
        expected:
          "For the given scenario, the page has no user accounts or database requirement. New assumptions are clearly labeled.",
      },
      {
        title: "Draw the minimum path",
        instruction:
          "Draw browser → hosted static files, plus operator → authenticated publishing process. Add a place to inspect failures and a recovery source for the content.",
        expected:
          "Every component has a named purpose. Publishing authority is separate from public read access.",
      },
      {
        title: "Compare two options",
        instruction:
          "Compare static hosting and a self-managed VM on maintenance, failure modes, deployment, and usage-related costs. Choose one and give a reason tied to the task.",
        expected:
          "A defensible static-hosting choice for these needs, without claiming it is best for every future application.",
      },
      {
        title: "Walk one failure",
        instruction:
          "Imagine the only host or hosting endpoint is unavailable. State what users see, what remains available to the operator, and how content can be restored or republished.",
        expected:
          "Two app processes on the same failed machine are not counted as independent protection. Recovery steps have an owner.",
      },
      {
        title: "Close the cost loop",
        instruction:
          "List estimate inputs such as requests, transfer, storage, build activity, and domain charges where relevant. Write the deletion/retention decisions and how you would verify them before a live exercise.",
        expected:
          "No assumed free-tier entitlement, price promise, or deployment. The output is a reviewable decision record and cleanup plan.",
      },
    ],
    commandDetails: [
      {
        command:
          "Design observation: trace one page view and one content update",
        breakdown:
          "This lesson has no required command. Treat each diagram arrow as a question: who initiates it, what data moves, which identity authorizes it, and what can fail?",
        expected:
          "A visitor can read the page; only the intended operator can publish; both paths have a stated failure observation.",
        pitfall:
          "A diagram is a design claim. It cannot prove that a real deployment, access rule, or bill behaves as intended.",
      },
    ],
    readiness: [
      "Choose a system from stated needs and explain a rejected alternative.",
      "Distinguish region, zone, and shared-host failure.",
      "Identify customer responsibilities, cost inputs, and cleanup without creating anything.",
    ],
  },
  "aws-plan": {
    startingPoint:
      "Complete the cloud and packet-path design lessons first. This remains a paper exercise: no credentials, console changes, or AWS calls. Use a small web application that reads one private configuration object as the scenario.",
    whyItMatters:
      "Real cloud troubleshooting gets easier when you can tell whether a failure concerns identity, packet delivery, application behavior, or storage. Planning these boundaries also exposes unnecessary cost before a lab is built.",
    required: [
      "Explain EC2 as virtual compute, VPC as a logical network, subnet as an address range within that network, and routes as destination decisions.",
      "Distinguish a role's temporary API permissions from network reachability. A role does not open a port; a security group does not grant S3 object authorization.",
      "Distinguish S3 objects from an EC2 block volume. Public access is a separate decision, not a general remedy for denied requests.",
      "Plan a named management path, application request path, storage request path, observations, cost inventory, and complete teardown.",
    ],
    optional: [
      {
        topic: "Detailed IAM policy JSON and NACL rule design",
        reason:
          "Needed when implementing a reviewed live setup, but first express the exact required actions, resources, and traffic in plain language.",
      },
      {
        topic: "NAT gateways, load balancers, and private endpoints",
        reason:
          "Add only when their connectivity or availability purpose is the learning objective. Each introduces dependencies and possible cost.",
      },
    ],
    terms: [
      {
        term: "IAM role / instance profile",
        meaning:
          "A role defines an assumable identity and permissions. An instance profile is the mechanism used to associate a role with EC2; applications can obtain temporary credentials instead of stored long-lived keys.",
      },
      {
        term: "Security group / NACL",
        meaning:
          "A security group controls traffic at associated network interfaces and tracks connections. A network ACL controls traffic at the subnet boundary and is stateless, so return traffic needs suitable rules.",
      },
      {
        term: "Internet Gateway / public connectivity",
        meaning:
          "An Internet Gateway connects a VPC to the internet when addressing, routes, and policies are also suitable. Its existence alone does not make every subnet resource publicly reachable.",
      },
      {
        term: "EBS / S3",
        meaning:
          "EBS presents block storage commonly used by EC2 as a disk. S3 stores objects identified by bucket and key; it is not a mounted disk by default.",
      },
      {
        term: "CloudWatch / CloudTrail / Systems Manager",
        meaning:
          "CloudWatch provides operational telemetry such as logs and metrics. CloudTrail records account API activity according to event coverage. Systems Manager can provide management access when its agent, identity, and connectivity are configured.",
      },
    ],
    walkthrough: [
      {
        title: "Name each arrow",
        instruction:
          "Copy the demo diagram, then label human administration, incoming HTTP, and EC2-to-S3 requests separately. For each write initiator, destination, and intended result.",
        expected:
          "Three distinct flows, rather than one vague 'AWS access' arrow.",
      },
      {
        title: "Draw network conditions",
        instruction:
          "For a public web request, annotate destination addressing, subnet route to the Internet Gateway, allowed application port, and application bind address. Include the return path.",
        expected:
          "The plan does not rely only on a route or only on an open security-group port to claim success.",
      },
      {
        title: "Write the permission matrix",
        instruction:
          "Give the application permission to read only its reviewed configuration object; keep the bucket private. Define a different limited operator identity for administration, and one unrelated object the application must not read.",
        expected:
          "Each identity has a named task and resource. Success and intentional denial tests are both specified.",
      },
      {
        title: "Choose evidence and management",
        instruction:
          "State how to view application logs, inspect relevant API history, and manage the instance. If proposing Systems Manager, list agent, instance permissions, and service connectivity as prerequisites.",
        expected:
          "The management plan has dependencies; 'use Systems Manager' is not treated as automatically working.",
      },
      {
        title: "Inventory the whole lifetime",
        instruction:
          "List compute, volumes, snapshots, allocated public IPv4 addresses, object data, transfer, and logs that the proposed setup might use. Review current official regional pricing before a future live build; write dependency-aware cleanup.",
        expected:
          "A reviewer can find the owner of each resource and tell which items might survive an instance stop. No resource is created by this lesson.",
      },
    ],
    commandDetails: [
      {
        command: "Paper check: IAM permission versus request reachability",
        breakdown:
          "No AWS CLI command is required. For 'application reads one S3 object', mark both the network/service path and identity/resource authorization. For 'browser reaches web app', mark routes, traffic policy, listener, and response.",
        expected:
          "An annotated matrix of allowed actions, required paths, and expected denied cases.",
        pitfall:
          "Do not claim every CloudTrail configuration records every S3 object request; object-level audit coverage needs a deliberate configuration review in a live lab.",
      },
    ],
    readiness: [
      "Explain every service and arrow in the diagram using ordinary words.",
      "Distinguish API authorization, network policy, and application listeners.",
      "Present preflight, positive/negative tests, and full cleanup for review before any spending.",
    ],
  },
  "terraform-local": {
    startingPoint:
      "Use an already installed Terraform CLI supporting the demonstrated configuration (Terraform 1.4 or newer). Create a new empty local directory and save exactly the shown main.tf. Do not reuse a directory containing an AWS provider or other resources.",
    whyItMatters:
      "Infrastructure tools propose and execute changes from desired configuration. Learning the lifecycle with a built-in state value lets you understand review, convergence, and cleanup before any plan can affect cloud resources.",
    required: [
      "Recognize HCL blocks, quoted resource type/name, attributes, and references. terraform_data.lab is a Terraform address, not a cloud server.",
      "Initialize the directory, review the proposed plan, apply deliberately, inspect state, and show an unchanged second plan.",
      "Distinguish changing configuration from drift: changing atlas-v1 to atlas-v2 changes your declared intent; drift means actual managed objects changed outside that configuration.",
      "Keep state and working directories out of Git. State can contain sensitive values even if terminal output masks them. Review a destroy plan and verify the local resource is gone.",
    ],
    optional: [
      {
        topic: "Remote backends, locking, modules, and shared environments",
        reason:
          "Important for team infrastructure work after the local lifecycle is understood. No remote service or backend account is needed here.",
      },
      {
        topic: "Real drift detection with a provider",
        reason:
          "This built-in value has no external infrastructure to alter manually. Learn that distinction before adding a real provider merely to create drift.",
      },
    ],
    terms: [
      {
        term: "HCL / configuration",
        meaning:
          "Terraform's declarative configuration language. A resource block names desired managed data; output exposes a result of the configuration.",
      },
      {
        term: "State / resource address",
        meaning:
          "State connects configured resource addresses such as terraform_data.lab to managed instances and their last-known attributes.",
      },
      {
        term: "Plan / apply / convergence",
        meaning:
          "Plan proposes changes. Apply performs reviewed changes. Convergence means unchanged desired and observed state needs no further change.",
      },
      {
        term: "Built-in resource",
        meaning:
          "terraform_data stores values under Terraform's lifecycle without a separately installed external provider. This example has no provisioners that execute other commands.",
      },
    ],
    walkthrough: [
      {
        title: "Read and initialize",
        instruction:
          "Inspect main.tf: one terraform_data resource and one output, with no cloud provider or provisioner. Run terraform init in that exact directory.",
        expected:
          "Initialization succeeds for the built-in resource. No AWS infrastructure is requested; extra provider installation or unexpected files mean you should recheck the directory.",
      },
      {
        title: "Predict the first plan",
        instruction:
          "Run terraform plan. Identify the resource address, creation symbol, input atlas-v1, and values not yet known. Do not type an apply command until you can explain the change summary.",
        expected:
          "One managed resource proposed for creation. Computed output details may be unknown until apply.",
      },
      {
        title: "Apply and inspect",
        instruction:
          "Run terraform apply, review its fresh plan, and enter yes only if it still contains exactly the local example. Run terraform show and terraform state list.",
        expected:
          "The label output is atlas-v1, and state list includes terraform_data.lab. Apply without a saved plan recalculates the plan; an earlier plan is not an immutable promise.",
      },
      {
        title: "Check convergence and intent changes",
        instruction:
          "Run plan again unchanged, then edit input to atlas-v2 and plan once more. Explain the difference between these two results and why the edit is not external drift.",
        expected:
          "The unchanged run reports no changes. The edit proposes an update to the existing local value and corresponding output.",
      },
      {
        title: "Remove only this local lifecycle",
        instruction:
          "Review terraform plan -destroy, run terraform destroy in the same directory, review and confirm the local deletion, then run terraform state list. Keep main.tf and exclude local operational data from Git.",
        expected:
          "No managed resource addresses remain. Configuration still exists, so a later normal plan would propose creation again.",
      },
    ],
    commandDetails: [
      {
        command: "terraform init",
        breakdown:
          "Initializes this working directory and backend/provider setup described by the configuration. The example uses the built-in terraform_data resource, so no cloud credentials or external provider are needed.",
        expected: "Initialization messages and a ready working directory.",
        pitfall:
          "init in the wrong directory initializes the wrong configuration. Read the files first; do not paste this example into an existing cloud project.",
      },
      {
        command: "terraform plan",
        breakdown:
          "Compares configuration and managed-state observations, then prints proposed changes. No -out file is supplied here, so it does not create a saved executable plan.",
        expected:
          "Creation initially, no changes after applying unchanged input, and an update after editing input.",
        pitfall:
          "A plan's presence does not mean the changes are harmless. Understand add/change/destroy counts before using apply.",
      },
      {
        command: "terraform apply",
        breakdown:
          "Calculates a plan again and asks for confirmation before applying it. In this exercise type yes only after reviewing the local terraform_data proposal.",
        expected:
          "The single state-managed resource is created or updated, with a label output.",
        pitfall:
          "Do not add -auto-approve while learning. With real providers, the same verb may create charges or delete infrastructure.",
      },
      {
        command: "terraform show",
        breakdown:
          "With no filename argument, prints the current state in readable form. The input and output attributes explain what Terraform currently knows.",
        expected: "The terraform_data.lab record and output label after apply.",
        pitfall:
          "State is not your original configuration and can contain secrets. Do not publish a real state file or its full output as evidence.",
      },
      {
        command: "terraform state list",
        breakdown:
          "Lists addresses of managed resource instances in this workspace's state; it does not list all resources in a cloud account.",
        expected:
          "terraform_data.lab after apply; no managed addresses after destroy.",
        pitfall:
          "An empty state is only this workspace's observation, not proof that unrelated infrastructure elsewhere has been removed.",
      },
      {
        command: "terraform plan -destroy",
        breakdown:
          "-destroy requests a plan whose goal is removing managed objects. This command previews the deletion; it does not itself perform it.",
        expected:
          "One local resource proposed for deletion if it still exists in state.",
        pitfall:
          "Always recheck the directory and resource names. A destroy plan for a different project could describe real destructive actions.",
      },
      {
        command: "terraform destroy",
        breakdown:
          "Requests destruction of the managed objects in the current configuration/state scope and asks for confirmation. It leaves source configuration files on disk.",
        expected:
          "The local resource is removed from state after confirmation.",
        pitfall:
          "Stopping a process or deleting main.tf is not equivalent to managed destruction. Do not edit state by hand to fake cleanup.",
      },
    ],
    readiness: [
      "Predict create, unchanged, update, and destroy plans.",
      "Explain why a configuration edit is not drift and why state is not source code.",
      "Show an empty managed-resource list after deliberate local cleanup.",
    ],
  },
  "docker-local": {
    startingPoint:
      "Use an already installed and approved local container engine. Confirm its version and that host port 8080 is available. The lab downloads an Nginx image and runs a local process; it requires no cloud service. Use an up-to-date engine: Docker documents a localhost-publishing exposure issue in releases older than 28.0.0.",
    whyItMatters:
      "Containers package a process consistently, but a running container is not automatically a healthy application. Mapping a host port, inspecting logs, and testing stop/recovery teaches the boundaries you must observe in a deployment.",
    required: [
      "Distinguish image, newly created container, running process, and stopped container. docker run creates; docker start reuses.",
      "Explain the mapping as host address : host port : container port. This lab targets IPv4 loopback on the host and container TCP port 80.",
      "Verify service with HTTP and logs, then deliberately stop, observe failure, restart, and verify recovery.",
      "Remove only the named disposable container. Its writable layer is removed with it; images, volumes, and bind-mounted files have separate lifetimes.",
    ],
    optional: [
      {
        topic: "Dockerfiles, image digests, volumes, and security scanning",
        reason:
          "The next steps for building a durable deployment. The required exercise first explains one existing image and a container's lifecycle.",
      },
      {
        topic: "Compose, orchestration, and custom networking",
        reason:
          "Helpful for several services; unnecessary to understand this single-process port mapping.",
      },
    ],
    terms: [
      {
        term: "Image / tag",
        meaning:
          "An image is a packaged filesystem and startup metadata. nginx:stable-alpine names an image and tag; the tag may point to different image content later.",
      },
      {
        term: "Container / writable layer",
        meaning:
          "A container is an instance of an image with a process context and a separate writable layer. It can exist while stopped.",
      },
      {
        term: "Published port / detached mode",
        meaning:
          "Publishing maps a host address/port to a container port. Detached mode starts the container without keeping your terminal attached to its output.",
      },
      {
        term: "Daemon / logs",
        meaning:
          "The container engine manages containers. docker logs reads captured stdout/stderr; it is not a guarantee that every application writes useful logs there.",
      },
    ],
    walkthrough: [
      {
        title: "Read the run command first",
        instruction:
          "Identify the name, detached flag, host binding, container port, image, and tag. Confirm the daemon is available and the port is unused before running the exact local example.",
        expected:
          "docker run prints a container ID after any image-download messages. A name conflict or port conflict is a setup problem to diagnose, not a reason to delete unrelated resources.",
      },
      {
        title: "Observe three views",
        instruction:
          "Run docker ps, curl -I http://127.0.0.1:8080, and docker logs atlas-web. Find the port mapping, HTTP status, and evidence of the request in logs.",
        expected:
          "A running container, an HTTP response, and relevant application log output. These are different observations.",
      },
      {
        title: "Create a controlled outage",
        instruction:
          "Stop atlas-web, then run the bounded HTTP request. Compare docker ps and docker ps -a.",
        expected:
          "The container disappears from the default running list but remains in the all-containers list with an exited state. HTTP fails if no other process owns the port.",
      },
      {
        title: "Recover the same container",
        instruction:
          "Run docker start atlas-web and repeat the exact successful HTTP request. Explain why you used start instead of another run with the same name.",
        expected:
          "The existing container returns to running and HTTP responds again. Its identity is reused.",
      },
      {
        title: "Clean up by name",
        instruction:
          "Stop atlas-web and remove it with docker rm atlas-web. Check docker ps -a to verify only that container disappeared. State separately whether the image remains.",
        expected:
          "The container and its writable layer are removed. The downloaded image can remain; no broad prune or unrelated deletion is needed.",
      },
    ],
    commandDetails: [
      {
        command: "docker run",
        breakdown:
          "run creates and starts. --name assigns a local container name. -d detaches. -p publishes host IPv4 loopback port 8080 to container TCP port 80. nginx:stable-alpine chooses the image and tag, downloading it if needed.",
        expected:
          "A container ID, followed by an Nginx service reachable on the specified host loopback port.",
        pitfall:
          "Omitting 127.0.0.1 can expose the port on other host interfaces. Remote Docker contexts publish on the daemon host, which may not be your laptop. Do not add privileged mode or socket mounts.",
      },
      {
        command: "docker ps",
        breakdown:
          "Lists running containers. docker ps -a adds stopped containers. Read NAMES, STATUS, and PORTS rather than treating the presence of a row as application health.",
        expected:
          "atlas-web is present while running; after stop, only the -a form still lists it.",
        pitfall:
          "A process can run while returning errors. Always pair this observation with the application request.",
      },
      {
        command: "curl -I http://127.0.0.1:8080",
        breakdown:
          "-I requests headers with HEAD. The URL uses the host side of the mapping, not port 80 inside the container. --max-time 3 can be added to bound a failure check.",
        expected:
          "Response headers while the service is running; a connection failure after stopping if no other listener remains.",
        pitfall:
          "localhost may select IPv6 while this mapping explicitly binds IPv4. Use 127.0.0.1 if that distinction causes confusion; do not assume HTTP failure means the image download failed.",
      },
      {
        command: "docker logs",
        breakdown:
          "logs reads captured process output for the named container, including retained output when it is stopped.",
        expected:
          "Startup and request log lines from this Nginx image; exact timestamps and formatting vary.",
        pitfall:
          "Old successful requests in logs do not prove current health. Match evidence to the current request and time.",
      },
      {
        command: "docker stop",
        breakdown:
          "Asks the engine to stop this named container gracefully before its configured timeout. It does not delete the container or image.",
        expected: "The name is printed and the state becomes exited.",
        pitfall:
          "Stopping is a deliberate service outage. Use the disposable lab container rather than a shared service.",
      },
      {
        command: "docker start atlas-web",
        breakdown:
          "Starts the already existing stopped container using its saved settings, including the same published port.",
        expected:
          "The name is printed and the HTTP service becomes available again after startup.",
        pitfall:
          "run with the same --name would try to create a second object and fail with a name conflict; start is the correct recovery for this exercise.",
      },
      {
        command: "docker rm atlas-web",
        breakdown:
          "Removes this stopped container and its writable layer. It does not remove the image, and external persisted storage needs its own reviewed cleanup.",
        expected:
          "The name is printed and no atlas-web row remains in docker ps -a.",
        pitfall:
          "Stop it first. Avoid -f and system-wide prune commands; they are unnecessary for the named-container cleanup.",
      },
    ],
    readiness: [
      "Explain each token in the run command and identify both ports.",
      "Show an HTTP failure during stop and recovery after start.",
      "Explain which state disappears with container removal and what may remain.",
    ],
  },
  "ci-contract": {
    startingPoint:
      "Use the inventory project's tests and a repository you control. Start locally; remote Actions runs require reviewing the account's current runner availability and usage limits. The demonstrated workflow checks tests only and does not deploy anything.",
    whyItMatters:
      "A pipeline is a program that decides whether a change can proceed. Learning what it actually runs prevents a green badge from being mistaken for comprehensive testing or a release gate that has never been exercised.",
    required: [
      "Distinguish source revision, test run, build, artifact, and deployment. Tests are evidence about the specific code and commands that ran.",
      "Read the workflow's event triggers, job, runner, ordered steps, and limited token permissions.",
      "Prove a real failing assertion makes the check fail, then fix the cause and prove it passes with nonzero test count.",
      "A test workflow alone does not block every release. A deploy job needs an explicit dependency on successful checks, and branch/environment protection must be configured where applicable.",
    ],
    optional: [
      {
        topic: "Matrices, caches, reusable workflows, and deployment identity",
        reason:
          "Useful for more runtimes and faster or safer releases after a single meaningful check works.",
      },
      {
        topic: "Artifact signing and provenance",
        reason:
          "Important supply-chain controls for mature delivery systems. First identify exactly which tested revision and artifact would be promoted.",
      },
    ],
    terms: [
      {
        term: "CI / workflow / job / step",
        meaning:
          "Continuous integration checks proposed source changes. A workflow is an event-triggered definition; jobs run on assigned runners; steps within a job execute in order by default.",
      },
      {
        term: "Runner / action",
        meaning:
          "A runner is the machine executing the job. An action is reusable workflow code such as checkout; it runs with the authority you grant it.",
      },
      {
        term: "Artifact / revision",
        meaning:
          "An artifact is packaged build output. A Git commit ID identifies source history; a digest can identify exact artifact bytes. Neither term means 'whatever is newest'.",
      },
      {
        term: "Gate / rollback",
        meaning:
          "A gate prevents promotion when evidence fails. Rollback is a tested procedure to restore an identified earlier working version, including configuration and data considerations.",
      },
    ],
    walkthrough: [
      {
        title: "Prove the local command",
        instruction:
          "Run python3 -m unittest -v in the inventory repository. Record the tests discovered and their outcomes before involving Actions.",
        expected:
          "Several meaningful tests pass. If zero run, repair discovery; automation would otherwise repeat the same empty success.",
      },
      {
        title: "Read the workflow as a program",
        instruction:
          "Save the example as .github/workflows/check.yml. Trace on → jobs.test → runner → checkout → unittest. Explain that contents: read grants source-read permission to the workflow token.",
        expected:
          "You can describe when it runs and what it has permission to do. Checkout places repository files on the runner.",
      },
      {
        title: "Make failure observable",
        instruction:
          "In a disposable branch, change one expected value to an intentionally wrong value. Run the same command locally, then use your existing reviewed Git push/PR workflow if remote runs are available.",
        expected:
          "unittest returns nonzero; the test step and job fail. Record the assertion that failed, not only the badge color.",
      },
      {
        title: "Fix the cause",
        instruction:
          "Restore the correct expectation or repair a genuine program defect. Run again and compare the passing revision to the failing revision with git rev-parse HEAD after committing.",
        expected:
          "A passing run tied to the corrected commit, with no continue-on-error workaround or ignored failure.",
      },
      {
        title: "Design the actual release gate",
        instruction:
          "Draw test → build/test artifact → deploy known artifact. State that a future deployment job must depend on checks, and specify its separate environment approval and minimal credentials. Name a known previous version and a rollback verification request.",
        expected:
          "The proposal distinguishes the current test-only demonstration from release protection that still needs configuration.",
      },
    ],
    commandDetails: [
      {
        command: "git rev-parse HEAD",
        breakdown:
          "git rev-parse resolves Git names; HEAD identifies the currently checked-out commit. The printed hash is the source revision, not a description of uncommitted changes.",
        expected: "A full commit ID in a Git repository.",
        pitfall:
          "Uncommitted edits are not represented by that hash. Record the committed revision associated with the run, and use git status to check for remaining edits.",
      },
      {
        command: "python3 -m unittest",
        breakdown:
          "Runs standard-library test discovery; -v names each test. In the workflow, the run step invokes this on the runner after checkout.",
        expected:
          "A nonzero status for a failing assertion, and a successful status with tests counted when all pass.",
        pitfall:
          "A green check can mean zero tests. Do not add continue-on-error or shell tricks that discard the failure status.",
      },
      {
        command: "Workflow syntax: on, permissions, jobs, runs-on, uses, run",
        breakdown:
          "on: [push, pull_request] declares events. permissions: contents: read limits token access. jobs contains named jobs; runs-on selects a runner label. uses invokes an action; run executes a shell command. YAML indentation defines nesting.",
        expected:
          "A checkout-and-test job triggered by the listed repository events, subject to repository settings and runner availability.",
        pitfall:
          "ubuntu-latest and an action's @v4 tag are moving references. The demo teaches structure; sensitive production workflows should select supported runtimes and reviewed immutable action versions.",
      },
    ],
    readiness: [
      "Demonstrate failing and passing assertions tied to revisions.",
      "Explain each workflow field and why source-read permission is sufficient here.",
      "Explain what additional dependency/protection makes failure block a real deployment.",
    ],
  },
  "reliability-sli": {
    startingPoint:
      "Use a small invented request dataset or redacted local lab logs. No monitoring service is needed. You already know that a process being active and a basic health check succeeding are limited observations.",
    whyItMatters:
      "Operators need to measure whether users can complete a task and decide when to act. Explicit definitions stop a dashboard from looking healthy simply because failures were excluded or data disappeared.",
    required: [
      "Define the measured user task, eligibility rule, success rule, and time window before counting outcomes.",
      "Calculate a request-success SLI as successes divided by eligible requests, then compare it with an SLO for that same window.",
      "Distinguish logs, metrics, and traces; distinguish an internal objective from a contractual SLA.",
      "Write an alert response with read-only observations, a decision point, a scoped possible change, rollback, and a recovery test using the affected user request.",
    ],
    optional: [
      {
        topic: "Percentiles, histograms, and burn-rate alerts",
        reason:
          "Useful when measuring latency and operational alert quality at scale. Start with a clearly defined success fraction and small dataset.",
      },
      {
        topic: "Full distributed tracing platforms",
        reason:
          "Tool installation is unnecessary to understand how a trace relates work across a single request.",
      },
    ],
    terms: [
      {
        term: "SLI / SLO / SLA",
        meaning:
          "A service-level indicator is the measurement; an objective is its target over a window; an agreement is a commitment whose consequences are defined by its terms.",
      },
      {
        term: "Eligible request / denominator",
        meaning:
          "The explicitly included population of requests. The denominator is its count; silent exclusion of failures makes the indicator misleading.",
      },
      {
        term: "Log / metric / trace",
        meaning:
          "A log describes events; a metric aggregates measurements over time; a trace links spans of work for one request across components.",
      },
      {
        term: "Error budget / runbook",
        meaning:
          "An error budget is the allowed unsuccessful portion under an objective. A runbook records how an operator investigates and responds, including verification.",
      },
    ],
    walkthrough: [
      {
        title: "Define success first",
        instruction:
          "Choose one operation, such as loading the local status page. State a sample time window, count the requests included, define acceptable response behavior, and describe what to do if data is missing.",
        expected:
          "Another learner could classify the same records consistently. No requests is 'no measurement', not automatically 100% success.",
      },
      {
        title: "Count the sample",
        instruction:
          "Use 10,000 eligible requests with 9,970 successes from the demo. Calculate failures, success percentage, and allowed failures under 99.9% for that same sample window.",
        expected:
          "30 failures, 99.7% success, and 10 allowed failures. The sample misses that objective; it does not directly state uptime minutes.",
      },
      {
        title: "Inspect an individual symptom",
        instruction:
          "Create a small table with time, operation, result, and a synthetic request ID. Identify a failed request and which log would help explain it. Describe how a trace could connect its downstream steps.",
        expected:
          "The dataset contains enough context to ask a concrete question, while excluding credentials and real personal information.",
      },
      {
        title: "Write an actionable alert response",
        instruction:
          "Draft three observations: repeat the failing request, inspect service/listener state in the correct environment, and inspect recent relevant logs or changes. Add a branch for timeout versus HTTP error.",
        expected:
          "The runbook leads to different investigations for different outcomes; restart is a possible later change, not its default first diagnostic.",
      },
      {
        title: "Prove recovery at the user boundary",
        instruction:
          "Specify how to repeat affected operations after any supported change and watch the same indicator over a stated recovery period. Record one limitation such as cached data, sampling, or delayed log delivery.",
        expected:
          "A running process alone cannot close the incident. You distinguish recovered user behavior from a delayed dashboard.",
      },
    ],
    commandDetails: [
      {
        command: "Calculation: 9970 / 10000 × 100 = 99.7%",
        breakdown:
          "9970 is the successful count; 10000 is the eligible total in the same time window. Allowed failures at 99.9% are 10000 × (1 - 0.999) = 10. A calculator or your earlier Python skills can perform the arithmetic; no monitoring CLI is required.",
        expected:
          "The measured success rate is below the target, with 30 observed failures against 10 allowed.",
        pitfall:
          "Do not divide by only successful or logged-success requests. A zero denominator has no defined success fraction, and request percentages are not automatically percentages of time.",
      },
    ],
    readiness: [
      "Compute the indicator from a fresh small dataset and state its denominator and window.",
      "Explain which telemetry answers a request question versus an aggregate question.",
      "Write a response that can demonstrate user-visible recovery and handle missing data honestly.",
    ],
  },
  "security-review": {
    startingPoint:
      "Use only the synthetic proposal in the demonstration. You have learned identity and network boundaries; this lesson practices a paper review without creating the unsafe settings or handling real secrets.",
    whyItMatters:
      "Broad permissions can make a task appear fixed while allowing unrelated damage. A useful review names the intended action, excessive authority, minimum replacement, and tests that prove both access and denial.",
    required: [
      "Identify the protected data, acting identity, permitted task, resource, and trust boundary before choosing permissions.",
      "Distinguish authentication (who you are), authorization (what you may do), encryption (how data is protected), and network access (which connections may reach a service).",
      "Treat secret exposure as a credential-lifecycle incident: revoke or rotate, update dependents, and investigate use. Deleting a current file does not revoke copied credentials.",
      "Write both an allowed test and an unrelated denied test. Keep audit visibility and a safe recovery path while narrowing authority.",
    ],
    optional: [
      {
        topic: "Formal threat-model methods and advanced policy conditions",
        reason:
          "Useful for complex organizations; an asset/identity/action/boundary sketch is enough to review this small proposal.",
      },
      {
        topic: "Git history rewriting and secret-scanning automation",
        reason:
          "Useful follow-up controls after a leak. Revocation of the actual exposed credential is the first containment step, and rewriting history cannot erase all copies.",
      },
    ],
    terms: [
      {
        term: "Least privilege",
        meaning:
          "Give an identity only the actions and resources required for its actual task, under appropriate conditions. Demonstrating success with administrator access does not discover the minimum.",
      },
      {
        term: "Secret / ordinary configuration",
        meaning:
          "A secret grants access when disclosed, such as a private key or token. An ordinary service URL may be public configuration, though surrounding data can still be private.",
      },
      {
        term: "Trust boundary / asset",
        meaning:
          "An asset is something you protect. A trust boundary is where data or authority crosses between actors or systems with different trust assumptions.",
      },
      {
        term: "Positive / negative verification",
        meaning:
          "A positive test proves an intended action is allowed. A negative test proves a specific unintended action is denied; it is not a general claim that all attacks are impossible.",
      },
    ],
    walkthrough: [
      {
        title: "Translate the task into a rule",
        instruction:
          "For 'read one application config object', name the workload identity, read action, and exact synthetic object. List an unrelated object and writes as outside the task.",
        expected:
          "A narrow requirement that can be tested. 'Administrator' no longer appears as an unexplained requirement.",
      },
      {
        title: "Review each unsafe line",
        instruction:
          "For administrator identity, world-open SSH, README secret, and disabled audit, write the risk and a replacement tied to the actual task. Keep network and identity findings separate.",
        expected:
          "Four actionable findings with rationale; encrypting data does not replace authorization, and an IAM change does not close an SSH port.",
      },
      {
        title: "Specify verification",
        instruction:
          "Write one allowed object-read test, one denied unrelated-object test, and one denied write test. For management, name the approved private or restricted path and its prerequisites.",
        expected:
          "Tests name concrete action/resource pairs and expected results; no real unauthorized target is probed.",
      },
      {
        title: "Walk a hypothetical leak",
        instruction:
          "Describe how an exposed synthetic token would be revoked in its issuing system, replaced for dependents, and checked for misuse if it were real. Explain why deleting its README line is insufficient.",
        expected:
          "Containment concerns the credential's actual validity, not just whether the latest Git view displays it.",
      },
      {
        title: "Prepare a safe review artifact",
        instruction:
          "Use invented identifiers and redact credentials, cookies, private data, and unnecessary account details. Specify a controlled recovery procedure if the restricted role breaks an intended operation.",
        expected:
          "A peer can understand the proposed change and its tests without receiving authority to the real environment.",
      },
    ],
    commandDetails: [
      {
        command:
          "Review observation: task → identity → action → resource → conditions",
        breakdown:
          "No live command is required. For each proposed permission, fill all five fields and connect it to a positive or negative test. IAM's Resource element scopes targets where the action supports resource-level permissions; unsupported scoping needs review rather than invented precision.",
        expected:
          "A synthetic permission/traffic matrix and verifiable remediation proposal.",
        pitfall:
          "Do not execute the deliberately unsafe proposal. A secret embedded in a browser JavaScript bundle can be read by visitors; calling it an environment variable does not make client-delivered data private.",
      },
    ],
    readiness: [
      "Separate identity, network, encryption, and secret-handling findings.",
      "Explain a specific allow/deny test pair and safe recovery path.",
      "Describe credential revocation and why source deletion alone does not contain a leak.",
    ],
  },
  "kubernetes-read": {
    startingPoint:
      "You understand container images, processes, ports, and packet paths. This lesson is a paper/object review; no cluster is required. CLI examples are diagnostic plans to explain, and should run only later against a named local or otherwise authorized lab cluster.",
    whyItMatters:
      "Kubernetes separates desired state from running processes and traffic routing. Understanding those relationships prevents changing replica counts when the actual problem is that no ready pods match a Service.",
    required: [
      "Distinguish cluster, node, pod, Deployment, and Service. A Deployment's controller manages desired pods; a Service selects traffic destinations by pod labels.",
      "Read labels as key/value metadata and selectors as matching rules. A Service does not route merely because its name resembles a Deployment name.",
      "Inspect context and namespace before any cluster query. Read Running and readiness separately; a running pod need not be ready to receive traffic.",
      "Diagnose selector mismatch with labels and EndpointSlices, then define a request through the Service as the final check. More replicas do not fix the wrong selector.",
    ],
    optional: [
      {
        topic: "Installing kind/minikube, writing probes, and rollout tuning",
        reason:
          "Useful next practical work after reviewing local resource needs and tool setup. This lesson's required evidence can remain a clearly labeled diagnosis plan.",
      },
      {
        topic: "Operators, CNI internals, and cluster administration",
        reason:
          "These are deeper specialties. A beginner first needs object relationships, targeting, and honest readiness evidence.",
      },
    ],
    terms: [
      {
        term: "Control plane / worker node",
        meaning:
          "The control plane coordinates desired and observed cluster state; worker nodes run workloads. A cluster may have several nodes but that alone does not prove application availability.",
      },
      {
        term: "Pod / Deployment",
        meaning:
          "A pod is a scheduled group of containers with shared context. A Deployment manages replicated pods through controllers and rollout configuration.",
      },
      {
        term: "Label / selector",
        meaning:
          "A label is metadata such as app=web. A selector is a matching rule; app=api does not match app=web.",
      },
      {
        term: "Service / EndpointSlice",
        meaning:
          "A Service gives a stable traffic abstraction. EndpointSlices describe backend endpoints and conditions; matching and readiness influence where normal Service traffic is sent.",
      },
      {
        term: "Context / namespace",
        meaning:
          "A kubeconfig context selects cluster, user, and often a default namespace. A namespace scopes many objects within a cluster, but is not by itself a complete security boundary.",
      },
    ],
    walkthrough: [
      {
        title: "Draw ownership and traffic separately",
        instruction:
          "Draw Deployment → managed pods for ownership, and Service → selected pods for traffic. Give both pods app=web and the Service selector app=api as in the demonstration.",
        expected:
          "Two running pods but zero pods matching that selector. The Deployment's name is irrelevant to this comparison.",
      },
      {
        title: "Name the target before diagnostics",
        instruction:
          "For the paper incident record the intended context and atlas-lab namespace. Explain what current-context would read locally and what -n atlas-lab adds to later queries.",
        expected:
          "Every planned cluster query has an explicit intended target. If no local cluster exists, record 'not executed' rather than inventing output.",
      },
      {
        title: "Compare status, labels, and readiness",
        instruction:
          "Predict the useful fields from get pods --show-labels and describe deployment. Separate missing pods, image-pull errors, readiness failures, and label mismatch as different possibilities.",
        expected:
          "Your diagnosis table names an observation that distinguishes each cause. Running alone does not settle readiness or Service selection.",
      },
      {
        title: "Inspect the Service's backend evidence",
        instruction:
          "Explain the Service selector and the EndpointSlices query below. For this deliberately mismatched example, predict no matching pod backends; do not confuse an existing Service object with usable endpoints.",
        expected:
          "The selector explains the absence. In a real cluster, endpoint conditions and actual object details need inspection.",
      },
      {
        title: "Propose the smallest fix and prove the path",
        instruction:
          "On paper change the intended Service selector to app=web, provided those are the desired pods. Specify checking ready backends, matching ports, and an HTTP request through the Service from an appropriate authorized client.",
        expected:
          "A bounded correction and verification plan. No apply/delete command or remote cluster mutation occurs in this reading exercise.",
      },
    ],
    commandDetails: [
      {
        command: "kubectl config current-context",
        breakdown:
          "kubectl is the Kubernetes CLI. config current-context reads the active context name from local kubeconfig; it does not prove the cluster is reachable or that you have permissions there.",
        expected: "A context name, or an error if no current context is set.",
        pitfall:
          "A familiar context name is not proof of safety. Verify its intended cluster and user through your approved configuration before live work.",
      },
      {
        command: "kubectl get pods",
        breakdown:
          "get requests a summary of pods; -n selects the namespace atlas-lab instead of relying on a default.",
        expected:
          "Names, readiness, status, restarts, and ages in that namespace, or an error/no resources if unavailable.",
        pitfall:
          "Running describes lifecycle state; the READY column and conditions carry different evidence. Do not remove -n just to make an empty result disappear.",
      },
      {
        command: "kubectl get pods -n atlas-lab --show-labels",
        breakdown:
          "--show-labels adds each pod's label metadata so you can compare it directly with the Service selector.",
        expected: "The intended example pods have app=web rather than app=api.",
        pitfall:
          "Read the actual pod template's labels, not only labels on the Deployment object; a Service selects pods.",
      },
      {
        command: "kubectl describe",
        breakdown:
          "describe asks for detailed observations and related events; deployment is the resource kind; web is its name; -n chooses the namespace.",
        expected:
          "Desired/available replica information, pod-template details, rollout conditions, and relevant events depending on state.",
        pitfall:
          "Events and status are evidence at a time, not a guarantee of current end-user HTTP behavior.",
      },
      {
        command: "kubectl get service web -n atlas-lab -o yaml",
        breakdown:
          "get service reads the named Service; -o yaml prints structured fields such as spec.selector, ports, and targetPort instead of the default summary.",
        expected:
          "A selector you can compare with the intended pod labels and service/container port relationship.",
        pitfall:
          "The example's web name is a reviewed placeholder; use the actual Service name in a real lab. Reading YAML does not validate that the application is serving.",
      },
      {
        command:
          "kubectl get endpointslices -n atlas-lab -l kubernetes.io/service-name=web",
        breakdown:
          "Gets EndpointSlice resources; -l filters by the controller's Service-name label. This query inspects backends for the named Service, not every running pod.",
        expected:
          "Backend endpoint information or no matching slices, depending on the Service and state. Inspect details/conditions when readiness is in question.",
        pitfall:
          "Do not equate any listed address with a ready healthy application. Complete the diagnosis with matching ports and a request through the Service.",
      },
    ],
    readiness: [
      "Match selectors against pod labels by hand.",
      "Explain context, namespace, running, ready, and endpoint evidence separately.",
      "Propose and verify a minimal selector correction without claiming paper review is live operation.",
    ],
  },
  "powershell-bridge": {
    startingPoint:
      "Use PowerShell on Windows for the Windows commands and Ubuntu/WSL for the Linux comparisons. The prompt and window title help identify the shell, but record the version as well. On another OS, mark Windows work as a reading exercise until a Windows environment is available.",
    whyItMatters:
      "Cloud engineers often work across Windows and Linux. PowerShell exposes structured properties, so learning its object pipeline avoids brittle text parsing and avoids applying commands to the wrong operating environment.",
    required: [
      "Identify shell, operating environment, and location before interpreting output. Windows and WSL do not share one process/service database.",
      "Explain cmdlets' Verb-Noun names, the pipe, named parameters, property selection, and property filtering.",
      "Read process and service information without stopping anything. A process is an executing program; a service is a managed background workload with its own control system.",
      "Keep paths, IDs, permissions, and networking context explicit when translating an operational note between environments.",
    ],
    optional: [
      {
        topic: "PowerShell functions, remoting, and advanced scripting",
        reason:
          "Useful for Windows automation later; this bridge needs object inspection and correct environment targeting.",
      },
      {
        topic: "Test-NetConnection and Resolve-DnsName",
        reason:
          "Useful follow-on network diagnostics. Compare the precise question each answers rather than assuming it exactly replaces Linux ss or getent.",
      },
    ],
    terms: [
      {
        term: "Cmdlet / parameter",
        meaning:
          "A cmdlet is a PowerShell command such as Get-Process. Named parameters such as -First modify its behavior; positional property lists can also supply arguments.",
      },
      {
        term: "Object / property",
        meaning:
          "An object carries structured values. A process has properties such as Name and Id; a service has Status. The displayed table is a view of those objects.",
      },
      {
        term: "Pipeline / comparison operator",
        meaning:
          "The | pipe passes output objects to the next command. -eq compares values for equality; Where-Object uses that comparison to keep matching objects.",
      },
      {
        term: "WSL boundary",
        meaning:
          "WSL provides a Linux environment alongside Windows. Files may be reachable across it, but paths, process identities, services, and command semantics are not interchangeable.",
      },
    ],
    walkthrough: [
      {
        title: "Identify both environments",
        instruction:
          "In PowerShell run $PSVersionTable.PSVersion and Get-Location. In Ubuntu run pwd and record that window as Linux. Keep the two outputs in separately labeled notes.",
        expected:
          "A PowerShell version and Windows-style location, versus the Linux working directory. Machine-specific paths differ.",
      },
      {
        title: "Select structured process fields",
        instruction:
          "Run Get-Process | Select-Object -First 5 Name, Id in PowerShell. Explain what the first command produces and why the next command can name properties.",
        expected:
          "Up to five process objects displayed using only Name and Id. The particular processes and their order are not a promised fixture.",
      },
      {
        title: "Filter services by a property",
        instruction:
          "Run Get-Service | Where-Object Status -eq Running. Pick one result and explain the filter. Do not stop or restart it.",
        expected:
          "Services whose Status property compares equal to Running. Some protected service reads or editions can produce access or availability differences.",
      },
      {
        title: "Compare questions, not spellings",
        instruction:
          "In Ubuntu use the earlier ps and systemctl inspection commands for a known local lab service. Record how those observations differ from the Windows process/service list.",
        expected:
          "You do not expect matching service names or PIDs across Windows and Linux. An absent Linux service says nothing about the Windows service database.",
      },
      {
        title: "Write an environment-aware handoff",
        instruction:
          "Make a small note naming which shell to open, what command to run, which field to inspect, and what each observation cannot prove.",
        expected:
          "A beginner can choose the correct terminal and inspect a workload without making unintended changes.",
      },
    ],
    commandDetails: [
      {
        command: "$PSVersionTable.PSVersion",
        breakdown:
          "$PSVersionTable is a PowerShell variable holding version information; .PSVersion selects its version property. This is an expression, not a Bash command.",
        expected:
          "A structured version display such as major/minor/build information, varying by edition.",
        pitfall:
          "A dollar sign appears in both shells, but variable and property syntax follow different language rules.",
      },
      {
        command: "Get-Location",
        breakdown:
          "Get-Location returns the current PowerShell location. It has no arguments in this example.",
        expected:
          "A Path value for the current location, commonly a Windows filesystem path.",
        pitfall:
          "A Windows path such as C:\\Users is not the same text as its Linux-mounted path. Do not blindly paste one into the other shell.",
      },
      {
        command: "Get-Process",
        breakdown:
          "Get-Process produces process objects. | passes them to Select-Object. -First 5 limits the count; Name, Id selects two properties. The comma separates property names.",
        expected:
          "A small table of names and process IDs from this Windows environment.",
        pitfall:
          "First does not mean busiest or most important. Do not parse table spacing when the properties are already structured.",
      },
      {
        command: "Get-Service",
        breakdown:
          "Get-Service reads Windows service objects. Where-Object inspects each Status property and -eq keeps those equal to Running. Running is the comparison value in this simplified property-filter syntax.",
        expected:
          "Only matching service objects, subject to machine permissions and available services.",
        pitfall:
          "This does not start services or prove an application's user-facing function. Get-Service is a Windows-specific inspection in this lesson.",
      },
      {
        command: "pwd",
        breakdown:
          "In the Ubuntu comparison, pwd prints the Linux working directory. PowerShell can also provide a pwd alias, so the spelling alone does not prove the shell.",
        expected: "A Linux path when executed in Ubuntu.",
        pitfall:
          "Use environment/version evidence, not one command name, to decide which shell you are in.",
      },
      {
        command: "ps -ef",
        breakdown:
          "In Linux, ps inspects processes; -e selects all processes and -f requests fuller information including identity/parent details.",
        expected: "Linux process rows; values vary over time.",
        pitfall:
          "Run this comparison in Ubuntu. PowerShell aliases and native utilities can interpret superficially similar names differently.",
      },
      {
        command: "systemctl status nginx --no-pager",
        breakdown:
          "In systemd-enabled Ubuntu, systemctl queries the Linux unit; status selects inspection, nginx names the lab service, and --no-pager keeps output in the terminal.",
        expected:
          "The Linux service state or an environment/unit error that you can classify.",
        pitfall:
          "WSL must actually be running systemd for this command to manage those services. It is not a Windows service-inspection command.",
      },
    ],
    readiness: [
      "Identify the target shell before using either command family.",
      "Explain object selection and filtering without treating the display as raw text.",
      "Produce a clear two-environment inspection note and avoid changing critical services.",
    ],
  },
  "ai-verify": {
    startingPoint:
      "Use the synthetic Nginx incident, your Linux diagnostic knowledge, and official tool documentation. An AI account is optional; a peer-written suggestion works. The skill being practiced is your review and verification, not prompt length.",
    whyItMatters:
      "An apparently fluent answer can omit a prerequisite, target the wrong system, or propose excessive authority. Breaking a suggestion into hypothesis, scope, expected evidence, and recovery keeps you in control of operational decisions.",
    required: [
      "Write the observed failure, expected behavior, environment, and your own first hypothesis before requesting a suggestion.",
      "Explain every command token and its scope. Distinguish read-only observations from changes; reject unnecessary authority and unrelated destructive operations.",
      "State what result would support or contradict a hypothesis, and what the proposed diagnostic cannot prove.",
      "Verify recovery independently by repeating the failed operation, then explain the reasoning later without the suggestion. Use redacted/synthetic data in learning prompts.",
    ],
    optional: [
      {
        topic: "Model comparisons, prompt frameworks, and agent automation",
        reason:
          "These may improve workflow later, but cannot replace the core habit of understanding and independently testing one proposed action.",
      },
      {
        topic: "Automated command policies and evaluation suites",
        reason:
          "Useful when deploying assistants in teams; this lesson first develops the human review needed to judge their output.",
      },
    ],
    terms: [
      {
        term: "Hypothesis / falsification",
        meaning:
          "A hypothesis is a proposed explanation. A falsifying observation is one that shows the explanation does not fit, such as a healthy listener contradicting a claim that no process is listening.",
      },
      {
        term: "Read-only / mutation",
        meaning:
          "A read-only diagnostic observes state; a mutation changes it. Some commands can do either depending on subcommands and flags, so inspect the exact invocation.",
      },
      {
        term: "Scope / authority",
        meaning:
          "Scope identifies which files, services, hosts, or accounts are affected. Authority determines what the action is permitted to change; both should fit the task.",
      },
      {
        term: "Independent verification",
        meaning:
          "Evidence from the actual system or documented behavior, rather than simply asking the same source whether its suggestion was correct.",
      },
    ],
    walkthrough: [
      {
        title: "Try before asking",
        instruction:
          "Read the synthetic connection-refused symptom and write one hypothesis plus one read-only test. Record that localhost refers to the machine where the command runs.",
        expected:
          "A specific, testable possibility such as 'nothing is listening on this target port', rather than 'the cloud is broken'.",
      },
      {
        title: "Review one suggestion",
        instruction:
          "Use the demo prompt or ask a peer. For the suggested command, name the executable, subcommand, flags, target, permissions, and side effects. Check uncertain syntax with its manual.",
        expected:
          "A plain-language prediction of both likely successful and failing observations before execution.",
      },
      {
        title: "Inspect without changing",
        instruction:
          "In your disposable local lab, inspect service status or listening sockets. If this is only a paper scenario, label the output as predicted and list the evidence you would collect.",
        expected:
          "The chosen observation narrows the hypothesis; service active alone does not prove a listener or successful HTTP request.",
      },
      {
        title: "Evaluate the proposed fix",
        instruction:
          "Accept a change only when the evidence identifies a specific supported cause, a narrow target, and a recovery path. Explain why the example's world-writable recursive system-wide permission change is unrelated to connection refusal.",
        expected:
          "A review that can reject an unsafe suggestion without trying it. A mutation is not justified merely because an assistant sounded confident.",
      },
      {
        title: "Close the reasoning loop",
        instruction:
          "After a supported lab fix, repeat the exact failed HTTP request and inspect relevant logs. Close the answer and write why the fix matched the evidence; revisit the reasoning later.",
        expected:
          "Your proof is an actual response and an explanation you can reproduce, with any remaining uncertainty stated.",
      },
    ],
    commandDetails: [
      {
        command: "systemctl status nginx --no-pager",
        breakdown:
          "systemctl queries systemd in the relevant Ubuntu environment; status reads the unit's state; nginx names the service; --no-pager prevents opening a pager.",
        expected:
          "Service state and recent relevant output, or a clear unavailable-unit/systemd error.",
        pitfall:
          "This observes service management, not complete application behavior. Do not blindly add sudo or restart just because a result is unfamiliar.",
      },
      {
        command: "ss -ltn",
        breakdown:
          "ss inspects sockets; -l selects listeners, -t selects TCP, and -n keeps numeric addresses/ports. Read the local address to distinguish loopback-only from other bindings.",
        expected: "Local TCP listening sockets at the time of inspection.",
        pitfall:
          "Inspect the actual target environment. Your laptop's sockets do not establish the state of a remote server.",
      },
      {
        command: "curl --max-time 3 -I http://localhost",
        breakdown:
          "curl makes the request; --max-time 3 sets a total bound; -I asks for headers using HEAD; localhost names the calling environment's loopback host.",
        expected:
          "Headers or a bounded connection/protocol error to compare with the original symptom.",
        pitfall:
          "A HEAD request is not identical to every user operation. Match the original URL and method for final verification when those differ.",
      },
      {
        command: "man systemctl",
        breakdown:
          "man opens the installed manual for systemctl. Search or scroll to the relevant subcommand/option, and press q to leave the usual pager.",
        expected:
          "Locally installed documentation appropriate to that tool's version when manual pages are available.",
        pitfall:
          "If the manual is absent, consult official documentation for the installed version. Missing documentation is not evidence that a guessed flag exists.",
      },
      {
        command: "Do not run: chmod -R 777 /",
        breakdown:
          "The dangerous example would recursively change permission modes throughout the root filesystem. -R recurses, 777 grants read/write/execute broadly, and / is the whole filesystem root.",
        expected:
          "This is a rejection exercise only; no execution or permission change is appropriate.",
        pitfall:
          "A warning label does not make trying it safe. Explain its excess scope and inspect the actual failing boundary instead.",
      },
    ],
    readiness: [
      "Review a command's scope and flags before running it.",
      "Give an observation that could disprove your own hypothesis.",
      "Explain the fix and recovery evidence from memory without relying on the assistant's assertion.",
    ],
  },
  "architecture-tradeoffs": {
    startingPoint:
      "Use a written scenario, not infrastructure. You have already practiced request paths, least privilege, and user-facing indicators. State the required user operation, traffic expectations, data importance, and budget assumptions before drawing services.",
    whyItMatters:
      "Adding replicas can protect compute while leaving shared data or deployment as a single point of failure. Architecture work makes those tradeoffs explicit and designs experiments that can later prove the promised behavior.",
    required: [
      "Identify stateless processing versus durable state and their owners. A second application copy does not automatically protect shared data.",
      "Name each failure domain and trace what happens when every dependency is unavailable, including the load balancer and shared upstream services.",
      "Explain queue buffering, retries, duplicate delivery, and idempotent handling without assuming a queue guarantees exactly-once effects.",
      "Distinguish RPO (tolerable data loss measured in time) from RTO (target recovery duration), and plan a restore rehearsal that can measure both.",
    ],
    optional: [
      {
        topic:
          "Consensus, multi-region consistency, and specialized distributed databases",
        reason:
          "Necessary for certain strict requirements; not required to compare two small designs and name their failure limits.",
      },
      {
        topic: "Live chaos experiments and automated failover",
        reason:
          "Follow only after a reviewed recovery procedure and safe environment exist. The current deliverable is an experiment plan, not a production fault injection.",
      },
    ],
    terms: [
      {
        term: "Stateless / durable state",
        meaning:
          "A stateless request handler does not require its own local prior-session data to serve the next request. Durable state is data intentionally retained across process loss, with its own recovery strategy.",
      },
      {
        term: "Single point of failure / redundancy",
        meaning:
          "A component whose loss prevents the required task is a single point of failure. Redundancy helps only when replacement paths survive the same event.",
      },
      {
        term: "Queue / idempotency",
        meaning:
          "A queue buffers work for later processing. Idempotent handling makes retrying the same logical operation avoid duplicate intended effects, often using an operation identifier.",
      },
      {
        term: "RPO / RTO",
        meaning:
          "Recovery Point Objective is the maximum acceptable age of recoverable data. Recovery Time Objective is the target elapsed duration to restore the required service.",
      },
      {
        term: "Degraded behavior / restore rehearsal",
        meaning:
          "Degraded behavior intentionally preserves a smaller useful function during failure. A restore rehearsal actually recovers data into a controlled destination and checks its contents and timing.",
      },
    ],
    walkthrough: [
      {
        title: "Write measurable needs",
        instruction:
          "Pick a hypothetical small application. State the user operation, tolerated interruption, data-loss tolerance, and budget constraints. Label assumptions rather than pretending they are stakeholder promises.",
        expected:
          "Requirements that can be tested, such as tolerating one application-host failure and restoring a known dataset within a stated target.",
      },
      {
        title: "Compare two designs",
        instruction:
          "Draw a single-host option and a two-app option with deliberate data storage. Mark stateful components and ask what survives losing each host.",
        expected:
          "The tradeoff recognizes shared database, load balancer, configuration, identity, and deployment dependencies. Two boxes do not automatically satisfy every availability requirement.",
      },
      {
        title: "Walk repeated work",
        instruction:
          "For a queued email or report job, imagine a worker finishes the effect but crashes before acknowledging completion. Describe how the job could be delivered again and how an operation ID prevents a duplicate intended effect.",
        expected:
          "A concrete idempotency strategy, not simply the promise that the queue never duplicates anything.",
      },
      {
        title: "Design compute failure verification",
        instruction:
          "Write a future safe experiment: baseline the user request, remove one disposable compute instance under review, repeat requests, record impact, and recover. Name abort conditions and who may run it.",
        expected:
          "A paper plan that measures the required task and distinguishes a host failure from a shared dependency failure. No live fault is injected here.",
      },
      {
        title: "Design data recovery verification",
        instruction:
          "Choose a known synthetic record and backup time. Plan restoration to a separate reviewed destination, check record integrity, measure elapsed recovery, and compare the last recovered timestamp to the incident time.",
        expected:
          "Evidence that could establish actual RPO/RTO performance. A successful backup-job badge alone is insufficient.",
      },
      {
        title: "Make the tradeoff explicit",
        instruction:
          "Choose a design and state what it guarantees, what it cannot yet guarantee, expected cost inputs, and what you would renegotiate under a smaller budget.",
        expected:
          "A defendable decision record with failure and recovery tests, rather than a service catalog or unmeasured availability claim.",
      },
    ],
    commandDetails: [
      {
        command:
          "Paper experiment: baseline → fault → observe → recover → verify",
        breakdown:
          "No CLI or deployment is required. Name the user request, fault scope, observable metric, abort condition, recovery action, data-integrity check, and cleanup for a later reviewed exercise.",
        expected:
          "An experiment plan another engineer could assess before execution, plus separate compute and data recovery criteria.",
        pitfall:
          "Do not report a planned failover or restore as successful evidence. A backup timestamp and replication count do not demonstrate that recovery actually works.",
      },
    ],
    readiness: [
      "Explain every component using its purpose and failure behavior.",
      "Demonstrate RPO versus RTO with a concrete hypothetical timeline.",
      "Identify shared failure risks and design independent compute and data recovery checks.",
    ],
  },
  "aws-field": {
    startingPoint:
      "This checkpoint is for a reviewed AWS sandbox you already own or are authorized to use. Complete aws-plan and security-review, current official setup instructions, a region-specific cost review, and a cleanup checklist first. If you have no sandbox, practice the plan and return later; a paper design does not become real operating evidence.",
    whyItMatters:
      "A real cloud request reveals details a diagram cannot prove: the active principal, actual routes and rules, application response, storage authorization, and what remains allocated after cleanup. The goal is to explain those observations rather than merely capture service logos.",
    required: [
      "Identify the current AWS principal and intended region/profile before inspection. Keep credentials out of Atlas, source code, screenshots, and shared command history.",
      "Explain one actual EC2 application request through addressing, subnet, route, traffic policy, listener, and response. Use resource relationships from your reviewed sandbox, not expected output copied from an example.",
      "Prove a scoped S3 operation is allowed and one intentionally out-of-scope action is denied using only synthetic reviewed resources. Distinguish authorization failure from route, DNS, or TLS failure.",
      "Record current cost assumptions and resource IDs privately, perform reviewed cleanup, then inspect remaining allocations and cost reporting. Delayed billing data is not immediate proof of zero remaining charges.",
    ],
    optional: [
      {
        topic: "Additional services and production availability",
        reason:
          "Not needed for this small evidence checkpoint. More components increase the explanation and cleanup burden.",
      },
      {
        topic: "Automating the manual lab with infrastructure as code",
        reason:
          "A useful later project once you can explain the actual requests, permissions, and cleanup manually.",
      },
    ],
    terms: [
      {
        term: "Principal / ARN",
        meaning:
          "A principal is the acting AWS identity. An ARN is a structured AWS resource name; get-caller-identity reports identity details, not the full set of effective permissions.",
      },
      {
        term: "Profile / region",
        meaning:
          "A CLI profile selects configured authentication/settings; a region selects the service's deployment area. Your shell can inherit settings, so assumptions need explicit checks.",
      },
      {
        term: "Resource evidence / redaction",
        meaning:
          "Resource evidence ties observed requests to actual resources. Redaction removes credentials, private data, and unnecessary account details while retaining enough relationships to explain the system.",
      },
      {
        term: "AccessDenied / connectivity failure",
        meaning:
          "An authorization error means a service evaluated a request and refused it under applicable controls. A timeout or resolution error alone does not establish that an IAM policy denied anything.",
      },
    ],
    walkthrough: [
      {
        title: "Review the boundary before operating",
        instruction:
          "Write owner, approved authentication method, intended region, exact lab resources, current estimate inputs, and a complete cleanup sequence. Follow the reviewed official lab setup; this checkpoint is not a universal create-everything command list.",
        expected:
          "A reviewed operating plan. Stop if authorization, prices, ownership, or teardown are unclear; preparation alone is still design evidence.",
      },
      {
        title: "Identify the acting identity",
        instruction:
          "With your approved temporary session active, run aws sts get-caller-identity using the intended profile when necessary. Compare the account and role privately with the reviewed plan, then sanitize the evidence.",
        expected:
          "The intended principal's UserId, Account, and Arn fields, or a credential/connectivity error to resolve before resource work. The command does not enumerate effective permissions.",
      },
      {
        title: "Prove the actual request path",
        instruction:
          "Use your completed reviewed lab to collect application response, EC2-to-subnet association, relevant routes, security-group traffic rule, and listener evidence. Explain how each contributes to that exact request.",
        expected:
          "A coherent set of actual observations. A screenshot of a running instance without an application response is insufficient.",
      },
      {
        title: "Compare allowed and denied storage actions",
        instruction:
          "For the same scoped workload identity, perform the reviewed permitted read and the planned denied action against synthetic lab objects you control. Record the exact action, target relationship, result, and relevant audit observations if configured.",
        expected:
          "One justified allow and one justified denial. A nonexistent object, wrong region, or expired credential is not automatically proof of the intended least-privilege boundary.",
      },
      {
        title: "Explain a real failure",
        instruction:
          "Record one real observed failure from the reviewed lab, a competing hypothesis, the discriminating observation, the smallest supported fix, and the repeated original request.",
        expected:
          "A clear incident-style narrative based on evidence rather than a fabricated failure or broad administrator-access workaround.",
      },
      {
        title: "Verify cleanup and limitations",
        instruction:
          "Execute the already reviewed cleanup for those resources only. Inspect the relevant regional inventories and retained storage/allocations; record resources deliberately retained, then revisit cost reporting after its normal delay.",
        expected:
          "Before/after evidence and an honest statement of what was removed, retained, and not yet reflected in billing. Stopping EC2 alone is not complete cleanup.",
      },
    ],
    commandDetails: [
      {
        command: "aws sts get-caller-identity",
        breakdown:
          "aws invokes the configured AWS CLI; sts selects Security Token Service; get-caller-identity asks which identity's credentials signed this request. It is an identity query, not a resource-creation command.",
        expected:
          "JSON with UserId, Account, and Arn for the current authenticated caller, or an actionable authentication/network error.",
        pitfall:
          "Success proves the caller identity, not permission to run a later EC2 or S3 operation. Account/role output can be identifying; keep raw evidence private and redact shared copies.",
      },
      {
        command:
          "aws sts get-caller-identity --profile REVIEWED_PROFILE --region REVIEWED_REGION --no-cli-pager",
        breakdown:
          "This is a template: replace the two uppercase placeholders with your approved profile and region, without angle brackets. --profile selects configuration, --region selects the request region, and --no-cli-pager prints directly in the terminal.",
        expected:
          "The identity for that reviewed session. Never paste private credentials as command arguments to make this work.",
        pitfall:
          "An explicit profile is not a guarantee it points to the right account. Compare the resulting identity with the plan before continuing.",
      },
    ],
    readiness: [
      "Explain actual identity, network, application, and S3 evidence independently.",
      "Distinguish a purposeful authorization denial from a missing object or broken network.",
      "Show reviewed cleanup and cost follow-up without submitting credentials or claiming unexecuted plans as field experience.",
    ],
  },
};
