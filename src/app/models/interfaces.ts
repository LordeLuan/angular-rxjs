export interface Livro{
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    previewLink?: string;
    thumbnail?: string;
}

export interface VolumeInfo{

}

export interface ImageLink{
    smallThumbnail: string;
    thumbnail: string;
}

export interface Item{
    volumeInfo: VolumeInfo;
}

export interface LivrosResultado{
    itens: Item[];
    totalItens: number;
}
