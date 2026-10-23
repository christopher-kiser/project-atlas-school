import type { Lesson } from "../content/types";
import { StudyText } from "./LessonStudy";

export function CommandLessonIntro({ lesson }: { lesson: Lesson }) {
  const guide = lesson.study?.commandLesson;
  if (!guide) return null;
  return (
    <section
      tabIndex={-1}
      className="panel command-lesson-intro"
      aria-label="Tools and command learning plan"
    >
      <span className="eyebrow mint">UNDERSTAND BEFORE YOU TYPE</span>
      <h2>Tools & commands for this lesson</h2>
      <p>
        <StudyText text={guide.orientation} />
      </p>
      <div className="command-environment">
        <strong>Where you will work</strong>
        <p>
          <StudyText text={guide.environment} />
        </p>
      </div>
      <ol className="steps">
        <li>Identify the program or graphical tool below and where it runs.</li>
        <li>
          Read the syntax cards. Say what each option, path or symbol does.
        </li>
        <li>
          {lesson.commands.length
            ? "Choose every command or action in the explorer. Predict its result before opening your terminal or editor."
            : "Read the worksheet as a reasoning exercise. Its labels and diagrams are not terminal input."}
        </li>
        <li>
          Return to the worked example, follow the walkthrough and compare
          actual results. The website does not run commands on your computer.
        </li>
      </ol>
      <p className="fine">
        Required here: the tools and syntax on this page and their lesson
        examples. You can look up spellings. Additional options in a program’s
        manual are for exploration; do not try to memorize every flag.
      </p>
    </section>
  );
}

export function CommandTopicLessons({ lesson }: { lesson: Lesson }) {
  const topics = lesson.study?.commandLesson?.topics ?? [];
  return (
    <>
      {(["program", "syntax", "workflow"] as const).map((kind) => {
        const entries = topics.filter((t) => t.kind === kind);
        if (!entries.length) return null;
        const title =
          kind === "program"
            ? "Meet the programs"
            : kind === "syntax"
              ? "Read the syntax and symbols"
              : "Know which kind of action you are taking";
        return (
          <section
            className="panel command-topic-group"
            aria-label={title}
            key={kind}
          >
            <h2>{title}</h2>
            <p className="muted">
              Open each card for a small example, a breakdown and a check in
              your own words.
            </p>
            {entries.map((topic, index) => (
              <details
                data-topic-id={topic.id}
                className="command-topic"
                key={topic.id}
                open={index === 0}
              >
                <summary>{topic.title}</summary>
                <p>
                  <StudyText text={topic.explanation} />
                </p>
                <div className="command-reading-example">
                  <span className="eyebrow">READ THIS EXAMPLE</span>
                  <pre>
                    <code>{topic.example}</code>
                  </pre>
                </div>
                <dl className="command-parts">
                  {topic.parts.map((part, i) => (
                    <div key={i}>
                      <dt>
                        <code>{part.token}</code>
                      </dt>
                      <dd>
                        <StudyText text={part.meaning} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p>
                  <strong>What to expect:</strong>{" "}
                  <StudyText text={topic.expected} />
                </p>
                <div className="command-prediction">
                  <strong>Explain it yourself</strong>
                  <p>
                    <StudyText text={topic.question} />
                  </p>
                  <details>
                    <summary>Compare your explanation</summary>
                    <p>
                      <StudyText text={topic.answer} />
                    </p>
                  </details>
                </div>
              </details>
            ))}
          </section>
        );
      })}
    </>
  );
}
