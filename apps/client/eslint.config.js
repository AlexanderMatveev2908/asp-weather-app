import path from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  {
    files: ['**/*.ts'],
    ignores: ['vite.config.ts', 'vitest.config.ts', 'tailwind.config.ts', 'playwright.config.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          // ? every client app ts_config file
          path.join(__dirname, 'tsconfig.app.json'),
          path.join(__dirname, 'tsconfig.spec.json'),
          path.join(__dirname, 'tsconfig.e2e.json'),
        ],
        tsconfigRootDir: __dirname,
      },
    },
    extends: [
      // ? base js lint
      eslint.configs.recommended,
      // ? ts specific lint
      ...tseslint.configs.recommended,
      // ? format level lint
      ...tseslint.configs.stylistic,
      // ? framework specific lint
      ...angular.configs.tsRecommended,
    ],
    // ? handler html templates syntax
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      // ? not empty life cycle methods like ngOnInit
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      // ? implement first interface before call like implement OnInit
      '@angular-eslint/use-lifecycle-interface': 'error',
      // ? more specific pre signals but still useful for non signal components
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      // ? avoid ngModule
      '@angular-eslint/prefer-standalone': 'warn',
      // ? no alias for props
      '@angular-eslint/no-input-rename': 'error',
      // ? avoid conflicts DOM events
      '@angular-eslint/no-output-native': 'error',
      // ? implement first PipeTransform before build custom pipes
      '@angular-eslint/use-pipe-transform-interface': 'error',

      // ? prefer interfaces
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      // ? define all return types except inline expressions
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      // ? avoid any when possible
      '@typescript-eslint/no-explicit-any': 'warn',
      // ? do not ignore promises
      '@typescript-eslint/no-floating-promises': 'error',
      // ? allow redeclare typed even inferred
      '@typescript-eslint/no-inferrable-types': 'off',
      // ? do not pass promises where not handled properly
      '@typescript-eslint/no-misused-promises': 'error',
      // ? skip force assertion
      // '@typescript-eslint/no-non-null-assertion': 'warn',
      // ? avoid when type already set properly
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      // ? unused vars
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // ? KISS
      '@typescript-eslint/prefer-for-of': 'warn',
      // ? declare where possible readonly
      '@typescript-eslint/prefer-readonly': 'warn',
      // ? handle all cases possibles
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/typedef': [
        'error',
        {
          arrayDestructuring: false,
          arrowParameter: true,
          memberVariableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
        },
      ],

      // ? no loggers
      // 'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      // ? no empty blocks of code
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-duplicate-imports': 'error',
      // ? ue let or const instead
      'no-var': 'error',
      // ? where possible use const
      'prefer-const': 'error',
      // ? prefer `` over + "...a"
      // 'prefer-template': 'warn',
      // ? use === instead of ==
      eqeqeq: ['error', 'always'],
      // curly: ['error', 'all'],
      // ? expressions depth
      'max-depth': ['warn', 3],
      // ? file length
      'max-lines': ['error', { max: 200, skipComments: true }],
      // ? arg numbers
      'max-params': ['warn', 4],
      // ? unexplained numbers
      'no-magic-numbers': [
        'warn',
        { ignore: [0, 1, -1], ignoreArrayIndexes: true, enforceConst: true },
      ],
      // ? expressions call in 1 function
      complexity: ['warn', 10],
      // ? always return or never
      'consistent-return': 'error',
      // ? KISS
      'object-shorthand': ['error', 'always'],
      // ? KISS
      'arrow-body-style': ['error', 'as-needed'],

      // ? automatically added by prettier by default
      semi: ['error', 'always'],
    },
  },

  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      // ? avoid !(isLoggedIn$ | async)
      '@angular-eslint/template/no-negated-async': 'error',
      // ? kiss for 2 ways input output [()]
      '@angular-eslint/template/banana-in-box': 'error',
      // ? use ===  not ==
      '@angular-eslint/template/eqeqeq': 'error',
      // '@angular-eslint/template/no-any': 'error',
      // ? multi events
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      // ? add alt txt
      '@angular-eslint/template/alt-text': 'warn',
      // ? no autofocus
      '@angular-eslint/template/no-autofocus': 'warn',
      // ? do not change natural tab flow
      '@angular-eslint/template/no-positive-tabindex': 'warn',
    },
  }
);
