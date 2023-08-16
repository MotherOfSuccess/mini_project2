import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"
import { diskStorage } from "multer"
import { validateExtension } from "../utils"
import { HttpException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"


export const multerFactory = (configService: ConfigService) => <MulterOptions> {
    storage: diskStorage({
        destination: configService.get('DIRECTORY_IMAGE'),
        filename(req, file, callback) {
            callback(null, file.originalname)
        },
    }),

    async fileFilter(req, file, callback) {

        let valid = await validateExtension(file)
        console.log(file)

        if(valid instanceof HttpException){

            return callback(valid, false)
        }

        return callback(valid, true)
    }
}