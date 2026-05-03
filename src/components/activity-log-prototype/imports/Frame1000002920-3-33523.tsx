import svgPaths from "./svg-shb52f6bob";

function IconWrapper() {
  return (
    <div className="relative shrink-0 size-6" data-name="icon-wrapper">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon-wrapper">
          <g id="icon-shape">
            <path d={svgPaths.p2e602700} fill="var(--fill-0, black)" />
            <path clipRule="evenodd" d={svgPaths.p25bd4880} fill="var(--fill-0, black)" fillRule="evenodd" />
            <path d={svgPaths.p5bd8a70} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1000002935() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-start p-0 relative shrink-0">
      <IconWrapper />
      <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-nowrap">
        <p className="block leading-[1.5] whitespace-pre">{`This week : 3 projects launched, 1 archived, 2 members joined, 3 removed `}</p>
      </div>
    </div>
  );
}

function CaretDown() {
  return (
    <div className="h-4 relative shrink-0 w-[12.001px]" data-name="caret-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
        <g id="caret-down">
          <circle cx="1.0005" cy="8" fill="var(--fill-0, black)" id="fill" opacity="0" r="0.0005" />
          <path
            d={svgPaths.p1507d300}
            id="stroke"
            stroke="var(--stroke-0, black)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame1000002934() {
  return (
    <div className="box-border content-stretch flex items-center justify-between p-0 relative shrink-0 w-full">
      <Frame1000002935 />
      <CaretDown />
    </div>
  );
}

function Heading() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-start justify-start p-0 relative shrink-0 w-full"
      data-name="heading"
    >
      <div className="font-['Artifakt_Element:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-nowrap">
        <p className="block leading-[1.5] whitespace-pre">Projects</p>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-start justify-start p-0 relative shrink-0 w-full"
      data-name="copy"
    >
      <div className="basis-0 font-['Artifakt_Element:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#212121] text-[14px]">
        <p className="block leading-[1.5]">{`This week : 3 projects launched, 1 archived, 2 members joined, 3 removed. This week : 3 projects launched, 1 archived, 2 members j `}</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0)] grow min-h-px min-w-px relative shrink-0 w-full" data-name="content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-[10px] relative size-full">
          <Heading />
          <Copy />
        </div>
      </div>
    </div>
  );
}

function CardLayout() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-lg shrink-0 w-full" data-name="card-layout">
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Content />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
    </div>
  );
}

function State() {
  return <div className="absolute bottom-0 left-0 right-[-0.33px] rounded-lg top-0" data-name="state" />;
}

function Card() {
  return (
    <div
      className="basis-0 bg-[#ffffff] box-border content-stretch flex flex-col grow h-40 items-start justify-start min-h-px min-w-px p-0 relative rounded-lg shrink-0"
      data-name="card"
    >
      <CardLayout />
      <State />
    </div>
  );
}

function Heading1() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-start justify-start p-0 relative shrink-0 w-full"
      data-name="heading"
    >
      <div className="font-['Artifakt_Element:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-nowrap">
        <p className="block leading-[1.5] whitespace-pre">Members</p>
      </div>
    </div>
  );
}

function Copy1() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-start justify-start p-0 relative shrink-0 w-full"
      data-name="copy"
    >
      <div className="basis-0 font-['Artifakt_Element:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#212121] text-[14px]">
        <p className="block leading-[1.5]">{`This week : 3 projects launched, 1 archived, 2 members joined, 3 removed. This week : 3 projects launched, 1 archived, 2 members j `}</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0)] grow min-h-px min-w-px relative shrink-0 w-full" data-name="content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-[10px] relative size-full">
          <Heading1 />
          <Copy1 />
        </div>
      </div>
    </div>
  );
}

function CardLayout1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-lg shrink-0 w-full" data-name="card-layout">
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Content1 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
    </div>
  );
}

function State1() {
  return <div className="absolute bottom-0 left-0 right-[-0.33px] rounded-lg top-0" data-name="state" />;
}

function Card1() {
  return (
    <div
      className="basis-0 bg-[#ffffff] box-border content-stretch flex flex-col grow h-40 items-start justify-start min-h-px min-w-px p-0 relative rounded-lg shrink-0"
      data-name="card"
    >
      <CardLayout1 />
      <State1 />
    </div>
  );
}

function Heading2() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-start justify-start p-0 relative shrink-0 w-full"
      data-name="heading"
    >
      <div className="font-['Artifakt_Element:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-nowrap">
        <p className="block leading-[1.5] whitespace-pre">Recommendations</p>
      </div>
    </div>
  );
}

function Copy2() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-start justify-start p-0 relative shrink-0 w-full"
      data-name="copy"
    >
      <div className="basis-0 font-['Artifakt_Element:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#212121] text-[14px]">
        <p className="block leading-[1.5]">{`This week : 3 projects launched, 1 archived, 2 members joined, 3 removed. This week : 3 projects launched, 1 archived, 2 members j `}</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0)] grow min-h-px min-w-px relative shrink-0 w-full" data-name="content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-[10px] relative size-full">
          <Heading2 />
          <Copy2 />
        </div>
      </div>
    </div>
  );
}

function CardLayout2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-lg shrink-0 w-full" data-name="card-layout">
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Content2 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
    </div>
  );
}

function State2() {
  return <div className="absolute bottom-0 left-0 right-[-0.33px] rounded-lg top-0" data-name="state" />;
}

function Card2() {
  return (
    <div
      className="basis-0 bg-[#ffffff] box-border content-stretch flex flex-col grow h-40 items-start justify-start min-h-px min-w-px p-0 relative rounded-lg shrink-0"
      data-name="card"
    >
      <CardLayout2 />
      <State2 />
    </div>
  );
}

function Frame1000002933() {
  return (
    <div className="box-border content-stretch flex gap-4 items-center justify-start p-0 relative shrink-0 w-full">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

export default function Frame1000002920() {
  return (
    <div className="bg-[#ffffff] relative rounded-lg size-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start overflow-clip p-[16px] relative size-full">
          <Frame1000002934 />
          <Frame1000002933 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#5c4aff] border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_0px_2px_1px_rgba(197,50,255,0.38)]"
      />
    </div>
  );
}