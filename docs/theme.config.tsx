import React from "react";
import { type DocsThemeConfig, Link } from "nextra-theme-docs";

const logo = (
  <div className="flex items-center space-x-2">
    <img src="/logo.png" width={40} />
    <div className="flex flex-row gap-1">
      <span className=" text-base font-bold">Daytistics</span>
      <span className="text-base font-ibmmono text-emerald-500 uppercase">
        Docs
      </span>
    </div>
  </div>
);

const footer = (
  <div>
    <div>
      &copy; {new Date().getFullYear()} Daytistics. All rights reserved.
    </div>
    <div>
      <b>Responsible Person:</b> <Link href="https://lgll.dev">Leo Gall</Link>,
      Föhrenweg 21, 86926 Greifenberg, Germany
    </div>
  </div>
);

const config: DocsThemeConfig = {
  color: {
    hue: 155,
    saturation: 68,
    lightness: {
      dark: 42,
      light: 42,
    },
  },
  logo: logo,

  project: {
    link: "https://github.com/daytistics/daytistics",
  },
  docsRepositoryBase: "https://github.com/daytistics/daytistics/tree/main/docs",
  search: {
    placeholder: "Search...",
  },
  toc: {
    backToTop: <span>Back to top</span>,
  },
  feedback: {
    useLink: () => "https://github.com/orgs/daytistics/discussions",
  },
  footer: {
    content: footer,
  },
};

export default config;
