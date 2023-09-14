import { Appointment } from './Appointment'
import { Doctor, Period, Specialization } from './Doctor'
import { HospitalInternment } from './HospitalInternment'
import { Medicine } from './Medicine'
import { Patient } from './Patient'
import { Prescription } from './Prescription'

// Criação da classe principal Hospital
export class Hospital {
  nameHospital: string = 'Tech Medical'
  listedPatients: Patient[] = []
  listedDoctors: Doctor[] = []

  listSpecializations() {
    return new Set(this.listedDoctors.map((doctor) => doctor.specialization))
  }

  checkAvailableDoctors(specialization: Specialization) {
    const doctorsAvailable = this.listedDoctors.filter(
      (doctor) => doctor.specialization == specialization
    )
    return doctorsAvailable
  }

  scheduleAppointment(doctorId: number, patientId: number) {
    const chosenDoctor = this.listedDoctors.find(
      (doctor) => doctor.register === doctorId
    )
    const currentPatient = this.listedPatients.find(
      (patient) => patient.id === patientId
    )

    if (chosenDoctor && currentPatient) {
      const randomIdAppointment = Math.floor(Math.random() * 100) + 1
      const newAppointment = new Appointment(
        currentPatient,
        chosenDoctor,
        new Date(),
        randomIdAppointment
      )
      currentPatient.saveAppointment(newAppointment)
      chosenDoctor.saveAppointment(newAppointment)
      return true
    }
    return false
  }

  registerDoctor(doctor: Doctor) {
    this.listSpecializations().forEach((specialization) => {
      if (specialization !== doctor.specialization)
        this.listSpecializations().add(doctor.specialization)
    })
    this.listedDoctors.push(doctor)
  }

  listDoctors() {
    return this.listedDoctors
  }

  registerPatient(patient: Patient) {
    this.listedPatients.push(patient)
  }
}

// Aplicando uso:

const myHosp = new Hospital()
const newDoc = new Doctor(
  'T',
  Specialization.Cardiologist,
  44,
  Period.Afternoon
)
const newPat = new Patient('t', 45)
myHosp.registerDoctor(newDoc)
myHosp.registerPatient(newPat)
console.log(myHosp.listDoctors())
console.log(myHosp.listedPatients)
console.log(myHosp.checkAvailableDoctors(Specialization.Cardiologist))
console.log(myHosp.listSpecializations())
const newAppointment = myHosp.scheduleAppointment(newDoc.register, newPat.id)
console.log('new', newAppointment)
console.log(newPat.listAppointments())
console.log(newDoc.listAppointments())
console.log(newDoc.listPatients())

const newInternment = new HospitalInternment(50)
console.log(newInternment.admitPatient(newPat.listAppointments()[0]))
console.log(newInternment.checkAvailableBeds())
const inpatient = newInternment.beds[0]
console.log(inpatient)
console.log(newInternment.beds)
console.log(newInternment.totalOccupancy)
console.log(newInternment.releaseInpatient(inpatient.id))
const prescription = new Prescription(
  'tomar medicamento recomendado quando dor'
)
const medicine = new Medicine('Diclofenaco', '500mg', 'tomar de 12h em 12h')
prescription.addMedicine(medicine)
console.log(
  newDoc.updateAppointment(
    newDoc.listAppointments()[0],
    'Virose',
    'Repouso',
    prescription.description,
    prescription.medicines[0]
  )
)
