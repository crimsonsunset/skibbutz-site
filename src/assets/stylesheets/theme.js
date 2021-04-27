let theme = {
  primary: "#007bff",
}

export const breakpoints = [500, 768, 899, 1170, 2500, 3000]
export const mediaQueries = breakpoints.map(
  (bp) => `@media (max-width: ${bp}px)`,
)

export default theme
