import svgPaths from "./svg-g9mhq2lq9x";

function Wrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-end justify-start p-0 relative shrink-0"
      data-name="#wrapper"
    >
      <div className="flex flex-col font-['Artifakt_Element:Regular',_sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">Team</p>
      </div>
    </div>
  );
}

function FieldLabel() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0)] left-0 top-1/2 translate-y-[-50%] w-[0.001px]"
      data-name="field-label"
    >
      <div className="flex flex-row justify-end relative size-full">
        <div className="box-border content-stretch flex gap-0.5 items-start justify-end pl-0 pr-3 py-0 relative w-[0.001px]">
          <Wrapper />
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex items-center justify-start px-1 py-px relative size-full">
          <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-nowrap">
            <p className="block leading-[20px] whitespace-pre">ACME Team A</p>
          </div>
        </div>
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

function Caret() {
  return (
    <div
      className="box-border content-stretch flex gap-2 h-full items-center justify-end pl-1 pr-0 py-0 relative shrink-0"
      data-name="#caret"
    >
      <CaretDown />
    </div>
  );
}

function Field() {
  return (
    <div className="h-10 relative shrink-0 w-full z-[2]" data-name="field">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-10 items-center justify-start pl-2 pr-3 py-2 relative w-full">
          <div className="absolute bg-[#ffffff] inset-0 rounded-tl-[4px] rounded-tr-[4px]" data-name="field-fill">
            <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(0,0,0,0.3),0px_-1px_0px_0px_inset_#000000]" />
          </div>
          <FieldLabel />
          <Input />
          <Caret />
        </div>
      </div>
    </div>
  );
}

function Select() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col isolate items-start justify-start pl-[52px] pr-0 py-0 relative shrink-0 w-[360px]"
      data-name="select"
    >
      <Field />
    </div>
  );
}

export default function TeamSelector() {
  return (
    <div
      className="box-border content-stretch flex gap-4 items-end justify-start p-0 relative size-full"
      data-name="Team selector"
    >
      <Select />
    </div>
  );
}