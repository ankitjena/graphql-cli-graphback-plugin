import { createDB } from '../helpers/db'

export const command = 'backend db'

export const desc = 'Create database resources'

export const builder = {}

export async function handler() {
  await createDB()
}