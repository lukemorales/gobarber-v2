import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../../repositories/AppointmentsRepository';

const routes = Router();
const appointmentsRepository = new AppointmentsRepository();

routes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

routes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const appointmentExists = appointmentsRepository.exists(parsedDate);

  if (appointmentExists) {
    return response.status(409).json({ message: 'Agendamento ja existe :(' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default routes;
