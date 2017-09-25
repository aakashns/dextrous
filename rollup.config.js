import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import pkg from "./package.json";

export default [
  {
    entry: "src/index.js",
    dest: "dist/dextrous.umd.min.js",
    format: "umd",
    moduleName: "ComposableRedux",
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ["node_modules/**"]
      }),
      uglify()
    ]
  },
  {
    entry: "src/index.js",
    external: ["redux"],
    targets: [
      { dest: pkg.main, format: "cjs" },
      { dest: pkg.module, format: "es" }
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"]
      })
    ]
  }
];
