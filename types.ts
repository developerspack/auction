interface itemProps {
  Name: string;
  Thumbnail: string;
  video: string;
  otherImages: string[];
  bidding: boolean;
  Description: string;
  expiryDate: Date | null | [Date | null, Date | null];
}
