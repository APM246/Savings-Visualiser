interface BankFormData {
    mainText: string,
    formControlName: string,
    handleInput: (event: Event) => void,
}

enum BankType {
    Bankwest,
    Commbank
}

export { BankFormData, BankType }