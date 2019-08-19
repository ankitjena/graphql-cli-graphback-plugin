import * as chokidar from 'chokidar'
import * as execa from 'execa'
import { Stats } from 'fs';
import { logError, logInfo } from '../utils';
import { checkDirectory } from './common';
import { createDBResources, dropDBResources } from './db';
import { generateBackend } from './generate';

const modelsPath = `${process.cwd()}/model`

const start = async() => {
  try {
    const subprocess = execa('npm', ['run', 'start'])
    subprocess.stdout.pipe(process.stdout)
    await subprocess
  } catch({stderr, exitCode}) {
    logError(stderr)
    process.exit(exitCode)
  }
}

export const watchForChanges = async(): Promise<void> => {
  
  /**
   * watch for changes in models folder
   * ignore files starting with '.'
   */
  const watcher = chokidar.watch(modelsPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  logInfo(`Watching ${modelsPath} for changes.`)

  start()
  
  /**
   * generateBackend - regenerates schema and resolver
   * createDBResources - creates database
   */
  watcher.on('change', async(path: string, stats: Stats) => {
    await dropDBResources()
    await Promise.all([generateBackend(),createDBResources()])
    logInfo("Regenerating schema and resolvers")
    logInfo("Recreating database resources")
    start()
  })
}

export const watch = async(): Promise<void> => {
  checkDirectory()
  await watchForChanges()
}