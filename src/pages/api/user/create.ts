import * as argon2 from 'argon2'

import prisma from '../../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export type UserCreateRequest = {
  username: string
  email: string
  password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<void>): Promise<void> {
  switch (req.method) {
    case 'POST':
      console.log(req.body)
      const { username, password, email } = req.body as UserCreateRequest
      const hashedPassword = await argon2.hash(password)
      const user = await prisma.user.create({
        data: {
          email,
          name: '?',
          password: hashedPassword,
          username,
        },
      })
      res.status(200).json(user)
      break
    default:
      res.status(400)
      break
  }
}
