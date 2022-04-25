import { Category } from "../../model/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

// Objeto responsável por fazer a transferência de dados entre uma classe e outra.
class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        // Função do JS que recebe um objeto e o json que seria seu conteúdo.
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}

export { CategoriesRepository };
