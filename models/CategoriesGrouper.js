import ObjectDetector from "./ObjectDetector";

class CategoriesGrouper {
    constructor() {
        this.detector = new ObjectDetector();
        this.categories = {};
    }

    useImages(images, imageClassifiedCallback) {
        this.images = images;
        this._regroupImages(imageClassifiedCallback);
    }

    async _regroupImages(imageClassifiedCallback) {
        for (let i = 0; i < this.images.length; i++) {
            const img = this.images[i];

            let predictedImage = await this.detector.classifyImage(img);

            this._assignImageToCategories(predictedImage);

            imageClassifiedCallback(Object.keys(this.categories), (i+1) / this.images.length);
        }
    }

    _assignImageToCategories(predImg) {
        for (const pred of predImg.predictions) {
            // add category array if not present
            if (!this.categories[pred.class]) {
                this.categories[pred.class] = [];
            }

            let crnCtgry = this.categories[pred.class];

            // dont add this image if already in this category!
            if (crnCtgry.length && crnCtgry[crnCtgry.length - 1].uri == predImg.uri) {
                continue;
            }

            this.categories[pred.class].push(predImg);
        }
    }

    get amount() {
        return Object.keys(this.categories).length;
    }

    getForCategory(categName) {
        return this.categories[categName] || [];
    }
}

export default CategoriesGrouper;