import svgPaths from "./svg-cjd6qn500e";

export default function FilterBar() {
  return (
    <div className="bg-white relative rounded-lg w-full border border-[#dedede]">
      <div className="flex items-center justify-between px-4 py-[15px]">
        {/* Left side - Filters button and Search */}
        <div className="flex gap-4 items-center">
          {/* Filters Button */}
          <button className="bg-transparent border border-black flex gap-2.5 items-center justify-center px-5 py-2 rounded">
            <div className="relative shrink-0 size-5">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g>
                  <circle cx="10" cy="10" fill="black" opacity="0" r="0.833333" />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p3676e8f0}
                    fillRule="evenodd"
                    stroke="black"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                  />
                </g>
              </svg>
            </div>
            <span className="text-black">Filters (0)</span>
          </button>
          
          {/* Search Field */}
          <div className="flex items-center w-[324px] h-10 bg-[rgba(0,0,0,0.04)] rounded px-3 py-[9px] gap-2">
            <div className="relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path
                  d={svgPaths.p3ab7aef0}
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search…"
              className="flex-1 bg-transparent text-[rgba(0,0,0,0.6)] placeholder:text-[rgba(0,0,0,0.6)] border-none outline-none"
            />
          </div>
        </div>
        
        {/* Right side - Refresh button */}
        <div className="flex items-center">
          <button className="bg-transparent flex items-center justify-center px-5 py-2 rounded">
            <span className="text-black underline">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}