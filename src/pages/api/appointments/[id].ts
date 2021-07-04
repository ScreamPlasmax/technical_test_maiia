import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'DELETE':
      const id = parseInt(req.query.id as string);

      const appointment = await prisma.appointment.delete({ where: { id } });
      res.status(200).json(appointment);
      break;
  }
};
