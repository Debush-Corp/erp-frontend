export interface DataInputUserCommon {
    title: string;
    description: string;
    value: string;
    name: string;
    typeValue: string;
    optional: boolean;
    rules?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        unique?: boolean;
    };
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