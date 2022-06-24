import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height="1em"
    viewBox="0 0 21 21"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 3)"
    >
      <path d="m5.5.5h6c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2zm8 2.5h1c1.1045695 0 2 .8954305 2 2v5c0 1.1045695-.8954305 2-2 2h-1z" />
      <path
        d="m.5 3h1c1.1045695 0 2 .8954305 2 2v5c0 1.1045695-.8954305 2-2 2h-1z"
        transform="matrix(-1 0 0 1 4 0)"
      />
    </g>
  </svg>
)

export default SvgComponent
