export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
