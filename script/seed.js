'use strict'

const db = require('../server/db')
const {
  User,
  Board,
  List,
  ListItem,
  BoardAssignment
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  console.log(`seeded ${users.length} users`)

  const boards = await Promise.all([
    Board.create({name: 'Stackathon Project'}),
    Board.create({name: 'California Trip Plans'})
  ])
  console.log(`seeded ${boards.length} boards`)

  const boardAssignments = await Promise.all([
    BoardAssignment.create({userId: 1, boardId: 1, owner: false}),
    BoardAssignment.create({userId: 2, boardId: 1, owner: false}),
    BoardAssignment.create({userId: 2, boardId: 2, owner: true})
  ])
  console.log(`seeded ${boardAssignments.length} board assignments`)

  const lists = await Promise.all([
    List.create({title: 'Requirements', order: 1, boardId: 1}),
    List.create({title: 'Technologies', order: 2, boardId: 1}),
    List.create({title: 'Features', order: 3, boardId: 1}),
    List.create({title: 'Bugs', order: 4, boardId: 1})
  ])
  await List.create({title: 'fifth list', order: 1, boardId: 2})
  console.log(`seeded ${lists.length} lists`)

  const listItems = await Promise.all([
    ListItem.create({
      title: 'Compiles',
      description: 'The app can be compiled without any errors',
      listId: 1,
      order: 1
    }),
    ListItem.create({
      title: 'Runs',
      description:
        'A user can interact with the app. Some features may be missing, but the app is not completely broken.',
      listId: 1,
      order: 2
    }),
    ListItem.create({
      title: 'React',
      description: 'The project will use React on the front end.',
      listId: 2,
      order: 1
    }),
    ListItem.create({
      title: 'Hollywood',
      description: `Let's visit Hollywood.`,
      listId: 5,
      order: 1
    })
  ])
  console.log(`seeded ${listItems.length} list items`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
