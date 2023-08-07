import { diskStorage } from "multer"

export const multerFactory = {
    storage: diskStorage({
        destination: './src/images',
        filename(req, file, callback) {
            callback(null, file.originalname)
        },
    })
}