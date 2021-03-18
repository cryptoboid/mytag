import ObjectDetector from "./ObjectDetector";

class CategoriesGrouper {
    constructor() {
        this.detector = new ObjectDetector();
        this.categories = {};
    }

    useImages(images, notifyCategories) {
        this.images = images;
        this._regroupImages(notifyCategories);
    }

    async _regroupImages(notifyCategories) {
        for (const img of this.images) {
            let predictedImage = await this.detector.classifyImage(img);

            for (const pred of predictedImage.predictions) {
                // add category array if not present
                if (!this.categories[pred.class]) {
                    this.categories[pred.class] = [];
                }

                let crnCtgry = this.categories[pred.class];

                // dont add this image if already in this category!
                if (crnCtgry.length && crnCtgry[crnCtgry.length - 1].uri == predictedImage.uri) {
                    continue;
                }

                this.categories[pred.class].push(predictedImage);
            }
            notifyCategories(Object.keys(this.categories));
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