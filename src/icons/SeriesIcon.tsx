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
      transform="translate(3 4)"
    >
      <path d="m2.49999919.50000565h10.00000001c1.1045695 0 2 .8954305 2 2v8.00000005c0 1.1045695-.8954305 2-2 2h-10.00000001c-1.1045695 0-2-.8954305-2-2v-8.00000005c0-1.1045695.8954305-2 2-2z" />
      <path d="m3.5.5v12" />
      <path d="m11.5.5v12" />
      <path d="m11.5 3.5h3" />
      <path d="m11.5 9.5h3" />
      <path d="m.5 3.5h3" />
      <path d="m.5 6.5h14" />
      <path d="m.5 9.5h3" />
    </g>
  </svg>
)

export default SvgComponent
