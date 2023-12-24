interface itemProps {
  id: string;
  Name: string;
  Thumbnail: string;
  video: string;
  otherImages: string[];
  bidding: boolean;
  Description: string;
  expiryDate: string;
  userId: string;
  startingPrice: number;
}

interface userProps {
  isLoggedIn: boolean;
  id: string;
  email: string;
  Name: string;
  photo: string;
  createdAt: string;
}
