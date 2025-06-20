export interface InputCommonData {
    title: string;
    description: string;
    value: string;
    default: string;
    name: string;
    typeValue: string;
    rules?: InputRules;
    info: {
        default: string;
        wait: string;
        success: string;
        duplicate: string;
        invalidFormat: string;
        tooShort: string;
        tooLong: string;
        required: string;
        error?: string;
    };
    validationAction: string;
}

export interface InputRules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    unique?: boolean;
}