export type ExamPracticeQuestion = {
  id: string;
  certificationId: "cloud-practitioner" | "solutions-architect";
  domain: string;
  lessonIds: string[];
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  wrongAnswerExplanations: string[];
};

/** Original teaching scenarios, reviewed against official AWS guidance on 2026-10-23.
 * These short, repeatable sets are not full timed mocks or predictions of an exam result.
 * Lesson links provide foundations; some questions deliberately introduce remaining depth.
 */
export const certificationPractice: ExamPracticeQuestion[] = [
  {
    id: "clf-elastic-demand",
    certificationId: "cloud-practitioner",
    domain: "Cloud Concepts",
    lessonIds: ["cloud-model", "aws-availability"],
    prompt:
      "A ticket website needs many more web workers for a two-hour sale, then normal capacity afterward. Which cloud characteristic most directly matches this changing demand?",
    options: [
      "Elasticity: add and remove capacity as demand changes",
      "Durability: retain data despite component loss",
      "A fixed reservation for the largest possible fleet",
      "Moving every component to a different Region",
    ],
    answer: 0,
    explanation:
      "Elasticity matches provisioned capacity to changing demand. The application still needs suitable scaling rules and measurements.",
    wrongAnswerExplanations: [
      "Elasticity matches capacity to demand over time.",
      "Durability concerns retaining data, rather than changing worker capacity.",
      "A permanently oversized fleet leaves idle capacity after the sale.",
      "A Region change is a location decision and does not itself adapt capacity.",
    ],
  },
  {
    id: "clf-failure-boundaries",
    certificationId: "cloud-practitioner",
    domain: "Cloud Concepts",
    lessonIds: ["aws-availability", "architecture-tradeoffs"],
    prompt:
      "A team wants its web tier to tolerate loss of one Availability Zone while remaining in the same AWS Region. Which proposal provides the relevant infrastructure separation?",
    options: [
      "Run two processes on one EC2 instance",
      "Put all instances in two subnets in the same Zone",
      "Place sufficient application capacity in multiple Availability Zones",
      "Keep one instance and take a screenshot of its settings",
    ],
    answer: 2,
    explanation:
      "Multiple Zones provide distinct failure boundaries inside a Region. Surviving capacity and shared dependencies must also meet the requirement.",
    wrongAnswerExplanations: [
      "Both processes share the instance and its Zone.",
      "Separate subnets in one Zone still share that Zone failure boundary.",
      "This separates Zone failures, provided surviving capacity and dependencies suffice.",
      "A settings record does not provide replacement serving capacity.",
    ],
  },
  {
    id: "clf-responsibility",
    certificationId: "cloud-practitioner",
    domain: "Cloud Concepts",
    lessonIds: ["cloud-model", "security-review"],
    prompt:
      "A company runs its own application on EC2. A security update is available for the guest operating system. Who is responsible for applying that guest update?",
    options: [
      "AWS, because EC2 uses AWS hardware",
      "The customer managing the EC2 guest operating system",
      "The domain registrar",
      "Only the vendor of the monitoring tool",
    ],
    answer: 1,
    explanation:
      "For EC2, customers manage the guest operating system and application patches; AWS manages the underlying infrastructure.",
    wrongAnswerExplanations: [
      "Owning the physical infrastructure does not transfer EC2 guest patching to AWS.",
      "The EC2 guest operating system is within the customer's responsibility.",
      "Domain registration does not manage the instance operating system.",
      "Monitoring may identify a problem; it does not transfer patching responsibility.",
    ],
  },
  {
    id: "clf-workload-identity",
    certificationId: "cloud-practitioner",
    domain: "Security and Compliance",
    lessonIds: ["aws-plan", "security-review"],
    prompt:
      "An EC2 application must read reports from one S3 prefix. The team wants to avoid distributing long-lived access keys. Which identity approach best fits?",
    options: [
      "Copy the root user's keys into the image",
      "Create one shared IAM user for every application",
      "Make the bucket public so no credentials are needed",
      "Attach an IAM role with scoped permissions to the instance",
    ],
    answer: 3,
    explanation:
      "An instance role provides temporary workload credentials and can limit access to the needed actions and resource prefix.",
    wrongAnswerExplanations: [
      "Root keys give excessive authority and are long lived.",
      "Shared user keys create rotation and accountability problems.",
      "Public access exposes the reports beyond the intended application.",
      "A scoped instance role avoids embedding long-lived keys.",
    ],
  },
  {
    id: "clf-explicit-deny",
    certificationId: "cloud-practitioner",
    domain: "Security and Compliance",
    lessonIds: ["aws-plan", "security-review"],
    prompt:
      "An applicable identity policy allows an S3 read, but an applicable bucket policy explicitly denies that same request. What happens?",
    options: [
      "The request is denied",
      "The identity allow always wins",
      "AWS chooses the most recently edited policy",
      "The request succeeds if the security group allows HTTPS",
    ],
    answer: 0,
    explanation:
      "An applicable explicit deny overrides an allow. Network reachability does not override authorization.",
    wrongAnswerExplanations: [
      "The applicable explicit deny controls this result.",
      "An allow does not override an explicit deny.",
      "Policy edit time is not the decision rule.",
      "A network rule cannot grant an API permission.",
    ],
  },
  {
    id: "clf-audit-versus-health",
    certificationId: "cloud-practitioner",
    domain: "Security and Compliance",
    lessonIds: ["aws-operations", "observability-signals"],
    prompt:
      "After a security-group change, a reviewer asks which AWS principal submitted the change and when. Which evidence source most directly answers that audit question?",
    options: [
      "A graph of the website's response times",
      "An EC2 CPU metric alone",
      "The relevant AWS CloudTrail management event",
      "An S3 storage-capacity estimate",
    ],
    answer: 2,
    explanation:
      "CloudTrail account activity can identify the API action, principal and time. Application health needs separate evidence.",
    wrongAnswerExplanations: [
      "Response times describe impact rather than the actor making an API change.",
      "CPU usage cannot identify the principal who changed a rule.",
      "The relevant management event records change activity and request identity.",
      "A storage estimate does not record security-group changes.",
    ],
  },
  {
    id: "clf-root-protection",
    certificationId: "cloud-practitioner",
    domain: "Security and Compliance",
    lessonIds: ["security-review", "cloud-model"],
    prompt:
      "A new AWS account owner is preparing ordinary daily administration. Which practice best reduces unnecessary use of the root identity?",
    options: [
      "Share the root password with the team",
      "Protect root with MFA and use appropriate federated or role-based identities for routine work",
      "Disable logging so root activity cannot expose secrets",
      "Use root for every task to avoid permission errors",
    ],
    answer: 1,
    explanation:
      "Protect the powerful root identity and reserve it for tasks that require it. Routine work should use appropriately scoped identities.",
    wrongAnswerExplanations: [
      "A shared root password expands privileged access and weakens accountability.",
      "This limits root exposure while supporting routine least-privilege access.",
      "Removing logs reduces audit evidence and does not protect root access.",
      "Avoiding permission errors by using root grants unnecessary authority.",
    ],
  },
  {
    id: "clf-object-storage",
    certificationId: "cloud-practitioner",
    domain: "Cloud Technology and Services",
    lessonIds: ["aws-plan", "cloud-model"],
    prompt:
      "An application stores product photographs as objects retrieved by key. It does not need a shared mounted filesystem or a boot disk. Which service category fits best?",
    options: [
      "Amazon EBS block storage",
      "Amazon EFS file storage",
      "A larger EC2 root volume",
      "Amazon S3 object storage",
    ],
    answer: 3,
    explanation:
      "S3 stores objects accessed through service APIs. The access pattern does not require block or shared file semantics.",
    wrongAnswerExplanations: [
      "EBS provides block volumes rather than an object API.",
      "EFS provides a filesystem interface that this requirement does not need.",
      "An instance root volume couples the photographs to that instance's storage design.",
      "The stated key-based object access matches S3.",
    ],
  },
  {
    id: "clf-relational-choice",
    certificationId: "cloud-practitioner",
    domain: "Cloud Technology and Services",
    lessonIds: ["database-sql", "database-transactions", "cloud-model"],
    prompt:
      "A small application already uses PostgreSQL, SQL joins and relational transactions. The team wants a managed relational database instead of administering a database host. Which service is the closest fit?",
    options: [
      "Amazon RDS for PostgreSQL",
      "Amazon S3 alone",
      "Amazon SQS",
      "Amazon CloudFront",
    ],
    answer: 0,
    explanation:
      "RDS offers a managed PostgreSQL database. The team still owns its schema, access choices and application behavior.",
    wrongAnswerExplanations: [
      "RDS supports the existing relational database model.",
      "Object storage does not supply the required PostgreSQL query interface.",
      "A queue transports messages rather than running SQL joins.",
      "A content delivery network does not provide relational transactions.",
    ],
  },
  {
    id: "clf-queue-buffer",
    certificationId: "cloud-practitioner",
    domain: "Cloud Technology and Services",
    lessonIds: ["architecture-tradeoffs", "python-http-api"],
    prompt:
      "A photo upload should be accepted even while thumbnail workers are briefly busy. Which service can hold work until a worker is ready?",
    options: [
      "Route 53 DNS records",
      "An IAM permissions boundary",
      "An Amazon SQS queue",
      "An EC2 security group",
    ],
    answer: 2,
    explanation:
      "A queue decouples accepting work from processing it. Workers still need retry, duplicate-handling and failure policies.",
    wrongAnswerExplanations: [
      "DNS resolves names; it does not buffer processing work.",
      "A permissions boundary constrains identity permissions rather than storing jobs.",
      "SQS can buffer work for consumers that process it later.",
      "A security group controls network traffic rather than retaining jobs.",
    ],
  },
  {
    id: "clf-event-compute",
    certificationId: "cloud-practitioner",
    domain: "Cloud Technology and Services",
    lessonIds: ["cloud-model", "architecture-tradeoffs"],
    prompt:
      "A short validation function runs only when a new object arrives. The team wants to avoid maintaining server operating systems for this function. Which compute service is the most direct match?",
    options: [
      "Amazon EBS",
      "AWS Lambda",
      "Amazon Route 53",
      "An S3 storage class",
    ],
    answer: 1,
    explanation:
      "Lambda runs event-driven functions without customer management of server operating systems. Application code and configuration still require care.",
    wrongAnswerExplanations: [
      "A block volume is storage rather than function execution.",
      "Lambda matches short event-driven computation with managed infrastructure.",
      "DNS routing does not execute the validation code.",
      "A storage class changes storage behavior rather than running code.",
    ],
  },
  {
    id: "clf-spend-investigation",
    certificationId: "cloud-practitioner",
    domain: "Billing, Pricing, and Support",
    lessonIds: ["cloud-model", "aws-operations"],
    prompt:
      "The finance owner wants to group last month's AWS costs by service to investigate an increase. Which tool most directly supports that historical analysis?",
    options: [
      "A security-group rule",
      "AWS Pricing Calculator with a new hypothetical design",
      "An application access log alone",
      "AWS Cost Explorer",
    ],
    answer: 3,
    explanation:
      "Cost Explorer analyzes incurred cost and usage. Pricing Calculator is useful for estimating planned configurations.",
    wrongAnswerExplanations: [
      "A traffic rule does not analyze billing history.",
      "A proposed design estimate is different from grouping actual historical charges.",
      "Application requests omit many billed resources and billing dimensions.",
      "Cost Explorer provides cost and usage analysis by dimensions such as service.",
    ],
  },
  {
    id: "clf-budget-boundary",
    certificationId: "cloud-practitioner",
    domain: "Billing, Pricing, and Support",
    lessonIds: ["cloud-model", "aws-field"],
    prompt:
      "A learner configures only a budget email alert at a chosen threshold. What should they assume about resource usage after that threshold is crossed?",
    options: [
      "Resources can continue incurring charges; an alert alone is not a hard spending cap",
      "All resources are immediately deleted",
      "AWS guarantees the final bill equals the threshold",
      "Every attached storage volume becomes free",
    ],
    answer: 0,
    explanation:
      "A notification warns about spending; it does not automatically stop every resource. Review usage and cleanup explicitly.",
    wrongAnswerExplanations: [
      "The notification alone does not enforce a universal spending cap.",
      "No deletion action was configured by this scenario.",
      "An alert threshold is not a guarantee about the final bill.",
      "Storage charges are not waived when an alert fires.",
    ],
  },
  {
    id: "clf-support-scope",
    certificationId: "cloud-practitioner",
    domain: "Billing, Pricing, and Support",
    lessonIds: ["cloud-model", "aws-operations"],
    prompt:
      "A learner has AWS Basic Support and needs help correcting an account billing issue. Which statement describes the appropriate support boundary?",
    options: [
      "Basic Support includes a dedicated technical account manager",
      "All technical production incidents receive premium engineer support under Basic",
      "Account and billing support is available; technical support case access requires an eligible paid support plan",
      "Buying more EC2 instances automatically upgrades the support plan",
    ],
    answer: 2,
    explanation:
      "Basic includes account and billing assistance. Recheck current support plans for technical case entitlement and response commitments.",
    wrongAnswerExplanations: [
      "A dedicated technical account manager is not a Basic entitlement.",
      "Basic does not include premium technical case access for all incidents.",
      "This distinguishes account/billing help from paid technical support entitlement.",
      "Resource usage does not itself change the subscribed support plan.",
    ],
  },
  {
    id: "saa-role-prefix",
    certificationId: "solutions-architect",
    domain: "Design Secure Architectures",
    lessonIds: ["aws-plan", "security-review", "aws-field"],
    prompt:
      "An EC2 worker needs only to read objects under reports/ in one bucket. Which proposal best supports temporary credentials and least privilege?",
    options: [
      "Bake a shared administrator key into its image",
      "Attach an instance role granting the necessary read action on that prefix's object resources",
      "Make every bucket public and rely on obscure keys",
      "Attach an unrestricted S3 policy because the worker runs in a private subnet",
    ],
    answer: 1,
    explanation:
      "Use workload identity with permission scoped to the required objects. A private subnet does not limit the role's API authority.",
    wrongAnswerExplanations: [
      "An image distributes a long-lived, excessive credential.",
      "This combines temporary role credentials with the required resource scope.",
      "Object-name obscurity does not enforce authorized access.",
      "Network placement does not justify unrelated S3 permissions.",
    ],
  },
  {
    id: "saa-app-network-boundary",
    certificationId: "solutions-architect",
    domain: "Design Secure Architectures",
    lessonIds: ["cloud-packet", "aws-plan"],
    prompt:
      "An internet-facing ALB forwards HTTPS client requests to application instances on port 8080. Only ALB traffic should reach that application port. Which inbound application security-group rule best expresses the requirement?",
    options: [
      "Allow TCP 8080 from 0.0.0.0/0",
      "Allow all protocols from every private IPv4 address",
      "Allow only SSH from the ALB security group",
      "Allow TCP 8080 with the ALB security group as source",
    ],
    answer: 3,
    explanation:
      "Reference the ALB security group on the application's actual target port. Listener, routes and health checks must also agree.",
    wrongAnswerExplanations: [
      "This permits any reachable IPv4 source rather than only the ALB.",
      "This allows unrelated protocols and sources.",
      "SSH is not the application's target port.",
      "The source identity and port match the stated application boundary.",
    ],
  },
  {
    id: "saa-policy-denial",
    certificationId: "solutions-architect",
    domain: "Design Secure Architectures",
    lessonIds: ["security-review", "aws-plan"],
    prompt:
      "An IAM role has s3:DeleteObject allowed. An applicable bucket policy explicitly denies the role's delete request. Which change would actually need review to permit that same request?",
    options: [
      "Review and appropriately remove or narrow the applicable deny, while retaining the required allow",
      "Add the same allow statement a second time",
      "Increase the EC2 instance size",
      "Open inbound HTTPS on the instance",
    ],
    answer: 0,
    explanation:
      "An applicable explicit deny wins. A legitimate permission change must address that deny within the intended access boundary.",
    wrongAnswerExplanations: [
      "The applicable deny must be addressed through an authorized policy review.",
      "A duplicate allow does not override an explicit deny.",
      "Compute capacity does not alter policy evaluation.",
      "An inbound rule does not grant S3 delete permission.",
    ],
  },
  {
    id: "saa-boundary-intersection",
    certificationId: "solutions-architect",
    domain: "Design Secure Architectures",
    lessonIds: ["security-review", "aws-plan"],
    prompt:
      "For this request, an IAM user has only identity-based permissions, no resource-policy grant, and no other guardrails. Its policy allows GetObject and PutObject. Its permissions boundary allows only GetObject. What is the effective access?",
    options: [
      "Both actions, because the identity policy grants them",
      "Neither action, because boundaries deny everything",
      "GetObject only",
      "PutObject only, because writes override reads",
    ],
    answer: 2,
    explanation:
      "In this scoped case, effective permissions are the intersection of the identity policy and boundary. A boundary does not itself grant access.",
    wrongAnswerExplanations: [
      "Identity-based grants cannot exceed the boundary in this case.",
      "GetObject is allowed by both policies.",
      "Only GetObject appears in both allowed sets.",
      "There is no writes-over-reads rule, and PutObject is outside the boundary.",
    ],
  },
  {
    id: "saa-rds-failover",
    certificationId: "solutions-architect",
    domain: "Design Resilient Architectures",
    lessonIds: [
      "aws-availability",
      "database-transactions",
      "architecture-tradeoffs",
    ],
    prompt:
      "An RDS PostgreSQL database must recover from an instance or Zone failure using a managed standby. Read scaling is not the goal. Which option most directly meets that requirement?",
    options: [
      "One Single-AZ instance and no backups",
      "An RDS Multi-AZ DB instance deployment",
      "Only an asynchronous read replica that the application never promotes",
      "Two application processes on the same database host",
    ],
    answer: 1,
    explanation:
      "A Multi-AZ DB instance deployment provides a synchronous standby and managed failover. Its standby is not a read-scaling endpoint; Multi-AZ DB clusters are a different option.",
    wrongAnswerExplanations: [
      "One instance leaves the required serving failure unresolved.",
      "This supplies the managed standby and failover mechanism requested.",
      "A read replica alone is not equivalent to this managed standby/failover design.",
      "Two local processes share the failing host and Zone.",
    ],
  },
  {
    id: "saa-queue-idempotency",
    certificationId: "solutions-architect",
    domain: "Design Resilient Architectures",
    lessonIds: [
      "architecture-tradeoffs",
      "database-transactions",
      "python-http-api",
    ],
    prompt:
      "An SQS standard-queue worker sometimes receives the same order twice, including after a slow attempt. Which design best prevents duplicate business effects while preserving recovery from failures?",
    options: [
      "Delete every message before starting its work",
      "Disable retries and silently discard failures",
      "Assume a longer visibility timeout guarantees exactly-once effects",
      "Use a durable idempotency key, suitable visibility handling, and a dead-letter policy for repeated failures",
    ],
    answer: 3,
    explanation:
      "Standard queues can redeliver. Make the business operation idempotent, align visibility with processing and investigate repeatedly failing work.",
    wrongAnswerExplanations: [
      "A crash after early deletion can lose unfinished work.",
      "Discarding failures trades duplicates for lost orders.",
      "Visibility settings do not guarantee exactly-once business effects.",
      "This addresses duplicate effects, slow processing and persistent failures together.",
    ],
  },
  {
    id: "saa-recovery-objectives",
    certificationId: "solutions-architect",
    domain: "Design Resilient Architectures",
    lessonIds: ["reliability-incident", "architecture-tradeoffs"],
    prompt:
      "A service's targets are RTO 30 minutes and RPO 5 minutes. A drill restores service in 18 minutes, but the latest recoverable data is 20 minutes old. Which conclusion follows?",
    options: [
      "Both objectives were met",
      "RPO was met but RTO failed",
      "The measured restoration met RTO but the recovery point missed RPO",
      "The restore time proves the backup contains every committed change",
    ],
    answer: 2,
    explanation:
      "The downtime was below 30 minutes, but the data gap exceeded 5 minutes. Measure recovery time and recovery point separately.",
    wrongAnswerExplanations: [
      "The 20-minute data gap exceeds the RPO.",
      "This reverses which measurement meets its target.",
      "The two independent measurements support this conclusion.",
      "A quick restoration cannot prove the presence of later changes.",
    ],
  },
  {
    id: "saa-zone-capacity",
    certificationId: "solutions-architect",
    domain: "Design Resilient Architectures",
    lessonIds: ["aws-availability", "architecture-tradeoffs"],
    prompt:
      "A stateless tier needs 90 requests/second. It has two Zones, each measured at 60 requests/second maximum. Assume no new instances can start during the tested failure window. What does losing one Zone demonstrate?",
    options: [
      "The 60 requests/second surviving capacity is insufficient despite normal capacity being adequate",
      "Two Zones guarantee the 90 requests/second target",
      "A load balancer doubles the surviving worker's capacity",
      "Database backups immediately add web capacity",
    ],
    answer: 0,
    explanation:
      "Normal capacity is 120, but one-Zone loss leaves 60. Redundancy needs enough surviving capacity as well as separate failure domains.",
    wrongAnswerExplanations: [
      "This follows directly from the measured capacity and stated failure assumptions.",
      "Zone count alone does not establish sufficient capacity.",
      "Routing work does not double measured processing capacity.",
      "A database backup is not serving web compute.",
    ],
  },
  {
    id: "saa-shared-files",
    certificationId: "solutions-architect",
    domain: "Design High-Performing Architectures",
    lessonIds: ["aws-plan", "architecture-tradeoffs"],
    prompt:
      "Linux application instances in multiple Zones must concurrently mount the same managed NFS filesystem. The application requires file paths and shared filesystem operations. Which storage choice most directly fits?",
    options: [
      "Separate instance-store directories",
      "A Regional Amazon EFS filesystem with appropriate mount targets and access controls",
      "An S3 bucket treated as a drop-in POSIX disk",
      "A single ordinary EBS volume independently formatted by every instance",
    ],
    answer: 1,
    explanation:
      "EFS supplies shared file storage for Linux/NFS clients. Choose the Regional design and verify mount networking, permissions and workload performance.",
    wrongAnswerExplanations: [
      "Separate local disks do not provide one shared filesystem.",
      "This provides the requested shared file interface across the instances.",
      "An object API is not a drop-in POSIX filesystem.",
      "Ordinary EBS use does not provide this managed multi-Zone shared NFS service.",
    ],
  },
  {
    id: "saa-read-scaling",
    certificationId: "solutions-architect",
    domain: "Design High-Performing Architectures",
    lessonIds: ["database-sql", "aws-availability", "architecture-tradeoffs"],
    prompt:
      "An RDS PostgreSQL primary has heavy reporting reads. Reports can tolerate some replica lag. Which change directly offloads these reads while preserving the primary for writes?",
    options: [
      "Send reports to the standby of a Multi-AZ DB instance deployment",
      "Increase the SQS visibility timeout",
      "Put reporting SQL in a security-group rule",
      "Add an RDS read replica and direct suitable report queries to its endpoint",
    ],
    answer: 3,
    explanation:
      "A read replica can offload read traffic. Route suitable queries explicitly and account for asynchronous replication lag.",
    wrongAnswerExplanations: [
      "That deployment's standby does not serve application read traffic.",
      "A queue timeout does not reduce database query load.",
      "Security groups do not execute SQL.",
      "The read replica and query routing address the stated bottleneck.",
    ],
  },
  {
    id: "saa-key-access",
    certificationId: "solutions-architect",
    domain: "Design High-Performing Architectures",
    lessonIds: ["database-sql", "cloud-model", "architecture-tradeoffs"],
    prompt:
      "A new session lookup service uses known primary keys, small items and variable request volume. It needs a managed key-value database and no SQL joins. Which service most directly matches this access model?",
    options: [
      "Amazon DynamoDB with a suitable partition-key design",
      "S3 Glacier Deep Archive as the live session database",
      "An SQS queue as an arbitrary-key query engine",
      "A CloudTrail event history as the session store",
    ],
    answer: 0,
    explanation:
      "DynamoDB supports key-value access. Partition-key distribution and actual request patterns still determine a good table design.",
    wrongAnswerExplanations: [
      "This matches the specified database access model.",
      "Asynchronous archive retrieval is unsuitable for active session lookups.",
      "Queues deliver messages rather than providing arbitrary keyed record queries.",
      "Audit events are not an application session database.",
    ],
  },
  {
    id: "saa-s3-endpoint-cost",
    certificationId: "solutions-architect",
    domain: "Design Cost-Optimized Architectures",
    lessonIds: ["cloud-packet", "aws-plan", "architecture-tradeoffs"],
    prompt:
      "Private-subnet EC2 workers access S3 buckets in their own Region through a NAT gateway. This traffic needs no on-premises or cross-Region endpoint access. Which change can remove NAT processing for the S3 path?",
    options: [
      "Give the bucket a public-read policy",
      "Add another NAT gateway for the same path",
      "Associate an S3 gateway endpoint with the workers' route tables and review endpoint/bucket/IAM permissions",
      "Disable all S3 authorization checks",
    ],
    answer: 2,
    explanation:
      "An S3 gateway endpoint can route this traffic without NAT and has no additional endpoint charge. Authorization and other traffic requirements still apply.",
    wrongAnswerExplanations: [
      "Public object access is unnecessary and does not choose a private routing path.",
      "Another NAT gateway retains NAT processing for that traffic.",
      "This changes the qualifying S3 route while retaining permission checks.",
      "Authorization is still required; routing is not permission.",
    ],
  },
  {
    id: "saa-storage-lifecycle",
    certificationId: "solutions-architect",
    domain: "Design Cost-Optimized Architectures",
    lessonIds: ["aws-plan", "architecture-tradeoffs", "reliability-incident"],
    prompt:
      "A team keeps large audit objects for years. After 90 days they are rarely requested, and restore delays of hours are acceptable. Which cost review best fits the retention requirement?",
    options: [
      "Delete the objects at day 90 regardless of retention",
      "Evaluate a lifecycle transition to an appropriate S3 archive class, including restore charges and minimum-duration rules",
      "Keep every object on an always-running EC2 root disk",
      "Choose a single-Zone class solely because its name contains storage",
    ],
    answer: 1,
    explanation:
      "Match archival storage to acceptable access delay and retention. Compare total cost, including requests, retrieval and minimum-duration rules.",
    wrongAnswerExplanations: [
      "Deleting retained evidence violates the requirement.",
      "This evaluates storage cost against the actual retention and retrieval behavior.",
      "A running compute host is unnecessary for the stated object archive.",
      "Storage selection needs durability/failure and access requirements, not a label alone.",
    ],
  },
  {
    id: "saa-idle-environment",
    certificationId: "solutions-architect",
    domain: "Design Cost-Optimized Architectures",
    lessonIds: ["cloud-model", "aws-field", "architecture-tradeoffs"],
    prompt:
      "A nonproduction EC2 environment is used only during weekday office hours and can be stopped overnight. Which first step best reduces avoidable cost without making an unsupported savings claim?",
    options: [
      "Buy a maximum-size annual commitment before measuring use",
      "Assume stopping EC2 removes every related charge",
      "Delete all persistent data every evening",
      "Measure use, schedule approved stops, and inventory remaining storage, address and other charges",
    ],
    answer: 3,
    explanation:
      "Schedule capacity around the actual requirement and review all remaining resources. Stopping compute is not proof that its whole environment is free.",
    wrongAnswerExplanations: [
      "Commitments should follow a measured stable need and price comparison.",
      "Storage and other allocated resources can continue charging.",
      "Unapproved data deletion violates persistence requirements.",
      "This reduces idle compute while accounting for costs that continue.",
    ],
  },
];
