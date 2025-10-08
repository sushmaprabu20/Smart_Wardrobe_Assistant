
import { Category } from './types';

export const CATEGORIES_LIST: string[] = Object.values(Category).filter(c => c !== Category.UNKNOWN);
