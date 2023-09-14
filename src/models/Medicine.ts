// Criação da classe de Medicamento
export class Medicine {
  name: string
  dosage: string
  instruction: string
  constructor(name: string, dosage: string, instruction: string) {
    this.name = name
    this.dosage = dosage
    this.instruction = instruction
  }
}
