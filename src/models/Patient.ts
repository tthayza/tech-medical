import { Appointment } from './Appointment'
import { Diagnosis } from './Diagnosis'
import { IAppointmentsList } from './Shared'

// Classe que representa um Paciente
export class Patient implements IAppointmentsList {
  name: string
  id: number
  diagnoses: Diagnosis[] = []
  private scheduledAppointments: Appointment[] = []

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }

  listAppointments(): Appointment[] {
    return this.scheduledAppointments
  }

  saveAppointment(appointment: Appointment) {
    this.scheduledAppointments.push(appointment)
  }

  listMedicalHistory() {
    return this.scheduledAppointments.filter(
      (appointment) =>
        appointment.getDiagnosis() && appointment.getPrescription()
    )
  }
}
