import type { Certification } from "../content/certifications";
import { lessonById, projects } from "../content";
import {
  getLessonProgress,
  isProjectVerified,
  type AtlasData,
} from "../lib/learning";
import { link } from "../lib/navigation";

export function CertificationMilestone({
  certification,
  data,
}: {
  certification: Certification;
  data: AtlasData;
}) {
  const milestone = certification.curriculumMilestone;
  if (!milestone) return null;
  const preparation = milestone.lessonIds.map((id) => {
    const lesson = lessonById(id);
    return {
      id,
      title: lesson?.title ?? id,
      state: lesson
        ? getLessonProgress(lesson, data).state
        : "Not Yet Introduced",
    };
  });
  const projectEvidence = (milestone.projectIds ?? []).map((id) => ({
    id,
    title: projects.find((p) => p.id === id)?.title ?? id,
    met: data.projects.some((p) => p.id === id && isProjectVerified(p)),
  }));
  const met = (state: string) =>
    ["Demonstrated", "Independent"].includes(state);
  const complete =
    preparation.length > 0 &&
    preparation.every((p) => met(p.state)) &&
    projectEvidence.every((p) => p.met);
  const next = preparation.find((p) => !met(p.state));
  return (
    <section
      className="credential-milestone"
      aria-label={`Curriculum timing for ${certification.name}`}
    >
      <h3>When to attempt this credential</h3>
      <p>
        <strong>{milestone.label}</strong>
      </p>
      <p className="fine">
        Atlas preparation: {preparation.filter((p) => met(p.state)).length}/
        {preparation.length} lessons demonstrated
        {projectEvidence.length
          ? ` · ${projectEvidence.filter((p) => p.met).length}/${projectEvidence.length} projects peer-attested`
          : ""}
        .
      </p>
      <p role="status">
        {complete
          ? "Your mapped Atlas evidence is recorded. Use the provider checks below to decide whether to start the assessment."
          : "Build the mapped Atlas evidence below, then complete the provider’s preparation before attempting its assessment."}
      </p>
      {next && (
        <a className="button secondary small" href={link(`lesson/${next.id}`)}>
          Next preparation lesson: {next.title}
        </a>
      )}
      <details>
        <summary>See the exact curriculum checkpoint</summary>
        <ul>
          {preparation.map((p) => (
            <li key={p.id}>
              <a href={link(`lesson/${p.id}`)}>{p.title}</a> — {p.state}
            </li>
          ))}
        </ul>
        {projectEvidence.map((p) => (
          <p key={p.id}>
            <a href={link(`portfolio/${p.id}`)}>{p.title}</a> —{" "}
            {p.met
              ? "Peer-attested evidence recorded"
              : "Evidence and peer review still needed"}
          </p>
        ))}
      </details>
      <h4>Before you sit the provider’s exam or assessment</h4>
      <ul>
        {milestone.extraPreparation.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="fine">
        This is Atlas’s suggested sequence, not the provider’s formal
        eligibility rule or an exam-pass prediction. Provider training, required
        labs, identity/eligibility checks and the readiness checklist still
        apply. Atlas does not book or award the credential.
      </p>
    </section>
  );
}
