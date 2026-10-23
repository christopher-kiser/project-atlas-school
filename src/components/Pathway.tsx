import {
  engineeringMonths,
  portfolioMilestones,
  certifications,
  lessonById,
  projects,
} from "../content";
import { getLessonProgress } from "../lib/learning";
import { link } from "../lib/navigation";
import type { DataProps } from "./Practice";

export function EngineeringPathway({ data }: Pick<DataProps, "data">) {
  return (
    <section aria-labelledby="six-month-title" className="pathway">
      <h2 id="six-month-title">Your six-month engineering plan</h2>
      <p>
        Start at your current capability and extend any phase until you can do
        its independent task. The original target is April 2027. Time spent,
        videos watched and credentials collected do not replace practical
        evidence.
      </p>
      <p className="fine">
        Read the lesson guide → predict the command → run the scoped example →
        explain the observation → attempt the lab without hints → revisit after
        a delay. Videos support this sequence. Keep project files in your own
        storage; Atlas saves progress and evidence references.
      </p>
      {engineeringMonths.map((month) => {
        const mapped = month.lessonIds
          .map(lessonById)
          .filter((l) => l !== undefined);
        const demonstrated = mapped.filter((l) =>
          ["Demonstrated", "Independent"].includes(
            getLessonProgress(l, data).state,
          ),
        ).length;
        return (
          <details
            className="panel month-plan"
            key={month.month}
            open={month.month === 1}
          >
            <summary>
              <span className="eyebrow">MONTH {month.month}</span>
              <strong>{month.title}</strong>
              <span className="fine">
                {demonstrated}/{mapped.length} lessons demonstrated
              </span>
            </summary>
            <p>{month.focus}</p>
            <h3>Learn and practise</h3>
            <div className="gate-grid">
              {mapped.map((l) => (
                <a
                  className="gate-skill"
                  key={l.id}
                  href={link(`lesson/${l.id}`)}
                >
                  <span>
                    {l.title}
                    <small>{getLessonProgress(l, data).state}</small>
                  </span>
                </a>
              ))}
            </div>
            <h3>Evidence to produce</h3>
            <ul>
              {month.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>Independent assessment</h3>
            <p>{month.independentTask}</p>
            <h3>Spaced and interleaved review</h3>
            <p>{month.review}</p>
            <div className="topic-tags">
              {month.projectIds.map((id) => (
                <a href={link(`portfolio/${id}`)} key={id}>
                  {projects.find((p) => p.id === id)?.title}
                </a>
              ))}
            </div>
            {month.certificationIds.length > 0 && (
              <p className="fine">
                Credential options:{" "}
                {month.certificationIds
                  .map((id) => certifications.find((c) => c.id === id)?.name)
                  .join(" · ")}
                .{" "}
                <a href={link("certifications")}>
                  See costs, official learning and remaining preparation.
                </a>
              </p>
            )}
            <p className="notice amber">{month.remainingDepth}</p>
          </details>
        );
      })}
    </section>
  );
}

export function ProjectMilestones({ id }: { id: string }) {
  const milestones = portfolioMilestones[id];
  if (!milestones) return null;
  return (
    <section className="project-milestones">
      <h3>Build toward independent evidence</h3>
      <ol className="steps">
        {milestones.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p className="fine">
        These stages guide the work. Keep the existing acceptance rubric and
        reviewer evidence; a milestone description does not award completion.
      </p>
    </section>
  );
}
