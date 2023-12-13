import { Doctor, Period, Specialization } from './models/Doctor'
import { Hospital } from './models/Hospital'
import { Patient } from './models/Patient'

const myHosp = new Hospital()
const backHomeBtn = document.querySelector('#back-home-btn') as HTMLElement
const appointmentSelect = document.querySelector(
  '#select-specialization'
) as HTMLSelectElement
const registerForm = document.querySelector('#register-form') as HTMLFormElement
const isDoctor = document.querySelector('#isDoctor') as HTMLInputElement
const doctorForm = document.querySelector('#doctor-register') as HTMLFormElement
const patientForm = document.querySelector(
  '#patient-register'
) as HTMLFormElement

const registerSpecialization = document.querySelector(
  '#register-specialization'
)
const registerPeriod = document.querySelector('#register-period')
const btnCheckDoctors = document.querySelector('#btn-check-doctors')
const appointmentItem = document.querySelector(
  '#schedule-appointment'
) as HTMLDivElement
const monitorDiagnosis = document.querySelector(
  '#monitor-diagnosis'
) as HTMLDivElement

let patientId = document.querySelector('.patientId') as HTMLDivElement
let doctorId = document.querySelector('.doctorId') as HTMLDivElement
const med1 = new Doctor(
  'Fabiana',
  Specialization.Cardiologist,
  123,
  Period.Afternoon
)
const med2 = new Doctor('Yara', Specialization.Dentist, 1452, Period.Daytime)
const med3 = new Doctor(
  'Jaciara',
  Specialization.Cardiologist,
  854,
  Period.Afternoon
)
const med4 = new Doctor(
  'Karla',
  Specialization.Cardiologist,
  415,
  Period.Nocturnal
)
const med5 = new Doctor(
  'Leila',
  Specialization.Cardiologist,
  475,
  Period.Daytime
)
//registrando objetos da classe doctor no método registrarMedico
myHosp.registerDoctor(med1)
myHosp.registerDoctor(med2)
myHosp.registerDoctor(med3)
myHosp.registerDoctor(med4)
myHosp.registerDoctor(med5)

export function start() {
  loadSpecializations()
  const specializationsHosp = myHosp.listSpecializations()
  specializationsHosp.forEach((specialization, index) => {
    const option = document.createElement('option')
    option.textContent = specialization
    option.setAttribute('id', index.toString())
  })
  const specializations = Object.keys(Specialization)
  specializations.forEach((specialization, index) => {
    const option = document.createElement('option')
    option.textContent = specialization
    option.setAttribute('id', index.toString())
    registerSpecialization?.appendChild(option)
  })
  const periods = Object.keys(Period)
  periods.forEach((period, index) => {
    const option = document.createElement('option')
    option.textContent = period
    option.setAttribute('id', index.toString())
    registerPeriod?.appendChild(option)
  })
}

const patientArea = document.querySelector('#patient-area') as HTMLElement
const doctorArea = document.querySelector('#doctor-area') as HTMLElement
registerForm?.addEventListener('submit', (e) => {
  e.preventDefault()

  if (isDoctor.checked) {
    patientArea.style.display = 'none'
    doctorArea.style.display = 'block'
    doctorId.style.display = 'block'
    patientId.style.display = 'none'
  } else {
    patientId.style.display = 'block'
    doctorId.style.display = 'none'
    patientArea.style.display = 'block'
    doctorArea.style.display = 'none'
  }
  backHomeBtn.style.display = 'flex'
  registerForm.style.display = 'none'
})

backHomeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  registerForm.style.display = 'flex'
  backHomeBtn.style.display = 'none'
  doctorArea.style.display = 'block' ? 'none' : 'block'
  patientArea.style.display = 'block' ? 'none' : 'block'
})

function sendData(typeForm: HTMLFormElement) {
  const elements = Array.from(typeForm.querySelectorAll('.input'))
  const formData: Record<string, string | Specialization> = {}
  elements.forEach((element: any) => {
    formData[element.name] = element.value
  })

  return formData
}

function loadSpecializations() {
  appointmentSelect.innerHTML = ''
  const specializationsHosp = myHosp.listSpecializations()

  specializationsHosp.forEach((specialization, index) => {
    const option = document.createElement('option')
    option.textContent = specialization
    option.setAttribute('id', index.toString())
    appointmentSelect?.appendChild(option)
  })
}

let textDoc = document.createElement('p')
textDoc.textContent = ''
doctorForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const formData = sendData(doctorForm)
  const newDoctor = new Doctor(
    formData.nameDoctor,
    formData.specialization as Specialization,
    Number(formData.numberRegister),
    formData.period as Period
  )
  myHosp.registerDoctor(newDoctor)
  textDoc.textContent = `Registered Doctor!`
  doctorForm.appendChild(textDoc)

  loadSpecializations()
})

let textPatient = document.createElement('p')
textPatient.textContent = ''
patientForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const formData = sendData(patientForm)
  const newPatient = new Patient(formData.namePatient, Number(formData.id))
  myHosp.registerPatient(newPatient)
  textPatient.textContent = `Registered Patient!`

  patientForm.appendChild(textPatient)
})
let table = document.querySelector('#table')
let tBody = document.querySelector('#tbody') as HTMLTableElement
tBody.innerHTML = ''
btnCheckDoctors?.addEventListener('click', () => {
  const specialization = appointmentSelect.value as Specialization
  const listDoctors = myHosp.checkAvailableDoctors(specialization)
  tBody.innerHTML = ''
  listDoctors.forEach((doctor, index) => {
    const newRow = document.createElement('tr')
    newRow.setAttribute('id', index.toString())

    Object.values(doctor).forEach((doctorInfo) => {
      if (doctorInfo.length > 0) {
        const newData = document.createElement('td')
        newData.textContent = doctorInfo
        newRow.appendChild(newData)
      }
    })
    const btnAppointment = document.createElement('button')
    btnAppointment.textContent = 'Schedule Appointment'
    btnAppointment.classList.add('to-schedule')
    btnAppointment.addEventListener('click', () =>
      scheduleAppointment(doctor.register)
    )
    newRow.appendChild(btnAppointment)
    tBody?.appendChild(newRow)
  })
  table?.appendChild(tBody)
})

function scheduleAppointment(id: number) {
  const inputIdPatient = Number(
    (document.querySelector('#patient-id') as HTMLInputElement).value
  )
  const scheduleResponse = myHosp.scheduleAppointment(id, inputIdPatient)
  const paragraph = document.createElement('p')

  if (scheduleResponse) {
    const table = document.querySelector('.table') as HTMLTableElement
    table.style.display = 'none'
    paragraph.textContent = 'Scheduled Appointment'
  } else {
    paragraph.textContent = 'You need to register as a patient!'
  }

  appointmentItem?.appendChild(paragraph)
}
let divAppointmentsArea = document.querySelector('#check-appointments')
let responseDiagnosis = document.querySelector(
  '#response-diagnosis'
) as HTMLDivElement
const btnCheckAppointmentPatient = document.querySelector(
  '#btn-check-appointment-patient'
)
const btnCheckAppointmentDoctor = document.querySelector(
  '#btn-check-appointment-doctor'
)
btnCheckAppointmentPatient?.addEventListener('click', () => {
  const inputIdPatient = Number(
    (document.querySelector('#patient-id') as HTMLInputElement).value
  )

  if (inputIdPatient) {
    const currentPatient = myHosp.listedPatients.find(
      (patient) => patient.id === inputIdPatient
    )

    currentPatient?.listAppointments().forEach((appointment) => {
      const infosAppointment = document.createElement('div')
      infosAppointment.classList.add('item-appointments')
      infosAppointment.innerHTML = `
      <h4> Appointment Successfully Scheduled! </h4>
      <p>Patient: ${appointment.getPatient().name}</p>
      <p>Doctor: ${appointment.getDoctor().name}</p>
      <p>Date: ${appointment.date.toLocaleDateString()} </p>
      <p>Hour: ${appointment.date.toLocaleTimeString()}</p>
      `

      divAppointmentsArea!.append(infosAppointment)
    })
  }
})
btnCheckAppointmentDoctor?.addEventListener('click', () => {
  const inputIdDoctor = Number(
    (document.querySelector('#doctorId') as HTMLInputElement).value
  )
  if (inputIdDoctor) {
    myHosp.listedDoctors.find((doctor) => {
      doctor.register === inputIdDoctor
      const currentDoctor = doctor
      currentDoctor?.listAppointments().forEach((appointment) => {
        const infosAppointment = document.createElement('div')
        infosAppointment.classList.add('item')
        infosAppointment.innerHTML = `
        <p>Doctor: ${appointment.getPatient().name}</p>
        <p>Date: ${appointment.date.toLocaleDateString()} </p>
        <p>Hour: ${appointment.date.toLocaleTimeString()}</p>
        `
        divAppointmentsArea!.appendChild(infosAppointment)
      })
    })
  }
})

let divDiagnosisForm = document.querySelector(
  '#check-diagnosis-item'
) as HTMLDivElement
let response = document.createElement('p')
const btnCheckDiagnosisArea = document.querySelector('#check-diagnosis-area')
btnCheckDiagnosisArea?.addEventListener('click', () => {
  response.innerHTML = ``
  divDiagnosisForm.classList.toggle('block')
  const btnEnterDiagnosis = document.querySelector(
    '#btn-enter-diagnosis'
  ) as HTMLButtonElement
  if (btnEnterDiagnosis.style.display === 'block') {
    btnEnterDiagnosis.style.display = 'none'
  } else btnEnterDiagnosis.style.display = 'block'
})

const btnCheckDiagnosisPatient = document.querySelector(
  '#check-diagnosis-patient'
)
btnCheckDiagnosisPatient?.addEventListener('click', () => {
  const patientIdDiagnosis = Number(
    (document.querySelector('#patient-id-diagnosis') as HTMLInputElement).value
  )
  const currentPatient = searchPatientById(patientIdDiagnosis)
  if (currentPatient) {
    const diagnosisPatientArea = document.createElement('div')
    diagnosisPatientArea.textContent = ''
    responseDiagnosis!.appendChild(diagnosisPatientArea)
    if (currentPatient.diagnoses.length > 0) {
      for (const diagnosis of currentPatient.diagnoses) {
        diagnosisPatientArea.innerHTML = `<p> Diagnosis: ${diagnosis.getMainComplaint()}</p>
        <br>
        <p> Diagnosis description: ${diagnosis.getDiagnosisDescription()}</p>
        <br>
        <p>Suggested Treatment: ${diagnosis.getSuggestedTreatment()} </p>`
        return
      }
    } else {
      response.innerHTML = `<p>There no available diagnosis for that patient</p>`
      return
    }
  } else {
    response.innerHTML = `Patient not found`

    responseDiagnosis!.appendChild(response)
  }
})

function searchPatientById(patientId: number): Patient | undefined {
  for (const patient of myHosp.listedPatients) {
    if (patient.id === patientId) {
      return patient
    }
  }
  return undefined
}

const btnEnterDiagnosis = document.querySelector(
  '#btn-enter-diagnosis'
) as HTMLButtonElement
btnEnterDiagnosis.addEventListener('click', () => {
  const enterDivForm = document.querySelector('#enter-diagnosis-item')
  enterDivForm?.classList.toggle('block')
})

start()
