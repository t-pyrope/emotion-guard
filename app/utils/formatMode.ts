export function formatMode(mode: "normal" | "limited" | "protected") {
  switch (mode) {
    case "normal":
      return "normal mode";
    case "limited":
      return "reduced mode";
    case "protected":
      return "protection mode";
  }
}
