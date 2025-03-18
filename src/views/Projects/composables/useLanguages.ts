export const languageColors: { [key: string]: string } = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Go: "#00ADD8",
    Ruby: "#701516",
    PHP: "#4F5D95",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Vue: "#41b883",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Scala: "#c22d40",
    Perl: "#0298c3",
    Lua: "#000080",
    Haskell: "#5e5086",
    R: "#198CE7",
    MATLAB: "#e16737",
    Assembly: "#6E4C13",
    PowerShell: "#012456",
    CoffeeScript: "#244776",
    Dart: "#00B4AB",
    Elixir: "#6e4a7e",
    Groovy: "#e69f56",
    Julia: "#a270ba",
    "Objective-C": "#438eff",
    Clojure: "#db5855",
    Erlang: "#B83998",
    SCSS: "#c6538c",
    Sass: "#a53b70",
    Less: "#1d365d",
    Fortran: "#4d41b1",
    Pascal: "#E3F171",
    SQL: "#e38c00",
  };
  
  export function useLanguages() {
    const getLanguageColor = (language: string): string => {
      return languageColors[language] || "#858585";
    };
  
    const calculateLanguagePercentage = (bytes: number, totalBytes: number): number => {
      return Math.round((bytes / totalBytes) * 1000) / 10;
    };
  
    return {
      getLanguageColor,
      calculateLanguagePercentage,
      languageColors
    };
  }