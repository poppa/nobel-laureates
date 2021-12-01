import 'reflect-metadata'
import assert from 'assert'
import axios from 'axios'
import fs from 'fs'
import { parseSync } from 'yargs'
import { dirname, resolve } from 'path'
import { format } from 'util'
import { createConnection } from 'typeorm'
import { Laureate, Prize, RawLaureate } from './types'
import * as Db from './entities'

const args = parseSync()

const api = 'https://api.nobelprize.org/v1/laureate.json'
const apiCache = resolve('cache/laureate.json')

const write = (...args: unknown[]) => process.stdout.write(format(...args))
const werror = (...args: unknown[]) => process.stderr.write(format(...args))

async function main() {
  if (args.fetch || !fs.existsSync(apiCache)) {
    await fetchApi()
  }

  const data = await parseApi()
  const dbc = await connectDb()
  const affiliations = dbc.getRepository(Db.Affiliation)
  const prizes = dbc.getRepository(Db.Prize)
  const laureates = dbc.getRepository(Db.Laureate)

  let iters = 0
  let maxIters = 5

  for (const laureate of data) {
    let la = await laureates.findOne({ id: laureate.id })

    if (!la) {
      la = laureates.create(laureate)
      await laureates.insert(la)
    }

    for (const prize of laureate.prizes) {
      let pr = prizes.create(prize)

      if (!pr.laureate) {
        pr.laureate = la
      }

      const tmp: Partial<Db.Prize> = { ...pr }
      delete tmp.affiliations
      delete tmp.id

      const prExists = await prizes.findOne(tmp)

      if (!prExists) {
        const res = await prizes.insert(pr)
        pr.id = res.raw
      }

      if (pr.affiliations) {
        const affes: Db.Affiliation[] = []

        for (const a of pr.affiliations) {
          let tmp: Partial<Db.Affiliation> = { ...a }
          delete tmp.id
          let hasAffe = await affiliations.findOne(tmp)

          if (!hasAffe) {
            const madeAffe = await affiliations.insert(a)
            // @ts-expect-error
            hasAffe = { id: madeAffe.raw, ...a }
            affes.push(hasAffe)
          }
        }

        pr.affiliations = affes
      } else {
        pr.affiliations = []
      }

      if (pr.affiliations.length) {
        prizes.save(pr)
      }
    }

    // if (++iters >= maxIters) {
    //   break
    // }
  }
}

async function connectDb() {
  return createConnection()
}

async function parseApi() {
  if (!fs.existsSync(apiCache)) {
    werror(`No API data available`)
    process.exit(1)
  }

  return (
    JSON.parse(fs.readFileSync(apiCache).toString()) as RawLaureate[]
  ).map((laureate): Laureate => {
    laureate.id = Number(laureate.id)
    console.log(`Verify laureate %O`, laureate.id)

    assert(laureate.firstname, 'firstname')
    assert(laureate.prizes, 'prizes')
    assert(['male', 'female', 'org'].includes(laureate.gender), 'gender')

    if (laureate.died === '0000-00-00') {
      laureate.died = undefined
    }

    laureate.prizes = laureate.prizes.map((prize): Prize => {
      prize.share = Number(prize.share)
      prize.year = Number(prize.year)

      assert(prize.share > 0)
      assert(prize.year > 1900)
      assert(prize.category)
      assert(prize.motivation)

      if (
        !prize.affiliations?.length ||
        (prize.affiliations.length && Array.isArray(prize.affiliations[0]))
      ) {
        prize.affiliations = undefined
      } else {
        prize.affiliations.map((a) => assert(a.name))
      }

      return prize as Prize
    })

    return laureate as Laureate
  })
}

async function fetchApi() {
  write(`Fetching API...`)

  const res = await axios.get(api)
  const dir = dirname(apiCache)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(apiCache, JSON.stringify(res.data.laureates, null, 2))

  write(`OK!\n`)
}

main()
