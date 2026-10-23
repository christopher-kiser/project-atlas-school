import type { LessonStudyGuide } from "../content/study-types";

export function StudyText({ text }: { text: string }) {
  return text
    .split(/(`[^`]+`)/g)
    .map((part, index) =>
      part.startsWith("`") && part.endsWith("`") ? (
        <code key={index}>{part.slice(1, -1)}</code>
      ) : (
        part
      ),
    );
}

export function CommandExplanation({
  detail,
}: {
  detail: LessonStudyGuide["commandDetails"][number];
}) {
  return (
    <dl className="command-explanation">
      <div>
        <dt>Read each part</dt>
        <dd>
          <StudyText text={detail.breakdown} />
        </dd>
      </div>
      <div>
        <dt>Understand the result</dt>
        <dd>
          <StudyText text={detail.expected} />
        </dd>
      </div>
      <div>
        <dt>A common mistake</dt>
        <dd>
          <StudyText text={detail.pitfall} />
        </dd>
      </div>
    </dl>
  );
}

export function LessonStudyOverview({ guide }: { guide: LessonStudyGuide }) {
  return (
    <section className="panel study-overview" aria-label="Lesson study plan">
      <span className="eyebrow mint">YOUR LEARNING PLAN</span>
      <h2>Start here</h2>
      <p>
        <strong>Before you begin:</strong>{" "}
        <StudyText text={guide.startingPoint} />
      </p>
      <p>
        <StudyText text={guide.whyItMatters} />
      </p>
      <div className="study-scope-grid">
        <div>
          <h3>What you need to learn</h3>
          <p className="muted">
            Understand these ideas and use them in the practical. You may look
            up syntax; explain what your command does.
          </p>
          <ul className="study-list">
            {guide.required.map((item) => (
              <li key={item}>
                <StudyText text={item} />
              </li>
            ))}
          </ul>
        </div>
        <details className="study-optional">
          <summary>Explore if you’re curious · optional</summary>
          <p>
            These topics are useful extensions. You do not need to master them
            to finish this lesson.
          </p>
          <ul className="study-list">
            {guide.optional.map((item) => (
              <li key={item.topic}>
                <strong>{item.topic}.</strong> <StudyText text={item.reason} />
              </li>
            ))}
          </ul>
        </details>
      </div>
      <nav className="study-path" aria-label="Learning sequence">
        <span>1. Understand the ideas</span>
        <span>2. Open Tools & commands</span>
        <span>3. Follow the walkthrough</span>
        <span>4. Recall, then prove it</span>
      </nav>
    </section>
  );
}

export function LessonVocabulary({ guide }: { guide: LessonStudyGuide }) {
  return (
    <section className="panel study-vocabulary" aria-label="Lesson vocabulary">
      <h2>New words, explained</h2>
      <dl>
        {guide.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>
              <StudyText text={item.meaning} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function LessonWalkthrough({ guide }: { guide: LessonStudyGuide }) {
  return (
    <section
      className="panel study-walkthrough"
      aria-label="Guided lesson walkthrough"
    >
      <span className="eyebrow mint">FOLLOW, OBSERVE, EXPLAIN</span>
      <h2>Work through it, one step at a time</h2>
      <p>
        Use the environment named in the practical. Read each step before
        acting, predict the result, then compare it with what you observe.
      </p>
      <ol className="study-walkthrough-steps">
        {guide.walkthrough.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>
              <StudyText text={step.instruction} />
            </p>
            <p className="study-expected">
              <strong>What to look for:</strong>{" "}
              <StudyText text={step.expected} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LessonReadiness({ guide }: { guide: LessonStudyGuide }) {
  return (
    <div className="study-readiness">
      <h3>Before you close the notes</h3>
      <ul className="study-list">
        {guide.readiness.map((item) => (
          <li key={item}>
            <StudyText text={item} />
          </li>
        ))}
      </ul>
      <p className="fine">
        These are self-check questions. Your progress still comes from recall
        and practical evidence.
      </p>
    </div>
  );
}
