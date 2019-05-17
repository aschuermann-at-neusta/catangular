export interface CatBreedBe {
    alt_names: string;
    experimental: number;
    hairless: number;
    hypoallergenic: number;
    id: string;
    life_span: string;
    name: string;
    natural: number;
    origin: string;
    rare: number;
    reference_image_id: number;
    rex: number;
    short_legs: number;
    suppressed_tail: number;
    temperament: 'Active'|'Energetic' | 'Independent' | 'Intelligent' | 'Gentle';
    weight_imperial: string;
    wikipedia_url: string;
}
