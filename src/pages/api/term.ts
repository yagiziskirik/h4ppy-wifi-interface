// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  // const msg = req.body.msg;
  // if (msg) {
  //   await fetch('http://localhost:3001');
  // }
  res.status(200).json({ name: 'Bambang' });
}
