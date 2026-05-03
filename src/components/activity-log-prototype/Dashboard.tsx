import React from "react";

// SVG paths for the alert component
const svgPaths = {
  p25bd4880: "M11.1717 2.60519C11.4291 1.79827 12.5709 1.79827 12.8283 2.6052L14.7635 8.67241C14.8491 8.9407 15.0593 9.15092 15.3276 9.23649L21.3948 11.1717C22.2017 11.4291 22.2017 12.5709 21.3948 12.8283L15.3276 14.7635C15.0593 14.8491 14.8491 15.0593 14.7635 15.3276L12.8283 21.3948C12.5709 22.2017 11.4291 22.2017 11.1717 21.3948L9.23649 15.3276C9.15092 15.0593 8.9407 14.8491 8.67241 14.7635L2.60519 12.8283C1.79827 12.5709 1.79827 11.4291 2.6052 11.1717L8.67241 9.23649C8.9407 9.15092 9.15092 8.9407 9.23649 8.67241L11.1717 2.60519ZM10.1892 8.97629L12 3.2992L13.8108 8.97629C13.9948 9.55317 14.4468 10.0052 15.0237 10.1892L20.7008 12L15.0237 13.8108C14.4468 13.9948 13.9948 14.4468 13.8108 15.0237L12 20.7008L10.1892 15.0237C10.0052 14.4468 9.55317 13.9948 8.97629 13.8108L3.2992 12L8.97629 10.1892C9.55317 10.0052 10.0052 9.55317 10.1892 8.97629Z",
  p2e602700: "M10.0509 14.6992L13.7501 11L7.00537 13.1821L8.97629 13.8108C9.43982 13.9587 9.82283 14.2795 10.0509 14.6992Z",
  p5bd8a70: "M18.4504 2.33311C18.6822 1.88896 19.3178 1.88896 19.5496 2.33311L20.1856 3.55163C20.2443 3.66401 20.336 3.75572 20.4484 3.81438L21.6669 4.45038C22.111 4.6822 22.111 5.3178 21.6669 5.54962L20.4484 6.18562C20.336 6.24428 20.2443 6.33599 20.1856 6.44837L19.5496 7.66689C19.3178 8.11104 18.6822 8.11104 18.4504 7.66689L17.8144 6.44837C17.7557 6.33599 17.664 6.24428 17.5516 6.18562L16.3331 5.54962C15.889 5.3178 15.889 4.6822 16.3331 4.45038L17.5516 3.81438C17.664 3.75572 17.7557 3.66401 17.8144 3.55163L18.4504 2.33311Z",
  p91a3980: "M10.0503 6.66667L13.3796 10M13.3796 10L10.0503 13.3333M13.3796 10H5.83333M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z",
};

const ALERT_REVEAL_DELAY_MS = 1200;

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

function GreetingSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-[72px] items-start lg:items-center justify-between w-full">
      <div className="flex-1 flex gap-4 items-start justify-start min-w-0">
        <h1 className="text-neutral-900 text-[26px] font-['Artifakt_Legend:Extra_Bold',_sans-serif] leading-[1.2]">
          Good afternoon, Admin
        </h1>
      </div>
      <div className="flex-shrink-0">
        <button className="motion-press bg-transparent border border-neutral-300 flex gap-2 items-center justify-center px-4 py-2 rounded text-sm hover:bg-neutral-50 transition-colors">
          <span className="font-['Artifakt_Element:Semi_Bold',_sans-serif] text-base">Buy</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, subtitle, actionText, actionIcon }: {
  title: string;
  value: string;
  subtitle?: string;
  actionText: string;
  actionIcon?: React.ReactNode;
}) {
  return (
    <div className="motion-surface flex-1 min-w-0 bg-white rounded-lg border border-neutral-200 p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-neutral-900 text-sm font-['Artifakt_Element:Regular',_sans-serif] leading-[1.5]">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-neutral-900 text-[32px] font-['Artifakt_Legend:Extra_Bold',_sans-serif] leading-[1.2]">{value}</span>
            {subtitle && <span className="text-neutral-600 text-sm font-['Artifakt_Element:Regular',_sans-serif]">{subtitle}</span>}
          </div>
        </div>
        <button className="motion-press flex items-center gap-2 text-neutral-700 text-sm hover:text-neutral-900 transition-colors self-start">
          {actionIcon}
          <span className="font-['Artifakt_Element:Regular',_sans-serif]">{actionText}</span>
        </button>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  );
}

function Summary() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-neutral-900 text-xl font-['Artifakt_Legend:Extra_Bold',_sans-serif] mb-2">Summary</h2>
        <p className="text-neutral-600 text-sm font-['Artifakt_Element:Regular',_sans-serif]">
          Data is related to you and/or all teams you manage as an admin.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Seats available"
          value="46"
          subtitle="/ 50 seats"
          actionText="Manage seats"
          actionIcon={<ClockIcon />}
        />
        <SummaryCard
          title="Active users (past 30 days)"
          value="15"
          subtitle="/ 23 users"
          actionText="View usage"
          actionIcon={<ClockIcon />}
        />
        <SummaryCard
          title="Open support cases"
          value="1"
          actionText="View support cases"
          actionIcon={<ClockIcon />}
        />
      </div>
    </div>
  );
}

// Components for your custom alert design
function IconWrapper() {
  return (
    <div className="relative shrink-0 size-6" data-name="icon-wrapper">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon-wrapper">
          <g id="icon-shape">
            <path d={svgPaths.p2e602700} fill="var(--foreground)" />
            <path clipRule="evenodd" d={svgPaths.p25bd4880} fill="var(--foreground)" fillRule="evenodd" />
            <path d={svgPaths.p5bd8a70} fill="var(--foreground)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1000002935() {
  return (
    <div className="box-border content-stretch flex items-center justify-start p-0 relative shrink-0 gap-3">
      <IconWrapper />
      <div className="relative shrink-0 text-nowrap">
        <p className="block leading-[1.5] whitespace-pre text-foreground">{`We have detected an unusual activity by Albus Dumbledore, check activity log for more insights `}</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-5" data-name="🔄 icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ð icon">
          <circle cx="10" cy="10" fill="var(--foreground)" id="fill" opacity="0" r="0.833333" />
          <path
            d={svgPaths.p91a3980}
            id="stroke"
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
          />
        </g>
      </svg>
    </div>
  );
}

function LinkButton({ onActivityLogClick }: { onActivityLogClick?: () => void }) {
  return (
    <div
      className="motion-press bg-transparent box-border content-stretch flex items-start justify-start px-0 py-2 relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity gap-2"
      data-name="link-button"
      onClick={onActivityLogClick}
    >
      <Icon />
      <div className="relative shrink-0 text-nowrap">
        <p className="block leading-[20px] whitespace-pre text-foreground">Activity log</p>
      </div>
    </div>
  );
}

function Frame1000002934({ onActivityLogClick }: { onActivityLogClick?: () => void }) {
  return (
    <div className="box-border content-stretch flex items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000002935 />
      <LinkButton onActivityLogClick={onActivityLogClick} />
    </div>
  );
}

// Your beautiful custom UnusualActivityAlert component
function UnusualActivityAlert({ onActivityLogClick }: { onActivityLogClick?: () => void }) {
  return (
    <div className="bg-white relative rounded-[8px] size-full overflow-visible">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip relative rounded-[8px] size-full px-4 py-2.5 gap-4">
          <Frame1000002934 onActivityLogClick={onActivityLogClick} />
        </div>
      </div>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function Actions() {
  return (
    <div className="w-full">
      <h2 className="text-neutral-900 text-xl font-['Artifakt_Legend:Extra_Bold',_sans-serif] mb-6">Actions (1)</h2>
      <div className="motion-surface bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 rounded-full p-2 flex-shrink-0">
            <WarningIcon />
          </div>
          <div className="flex-1">
            <p className="text-yellow-700 text-xs font-['Artifakt_Element:Semi_Bold',_sans-serif] mb-2 uppercase tracking-wide">SEATS EXPIRING SOON</p>
            <p className="text-neutral-900 text-sm font-['Artifakt_Element:Regular',_sans-serif] mb-4">
              15 seats expire across 2 products in the next 90 days and can be renewed now.
            </p>
            <button className="motion-press bg-neutral-900 text-white px-4 py-2 rounded text-sm font-['Artifakt_Element:Semi_Bold',_sans-serif] hover:bg-neutral-800 transition-colors">
              View and renew
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="w-full">
      <h2 className="text-neutral-900 text-xl font-['Artifakt_Legend:Extra_Bold',_sans-serif] mb-6">Get started (1)</h2>
      
      <div className="motion-surface bg-white border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white font-['Artifakt_Legend:Extra_Bold',_sans-serif]">R</span>
          </div>
          <div className="flex-1">
            <h3 className="text-neutral-900 font-['Artifakt_Element:Semi_Bold',_sans-serif] text-lg">Revit</h3>
            <p className="text-neutral-500 text-sm font-['Artifakt_Element:Regular',_sans-serif]">Subscription ID: 234567890123456 - Last purchased on Aug 30, 2020</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-neutral-900 font-['Artifakt_Element:Semi_Bold',_sans-serif] mb-4">Install</h4>
          <div className="flex gap-3 mb-4">
            <select className="border border-neutral-300 rounded px-3 py-2 text-sm bg-white font-['Artifakt_Element:Regular',_sans-serif]">
              <option>2024</option>
            </select>
            <select className="border border-neutral-300 rounded px-3 py-2 text-sm bg-white font-['Artifakt_Element:Regular',_sans-serif]">
              <option>Win 64</option>
            </select>
            <select className="border border-neutral-300 rounded px-3 py-2 text-sm bg-white font-['Artifakt_Element:Regular',_sans-serif]">
              <option>English</option>
            </select>
          </div>
          <button className="motion-press bg-neutral-900 text-white px-6 py-2 rounded text-sm font-['Artifakt_Element:Semi_Bold',_sans-serif] hover:bg-neutral-800 transition-colors mb-3">
            Download
          </button>
          <div className="flex gap-4 text-sm">
            <button className="motion-press text-blue-600 hover:underline font-['Artifakt_Element:Regular',_sans-serif]">View product details</button>
            <span className="text-neutral-400">|</span>
            <button className="motion-press text-blue-600 hover:underline font-['Artifakt_Element:Regular',_sans-serif]">Create a custom install</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GetToKnow() {
  return (
    <div className="w-full">
      <h2 className="text-neutral-900 text-xl font-['Artifakt_Legend:Extra_Bold',_sans-serif] mb-6">Get to know your Autodesk Account</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-neutral-900 font-['Artifakt_Element:Semi_Bold',_sans-serif] mb-6">Get the most out of your subscription</h3>
          <div className="space-y-4">
            <div className="text-sm text-neutral-700 hover:text-blue-600 cursor-pointer font-['Artifakt_Element:Regular',_sans-serif]">Our commitment to technology admins</div>
            <div className="text-sm text-neutral-700 hover:text-blue-600 cursor-pointer font-['Artifakt_Element:Regular',_sans-serif]">Team Insights for admins</div>
            <div className="text-sm text-neutral-700 hover:text-blue-600 cursor-pointer font-['Artifakt_Element:Regular',_sans-serif]">Reach your business goals</div>
            <div className="text-sm text-neutral-700 hover:text-blue-600 cursor-pointer font-['Artifakt_Element:Regular',_sans-serif]">My Insights for AutoCAD and Revit</div>
            <div className="text-sm text-neutral-700 hover:text-blue-600 cursor-pointer font-['Artifakt_Element:Regular',_sans-serif]">What is Flex pay-as-you-go?</div>
          </div>
          <button className="motion-press flex items-center gap-2 text-blue-600 text-sm hover:underline mt-6 font-['Artifakt_Element:Regular',_sans-serif]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learn more
          </button>
        </div>
        
        <div>
          <h3 className="text-neutral-900 font-['Artifakt_Element:Semi_Bold',_sans-serif] mb-6">Take a quick look at the new features</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-neutral-900 font-['Artifakt_Element:Semi_Bold',_sans-serif] text-sm mb-1">Simplify User Management with Single Sign-On & Directory Sync</h4>
              <p className="text-neutral-600 text-xs font-['Artifakt_Element:Regular',_sans-serif] mb-1">Account and User Management</p>
              <p className="text-neutral-500 text-xs font-['Artifakt_Element:Regular',_sans-serif]">1 min read</p>
            </div>
            <div>
              <h4 className="text-neutral-900 font-['Artifakt_Element:Semi_Bold',_sans-serif] text-sm mb-1">Payment Management in Autodesk Account Just got Easier with Payment Center</h4>
              <p className="text-neutral-600 text-xs font-['Artifakt_Element:Regular',_sans-serif] mb-1">Account and User Management</p>
              <p className="text-neutral-500 text-xs font-['Artifakt_Element:Regular',_sans-serif]">1 min read</p>
            </div>
            <div>
              <h4 className="text-neutral-900 font-['Artifakt_Element:Semi_Bold',_sans-serif] text-sm mb-1">New Reporting Tools Are Here To Increase Visibility and Productivity</h4>
              <p className="text-neutral-600 text-xs font-['Artifakt_Element:Regular',_sans-serif] mb-1">Account and User Management</p>
              <p className="text-neutral-500 text-xs font-['Artifakt_Element:Regular',_sans-serif]">2 min read</p>
            </div>
          </div>
          <button className="motion-press flex items-center gap-2 text-blue-600 text-sm hover:underline mt-6 font-['Artifakt_Element:Regular',_sans-serif]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            See all new features
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardContent({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleActivityLogClick = () => {
    if (onNavigate) {
      onNavigate('reporting');
    }
  };

  // Slide-in alert after summary appears
  const [showAlert, setShowAlert] = React.useState(false);
  React.useEffect(() => {
    const t = window.setTimeout(
      () => setShowAlert(true),
      prefersReducedMotion ? 0 : ALERT_REVEAL_DELAY_MS,
    );
    return () => window.clearTimeout(t);
  }, [prefersReducedMotion]);

  return (
    <div className="flex-1 relative w-full">
      <div className="relative size-full">
        <div className="flex items-start justify-start px-4 md:px-[68px] py-0 relative w-full">
          <div className="flex-1 flex flex-col items-center justify-start pb-12 pt-0 px-0 relative">
            <div className="flex flex-col gap-6 items-start justify-start pb-4 pt-6 px-0 relative w-full">
              <GreetingSection />
              <Summary />
              <div
                className="motion-reveal relative w-full"
                data-state={showAlert ? "open" : "closed"}
                aria-hidden={!showAlert}
              >
                <div className="motion-reveal__inner w-full">
                  <UnusualActivityAlert onActivityLogClick={handleActivityLogClick} />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute border-[#5c4aff] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_2px_1px_rgba(197,50,255,0.38)]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-10 items-start justify-start px-0 py-6 relative w-full">
              <Actions />
              <GetStarted />
              <GetToKnow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default function Dashboard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return <DashboardContent onNavigate={onNavigate} />;
}
