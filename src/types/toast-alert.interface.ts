export interface Alert {
    id: string,
    type: "success" | "fail" | "error",
    message: string
}