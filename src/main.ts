import { Doctor, Period, Specialization } from './models/Doctor'
import { Hospital } from './models/Hospital'
import { Patient } from './models/Patient'

const myHosp = new Hospital()
let body = document.querySelector('body')
const appointmentSelect = document.querySelector(
  '#select-specialization'
) as HTMLSelectElement
const registerForm = document.querySelector('#register-form')
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
    appointmentSelect?.appendChild(option)
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

registerForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  if (isDoctor.checked) {
    console.log('check')
    doctorForm.style.display = 'block'
    patientForm.style.display = 'none'
    doctorId.style.display = 'block'
    patientId.style.display = 'none'

    if (monitorDiagnosis) monitorDiagnosis.style.display = 'block'
    appointmentItem.style.display = 'none'
  } else {
    patientForm.style.display = 'block'
    doctorForm.style.display = 'none'
    monitorDiagnosis.style.display = 'none'
    patientId.style.display = 'block'
    doctorId.style.display = 'none'
    if (appointmentItem) {
      appointmentItem.style.display = 'block'
    }
  }
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
  const text = document.createElement('p')
  text.textContent = `Médico Registrado!`
  doctorForm.appendChild(text)

  loadSpecializations()
})

patientForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const formData = sendData(patientForm)
  const newPatient = new Patient(formData.namePatient, Number(formData.id))
  myHosp.registerPatient(newPatient)
  const text = document.createElement('p')
  text.textContent = `Paciente Registrado!`

  patientForm.appendChild(text)
})

btnCheckDoctors?.addEventListener('click', () => {
  const specialization = appointmentSelect.value as Specialization
  const listDoctors = myHosp.checkAvailableDoctors(specialization)
  const table = document.querySelector('#table')

  const tBody = document.querySelector('#tbody') as HTMLTableElement

  listDoctors.forEach((doctor, index) => {
    const newRow = document.createElement('tr')
    newRow.setAttribute('id', index.toString())

    Object.values(doctor).forEach((doctorInfo) => {
      const newData = document.createElement('td')
      newData.textContent = doctorInfo

      newRow.appendChild(newData)
    })
    const btnAppointment = document.createElement('button')
    btnAppointment.textContent = 'Agendar Consulta'
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
    paragraph.textContent = 'Consulta agendada'
  } else {
    paragraph.textContent = 'Você precisa se registrar como paciente!'
  }

  appointmentItem?.appendChild(paragraph)
}

const btnCheckAppointment = document.querySelector('#btn-check-appointment')
btnCheckAppointment?.addEventListener('click', () => {
  const inputIdPatient = Number(
    (document.querySelector('#patient-id') as HTMLInputElement).value
  )

  const inputIdDoctor = Number(
    (document.querySelector('#doctorId') as HTMLInputElement).value
  )
  if (inputIdPatient) {
    const currentPatient = myHosp.listedPatients.find(
      (patient) => patient.id === inputIdPatient
    )

    currentPatient?.listAppointments().forEach((appointment) => {
      const infosAppointment = document.createElement('div')
      infosAppointment.classList.add('item')
      infosAppointment.innerHTML = `
      <p>Patient: ${appointment.getPatient().name}</p>
      <p>Doctor: ${appointment.getDoctor().name}</p>
      <p>Date: ${appointment.date.toLocaleDateString()} </p>
      <p>Hour: ${appointment.date.toLocaleTimeString()}</p>
      `
      body!.appendChild(infosAppointment)
    })
  }
  if (inputIdDoctor) {
    const currentDoctor = myHosp.listedDoctors.find(
      (doctor) => doctor.register === inputIdDoctor
    )
    console.log(currentDoctor)
    currentDoctor?.listAppointments().forEach((appointment) => {
      const infosAppointment = document.createElement('div')
      infosAppointment.classList.add('item')
      infosAppointment.innerHTML = `
      <p>Patient: ${appointment.getPatient().name}</p>
      <p>Date: ${appointment.date.toLocaleDateString()} </p>
      <p>Hour: ${appointment.date.toLocaleTimeString()}</p>
      `
      body!.appendChild(infosAppointment)
    })
  }
})

const btnCheckDiagnosis = document.querySelector('#check-diagnosis')
btnCheckDiagnosis?.addEventListener('click', () => {
  const divDiagnosisForm = document.querySelector(
    '#check-diagnosis-item'
  ) as HTMLDivElement
  divDiagnosisForm.classList.toggle('block')
  const btnEnterDiagnosis = document.querySelector(
    '#btn-enter-diagnosis'
  ) as HTMLButtonElement
  if (btnEnterDiagnosis.style.display === 'block') {
    btnEnterDiagnosis.style.display = 'none'
  } else btnEnterDiagnosis.style.display = 'block'
})

const btnEnterDiagnosis = document.querySelector(
  '#btn-enter-diagnosis'
) as HTMLButtonElement
btnEnterDiagnosis.addEventListener('click', () => {
  console.log('oi')
  const enterDivForm = document.querySelector('#enter-diagnosis-item')
  enterDivForm?.classList.toggle('block')
})

// check-diagnosis-item
// diagnosis-title
// diagnosis-description
// diagnosis-treatment

start()
