import { Component, useCallback, useEffect, useRef, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FolderGit2,
  GraduationCap,
  LayoutDashboard,
  Library,
  LockKeyhole,
  Menu,
  Milestone,
  RotateCcw,
  Search,
  Settings2,
  Terminal,
  X,
} from "lucide-react";
import { lessons } from "./content";
import {
  createInitialData,
  getReviewQueue,
  type AtlasData,
} from "./lib/learning";
import { loadData } from "./lib/storage";
import { link } from "./lib/navigation";
import {
  Career,
  Certifications,
  Curriculum,
  Dashboard,
  LessonPage,
  Migration,
  NotFound,
  Portfolio,
  PracticeHub,
  Resources,
  Review,
  Settings,
} from "./components/Pages";

const navigation = [
  { path: "dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "curriculum", label: "Learning path", icon: BookOpen },
  { path: "practice", label: "Practice lab", icon: Terminal },
  { path: "review", label: "Review queue", icon: RotateCcw },
  { path: "portfolio", label: "Portfolio studio", icon: FolderGit2 },
  { path: "certifications", label: "Certifications", icon: GraduationCap },
  { path: "career", label: "Career roadmap", icon: Milestone },
  { path: "resources", label: "Resource library", icon: Library },
];
class AppBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Atlas render failed", error.message, info.componentStack);
  }
  render() {
    return this.state.failed ? (
      <main className="boot-screen">
        <h1>Atlas could not open this view.</h1>
        <p>
          Your stored evidence has not been reset. Reload to recover the
          application.
        </p>
        <button
          className="button primary"
          onClick={() => window.location.reload()}
        >
          Reload Atlas
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
function Atlas() {
  const [data, setData] = useState<AtlasData | null>(null);
  const [storageError, setStorageError] = useState("");
  const [route, setRoute] = useState(location.hash.slice(2) || "dashboard");
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const mainRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = useCallback((message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 9000);
  }, []);
  useEffect(() => {
    let live = true;
    loadData()
      .then((d) => {
        if (live) setData(d);
      })
      .catch((e: Error) => {
        if (live) {
          setStorageError(e.message);
          setData(createInitialData());
        }
      });
    return () => {
      live = false;
    };
  }, []);
  useEffect(() => {
    const update = () => {
      setRoute(location.hash.slice(2) || "dashboard");
      setMobile(false);
      setQuery("");
      window.scrollTo(0, 0);
      requestAnimationFrame(() =>
        mainRef.current?.focus({ preventScroll: true }),
      );
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible")
        loadData()
          .then(setData)
          .catch((e: Error) => setStorageError(e.message));
    };
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);
  const onData = (next: AtlasData) => {
    setData(next);
    setStorageError("");
  };
  const parts = route.split("/");
  const active = parts[0];
  const navActive =
    active === "lesson" || active === "section"
      ? "curriculum"
      : active === "migration"
        ? "dashboard"
        : active;
  if (!data)
    return (
      <main className="boot-screen">
        <img
          src={`${import.meta.env.BASE_URL}atlas.svg`}
          alt="Atlas"
          width="48"
        />
        <h1>Opening your workspace…</h1>
        <p>Loading your local learning evidence.</p>
      </main>
    );
  const props = { data, onData, notify };
  const due = getReviewQueue(lessons, data).length;
  let page: ReactNode;
  switch (active) {
    case "dashboard":
      page = <Dashboard {...props} />;
      break;
    case "curriculum":
      page = <Curriculum {...props} />;
      break;
    case "section":
      page = <Curriculum key={route} {...props} sectionId={parts[1]} />;
      break;
    case "lesson":
      page = <LessonPage key={route} {...props} id={parts[1]} />;
      break;
    case "practice":
      page = <PracticeHub {...props} />;
      break;
    case "review":
      page = <Review {...props} />;
      break;
    case "portfolio":
      page = <Portfolio key={route} {...props} id={parts[1]} />;
      break;
    case "certifications":
      page = <Certifications {...props} />;
      break;
    case "career":
      page = <Career {...props} />;
      break;
    case "resources":
      page = <Resources />;
      break;
    case "settings":
      page = <Settings {...props} />;
      break;
    case "migration":
      page = <Migration {...props} />;
      break;
    default:
      page = <NotFound />;
  }
  const results = query.trim()
    ? lessons
        .filter((l) =>
          `${l.title} ${l.summary} ${l.commands.map((c) => c.command).join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 7)
    : [];
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo(0, 0);
          mainRef.current?.focus({ preventScroll: true });
        }}
      >
        Skip to content
      </a>
      {mobile && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        className={`sidebar ${mobile ? "open" : ""}`}
        aria-label="School navigation"
      >
        <a className="brand" href={link("dashboard")}>
          <img src={`${import.meta.env.BASE_URL}atlas.svg`} alt="" />
          <span>
            ATLAS<small>SCHOOL OF ENGINEERING</small>
          </span>
        </a>
        <div className="workspace-label">
          <span className="tiny-dot" />
          YOUR PERSONAL ACADEMY
        </div>
        <nav>
          {navigation.map((n, i) => (
            <div key={n.path}>
              {i === 4 && (
                <div className="nav-divider">
                  <span>BUILD YOUR FUTURE</span>
                </div>
              )}
              <a
                className={`nav-item ${navActive === n.path ? "active" : ""}`}
                href={link(n.path)}
                aria-current={navActive === n.path ? "page" : undefined}
              >
                <n.icon size={18} />
                <span>{n.label}</span>
                {n.path === "review" && due > 0 ? (
                  <span className="nav-count">{due}</span>
                ) : navActive === n.path ? (
                  <span className="nav-active-dot" />
                ) : null}
              </a>
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="local-card">
            <LockKeyhole size={16} />
            <div>
              <strong>Your progress stays yours.</strong>
              <p>Saved in this browser. Back it up to take it anywhere.</p>
              <a href={link("settings")}>
                Export progress
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <a
            className={`nav-item ${active === "settings" ? "active" : ""}`}
            href={link("settings")}
          >
            <Settings2 size={17} />
            Settings & backups
          </a>
          <div className="learner">
            <span className="avatar">A</span>
            <div>
              <strong>Atlas learner</strong>
              <small>Building independent capability</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="app-frame">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-menu"
              aria-label="Open navigation"
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              <Menu size={20} />
            </button>
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>
              {navigation.find((n) => n.path === navActive)?.label ??
                (active === "settings" ? "Settings & backups" : "Atlas")}
            </strong>
          </div>
          <div className="topbar-actions">
            <div className="global-search">
              <Search size={15} />
              <label className="sr-only" htmlFor="global-search">
                Search lessons
              </label>
              <input
                id="global-search"
                placeholder="Find a lesson…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setQuery("");
                }}
              />
              {query && (
                <div
                  className="search-results"
                  role="region"
                  aria-label="Lesson search results"
                >
                  {results.length ? (
                    results.map((l) => (
                      <a key={l.id} href={link(`lesson/${l.id}`)}>
                        <BookOpen size={15} />
                        <span>
                          {l.title}
                          <small>
                            {l.minutes} min · {l.summary}
                          </small>
                        </span>
                        <ArrowUpRight size={14} />
                      </a>
                    ))
                  ) : (
                    <p>No lessons found.</p>
                  )}
                </div>
              )}
            </div>
            <a
              className="icon-button backup-shortcut"
              aria-label="Export and import progress"
              href={link("settings")}
            >
              <ArrowDownToLine size={18} />
            </a>
          </div>
        </header>
        {storageError && (
          <div className="storage-error" role="alert">
            <strong>Progress storage unavailable.</strong> {storageError} You
            can read lessons; successful saves will be confirmed explicitly.
          </div>
        )}
        <main
          id="main-content"
          tabIndex={-1}
          ref={mainRef}
          key={active === "lesson" ? route : undefined}
        >
          {page}
          <footer className="site-footer">
            <span>
              ATLAS SCHOOL <span className="mint">/</span> Learn. Build. Prove.
            </span>
            <a
              href="https://github.com/christopher-kiser/project-atlas-school"
              target="_blank"
              rel="noreferrer"
            >
              Open source
              <ArrowUpRight size={13} />
            </a>
            <span>Evidence over completion.</span>
          </footer>
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <button
            className="icon-button"
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
export default function App() {
  return (
    <AppBoundary>
      <Atlas />
    </AppBoundary>
  );
}
