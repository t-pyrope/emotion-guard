export function formatMode(mode: "normal" | "limited" | "protected") {
  switch (mode) {
    case "normal":
      return "normal";
    case "limited":
      return "reduced";
    case "protected":
      return "protection mode";
  }
}
