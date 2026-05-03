"use client";

import React from "react";
import svgPaths from "./imports/svg-l7et0xyycy";
import FilterBar from "./imports/FilterBar";
import TeamSelector from "./imports/TeamSelector";
import IconWrapper from "./imports/IconWrapper-8-44864";
import Dashboard from "./Dashboard";

function Logo() {
  return (
    <div className="h-[29.957px] w-44 relative">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 176 30"
      >
        <g id="logo">
          <path
            d={svgPaths.p286529e0}
            fill="white"
            id="color"
          />
        </g>
      </svg>
    </div>
  );
}

function SearchField() {
  return (
    <div className="hidden md:flex h-10 w-full max-w-[360px] rounded">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border flex gap-1 h-10 items-center justify-start px-2 py-[9px] relative w-full rounded">
          <div className="absolute bg-white/12 inset-0 rounded" />
          <div className="relative shrink-0 size-6">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
            >
              <path
                d={svgPaths.p3ab7aef0}
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="flex-1 flex items-center min-w-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-white/60 placeholder:text-white/60 border-none outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationButton() {
  return (
    <button className="flex h-6 w-4 items-center justify-center">
      <div className="relative shrink-0 size-6">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
        >
          <path
            d={svgPaths.p18418c00}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.505"
          />
        </svg>
      </div>
    </button>
  );
}

function UserAvatar() {
  return (
    <button className="flex h-6 w-4 items-center justify-center">
      <div className="bg-accent overflow-hidden relative rounded-full shrink-0 size-8">
        <div className="absolute flex items-center justify-center inset-0 text-white">
          <span className="text-sm font-medium">AD</span>
        </div>
      </div>
    </button>
  );
}

function Header() {
  return (
    <div className="bg-black relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="flex items-center justify-between px-4 md:px-[68px] py-0 h-14">
          <div className="flex items-center gap-4 md:gap-0">
            <Logo />
            <div className="hidden md:block ml-8">
              <SearchField />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationButton />
            <UserAvatar />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#808080]" />
    </div>
  );
}

function NavigationItem({
  children,
  isActive = false,
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <div
      className={`flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0 transition-colors duration-150 ${isActive ? "bg-white/12" : ""}`}
    >
      <span className="text-white whitespace-nowrap">
        {children}
      </span>
      {isActive && (
        <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
      )}
    </div>
  );
}

function PrimaryNavigation({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const navItems = [
    { label: "Home", isActive: currentPage === "home", page: "home" },
    { label: "Products and Services", isActive: false, page: "products" },
    { label: "User Management", isActive: false, page: "users" },
    { label: "Billing and Orders", isActive: false, page: "billing" },
    { label: "Reporting", isActive: currentPage === "reporting", page: "reporting" },
    { label: "Support", isActive: false, page: "support" },
    { label: "Settings", isActive: false, page: "settings" },
  ];

  return (
    <div className="bg-neutral-950 relative shrink-0 w-full">
      <div className="relative size-full overflow-x-auto">
        <div className="flex items-start justify-start px-4 md:px-[68px] py-0 min-w-max">
          <div className="flex gap-8 h-10 items-center">
            <h4 className="text-white">Account</h4>
            <div className="hidden lg:flex h-10 items-center">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(item.page)}
                  className="motion-press cursor-pointer"
                >
                  <NavigationItem isActive={item.isActive}>
                    {item.label}
                  </NavigationItem>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex gap-2 items-center">
        <span className="text-muted-foreground">Reporting</span>
        <span className="text-muted-foreground">/</span>
      </div>
      <div className="flex gap-2 items-center px-0 py-0.5">
        <span className="text-foreground">Activity Log</span>
      </div>
    </div>
  );
}

function PageActions() {
  return (
    <div className="flex gap-2 items-center">
      <button className="motion-press bg-transparent border border-foreground flex gap-2.5 items-center justify-center min-w-20 px-5 py-2 rounded">
        Export
      </button>
      <button className="motion-press bg-transparent border border-foreground flex gap-2.5 items-center justify-center min-w-20 px-5 py-2 rounded">
        Learn more
        <div className="relative shrink-0 size-5">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 20 20"
          >
            <path
              d={svgPaths.p3119e9c0}
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.3"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function TypewriterText({
  text,
  delay = 0,
  speed = 20,
  bold = false,
  weight,
}: {
  text: string;
  delay?: number;
  speed?: number;
  bold?: boolean;
  weight?: number;
}) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const lastTimeRef = React.useRef<number | null>(null);
  const accumulatedRef = React.useRef(0);
  const indexRef = React.useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  // Reset animation when text or speed changes
  React.useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setHasStarted(false);
  }, [text, speed, prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      return;
    }

    let rafId: number | undefined;
    let startTimer: number | undefined;
    lastTimeRef.current = null;
    accumulatedRef.current = 0;

    const msPerChar = Math.max(1, speed);

    const step = (now: number) => {
      if (!hasStarted) return;

      const last = lastTimeRef.current ?? now;
      const delta = now - last;
      lastTimeRef.current = now;
      accumulatedRef.current += delta;

      const increments = Math.floor(accumulatedRef.current / msPerChar);
      if (increments > 0) {
        accumulatedRef.current -= increments * msPerChar;
        setCurrentIndex((idx) => {
          const next = Math.min(text.length, idx + increments);
          if (next !== idx) {
            setDisplayedText(text.slice(0, next));
          }
          return next;
        });
      }

      if (indexRef.current < text.length) {
        rafId = requestAnimationFrame(step);
      }
    };

    if (!hasStarted) {
      startTimer = window.setTimeout(() => {
        setHasStarted(true);
        lastTimeRef.current = performance.now();
        rafId = requestAnimationFrame(step);
      }, delay);
    } else if (currentIndex < text.length) {
      lastTimeRef.current = performance.now();
      rafId = requestAnimationFrame(step);
    }

    return () => {
      if (startTimer) window.clearTimeout(startTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [hasStarted, currentIndex, text, delay, speed, prefersReducedMotion]);

  const style: React.CSSProperties = {};
  if (bold) style.fontWeight = 800;
  if (typeof weight === 'number') style.fontWeight = weight;

  return (
    <span className={`relative ${bold ? 'font-extrabold' : ''}`} style={style}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse opacity-70">|</span>
      )}
    </span>
  );
}

function TypewriterCard({
  title,
  content,
  delay,
}: {
  title: string;
  content: string;
  delay: number;
}) {
  const [shown, setShown] = React.useState(false);
  const [delayCleared, setDelayCleared] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    setDelayCleared(prefersReducedMotion);
    const t = window.setTimeout(() => setShown(true), prefersReducedMotion ? 0 : 20);
    const clearDelay = prefersReducedMotion
      ? undefined
      : window.setTimeout(() => setDelayCleared(true), delay + 320);

    return () => {
      window.clearTimeout(t);
      if (clearDelay) window.clearTimeout(clearDelay);
    };
  }, [delay, prefersReducedMotion]);

  return (
    <div
      className="motion-summary-card rounded-lg p-4 bg-white border border-neutral-200 min-h-40 flex flex-col"
      data-state={shown ? "open" : "closed"}
      style={{ transitionDelay: delayCleared ? "0ms" : `${delay}ms` }}
    >
        <div className="text-neutral-900 mb-2 tracking-tight font-semibold text-lg flex-shrink-0">
          <TypewriterText text={title} delay={delay} speed={20} weight={600} />
        </div>
        <div className="text-neutral-800 leading-6 flex-1">
          <TypewriterText text={content} delay={delay + 250} speed={12} />
        </div>
    </div>
  );
}

function GeneratingActivitySummary({ onSummaryCompleted }: { onSummaryCompleted?: () => void }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [showCards, setShowCards] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Timed reveal sequence: quick reveal, then card expansion after the summary finishes typing.
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      setShowCards(true);
      setIsCollapsed(false);
      onSummaryCompleted?.();
      return;
    }

    let completionTimer: number | undefined;
    const revealTimer = window.setTimeout(() => setIsRevealed(true), 900);
    const expandTimer = window.setTimeout(() => {
      setShowCards(true);
      setIsCollapsed(false);
      
      completionTimer = window.setTimeout(() => {
        onSummaryCompleted?.();
      }, 1400);
    }, 2400);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(expandTimer);
      if (completionTimer) window.clearTimeout(completionTimer);
    };
  }, [onSummaryCompleted, prefersReducedMotion]);

  return (
    <div
      className="motion-reveal bg-[#ffffff] relative rounded-lg w-full"
      data-state={isRevealed ? "open" : "closed"}
      aria-hidden={!isRevealed}
    >
      <div className="motion-reveal__inner relative w-full">
        <div
          className={`box-border content-stretch flex flex-col items-start justify-start overflow-clip relative px-4 py-3 gap-2 ${
            isCollapsed ? 'h-auto' : 'size-full'
          }`}
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="box-border content-stretch flex items-center justify-between p-0 relative shrink-0 w-full">
              <div className="flex items-center gap-2">
                <div className="relative shrink-0 size-6">
                  <IconWrapper />
                </div>
                                            <span className="text-foreground font-semibold text-sm" style={{ fontWeight: 600 }}>Summary of this week</span>
              </div>
              <button 
              onClick={toggleCollapse}
              className="motion-press h-4 relative shrink-0 w-[12.001px] cursor-pointer hover:opacity-70 transition-opacity"
              aria-label={isCollapsed ? "Expand activity summary" : "Collapse activity summary"}
              aria-expanded={!isCollapsed}
              aria-controls="activity-summary-content"
            >
              <svg
                className={`block size-full transition-transform duration-[180ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12 16"
              >
                <g>
                  <circle
                    cx="1.0005"
                    cy="8"
                    fill="var(--fill-0, black)"
                    opacity="0"
                    r="0.0005"
                  />
                  <path
                    d="M11.001 5.5L6.001 10.5L1.001 5.5"
                    stroke="var(--stroke-0, black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </button>
            </div>
                                    <div className="relative text-foreground ml-8 max-w-full">
                          <p className="block leading-relaxed">
                            <TypewriterText
                              text="3 new projects launched including Alfa and Uniform, 1 project archived (Juliett), team composition changed with 2 new members added and 3 members removed across multiple projects, plus 2 project renames completed"
                              delay={0}
                              speed={20}
                            />
                          </p>
                        </div>
          </div>
          {showCards && (
            <div
              id="activity-summary-content"
              className="motion-reveal w-full"
              data-state={isCollapsed ? "closed" : "open"}
              aria-hidden={isCollapsed}
            >
              <div className="motion-reveal__inner w-full">
              <div
                className="grid grid-cols-3 gap-4 ml-8"
                style={{ width: 'calc(100% - 2rem)' }}
              >
                <TypewriterCard
                  key="recommendations-card"
                  title="Unusual Activity"
                                      content="Critical: Admin user Albus Dumbledore has removed 5 team members in 48 hours and assigned 3 premium licenses to personal projects. Pattern suggests policy violation. Immediate review required."
                  delay={200}
                />
                <TypewriterCard
                  key="projects-card"
                  title="Projects"
                                      content="3 new projects created, 1 archived, 1 deleted, 2 renamed. Total active projects increased by 20%."
                  delay={400}
                />
                <TypewriterCard
                  key="members-card"
                  title="Members"
                                      content="Net team growth: +2 members. 3 new additions, 2 removals, 1 reinstatement, 2 role updates completed."
                  delay={600}
                />
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#5c4aff] border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_0px_2px_1px_rgba(197,50,255,0.38)]"
      />
    </div>
  );
}

function ActivityTable({ summaryCompleted = false }: { summaryCompleted?: boolean }) {
  const [showHighlights, setShowHighlights] = React.useState(false);

  React.useEffect(() => {
    if (summaryCompleted) {
      // Delay highlighting until after summary animation completes
      const timer = setTimeout(() => {
        setShowHighlights(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [summaryCompleted]);

  const allRows = [
    {
      date: "Aug 12, 2023 at 9:02pm",
      event: "Project created",
      desc: "Albus Dumbledore created project Alfa on East Hub",
      flagged: true,
    },
    {
      date: "Aug 12, 2023 at 11:22pm",
      event: "Users added",
      desc: "Rob Horning added Tran Nguyen to project Sierra",
      flagged: false,
    },
    {
      date: "Aug 13, 2023 at 9:02am",
      event: "Users removed",
      desc: "Jackie Davis removed John Kennedy from project Alfa",
      flagged: false,
    },
    {
      date: "08/12/2023 9:02pm",
      event: "Project created",
      desc: "Albus Dumbledore created project Uniform on West Hub",
      flagged: true,
    },
    {
      date: "August 12, 2023 @ 9:02pm",
      event: "Project archived",
      desc: "Rob Horning archived project Juliett on East Hub",
      flagged: false,
    },
    {
      date: "August 11, 2023 @ 11:23pm",
      event: "User removed",
      desc: "Jackie Davis removed Ryan Potts from project Indigo",
      flagged: false,
    },
    {
      date: "August 09, 2023 @ 9:02am",
      event: "Users removed",
      desc: "Albus Dumbledore removed Jake Olafssen from project Foxtrot",
      flagged: true,
    },
    {
      date: "August 5 at 10:34am",
      event: "User added",
      desc: "Jackie Davis added Dennis Tyhacz to project Echo",
      flagged: false,
    },
    {
      date: "August 5 at 4:20pm",
      event: "Project created",
      desc: "Rob Horning created project East River on East Hub",
      flagged: false,
    },
    {
      date: "August 4 at 3:45pm",
      event: "Project renamed",
      desc: "Albus Dumbledore renamed project Golf Tango to Foxtrot",
      flagged: true,
    },
  ];

  // Sort rows: flagged activities first, then regular activities
  const rows = [...allRows].sort((a, b) => {
    if (a.flagged && !b.flagged) return -1;
    if (!a.flagged && b.flagged) return 1;
    return 0;
  });

  return (
    <div className="bg-white rounded-lg border border-[#dedede] w-full overflow-x-auto">
      <table
        className="w-full text-sm"
        style={{ fontFamily: "'Artifakt Element', sans-serif" }}
      >
        <thead
          className="bg-neutral-50 text-neutral-700"
          style={{ fontFamily: "'Artifakt Legend', sans-serif" }}
        >
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Event</th>
            <th className="px-4 py-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {rows.map((r, idx) => (
            <tr 
              key={idx} 
              className={`motion-table-row hover:bg-neutral-50/60 ${
                r.flagged && showHighlights
                  ? 'bg-amber-50/40 border-l-3 border-l-amber-400/60'
                  : ''
              }`}
            >
              <td className={`px-4 py-3 whitespace-nowrap ${
                r.flagged && showHighlights ? 'text-amber-800 font-medium' : 'text-neutral-700'
              }`}>
                {r.date}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap ${
                r.flagged && showHighlights ? 'text-amber-800 font-medium' : 'text-neutral-700'
              }`}>
                {r.event}
              </td>
              <td className={`px-4 py-3 ${
                r.flagged && showHighlights ? 'text-amber-900 font-medium' : 'text-neutral-900'
              }`}>
                {r.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PageContent() {
  const [summaryCompleted, setSummaryCompleted] = React.useState(false);

  const handleSummaryCompleted = () => {
    setSummaryCompleted(true);
  };

  return (
    <div className="flex-1 relative w-full">
      <div className="relative size-full">
        <div className="flex flex-col items-start justify-start pb-6 pt-0 px-4 md:px-[68px] relative size-full">
          <div className="flex flex-col gap-4 items-start justify-start px-0 py-6 relative w-full">
            {/* Page Heading Section */}
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <Breadcrumbs />
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start lg:items-center justify-between w-full">
                <div className="flex-1 flex gap-4 items-start justify-start min-w-0">
                  <div className="flex-1 bg-transparent flex items-start justify-start min-w-0">
                    <h3 className="text-foreground whitespace-nowrap">
                      Activity Log
                    </h3>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <PageActions />
                </div>
              </div>
            </div>
            {/* Team Selector Section */}
            <div className="flex items-start justify-start w-full">
              <TeamSelector />
            </div>
            {/* Filter Bar Section */}
            <div className="flex items-start justify-start w-full">
              <div className="w-full">
                <FilterBar />
              </div>
            </div>
            {/* Activity Summary Section */}
            <div className="flex items-start justify-start w-full">
              <div className="w-full">
                <GeneratingActivitySummary onSummaryCompleted={handleSummaryCompleted} />
              </div>
            </div>
            {/* Activity Table Section */}
            <div className="flex items-start justify-start w-full">
              <div className="w-full">
                <ActivityTable summaryCompleted={summaryCompleted} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLink({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-start px-0.5 py-0 rounded-sm shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <label className="text-[#212121] text-center whitespace-nowrap">
          {children}
        </label>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-transparent h-full relative shrink-0 w-0">
          <div className="absolute flex h-[10px] items-center justify-center left-[4.5px] top-1/2 translate-y-[-50%] w-[0px]">
            <div className="rotate-[90deg]">
              <div className="h-0 relative w-2.5">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 10 1"
                  >
                    <line
                      stroke="#212121"
                      x2="10"
                      y1="0.5"
                      y2="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="bg-[#dedede] relative shrink-0 w-full">
        <div className="overflow-hidden relative size-full">
          <div className="flex flex-col gap-1 items-start justify-start px-4 md:px-[68px] py-6 relative w-full">
            <div className="flex flex-wrap gap-1.5 items-start justify-start">
              <FooterLink>Privacy settings</FooterLink>
              <FooterLink>
                Do not sell my personal information
              </FooterLink>
              <FooterLink>Cookie preferences</FooterLink>
              <FooterLink>Report Noncompliance</FooterLink>
              <FooterLink>Terms of use</FooterLink>
              <div className="flex items-start justify-start px-0.5 py-0">
                <label className="text-[#212121] text-center whitespace-nowrap">
                  © 2021 Autodesk Inc. All rights reserved
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared layout component that wraps both pages
function SharedLayout({ 
  children, 
  currentPage, 
  onNavigate 
}: { 
  children: React.ReactNode; 
  currentPage: string; 
  onNavigate: (page: string) => void; 
}) {
  return (
    <div className="bg-[#f9f9f9] flex gap-2.5 items-start justify-start relative size-full">
      <div className="flex-1 flex flex-col h-full items-start justify-start min-h-0 overflow-hidden">
        <div className="flex flex-col w-full">
          <Header />
          <PrimaryNavigation currentPage={currentPage} onNavigate={onNavigate} />
          <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_rgba(0,0,0,0.1)]" />
        </div>
        <div className="flex-1 flex flex-col items-start justify-start min-h-0 w-full">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

function ActivityLogPage() {
  return <PageContent />;
}

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <SharedLayout currentPage={currentPage} onNavigate={handleNavigate}>
      {currentPage === "home" ? <Dashboard onNavigate={handleNavigate} /> : <ActivityLogPage />}
    </SharedLayout>
  );
}
