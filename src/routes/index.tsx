16:32:32.715 Running build in Washington, D.C., USA (East) – iad1
16:32:32.716 Build machine configuration: 2 cores, 8 GB
16:32:32.824 Cloning github.com/imran1001/accurate-service-landing (Branch: main, Commit: f6b1443)
16:32:33.343 Cloning completed: 519.000ms
16:32:34.013 Restored build cache from previous deployment (HypWfZeveajgUhN1YVvzTH1VQ6fR)
16:32:34.216 Running "vercel build"
16:32:34.236 Vercel CLI 54.19.0
16:32:34.977 Installing dependencies...
16:32:35.014 bun install v1.3.12 (700fc117)
16:32:35.214 
16:32:35.215 Checked 505 installs across 627 packages (no changes) [216.00ms]
16:32:35.227 Running "bun run build"
16:32:35.231 $ vite build
16:32:36.971 [info] [nitro:vercel] Using `nodejs24.x` runtime.
16:32:36.971 [info] [nitro:vercel] Using `web` entry format.
16:32:36.978 The plugin "vite-tsconfig-paths" is detected. Vite now supports tsconfig paths resolution natively via the resolve.tsconfigPaths option. You can remove the plugin and set resolve.tsconfigPaths: true in your Vite config instead.
16:32:37.025 Error: Error transforming route file /vercel/path0/src/routes/index.tsx: SyntaxError: Expected corresponding JSX closing tag for <div>. (109:10)
16:32:37.026     at file:///vercel/path0/node_modules/@tanstack/router-generator/dist/esm/generator.js:143:13
16:32:37.027     at async generate (file:///vercel/path0/node_modules/@tanstack/router-plugin/dist/esm/core/router-generator-plugin.js:39:4)
16:32:37.027     at async BasicMinimalPluginContext.configResolved (file:///vercel/path0/node_modules/@tanstack/router-plugin/dist/esm/core/router-generator-plugin.js:56:4)
16:32:37.027     at async Promise.all (index 5)
16:32:37.027     at async resolveConfig (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:34748:2)
16:32:37.027     at async createBuilder (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33650:17)
16:32:37.028     at async CAC.<anonymous> (file:///vercel/path0/node_modules/vite/dist/node/cli.js:766:19)
16:32:37.034 vite v8.0.16 building client environment for production...
16:32:37.340 
transforming...✓ 178 modules transformed.
16:32:37.341 ✗ Build failed in 305ms
16:32:37.342 error during build:
16:32:37.343 Build failed with 1 error:
16:32:37.343 
16:32:37.343 [plugin tanstack-start:route-tree-client-plugin]
16:32:37.343 Error: Crawling result not available
16:32:37.343     at LoadPluginContextImpl.handler (file:///vercel/path0/node_modules/@tanstack/start-plugin-core/dist/esm/vite/start-router-plugin/plugin.js:69:32)
16:32:37.343     at async plugin (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/bindingify-input-options-ClrST5Xx.mjs:1219:16)
16:32:37.344     at async plugin.<computed> (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/bindingify-input-options-ClrST5Xx.mjs:1625:12)
16:32:37.344     at aggregateBindingErrorsIntoJsError (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/error-BuvQYXuZ.mjs:48:18)
16:32:37.344     at unwrapBindingResult (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/error-BuvQYXuZ.mjs:18:128)
16:32:37.344     at #build (file:///vercel/path0/node_modules/vite/node_modules/rolldown/dist/shared/rolldown-build-CrPk_lZe.mjs:3246:34)
16:32:37.344     at async buildEnvironment (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33253:64)
16:32:37.344     at async Object.build (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33675:19)
16:32:37.345     at async buildStartViteEnvironments (file:///vercel/path0/node_modules/@tanstack/start-plugin-core/dist/esm/vite/planning.js:95:23)
16:32:37.345     at async Object.buildApp (file:///vercel/path0/node_modules/@tanstack/start-plugin-core/dist/esm/vite/plugin.js:113:8)
16:32:37.345     at async Object.buildApp (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33667:6)
16:32:37.345     at async CAC.<anonymous> (file:///vercel/path0/node_modules/vite/dist/node/cli.js:777:3) {
16:32:37.345   errors: [Getter/Setter]
16:32:37.345 }
16:32:37.414 error: script "build" exited with code 1
16:32:37.421 Error: Command "bun run build" exited with 1
