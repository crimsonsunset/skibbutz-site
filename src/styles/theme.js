let theme = {
  text: "#293687",
  primary: "#007bff",
  secondary: "#dd45d3",
  tertiary: "#73ccb8",
}

export const breakpoints = [500, 768, 899, 1170, 1800, 2500]
export const mediaQueries = breakpoints.map(
  (bp) => `@media (max-width: ${bp}px)`,
)

export default theme
