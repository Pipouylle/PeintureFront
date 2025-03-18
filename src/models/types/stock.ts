import {Article, createDefaultArticle} from "@/models/types/article";
import {createDefaultUser, User} from "@/models/types/user";
import {createDefaultOf, Of} from "@/models/types/of";

export interface Stock {
  id: number;
  dateStock: string;
  dateSortie: string;
  article : Article;
  user: User;
  of: Of;
  unique: boolean;
}

export function createDefaultStock(overrides: Partial<Stock> = {}): Stock {
  return {
    id: 0,
    dateStock: "",
    dateSortie: "",
    article: createDefaultArticle(),
    user: createDefaultUser(),
    of: createDefaultOf(),
    unique: true,
    ...overrides
  };
}