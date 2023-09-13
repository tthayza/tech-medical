import { Patient } from './Patient'

//Classe que representa um paciente internado
export class Inpatient extends Patient {
  admissionDate: Date
  private medicalReport: string[] = []

  constructor(admissonDate: Date, name: string, id: number) {
    super(name, id)
    this.name = name
    this.id = id
    this.admissionDate = admissonDate
  }

  setMedicalReport(observation: string) {
    this.medicalReport.push(observation)
  }

  getMedicalReport() {
    this.medicalReport.forEach((item) => item.toString())
  }
}
