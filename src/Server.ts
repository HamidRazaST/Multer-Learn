import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { Types, connect, Schema, model } from 'mongoose';
import { IConfig } from './config';
const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');

class Server {
    public app: express.Express;

    constructor(private configuration: IConfig) {
        this.app = express();
    }

    public generateId() {
        return String(Types.ObjectId());
    }

    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    public initBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public setupRoutes() {
        const {
            app,
            configuration: {
                MONGO_URL,
                CLOUD_NAME,
                API_KEY,
                API_SECRET,
            }
        } = this;

        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: API_KEY,
            api_secret: API_SECRET,
        });

        const storage = cloudinaryStorage({
            cloudinary: cloudinary,
            folder: "images",
            allowedFormats: ["jpg", "png"],
            transformation: [{ width: 500, height: 500, crop: "limit" }],
            filename: (req: any, file: any, cb: any) => {
                cb(undefined, this.generateId());
            },
        });
        
        const upload = multer({ storage });

        connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })
        .then(() => {console.log('Successfully connected')})
        .catch((err) => {console.log('Error: ', err);});

        const imageSchema = new Schema({
            _id: String,
            url: String,
        });

        const imageModel = model('images', imageSchema);

        app.post('/upload', upload.single('image'), async (req: any, res, next) => {
            console.log('6');
            if (!req.file) {
                console.log("No file received");
                return res.send({
                    success: false
                });
            } else {
                const image = {
                    _id: req.file.public_id.split('/')[1],
                    url: req.file.secure_url,
                }
                await imageModel.create(image);
                console.log('file received');
                return res.json({
                    success: true,
                });
            }
        });
        
        app.post('/uploads', upload.array('images', 10), (req: any, res, next) => {
            if (!req.files) {
                console.log("No files received");
                return res.send({
                    success: false
                });
            } else {
                req.files.forEach(async (element: any) => {
                    const image = {
                        _id: req.file.public_id.split('/')[1],
                        url: element.secure_url,
                    }
                    await imageModel.create(image);
                });
                console.log('files received');
                return res.json({
                    data: req.files
                });
            }
        });
        
        app.get('/image/:id', async (req, res, next) => {
            const result = await imageModel.findById({ _id: req.params.id });
            return res.json({
                data: result
            });
        });

        app.use('/', (err: any, req: any, res: any, next: any) => {
            return res.send('hhhh');
        })
    }

    public run() {
        const {
            app,
            configuration: { PORT }
        } = this;

        app.listen(PORT, ()=> { console.log(`App is running on port ${PORT}`)} );
    }
}

export default Server;
