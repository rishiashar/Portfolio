import svgPaths from "./svg-l7et0xyycy";

function Logo() {
  return (
    <div
      className="absolute h-[29.957px] left-[-7px] translate-y-[-50%] w-44"
      data-name="logo"
      style={{ top: "calc(50% - 0.021px)" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176 30">
        <g id="logo">
          <path d={svgPaths.p286529e0} fill="var(--fill-0, black)" id="color" />
        </g>
      </svg>
    </div>
  );
}

function NegativeMargin1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[163px]" data-name="negative-margin">
      <Logo />
    </div>
  );
}

function LogoContainer() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-52"
      data-name="logo-container"
    >
      <NegativeMargin1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-6" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <circle cx="12" cy="12" fill="var(--fill-0, black)" id="fill" opacity="0" r="1" />
          <path
            d={svgPaths.p3ab7aef0}
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

function Input() {
  return (
    <div
      className="basis-0 box-border content-stretch flex grow h-full items-center justify-start min-h-px min-w-px overflow-clip px-0 py-px relative shrink-0"
      data-name="input"
    >
      <div className="basis-0 flex flex-col font-['Artifakt_Element:Regular',_sans-serif] grow h-full justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          {" "}
        </p>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="h-10 relative rounded shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-1 h-10 items-center justify-start px-2 py-[9px] relative w-full">
          <div className="absolute bg-[rgba(255,255,255,0.12)] inset-0 rounded" data-name="fill" />
          <Icon />
          <Input />
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[360px]"
      data-name="search"
    >
      <Field />
    </div>
  );
}

function Start() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-start p-0 relative shrink-0"
      data-name="#start"
    >
      <LogoContainer />
      <Search />
    </div>
  );
}

function ActionsNotification() {
  return (
    <div className="relative shrink-0 size-6" data-name="actions/notification">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="actions/notification">
          <circle cx="12" cy="12" fill="var(--fill-0, black)" id="fill" opacity="0" r="1" />
          <path
            d={svgPaths.p18418c00}
            id="stroke"
            stroke="var(--stroke-0, black)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.505"
          />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper2() {
  return (
    <div
      className="box-border content-stretch flex h-6 items-center justify-center p-0 relative shrink-0 w-4"
      data-name="icon-wrapper"
    >
      <ActionsNotification />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex gap-3 items-center justify-center p-0 relative shrink-0"
      data-name="content"
    >
      <IconWrapper2 />
    </div>
  );
}

function Base2() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-center overflow-clip px-4 py-2 relative rounded shrink-0"
      data-name="📐 base"
    >
      <Content2 />
    </div>
  );
}

function Outline2() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex items-start justify-center overflow-clip p-0 relative rounded shrink-0"
      data-name="outline"
    >
      <Base2 />
    </div>
  );
}

function Notifications() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="notifications"
    >
      <Outline2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="bg-[#5f60ff] overflow-clip relative rounded-[999px] shrink-0 size-8" data-name="🔄 icon">
      <div className="absolute flex flex-col font-['Artifakt_Element:Bold',_sans-serif] justify-center leading-[0] left-1/2 not-italic size-8 text-[#ffffff] text-[14px] text-center top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <p className="block leading-[18px]">AD</p>
      </div>
    </div>
  );
}

function IconWrapper3() {
  return (
    <div
      className="box-border content-stretch flex h-6 items-center justify-center p-0 relative shrink-0 w-4"
      data-name="icon-wrapper"
    >
      <Icon1 />
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex gap-3 items-center justify-center p-0 relative shrink-0"
      data-name="content"
    >
      <IconWrapper3 />
    </div>
  );
}

function Base3() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-center overflow-clip px-4 py-2 relative rounded shrink-0"
      data-name="📐 base"
    >
      <Content3 />
    </div>
  );
}

function Outline3() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-center overflow-clip p-0 relative rounded shrink-0"
      data-name="outline"
    >
      <Base3 />
    </div>
  );
}

function Login() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="login"
    >
      <Outline3 />
    </div>
  );
}

function End() {
  return (
    <div
      className="absolute box-border content-stretch flex h-8 items-center justify-end p-0 right-[-12px] top-1/2 translate-y-[-50%]"
      data-name="#end"
    >
      <Notifications />
      <Login />
    </div>
  );
}

function NegativeMargin2() {
  return (
    <div className="h-8 relative shrink-0 w-[301px]" data-name="#negative-margin">
      <End />
    </div>
  );
}

function Base4() {
  return (
    <div
      className="basis-0 bg-[rgba(0,0,0,0)] box-border content-stretch flex grow h-14 items-center justify-between min-h-px min-w-px p-0 relative shrink-0"
      data-name="#base"
    >
      <Start />
      <NegativeMargin2 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#000000] relative shrink-0 w-full" data-name="⚙️ header">
      <div className="relative size-full">
        <div className="box-border content-stretch flex items-start justify-start px-[68px] py-0 relative w-full">
          <Base4 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_#808080]" />
    </div>
  );
}

function Typography() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-start justify-start p-0 relative shrink-0"
      data-name="typography"
    >
      <div className="font-['Artifakt_Element:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[18px] text-nowrap">
        <p className="block leading-[1.25] whitespace-pre">Account</p>
      </div>
    </div>
  );
}

function Alignment() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pb-[3px] pt-0 px-0 relative shrink-0"
      data-name="#alignment"
    >
      <Typography />
    </div>
  );
}

function Item01() {
  return (
    <div
      className="box-border content-stretch flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0"
      data-name="item-01"
    >
      <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="block leading-[18px] whitespace-pre">Home</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
    </div>
  );
}

function Item2() {
  return (
    <div
      className="box-border content-stretch flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0"
      data-name="item-01"
    >
      <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="block leading-[18px] whitespace-pre">Products and Services</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
    </div>
  );
}

function Item3() {
  return (
    <div
      className="box-border content-stretch flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0"
      data-name="item-01"
    >
      <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="block leading-[18px] whitespace-pre">User Management</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
    </div>
  );
}

function Item4() {
  return (
    <div
      className="box-border content-stretch flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0"
      data-name="item-01"
    >
      <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="block leading-[18px] whitespace-pre">Billing and Orders</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
    </div>
  );
}

function Item5() {
  return (
    <div
      className="box-border content-stretch flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0"
      data-name="item-01"
    >
      <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="block leading-[18px] whitespace-pre">Reporting</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
    </div>
  );
}

function Item6() {
  return (
    <div
      className="box-border content-stretch flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0"
      data-name="item-01"
    >
      <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="block leading-[18px] whitespace-pre">Support</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
    </div>
  );
}

function Item7() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.12)] box-border content-stretch flex h-full items-center justify-center pb-3 pt-2.5 px-4 relative shrink-0"
      data-name="item-01"
    >
      <div className="flex flex-col font-['Artifakt_Element:Semi_Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap">
        <p className="block leading-[18px] whitespace-pre">Settings</p>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_2px_0px_0px_inset_#ffffff]" />
    </div>
  );
}

function Navigation() {
  return (
    <div
      className="absolute box-border content-stretch flex h-10 items-center justify-start left-[-16px] p-0 top-0"
      data-name="navigation"
    >
      <Item01 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
      <Item6 />
      <Item7 />
    </div>
  );
}

function NegativeMargin3() {
  return (
    <div className="h-full relative shrink-0 w-[1024px]" data-name="#negative-margin">
      <Navigation />
    </div>
  );
}

function Start1() {
  return (
    <div
      className="box-border content-stretch flex gap-8 h-full items-center justify-start p-0 relative shrink-0 w-[1127px]"
      data-name="#start"
    >
      <Alignment />
      <NegativeMargin3 />
    </div>
  );
}

function Base5() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex h-10 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="#base"
    >
      <Start1 />
    </div>
  );
}

function PrimaryNavigation() {
  return (
    <div className="bg-neutral-950 relative shrink-0 w-full" data-name="⚙️ primary-navigation">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[68px] py-0 relative w-full">
          <Base5 />
        </div>
      </div>
    </div>
  );
}

function AccountHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-[1440px]"
      data-name="account-header"
    >
      <Header />
      <PrimaryNavigation />
      <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Breadcrumb01() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] box-border content-stretch flex flex-col h-6 items-start justify-center p-0 relative rounded-sm shrink-0"
      data-name="breadcrumb-01"
    >
      <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#666666] text-[14px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Reporting</p>
      </div>
    </div>
  );
}

function Breadcrumb2() {
  return (
    <div
      className="box-border content-stretch flex gap-2 items-start justify-start p-0 relative shrink-0"
      data-name="breadcrumb-01"
    >
      <Breadcrumb01 />
      <div className="flex flex-col font-['Artifakt_Element:Regular',_sans-serif] h-6 justify-center leading-[0] not-italic relative shrink-0 text-[#666666] text-[14px] text-center w-1.5">
        <p className="block leading-[20px]">/</p>
      </div>
    </div>
  );
}

function CurrentPage() {
  return (
    <div
      className="box-border content-stretch flex gap-2 items-center justify-start px-0 py-0.5 relative shrink-0"
      data-name="current-page"
    >
      <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Activity Log</p>
      </div>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div
      className="box-border content-center flex flex-wrap gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="breadcrumbs"
    >
      <Breadcrumb2 />
      <CurrentPage />
    </div>
  );
}

function Breadcrumbs1() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start p-0 relative shrink-0"
      data-name="Breadcrumbs"
    >
      <Breadcrumbs />
    </div>
  );
}

function PageHeader() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] box-border content-stretch flex grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Page header"
    >
      <div className="font-['Artifakt_Legend:Extra_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-nowrap">
        <p className="block leading-[1.2] whitespace-pre">Activity Log</p>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div
      className="basis-0 box-border content-stretch flex gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <PageHeader />
    </div>
  );
}

function VerticalAlignment1() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pb-[2.5px] pt-[1.5px] px-0 relative shrink-0"
      data-name="#vertical-alignment"
    >
      <div className="font-['Artifakt_Element:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Export</p>
      </div>
    </div>
  );
}

function ButtonOutlined1() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-2.5 items-start justify-center min-w-20 px-5 py-2 relative rounded shrink-0"
      data-name="button-outlined"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#000000] border-solid inset-0 pointer-events-none rounded"
      />
      <VerticalAlignment1 />
    </div>
  );
}

function VerticalAlignment2() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pb-[2.5px] pt-[1.5px] px-0 relative shrink-0"
      data-name="#vertical-alignment"
    >
      <div className="font-['Artifakt_Element:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">Learn more</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-5" data-name="🔄 icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ð icon">
          <circle cx="10" cy="10" fill="var(--fill-0, black)" id="fill" opacity="0" r="0.833333" />
          <path
            d={svgPaths.p3119e9c0}
            id="stroke"
            stroke="var(--stroke-0, black)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
          />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper5() {
  return (
    <div
      className="box-border content-stretch flex h-6 items-center justify-center p-0 relative shrink-0 w-3.5"
      data-name="icon-wrapper"
    >
      <Icon4 />
    </div>
  );
}

function ButtonOutlined2() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-2.5 items-start justify-center min-w-20 px-5 py-2 relative rounded shrink-0"
      data-name="button-outlined"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#000000] border-solid inset-0 pointer-events-none rounded"
      />
      <VerticalAlignment2 />
      <IconWrapper5 />
    </div>
  );
}

function PageActions() {
  return (
    <div
      className="box-border content-stretch flex gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Page actions"
    >
      <ButtonOutlined1 />
      <ButtonOutlined2 />
    </div>
  );
}

function PageLabelAndButtons() {
  return (
    <div
      className="box-border content-start flex flex-wrap gap-16 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Page label and buttons"
    >
      <Title />
      <PageActions />
    </div>
  );
}

function PageHeadingSection() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Page Heading Section"
    >
      <Breadcrumbs1 />
      <PageLabelAndButtons />
    </div>
  );
}

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

function Input1() {
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

function Field1() {
  return (
    <div className="h-10 relative shrink-0 w-full z-[2]" data-name="field">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-10 items-center justify-start pl-2 pr-3 py-2 relative w-full">
          <div className="absolute bg-[#ffffff] inset-0 rounded-tl-[4px] rounded-tr-[4px]" data-name="field-fill">
            <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(0,0,0,0.3),0px_-1px_0px_0px_inset_#000000]" />
          </div>
          <FieldLabel />
          <Input1 />
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
      <Field1 />
    </div>
  );
}

function TeamSelector() {
  return (
    <div
      className="box-border content-stretch flex gap-4 items-end justify-start p-0 relative shrink-0"
      data-name="Team selector"
    >
      <Select />
    </div>
  );
}

function PageDescriptionAndTeamSelector() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow h-full items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Page description and Team selector"
    >
      <TeamSelector />
    </div>
  );
}

function PageDescriptionTeamSelectorDateRange() {
  return (
    <div
      className="box-border content-stretch flex items-end justify-between p-0 relative shrink-0 w-full"
      data-name="Page description, Team selector, Date range"
    >
      <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
        <PageDescriptionAndTeamSelector />
      </div>
    </div>
  );
}

function PageHeader1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start px-0 py-6 relative shrink-0 w-full"
      data-name="Page header"
    >
      <PageHeadingSection />
      <PageDescriptionTeamSelectorDateRange />
    </div>
  );
}

function Page() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="PAGE">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start pb-6 pt-0 px-[72px] relative size-full">
          <PageHeader1 />
        </div>
      </div>
    </div>
  );
}

function Base6() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-center justify-start p-0 relative"
      data-name="#base"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative text-[#212121] text-[12px] text-center text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">{`Privacy settings `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLinkDivider() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-full relative shrink-0 w-0"
      data-name="_footer_legal-footer_link-divider"
    >
      <div className="absolute flex h-[10px] items-center justify-center left-[4.5px] top-1/2 translate-y-[-50%] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-2.5" data-name="divider">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                <line id="divider" stroke="var(--stroke-0, #212121)" x2="10" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLink() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-start px-0.5 py-0 relative rounded-sm shrink-0"
      data-name="_footer_legal-footer_link"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Base6 />
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <FooterLegalFooterLinkDivider />
      </div>
    </div>
  );
}

function Base7() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-center justify-start p-0 relative"
      data-name="#base"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative text-[#212121] text-[12px] text-center text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">Do not sell my personal information</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLinkDivider1() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-full relative shrink-0 w-0"
      data-name="_footer_legal-footer_link-divider"
    >
      <div className="absolute flex h-[10px] items-center justify-center left-[4.5px] top-1/2 translate-y-[-50%] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-2.5" data-name="divider">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                <line id="divider" stroke="var(--stroke-0, #212121)" x2="10" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLink1() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-start px-0.5 py-0 relative rounded-sm shrink-0"
      data-name="_footer_legal-footer_link"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Base7 />
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <FooterLegalFooterLinkDivider1 />
      </div>
    </div>
  );
}

function Base8() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-center justify-start p-0 relative"
      data-name="#base"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative text-[#212121] text-[12px] text-center text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">Cookie preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLinkDivider2() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-full relative shrink-0 w-0"
      data-name="_footer_legal-footer_link-divider"
    >
      <div className="absolute flex h-[10px] items-center justify-center left-[4.5px] top-1/2 translate-y-[-50%] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-2.5" data-name="divider">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                <line id="divider" stroke="var(--stroke-0, #212121)" x2="10" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLink2() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-start px-0.5 py-0 relative rounded-sm shrink-0"
      data-name="_footer_legal-footer_link"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Base8 />
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <FooterLegalFooterLinkDivider2 />
      </div>
    </div>
  );
}

function Base9() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-center justify-start p-0 relative"
      data-name="#base"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative text-[#212121] text-[12px] text-center text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">Report Noncompliance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLinkDivider3() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-full relative shrink-0 w-0"
      data-name="_footer_legal-footer_link-divider"
    >
      <div className="absolute flex h-[10px] items-center justify-center left-[4.5px] top-1/2 translate-y-[-50%] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-2.5" data-name="divider">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                <line id="divider" stroke="var(--stroke-0, #212121)" x2="10" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLink3() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-start px-0.5 py-0 relative rounded-sm shrink-0"
      data-name="_footer_legal-footer_link"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Base9 />
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <FooterLegalFooterLinkDivider3 />
      </div>
    </div>
  );
}

function Base10() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-center justify-start p-0 relative"
      data-name="#base"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative text-[#212121] text-[12px] text-center text-nowrap">
            <p className="block leading-[1.5] whitespace-pre">Terms of use</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLinkDivider4() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-full relative shrink-0 w-0"
      data-name="_footer_legal-footer_link-divider"
    >
      <div className="absolute flex h-[10px] items-center justify-center left-[4.5px] top-1/2 translate-y-[-50%] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-2.5" data-name="divider">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                <line id="divider" stroke="var(--stroke-0, #212121)" x2="10" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLegalFooterLink4() {
  return (
    <div
      className="box-border content-stretch flex items-center justify-start px-0.5 py-0 relative rounded-sm shrink-0"
      data-name="_footer_legal-footer_link"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Base10 />
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <FooterLegalFooterLinkDivider4 />
      </div>
    </div>
  );
}

function Copyright() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start px-0.5 py-0 relative shrink-0"
      data-name="#copyright"
    >
      <div className="font-['Artifakt_Element:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#212121] text-[12px] text-center text-nowrap">
        <p className="block leading-[1.5] whitespace-pre">© 2021 Autodesk Inc. All rights reserved</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div
      className="box-border content-stretch flex gap-1.5 items-start justify-start p-0 relative shrink-0"
      data-name="row-1"
    >
      <FooterLegalFooterLink />
      <FooterLegalFooterLink1 />
      <FooterLegalFooterLink2 />
      <FooterLegalFooterLink3 />
      <FooterLegalFooterLink4 />
      <Copyright />
    </div>
  );
}

function FooterLegalFooter() {
  return (
    <div className="bg-[#dedede] relative shrink-0 w-full" data-name="_footer_legal-footer">
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start px-[72px] py-6 relative w-full">
          <Row1 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="footer"
    >
      <FooterLegalFooter />
    </div>
  );
}

function Scrollable() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full"
      data-name="Scrollable"
    >
      <Page />
      <Footer />
    </div>
  );
}

function Frame1000002910() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0">
      <AccountHeader />
      <Scrollable />
    </div>
  );
}

export default function ExistingLayoutNewButton() {
  return (
    <div
      className="bg-[#f9f9f9] box-border content-stretch flex gap-2.5 items-start justify-start p-0 relative size-full"
      data-name="Existing layout - new button"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
      />
      <Frame1000002910 />
    </div>
  );
}