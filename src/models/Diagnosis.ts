// Classe que representa um diagnóstico

export class Diagnosis {
  private mainComplaint: string
  private description?: string
  private suggestedTreatment?: string
  constructor(
    mainComplaint: string,
    description?: string,
    suggestedTreatment?: string
  ) {
    this.mainComplaint = mainComplaint
    this.description = description
    this.suggestedTreatment = suggestedTreatment
  }

  getMainComplaint() {
    return this.mainComplaint
  }

  getDiagnosisDescription() {
    return this.description
  }
  getSuggestedTreatment() {
    return this.suggestedTreatment
  }
}
