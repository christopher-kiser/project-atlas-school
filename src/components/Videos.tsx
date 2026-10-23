import { useState } from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import type { VideoLesson } from "../content/videos";
import { videos, videosForLesson, lessons, sections } from "../content";
import { link } from "../lib/navigation";
function VideoCard({
  video,
  inLesson,
}: {
  video: VideoLesson;
  inLesson: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const media = video.mediaUrl?.startsWith("https://cdn.cs50.net/")
    ? video.mediaUrl
    : null;
  const related = video.lessonIds
    .map((id) => lessons.find((l) => l.id === id))
    .filter((l) => l !== undefined)
    .slice(0, 3);
  const embed =
    video.embedUrl &&
    /^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}$/.test(
      video.embedUrl,
    )
      ? video.embedUrl
      : null;
  return (
    <article className="video-card" id={video.id}>
      {(embed || media) && (
        <div className="video-frame">
          {playing ? (
            media ? (
              <video
                controls
                playsInline
                preload="metadata"
                crossOrigin="anonymous"
                src={media}
                aria-label={video.title}
                onError={() => setFailed(true)}
              >
                Your browser cannot play this recording. Use the publisher link
                below.
              </video>
            ) : (
              <iframe
                src={embed!}
                title={video.title}
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Load video: ${video.title}`}
            >
              <Play />
              <span>Load video from {video.publisher}</span>
            </button>
          )}
        </div>
      )}
      <div className="video-card-body">
        <a className="video-topic" href={link(`section/${video.section}`)}>
          {sections.find((s) => s.id === video.section)?.title}
        </a>
        <small>
          {video.publisher} · {video.durationLabel}
        </small>
        <h3>{video.title}</h3>
        <p>{video.summary}</p>
        <strong className="eyebrow">WATCH FOR</strong>
        <ul>
          {video.watchFor.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p>
          <strong>Then practice:</strong> {video.practiceAfter}
        </p>
        {video.accessNote && <p className="fine">{video.accessNote}</p>}
        {failed && (
          <p role="alert">
            This player could not load. Open the publisher’s lesson below to
            watch there.
          </p>
        )}
        <a className="button" href={video.url} target="_blank" rel="noreferrer">
          Watch on {video.publisher.split(" · ")[0]}
          <ArrowUpRight size={14} />
        </a>
        {video.transcriptUrl && (
          <a
            className="button"
            href={video.transcriptUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read the transcript
            <ArrowUpRight size={14} />
          </a>
        )}
        {!inLesson && related.length > 0 && (
          <div className="video-related">
            <strong>Use it in your learning path</strong>
            {related.map((l) => (
              <a key={l.id} href={link(`lesson/${l.id}`)}>
                {l.title}
                <ArrowRight size={13} />
              </a>
            ))}
          </div>
        )}
        <p className="fine">
          Source checked {video.checked}. Availability can change.
        </p>
      </div>
    </article>
  );
}
export function VideoLibrary({
  lessonId,
}: {
  lessonId?: string;
  section?: number;
}) {
  const [filter, setFilter] = useState("all");
  const Heading = lessonId ? "h2" : "h1";
  const relevant = lessonId ? videosForLesson(lessonId) : videos;
  const visible = relevant.filter(
    (v) => filter === "all" || v.section === Number(filter),
  );
  return (
    <section>
      <div className="page-title">
        <div>
          <div className="eyebrow">WATCH → EXPLAIN → PRACTICE</div>
          <Heading>
            {lessonId ? "Videos for this lesson." : "The Atlas video library."}
          </Heading>
          <p>
            Selected lessons from universities and official technology
            educators, paired with something to try yourself.
          </p>
        </div>
      </div>
      <div className="video-context">
        Videos belong to the credited publishers and are freely linked as
        supporting material. Watching does not mark a skill complete. Embedded
        players contact the video provider only when you load them.
      </div>
      {!lessonId && (
        <div className="video-filter">
          <label htmlFor="video-topic">Choose a topic</label>
          <select
            id="video-topic"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All topics · {videos.length} selections</option>
            {sections
              .filter((s) => videos.some((v) => v.section === s.id))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
          </select>
        </div>
      )}
      <div className="video-grid">
        {visible.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            inLesson={Boolean(lessonId)}
          />
        ))}
      </div>
      {!visible.length && (
        <p>
          No video is assigned to this lesson yet. The written lesson and
          official references are the core teaching.
        </p>
      )}
      {lessonId && (
        <a className="button" style={{ marginTop: 20 }} href={link("videos")}>
          Explore all videos
          <ArrowUpRight size={14} />
        </a>
      )}
    </section>
  );
}
