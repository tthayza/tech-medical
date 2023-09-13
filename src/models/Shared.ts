import { Appointment } from './Appointment'

// Criação da interface usada em Paciente e Médico
export interface IAppointmentsList {
  listAppointments(): Appointment[]
  saveAppointment(appointment: Appointment): void
}
