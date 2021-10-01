// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SteinStore = require('stein-js-client')

const store = new SteinStore(process.env.API_URL)

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await store.append('exchanges', [req.body])
  res.status(200).json({ data: response })
}

export default api
