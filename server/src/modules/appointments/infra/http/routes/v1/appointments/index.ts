import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const routes = Router();
routes.use(ensureAuthentication);

// routes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

routes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);
  createAppointment.setTranslateFunction(request.t);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.status(201).json(appointment);
});

export default routes;
