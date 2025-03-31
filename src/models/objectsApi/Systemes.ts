export interface Systemes {
    "id"?: number,
    "fournisseurSysteme"?: string | object,
    "nomSysteme"?: string,
    "grenaillageSysteme"?: string | null | object,
    "typeSysteme"?: string,
    "regieSFPSysteme"?: string,
    "refieFPSysteme"?: string,
    "commandesSysteme"?: any[],
    "couchesSysteme"?: any[],
}