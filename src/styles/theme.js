let theme = {
  primary: "#007bff",
}

export const breakpoints = [500, 768, 899, 1170, 1800, 2500]

export const mediaQueries = breakpoints.map(
  (bp) => `@media (max-width: ${bp}px)`,
)

export default theme
