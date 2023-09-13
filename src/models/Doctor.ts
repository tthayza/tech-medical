// Criação dos enums para utilização na classe Doctor

import { Appointment } from './Appointment'
import { Diagnosis } from './Diagnosis'
import { Prescription } from './Prescription'
import { IAppointmentsList } from './Shared'

// Período seta os períodos em que um médico trabalha
export enum Period {
  Daytime = 'Daytime',
  Afternoon = 'Afternoon',
  Nocturnal = 'Nocturnal'
}

// Especialização seta as especializações contidas no Tech Medical
export enum Specialization {
  Ophthalmologist = 'Ophthalmologist',
  GeneralClinic = 'GeneralClinic',
  Dentist = 'Dentist',
  Otolaryngologist = 'Otolaryngologist',
  Endocrinologist = 'Endocrinologist',
  Cardiologist = 'Cardiologist',
  Orthopedist = 'Orthopedist'
}

// Criação da classe que representa um médico

export class Doctor implements IAppointmentsList {
  name: string
  specialization: Specialization
  register: number
  workSchedule: Period
  private scheduledAppointments: Appointment[] = []

  constructor(
    name: string,
    specialization: Specialization,
    register: number,
    workSchedule: Period
  ) {
    this.name = name
    this.specialization = specialization
    this.register = register
    this.workSchedule = workSchedule
  }

  listAppointments(): Appointment[] {
    return this.scheduledAppointments
  }

  saveAppointment(appointment: Appointment): void {
    this.scheduledAppointments.push(appointment)
  }

  listPatients() {
    const patients = this.scheduledAppointments.map(
      (appointment) => appointment.getPatient().name
    )
    return patients
  }

  updateAppointment(
    appointment: Appointment,
    diagnosisName?: string,
    treatment?: string,
    prescriptionDescription?: string,
    medicine?: Medicine
  ) {
    if (diagnosisName) {
      const newDiagnosis = treatment
        ? new Diagnosis(diagnosisName, treatment)
        : new Diagnosis(diagnosisName)

      appointment.getPatient().diagnoses.push(newDiagnosis)
      appointment.getDiagnosis().push(newDiagnosis)
    }
    if (prescriptionDescription) {
      const newPrescription = new Prescription(prescriptionDescription)
      if (medicine) newPrescription.addMedicine(medicine)
    }
  }
}
