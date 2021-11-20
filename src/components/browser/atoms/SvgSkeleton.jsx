import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={760}
    viewBox="0 0 700 460"
    backgroundColor="#ff0000"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="60" rx="2" ry="2" width="400" height="700" />
  </ContentLoader>
)

export default MyLoader