import ObjectDetector from "./ObjectDetector";

class CategoriesGrouper {
    constructor() {
        this.detector = new ObjectDetector();
    }

    useImages(images) {
        this.images = images;
        this.categories = {}
        this._regroupImages();
    }

    async _regroupImages() {
        for (const img of this.images) {
            let predictedImage = await this.detector.classifyImage(img);

            for (const pred of predictedImage.predictions) {                
                if (!this.categories[pred.class]) {
                    this.categories[pred.class] = [];
                }
    
                this.categories[pred.class].push(predictedImage);
            }
            
            console.log(this.categories);
        }

    }
}

export default CategoriesGrouper;