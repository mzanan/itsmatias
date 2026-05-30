import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    // Personal standard: reuse primitives, don't hand-roll button/anchor styles.
    files: ["src/**/*.tsx"],
    ignores: ["src/components/ui/**", "src/components/Styles/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXOpeningElement[name.name=/^(button|a)$/] JSXAttribute[name.name='className'] Literal[value=/rounded-full/][value=/bg-white/]",
          message:
            "Inline solid button/anchor styling — reuse <Pill variant=\"solid\"> (@/components/ui/Pill) instead of hand-written bg-white rounded-full classes.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
