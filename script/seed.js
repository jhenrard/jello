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
    Board.create({name: 'test board'}),
    Board.create({name: 'test board 2'})
  ])
  console.log(`seeded ${boards.length} boards`)

  const boardAssignments = await Promise.all([
    BoardAssignment.create({userId: 1, boardId: 1, owner: false}),
    BoardAssignment.create({userId: 2, boardId: 1, owner: false}),
    BoardAssignment.create({userId: 2, boardId: 2, owner: true})
  ])
  console.log(`seeded ${boardAssignments.length} board assignments`)

  const lists = await Promise.all([
    List.create({title: 'test list', order: 1, boardId: 1}),
    List.create({title: 'test list 2', order: 2, boardId: 1}),
    List.create({title: 'this is another list', order: 3, boardId: 1}),
    List.create({title: 'lets make one more', order: 4, boardId: 1})
  ])
  await List.create({title: 'fifth list', order: 1, boardId: 2})
  console.log(`seeded ${lists.length} lists`)

  const listItems = await Promise.all([
    ListItem.create({
      title: 'item 1',
      description: 'description',
      listId: 1,
      order: 1
    }),
    ListItem.create({
      title: 'item 2',
      description: 'another description',
      listId: 1,
      order: 2
    }),
    ListItem.create({
      title: 'item 3',
      description: 'item for a second list',
      listId: 2,
      order: 1
    }),
    ListItem.create({
      title: 'item 3',
      description: 'this is the third seeded item',
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
