import type { Lesson } from "./types";

/** Released bridge lessons are usable now; the section topic map is broader than these lessons. */
export const advanced: Lesson[] = [
  {
    id: "bash-health",
    section: 6,
    title: "A health check that tells the truth",
    summary:
      "Turn a known diagnostic into a small script with an honest exit status.",
    minutes: 30,
    status: "released",
    prerequisites: ["terminal-control", "troubleshoot-nginx", "git-basics"],
    outcomes: [
      "Quote a variable without splitting it",
      "Branch on a command result",
      "Return a useful exit status to another program",
    ],
    concepts: [
      {
        title: "A script is a repeatable decision",
        body: "A shell script runs the commands you could type yourself. Automate a task only after you know what each command changes and what failure looks like. The shebang tells the operating system which interpreter to use.",
      },
      {
        title: "Text and success are different outputs",
        body: "A monitoring system reads both the message and the exit code. Printing “healthy” is not proof. Make a bounded HTTP request, inspect its result, and return a nonzero code when the check fails.",
      },
      {
        title: "Quotes preserve boundaries",
        body: "Double quotes keep a variable containing spaces together as one argument. An unset argument can be handled with a default such as ${1:-http://localhost}. A URL is data, never a command to evaluate.",
      },
    ],
    commands: [
      {
        command: "bash health.sh",
        purpose: "Run the script with Bash.",
        example: "bash health.sh http://localhost",
      },
      {
        command: "curl -fsS --max-time 3",
        purpose: "Fail on HTTP errors, show errors, and bound the wait.",
        example: "curl -fsS --max-time 3 http://localhost",
        caution:
          "Check the correct endpoint; a redirect or cached response may hide an unhealthy dependency.",
      },
      {
        command: "exit",
        purpose: "Return a result to the caller.",
        example: "exit 1",
      },
    ],
    demo: {
      title: "health.sh",
      code: '#!/usr/bin/env bash\nurl="${1:-http://localhost}"\nif curl -fsS --max-time 3 --proto "=http,https" -- "$url" > /dev/null; then\n  echo "HTTP check passed"\n  exit 0\nelse\n  echo "HTTP check failed" >&2\n  exit 1\nfi',
      explanation:
        "The --proto option restricts URLs to HTTP/HTTPS; -- ends option parsing. This checks one HTTP endpoint. It does not prove database health, TLS validity for plain HTTP, or user experience. Its failure is visible to the calling shell.",
    },
    practice: [
      "Save the script inside ~/atlas-labs/health and run bash health.sh against your local lab service.",
      "Run it against http://localhost:65530 after confirming that port is unused. Inspect $? immediately.",
      "Explain why both the three-second bound and the quoted URL matter.",
    ],
    exercises: [
      {
        id: "bash-exit",
        kind: "recall",
        prompt: "What exit command signals a failed health check?",
        answers: ["exit 1"],
        explanation: "Zero means success; a nonzero code reports failure.",
        hint: "Use exit followed by a nonzero number.",
      },
      {
        id: "bash-quote",
        kind: "fill",
        prompt:
          "Fill the argument so $url stays a single argument: curl -I ___",
        answers: ['"$url"', '"${url}"'],
        explanation:
          "Double quotes preserve whitespace while expanding the variable.",
        hint: "Use double quotes around the variable.",
      },
      {
        id: "bash-status",
        kind: "predict",
        prompt:
          "The script exits with status 1. What does echo $? print in the parent shell immediately afterward?",
        answers: ["1"],
        explanation:
          "The shell stores the last command’s status, not its output.",
        hint: "Look at the exit argument.",
      },
    ],
    lab: {
      title: "A truthful local health monitor",
      environment:
        "Ubuntu/WSL or macOS Bash; curl; a disposable local HTTP service. No cloud account.",
      scenario:
        "A teammate needs a check that an automation system can trust, including when the service is unavailable.",
      steps: [
        "Create health.sh with an argument and a timeout.",
        "Capture success and failure messages and exit statuses.",
        "Commit the script and a README explaining its limited scope.",
      ],
      evidence: [
        "Script source",
        "One successful and one failed request with exit codes",
        "Explanation of one false-positive risk",
      ],
      rubric: [
        "The URL is quoted",
        "The request has a timeout",
        "Failures return nonzero",
        "Both paths were tested",
      ],
      hints: [
        "An if statement can use curl’s exit status directly.",
        "Read $? before running another command.",
      ],
      solution:
        "Use the demonstrated script, test localhost and an unused port, then record the result immediately with echo $?. A command printing a friendly string is insufficient evidence.",
      challenge:
        "Without looking at the example, add a timestamp and document how a caller should react to failure. Test a URL containing a path.",
    },
    resourceIds: ["bash"],
  },
  {
    id: "python-inventory",
    section: 7,
    title: "Turn JSON into an engineering report",
    summary:
      "Read structured inventory, validate it, and test the failure path.",
    minutes: 40,
    status: "released",
    prerequisites: ["bash-health"],
    outcomes: [
      "Read JSON from a file",
      "Use a function and a list comprehension",
      "Test invalid inputs without a cloud account",
    ],
    concepts: [
      {
        title: "Data has a shape",
        body: "JSON represents objects, lists, strings, numbers, booleans, and null. An inventory file is useful only if its records have the fields your report needs. A missing field is a data problem to explain, not silently ignore.",
      },
      {
        title: "Separate decisions from file access",
        body: "A small function that accepts a list and returns a count is easier to test than a script that mixes file access, network requests, and printing everywhere.",
      },
      {
        title: "Exceptions should be meaningful",
        body: "A missing file and malformed JSON are different failures. First observe the original exception. Catch specific exceptions at the program boundary when you can explain what the operator should do.",
      },
    ],
    commands: [
      {
        command: "python3 -m venv .venv",
        purpose: "Create an isolated environment for later dependencies.",
        example: "python3 -m venv .venv",
      },
      {
        command: "python3 inventory.py",
        purpose: "Run the program.",
        example: "python3 inventory.py",
      },
      {
        command: "python3 -m unittest",
        purpose: "Run standard-library tests.",
        example: "python3 -m unittest -v",
      },
    ],
    demo: {
      title: "inventory.py · standard library only",
      code: 'import json\nfrom pathlib import Path\n\ndef running_names(records):\n    return [item["name"] for item in records if item["state"] == "running"]\n\nif __name__ == "__main__":\n    records = json.loads(Path("inventory.json").read_text())\n    print(running_names(records))',
      explanation:
        'Create inventory.json containing [{"name":"web-1","state":"running"},{"name":"worker-1","state":"stopped"}]. The function returns a list; printing is kept at the entry point.',
    },
    practice: [
      "Predict the report before running the file.",
      "Change both states to stopped, then test an empty list.",
      "Delete the state key in a disposable fixture and explain the exception.",
    ],
    exercises: [
      {
        id: "py-result",
        kind: "predict",
        prompt:
          'What list does running_names return for [{"name":"web-1","state":"running"}]?',
        answers: ["['web-1']", '["web-1"]'],
        explanation: "The single running record contributes its name.",
        hint: "The result is a list containing the name.",
      },
      {
        id: "py-json",
        caseSensitive: false,
        kind: "recall",
        prompt: "Which standard-library module parses JSON?",
        answers: ["json"],
        explanation:
          "The json module handles JSON text; it does not validate a business schema.",
        hint: "Its name is the data format.",
      },
      {
        id: "py-test",
        kind: "recall",
        prompt: "Run standard-library tests in verbose mode.",
        answers: ["python3 -m unittest -v", "python -m unittest -v"],
        explanation: "Tests should cover empty, valid, and malformed inputs.",
        hint: "Use python3 -m followed by unittest.",
      },
    ],
    lab: {
      title: "Inventory report with failure evidence",
      environment:
        "Python 3 on Ubuntu/WSL or macOS. No packages or credentials required.",
      scenario:
        "An operations inventory sometimes contains incomplete records. Build a report whose assumptions are documented.",
      steps: [
        "Create the two-record inventory and report.",
        "Write unittest cases for running, stopped, and empty input.",
        "Add validation for missing name or state and test the chosen error.",
      ],
      evidence: [
        "Python source and fixture",
        "Test output",
        "Explanation of how malformed records are handled",
      ],
      rubric: [
        "Valid data produces the expected names",
        "An empty list works",
        "Malformed input has a tested behavior",
        "No credentials appear in fixtures",
      ],
      hints: [
        "Import running_names from inventory in test_inventory.py.",
        "Use self.assertEqual and self.assertRaises.",
      ],
      solution:
        "Test running_names directly. Check required keys and accepted states before filtering; raise ValueError with a record index for malformed records. Do not use eval to read data.",
      challenge:
        "Write a JSON report to a new file, preserving the original. Add a CLI filename argument and a test for a missing input file.",
    },
    resourceIds: ["python"],
  },
  {
    id: "cloud-packet",
    section: 8,
    title: "Draw the packet path before changing a rule",
    summary:
      "Distinguish a route, a firewall rule, and an application listener.",
    minutes: 30,
    status: "released",
    prerequisites: ["network-http", "troubleshoot-layers"],
    outcomes: [
      "Explain a /24 address range",
      "Separate route reachability from allowed traffic",
      "Diagnose an HTTPS failure one layer at a time",
    ],
    concepts: [
      {
        title: "An address is not a route",
        body: "An interface has an address. A route says where packets for a destination go next. A /24 IPv4 prefix fixes the first 24 bits, leaving eight host bits: 256 total addresses. A provider may reserve some addresses.",
      },
      {
        title: "A firewall is not a listener",
        body: "Allowing TCP port 443 does not start a web server. A reachable route, allowed traffic in both directions as required, a listening application, and a valid TLS exchange are different conditions.",
      },
      {
        title: "NAT changes addresses",
        body: "NAT translates addresses as traffic crosses a boundary. Outbound translation does not by itself create a public endpoint for unsolicited inbound traffic. Trace the return path as carefully as the request.",
      },
    ],
    commands: [
      {
        command: "ip route get",
        purpose: "Ask Linux which route it would use.",
        example: "ip route get 203.0.113.10",
      },
      {
        command: "curl -Iv",
        purpose: "Inspect an HTTPS exchange, including TLS.",
        example: "curl -Iv --max-time 5 https://example.com",
        caution: "Do not use -k as a production fix for certificate errors.",
      },
    ],
    demo: {
      title: "Request path",
      code: "client → DNS → destination IP\n       → route → firewall → listener :443\n       → TLS certificate → HTTP response\n       ← return route ← response",
      explanation:
        "A timeout does not identify a firewall on its own. Compare local and remote observations to narrow the failed boundary.",
    },
    practice: [
      "Draw the path from your browser to a local VM web service.",
      "Annotate where DNS, NAT, and a firewall may act.",
      "State what ss can prove and what it cannot prove about a remote client.",
    ],
    exercises: [
      {
        id: "packet-range",
        kind: "recall",
        prompt: "How many total IPv4 addresses are in a /24?",
        answers: ["256"],
        explanation:
          "32 minus 24 leaves 8 bits; 2^8 is 256, before reservations.",
        hint: "Two to the power of eight.",
      },
      {
        id: "packet-listener",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "The firewall allows 443 but ss shows no listener. Which layer should you inspect: DNS, application, or NAT?",
        answers: ["application"],
        explanation: "A firewall rule cannot create a process that listens.",
        hint: "Something must bind the port.",
      },
      {
        id: "packet-tls",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "HTTPS returns a certificate name mismatch. Which protocol layer needs attention?",
        answers: ["tls"],
        explanation:
          "The TCP connection progressed far enough to exchange a certificate.",
        hint: "The security layer between TCP and HTTP.",
      },
    ],
    lab: {
      title: "Packet-path incident review",
      environment:
        "Paper or a local diagram editor plus your Linux lab. Example IPs are documentation ranges.",
      scenario:
        "A web service works from its own host but times out remotely. Propose observations before any change.",
      steps: [
        "Draw forward and return paths.",
        "List three competing hypotheses and one discriminating test for each.",
        "Explain why opening every port would not be a justified fix.",
      ],
      evidence: [
        "Diagram or textual packet path",
        "Tests and expected outcomes",
        "Minimal change and rollback proposal",
      ],
      rubric: [
        "Listener and route are distinct",
        "Forward and return paths are considered",
        "TLS is checked after transport",
        "Each proposed change has verification",
      ],
      hints: [
        "Local success narrows application hypotheses but does not prove external binding.",
      ],
      solution:
        "Compare listener bind address, local HTTP, destination route, ingress/egress policy, and upstream behavior. Change one supported cause, then repeat the original remote request.",
      challenge:
        "Explain how the diagnosis changes if the remote connection succeeds but HTTP returns 502.",
    },
    resourceIds: ["cisco", "network"],
  },
  {
    id: "cloud-model",
    section: 9,
    title: "Choose the smallest useful cloud system",
    summary:
      "Map an application to compute, storage, identity, and a cost boundary.",
    minutes: 30,
    status: "released",
    prerequisites: ["cloud-packet"],
    outcomes: [
      "Separate a region from an availability zone",
      "Explain provider and customer responsibilities",
      "Choose a low-cost learning mode before provisioning",
    ],
    concepts: [
      {
        title: "Renting capability changes responsibility",
        body: "A managed service reduces some operating tasks, but you still own your data, permissions, configuration, and cost decisions. The division depends on the service. Managed does not mean maintenance-free.",
      },
      {
        title: "Failure domains are design choices",
        body: "A region is a geographic deployment area. Availability zones isolate infrastructure within a region. Two processes on one machine are still vulnerable to that machine failing.",
      },
      {
        title: "Free is an account-specific offer",
        body: "Free-tier eligibility and credits depend on account age, service, usage, and current terms. A budget is an alert, not a universal spending cap. This school never creates cloud resources for you.",
      },
    ],
    commands: [],
    demo: {
      title: "A small status page",
      code: "browser → static content\noperator → identity → deployment\nservice → logs/metrics → operator\n\nBefore creating resources:\nowner + region + estimate + cleanup plan",
      explanation:
        "Start with a static design. Add a database, private network, or load balancer only when a requirement justifies it.",
    },
    practice: [
      "Choose a region for a hypothetical audience and explain the tradeoff.",
      "List what survives loss of one machine.",
      "Write a cleanup checklist before creating anything.",
    ],
    exercises: [
      {
        id: "cloud-zone",
        caseSensitive: false,
        kind: "recall",
        prompt:
          "What is the term for an isolated infrastructure location within an AWS region?",
        answers: ["availability zone", "az"],
        explanation: "A region contains multiple availability zones.",
        hint: "Often abbreviated AZ.",
      },
      {
        id: "cloud-budget",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "Does a budget alert guarantee a hard spending cap? Answer yes or no.",
        answers: ["no"],
        explanation:
          "Alerts can arrive after usage and do not stop every charge.",
        hint: "Notification and enforcement are different.",
      },
      {
        id: "cloud-responsibility",
        caseSensitive: false,
        kind: "recall",
        prompt:
          "Who is responsible for deciding which users may read your application data: customer or provider?",
        answers: ["customer", "the customer"],
        explanation: "Access configuration remains your responsibility.",
        hint: "Who defines the application’s intended audience?",
      },
    ],
    lab: {
      title: "A cloud decision record",
      environment: "Design-only exercise. No AWS account needed.",
      scenario:
        "A small community needs a status page with no login or database. Recommend a design and a spending boundary.",
      steps: [
        "State functional needs and expected traffic.",
        "Compare static hosting with a VM and choose one.",
        "List responsibilities, failure modes, estimate inputs, and cleanup steps.",
      ],
      evidence: [
        "Architecture sketch",
        "Decision with one rejected alternative",
        "Cost assumptions and teardown checklist",
      ],
      rubric: [
        "The design matches the actual need",
        "Permissions are explicit",
        "Free-tier eligibility is not assumed",
        "Failure and cleanup are considered",
      ],
      hints: [
        "A static page needs less operational machinery than a stateful application.",
      ],
      solution:
        "Prefer a static deployment for these requirements. Explain how updates are published, who can change content, what happens during a hosting outage, and what usage would incur cost.",
      challenge:
        "The community now needs private incident notes. Identify which assumptions change before adding services.",
    },
    resourceIds: ["aws", "architecture"],
  },
  {
    id: "aws-plan",
    section: 10,
    title: "Plan an AWS web service without provisioning",
    summary: "Connect IAM, VPC, EC2, and S3 to concrete responsibilities.",
    minutes: 40,
    status: "released",
    prerequisites: ["cloud-model", "linux-services", "git-basics"],
    outcomes: [
      "Distinguish an IAM permission from network access",
      "Sketch a VPC route and security-group boundary",
      "Write a cost-aware creation and cleanup plan",
    ],
    concepts: [
      {
        title: "Identity answers “who may do this?”",
        body: "An IAM role grants temporary permissions to a workload or session. It does not open a network port. Prefer short-lived credentials, narrowly scoped actions, and separation between human administration and application identity.",
      },
      {
        title: "Networking answers “can the packet reach it?”",
        body: "A VPC contains subnets and routes. A subnet route to an Internet Gateway is only part of public connectivity; the resource also needs appropriate addressing and policies. Security groups are stateful resource-level controls; NACLs are stateless subnet-level controls.",
      },
      {
        title: "Storage has different shapes",
        body: "EBS is block storage commonly attached to EC2. S3 stores objects addressed by bucket and key. Neither should be made public merely to troubleshoot a permission error. Record which layer denied the operation.",
      },
    ],
    commands: [],
    demo: {
      title: "Design artifact · no apply button",
      code: "human → temporary session → limited operator role\nclient → internet gateway → public subnet → EC2\n                                      security group\nEC2 → instance role → private S3 objects\n\nLogs: CloudWatch     Audit: CloudTrail\nManagement: Systems Manager where configured",
      explanation:
        "This is a reasoning exercise, not a deployable blueprint. Public addressing, endpoint access, agent permissions, and costs need separate validation before a real lab.",
    },
    practice: [
      "Label each arrow as identity, network, or application behavior.",
      "List which resources may keep billing after a VM stops.",
      "Choose how logs will prove a denied request without exposing credentials.",
    ],
    exercises: [
      {
        id: "aws-role",
        caseSensitive: false,
        kind: "recall",
        prompt:
          "Which identity mechanism should an EC2 application use for temporary AWS permissions?",
        answers: [
          "iam role",
          "instance role",
          "instance profile",
          "ec2 instance role",
        ],
        explanation:
          "Attach an appropriate role through an instance profile instead of embedding long-lived keys.",
        hint: "A role, not a key pasted into code.",
      },
      {
        id: "aws-sg",
        caseSensitive: false,
        kind: "recall",
        prompt: "Are security groups stateful or stateless?",
        answers: ["stateful"],
        explanation: "Return traffic for allowed connections is tracked.",
        hint: "Connection tracking is state.",
      },
      {
        id: "aws-audit",
        caseSensitive: false,
        kind: "recall",
        prompt: "Which AWS service records account API activity for auditing?",
        answers: ["cloudtrail", "aws cloudtrail"],
        explanation:
          "CloudTrail is for audit events; application logs and metrics commonly use CloudWatch.",
        hint: "Its name ends in Trail.",
      },
    ],
    lab: {
      title: "Reviewable AWS lab proposal",
      environment: "Design-only. No credentials, purchases, or AWS API calls.",
      scenario:
        "Prepare a small web-service lab another engineer could review before any spending occurs.",
      steps: [
        "Sketch EC2, subnet, routes, security group, IAM role, and private S3 use.",
        "Write the minimal permissions and network rules in plain English.",
        "Inventory costs: compute, volumes, public IPv4, transfer, logs, and any NAT/load balancer; plan teardown.",
      ],
      evidence: [
        "Annotated architecture",
        "Permission and traffic matrix",
        "Preflight and cleanup checklist",
      ],
      rubric: [
        "No credentials are embedded",
        "Identity and network controls are distinct",
        "Every resource has a purpose",
        "Cost estimate and cleanup are explicit",
      ],
      hints: [
        "Avoid NAT gateways and load balancers in an early real lab unless they are the subject of the exercise.",
      ],
      solution:
        "Start with the smallest design that meets the objective. Before any live implementation, check current regional pricing and account eligibility, set alerts, and record resource IDs for cleanup. Stopping a VM is not full teardown.",
      challenge:
        "Explain how a private instance could be managed without opening SSH to the world, and what dependencies Systems Manager requires.",
    },
    resourceIds: ["aws", "security"],
  },
  {
    id: "terraform-local",
    section: 11,
    title: "Plan, apply, inspect — locally",
    summary:
      "Learn Terraform’s lifecycle with a built-in resource and no cloud bill.",
    minutes: 40,
    status: "released",
    prerequisites: ["git-basics", "cloud-model"],
    outcomes: [
      "Read a plan before applying it",
      "Explain state as a mapping",
      "Observe drift between configuration and prior state",
    ],
    concepts: [
      {
        title: "Configuration describes intent",
        body: "HCL declares a desired configuration. Terraform compares that configuration with its state and provider observations to propose changes. A plan deserves review just like code.",
      },
      {
        title: "State is operational data",
        body: "State records resource identities and attributes. It can contain secrets even when output is marked sensitive. Never commit real state or credential files to a public repository.",
      },
      {
        title: "Local first, remote later",
        body: "The built-in terraform_data resource lets you study lifecycle behavior without an external provider. Shared cloud work later requires controlled remote state, locking, recovery, and environment separation.",
      },
    ],
    commands: [
      {
        command: "terraform plan",
        purpose: "Preview intended changes.",
        example: "terraform plan",
      },
      {
        command: "terraform apply",
        purpose: "Review and accept a specific local change.",
        example: "terraform apply",
        caution:
          "Real providers can create billed or destructive changes. This lab uses only terraform_data.",
      },
      {
        command: "terraform show",
        purpose: "Inspect current state.",
        example: "terraform show",
      },
    ],
    demo: {
      title: "main.tf · built-in resource only",
      code: 'terraform {\n  required_version = ">= 1.4"\n}\nresource "terraform_data" "lab" {\n  input = "atlas-v1"\n}\noutput "label" {\n  value = terraform_data.lab.output\n}',
      explanation:
        "In a new ~/atlas-labs/terraform directory, initialize with terraform init, then plan. There are no AWS resources, providers, or provisioners in this file.",
    },
    practice: [
      "Predict the first plan and inspect it.",
      "Apply the local resource only; run a second plan and explain why it should be unchanged.",
      "Change atlas-v1 to atlas-v2 and inspect the proposed update.",
    ],
    exercises: [
      {
        id: "tf-preview",
        kind: "recall",
        prompt: "Which command previews changes without applying them?",
        answers: ["terraform plan"],
        explanation:
          "A plan is a review step, not approval to mutate resources.",
        hint: "The command describes a proposed plan.",
      },
      {
        id: "tf-state",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "Should real terraform.tfstate be committed publicly? yes or no",
        answers: ["no"],
        explanation: "State can contain private identifiers and secrets.",
        hint: "Treat state as sensitive operational data.",
      },
      {
        id: "tf-stable",
        caseSensitive: false,
        kind: "predict",
        prompt:
          "After applying unchanged configuration, should the next plan say no changes or create another copy?",
        answers: ["no changes"],
        explanation:
          "State connects the same resource address to its existing object.",
        hint: "Declarative tools aim for convergence.",
      },
    ],
    lab: {
      title: "A reproducible local Terraform lifecycle",
      environment:
        "Terraform CLI installed from the official instructions. New empty local lab directory only.",
      scenario:
        "Demonstrate lifecycle reasoning before receiving cloud permissions.",
      steps: [
        "Create exactly the built-in example and inspect init and plan.",
        "Apply, verify no change, edit input, and review the next plan.",
        "Run terraform plan -destroy; then terraform destroy for this lab and verify no managed resources remain.",
      ],
      evidence: [
        "Configuration",
        "First, unchanged, updated, and destroy plans",
        "Explanation of state and .gitignore choices",
      ],
      rubric: [
        "Only terraform_data is used",
        "Every apply follows plan review",
        "State is excluded from Git",
        "Cleanup is verified",
      ],
      hints: ["Use terraform state list to see managed addresses."],
      solution:
        "Track main.tf and any lockfile, exclude .terraform/ and *.tfstate*, and compare plans at each step. Do not use auto-approve while learning.",
      challenge:
        "Extract the input into a variable and add an output. Explain why workspaces alone are not a complete access boundary.",
    },
    resourceIds: ["terraform"],
  },
  {
    id: "docker-local",
    section: 12,
    title: "A container is a process with boundaries",
    summary:
      "Expose one local service and inspect its logs, ports, and lifecycle.",
    minutes: 35,
    status: "released",
    prerequisites: ["linux-processes", "network-http"],
    outcomes: [
      "Distinguish an image from a running container",
      "Explain host-to-container port mapping",
      "Verify a container through HTTP and logs",
    ],
    concepts: [
      {
        title: "Image versus running instance",
        body: "An image is packaged filesystem content and metadata. A container is a running or stopped instance with its own process context and writable layer. Removing a container should not erase data you intentionally persisted elsewhere.",
      },
      {
        title: "Two ports, one mapping",
        body: "A published port connects a host address and port to a container port. Binding to 127.0.0.1 keeps this lab accessible from the host only. A container can run while the application inside is failing.",
      },
      {
        title: "Reproducibility needs explicit inputs",
        body: "Image tags can move. For durable deployment, review and pin a digest, scan the image, define configuration, and choose a volume strategy. This introductory local lab uses a moving tag only for exploration.",
      },
    ],
    commands: [
      {
        command: "docker run",
        purpose: "Create and start a container.",
        example:
          "docker run --name atlas-web -d -p 127.0.0.1:8080:80 nginx:stable-alpine",
        caution:
          "Uses local compute and downloads an image. Do not add --privileged or mount the Docker socket.",
      },
      {
        command: "docker logs",
        purpose: "Read the process logs.",
        example: "docker logs atlas-web",
      },
      {
        command: "docker stop",
        purpose: "Stop the lab process gracefully.",
        example: "docker stop atlas-web",
      },
    ],
    demo: {
      title: "Inspect the boundary",
      code: "docker ps\ncurl -I http://localhost:8080\ndocker logs atlas-web\ndocker stop atlas-web\ncurl --max-time 3 -I http://localhost:8080",
      explanation:
        "The second HTTP request should fail if no other process owns port 8080. A stop is not image removal and does not prove volume cleanup.",
    },
    practice: [
      "Explain each part of 127.0.0.1:8080:80.",
      "Compare docker ps and docker ps -a after stopping.",
      "Start the same container again with docker start atlas-web and verify HTTP.",
    ],
    exercises: [
      {
        id: "docker-host",
        kind: "predict",
        prompt: "For 127.0.0.1:8080:80, which host port do you request?",
        answers: ["8080"],
        explanation: "The host port is 8080; the service inside listens on 80.",
        hint: "Read the middle number.",
      },
      {
        id: "docker-logs",
        kind: "recall",
        prompt: "Read logs for the container named atlas-web.",
        answers: ["docker logs atlas-web"],
        explanation:
          "Logs provide application evidence beyond the running status.",
        hint: "Use the logs subcommand.",
      },
      {
        id: "docker-image",
        caseSensitive: false,
        kind: "recall",
        prompt: "Is a reusable packaged filesystem an image or a container?",
        answers: ["image", "an image"],
        explanation: "Containers instantiate images.",
        hint: "It is the template, not the running process.",
      },
    ],
    lab: {
      title: "Container incident and recovery",
      environment:
        "A locally installed container engine you have permission to use. No cloud service. Review installer terms yourself.",
      scenario:
        "A container is stopped but a teammate assumes the website is healthy. Establish and restore service.",
      steps: [
        "Run the local example and collect HTTP/log evidence.",
        "Stop it and diagnose the failed request.",
        "Restart, prove HTTP recovery, then stop and remove only atlas-web with docker rm atlas-web.",
      ],
      evidence: [
        "Port mapping explanation",
        "Before/during/after HTTP evidence",
        "Logs and cleanup output",
      ],
      rubric: [
        "Binding is localhost-only",
        "HTTP behavior is verified",
        "Logs inform the diagnosis",
        "Only the named lab container is removed",
      ],
      hints: [
        "docker start reuses an existing container; run creates a new one.",
      ],
      solution:
        "Inspect docker ps -a and docker logs, start the named container, and repeat the exact failed request. Stop and remove the named container afterward; do not use a system-wide prune.",
      challenge:
        "Build a Dockerfile with a custom page. Explain what persists after container removal and what does not.",
    },
    resourceIds: ["docker"],
  },
  {
    id: "ci-contract",
    section: 13,
    title: "Make a failed test stop a release",
    summary: "Design a CI pipeline whose behavior matches its promises.",
    minutes: 35,
    status: "released",
    prerequisites: ["git-collaboration", "python-inventory"],
    outcomes: [
      "Separate build, test, artifact, and deploy",
      "Use minimal workflow permissions",
      "Define a rollback that can actually run",
    ],
    concepts: [
      {
        title: "CI produces evidence",
        body: "Continuous integration checks changes against shared expectations. A green check only proves the commands that ran. A workflow with no meaningful test can be green while the application is broken.",
      },
      {
        title: "A release should promote a known artifact",
        body: "Build once, test the artifact, and deploy that same version. Record the commit or artifact digest so recovery points to something concrete.",
      },
      {
        title: "Deployment authority belongs at a boundary",
        body: "Use limited job permissions, environment protections, and short-lived identity where supported. Untrusted pull requests must not receive deployment secrets. Review third-party action sources and pin immutable versions for sensitive workflows.",
      },
    ],
    commands: [
      {
        command: "git rev-parse HEAD",
        purpose: "Identify the exact source revision.",
        example: "git rev-parse HEAD",
      },
    ],
    demo: {
      title: "Minimal check · .github/workflows/check.yml",
      code: "name: Check\non: [push, pull_request]\npermissions:\n  contents: read\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: python3 -m unittest -v",
      explanation:
        "This example deliberately does not deploy. The environment runner has Python available; a production workflow should explicitly choose the supported runtime and pin action SHAs.",
    },
    practice: [
      "Draw the dependency between test and deployment jobs.",
      "Explain what happens when unittest returns nonzero.",
      "Identify which permissions this check needs and which it does not.",
    ],
    exercises: [
      {
        id: "ci-status",
        caseSensitive: false,
        kind: "predict",
        prompt:
          "A required test command exits 1. Should the release proceed? yes or no",
        answers: ["no"],
        explanation:
          "A release gate is only meaningful if failure blocks deployment.",
        hint: "Nonzero means failure.",
      },
      {
        id: "ci-permission",
        caseSensitive: false,
        kind: "recall",
        prompt:
          "For a checkout-and-test job, fill contents: ___ with the minimal access.",
        answers: ["read"],
        explanation: "Testing source does not require writing it.",
        hint: "Read, not write.",
      },
      {
        id: "ci-artifact",
        caseSensitive: false,
        kind: "recall",
        prompt: "What do we call the packaged output that a pipeline deploys?",
        answers: ["artifact", "an artifact"],
        explanation:
          "Promoting a tested artifact avoids rebuilding a different result.",
        hint: "An immutable build artifact.",
      },
    ],
    lab: {
      title: "Break the pipeline on purpose",
      environment:
        "Local repository and a public GitHub repository you own; check account Actions limits before enabling any workflow. No paid runner.",
      scenario:
        "Prove that your tests, not the badge color, protect a release.",
      steps: [
        "Add a check workflow to the inventory project.",
        "Introduce a failing assertion in a branch and capture the failure.",
        "Fix it, capture the passing run, and document deployment/rollback preconditions.",
      ],
      evidence: [
        "Workflow source",
        "Failing and passing test logs",
        "Rollback procedure tied to a revision",
      ],
      rubric: [
        "Failure actually produces a nonzero job",
        "Checks run on pull requests",
        "Permissions are minimal",
        "Rollback names a known version",
      ],
      hints: ["Reproduce the same command locally first."],
      solution:
        "Use a failing branch to prove the gate, then fix the actual assertion or code. Do not add continue-on-error to make a required check green.",
      challenge:
        "Describe how you would protect a deployment environment without giving pull requests access to production credentials.",
    },
    resourceIds: ["actions", "github"],
  },
  {
    id: "reliability-sli",
    section: 14,
    title: "Measure what the user experiences",
    summary: "Turn request logs into an SLI, an SLO, and an actionable alert.",
    minutes: 30,
    status: "released",
    prerequisites: ["bash-health", "python-inventory"],
    outcomes: [
      "Distinguish logs, metrics, and traces",
      "Compute a request success indicator",
      "Write a runbook with verification and rollback",
    ],
    concepts: [
      {
        title: "Three different lenses",
        body: "Logs record events, metrics summarize measurements over time, and traces connect work across request boundaries. A CPU chart can explain pressure but cannot alone prove that users can complete a task.",
      },
      {
        title: "An indicator and an objective",
        body: "An SLI is a defined measurement, such as successful eligible requests divided by all eligible requests. An SLO is a target over a stated window. An SLA is an agreement with consequences, not a synonym for your internal target.",
      },
      {
        title: "Alerts should lead to action",
        body: "Choose a signal tied to impact and a response an operator can perform. Define exclusions and missing-data behavior before declaring reliability. Record hypotheses and changes during an incident.",
      },
    ],
    commands: [],
    demo: {
      title: "A request-based example",
      code: "eligible requests = 10,000\nsuccessful requests = 9,970\nsuccess SLI = 9,970 / 10,000 = 99.7%\n\nIf the target is 99.9% over this window:\nallowed failures = 10\nobserved failures = 30",
      explanation:
        "The objective was missed in this sample window. A request-based indicator is not the same as uptime seconds.",
    },
    practice: [
      "Define which requests count as eligible.",
      "Explain why a green process status is insufficient.",
      "Write the first three read-only steps for an HTTP failure alert.",
    ],
    exercises: [
      {
        id: "sli-value",
        kind: "predict",
        prompt: "990 successful requests out of 1000 is what percentage?",
        answers: ["99%", "99", "99.0%"],
        explanation: "990 divided by 1000 equals 0.99.",
        hint: "Divide successes by total and multiply by 100.",
      },
      {
        id: "slo-name",
        caseSensitive: false,
        kind: "recall",
        prompt: "Is a target reliability level an SLI, SLO, or SLA?",
        answers: ["slo"],
        explanation:
          "An objective is the target; the indicator is the measurement.",
        hint: "O stands for objective.",
      },
      {
        id: "trace-name",
        caseSensitive: false,
        kind: "recall",
        prompt: "Which signal connects steps of one request across services?",
        answers: ["trace", "traces", "distributed trace", "distributed traces"],
        explanation: "Traces link spans belonging to the same request.",
        hint: "A distributed trace.",
      },
    ],
    lab: {
      title: "Incident note with a recovery test",
      environment:
        "Use local Nginx logs or a small synthetic CSV. No monitoring account required.",
      scenario:
        "Your service is running but users report failed requests. Define impact and a response.",
      steps: [
        "Create a sample request dataset with successes and failures.",
        "Compute and explain the indicator and its limitations.",
        "Write a runbook, incident timeline, and one prevention action.",
      ],
      evidence: [
        "Dataset and calculation",
        "Runbook with decision points",
        "Postmortem separating cause from symptoms",
      ],
      rubric: [
        "Indicator denominator is explicit",
        "Time window is stated",
        "Alert has an action",
        "Recovery uses the user-facing symptom",
      ],
      hints: ["A restart is a change, not a diagnosis."],
      solution:
        "Define eligible requests, count outcomes, compare with the window’s objective, and investigate the failing path. Verify recovery by repeating affected requests, not just reading active (running).",
      challenge:
        "Explain how a delayed metric or missing logs could make your dashboard falsely reassuring.",
    },
    resourceIds: ["observability"],
  },
  {
    id: "security-review",
    section: 15,
    title: "Review a change through least privilege",
    summary: "Find excessive authority before it reaches a real environment.",
    minutes: 30,
    status: "released",
    prerequisites: ["aws-plan", "git-basics"],
    outcomes: [
      "Separate a secret from ordinary configuration",
      "Limit identity and network authority",
      "Propose a verifiable, reversible remediation",
    ],
    concepts: [
      {
        title: "Start with the actual task",
        body: "Least privilege means granting the actions and resources a task requires, with suitable conditions. “It works with administrator access” does not show which permissions were necessary.",
      },
      {
        title: "Secrets have a lifecycle",
        body: "A secret must be provisioned, used, rotated, and revoked. Deleting it from the latest Git file does not erase it from history or copies. A real leaked credential needs revocation and incident handling.",
      },
      {
        title: "Evidence should not become another leak",
        body: "Logs, screenshots, shell history, state files, and exported lab submissions can contain secrets. Use synthetic values and redact tokens, account-specific identifiers, and private data before sharing.",
      },
    ],
    commands: [],
    demo: {
      title: "Review ticket · synthetic values only",
      code: "Proposed task: read one application config object\nIdentity: administrator permissions\nNetwork: SSH from 0.0.0.0/0\nSecret: pasted into README\nAudit: disabled\n\nReview: identify each excess and its required replacement.",
      explanation:
        "Do not test these unsafe settings in a real account. This is a paper review with a deliberately bad proposal.",
    },
    practice: [
      "Write the narrow action and resource the task requires.",
      "Propose management access without world-open SSH.",
      "Describe what to do if a real credential was published.",
    ],
    exercises: [
      {
        id: "sec-resource",
        kind: "recall",
        caseSensitive: false,
        prompt:
          "Which IAM policy element identifies the objects an allowed action can target?",
        answers: ["resource"],
        hint: "The element is named for the protected resource.",
        explanation:
          "An action permission should be scoped to the intended Resource, with appropriate conditions.",
      },
      {
        id: "sec-leak",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "A live key was committed. Is deleting the line enough? yes or no",
        answers: ["no"],
        explanation:
          "Revoke or rotate the exposed credential; history and copies may retain it.",
        hint: "Copies can survive deletion.",
      },
      {
        id: "sec-principle",
        caseSensitive: false,
        kind: "recall",
        prompt: "What principle grants only the authority a task needs?",
        answers: ["least privilege", "principle of least privilege"],
        explanation:
          "Permissions follow the required action, resource, and conditions.",
        hint: "The smallest necessary privilege.",
      },
      {
        id: "sec-boundary",
        caseSensitive: false,
        kind: "diagnose",
        prompt: "Does encrypting a bucket replace access controls? yes or no",
        answers: ["no"],
        explanation: "Encryption and authorization address different risks.",
        hint: "An authorized reader can still read decrypted data.",
      },
    ],
    lab: {
      title: "A security review another engineer can act on",
      environment:
        "Synthetic design from the demo. No live credentials or account changes.",
      scenario: "Review an application deployment before granting access.",
      steps: [
        "List assets, identities, trust boundaries, and plausible misuse.",
        "Replace each unsafe setting with a specific control.",
        "Write positive and negative verification cases plus rollback.",
      ],
      evidence: [
        "Threat sketch",
        "Prioritized findings with rationale",
        "Allowed/denied test cases",
      ],
      rubric: [
        "Permissions match a named task",
        "Secrets are absent from source",
        "Network exposure is justified",
        "Audit and recovery are addressed",
      ],
      hints: [
        "A good negative test proves that an unrelated resource is inaccessible.",
      ],
      solution:
        "Replace administrator access with a constrained workload role, use a private management path, move real secrets to an approved runtime store, and retain audit visibility. Test denial as well as success.",
      challenge:
        "Explain why a client-side web app cannot safely hide a private API key in its JavaScript bundle.",
    },
    resourceIds: ["security", "aws"],
  },
  {
    id: "kubernetes-read",
    section: 16,
    title: "Read a Deployment before touching a cluster",
    summary: "Connect desired replicas, labels, pods, and Services.",
    minutes: 35,
    status: "released",
    prerequisites: ["docker-local", "cloud-packet"],
    outcomes: [
      "Explain a controller’s desired state",
      "Connect a Service selector to pod labels",
      "Diagnose a selector mismatch on paper",
    ],
    concepts: [
      {
        title: "Controllers reconcile intent",
        body: "A Deployment describes desired pods and rollout behavior. Controllers repeatedly compare desired and observed state. A deleted pod can be replaced because the desired replica count still exists.",
      },
      {
        title: "A Service finds endpoints by labels",
        body: "A Service uses selectors to discover eligible pods. The Service name is not a direct reference to a Deployment name. If labels do not match, there may be no endpoints even when pods are running.",
      },
      {
        title: "Context is an operational boundary",
        body: "kubectl acts against its current cluster context and namespace. Inspect both before a command. A successful YAML parse does not prove an image exists, a workload is safe, or a rollout is healthy.",
      },
    ],
    commands: [
      {
        command: "kubectl config current-context",
        purpose: "Read the selected cluster context.",
        example: "kubectl config current-context",
      },
      {
        command: "kubectl get pods",
        purpose: "Inspect observed pod states.",
        example: "kubectl get pods -n atlas-lab",
      },
      {
        command: "kubectl describe",
        purpose: "Inspect details and related events.",
        example: "kubectl describe deployment web -n atlas-lab",
      },
    ],
    demo: {
      title: "Selector mismatch · review only",
      code: "Deployment pod labels: { app: web }\nService selector:      { app: api }\n\nExpected replicas: 2\nRunning pods: 2\nMatching Service endpoints: 0",
      explanation:
        "Changing replicas does not fix a selector mismatch. Correct the intended label relationship, then inspect endpoints and make a request.",
    },
    practice: [
      "Draw control plane, worker node, pod, and Service.",
      "Explain what happens when one pod is removed.",
      "Identify the smallest proposed fix for the mismatch.",
    ],
    exercises: [
      {
        id: "k8s-selector",
        caseSensitive: false,
        kind: "diagnose",
        prompt: "Which Service field must match the intended pod labels?",
        answers: ["selector", "spec.selector"],
        explanation: "Services select pods using labels.",
        hint: "A field that selects.",
      },
      {
        id: "k8s-context",
        kind: "recall",
        prompt: "Read the current kubectl context.",
        answers: ["kubectl config current-context"],
        explanation: "Check the target before changing cluster state.",
        hint: "Use config and current-context.",
      },
      {
        id: "k8s-replicas",
        kind: "predict",
        prompt:
          "Two pods are running, but none match the Service selector. How many matching endpoints are there?",
        answers: ["0", "zero"],
        explanation:
          "A running pod is not automatically part of every Service.",
        hint: "Count matching labels, not all pods.",
      },
    ],
    lab: {
      title: "Diagnose a Service with no endpoints",
      environment:
        "Paper/YAML review first. Optional later local kind/minikube cluster only after installation and resource review.",
      scenario:
        "A Deployment appears healthy, but the Service does not send it requests.",
      steps: [
        "Write the expected labels and selectors.",
        "List observations that distinguish image, readiness, and selector failures.",
        "Propose one fix and its verification, naming context and namespace.",
      ],
      evidence: [
        "Annotated object relationships",
        "Diagnostic commands with predicted results",
        "Fix and verification plan",
      ],
      rubric: [
        "Context is identified",
        "Selector reasoning is correct",
        "Pod readiness is considered",
        "User-facing behavior is checked",
      ],
      hints: ["Inspect EndpointSlices alongside the Service."],
      solution:
        "Align the Service selector with the intended pod labels. Confirm ready endpoints exist, then test through the Service. A ready Deployment alone does not prove Service routing.",
      challenge:
        "Explain how a rolling update and a readiness probe work together, and why a Secret’s base64 encoding is not encryption.",
    },
    resourceIds: ["kubernetes"],
  },
  {
    id: "powershell-bridge",
    section: 17,
    title: "Translate your Linux habits to PowerShell",
    summary: "Inspect Windows processes and services through objects.",
    minutes: 25,
    status: "released",
    prerequisites: ["linux-processes", "linux-services"],
    outcomes: [
      "Recognize an object pipeline",
      "Inspect services without changing them",
      "Choose the correct shell for a task",
    ],
    concepts: [
      {
        title: "A pipeline can carry objects",
        body: "PowerShell commonly passes structured objects, not just lines of text. Select properties and filter them by name rather than parsing a formatted table with text tricks.",
      },
      {
        title: "Same question, different tool",
        body: "Get-Process inspects Windows processes. Get-Service inspects Windows services. systemctl manages Linux systemd units inside the relevant Linux environment. These do not share one service database.",
      },
      {
        title: "Windows and WSL are connected, not identical",
        body: "Paths, file permissions, process IDs, and networking differ across the boundary. Identify the shell and OS before applying instructions. Prefer Linux project files in your WSL home for Linux tooling.",
      },
    ],
    commands: [
      {
        command: "Get-Process",
        purpose: "Read Windows process objects.",
        example: "Get-Process | Select-Object -First 5 Name, Id",
      },
      {
        command: "Get-Service",
        purpose: "Read Windows services.",
        example: "Get-Service | Where-Object Status -eq Running",
      },
      {
        command: "Get-Location",
        purpose: "Read the PowerShell working directory.",
        example: "Get-Location",
      },
    ],
    demo: {
      title: "Read-only Windows inspection",
      code: "$PSVersionTable.PSVersion\nGet-Location\nGet-Process | Select-Object -First 5 Name, Id\nGet-Service | Where-Object Status -eq Running",
      explanation:
        "Run these in PowerShell on Windows, not Bash. Output varies by machine and PowerShell edition.",
    },
    practice: [
      "Label which terminal window is PowerShell and which is Ubuntu.",
      "Compare Get-Location with pwd inside Ubuntu.",
      "Inspect one Windows service without stopping it.",
    ],
    exercises: [
      {
        id: "ps-service",
        caseSensitive: false,
        kind: "recall",
        prompt: "Which PowerShell command lists Windows services?",
        answers: ["get-service"],
        explanation: "Windows services are separate from Linux systemd units.",
        hint: "Get followed by Service.",
      },
      {
        id: "ps-objects",
        caseSensitive: false,
        kind: "recall",
        prompt:
          "Does a PowerShell pipeline primarily pass objects or only plain text?",
        answers: ["objects"],
        explanation: "Structured properties support reliable filtering.",
        hint: "You can select named properties.",
      },
      {
        id: "ps-linux",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "For systemctl status nginx in your WSL lab, choose PowerShell or Ubuntu shell.",
        answers: ["ubuntu shell", "ubuntu", "wsl", "bash"],
        explanation:
          "Run Linux administration commands in the Linux environment.",
        hint: "Where is the systemd-managed Nginx installed?",
      },
    ],
    lab: {
      title: "A two-environment inspection note",
      environment:
        "Windows 11 with PowerShell and WSL Ubuntu. On a Mac, use the demo as a reading exercise; complete Windows evidence later.",
      scenario:
        "A teammate mixes Windows and Linux service instructions. Write a clear environment-aware handoff.",
      steps: [
        "Capture shell/version and location in both environments.",
        "Inspect one process and service in each without modifying them.",
        "Write a command mapping with differences and limitations.",
      ],
      evidence: [
        "PowerShell and Ubuntu read-only output",
        "Command mapping",
        "Explanation of distinct service/process contexts",
      ],
      rubric: [
        "Shell context is explicit",
        "No critical service is stopped",
        "Object pipeline is explained",
        "Paths are not treated as interchangeable",
      ],
      hints: [
        "PowerShell variable syntax resembles Bash in places but is a different language.",
      ],
      solution:
        "Record Get-Process/Get-Service alongside ps/systemctl in their respective shells. Explain that neither PID values nor service names imply the same object across operating systems.",
      challenge:
        "Research Test-NetConnection and Resolve-DnsName and compare the evidence they produce with ss and getent.",
    },
    resourceIds: ["powershell", "wsl"],
  },
  {
    id: "ai-verify",
    section: 18,
    title: "Review an AI suggestion like an untrusted patch",
    summary: "Keep the reasoning, verification, and final decision your own.",
    minutes: 25,
    status: "released",
    prerequisites: ["orientation", "git-basics"],
    outcomes: [
      "Explain a generated command before running it",
      "Ask for falsifiable hypotheses",
      "Verify independently from the generated answer",
    ],
    concepts: [
      {
        title: "Fluent text is not evidence",
        body: "An assistant can produce a convincing but incorrect explanation. Treat suggestions as hypotheses or patches. Check official documentation and inspect current environment state before changing anything.",
      },
      {
        title: "Shrink the request and the authority",
        body: "Provide a minimal redacted reproduction, expected behavior, and exact error. Ask for one diagnostic at a time and explain what result would disprove the hypothesis. Never paste credentials or private production logs into a public exercise.",
      },
      {
        title: "Preserve independent skill",
        body: "Try the diagnostic yourself before requesting hints. After using help, close the answer and reproduce the reasoning later. A generated working command is useful, but it is not evidence that you can operate independently.",
      },
    ],
    commands: [],
    demo: {
      title: "Prompt with an evidence contract",
      code: "Observed: curl localhost returns connection refused.\nEnvironment: disposable Ubuntu lab, systemd.\nExpected: HTTP response from Nginx.\n\nGive one read-only diagnostic. Explain what it tests,\nwhat each likely result means, and what it cannot prove.\nDo not propose a mutation until the evidence supports it.",
      explanation:
        "This makes the next action small and reviewable. Check the command with its manual before running it.",
    },
    practice: [
      "Write your own first diagnostic before reading a suggestion.",
      "Explain every flag in a proposed command.",
      "Record one way the suggested diagnosis could be wrong.",
    ],
    exercises: [
      {
        id: "ai-inspect",
        kind: "recall",
        prompt:
          "Write a read-only command to inspect the Nginx service status in Ubuntu.",
        answers: [
          "systemctl status nginx",
          "systemctl status nginx --no-pager",
        ],
        hint: "Use systemctl with status and the service name.",
        explanation: "Read current service state before proposing a mutation.",
      },
      {
        id: "ai-root",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "An assistant suggests chmod -R 777 / to fix access. Should you execute it? yes or no",
        answers: ["no"],
        explanation:
          "It would dangerously change system-wide permissions. Reject the action and inspect the actual path and permission boundary.",
        hint: "Scope and authority are wildly excessive.",
      },
      {
        id: "ai-proof",
        caseSensitive: false,
        kind: "recall",
        prompt:
          "For a recovered website, is “the assistant says fixed” or “repeat the failed HTTP request” stronger evidence?",
        answers: ["repeat the failed http request", "repeat the request"],
        explanation:
          "Verification should observe the original failure at the real boundary.",
        hint: "Use a direct observation.",
      },
      {
        id: "ai-secrets",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "Should a live token be included in a debugging prompt? yes or no",
        answers: ["no"],
        explanation:
          "Use synthetic or redacted values and preserve enough structure to debug.",
        hint: "Credentials are not necessary to explain their format.",
      },
    ],
    lab: {
      title: "AI-assisted, independently verified",
      environment:
        "Use the synthetic prompt above. An AI account is optional; a peer suggestion works too.",
      scenario: "Evaluate a suggested fix without handing over your judgment.",
      steps: [
        "Write an initial hypothesis unaided.",
        "Record the suggestion and critique its assumptions and scope.",
        "Verify with independent observations and re-explain the fix from memory.",
      ],
      evidence: [
        "Original hypothesis",
        "Suggestion and your review",
        "Independent verification and later explanation",
      ],
      rubric: [
        "No secrets were shared",
        "Critical commands are explained",
        "Read-only evidence precedes changes",
        "Verification is independent of the suggestion",
      ],
      hints: ["Ask what would falsify the hypothesis."],
      solution:
        "A reasonable first observation is service status or the listening socket. Interpret it, narrow the cause, then choose a minimal fix. Repeat HTTP and inspect logs afterward.",
      challenge:
        "Repeat a similar incident a day later without asking an assistant for the first diagnostic.",
    },
    resourceIds: ["ai", "github"],
  },
  {
    id: "architecture-tradeoffs",
    section: 19,
    title: "Design around a failure, not a service catalog",
    summary: "Make availability, data durability, and cost tradeoffs explicit.",
    minutes: 35,
    status: "released",
    prerequisites: ["aws-plan", "reliability-sli", "security-review"],
    outcomes: [
      "Identify a single point of failure",
      "Separate stateless compute from durable state",
      "Define recovery objectives and verify them",
    ],
    concepts: [
      {
        title: "Availability starts with a user task",
        body: "Define what must keep working and for whom. Adding replicas may help a stateless service, but shared state, deployment failures, or one upstream dependency can still take every replica down.",
      },
      {
        title: "Queues move time and failure boundaries",
        body: "A queue can decouple request handling from slow work. It introduces retries, duplicate delivery, ordering questions, and backlog monitoring. Consumers need idempotent behavior when the same work can arrive twice.",
      },
      {
        title: "A backup is not a recovery test",
        body: "RPO describes tolerable data loss over time; RTO describes acceptable recovery time. A backup policy without a successful restore rehearsal does not establish either target.",
      },
    ],
    commands: [],
    demo: {
      title: "Failure-oriented sketch",
      code: "client → load balancer → stateless app A / app B\n                                  ↓\n                            durable data\n                                  ↓\n                         backup → tested restore\n\nQuestion: which shared dependency can still fail both apps?",
      explanation:
        "Every added component should answer a requirement. More boxes can add cost and failure modes as well as redundancy.",
    },
    practice: [
      "Circle each single point of failure in the diagram.",
      "Describe one acceptable degraded behavior.",
      "Choose recovery objectives for a hypothetical noncritical status page.",
    ],
    exercises: [
      {
        id: "arch-rpo",
        caseSensitive: false,
        kind: "recall",
        prompt: "Which objective describes acceptable data loss: RPO or RTO?",
        answers: ["rpo"],
        explanation:
          "Recovery Point Objective concerns the recoverable point in time.",
        hint: "Point, not time-to-restore.",
      },
      {
        id: "arch-idempotent",
        caseSensitive: false,
        kind: "recall",
        prompt:
          "What property means repeating an operation has the same intended effect as doing it once?",
        answers: ["idempotence", "idempotency", "idempotent"],
        explanation: "Idempotent consumers make retries safer.",
        hint: "It starts with idem.",
      },
      {
        id: "arch-backup",
        caseSensitive: false,
        kind: "diagnose",
        prompt:
          "Does a successful backup job alone prove the data can be restored? yes or no",
        answers: ["no"],
        explanation: "Restore rehearsal tests the actual recovery path.",
        hint: "Creation and recovery are separate operations.",
      },
    ],
    lab: {
      title: "A defendable architecture decision",
      environment:
        "Diagram and written decision record. No infrastructure deployment.",
      scenario:
        "Design a small application that must tolerate one compute failure and recover its data.",
      steps: [
        "State traffic, availability, data, and budget assumptions.",
        "Compare two designs and identify their failure domains.",
        "Write a failure experiment and a restore rehearsal plan.",
      ],
      evidence: [
        "Architecture diagram",
        "Tradeoff decision record",
        "Failure/recovery test plan",
      ],
      rubric: [
        "Requirements precede service choices",
        "State has a clear owner",
        "Failure domains are identified",
        "Cost and recovery are testable",
      ],
      hints: ["Explain what happens when each box is unavailable."],
      solution:
        "Use redundant stateless compute only if the availability requirement warrants it, put durable data behind a deliberate recovery strategy, and test both compute failover and data restoration.",
      challenge:
        "Revisit the design with one tenth the budget. State which guarantees you would renegotiate and why.",
    },
    resourceIds: ["architecture", "observability"],
  },
];
