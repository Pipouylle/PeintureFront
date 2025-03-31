export interface Articles {
    "id"?: string,
    "designationArticle"?: string,
    "RALArticle"?: string,
    "fournisseurArticle"?: string | object, // Fournisseur.id
    "stocksArticle"? : any[],
    "articleCouchesArticle"? : any[],
}