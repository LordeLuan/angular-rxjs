import { ImageLink } from './interfaces';
export class LivroVolumeInfo{
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    previewLink?: string;
    thumbnail?: ImageLink;

    constructor(item){
        this.title = item.VolumeInfo?.title,
        this.authors = item.VolumeInfo?.authors,
        this.publisher = item.VolumeInfo?.publisher,
        this.publishedDate = item.VolumeInfo?.publishedDate,
        this.description = item.VolumeInfo?.description,
        this.previewLink = item.VolumeInfo?.previewLink,
        this.thumbnail = item.VolumeInfo?.imageLinks?.thumbnail
    }
}