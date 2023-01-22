interface BankFormData {
    mainText: string,
    formControlName: string,
    handleInput: (event: Event) => void,
}

enum BankType {
    Bankwest = "bankwest",
    Commbank = "commbank"
}

export { BankFormData, BankType }