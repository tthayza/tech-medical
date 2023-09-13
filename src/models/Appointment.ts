// Classe que representa uma consulta médica, inicializando seus atributos e tornando opcional os atributos
// de diagnóstico e prescrição médica pensando que possa ser a primeira consulta do paciente
// no Tech Medical.
import { Diagnosis } from './Diagnosis'
import { Doctor } from './Doctor'
import { Patient } from './Patient'
import { Prescription } from './Prescription'

export class Appointment {
  private id: number
  private patient: Patient
  private doctor: Doctor
  date: Date
  private diagnoses: Diagnosis[] = []
  private prescription: Prescription[] = []

  constructor(patient: Patient, doctor: Doctor, date: Date, id: number) {
    this.patient = patient
    this.doctor = doctor
    this.date = date
    this.id = id
  }

  getId() {
    return this.id
  }

  setPatient(patient: Patient) {
    this.patient = patient
  }

  getPatient() {
    return this.patient
  }

  getDoctor() {
    return this.doctor
  }

  getDiagnosis() {
    return this.diagnoses
  }

  getPrescription() {
    return this.prescription
  }
}
