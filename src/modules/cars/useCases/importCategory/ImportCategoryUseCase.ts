import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}
class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            // Cria um stream de leitura do arquivo.
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategory[] = [];

            // Responsável por ler linha por linha do arquivo através do console.log abaixo
            const parseFile = csvParse();

            // Passa pedaços do arquivo para o 'parseFile'
            stream.pipe(parseFile);

            parseFile
                .on("data", async line => {
                    const [name, description] = line;

                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    resolve(categories);
                })
                .on("error", err => {
                    resolve(err);
                });
        });
    }

    // Recebe o arquivo vindo do controller.
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async category => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
