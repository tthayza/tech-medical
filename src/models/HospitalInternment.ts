import { Appointment } from './Appointment'
import { Inpatient } from './Inpatient'

// Classe que representa uma internação hospitalar
export class HospitalInternment {
  beds: Inpatient[] = []
  totalOccupancy: number

  constructor(totalOccupancy: number) {
    this.totalOccupancy = totalOccupancy
  }

  admitPatient(appointment: Appointment) {
    if (this.checkAvailableBeds()) {
      const newInpatient = new Inpatient(
        new Date(),
        appointment.getPatient().name,
        appointment.getPatient().id
      )
      this.beds.push(newInpatient)
      return true
    }
    return false
  }

  checkAvailableBeds() {
    return this.beds.length < this.totalOccupancy
  }

  releaseInpatient(patientId: number) {
    let inpatientIndex: number | undefined
    for (let i = 0; i < this.beds.length; i++) {
      const inpatient = this.beds[i]
      if (inpatient.id === patientId) {
        inpatientIndex = i
        break
      }
    }
    if (inpatientIndex !== undefined) {
      this.beds.splice(inpatientIndex, 1)
      return true
    } else {
      return false
    }
  }
}
