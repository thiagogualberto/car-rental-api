import { parse as csvParse } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
    // Recebe o arquivo vindo do controller.
    execute(file: Express.Multer.File): void {
        // Cria um stream de leitura do arquivo.
        const stream = fs.createReadStream(file.path);

        // Responsável por ler linha por linha do arquivo através do console.log abaixo
        const parseFile = csvParse();

        // Passa pedaços do arquivo para o 'parseFile'
        stream.pipe(parseFile);

        parseFile.on("data", async line => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };
