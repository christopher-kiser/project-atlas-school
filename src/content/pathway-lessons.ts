import type { Lesson } from "./types";

export const pathwayLessons: Lesson[] = [
  {
    id: "python-cli",
    section: 7,
    title: "Give a Python tool a dependable command-line contract",
    summary:
      "Build a read-only JSON health-report CLI with help, required arguments, quoted paths, validation and tested exit statuses.",
    minutes: 80,
    status: "released",
    prerequisites: ["python-testing", "python-files-json"],
    outcomes: [
      "Separate command-line usage errors, invalid data and an unhealthy result",
      "Validate a JSON file without changing it",
      "Capture stdout, stderr and exit status as separate evidence",
      "Test the same tool in a fresh directory with a path containing spaces",
    ],
    concepts: [
      {
        title: "A command has a public interface",
        body: "A useful script explains its purpose with --help, names required inputs and rejects ambiguous arguments. argparse supplies parsing and help; your application still defines valid data and what success means. Paths are values, so quote a path containing spaces in the shell rather than changing the Python parser to split it.",
      },
      {
        title: "Valid input can describe an unhealthy system",
        body: "A readable, valid JSON document can report too few healthy services. That differs from a missing file or malformed JSON. This tool defines status 0 for a valid report meeting the threshold, 1 for file/data failure, 2 for command usage failure and 3 for a valid report below the health threshold. These are this tool's documented choices, not universal meanings for every program.",
      },
      {
        title: "Keep streams and side effects deliberate",
        body: "Write the machine-readable report to stdout and diagnostics to stderr. Reading a fixture should not alter it, make a network call or launch another process. Keep parsing, validation and reporting small enough to test. A filename ending in .json does not prove that its contents have the expected shape.",
      },
    ],
    commands: [
      {
        command: "python3 report.py --help",
        purpose: "Read the CLI usage contract",
        example: "python3 report.py --help",
      },
      {
        command: "python3 report.py --input",
        purpose: "Pass a required JSON file path and optional health target",
        example:
          'python3 report.py --input "fixtures with spaces/health.json" --minimum 1',
        caution:
          "The tool only reads a file you choose. Use synthetic fixtures rather than private operational data.",
      },
      {
        command: "echo $?",
        purpose:
          "Inspect the immediately preceding command's exit status in Bash",
        example: "echo $?",
        caution:
          "Run immediately after the command; another command replaces the saved status.",
      },
    ],
    demo: {
      title: "Save report.py in a new disposable local directory",
      code: `import argparse
import json
from pathlib import Path
import sys


def load_rows(path):
    rows = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise ValueError("expected a JSON list")
    for row in rows:
        if not isinstance(row, dict):
            raise ValueError("each item must be an object")
        if not isinstance(row.get("name"), str) or not row["name"].strip():
            raise ValueError("each name must be nonempty text")
        if not isinstance(row.get("healthy"), bool):
            raise ValueError("healthy must be true or false")
    return rows


def main(argv=None):
    parser = argparse.ArgumentParser(description="Report health from a local JSON fixture")
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--minimum", type=int, default=1)
    args = parser.parse_args(argv)
    if args.minimum < 0:
        parser.error("--minimum must be zero or greater")
    try:
        rows = load_rows(args.input)
    except (OSError, UnicodeError, ValueError) as error:
        print(f"input error: {error}", file=sys.stderr)
        return 1
    healthy = sum(row["healthy"] for row in rows)
    print(json.dumps({"total": len(rows), "healthy": healthy}, sort_keys=True))
    return 0 if healthy >= args.minimum else 3


if __name__ == "__main__":
    raise SystemExit(main())`,
      explanation:
        'Create health.json containing [{"name":"web","healthy":true},{"name":"worker","healthy":false}]. Run with --minimum 1: stdout reports healthy 1 and total 2, and status is 0. Use --minimum 2 with the same file: the report remains valid but status is 3. Omitting --input is a usage error (2). A missing file, invalid JSON or wrong shape returns 1 and a diagnostic. --help exits successfully without reading a fixture. The exception boundary handles file decoding and data validation, while programming errors remain visible.',
    },
    practice: [
      "Read --help before running the tool, then predict which arguments are required.",
      "Compare --minimum 1 and --minimum 2 without changing the input file.",
      "Place the fixture in a directory containing spaces and pass the quoted path.",
      "Redirect stdout and stderr to separate local files and inspect the status immediately.",
    ],
    exercises: [
      {
        id: "pycli-help",
        kind: "recall",
        prompt:
          "Write the command that displays report.py's usage without providing a fixture.",
        answers: ["python3 report.py --help"],
        hint: "Use Python and the conventional help option.",
        explanation:
          "argparse handles --help before requiring the normal input argument.",
      },
      {
        id: "pycli-required",
        kind: "recall",
        prompt: "Which add_argument keyword makes --input mandatory?",
        answers: ["required=True"],
        hint: "It is a boolean keyword argument, using Python's capitalization.",
        explanation:
          "required=True declares that the named option must be supplied.",
      },
      {
        id: "pycli-status",
        kind: "predict",
        prompt:
          "The fixture has one healthy service and --minimum is 2. Which exit status does this tool return?",
        answers: ["3"],
        hint: "The input is valid but the health target is missed.",
        explanation:
          "This CLI assigns 3 to a valid report that fails the health threshold.",
      },
      {
        id: "pycli-data",
        kind: "diagnose",
        prompt:
          'healthy is the JSON string "false" instead of the boolean false. Which exit status does the demo return?',
        answers: ["1"],
        hint: "load_rows rejects the data shape.",
        explanation:
          "A string is not a bool; the file/data error boundary returns 1.",
      },
      {
        id: "pycli-stream",
        kind: "recall",
        caseSensitive: false,
        prompt:
          "Which output stream receives the demo's input-error diagnostic?",
        answers: ["stderr", "standard error"],
        hint: "Keep machine-readable stdout clean.",
        explanation:
          "Diagnostics use stderr; the successful JSON report uses stdout.",
      },
    ],
    lab: {
      title: "Prove a CLI's behavior without changing its inputs",
      environment:
        "Ubuntu/WSL or another local Python 3 environment. Standard library only; create a fresh disposable directory. No network, SDK, credentials or cloud account is needed.",
      scenario:
        "A teammate needs a script that automation can call reliably. A printed report alone does not establish whether input failed or the service target was missed.",
      steps: [
        "Save report.py and create the two-item synthetic fixture from the explanation. Record python3 --version and the working directory.",
        "Run --help, a missing --input, a missing path, malformed JSON, wrong-shaped JSON, the passing threshold and the failing threshold. Immediately capture each exit status.",
        "For a data failure, redirect stdout and stderr separately. Verify the failure emits no JSON report on stdout.",
        "Repair one bad fixture, rerun exactly the failed command and show status 1 becoming 0. Preserve the original failure evidence.",
        "Move a fixture under a directory containing spaces, quote the full path, and prove the same behavior. Compare fixture bytes before and after the report to prove it is read-only.",
        "Write unittest cases that call main with explicit argument lists for the 0, 1 and 3 paths, capture streams, and check that a missing argument raises SystemExit with code 2.",
        "From a fresh directory, follow your README to recreate the fixtures and repeat the tests. Remove only this disposable lab directory when finished.",
      ],
      evidence: [
        "Script, synthetic fixtures and reproducible commands",
        "Table of inputs, stdout, stderr, expected and actual statuses",
        "Failing then repaired data case and unchanged-input comparison",
        "Behavioral tests and clean-directory reproduction notes",
      ],
      rubric: [
        "Help and required options agree with documented usage",
        "Data validation distinguishes booleans from strings",
        "All four defined status paths are observed",
        "Report and diagnostic streams are separated",
        "Read-only behavior, quoted paths and fresh-directory reproduction are evidenced",
      ],
      hints: [
        "Use contextlib.redirect_stdout and redirect_stderr with io.StringIO in tests.",
        "Catch SystemExit with unittest assertRaises for argparse usage failures.",
        "In Bash, save status=$? immediately if you need to print or inspect anything before reporting it.",
      ],
      solution:
        "The valid two-item fixture yields total 2, healthy 1. Minimum 1 returns 0; minimum 2 returns 3 with the same report. Missing/invalid file data returns 1 with stderr only, while missing arguments return 2 through argparse. Repair data rather than suppressing the error. Include the quoted space-containing path and a byte comparison in the reproduction record; the program opens input only for reading.",
      challenge:
        "Without the walkthrough, add an optional --name filter with a written contract for no matching service. Test it using a new fixture, preserve all existing status behavior, and have another person run the README. Explain why retrying malformed local JSON would not fix it.",
    },
    resourceIds: ["python"],
    study: {
      startingPoint:
        "Complete Python functions, JSON validation and unit tests first. A command-line argument is text supplied after a program name; it is separate from the JSON stored inside a file.",
      whyItMatters:
        "Operators and delivery systems need a dependable contract they can inspect and test. Separating bad usage, bad data and an unhealthy result prevents a convincing printed message from being treated as proof of success.",
      required: [
        "Read the demo's four exit-status meanings before executing it.",
        "Explain required=True, type=Path and type=int using one example each.",
        "Observe the help, success, usage-error, data-error and health-failure paths.",
        "Write tests against output, status and unchanged input rather than source spelling.",
      ],
      optional: [
        {
          topic: "Subcommands and reusable packaging",
          reason:
            "Useful after one small CLI has a stable, reproduced behavior contract.",
        },
      ],
      terms: [
        {
          term: "Argument",
          meaning:
            "A value supplied to the program at launch, such as a path after --input.",
        },
        {
          term: "Exit status",
          meaning:
            "An integer returned to the calling shell; this tool documents its own nonzero categories.",
        },
        {
          term: "stderr",
          meaning:
            "A stream for diagnostics that can be captured separately from the stdout report.",
        },
        {
          term: "Schema validation",
          meaning:
            "Checking the decoded JSON shape and types before using its values.",
        },
      ],
      walkthrough: [
        {
          title: "Inspect the interface",
          instruction: "Save the code and run python3 report.py --help.",
          expected:
            "Usage lists required --input and optional --minimum, and exits with status 0.",
        },
        {
          title: "Run one valid fixture",
          instruction:
            "Create the two-item JSON list and run with --minimum 1, then inspect the immediate status.",
          expected: "The JSON report shows healthy 1 and total 2; status is 0.",
        },
        {
          title: "Change only the target",
          instruction: "Repeat with --minimum 2 and the same fixture.",
          expected:
            "The JSON report is unchanged, but the tool returns status 3.",
        },
        {
          title: "Fail and recover",
          instruction:
            "Use a string for healthy, capture stderr/status, restore a boolean and rerun.",
          expected:
            "The invalid file returns 1; the repaired file meets the original threshold and returns 0.",
        },
      ],
      commandDetails: [
        {
          command: "python3 report.py --help",
          breakdown:
            "python3 executes the saved file; --help asks argparse to display usage and stop.",
          expected: "A purpose, options and status 0 without reading --input.",
          pitfall:
            "Do not assume a saved script has run merely because it is open in an editor.",
        },
        {
          command: "python3 report.py --input",
          breakdown:
            "--input takes one path value; quote spaces in Bash. --minimum takes an integer and defaults to 1.",
          expected:
            "A JSON report for valid data; the documented status tells whether the threshold was met.",
          pitfall:
            'A JSON string such as "false" is truthy text in Python and must be rejected rather than counted as a boolean.',
        },
        {
          command: "echo $?",
          breakdown:
            "$? expands to the immediately preceding command's status in Bash; echo displays it.",
          expected: "0, 1, 2 or 3 for the documented demo paths.",
          pitfall:
            "Another command changes $?; capture it immediately, and use the appropriate native status mechanism in other shells.",
        },
      ],
      readiness: [
        "Can you explain why valid JSON syntax can still fail validation?",
        "Can you reproduce each status without changing the script?",
        "Can another person run a path containing spaces from your instructions?",
      ],
    },
  },
  {
    id: "network-cidr",
    section: 8,
    title: "Calculate a subnet before drawing its instances",
    summary:
      "Use local IPv4 fixtures to reason about CIDR ranges, subnet capacity, overlap and the difference between generic host counts and AWS reservations.",
    minutes: 75,
    status: "released",
    prerequisites: ["network-addresses", "python-data"],
    outcomes: [
      "Calculate IPv4 address counts from prefix length",
      "Reject an unaligned CIDR rather than silently accepting a different range",
      "Detect overlapping ranges with a reproducible local fixture",
      "Separate address arithmetic, provider reservations and actual network reachability",
    ],
    concepts: [
      {
        title: "A prefix defines a range",
        body: "IPv4 addresses have 32 bits. A /26 fixes 26 network bits and leaves 6 variable bits, giving 2**6 = 64 total addresses. A longer prefix creates a smaller range. A /24 contains four non-overlapping /26 subnets. The range must begin at the correct boundary; 10.20.0.7/26 has host bits set and is rejected in strict mode.",
      },
      {
        title: "Arithmetic is not an allocation policy",
        body: "For an ordinary /26 IPv4 subnet, Python's hosts() iterator excludes network and broadcast addresses, producing 62. Ordinary AWS IPv4 subnet allocation reserves the first four and last address, leaving 59 assignable addresses. Special addressing modes can differ; recheck current provider rules. The demo models only ordinary AWS IPv4 subnets from /16 through /28, and does not apply this shortcut to /31, /32 or IPv6.",
      },
      {
        title: "A fitting address does not prove a working path",
        body: "An address can belong to a subnet while a route, firewall, DNS name, listener or return path remains wrong. CIDR overlap is a separate design problem: two proposed ranges can each look valid yet intersect. Check membership and overlap before discussing connectivity, then use the earlier layered network tests for runtime evidence.",
      },
    ],
    commands: [
      {
        command: "python3 cidr_plan.py",
        purpose: "Run the local address-planning fixture",
        example: "python3 cidr_plan.py",
      },
      {
        command: "IPv4Network",
        purpose: "Parse an aligned IPv4 network with strict validation",
        example: 'IPv4Network("10.20.0.0/26", strict=True)',
      },
      {
        command: "overlaps",
        purpose: "Check whether two ranges share any addresses",
        example: "left.overlaps(right)",
      },
    ],
    demo: {
      title:
        "Save cidr_plan.py; this calculates values without contacting a network",
      code: `from ipaddress import IPv4Address, IPv4Network


def ordinary_aws_capacity(cidr):
    network = IPv4Network(cidr, strict=True)
    if not 16 <= network.prefixlen <= 28:
        raise ValueError("fixture supports ordinary AWS IPv4 /16 through /28 only")
    return network.num_addresses - 5


parent = IPv4Network("10.20.0.0/24", strict=True)
subnets = list(parent.subnets(new_prefix=26))
for network in subnets:
    print(network, "total", network.num_addresses,
          "ordinary AWS assignable", ordinary_aws_capacity(str(network)))
assert len(subnets) == 4
assert all(ordinary_aws_capacity(str(n)) >= 50 for n in subnets)
assert not subnets[0].overlaps(subnets[1])
assert IPv4Address("10.20.0.70") in subnets[1]
print("generic hosts in first subnet:", sum(1 for _ in subnets[0].hosts()))

try:
    IPv4Network("10.20.0.7/26", strict=True)
except ValueError:
    print("rejected: host bits set in 10.20.0.7/26")
else:
    raise AssertionError("unaligned network unexpectedly accepted")

corrected = IPv4Network("10.20.0.0/26", strict=True)
print("reviewed correction:", corrected)
print("overlap example:", corrected.overlaps(IPv4Network("10.20.0.0/27")))`,
      explanation:
        "The four ranges start at .0, .64, .128 and .192. Each has 64 total addresses and 59 ordinary AWS assignable addresses, enough for the fixture's demand of 50. Generic hosts() reports 62, which must not be presented as AWS capacity. The unaligned proposal fails; the author then explicitly supplies a reviewed aligned correction. The overlapping /27 is inside the first /26. These are calculations, not deployed subnets, route checks or proof of available addresses in an account.",
    },
    practice: [
      "Compute the /26 count by hand before running Python.",
      "Write the start and end address of every /26 inside the /24.",
      "Predict whether 10.20.0.70 belongs to the first or second range.",
      "Compare /27 capacity with a need for 30 assignable addresses under this ordinary AWS model.",
    ],
    exercises: [
      {
        id: "cidr-bits",
        kind: "recall",
        prompt: "How many variable host bits remain in an IPv4 /26 range?",
        answers: ["6", "6 bits"],
        hint: "IPv4 has 32 bits total.",
        explanation: "32 minus 26 leaves 6 variable bits.",
      },
      {
        id: "cidr-count",
        kind: "predict",
        prompt:
          "How many total IPv4 addresses are in a /27 range, before reservations?",
        answers: ["32"],
        hint: "2 raised to the number of variable bits.",
        explanation: "2**(32-27) equals 32 total addresses.",
      },
      {
        id: "cidr-aws-capacity",
        kind: "predict",
        prompt:
          "Under the demo's ordinary AWS IPv4 reservation model, how many /27 addresses are assignable?",
        answers: ["27"],
        hint: "Subtract the five reserved addresses from the total.",
        explanation:
          "32 total minus 5 reserved gives 27; this model is scoped to ordinary AWS IPv4 allocation.",
      },
      {
        id: "cidr-strict",
        kind: "diagnose",
        caseSensitive: false,
        prompt:
          "IPv4Network('10.20.0.7/26', strict=True) fails. What is set in this proposed network address?",
        answers: ["host bits", "host bits are set"],
        hint: "The proposed start is inside the range rather than at its boundary.",
        explanation:
          "Strict parsing rejects host bits in a network address; review the intended range before correcting it.",
      },
      {
        id: "cidr-overlap",
        kind: "recall",
        prompt:
          "Which ipaddress network method checks whether two ranges intersect?",
        answers: ["overlaps", "overlaps()"],
        hint: "It names the condition being detected.",
        explanation:
          "left.overlaps(right) returns whether their address ranges intersect.",
      },
    ],
    lab: {
      title: "Reject an address plan that cannot meet its own capacity target",
      environment:
        "Local Python 3 with the standard-library ipaddress module, a text editor and a fresh disposable directory. No packets, cloud account, credentials or provider resources are involved.",
      scenario:
        "A fictional team proposes two /27 application subnets, each needing 30 ordinary AWS assignable addresses. Its first draft also includes an overlapping range and an unaligned CIDR. You must reject and repair the plan with evidence.",
      steps: [
        "Save and run the demo. Record Python version, the four printed ranges, total counts, modeled assignable counts and the deliberate strict-parse failure.",
        "Create a separate fixture with 10.20.0.0/27 and 10.20.0.32/27, and a target of 30 per subnet. Assert ordinary_aws_capacity meets the target; capture its failure.",
        "Replace those two ranges with non-overlapping /26 siblings inside the original /24. Show the same target assertion passing and disclose remaining unallocated ranges.",
        "Add 10.20.0.16/28 as a proposed third range. Check every pair with overlaps and report the collision before accepting the plan.",
        "Try the unaligned 10.20.0.7/26. Preserve the ValueError, write which range you actually intended, then supply the aligned correction explicitly.",
        "Add tests rejecting unsupported fixture prefixes and verify an address just inside and just outside one accepted range. Label counts as modeled capacity rather than actual account availability.",
        "Write a short design note separating subnet membership, reservation policy, capacity headroom and the routes/security/listener observations a future real request would need.",
      ],
      evidence: [
        "Original and repaired plans with address boundaries",
        "Failing/passing capacity assertions and pairwise overlap checks",
        "Strict-input failure and explicitly justified correction",
        "Provider-reservation assumption and untested connectivity limits",
      ],
      rubric: [
        "Computes total and modeled assignable counts separately",
        "Demonstrates an insufficient plan failing before repair",
        "Finds the overlapping range and checks every accepted pair",
        "Rejects unaligned/unsupported fixture inputs without silently changing intent",
        "Labels local calculations separately from provider and network evidence",
      ],
      hints: [
        "For a /27, total capacity is 32 and the model leaves 27 assignable addresses.",
        "Two sibling /26 ranges have enough modeled capacity for 30 each and do not overlap.",
        "Check every pair of ranges; comparing only neighbors is not a general overlap test.",
      ],
      solution:
        "Each /27 fails the 30-address requirement because 32-5=27. A reviewed pair such as 10.20.0.0/26 and 10.20.0.64/26 gives 59 modeled assignable addresses each and no overlap. 10.20.0.16/28 intersects the first range and must be rejected or redesigned. Strict parsing rejects 10.20.0.7/26; choosing 10.20.0.0/26 is an explicit intent decision. No output here establishes routing, policy permission or actual free IP addresses in AWS.",
      challenge:
        "Without following the steps, plan three non-overlapping subnets inside 10.30.0.0/24, each needing 40 ordinary AWS assignable addresses plus 10 addresses of headroom. Prove capacity, containment and pairwise non-overlap; introduce one failing variant and explain why IPv6 needs a separate model.",
    },
    resourceIds: ["python", "aws"],
    study: {
      startingPoint:
        "You can already distinguish an IP address from a DNS name and read a small Python loop. This lesson calculates fictional ranges locally; it does not configure your computer's network.",
      whyItMatters:
        "An attractive cloud diagram can fail because its subnets overlap or run out of addresses. A small explicit model makes the capacity assumption visible before any resources or money are involved.",
      required: [
        "Calculate 2**(32-prefix) for /24, /26 and /27.",
        "Explain why longer prefixes represent smaller IPv4 ranges.",
        "Separate total addresses, generic hosts() results and provider-assignable capacity.",
        "Capture a failing capacity/overlap case before fixing the proposal.",
      ],
      optional: [
        {
          topic: "IPv6 and special IPv4 addressing modes",
          reason:
            "They require separate allocation and reservation rules; the demo deliberately refuses to generalize its shortcut.",
        },
      ],
      terms: [
        {
          term: "CIDR prefix",
          meaning:
            "A slash length specifying how many leading address bits identify the network range.",
        },
        {
          term: "Alignment",
          meaning:
            "A network range begins at the boundary required by its prefix; host bits must be zero in strict input.",
        },
        {
          term: "Overlap",
          meaning:
            "Two ranges share at least one address, even when both strings are individually valid.",
        },
        {
          term: "Assignable capacity",
          meaning:
            "Addresses available after the relevant allocation policy; it is different from total arithmetic size.",
        },
      ],
      walkthrough: [
        {
          title: "Predict the range size",
          instruction:
            "Write 32-26 and calculate 2 to that power before running the file.",
          expected: "6 variable bits and 64 total addresses.",
        },
        {
          title: "Inspect sibling ranges",
          instruction:
            "Run the demo and compare each /26's first and last addresses.",
          expected: "Four aligned ranges fill the /24 without overlap.",
        },
        {
          title: "Compare reservation models",
          instruction:
            "Compare hosts() with ordinary_aws_capacity for the first range.",
          expected:
            "62 generic hosts versus 59 modeled AWS assignable addresses.",
        },
        {
          title: "Reject and repair",
          instruction:
            "Capture the strict-parse rejection and inspect the explicitly supplied correction.",
          expected:
            "The unaligned .7 input fails; the reviewed .0/26 network parses.",
        },
      ],
      commandDetails: [
        {
          command: "python3 cidr_plan.py",
          breakdown:
            "python3 executes the saved local fixture. Assertions stop execution if a modeled guarantee fails.",
          expected:
            "Four ranges, capacity counts, a deliberate rejected input and an overlap example.",
          pitfall:
            "Passing arithmetic does not prove an instance, route or cloud subnet exists.",
        },
        {
          command: "IPv4Network",
          breakdown:
            "The address/prefix string defines a range; strict=True rejects host bits rather than normalizing them silently.",
          expected:
            "Aligned strings produce IPv4 network objects; unaligned strings raise ValueError.",
          pitfall:
            "strict=False changes the supplied address to a network boundary and can hide a mistaken plan.",
        },
        {
          command: "overlaps",
          breakdown:
            "Call left.overlaps(right) for two parsed ranges; check all pairs in a larger plan.",
          expected:
            "False for distinct sibling /26 ranges and True for a /27 inside one of them.",
          pitfall:
            "Different prefix lengths or different written addresses do not guarantee disjoint ranges.",
        },
      ],
      readiness: [
        "Can you reject a /27 for 30 ordinary AWS assignable addresses with arithmetic?",
        "Can you explain why hosts() is not an AWS allocation policy?",
        "Can you distinguish address membership from actual network reachability?",
      ],
    },
  },
];
