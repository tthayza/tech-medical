// Criação da classe que representa uma prescrição médica
export class Prescription {
  description: string
  medicines: Medicine[] = []

  constructor(description: string) {
    this.description = description
  }

  addMedicine(medicine: Medicine) {
    this.medicines.push(medicine)
  }
}
