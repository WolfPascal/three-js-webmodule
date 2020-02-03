# Sketch

A pre-configured template project aimed to make using [Sketchbook](https://github.com/swift502/Sketchbook) more convenient.

- Utilises webpack-dev-server to serve texture and model assets.
- Imports Sketchbook via NPM to enable intellisense.
- Uses Webpack to build your final application into a convenient single bundle file.
- Supresses Webpack's recommended bundle size warnings when building.

## Getting started

1. Get latest [Node.js](https://nodejs.org/en/)
2. [Clone this repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
3. Run `npm install`
4. Run `npm run dev`
5. Go to http://localhost:8080
6. If everything went fine, you should see this:

![sky](images/sky.jpg)

- The entry point of your application is `src/index.js`. You can start by writing some code there. When the `dev` task is running, the application will recompile with every file save. You just have to refresh the browser window.
- When you're happy with your code, run `npm run build` to build your application into a single package. It will be located in `build/sketch.js`. It will be quite big, that's because it contains the entirety of cannon.js, three.js and Sketchbook.
