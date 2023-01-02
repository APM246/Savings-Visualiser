interface BankFormData {
    mainText: string,
    formControlName: string,
    handleInput: (event: Event) => void,
    file: File | null
}

export { BankFormData }